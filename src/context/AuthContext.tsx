import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  age?: string;
  characterId?: string;
  completedStoryChapters?: string[];
  totalXP?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  // Registration
  register: (email: string, name: string, password: string) => Promise<{ success: boolean; message?: string }>;
  // Character
  setUserCharacter: (characterId: string) => void;
  // Story
  completeStoryChapter: (chapterId: string, xp: number) => void;
  // Login flow
  sendOTP: (email: string) => Promise<{ success: boolean; message?: string }>;
  verifyOTP: (email: string, otp: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  setUserAge: (age: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState<Map<string, { email: string; name: string; password: string }>>(new Map());
  const [otpStorage, setOtpStorage] = useState<Map<string, { otp: string; timestamp: number }>>(new Map());

  // Initialize auth state from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('auth_user');
      const storedUsers = localStorage.getItem('registered_users');
      
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUser(user);
      }

      // Load registered users from localStorage
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        setRegisteredUsers(new Map(Object.entries(users)));
      }
    } catch (error) {
      console.error('Failed to restore auth state:', error);
      localStorage.removeItem('auth_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Generate a random 6-digit OTP
  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Register new user
  const register = async (email: string, name: string, password: string): Promise<{ success: boolean; message?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if user already exists
        if (registeredUsers.has(email)) {
          resolve({ success: false, message: 'Email already registered' });
          return;
        }

        // Validate inputs
        if (!email || !name || !password) {
          resolve({ success: false, message: 'All fields are required' });
          return;
        }

        if (password.length < 6) {
          resolve({ success: false, message: 'Password must be at least 6 characters' });
          return;
        }

        // Register user
        const newUsers = new Map(registeredUsers);
        newUsers.set(email, { email, name, password });
        setRegisteredUsers(newUsers);

        // Persist to localStorage
        const usersObj = Object.fromEntries(newUsers);
        localStorage.setItem('registered_users', JSON.stringify(usersObj));

        resolve({ success: true, message: 'Registration successful. Please login.' });
      }, 500);
    });
  };

  // Send OTP to email
  const sendOTP = async (email: string): Promise<{ success: boolean; message?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if user is registered
        if (!registeredUsers.has(email)) {
          resolve({ success: false, message: 'Email not registered. Please register first.' });
          return;
        }

        // Generate OTP
        const otp = generateOTP();
        const otpData = new Map(otpStorage);
        otpData.set(email, { otp, timestamp: Date.now() });
        setOtpStorage(otpData);

        // Log OTP to console and alert (for demo/testing)
        console.log(`%c📧 OTP Generated!`, 'font-size: 16px; font-weight: bold; color: #2563eb;');
        console.log(`%cEmail: ${email}`, 'font-size: 14px; color: #0f172a;');
        console.log(`%cOTP Code: ${otp}`, 'font-size: 18px; font-weight: bold; color: #dc2626; background: #fee2e2; padding: 8px;');
        console.log(`%c⏱️ Valid for 5 minutes`, 'font-size: 12px; color: #ea580c;');
        
        // Show alert with OTP
        alert(`🔐 OTP: ${otp}\n\n✅ Copy this 6-digit code and paste it in the OTP field.\n⏱️ Valid for 5 minutes`);

        resolve({
          success: true,
          message: `OTP sent! Check the console (F12) or the popup alert.`,
        });
      }, 500);
    });
  };

  // Verify OTP
  const verifyOTP = async (email: string, otp: string): Promise<{ success: boolean; message?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedOTPData = otpStorage.get(email);

        // Check if OTP exists
        if (!storedOTPData) {
          resolve({ success: false, message: 'OTP not found. Please request a new OTP.' });
          return;
        }

        // Check if OTP is expired (5 minutes)
        const isExpired = Date.now() - storedOTPData.timestamp > 5 * 60 * 1000;
        if (isExpired) {
          resolve({ success: false, message: 'OTP has expired. Please request a new OTP.' });
          return;
        }

        // Check if OTP matches
        if (storedOTPData.otp !== otp) {
          resolve({ success: false, message: 'Invalid OTP. Please try again.' });
          return;
        }

        // OTP is valid - login user
        const registeredUser = registeredUsers.get(email);
        if (!registeredUser) {
          resolve({ success: false, message: 'User not found' });
          return;
        }

        const userData: User = {
          id: Math.random().toString(36).substr(2, 9),
          email: registeredUser.email,
          name: registeredUser.name,
        };

        setUser(userData);
        localStorage.setItem('auth_user', JSON.stringify(userData));

        // Clear OTP after verification
        const otpData = new Map(otpStorage);
        otpData.delete(email);
        setOtpStorage(otpData);

        resolve({ success: true, message: 'Login successful!' });
      }, 500);
    });
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  // Set user age
  const setUserAge = (age: string) => {
    if (user) {
      const updatedUser = { ...user, age };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    }
  };

  // Set user character
  const setUserCharacter = (characterId: string) => {
    if (user) {
      const updatedUser = { ...user, characterId };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    }
  };

  // Complete story chapter
  const completeStoryChapter = (chapterId: string, xp: number) => {
    if (user) {
      const completedChapters = user.completedStoryChapters || [];
      if (!completedChapters.includes(chapterId)) {
        completedChapters.push(chapterId);
      }
      const totalXP = (user.totalXP || 0) + xp;
      const updatedUser = { ...user, completedStoryChapters: completedChapters, totalXP };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        register,
        sendOTP,
        verifyOTP,
        logout,
        setUserAge,
        setUserCharacter,
        completeStoryChapter,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

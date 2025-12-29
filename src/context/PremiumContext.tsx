import { createContext, useContext, useState, useEffect } from "react";
import { PremiumUser, DEFAULT_FREE_USER, PREMIUM_MONTHLY_USER, PREMIUM_YEARLY_USER, VIP_ELITE_USER } from "@/data/premiumMembership";

interface PremiumContextType {
  premiumUser: PremiumUser;
  setPremiumUser: (user: PremiumUser) => void;
  activateMembership: (tier: "premium_monthly" | "premium_yearly" | "vip") => void;
  cancelMembership: () => void;
  isPremium: boolean;
  isMembershipExpired: () => boolean;
  getRemainingDays: () => number;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const PremiumProvider = ({ children }: { children: React.ReactNode }) => {
  const [premiumUser, setPremiumUser] = useState<PremiumUser>(DEFAULT_FREE_USER);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("eatxp_premium");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        // Check if membership is expired
        if (user.membershipEndDate && user.membershipEndDate < Date.now()) {
          setPremiumUser(DEFAULT_FREE_USER);
        } else {
          setPremiumUser(user);
        }
      } catch (e) {
        setPremiumUser(DEFAULT_FREE_USER);
      }
    }
  }, []);

  // Save to localStorage whenever premium user changes
  useEffect(() => {
    localStorage.setItem("eatxp_premium", JSON.stringify(premiumUser));
  }, [premiumUser]);

  const activateMembership = (tier: "premium_monthly" | "premium_yearly" | "vip") => {
    let newUser: PremiumUser;
    switch (tier) {
      case "premium_monthly":
        newUser = { ...PREMIUM_MONTHLY_USER };
        break;
      case "premium_yearly":
        newUser = { ...PREMIUM_YEARLY_USER };
        break;
      case "vip":
        newUser = { ...VIP_ELITE_USER };
        break;
      default:
        newUser = DEFAULT_FREE_USER;
    }
    setPremiumUser(newUser);
  };

  const cancelMembership = () => {
    setPremiumUser(DEFAULT_FREE_USER);
  };

  const isMembershipExpired = () => {
    if (!premiumUser.isPremium) return true;
    return premiumUser.membershipEndDate < Date.now();
  };

  const getRemainingDays = () => {
    if (!premiumUser.isPremium || isMembershipExpired()) return 0;
    const remaining = premiumUser.membershipEndDate - Date.now();
    return Math.ceil(remaining / (1000 * 60 * 60 * 24));
  };

  return (
    <PremiumContext.Provider
      value={{
        premiumUser,
        setPremiumUser,
        activateMembership,
        cancelMembership,
        isPremium: premiumUser.isPremium && !isMembershipExpired(),
        isMembershipExpired,
        getRemainingDays,
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
};

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error("usePremium must be used within PremiumProvider");
  }
  return context;
};

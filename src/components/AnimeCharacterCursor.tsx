import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { ANIME_CHARACTERS } from '@/data/animeCharacters';

interface AnimeCharacterCursorProps {
  characterId: string;
}

const AnimeCharacterCursor = ({ characterId = 'tanjiro' }: AnimeCharacterCursorProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExcited, setIsExcited] = useState(false);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const character = ANIME_CHARACTERS[characterId] || ANIME_CHARACTERS.tanjiro;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleClick = () => {
      setIsExcited(true);
      setTimeout(() => setIsExcited(false), 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, [cursorX, cursorY]);

  // Character-specific speech bubbles
  const getSpeechBubble = () => {
    const speeches: Record<string, string> = {
      tanjiro: "頑張れ! 🔥",
      deku: "Plus Ultra! 💪",
      eren: "Tatakae! ⚔️",
      yuji: "Itadori desu! ✨",
      ninrir: "Let's cook! 🍳",
      yor: "Elegant~ 💜",
    };
    return speeches[characterId] || "Let's go! ✨";
  };

  // Character-specific colors
  const getCharacterColors = () => {
    return {
      primary: character.color,
      secondary: character.color + '80',
      accent: character.color + '40',
    };
  };

  const colors = getCharacterColors();

  // Render different character avatars based on selection
  const renderCharacterAvatar = () => {
    const baseProps = {
      width: "70",
      height: "90", 
      viewBox: "0 0 70 90",
      className: "drop-shadow-lg",
      style: { filter: 'drop-shadow(3px 5px 4px rgba(0,0,0,0.3))' }
    };

    switch (characterId) {
      case 'tanjiro':
        return (
          <svg {...baseProps}>
            {/* Tanjiro - Original design with red/black theme */}
            <g>
              {/* Hair - Dark red */}
              <polygon points="10,25 5,8 18,22" fill="#8B0000" />
              <polygon points="15,22 12,5 25,18" fill="#8B0000" />
              <polygon points="25,18 25,2 35,15" fill="#8B0000" />
              <polygon points="35,15 38,0 45,15" fill="#8B0000" />
              <polygon points="45,18 50,5 55,22" fill="#8B0000" />
              <polygon points="55,22 60,8 60,25" fill="#8B0000" />
              <ellipse cx="35" cy="28" rx="28" ry="18" fill="#8B0000" />
              <polygon points="20,30 15,22 28,28" fill="#A52A2A" />
              <polygon points="50,30 55,22 42,28" fill="#A52A2A" />
            </g>
            {/* Forehead scar */}
            <rect x="32" y="22" width="6" height="2" rx="1" fill="#C41E3A" />
            {/* Earrings */}
            <circle cx="15" cy="50" r="3" fill="#FFD700" />
            <circle cx="55" cy="50" r="3" fill="#FFD700" />
            {/* Face */}
            <ellipse cx="35" cy="45" rx="22" ry="20" fill="#FFE4C4" />
            {/* Eyes */}
            <ellipse cx="27" cy="43" rx="5" ry="6" fill="white" />
            <ellipse cx="28" cy="43" rx="3" ry="4" fill="#8B0000" />
            <ellipse cx="43" cy="43" rx="5" ry="6" fill="white" />
            <ellipse cx="42" cy="43" rx="3" ry="4" fill="#8B0000" />
            {/* Checkered pattern on clothes */}
            <path d="M15,62 Q35,70 55,62 L58,75 Q35,80 12,75 Z" fill="#2C3E50" />
            <pattern id="checkered" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <rect width="2" height="2" fill="#2C3E50"/>
              <rect x="2" y="2" width="2" height="2" fill="#2C3E50"/>
              <rect x="2" y="0" width="2" height="2" fill="#8B0000"/>
              <rect x="0" y="2" width="2" height="2" fill="#8B0000"/>
            </pattern>
            <path d="M20,65 Q35,72 50,65 L52,72 Q35,77 18,72 Z" fill="url(#checkered)" />
          </svg>
        );

      case 'deku':
        return (
          <svg {...baseProps}>
            {/* Deku - Green curly hair */}
            <g>
              {/* Curly green hair */}
              <circle cx="20" cy="20" r="8" fill="#228B22" />
              <circle cx="35" cy="15" r="12" fill="#228B22" />
              <circle cx="50" cy="20" r="8" fill="#228B22" />
              <circle cx="30" cy="25" r="6" fill="#32CD32" />
              <circle cx="40" cy="25" r="6" fill="#32CD32" />
              <ellipse cx="35" cy="28" rx="25" ry="15" fill="#228B22" />
            </g>
            {/* Face */}
            <ellipse cx="35" cy="45" rx="22" ry="20" fill="#FFE4C4" />
            {/* Freckles */}
            <circle cx="25" cy="48" r="0.5" fill="#D2B48C" />
            <circle cx="30" cy="46" r="0.5" fill="#D2B48C" />
            <circle cx="40" cy="46" r="0.5" fill="#D2B48C" />
            <circle cx="45" cy="48" r="0.5" fill="#D2B48C" />
            {/* Eyes - large and determined */}
            <ellipse cx="27" cy="43" rx="6" ry="7" fill="white" />
            <ellipse cx="28" cy="43" rx="4" ry="5" fill="#228B22" />
            <ellipse cx="43" cy="43" rx="6" ry="7" fill="white" />
            <ellipse cx="42" cy="43" rx="4" ry="5" fill="#228B22" />
            {/* Hero costume */}
            <path d="M15,62 Q35,70 55,62 L58,75 Q35,80 12,75 Z" fill="#228B22" />
            <rect x="30" y="65" width="10" height="8" fill="white" />
            <text x="35" y="71" textAnchor="middle" fontSize="6" fill="#228B22" fontWeight="bold">γ</text>
          </svg>
        );

      case 'eren':
        return (
          <svg {...baseProps}>
            {/* Eren - Brown messy hair */}
            <g>
              <polygon points="8,25 3,8 15,22" fill="#8B4513" />
              <polygon points="15,22 10,5 28,18" fill="#8B4513" />
              <polygon points="28,18 25,2 38,15" fill="#8B4513" />
              <polygon points="38,15 40,0 48,15" fill="#8B4513" />
              <polygon points="48,18 52,5 62,22" fill="#8B4513" />
              <polygon points="62,22 67,8 62,25" fill="#8B4513" />
              <ellipse cx="35" cy="28" rx="30" ry="18" fill="#8B4513" />
            </g>
            {/* Face */}
            <ellipse cx="35" cy="45" rx="22" ry="20" fill="#FFE4C4" />
            {/* Eyes - intense green */}
            <ellipse cx="27" cy="43" rx="5" ry="6" fill="white" />
            <ellipse cx="28" cy="43" rx="3" ry="4" fill="#32CD32" />
            <ellipse cx="43" cy="43" rx="5" ry="6" fill="white" />
            <ellipse cx="42" cy="43" rx="3" ry="4" fill="#32CD32" />
            {/* Serious eyebrows */}
            <path d="M22,38 L32,40" stroke="#654321" strokeWidth="2" />
            <path d="M38,40 L48,38" stroke="#654321" strokeWidth="2" />
            {/* ODM gear straps */}
            <path d="M15,62 Q35,70 55,62 L58,75 Q35,80 12,75 Z" fill="#8B4513" />
            <rect x="20" y="68" width="30" height="3" fill="#2F4F4F" />
            <rect x="25" y="72" width="20" height="2" fill="#2F4F4F" />
          </svg>
        );

      case 'yuji':
        return (
          <svg {...baseProps}>
            {/* Yuji - Pink hair */}
            <g>
              <polygon points="10,25 8,8 20,22" fill="#FFB6C1" />
              <polygon points="20,22 15,5 30,18" fill="#FFB6C1" />
              <polygon points="30,18 28,2 42,15" fill="#FFB6C1" />
              <polygon points="42,15 45,0 52,15" fill="#FFB6C1" />
              <polygon points="52,18 55,5 62,22" fill="#FFB6C1" />
              <polygon points="62,22 62,8 60,25" fill="#FFB6C1" />
              <ellipse cx="35" cy="28" rx="28" ry="18" fill="#FFB6C1" />
            </g>
            {/* Face */}
            <ellipse cx="35" cy="45" rx="22" ry="20" fill="#FFE4C4" />
            {/* Face markings */}
            <rect x="22" y="40" width="2" height="8" fill="#FF1493" />
            <rect x="46" y="40" width="2" height="8" fill="#FF1493" />
            {/* Eyes */}
            <ellipse cx="27" cy="43" rx="5" ry="6" fill="white" />
            <ellipse cx="28" cy="43" rx="3" ry="4" fill="#8B4513" />
            <ellipse cx="43" cy="43" rx="5" ry="6" fill="white" />
            <ellipse cx="42" cy="43" rx="3" ry="4" fill="#8B4513" />
            {/* School uniform */}
            <path d="M15,62 Q35,70 55,62 L58,75 Q35,80 12,75 Z" fill="#000080" />
            <rect x="32" y="65" width="6" height="8" fill="white" />
          </svg>
        );

      case 'ninrir':
        return (
          <svg {...baseProps}>
            {/* Ninrir - Chef with hat */}
            {/* Chef hat */}
            <ellipse cx="35" cy="20" rx="25" ry="15" fill="white" />
            <ellipse cx="35" cy="25" rx="30" ry="8" fill="white" />
            {/* Hair */}
            <ellipse cx="35" cy="35" rx="24" ry="12" fill="#D2691E" />
            {/* Face */}
            <ellipse cx="35" cy="45" rx="22" ry="20" fill="#FFE4C4" />
            {/* Eyes */}
            <ellipse cx="27" cy="43" rx="5" ry="6" fill="white" />
            <ellipse cx="28" cy="43" rx="3" ry="4" fill="#8B4513" />
            <ellipse cx="43" cy="43" rx="5" ry="6" fill="white" />
            <ellipse cx="42" cy="43" rx="3" ry="4" fill="#8B4513" />
            {/* Chef apron */}
            <path d="M15,62 Q35,70 55,62 L58,75 Q35,80 12,75 Z" fill="white" />
            <rect x="30" y="68" width="10" height="6" fill="#D2691E" />
            {/* Cooking utensils */}
            <rect x="10" y="60" width="1" height="15" fill="#8B4513" />
            <ellipse cx="10.5" cy="58" rx="2" ry="3" fill="#C0C0C0" />
          </svg>
        );

      case 'yor':
        return (
          <svg {...baseProps}>
            {/* Yor - Black hair with red ribbon */}
            <g>
              <ellipse cx="35" cy="28" rx="28" ry="18" fill="#2F2F2F" />
              <polygon points="15,30 10,22 25,28" fill="#2F2F2F" />
              <polygon points="55,30 60,22 45,28" fill="#2F2F2F" />
              {/* Hair ornaments */}
              <circle cx="20" cy="25" r="3" fill="#E91E63" />
              <circle cx="50" cy="25" r="3" fill="#E91E63" />
            </g>
            {/* Face */}
            <ellipse cx="35" cy="45" rx="22" ry="20" fill="#FFE4C4" />
            {/* Eyes */}
            <ellipse cx="27" cy="43" rx="5" ry="6" fill="white" />
            <ellipse cx="28" cy="43" rx="3" ry="4" fill="#E91E63" />
            <ellipse cx="43" cy="43" rx="5" ry="6" fill="white" />
            <ellipse cx="42" cy="43" rx="3" ry="4" fill="#E91E63" />
            {/* Elegant dress */}
            <path d="M15,62 Q35,70 55,62 L58,75 Q35,80 12,75 Z" fill="#2F2F2F" />
            <path d="M20,65 Q35,72 50,65" stroke="#E91E63" strokeWidth="2" fill="none" />
          </svg>
        );

      default:
        return (
          <svg {...baseProps}>
            {/* Default Naruto design */}
            <g>
              <polygon points="10,25 5,8 18,22" fill="#FFD93D" />
              <ellipse cx="35" cy="28" rx="28" ry="18" fill="#FFD93D" />
            </g>
            <ellipse cx="35" cy="45" rx="22" ry="20" fill="#FFE4C4" />
            <ellipse cx="27" cy="43" rx="5" ry="6" fill="white" />
            <ellipse cx="43" cy="43" rx="5" ry="6" fill="white" />
            <path d="M15,62 Q35,70 55,62 L58,75 Q35,80 12,75 Z" fill="#FF6B35" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{
        x,
        y,
        translateX: 20,
        translateY: -60,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0,
        rotateY: isExcited ? [0, 15, -15, 0] : 0,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* 3D Popup Container */}
      <div 
        className="relative"
        style={{
          perspective: '500px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Shadow */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-black/20 rounded-full blur-sm"
          style={{ transform: 'translateZ(-20px) rotateX(90deg)' }}
        />
        
        {/* Character */}
        <motion.div
          className="relative"
          animate={{
            y: [0, -5, 0],
            rotateZ: isExcited ? [0, -10, 10, 0] : 0,
          }}
          transition={{
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotateZ: { duration: 0.3 },
          }}
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-5deg)',
          }}
        >
          {renderCharacterAvatar()}
          
          {/* Speech bubble on excitement */}
          {isExcited && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-lg px-2 py-1 shadow-lg text-xs font-bold whitespace-nowrap"
              style={{
                backgroundColor: colors.primary,
                color: 'white',
                transformStyle: 'preserve-3d',
                transform: 'translateZ(20px)',
              }}
            >
              {getSpeechBubble()}
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2"
                style={{ backgroundColor: colors.primary }}
              />
            </motion.div>
          )}
        </motion.div>
        
        {/* Character-specific effects */}
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-lg">{character.emoji}</span>
        </motion.div>
        
        <motion.div
          className="absolute top-1/2 -left-3"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        >
          <span className="text-sm">✨</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnimeCharacterCursor;
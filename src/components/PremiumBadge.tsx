import { motion } from "framer-motion";
import { Crown, Sparkles, Zap } from "lucide-react";
import { usePremium } from "@/context/PremiumContext";

interface PremiumBadgeProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  onClick?: () => void;
}

export const PremiumBadge = ({ size = "md", showText = true, onClick }: PremiumBadgeProps) => {
  const { isPremium, premiumUser, getRemainingDays } = usePremium();

  if (!isPremium) return null;

  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const iconComponent = {
    premium_monthly: <Zap className={sizeClasses[size]} />,
    premium_yearly: <Crown className={sizeClasses[size]} />,
    vip: <Sparkles className={sizeClasses[size]} />,
  };

  const badgeLabel = {
    premium_monthly: "Premium",
    premium_yearly: "Premium+",
    vip: "VIP Elite",
  };

  const badgeColor = {
    premium_monthly: "from-blue-400 to-blue-600",
    premium_yearly: "from-purple-400 to-pink-600",
    vip: "from-yellow-400 to-red-500",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${badgeColor[premiumUser.membershipTier as keyof typeof badgeColor]} cursor-pointer text-white shadow-lg hover:shadow-xl transition-shadow`}
    >
      {iconComponent[premiumUser.membershipTier as keyof typeof iconComponent] || <Crown className={sizeClasses[size]} />}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${textSizeClasses[size]}`}>
            {badgeLabel[premiumUser.membershipTier as keyof typeof badgeLabel] || "Premium"}
          </span>
          <span className="text-xs opacity-90">
            {getRemainingDays()} days left
          </span>
        </div>
      )}
    </motion.div>
  );
};

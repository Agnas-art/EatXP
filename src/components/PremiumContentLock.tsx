import { motion } from "framer-motion";
import { Lock, Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePremium } from "@/context/PremiumContext";

interface PremiumContentLockProps {
  featureName: string;
  description?: string;
  children?: React.ReactNode;
  onUnlock?: () => void;
  requirePremium?: boolean;
}

export const PremiumContentLock = ({
  featureName,
  description,
  children,
  onUnlock,
  requirePremium = true,
}: PremiumContentLockProps) => {
  const { isPremium } = usePremium();

  // If premium or doesn't require premium, show content
  if (!requirePremium || isPremium) {
    return <>{children}</>;
  }

  // Show locked content
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm rounded-lg z-10" />

      {/* Content */}
      {children}

      {/* Lock Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="absolute inset-0 flex items-center justify-center z-20 rounded-lg"
      >
        <div className="bg-card border border-border rounded-xl p-6 text-center max-w-xs shadow-2xl">
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-4 flex justify-center"
          >
            <Lock className="w-12 h-12 text-purple-600" />
          </motion.div>

          <h3 className="font-bold text-foreground text-lg mb-2">Premium Content</h3>

          <p className="text-sm text-muted-foreground mb-3">
            <span className="font-semibold">{featureName}</span>
            {description && ` - ${description}`}
          </p>

          <p className="text-xs text-muted-foreground mb-4">
            Unlock this feature and more with a premium membership!
          </p>

          <Button
            onClick={onUnlock}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold mb-2"
          >
            <Crown className="w-4 h-4 mr-2" />
            Go Premium
          </Button>

          <p className="text-xs text-muted-foreground">
            30-day money-back guarantee
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface PremiumFeatureBadgeProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

export const PremiumFeatureBadge = ({ text = "Premium", size = "md" }: PremiumFeatureBadgeProps) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold cursor-default ${sizeClasses[size]}`}
    >
      <Crown className={size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5"} />
      {text}
    </motion.div>
  );
};

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Zap, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePremium } from "@/context/PremiumContext";
import { MEMBERSHIP_TIERS, PREMIUM_BENEFITS } from "@/data/premiumMembership";

interface PremiumMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumMembershipModal = ({ isOpen, onClose }: PremiumMembershipModalProps) => {
  const { premiumUser, activateMembership, isPremium, getRemainingDays } = usePremium();

  const handleActivate = (tier: "premium_monthly" | "premium_yearly" | "vip") => {
    activateMembership(tier);
    setTimeout(() => onClose(), 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-card border border-border rounded-2xl shadow-xl z-50 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 to-pink-600 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Crown className="w-6 h-6" />
                Premium Membership
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            {/* Current Status */}
            {isPremium && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-700 p-4 mx-6 mt-6 rounded-lg"
              >
                <p className="text-green-800 dark:text-green-200 font-semibold">
                  ✅ You are a {premiumUser.membershipTier.replace(/_/g, " ").toUpperCase()} member!
                </p>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  Your membership expires in {getRemainingDays()} days
                </p>
              </motion.div>
            )}

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Benefits Overview */}
              <div>
                <h3 className="font-bold text-foreground mb-4 text-lg">🎁 Premium Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.values(PREMIUM_BENEFITS).slice(0, 8).map((benefit) => (
                    <motion.div
                      key={benefit.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex gap-3 p-3 rounded-lg bg-secondary/10 border border-border"
                    >
                      <span className="text-2xl">{benefit.icon}</span>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{benefit.title}</p>
                        <p className="text-xs text-muted-foreground">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Membership Tiers */}
              <div>
                <h3 className="font-bold text-foreground mb-4 text-lg">💎 Membership Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {MEMBERSHIP_TIERS.map((tier, idx) => (
                    <motion.div
                      key={tier.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`relative rounded-2xl border-2 overflow-hidden ${
                        idx === 1 ? "border-purple-500 ring-2 ring-purple-300" : "border-border"
                      }`}
                    >
                      {/* Recommended Badge */}
                      {idx === 1 && (
                        <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                          BEST VALUE
                        </div>
                      )}

                      <div className={`bg-gradient-to-br ${tier.color} p-6 text-white`}>
                        <div className="text-4xl mb-2">{tier.emoji}</div>
                        <h4 className="text-2xl font-bold mb-1">{tier.name}</h4>
                        <p className="text-sm opacity-90 mb-4">{tier.description}</p>

                        <div className="space-y-1 mb-6">
                          <p className="text-3xl font-bold">
                            ${tier.price}
                            <span className="text-sm opacity-75">/{tier.billing === "monthly" ? "mo" : "yr"}</span>
                          </p>
                          {tier.billing === "yearly" && tier.id !== "vip" && (
                            <p className="text-xs opacity-90">Save 33% vs monthly</p>
                          )}
                        </div>

                        <Button
                          onClick={() => {
                            const tierKey = tier.id as "premium_monthly" | "premium_yearly" | "vip";
                            handleActivate(tierKey);
                          }}
                          disabled={premiumUser.membershipTier === tier.id}
                          className={`w-full font-bold ${
                            premiumUser.membershipTier === tier.id
                              ? "bg-white/50 text-white cursor-default"
                              : "bg-white text-purple-600 hover:bg-gray-100"
                          }`}
                        >
                          {premiumUser.membershipTier === tier.id ? "Current Plan" : "Upgrade Now"}
                        </Button>
                      </div>

                      <div className="p-4 bg-card space-y-3">
                        <p className="text-xs font-semibold text-muted-foreground">INCLUDES:</p>
                        {tier.benefits.slice(0, 5).map((benefit) => (
                          <div key={benefit.id} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{benefit.title}</p>
                              <p className="text-xs text-muted-foreground">{benefit.description}</p>
                            </div>
                          </div>
                        ))}
                        {tier.benefits.length > 5 && (
                          <p className="text-xs text-purple-600 font-semibold">
                            +{tier.benefits.length - 5} more benefits...
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="space-y-4">
                <h3 className="font-bold text-foreground text-lg">❓ FAQ</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <p className="font-semibold text-foreground mb-2">Can I cancel anytime?</p>
                    <p className="text-sm text-muted-foreground">
                      Yes! You can cancel your subscription at any time and keep access until the end of your billing cycle.
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <p className="font-semibold text-foreground mb-2">What about my progress?</p>
                    <p className="text-sm text-muted-foreground">
                      All your progress, achievements, and unlocked content stay with you forever. Premium benefits are retroactive!
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <p className="font-semibold text-foreground mb-2">Can I upgrade my plan?</p>
                    <p className="text-sm text-muted-foreground">
                      Absolutely! You can upgrade or downgrade your membership at any time. We'll prorate your charges.
                    </p>
                  </div>
                </div>
              </div>

              {/* Money-Back Guarantee */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 text-center">
                <p className="font-bold text-foreground mb-1">💳 30-Day Money-Back Guarantee</p>
                <p className="text-sm text-muted-foreground">
                  Not satisfied? Get a full refund within 30 days of your first purchase.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-card border-t border-border p-6 flex gap-3">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1"
              >
                Maybe Later
              </Button>
              <Button
                onClick={onClose}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Continue Shopping
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export type CartItem = {
  sku: string;
  name: string;
  quantity: number;
  price: number;
  isGift?: boolean;
};

export type PwpRule = {
  triggerSku: string;
  rewardSku: string;
  discountPercent: number;
  description?: string;
};

export type GwpRule = {
  threshold: number;
  giftSku: string;
  giftName: string;
  description?: string;
};

export type BankRule = {
  eligibleBins: string[];
  discountPercent: number;
  cap: number;
  description?: string;
};

export type PromoRules = {
  pwp?: PwpRule;
  gwp?: GwpRule;
  bank?: BankRule;
};

export type AppliedPromotion = {
  type: "PWP" | "GWP" | "BANK";
  amount: number;
  description: string;
};

export type PromoEvaluation = {
  items: CartItem[];
  subtotal: number;
  discounts: AppliedPromotion[];
  total: number;
};

export type PromoContext = {
  items: CartItem[];
  paymentBin?: string;
};

const asCurrency = (amount: number) => `Rp${amount.toLocaleString("id-ID")}`;

export function evaluatePromotions(context: PromoContext, rules: PromoRules): PromoEvaluation {
  const workingItems = context.items.map((item) => ({ ...item }));
  const discounts: AppliedPromotion[] = [];
  const baseSubtotal = workingItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let runningSubtotal = baseSubtotal;

  if (rules.pwp) {
    const { triggerSku, rewardSku, discountPercent, description } = rules.pwp;
    const hasTrigger = workingItems.some((item) => item.sku === triggerSku && item.quantity > 0);
    const rewardItem = workingItems.find((item) => item.sku === rewardSku);

    if (hasTrigger && rewardItem) {
      const rewardValue = rewardItem.price * rewardItem.quantity;
      const discountAmount = Math.round((rewardValue * discountPercent) / 100);
      if (discountAmount > 0) {
        runningSubtotal -= discountAmount;
        discounts.push({
          type: "PWP",
          amount: discountAmount,
          description:
            description ??
            `Diskon ${discountPercent}% untuk ${rewardItem.name} (${asCurrency(discountAmount)})`,
        });
      }
    }
  }

  if (rules.gwp && baseSubtotal >= rules.gwp.threshold) {
    const { giftSku, giftName, description } = rules.gwp;
    const giftExists = workingItems.some((item) => item.sku === giftSku && item.isGift);
    if (!giftExists) {
      workingItems.push({
        sku: giftSku,
        name: giftName,
        quantity: 1,
        price: 0,
        isGift: true,
      });
    }
    discounts.push({
      type: "GWP",
      amount: 0,
      description:
        description ??
        `Gratis ${giftName} karena belanja minimal ${asCurrency(rules.gwp.threshold)}`,
    });
  }

  if (rules.bank && context.paymentBin) {
    const { eligibleBins, discountPercent, cap, description } = rules.bank;
    const isEligible = eligibleBins.includes(context.paymentBin);
    if (isEligible) {
      const bankDiscount = Math.min(Math.round((runningSubtotal * discountPercent) / 100), cap);
      if (bankDiscount > 0) {
        runningSubtotal -= bankDiscount;
        discounts.push({
          type: "BANK",
          amount: bankDiscount,
          description:
            description ??
            `Diskon ${discountPercent}% kartu bank (maks ${asCurrency(cap)})`,
        });
      }
    }
  }

  return {
    items: workingItems,
    subtotal: baseSubtotal,
    discounts,
    total: Math.max(runningSubtotal, 0),
  };
}

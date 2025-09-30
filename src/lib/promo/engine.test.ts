import { describe, expect, it } from "vitest";

import { evaluatePromotions, type CartItem, type PromoRules } from "./engine";

const baseItems: CartItem[] = [
  { sku: "SKU-A", name: "Vitamin C", quantity: 1, price: 35000 },
  { sku: "SKU-B", name: "Probiotik", quantity: 1, price: 28000 },
];

describe("evaluatePromotions", () => {
  it("applies PWP discount when trigger and reward items are present", () => {
    const rules: PromoRules = {
      pwp: {
        triggerSku: "SKU-A",
        rewardSku: "SKU-B",
        discountPercent: 50,
      },
    };

    const result = evaluatePromotions({ items: baseItems }, rules);

    expect(result.subtotal).toBe(63000);
    expect(result.discounts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "PWP", amount: 14000 }),
      ])
    );
    expect(result.total).toBe(49000);
  });

  it("adds gift item when subtotal meets GWP threshold", () => {
    const rules: PromoRules = {
      gwp: {
        threshold: 60000,
        giftSku: "GIFT-01",
        giftName: "Hand Sanitizer",
      },
    };

    const result = evaluatePromotions({ items: baseItems }, rules);
    const gift = result.items.find((item) => item.sku === "GIFT-01");

    expect(gift).toMatchObject({ isGift: true, price: 0, quantity: 1 });
    expect(result.discounts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "GWP" }),
      ])
    );
  });

  it("caps bank discount according to rule", () => {
    const rules: PromoRules = {
      bank: {
        eligibleBins: ["601101"],
        discountPercent: 10,
        cap: 3000,
      },
    };

    const result = evaluatePromotions({ items: baseItems, paymentBin: "601101" }, rules);

    expect(result.discounts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "BANK", amount: 3000 }),
      ])
    );
    expect(result.total).toBe(60000);
  });

  it("handles combined promotions sequentially", () => {
    const rules: PromoRules = {
      pwp: {
        triggerSku: "SKU-A",
        rewardSku: "SKU-B",
        discountPercent: 50,
      },
      gwp: {
        threshold: 60000,
        giftSku: "GIFT-01",
        giftName: "Hand Sanitizer",
      },
      bank: {
        eligibleBins: ["601101"],
        discountPercent: 5,
        cap: 5000,
      },
    };

    const result = evaluatePromotions({ items: baseItems, paymentBin: "601101" }, rules);

    expect(result.items.some((item) => item.isGift)).toBe(true);
    expect(result.total).toBe(46550);
    expect(result.discounts).toHaveLength(3);
  });
});

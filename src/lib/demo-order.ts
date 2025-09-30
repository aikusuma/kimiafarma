export type CartItem = {
  sku: string;
  name: string;
  qty: number;
  price: number;
};

export const demoOrder = {
  id: "KFA-240923-01",
  items: [
    { sku: "SKU-A", name: "Paracetamol 500mg", qty: 2, price: 12500 },
    { sku: "SKU-B", name: "Vitamin C 1000mg", qty: 1, price: 35000 },
    { sku: "SKU-C", name: "Hand Sanitizer 60ml", qty: 1, price: 18000 },
  ] as CartItem[],
  shipping: {
    provider: "Grab Instant",
    service: "Same Day",
    pickup: "88Office Casablanca",
    destination: "Revenue Tower SCBD",
    cost: 65000,
    trackingId: "GRB-1452201",
    eta: "30-45 menit",
    driver: {
      name: "Bayu",
      contact: "+62 812-3456-7890",
    },
  },
  payment: {
    method: "GoPay",
    status: "Menunggu Pembayaran",
  },
};

export function calculateTotals({
  items = demoOrder.items,
  shippingCost = demoOrder.shipping.cost,
}: {
  items?: CartItem[];
  shippingCost?: number;
} = {}) {
  const itemsTotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const shipping = shippingCost;
  return {
    itemsTotal,
    shipping,
    grandTotal: itemsTotal + shipping,
  };
}

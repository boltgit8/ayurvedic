import type { OfferTier, Product, CartItem } from '@/types';
import { getProductById } from '@/data/products';

export const offerTiers: OfferTier[] = [
  {
    minMRP: 199,
    maxMRP: 999,
    type: 'B2G1',
    discountPercent: 20,
    label: 'Buy 2 Get 1 Free + 20% Off',
  },
  {
    minMRP: 1199,
    maxMRP: 4480,
    type: 'B1G1',
    discountPercent: 20,
    label: 'Buy 1 Get 1 Free + 20% Off',
  },
];

export function getOfferTierForMRP(mrp: number): OfferTier | null {
  return offerTiers.find((t) => mrp >= t.minMRP && mrp <= t.maxMRP) ?? null;
}

export function isProductOfferEligible(product: Product): boolean {
  if (!product.offerEligible) return false;
  if (product.offerOverride === 'gps-special') return false;
  if (product.offerOverride === 'fixed-price') return false;
  return getOfferTierForMRP(product.mrp) !== null;
}

export function getOfferBadgeForProduct(product: Product): string | null {
  if (product.offerOverride === 'gps-special') return '1 Year Recharge Free';
  if (product.offerOverride === 'fixed-price') return 'Special Package Price';
  if (product.offerOverride === 'B2G1-low-margin') {
    return 'Buy 2 Get 1 Free';
  }
  const tier = getOfferTierForMRP(product.mrp);
  if (!tier || !product.offerEligible) return null;
  return tier.label;
}

export function getEligibleFreeItems(productId: string): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  const tier = getOfferTierForMRP(product.mrp);
  if (!tier) return [];

  return Object.values(getAllProductsMap()).filter(
    (p) =>
      p.id !== product.id &&
      p.offerEligible &&
      p.availability === 'in-stock' &&
      p.mrp <= product.mrp &&
      getOfferTierForMRP(p.mrp) !== null
  );
}

import { products } from '@/data/products';

function getAllProductsMap(): Record<string, Product> {
  const map: Record<string, Product> = {};
  for (const p of products) {
    map[p.id] = p;
  }
  return map;
}

export interface CartLineItem {
  product: Product;
  quantity: number;
  isFreeItem: boolean;
  freeItemFor?: string;
  lineTotal: number;
  originalTotal: number;
  discountAmount: number;
}

export interface CartSummary {
  lineItems: CartLineItem[];
  subtotal: number;
  totalDiscount: number;
  freeItems: { product: Product; quantity: number }[];
  total: number;
  totalItems: number;
  totalPaidItems: number;
  totalFreeItems: number;
  b2g1QualifyingItems: { product: Product; quantity: number; freeRemaining: number }[];
  b1g1QualifyingItems: { product: Product; quantity: number; freeRemaining: number }[];
}

export function calculateCartSummary(cartItems: CartItem[]): CartSummary {
  const productMap = getAllProductsMap();
  const lineItems: CartLineItem[] = [];

  const paidItems = cartItems.filter((item) => !item.isFreeItem);
  const freeItemsInCart = cartItems.filter((item) => item.isFreeItem);

  let subtotal = 0;
  let totalDiscount = 0;
  const freeItemsList: { product: Product; quantity: number }[] = [];

  for (const item of paidItems) {
    const product = productMap[item.productId];
    if (!product) continue;

    const qty = Math.max(0, item.quantity);
    const originalTotal = product.sellingPrice * qty;
    const lineTotal = originalTotal;
    const discountAmount = 0;

    subtotal += originalTotal;
    lineItems.push({
      product,
      quantity: qty,
      isFreeItem: false,
      lineTotal,
      originalTotal,
      discountAmount,
    });
  }

  for (const item of freeItemsInCart) {
    const product = productMap[item.productId];
    if (!product) continue;

    const qty = Math.max(0, item.quantity);
    const lineTotal = 0;

    freeItemsList.push({ product, quantity: qty });
    lineItems.push({
      product,
      quantity: qty,
      isFreeItem: true,
      freeItemFor: item.freeItemFor,
      lineTotal,
      originalTotal: 0,
      discountAmount: 0,
    });
  }

  const totalPaidItems = paidItems.reduce((sum, item) => sum + Math.max(0, item.quantity), 0);
  const totalFreeItems = freeItemsInCart.reduce((sum, item) => sum + Math.max(0, item.quantity), 0);

  const b2g1QualifyingItems = computeQualifyingItems(lineItems, 'B2G1');
  const b1g1QualifyingItems = computeQualifyingItems(lineItems, 'B1G1');

  const total = subtotal - totalDiscount;
  const totalItems = totalPaidItems + totalFreeItems;

  return {
    lineItems,
    subtotal,
    totalDiscount,
    freeItems: freeItemsList,
    total,
    totalItems,
    totalPaidItems,
    totalFreeItems,
    b2g1QualifyingItems,
    b1g1QualifyingItems,
  };
}

function computeQualifyingItems(
  lineItems: CartLineItem[],
  tierType: 'B2G1' | 'B1G1'
): { product: Product; quantity: number; freeRemaining: number }[] {
  const qualifying = lineItems.filter((li) => !li.isFreeItem);
  const result: { product: Product; quantity: number; freeRemaining: number }[] = [];

  for (const li of qualifying) {
    const tier = getOfferTierForMRP(li.product.mrp);
    if (!tier || tier.type !== tierType) continue;
    if (!isProductOfferEligible(li.product)) continue;

    let freeEarned = 0;
    if (tierType === 'B2G1') {
      freeEarned = Math.floor(li.quantity / 2);
    } else {
      freeEarned = li.quantity;
    }

    const freeAllocated = lineItems
      .filter((f) => f.isFreeItem && f.freeItemFor === li.product.id)
      .reduce((sum, f) => sum + f.quantity, 0);

    const freeRemaining = Math.max(0, freeEarned - freeAllocated);
    if (freeEarned > 0) {
      result.push({ product: li.product, quantity: li.quantity, freeRemaining });
    }
  }

  return result;
}

export function getFreeItemEligibility(freeProductId: string, qualifyingProductId: string): boolean {
  const freeProduct = getProductById(freeProductId);
  const qualifyingProduct = getProductById(qualifyingProductId);
  if (!freeProduct || !qualifyingProduct) return false;
  if (!isProductOfferEligible(freeProduct)) return false;
  if (freeProduct.availability !== 'in-stock') return false;
  return freeProduct.mrp <= qualifyingProduct.mrp;
}

export function formatPrice(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  const hasDecimals = rounded % 1 !== 0;
  if (hasDecimals) {
    return `₹${rounded.toFixed(2)}`;
  }
  return `₹${rounded}`;
}

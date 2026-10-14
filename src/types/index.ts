export type CategorySlug =
  | 'wellness'
  | 'atta'
  | 'suits'
  | 'appliances'
  | 'combos'
  | 'electronics'
  | 'skincare'
  | 'homecare'
  | 'footwear'
  | 'other';

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  enabled: boolean;
  imageQuery: string;
  icon: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  mrp: number;
  sellingPrice: number;
  packSize: string;
  imageQuery: string;
  description: string;
  shortDescription: string;
  availability: 'in-stock' | 'out-of-stock' | 'coming-soon';
  stock: number | null;
  offerEligible: boolean;
  offerOverride: string | null;
  ingredients?: string[];
  details?: string[];
  bestseller: boolean;
  featured: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  isFreeItem: boolean;
  freeItemFor?: string;
}

export interface OfferTier {
  minMRP: number;
  maxMRP: number;
  type: 'B2G1' | 'B1G1';
  discountPercent: number;
  label: string;
}

export interface OfferResult {
  discount: number;
  freeItems: { productId: string; quantity: number }[];
  totalBeforeDiscount: number;
  totalAfterDiscount: number;
}

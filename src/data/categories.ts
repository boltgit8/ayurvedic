import type { Category } from '@/types';

export const categories: Category[] = [
  {
    slug: 'wellness',
    name: 'Wellness & Herbal Care',
    shortName: 'Wellness',
    description: 'Premium herbal powders, juices, teas, syrups and tablets crafted from traditional Indian botanical wisdom.',
    enabled: true,
    imageQuery: 'ayurvedic herbal wellness powder natural',
    icon: 'Leaf',
  },
  {
    slug: 'atta',
    name: 'Grocery & Atta',
    shortName: 'Atta',
    description: 'Nutrient-rich multigrain flour blends made from wholesome, natural ingredients.',
    enabled: true,
    imageQuery: 'whole grain flour wheat bread',
    icon: 'Wheat',
  },
  {
    slug: 'suits',
    name: 'Suits & Clothing',
    shortName: 'Clothing',
    description: 'Elegant Indian ethnic wear and contemporary clothing for every occasion.',
    enabled: true,
    imageQuery: 'indian ethnic wear salwar suit fabric',
    icon: 'ShirtIcon',
  },
  {
    slug: 'appliances',
    name: 'Home Appliances',
    shortName: 'Appliances',
    description: 'Modern home appliances to make everyday living easier and more efficient.',
    enabled: true,
    imageQuery: 'modern home kitchen appliance',
    icon: 'Plug',
  },
  {
    slug: 'combos',
    name: 'Combos & Offers',
    shortName: 'Combos',
    description: 'Curated wellness bundles and value packs designed for maximum savings.',
    enabled: true,
    imageQuery: 'wellness gift bundle package',
    icon: 'Gift',
  },
  {
    slug: 'electronics',
    name: 'Electronics / GPS Solutions',
    shortName: 'Electronics',
    description: 'GPS tracking solutions and electronic devices for vehicle security.',
    enabled: true,
    imageQuery: 'gps tracker device car',
    icon: 'Navigation',
  },
  {
    slug: 'skincare',
    name: 'Face & Skin Care',
    shortName: 'Skincare',
    description: 'Natural skincare and cosmetic products for healthy, radiant skin.',
    enabled: false,
    imageQuery: 'natural skincare cosmetic products',
    icon: 'Sparkles',
  },
  {
    slug: 'homecare',
    name: 'Home Care',
    shortName: 'Home Care',
    description: 'Essential home care products for a clean and healthy living space.',
    enabled: false,
    imageQuery: 'eco friendly home care cleaning',
    icon: 'Home',
  },
  {
    slug: 'footwear',
    name: 'Footwear',
    shortName: 'Footwear',
    description: 'Comfortable and stylish footwear for everyday wear.',
    enabled: false,
    imageQuery: 'casual footwear shoes leather',
    icon: 'Footprints',
  },
  {
    slug: 'other',
    name: 'Other Categories',
    shortName: 'Other',
    description: 'Discover more products from Gaps Magic Wellness.',
    enabled: false,
    imageQuery: 'wellness lifestyle products',
    icon: 'Package',
  },
];

export function getEnabledCategories(): Category[] {
  return categories.filter((c) => c.enabled);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

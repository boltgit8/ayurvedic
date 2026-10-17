import type { Product, Category } from '@/types';
import { products } from '@/data/products';
import { categories } from '@/data/categories';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CategoryListResponse {
  categories: Category[];
}

function delay(ms: number = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const api = {
  async getProducts(params?: {
    category?: string;
    search?: string;
    sort?: 'name' | 'price-low' | 'price-high' | 'mrp';
    page?: number;
    perPage?: number;
  }): Promise<ApiResponse<ProductListResponse>> {
    await delay();
    let filtered = [...products];

    if (params?.category) {
      filtered = filtered.filter((p) => p.category === params.category);
    }

    if (params?.search) {
      const q = params.search.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    if (params?.sort) {
      switch (params.sort) {
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'price-low':
          filtered.sort((a, b) => a.sellingPrice - b.sellingPrice);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.sellingPrice - a.sellingPrice);
          break;
        case 'mrp':
          filtered.sort((a, b) => a.mrp - b.mrp);
          break;
      }
    }

    const page = params?.page ?? 1;
    const perPage = params?.perPage ?? 12;
    const total = filtered.length;
    const totalPages = Math.ceil(total / perPage) || 1;
    const start = (page - 1) * perPage;
    const paginated = filtered.slice(start, start + perPage);

    return {
      success: true,
      data: { products: paginated, total, page, totalPages },
    };
  },

  async getProduct(slug: string): Promise<ApiResponse<Product | null>> {
    await delay();
    const product = products.find((p) => p.slug === slug);
    return { success: true, data: product ?? null };
  },

  async getCategories(): Promise<ApiResponse<CategoryListResponse>> {
    await delay(100);
    return {
      success: true,
      data: { categories: categories.filter((c) => c.enabled) },
    };
  },

  async trackOrder(_orderId: string, _email: string): Promise<ApiResponse<null>> {
    await delay(500);
    return {
      success: false,
      data: null,
      message: 'Order tracking requires backend integration. This is a frontend placeholder.',
    };
  },

  async placeOrder(_orderData: unknown): Promise<ApiResponse<null>> {
    await delay(500);
    return {
      success: false,
      data: null,
      message: 'Order placement requires PHP + MySQL backend integration. This is a frontend placeholder.',
    };
  },

  async login(_email: string, _password: string): Promise<ApiResponse<null>> {
    await delay(500);
    return {
      success: false,
      data: null,
      message: 'Authentication requires PHP + MySQL backend integration. This is a frontend placeholder.',
    };
  },

  async register(_name: string, _email: string, _password: string): Promise<ApiResponse<null>> {
    await delay(500);
    return {
      success: false,
      data: null,
      message: 'Account registration requires PHP + MySQL backend integration. This is a frontend placeholder.',
    };
  },
};

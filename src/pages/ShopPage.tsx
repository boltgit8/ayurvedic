import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid, List } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { products } from '@/data/products';
import { getEnabledCategories, getCategoryBySlug } from '@/data/categories';
import type { Product } from '@/types';

type SortOption = 'name' | 'price-low' | 'price-high' | 'mrp';

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState<SortOption>('name');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [visibleCount, setVisibleCount] = useState(12);
  const enabledCategories = getEnabledCategories();

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }
    switch (sort) {
      case 'name': list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'price-low': list.sort((a, b) => a.sellingPrice - b.sellingPrice); break;
      case 'price-high': list.sort((a, b) => b.sellingPrice - a.sellingPrice); break;
      case 'mrp': list.sort((a, b) => a.mrp - b.mrp); break;
    }
    return list;
  }, [selectedCategory, sort]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(12);
    if (cat === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="container-page py-8">
      <Breadcrumb items={[{ label: 'Shop All Products' }]} />

      <div className="mt-4 mb-8">
        <h1 className="font-serif text-3xl font-semibold text-forest-800">All Products</h1>
        <p className="mt-2 text-sm text-forest-500">Browse our complete range of wellness, grocery and lifestyle products.</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar filters */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="rounded-xl border border-cream-200 bg-white p-5 lg:sticky lg:top-44">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="h-4 w-4 text-forest-500" />
              <h2 className="font-serif text-base font-medium text-forest-800">Filters</h2>
            </div>

            <div className="mb-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-sage-500 mb-2">Category</h3>
              <div className="space-y-1">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    selectedCategory === 'all' ? 'bg-forest-50 text-forest-700 font-medium' : 'text-forest-500 hover:bg-cream-50'
                  }`}
                >
                  All Categories
                </button>
                {enabledCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      selectedCategory === cat.slug ? 'bg-forest-50 text-forest-700 font-medium' : 'text-forest-500 hover:bg-cream-50'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          {/* Sort bar */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <p className="text-sm text-forest-500">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-forest-500">Sort:</label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-lg border border-cream-300 bg-white px-3 py-1.5 text-sm text-forest-700 focus:border-forest-400 focus:ring-2 focus:ring-forest-200"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="mrp">MRP (Low to High)</option>
              </select>
            </div>
          </div>

          {visibleProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-cream-200 bg-white py-20">
              <p className="font-serif text-lg text-forest-600">No products found</p>
              <p className="mt-1 text-sm text-forest-400">Try a different category or filter.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {visibleProducts.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {visibleCount < filteredProducts.length && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 8)}
                    className="btn-secondary"
                  >
                    Load More Products
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

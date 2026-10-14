import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Leaf } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { searchProducts } from '@/data/products';
import { Breadcrumb } from '@/components/Breadcrumb';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = query ? searchProducts(query) : [];

  return (
    <div className="container-page py-8">
      <Breadcrumb items={[{ label: 'Search Results' }]} />

      <div className="mt-6 mb-8">
        <h1 className="font-serif text-2xl font-semibold text-forest-800 sm:text-3xl">
          Search Results
        </h1>
        {query && (
          <p className="mt-2 text-sm text-forest-500">
            {results.length > 0
              ? `${results.length} product${results.length !== 1 ? 's' : ''} found for "${query}"`
              : `No products found for "${query}"`}
          </p>
        )}
      </div>

      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-cream-200 bg-white py-20">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-100 mb-4">
            <SearchIcon className="h-8 w-8 text-forest-300" />
          </div>
          <p className="font-serif text-lg text-forest-600">No matching products</p>
          <p className="mt-1 text-sm text-forest-400 max-w-md text-center">
            Try a different search term, or browse our full product range.
          </p>
          <Link to="/shop" className="btn-primary mt-6">
            Browse All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

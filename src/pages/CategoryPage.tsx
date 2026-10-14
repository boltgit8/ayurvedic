import { useParams } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { getCategoryBySlug } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import { getCategoryImage } from '@/data/images';
import { ProductImage } from '@/components/ProductImage';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;
  const categoryProducts = slug ? getProductsByCategory(slug) : [];
  const image = slug ? getCategoryImage(slug) : undefined;

  if (!category || !category.enabled) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="font-serif text-2xl font-semibold text-forest-800">Category Not Found</h1>
        <p className="mt-2 text-sm text-forest-500">This category may not be available yet.</p>
        <Link to="/shop" className="btn-primary mt-6">Browse All Products</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Category hero */}
      <div className="relative h-48 sm:h-64 overflow-hidden bg-forest-800">
        <ProductImage src={image} alt={category.name} aspectRatio="wide" className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 to-forest-900/30" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container-page">
            <Breadcrumb items={[{ label: category.name }]} />
            <h1 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-cream-50">{category.name}</h1>
          </div>
        </div>
      </div>

      <div className="container-page py-8">
        <p className="text-sm text-forest-500 max-w-2xl mb-8">{category.description}</p>

        {categoryProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-cream-200 bg-white py-20">
            <Leaf className="h-10 w-10 text-forest-300 mb-3" />
            <p className="font-serif text-lg text-forest-600">Products Coming Soon</p>
            <p className="mt-1 text-sm text-forest-400">We are curating products for this category.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-forest-500 mb-6">
              {categoryProducts.length} product{categoryProducts.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

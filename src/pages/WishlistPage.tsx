import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { getProductById } from '@/data/products';
import { getProductImage } from '@/data/images';
import { ProductImage } from '@/components/ProductImage';
import { Breadcrumb } from '@/components/Breadcrumb';
import { formatPrice } from '@/utils/offerEngine';

export function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const wishlistProducts = wishlist
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  if (wishlistProducts.length === 0) {
    return (
      <div className="container-page py-8">
        <Breadcrumb items={[{ label: 'Wishlist' }]} />
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-cream-200 bg-white py-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-100 mb-4">
            <Heart className="h-10 w-10 text-forest-300" />
          </div>
          <h1 className="font-serif text-2xl font-semibold text-forest-800">Your Wishlist is Empty</h1>
          <p className="mt-2 text-sm text-forest-500 max-w-md text-center">
            Save products you love by tapping the heart icon on any product.
          </p>
          <Link to="/shop" className="btn-primary mt-6">
            Browse Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <Breadcrumb items={[{ label: 'Wishlist' }]} />

      <h1 className="mt-6 mb-8 font-serif text-2xl font-semibold text-forest-800 sm:text-3xl">
        My Wishlist ({wishlistProducts.length})
      </h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {wishlistProducts.map((product) => {
          const image = getProductImage(product.slug);
          return (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-cream-200 bg-white transition-all hover:shadow-lg"
            >
              <Link to={`/product/${product.slug}`} className="relative overflow-hidden">
                <ProductImage
                  src={image}
                  alt={product.name}
                  aspectRatio="square"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <button
                onClick={() => {
                  removeFromWishlist(product.id);
                  showToast('Removed from wishlist', 'info');
                }}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition-all hover:bg-white"
                aria-label="Remove from wishlist"
              >
                <Heart className="h-4 w-4 fill-accent-500 text-accent-500" />
              </button>
              <div className="flex flex-1 flex-col p-4">
                <Link to={`/product/${product.slug}`}>
                  <h3 className="line-clamp-2 font-serif text-sm font-medium text-forest-800 hover:text-forest-600">
                    {product.name}
                  </h3>
                </Link>
                <p className="mt-0.5 text-xs text-forest-400">{product.packSize}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-sans text-base font-semibold text-forest-800">
                    {formatPrice(product.sellingPrice)}
                  </span>
                  {product.mrp > product.sellingPrice && (
                    <span className="text-xs text-forest-400 line-through">{formatPrice(product.mrp)}</span>
                  )}
                </div>
                <button
                  onClick={() => {
                    if (product.availability === 'in-stock') {
                      addItem(product.id, 1);
                      showToast(`${product.name} added to cart`, 'success');
                    } else {
                      showToast('Product not available', 'error');
                    }
                  }}
                  disabled={product.availability !== 'in-stock'}
                  className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-forest-600 px-4 py-2 text-xs font-medium text-cream-50 transition-all hover:bg-forest-700 disabled:opacity-50"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

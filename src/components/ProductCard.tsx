import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import type { Product } from '@/types';
import { getProductImage } from '@/data/images';
import { formatPrice, getOfferBadgeForProduct } from '@/utils/offerEngine';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const image = getProductImage(product.slug);
  const badge = getOfferBadgeForProduct(product);
  const inWishlist = isInWishlist(product.id);
  const discountPercent = Math.round((1 - product.sellingPrice / product.mrp) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.availability !== 'in-stock') {
      showToast(`${product.name} is not available for purchase`, 'error');
      return;
    }
    addItem(product.id, 1);
    showToast(`${product.name} added to cart`, 'success');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist', 'info');
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-cream-200 bg-white transition-all hover:shadow-xl hover:border-forest-200"
    >
      <div className="relative overflow-hidden">
        <ProductImage
          src={image}
          alt={product.name}
          aspectRatio="square"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {badge && (
            <span className="badge bg-forest-600 text-cream-50 shadow-sm">{badge}</span>
          )}
          {discountPercent > 0 && (
            <span className="badge bg-accent-500 text-white shadow-sm">{discountPercent}% Off</span>
          )}
        </div>
        <button
          onClick={handleWishlist}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition-all hover:bg-white"
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`h-4 w-4 transition-all ${inWishlist ? 'fill-accent-500 text-accent-500' : 'text-forest-400'}`}
          />
        </button>
        {product.availability !== 'in-stock' && (
          <div className="absolute inset-0 flex items-center justify-center bg-forest-900/40">
            <span className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-forest-800">
              {product.availability === 'out-of-stock' ? 'Out of Stock' : 'Coming Soon'}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-sage-500">
          {product.category}
        </span>
        <h3 className="mt-1 line-clamp-2 font-serif text-base font-medium text-forest-800">
          {product.name}
        </h3>
        <p className="mt-0.5 text-xs text-forest-400">{product.packSize}</p>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-sans text-lg font-semibold text-forest-800">
            {formatPrice(product.sellingPrice)}
          </span>
          {product.mrp > product.sellingPrice && (
            <span className="text-sm text-forest-400 line-through">
              {formatPrice(product.mrp)}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <button
            onClick={handleAddToCart}
            disabled={product.availability !== 'in-stock'}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-forest-600 px-4 py-2 text-xs font-medium text-cream-50 transition-all hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add to Cart
          </button>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cream-300 text-forest-500 transition-all group-hover:border-forest-300 group-hover:text-forest-600">
            <Eye className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

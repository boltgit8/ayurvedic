import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  ShoppingBag,
  Heart,
  Truck,
  Shield,
  Check,
  Minus,
  Plus,
  ChevronRight,
  Info,
  Leaf,
} from 'lucide-react';
import { getProductBySlug, getProductsByCategory } from '@/data/products';
import { getProductImage } from '@/data/images';
import { getCategoryBySlug } from '@/data/categories';
import { ProductImage } from '@/components/ProductImage';
import { ProductCard } from '@/components/ProductCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { formatPrice, getOfferBadgeForProduct, isProductOfferEligible, getOfferTierForMRP } from '@/utils/offerEngine';
import { siteConfig } from '@/data/siteConfig';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="font-serif text-2xl font-semibold text-forest-800">Product Not Found</h1>
        <p className="mt-2 text-sm text-forest-500">This product may have been removed.</p>
        <Link to="/shop" className="btn-primary mt-6">Browse All Products</Link>
      </div>
    );
  }

  const image = getProductImage(product.slug);
  const category = getCategoryBySlug(product.category);
  const badge = getOfferBadgeForProduct(product);
  const inWishlist = isInWishlist(product.id);
  const discountPercent = Math.round((1 - product.sellingPrice / product.mrp) * 100);
  const offerTier = getOfferTierForMRP(product.mrp);
  const offerEligible = isProductOfferEligible(product);
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (product.availability !== 'in-stock') {
      showToast(`${product.name} is not available for purchase`, 'error');
      return;
    }
    addItem(product.id, quantity);
    showToast(`${product.name} added to cart`, 'success');
  };

  const handleBuyNow = () => {
    if (product.availability !== 'in-stock') return;
    addItem(product.id, quantity);
    navigate('/cart');
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    showToast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist', 'info');
  };

  return (
    <div className="container-page py-8">
      <Breadcrumb
        items={[
          { label: category?.name ?? 'Category', path: `/category/${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-cream-200 bg-white">
            <ProductImage src={image} alt={product.name} aspectRatio="square" loading="eager" />
          </div>
          <div className="absolute left-4 top-4 flex flex-col gap-2">
            {badge && (
              <span className="badge bg-forest-600 text-cream-50 shadow-sm">{badge}</span>
            )}
            {discountPercent > 0 && (
              <span className="badge bg-accent-500 text-white shadow-sm">{discountPercent}% Off</span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase tracking-wide text-sage-500">
            {category?.name}
          </span>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-forest-800">
            {product.name}
          </h1>
          <p className="mt-1 text-sm text-forest-400">{product.packSize}</p>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-sans text-3xl font-bold text-forest-800">
              {formatPrice(product.sellingPrice)}
            </span>
            {product.mrp > product.sellingPrice && (
              <span className="text-lg text-forest-400 line-through">
                {formatPrice(product.mrp)}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="badge bg-accent-100 text-accent-700">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Availability */}
          <div className="mt-4">
            {product.availability === 'in-stock' ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-600">
                <Check className="h-4 w-4" /> In Stock
                {product.stock !== null && product.stock < 60 && (
                  <span className="text-forest-400">({product.stock} units available)</span>
                )}
              </span>
            ) : product.availability === 'out-of-stock' ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-600">
                Out of Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-600">
                Coming Soon
              </span>
            )}
          </div>

          {/* Offer info */}
          {offerEligible && offerTier && (
            <div className="mt-4 rounded-lg border border-forest-200 bg-forest-50 p-4">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest-600" />
                <div>
                  <p className="text-sm font-medium text-forest-700">
                    Offer: {offerTier.label}
                  </p>
                  <p className="mt-1 text-xs text-forest-500 leading-relaxed">
                    {offerTier.type === 'B2G1'
                      ? 'Buy 2 of this product to get 1 free item. You can choose a free product whose MRP is equal to or lower than this product\'s MRP.'
                      : 'Buy 1 of this product to get 1 free item. You can choose a free product whose MRP is equal to or lower than this product\'s MRP.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {product.offerOverride === 'gps-special' && (
            <div className="mt-4 rounded-lg border border-gold-200 bg-gold-50 p-4">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-600" />
                <div>
                  <p className="text-sm font-medium text-gold-800">
                    Special Offer: One Year Recharge Free
                  </p>
                  <p className="mt-1 text-xs text-gold-700 leading-relaxed">
                    This GPS tracker includes one year of recharge free. Price is fixed at {formatPrice(2999)}.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mt-6">
            <h2 className="font-serif text-base font-medium text-forest-800 mb-2">Description</h2>
            <p className="text-sm text-forest-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mt-4">
              <h2 className="font-serif text-base font-medium text-forest-800 mb-2">Ingredients</h2>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, idx) => (
                  <span key={idx} className="badge bg-cream-100 text-forest-600 border border-cream-200">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Details list */}
          {product.details && product.details.length > 0 && (
            <div className="mt-4">
              <h2 className="font-serif text-base font-medium text-forest-800 mb-2">Product Details</h2>
              <ul className="space-y-1">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-forest-600">
                    <ChevronRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-forest-400" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity + Actions */}
          {product.availability === 'in-stock' && (
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center rounded-full border border-cream-300 bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-forest-600 hover:bg-cream-50"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-sm font-medium text-forest-800">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-forest-600 hover:bg-cream-50"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="btn-gold flex-1"
              >
                Buy Now
              </button>

              <button
                onClick={handleWishlist}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-cream-300 text-forest-500 transition-all hover:border-forest-300 hover:text-forest-600"
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`h-5 w-5 ${inWishlist ? 'fill-accent-500 text-accent-500' : ''}`} />
              </button>
            </div>
          )}

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-cream-200 pt-6">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-forest-500" />
              <span className="text-xs text-forest-500">Delivery across India</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-forest-500" />
              <span className="text-xs text-forest-500">Customer support available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="font-serif text-2xl font-semibold text-forest-800 mb-6">Related Products</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((rp) => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-12 rounded-lg border border-cream-200 bg-cream-50 p-4">
        <div className="flex items-start gap-2">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest-400" />
          <p className="text-xs text-forest-500 leading-relaxed">
            Consult your healthcare professional before using any wellness product. These products are not intended to diagnose, treat, cure, or prevent any disease. Product images are for illustration; actual packaging may vary.
          </p>
        </div>
      </div>
    </div>
  );
}

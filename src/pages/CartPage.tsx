import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Gift,
  ChevronRight,
  Info,
  ArrowRight,
  Check,
  X,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { getProductImage } from '@/data/images';
import { ProductImage } from '@/components/ProductImage';
import { Breadcrumb } from '@/components/Breadcrumb';
import {
  formatPrice,
  getEligibleFreeItems,
  getOfferTierForMRP,
  isProductOfferEligible,
} from '@/utils/offerEngine';
import { siteConfig } from '@/data/siteConfig';
import type { Product } from '@/types';

export function CartPage() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, addFreeItem, removeFreeItem, clearCart, summary } = useCart();
  const { showToast } = useToast();
  const [freeItemModalFor, setFreeItemModalFor] = useState<Product | null>(null);

  if (items.length === 0) {
    return (
      <div className="container-page py-8">
        <Breadcrumb items={[{ label: 'Cart' }]} />
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-cream-200 bg-white py-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-100 mb-4">
            <ShoppingBag className="h-10 w-10 text-forest-300" />
          </div>
          <h1 className="font-serif text-2xl font-semibold text-forest-800">Your Cart is Empty</h1>
          <p className="mt-2 text-sm text-forest-500 max-w-md text-center">
            Discover our premium wellness products and start your journey to a healthier lifestyle.
          </p>
          <Link to="/shop" className="btn-primary mt-6">
            Start Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const paidItems = summary.lineItems.filter((li) => !li.isFreeItem);
  const freeItems = summary.lineItems.filter((li) => li.isFreeItem);

  return (
    <div className="container-page py-8">
      <Breadcrumb items={[{ label: 'Cart' }]} />

      <div className="mt-6 mb-8 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-forest-800 sm:text-3xl">
          Shopping Cart
        </h1>
        <button
          onClick={() => {
            clearCart();
            showToast('Cart cleared', 'info');
          }}
          className="text-sm text-forest-400 hover:text-accent-600 transition-colors"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Paid items */}
          {paidItems.map((item) => {
            const image = getProductImage(item.product.slug);
            const tier = getOfferTierForMRP(item.product.mrp);
            const offerEligible = isProductOfferEligible(item.product);
            const freeEarned =
              tier?.type === 'B2G1' ? Math.floor(item.quantity / 2) : tier?.type === 'B1G1' ? item.quantity : 0;
            const freeAllocated = freeItems
              .filter((f) => f.freeItemFor === item.product.id)
              .reduce((sum, f) => sum + f.quantity, 0);
            const freeRemaining = Math.max(0, (freeEarned ?? 0) - freeAllocated);

            return (
              <div
                key={item.product.id}
                className="rounded-xl border border-cream-200 bg-white p-4"
              >
                <div className="flex gap-4">
                  <Link to={`/product/${item.product.slug}`} className="flex-shrink-0">
                    <div className="h-24 w-24 overflow-hidden rounded-lg sm:h-28 sm:w-28">
                      <ProductImage src={image} alt={item.product.name} aspectRatio="square" />
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          to={`/product/${item.product.slug}`}
                          className="font-serif text-sm font-medium text-forest-800 hover:text-forest-600 sm:text-base"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-0.5 text-xs text-forest-400">{item.product.packSize}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, false)}
                        className="flex-shrink-0 rounded-lg p-1.5 text-forest-300 hover:bg-cream-50 hover:text-accent-600"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-sans text-base font-semibold text-forest-800">
                        {formatPrice(item.product.sellingPrice)}
                      </span>
                      {item.product.mrp > item.product.sellingPrice && (
                        <span className="text-xs text-forest-400 line-through">
                          {formatPrice(item.product.mrp)}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-full border border-cream-300">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, false)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-forest-600 hover:bg-cream-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium text-forest-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, false)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-forest-600 hover:bg-cream-50"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-medium text-forest-700">
                        {formatPrice(item.lineTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Free item selection */}
                {offerEligible && tier && (freeEarned ?? 0) > 0 && (
                  <div className="mt-3 border-t border-cream-100 pt-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Gift className="h-4 w-4 text-gold-500" />
                      <span className="font-medium text-forest-700">
                        {tier.type === 'B2G1' ? 'Buy 2 Get 1 Free' : 'Buy 1 Get 1 Free'}:
                      </span>
                      <span className="text-forest-500">
                        {freeAllocated} of {freeEarned} free item{freeEarned !== 1 ? 's' : ''} selected
                      </span>
                    </div>
                    {freeRemaining > 0 && (
                      <button
                        onClick={() => setFreeItemModalFor(item.product)}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gold-50 border border-gold-200 px-4 py-2 text-xs font-medium text-gold-700 transition-all hover:bg-gold-100"
                      >
                        <Gift className="h-3.5 w-3.5" />
                        Choose your free item ({freeRemaining} remaining)
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Free items */}
          {freeItems.length > 0 && (
            <div className="rounded-xl border border-gold-200 bg-gold-50 p-4">
              <h3 className="flex items-center gap-2 font-serif text-sm font-medium text-gold-800 mb-3">
                <Gift className="h-4 w-4" />
                Your Free Items
              </h3>
              <div className="space-y-3">
                {freeItems.map((item) => {
                  const image = getProductImage(item.product.slug);
                  const qualifyingProduct = paidItems.find((p) => p.product.id === item.freeItemFor);
                  return (
                    <div key={`${item.product.id}-${item.freeItemFor}`} className="flex items-center gap-3 rounded-lg bg-white/60 p-3">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                        <ProductImage src={image} alt={item.product.name} aspectRatio="square" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-forest-800 truncate">{item.product.name}</p>
                        <p className="text-xs text-forest-400">{item.product.packSize}</p>
                        <p className="text-xs text-gold-600">
                          Free with: {qualifyingProduct?.product.name ?? 'qualifying purchase'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="badge bg-gold-500 text-forest-950">FREE</span>
                        <span className="text-sm font-medium text-forest-700">x{item.quantity}</span>
                        <button
                          onClick={() => removeFreeItem(item.product.id)}
                          className="rounded-lg p-1 text-forest-300 hover:text-accent-600"
                          aria-label="Remove free item"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-600 hover:text-forest-700"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            Continue Shopping
          </Link>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-44 rounded-xl border border-cream-200 bg-white p-6">
            <h2 className="font-serif text-lg font-medium text-forest-800 mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-forest-500">Subtotal ({summary.totalPaidItems} items)</span>
                <span className="font-medium text-forest-800">{formatPrice(summary.subtotal)}</span>
              </div>

              {summary.totalDiscount > 0 && (
                <div className="flex justify-between">
                  <span className="text-forest-500">Discount</span>
                  <span className="font-medium text-forest-600">-{formatPrice(summary.totalDiscount)}</span>
                </div>
              )}

              {summary.totalFreeItems > 0 && (
                <div className="flex justify-between">
                  <span className="text-forest-500">Free Items ({summary.totalFreeItems})</span>
                  <span className="font-medium text-gold-600">{formatPrice(0)}</span>
                </div>
              )}

              <div className="border-t border-cream-200 pt-3">
                <div className="flex justify-between text-base">
                  <span className="font-medium text-forest-800">Total</span>
                  <span className="font-sans font-bold text-forest-800">{formatPrice(summary.total)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary w-full mt-6"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="mt-4 flex items-start gap-2 rounded-lg bg-cream-50 p-3">
              <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-forest-400" />
              <p className="text-xs text-forest-500 leading-relaxed">
                {siteConfig.freeItemGstNote}
              </p>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-forest-400">
              <Check className="h-3.5 w-3.5 text-forest-500" />
              Cash on Delivery available
            </div>
          </div>
        </div>
      </div>

      {/* Free item selection modal */}
      {freeItemModalFor && (
        <FreeItemModal
          qualifyingProduct={freeItemModalFor}
          onClose={() => setFreeItemModalFor(null)}
          onSelect={(freeProductId) => {
            addFreeItem(freeProductId, freeItemModalFor.id);
            showToast('Free item added to cart', 'success');
            setFreeItemModalFor(null);
          }}
        />
      )}
    </div>
  );
}

function FreeItemModal({
  qualifyingProduct,
  onClose,
  onSelect,
}: {
  qualifyingProduct: Product;
  onClose: () => void;
  onSelect: (productId: string) => void;
}) {
  const eligibleItems = getEligibleFreeItems(qualifyingProduct.id);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-forest-900/50 animate-fade-in" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-2xl bg-cream-50 shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between border-b border-cream-200 p-5">
          <div>
            <h3 className="font-serif text-lg font-medium text-forest-800">Select Your Free Item</h3>
            <p className="mt-0.5 text-xs text-forest-500">
              Choose a product with MRP up to {formatPrice(qualifyingProduct.mrp)} (MRP of your qualifying product)
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-forest-500 hover:bg-cream-100"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[60vh] p-5">
          {eligibleItems.length === 0 ? (
            <p className="text-sm text-forest-500 text-center py-8">
              No eligible free items available. All eligible products must have an MRP of {formatPrice(qualifyingProduct.mrp)} or less.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {eligibleItems.map((item) => {
                const image = getProductImage(item.slug);
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelect(item.id)}
                    className="group flex flex-col overflow-hidden rounded-xl border border-cream-200 bg-white text-left transition-all hover:border-forest-300 hover:shadow-md"
                  >
                    <div className="overflow-hidden">
                      <ProductImage src={image} alt={item.name} aspectRatio="square" className="transition-transform group-hover:scale-105" />
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-medium text-forest-800 line-clamp-2">{item.name}</p>
                      <p className="mt-0.5 text-xs text-forest-400">{item.packSize}</p>
                      <div className="mt-1.5 flex items-baseline gap-1.5">
                        <span className="text-xs text-forest-400 line-through">{formatPrice(item.mrp)}</span>
                        <span className="badge bg-gold-500 text-forest-950">FREE</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

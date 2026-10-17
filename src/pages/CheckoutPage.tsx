import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Info,
  Truck,
  CreditCard,
  Banknote,
  Lock,
  AlertCircle,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Breadcrumb } from '@/components/Breadcrumb';
import { formatPrice } from '@/utils/offerEngine';
import { siteConfig } from '@/data/siteConfig';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: string;
}

interface FormErrors {
  [key: string]: string;
}

export function CheckoutPage() {
  const { summary } = useCart();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (summary.lineItems.length === 0) {
    return (
      <div className="container-page py-8">
        <Breadcrumb items={[{ label: 'Checkout' }]} />
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-cream-200 bg-white py-20">
          <h1 className="font-serif text-2xl font-semibold text-forest-800">Cart is Empty</h1>
          <p className="mt-2 text-sm text-forest-500">Add products to your cart before checking out.</p>
          <Link to="/shop" className="btn-primary mt-6">Browse Products</Link>
        </div>
      </div>
    );
  }

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.fullName.trim()) e.fullName = 'Full name is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email';
    if (!formData.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^[0-9+\-\s]{10,15}$/.test(formData.phone)) e.phone = 'Enter a valid phone number';
    if (!formData.addressLine1.trim()) e.addressLine1 = 'Address is required';
    if (!formData.city.trim()) e.city = 'City is required';
    if (!formData.state.trim()) e.state = 'State is required';
    if (!formData.pincode.trim()) e.pincode = 'Pincode is required';
    else if (!/^[0-9]{6}$/.test(formData.pincode)) e.pincode = 'Enter a valid 6-digit pincode';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitError(
        'Order placement requires the PHP + MySQL backend to be connected. This is a frontend-only placeholder — no order has been placed and no payment has been processed.'
      );
    }, 800);
  };

  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="container-page py-8">
      <Breadcrumb items={[{ label: 'Cart', path: '/cart' }, { label: 'Checkout' }]} />

      <h1 className="mt-6 mb-8 font-serif text-2xl font-semibold text-forest-800 sm:text-3xl">Checkout</h1>

      {submitError && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-accent-200 bg-accent-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600" />
          <p className="text-sm text-accent-700">{submitError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
        {/* Form fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact */}
          <div className="rounded-xl border border-cream-200 bg-white p-6">
            <h2 className="font-serif text-lg font-medium text-forest-800 mb-4">Contact Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-forest-600 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                  className="input-field"
                  placeholder="Your full name"
                />
                {errors.fullName && <p className="mt-1 text-xs text-accent-600">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-forest-600 mb-1.5">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="input-field"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-accent-600">{errors.email}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-forest-600 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className="input-field"
                  placeholder="10-digit mobile number"
                />
                {errors.phone && <p className="mt-1 text-xs text-accent-600">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="rounded-xl border border-cream-200 bg-white p-6">
            <h2 className="font-serif text-lg font-medium text-forest-800 mb-4">Shipping Address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-forest-600 mb-1.5">Address Line 1 *</label>
                <input
                  type="text"
                  value={formData.addressLine1}
                  onChange={(e) => update('addressLine1', e.target.value)}
                  className="input-field"
                  placeholder="House/Flat number, street name"
                />
                {errors.addressLine1 && <p className="mt-1 text-xs text-accent-600">{errors.addressLine1}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-forest-600 mb-1.5">Address Line 2</label>
                <input
                  type="text"
                  value={formData.addressLine2}
                  onChange={(e) => update('addressLine2', e.target.value)}
                  className="input-field"
                  placeholder="Landmark, area (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-forest-600 mb-1.5">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => update('city', e.target.value)}
                  className="input-field"
                  placeholder="City"
                />
                {errors.city && <p className="mt-1 text-xs text-accent-600">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-forest-600 mb-1.5">State *</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => update('state', e.target.value)}
                  className="input-field"
                  placeholder="State"
                />
                {errors.state && <p className="mt-1 text-xs text-accent-600">{errors.state}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-forest-600 mb-1.5">Pincode *</label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => update('pincode', e.target.value)}
                  className="input-field"
                  placeholder="6-digit pincode"
                  maxLength={6}
                />
                {errors.pincode && <p className="mt-1 text-xs text-accent-600">{errors.pincode}</p>}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-xl border border-cream-200 bg-white p-6">
            <h2 className="font-serif text-lg font-medium text-forest-800 mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-forest-400 bg-forest-50' : 'border-cream-200 hover:border-cream-300'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={(e) => update('paymentMethod', e.target.value)}
                  className="accent-forest-600"
                />
                <Banknote className="h-5 w-5 text-forest-600" />
                <div>
                  <p className="text-sm font-medium text-forest-800">Cash on Delivery</p>
                  <p className="text-xs text-forest-400">Pay when you receive your order</p>
                </div>
              </label>
              <label className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-all ${formData.paymentMethod === 'razorpay' ? 'border-forest-400 bg-forest-50' : 'border-cream-200 hover:border-cream-300'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked={formData.paymentMethod === 'razorpay'}
                  onChange={(e) => update('paymentMethod', e.target.value)}
                  className="accent-forest-600"
                />
                <CreditCard className="h-5 w-5 text-forest-600" />
                <div>
                  <p className="text-sm font-medium text-forest-800">Online Payment (Razorpay)</p>
                  <p className="text-xs text-gold-600">Integration pending — not yet available</p>
                </div>
              </label>
            </div>
            {formData.paymentMethod === 'razorpay' && (
              <div className="mt-3 flex items-start gap-2 rounded-lg bg-gold-50 border border-gold-200 p-3">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-600" />
                <p className="text-xs text-gold-700">
                  Online payment via Razorpay will be available once the PHP backend is connected. Please select Cash on Delivery for now.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-44 rounded-xl border border-cream-200 bg-white p-6">
            <h2 className="font-serif text-lg font-medium text-forest-800 mb-4">Order Summary</h2>

            <div className="mb-4 max-h-48 overflow-y-auto space-y-2">
              {summary.lineItems.map((item) => (
                <div key={`${item.product.id}-${item.isFreeItem}`} className="flex justify-between text-sm">
                  <span className="text-forest-500 truncate pr-2">
                    {item.product.name} <span className="text-forest-300">x{item.quantity}</span>
                    {item.isFreeItem && <span className="ml-1 text-gold-600">(Free)</span>}
                  </span>
                  <span className="font-medium text-forest-700 flex-shrink-0">
                    {item.isFreeItem ? formatPrice(0) : formatPrice(item.lineTotal)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-cream-200 pt-3 text-sm">
              <div className="flex justify-between">
                <span className="text-forest-500">Subtotal</span>
                <span className="font-medium text-forest-800">{formatPrice(summary.subtotal)}</span>
              </div>
              {summary.totalFreeItems > 0 && (
                <div className="flex justify-between">
                  <span className="text-forest-500">Free Items</span>
                  <span className="font-medium text-gold-600">{summary.totalFreeItems} item(s)</span>
                </div>
              )}
              <div className="flex justify-between border-t border-cream-200 pt-2 text-base">
                <span className="font-medium text-forest-800">Total</span>
                <span className="font-sans font-bold text-forest-800">{formatPrice(summary.total)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full mt-6"
            >
              {submitting ? 'Processing...' : 'Place Order'}
              {!submitting && <ArrowRight className="h-4 w-4" />}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-forest-400">
              <Lock className="h-3.5 w-3.5" />
              Your information is secure
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-forest-400">
              <Truck className="h-3.5 w-3.5" />
              Delivery across India
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Search, Info, Package } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { api } from '@/services/api';

export function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ orderId?: string; email?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: typeof errors = {};
    if (!orderId.trim()) er.orderId = 'Order ID is required';
    if (!email.trim()) er.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) er.email = 'Enter a valid email';
    setErrors(er);
    if (Object.keys(er).length > 0) return;

    setLoading(true);
    setResult(null);
    try {
      const resp = await api.trackOrder(orderId.trim(), email.trim());
      setResult({ success: resp.success, message: resp.message ?? 'Unable to track order.' });
    } catch {
      setResult({ success: false, message: 'Something went wrong. Please try again later.' });
    }
    setLoading(false);
  };

  return (
    <div className="container-page py-8">
      <Breadcrumb items={[{ label: 'Track Order' }]} />

      <div className="mt-6 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-50 mb-4">
            <Truck className="h-8 w-8 text-forest-600" />
          </div>
          <h1 className="font-serif text-2xl font-semibold text-forest-800 sm:text-3xl">Track Your Order</h1>
          <p className="mt-2 text-sm text-forest-500">
            Enter your Order ID and email to check the status of your order.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-cream-200 bg-white p-6 sm:p-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-forest-600 mb-1.5">Order ID *</label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="input-field"
                placeholder="e.g. GM-20261014-001"
              />
              {errors.orderId && <p className="mt-1 text-xs text-accent-600">{errors.orderId}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-600 mb-1.5">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="The email used during checkout"
              />
              {errors.email && <p className="mt-1 text-xs text-accent-600">{errors.email}</p>}
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Tracking...' : 'Track Order'}
              {!loading && <Search className="h-4 w-4" />}
            </button>
          </div>
        </form>

        {result && (
          <div className={`mt-4 flex items-start gap-3 rounded-lg border p-4 ${result.success ? 'border-forest-200 bg-forest-50' : 'border-gold-200 bg-gold-50'}`}>
            <Info className={`mt-0.5 h-5 w-5 flex-shrink-0 ${result.success ? 'text-forest-600' : 'text-gold-600'}`} />
            <p className={`text-sm ${result.success ? 'text-forest-700' : 'text-gold-700'}`}>{result.message}</p>
          </div>
        )}

        <div className="mt-6 flex items-start gap-3 rounded-lg border border-cream-200 bg-cream-50 p-4">
          <Package className="mt-0.5 h-5 w-5 flex-shrink-0 text-forest-400" />
          <div>
            <p className="text-sm font-medium text-forest-600">Order Tracking</p>
            <p className="mt-1 text-xs text-forest-400 leading-relaxed">
              Order tracking requires the PHP + MySQL backend to be connected. Once integrated, you will be able to see real-time order status, dispatch details, and delivery updates here.
            </p>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-forest-400">
          Don't have an account? <Link to="/login" className="font-medium text-forest-600 hover:text-forest-700">Sign in</Link> to view your order history.
        </p>
      </div>
    </div>
  );
}

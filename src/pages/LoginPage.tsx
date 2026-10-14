import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Info, ArrowRight } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { api } from '@/services/api';

export function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [resultMsg, setResultMsg] = useState<{ type: 'info' | 'error'; text: string } | null>(null);

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (mode === 'register' && !name.trim()) e.name = 'Name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password.trim()) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setResultMsg(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const resp = mode === 'login'
        ? await api.login(email, password)
        : await api.register(name, email, password);
      setResultMsg({
        type: 'info',
        text: resp.message ?? 'Authentication requires the PHP + MySQL backend. This is a frontend placeholder.',
      });
    } catch {
      setResultMsg({ type: 'error', text: 'Something went wrong. Please try again.' });
    }
    setLoading(false);
  };

  return (
    <div className="container-page py-8">
      <Breadcrumb items={[{ label: mode === 'login' ? 'Login' : 'Register' }]} />

      <div className="mt-8 max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl font-semibold text-forest-800 sm:text-3xl">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="mt-2 text-sm text-forest-500">
            {mode === 'login'
              ? 'Sign in to access your orders and account.'
              : 'Create an account to track orders and shop faster.'}
          </p>
        </div>

        {/* Toggle */}
        <div className="mb-6 flex rounded-full border border-cream-300 bg-white p-1">
          <button
            onClick={() => { setMode('login'); setResultMsg(null); setErrors({}); }}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition-all ${mode === 'login' ? 'bg-forest-600 text-cream-50' : 'text-forest-500'}`}
          >
            Login
          </button>
          <button
            onClick={() => { setMode('register'); setResultMsg(null); setErrors({}); }}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition-all ${mode === 'register' ? 'bg-forest-600 text-cream-50' : 'text-forest-500'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-cream-200 bg-white p-6 space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-forest-600 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Your name"
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-accent-600">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-forest-600 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-accent-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-forest-600 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10 pr-10"
                placeholder="At least 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-accent-600">{errors.password}</p>}
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        {resultMsg && (
          <div className={`mt-4 flex items-start gap-3 rounded-lg border p-4 ${resultMsg.type === 'error' ? 'border-accent-200 bg-accent-50' : 'border-gold-200 bg-gold-50'}`}>
            <Info className={`mt-0.5 h-5 w-5 flex-shrink-0 ${resultMsg.type === 'error' ? 'text-accent-600' : 'text-gold-600'}`} />
            <p className={`text-sm ${resultMsg.type === 'error' ? 'text-accent-700' : 'text-gold-700'}`}>
              {resultMsg.text}
            </p>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-forest-400">
          You can browse and shop without an account.{' '}
          <Link to="/shop" className="font-medium text-forest-600 hover:text-forest-700">
            Continue as guest
          </Link>
        </p>
      </div>
    </div>
  );
}

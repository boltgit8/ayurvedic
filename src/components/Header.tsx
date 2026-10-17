import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  User,
  Truck,
  Menu,
  X,
  Phone,
  Heart,
} from 'lucide-react';
import { Logo } from './Logo';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { getEnabledCategories } from '@/data/categories';
import { siteConfig } from '@/data/siteConfig';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const enabledCategories = getEnabledCategories();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    ...enabledCategories.map((c) => ({ label: c.shortName, path: `/category/${c.slug}` })),
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Announcement strip */}
      <div className="bg-forest-900 text-cream-100">
        <div className="container-page flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2 text-xs">
          <span className="font-medium tracking-wide">{siteConfig.tagline}</span>
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gold-300 transition-colors hover:text-gold-200"
            >
              <Phone className="h-3 w-3" />
              <span>{siteConfig.phone}</span>
            </a>
            <span className="hidden sm:inline text-forest-400">|</span>
            <span className="hidden sm:inline text-cream-200">
              Offer: {siteConfig.offerPeriodStart} — {siteConfig.offerPeriodEnd}
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 bg-white border-b transition-all ${
          scrolled ? 'border-cream-200 shadow-sm' : 'border-cream-100'
        }`}
      >
        <div className="container-page">
          <div className="flex items-center gap-3 py-3.5 lg:gap-6">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden flex items-center justify-center rounded-md p-2 text-forest-700 hover:bg-cream-100"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>

            <form onSubmit={handleSearch} className="hidden flex-1 md:block max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, categories..."
                  className="w-full rounded-md border border-cream-300 bg-white py-2.5 pl-10 pr-4 text-sm text-forest-800 placeholder-cream-500 transition-all focus:border-forest-400 focus:ring-2 focus:ring-forest-200"
                />
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-400" />
              </div>
            </form>

            <div className="ml-auto flex items-center gap-0.5 sm:gap-1 lg:gap-2">
              <Link
                to="/track-order"
                className="hidden lg:flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-forest-600 transition-colors hover:bg-cream-100"
              >
                <Truck className="h-4 w-4" />
                <span className="hidden xl:inline">Track Order</span>
              </Link>

              <Link
                to="/wishlist"
                className="relative flex items-center justify-center rounded-md p-2 text-forest-600 transition-colors hover:bg-cream-100"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-semibold text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link
                to="/account"
                className="flex items-center gap-1.5 rounded-md px-2 py-2 text-sm font-medium text-forest-600 transition-colors hover:bg-cream-100"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">Account</span>
              </Link>

              <Link
                to="/cart"
                className="relative flex items-center gap-1.5 rounded-md px-2 py-2 text-sm font-medium text-forest-600 transition-colors hover:bg-cream-100"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="hidden sm:inline">Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-forest-700 px-1 text-[10px] font-semibold text-cream-50">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile search */}
          <form onSubmit={handleSearch} className="md:hidden pb-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-md border border-cream-300 bg-white py-2.5 pl-10 pr-4 text-sm text-forest-800 placeholder-cream-500 transition-all focus:border-forest-400 focus:ring-2 focus:ring-forest-200"
              />
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-400" />
            </div>
          </form>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden border-t border-cream-100 bg-white lg:block">
          <div className="container-page">
            <ul className="flex items-center">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path ||
                  (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                        isActive
                          ? 'border-gold-500 text-forest-800'
                          : 'border-transparent text-forest-500 hover:text-forest-700'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-forest-900/50 animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl animate-slide-in flex flex-col">
            <div className="flex items-center justify-between border-b border-cream-100 p-4">
              <Logo />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md p-2 text-forest-600 hover:bg-cream-100"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col overflow-y-auto p-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path ||
                  (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                      isActive ? 'bg-forest-50 text-forest-700' : 'text-forest-600 hover:bg-cream-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="my-2 border-t border-cream-100" />
              <Link
                to="/track-order"
                className="flex items-center gap-2 rounded-md px-4 py-3 text-sm font-medium text-forest-600 hover:bg-cream-50"
              >
                <Truck className="h-4 w-4" />
                Track Order
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md px-4 py-3 text-sm font-medium text-forest-600 hover:bg-cream-50"
              >
                <Phone className="h-4 w-4" />
                WhatsApp: {siteConfig.phone}
              </a>
              <a
                href={`tel:${siteConfig.phone2}`}
                className="flex items-center gap-2 rounded-md px-4 py-3 text-sm font-medium text-forest-600 hover:bg-cream-50"
              >
                <Phone className="h-4 w-4" />
                Call: {siteConfig.phone2}
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

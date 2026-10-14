import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { siteConfig } from '@/data/siteConfig';
import { getEnabledCategories } from '@/data/categories';

export function Footer() {
  const enabledCategories = getEnabledCategories();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop All Products', path: '/shop' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Track Order', path: '/track-order' },
    { label: 'My Account', path: '/account' },
  ];

  const policyLinks = [
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms & Conditions', path: '/terms' },
    { label: 'Shipping Policy', path: '/shipping-policy' },
    { label: 'Cancellation Policy', path: '/cancellation-policy' },
    { label: 'Return & Refund Policy', path: '/refund-policy' },
  ];

  return (
    <footer className="mt-20 bg-forest-900 text-cream-200">
      <div className="container-page py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand + Contact */}
          <div className="space-y-5 lg:col-span-4">
            <Logo variant="light" />
            <p className="text-sm leading-relaxed text-forest-300">
              {siteConfig.legalName}
            </p>
            <p className="font-serif text-base text-gold-300 italic">{siteConfig.tagline}</p>
            <div className="space-y-3 text-sm text-forest-300 pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" />
                <span className="leading-relaxed">{siteConfig.address}</span>
              </div>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 hover:text-gold-300 transition-colors">
                <Mail className="h-4 w-4 flex-shrink-0 text-gold-400" />
                <span className="break-all text-xs sm:text-sm">{siteConfig.email}</span>
              </a>
              <div className="flex flex-col gap-1.5">
                <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2.5 hover:text-gold-300 transition-colors">
                  <Phone className="h-4 w-4 flex-shrink-0 text-gold-400" />
                  <span>{siteConfig.phone}</span>
                </a>
                <a href={`tel:${siteConfig.phone2}`} className="flex items-center gap-2.5 hover:text-gold-300 transition-colors pl-6">
                  <span>{siteConfig.phone2}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-300 mb-4">Categories</h4>
            <ul className="space-y-2.5">
              {enabledCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="text-sm text-forest-300 hover:text-gold-300 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-300 mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-forest-300 hover:text-gold-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-300 mb-4">Customer Support</h4>
            <ul className="space-y-2.5">
              {policyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-forest-300 hover:text-gold-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-md border border-forest-700 p-3">
              <p className="text-xs text-forest-400">
                <span className="font-medium text-cream-200">Cash on Delivery</span> available.
                Online payment via Razorpay coming soon.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-forest-700">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p className="text-xs text-forest-400">
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-forest-400">
            Crafted with care by{' '}
            <span className="font-medium text-gold-300">{siteConfig.footerCredit}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

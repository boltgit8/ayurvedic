import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, Scale, HandHeart, Truck } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { siteConfig } from '@/data/siteConfig';
import { getEnabledCategories } from '@/data/categories';
import { ProductImage } from '@/components/ProductImage';
import { getCategoryImage, heroImages } from '@/data/images';
import type { LucideIcon } from 'lucide-react';

export function AboutPage() {
  const enabledCategories = getEnabledCategories();

  const values: { icon: LucideIcon; title: string; desc: string }[] = [
    { icon: Sprout, title: 'Growth', desc: 'We believe in helping people grow stronger — through quality products and honest guidance.' },
    { icon: Scale, title: 'Transparency', desc: 'We provide accurate product information. We do not make unsupported health claims or invent certifications.' },
    { icon: HandHeart, title: 'Care', desc: 'From product selection to delivery, we are here to support our customers at every step.' },
    { icon: Truck, title: 'Service', desc: 'Reliable delivery across India, accessible customer support via WhatsApp and phone.' },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="relative h-56 sm:h-72 overflow-hidden bg-forest-900">
        <img
          src={heroImages.botanical}
          alt="Botanical green leaves"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 to-forest-900/20" />
        <div className="absolute inset-0 flex items-end pb-8">
          <div className="container-page">
            <span className="section-eyebrow !text-gold-300">About Us</span>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-cream-50">Gaps Magic Wellness</h1>
            <p className="mt-2 font-serif text-lg text-gold-300 italic">{siteConfig.tagline}</p>
          </div>
        </div>
      </div>

      <div className="container-narrow py-12 lg:py-20">
        <Breadcrumb items={[{ label: 'About Us' }]} />

        {/* Brand meaning — editorial prose */}
        <div className="mt-10 max-w-3xl">
          <h2 className="font-serif text-2xl font-semibold text-forest-800 sm:text-3xl">Our Name Is Our Promise</h2>
          <div className="mt-5 space-y-4 text-sm text-forest-600 leading-relaxed sm:text-[15px]">
            <p>
              <span className="font-medium text-forest-800">Gaps Magic Wellness Private Limited</span> is an Indian wellness and lifestyle company based in Kalka, Haryana. Our name carries a meaning we take seriously: <span className="font-medium text-gold-600">{siteConfig.tagline}</span>.
            </p>
            <p>
              We offer a curated range of products across multiple categories — herbal wellness care, premium multigrain atta, ethnic clothing, home appliances, and GPS tracking solutions. Each category is chosen to serve everyday needs with quality and value.
            </p>
          </div>
        </div>

        {/* Full-width editorial image break */}
        <div className="mt-12 overflow-hidden rounded-xl">
          <ProductImage src={heroImages.editorial} alt="Gaps Magic herbal wellness products" aspectRatio="wide" loading="lazy" className="h-64 sm:h-80 w-full" />
        </div>

        {/* What we offer — numbered editorial list */}
        <div className="mt-16">
          <h2 className="font-serif text-2xl font-semibold text-forest-800 sm:text-3xl">What We Offer</h2>
          <div className="mt-8 space-y-0">
            {enabledCategories.map((cat, idx) => (
              <div
                key={cat.slug}
                className="group flex items-start gap-5 border-b border-cream-200 py-6 last:border-0"
              >
                <span className="font-serif text-2xl font-light text-cream-400 group-hover:text-gold-400 transition-colors tabular-nums w-8 flex-shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <Link to={`/category/${cat.slug}`} className="flex-shrink-0">
                  <div className="h-14 w-14 overflow-hidden rounded-md ring-1 ring-cream-200 transition-transform group-hover:scale-105">
                    <ProductImage src={getCategoryImage(cat.slug)} alt={cat.name} aspectRatio="square" loading="lazy" />
                  </div>
                </Link>
                <div className="flex-1">
                  <Link to={`/category/${cat.slug}`} className="font-serif text-lg font-medium text-forest-800 hover:text-gold-700 transition-colors">
                    {cat.name}
                  </Link>
                  <p className="mt-1 text-sm text-forest-500 leading-relaxed">{cat.description}</p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-cream-400 group-hover:text-gold-600 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>

        {/* Values — horizontal with top borders */}
        <div className="mt-20">
          <h2 className="font-serif text-2xl font-semibold text-forest-800 sm:text-3xl">What We Stand For</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="border-t-2 border-gold-300 pt-5">
                  <Icon className="h-5 w-5 text-gold-500 mb-3" />
                  <h3 className="font-serif text-base font-medium text-forest-800">{val.title}</h3>
                  <p className="mt-2 text-sm text-forest-500 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 overflow-hidden rounded-xl bg-gradient-to-br from-forest-800 to-forest-900 p-10 sm:p-14 text-center">
          <h2 className="font-serif text-xl font-semibold text-cream-50 sm:text-2xl">Start Your Wellness Journey</h2>
          <p className="mt-3 text-sm text-cream-300 max-w-md mx-auto leading-relaxed">
            Explore our range of premium wellness products, multigrain atta, and more.
          </p>
          <Link to="/shop" className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3 text-sm font-semibold text-forest-950 transition-all hover:bg-gold-400 hover:shadow-xl">
            Shop Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

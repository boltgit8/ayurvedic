import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, HandHeart, Scale, Truck } from 'lucide-react';
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
      <div className="relative h-64 sm:h-80 overflow-hidden bg-forest-900">
        <img
          src={heroImages.botanical}
          alt="Botanical green leaves"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 to-forest-900/30" />
        <div className="absolute inset-0 flex items-end pb-8">
          <div className="container-page">
            <span className="section-eyebrow !text-gold-300">About Us</span>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-cream-50">Gaps Magic Wellness</h1>
            <p className="mt-2 font-serif text-lg text-gold-300 italic">{siteConfig.tagline}</p>
          </div>
        </div>
      </div>

      <div className="container-narrow py-12 lg:py-16">
        <Breadcrumb items={[{ label: 'About Us' }]} />

        {/* Brand meaning */}
        <div className="mt-8 max-w-3xl">
          <h2 className="font-serif text-2xl font-semibold text-forest-800">Our Name Is Our Promise</h2>
          <div className="mt-4 space-y-3 text-sm text-forest-600 leading-relaxed">
            <p>
              <span className="font-medium text-forest-800">Gaps Magic Wellness Private Limited</span> is an Indian wellness and lifestyle company based in Kalka, Haryana. Our name carries a meaning we take seriously: <span className="font-medium text-gold-600">{siteConfig.tagline}</span>.
            </p>
            <p>
              We offer a curated range of products across multiple categories — herbal wellness care, premium multigrain atta, ethnic clothing, home appliances, and GPS tracking solutions. Each category is chosen to serve everyday needs with quality and value.
            </p>
          </div>
        </div>

        {/* Editorial image break */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-lg">
            <ProductImage src={getCategoryImage('wellness')} alt="Herbal wellness products" aspectRatio="video" loading="lazy" />
          </div>
          <div className="overflow-hidden rounded-lg">
            <ProductImage src={getCategoryImage('atta')} alt="Premium Navratan Atta" aspectRatio="video" loading="lazy" />
          </div>
        </div>

        {/* What we offer — inline list, not card grid */}
        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-forest-800">What We Offer</h2>
          <div className="mt-5 space-y-4">
            {enabledCategories.map((cat) => (
              <div key={cat.slug} className="flex items-start gap-4 border-b border-cream-100 pb-4 last:border-0">
                <Link to={`/category/${cat.slug}`} className="flex-shrink-0">
                  <div className="h-16 w-16 overflow-hidden rounded-md">
                    <ProductImage src={getCategoryImage(cat.slug)} alt={cat.name} aspectRatio="square" loading="lazy" />
                  </div>
                </Link>
                <div className="flex-1">
                  <Link to={`/category/${cat.slug}`} className="font-serif text-base font-medium text-forest-800 hover:text-forest-600">
                    {cat.name}
                  </Link>
                  <p className="mt-1 text-sm text-forest-500 leading-relaxed">{cat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values — horizontal layout, not card grid */}
        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-forest-800">What We Stand For</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="border-t-2 border-gold-200 pt-4">
                  <Icon className="h-5 w-5 text-gold-500 mb-2" />
                  <h3 className="font-serif text-base font-medium text-forest-800">{val.title}</h3>
                  <p className="mt-1.5 text-sm text-forest-500 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-lg bg-forest-900 p-8 sm:p-10 text-center">
          <h2 className="font-serif text-xl font-semibold text-cream-50 sm:text-2xl">Start Your Wellness Journey</h2>
          <p className="mt-3 text-sm text-cream-300 max-w-md mx-auto">
            Explore our range of premium wellness products, multigrain atta, and more.
          </p>
          <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-forest-950 transition-all hover:bg-gold-400">
            Shop Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

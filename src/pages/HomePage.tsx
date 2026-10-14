import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Truck,
  Headphones,
  CreditCard,
  ShieldCheck,
  Info,
  Phone,
} from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { ProductImage } from '@/components/ProductImage';
import { getEnabledCategories } from '@/data/categories';
import { getBestsellers } from '@/data/products';
import { getProductImage, getCategoryImage, heroImages, customerJourneyImages } from '@/data/images';
import { siteConfig } from '@/data/siteConfig';
import { formatPrice } from '@/utils/offerEngine';
import type { Category } from '@/types';
import type { LucideIcon } from 'lucide-react';

const heroSlides = [
  {
    image: heroImages.main,
    eyebrow: 'Wellness & Herbal Care',
    title: 'Nature\'s Wisdom,\nCrafted for You',
    subtitle: 'Premium herbal powders, juices, teas and tablets inspired by traditional Indian botanical knowledge.',
    cta: 'Shop Wellness',
    link: '/category/wellness',
  },
  {
    image: heroImages.atta,
    eyebrow: 'Premium Navratan Atta',
    title: 'Nine Grains,\nOne Wholesome Blend',
    subtitle: 'Ragi, bajra, alsi, kale chana, and more — nutrient-rich multigrain flour for healthier everyday meals.',
    cta: 'Shop Atta',
    link: '/product/premium-navratan-atta',
  },
];

export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const allCategories = getEnabledCategories();
  const showcaseCategories = allCategories.filter((c) => c.slug !== 'combos' && c.slug !== 'electronics');
  const bestsellers = getBestsellers().slice(0, 8);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-forest-900">
        <div className="relative h-[460px] sm:h-[560px] lg:h-[620px]">
          {heroSlides.map((s, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={s.image}
                alt={s.eyebrow}
                className="h-full w-full object-cover"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-900/50 to-forest-800/20" />
            </div>
          ))}

          <div className="absolute inset-0 flex items-center">
            <div className="container-page">
              <div className="max-w-lg animate-fade-up">
                <span className="section-eyebrow !text-gold-300 mb-3 block">
                  {slide.eyebrow}
                </span>
                <h1 className="font-serif text-3xl font-semibold text-cream-50 sm:text-4xl lg:text-5xl text-balance leading-[1.15] whitespace-pre-line">
                  {slide.title}
                </h1>
                <p className="mt-5 text-sm text-cream-200 sm:text-base max-w-md leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    to={slide.link}
                    className="inline-flex items-center gap-2 rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-forest-950 transition-all hover:bg-gold-400 hover:shadow-xl"
                  >
                    {slide.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 rounded-md border border-cream-200/25 bg-white/5 px-6 py-3 text-sm font-medium text-cream-50 backdrop-blur-sm transition-all hover:bg-white/15"
                  >
                    Browse All Products
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {heroSlides.length > 1 && (
            <>
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-cream-50 backdrop-blur-sm transition-all hover:bg-white/25"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-cream-50 backdrop-blur-sm transition-all hover:bg-white/25"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentSlide ? 'w-8 bg-gold-400' : 'w-1.5 bg-cream-200/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Category discovery — asymmetric tiles ── */}
      <section className="container-page py-14 lg:py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="section-eyebrow">Explore</span>
            <h2 className="mt-1 font-serif text-2xl font-semibold text-forest-800 sm:text-3xl">
              Shop by Category
            </h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-1 text-sm font-medium text-forest-600 hover:text-forest-700">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
          {/* Wellness — large tile */}
          <CategoryTile category={showcaseCategories[0]} className="lg:col-span-2 lg:row-span-2" large />
          {/* Atta */}
          <CategoryTile category={showcaseCategories[1]} />
          {/* Suits */}
          <CategoryTile category={showcaseCategories[2]} />
          {/* Appliances — spans 2 cols on mobile */}
          <CategoryTile category={showcaseCategories[3]} className="col-span-2 lg:col-span-1" />
          {/* Combos — spans 2 cols on mobile */}
          <CategoryTile category={allCategories.find((c) => c.slug === 'combos')!} className="col-span-2 lg:col-span-1" />
        </div>
      </section>

      {/* ── Offer section — editorial two-column ── */}
      <section className="bg-forest-900 py-14 lg:py-20">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left: heading + GST note */}
            <div className="flex flex-col justify-center">
              <span className="section-eyebrow !text-gold-300">Limited Period</span>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-cream-50 sm:text-3xl lg:text-4xl text-balance">
                Special Offers for Every Wellness Need
              </h2>
              <p className="mt-4 text-sm text-cream-300 leading-relaxed max-w-md">
                Offer period: {siteConfig.offerPeriodStart} to {siteConfig.offerPeriodEnd}.
                Eligibility is based on the product's original MRP.
              </p>
              <div className="mt-5 flex items-start gap-2 rounded-md bg-forest-800/50 p-3 max-w-md">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" />
                <p className="text-xs text-cream-400 leading-relaxed">
                  {siteConfig.freeItemGstNote}
                </p>
              </div>
            </div>
            {/* Right: offer cards */}
            <div className="space-y-4">
              {siteConfig.offers.map((offer, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-forest-700 bg-forest-800/60 p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gold-300">
                        {offer.label}
                      </span>
                      <h3 className="mt-2 font-serif text-lg font-medium text-cream-50">
                        {offer.rule}
                      </h3>
                      <p className="mt-2 text-xs text-cream-400 leading-relaxed">
                        {offer.type === 'B2G1'
                          ? 'Buy 2 eligible products and get 1 free. Choose a free product whose MRP is equal to or lower than your qualifying paid product.'
                          : 'Buy 1 eligible product and get 1 free. Choose a free product whose MRP is equal to or lower than your qualifying paid product.'}
                      </p>
                    </div>
                    <div className="flex-shrink-0 rounded-md bg-gold-500/15 px-3 py-2.5 text-center">
                      <span className="block font-serif text-xl font-bold text-gold-300">
                        {offer.discountPercent}%
                      </span>
                      <span className="text-[10px] text-gold-400 uppercase tracking-wider">Off</span>
                    </div>
                  </div>
                  <Link
                    to="/shop"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-gold-300 hover:text-gold-200 transition-colors"
                  >
                    Shop eligible products
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bestsellers ── */}
      <section className="container-page py-14 lg:py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="section-eyebrow">Most Popular</span>
            <h2 className="mt-1 font-serif text-2xl font-semibold text-forest-800 sm:text-3xl">
              Bestsellers
            </h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-1 text-sm font-medium text-forest-600 hover:text-forest-700">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── Atta feature — single asymmetric panel ── */}
      <section className="bg-cream-100 py-14 lg:py-20">
        <div className="container-page">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-lg shadow-md">
                <ProductImage src={getProductImage('premium-navratan-atta')} alt="Premium Navratan Atta — nine-grain flour" aspectRatio="tall" loading="lazy" />
              </div>
            </div>
            <div className="lg:col-span-7">
              <span className="section-eyebrow">Grocery & Atta</span>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-forest-800 sm:text-3xl text-balance">
                Premium Navratan Atta
              </h2>
              <p className="mt-4 text-sm text-forest-600 leading-relaxed max-w-lg">
                A nine-grain flour blend made from wholesome, natural ingredients. Ragi, bajra, alsi, kale chana, mung dal, masoor dal, jau, soyabean, and chana dal — nutrition in every meal.
              </p>
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-sans text-3xl font-bold text-forest-800">{formatPrice(240)}</span>
                <span className="text-sm text-forest-400 line-through">{formatPrice(299)}</span>
                <span className="badge bg-gold-100 text-gold-700">Special Price</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/product/premium-navratan-atta" className="btn-primary">
                  View Product
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/category/atta" className="btn-secondary">
                  Explore Atta Range
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GPS Tracker + Combos — split panel ── */}
      <section className="container-page py-14 lg:py-16">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          {/* GPS */}
          <div className="relative overflow-hidden rounded-lg bg-forest-900 group">
            <div className="absolute inset-0">
              <img src={getCategoryImage('electronics')} alt="GPS tracker hardware" className="h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-br from-forest-950/80 to-forest-900/60" />
            </div>
            <div className="relative p-8 sm:p-10 lg:p-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-300">Electronics / GPS</span>
              <h3 className="mt-2 font-serif text-xl font-semibold text-cream-50 sm:text-2xl text-balance">
                Gaps Magic GPS Tracker
              </h3>
              <p className="mt-3 text-sm text-cream-300 leading-relaxed max-w-xs">
                Vehicle security solution. Includes one year of recharge free.
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-sans text-2xl font-bold text-gold-300">{formatPrice(2999)}</span>
                <span className="text-sm text-cream-400 line-through">{formatPrice(3999)}</span>
              </div>
              <Link to="/product/gaps-magic-gps-tracker" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold-300 hover:text-gold-200">
                View Product <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          {/* Combos */}
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gold-50 to-cream-100 border border-gold-200 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-600">Combos & Offers</span>
            <h3 className="mt-2 font-serif text-xl font-semibold text-forest-800 sm:text-2xl text-balance">
              Curated Wellness Bundles
            </h3>
            <p className="mt-3 text-sm text-forest-600 leading-relaxed max-w-xs">
              Gold and Silver packages — carefully curated bundles offering exceptional value. Contents coming soon.
            </p>
            <div className="mt-5 flex gap-4 text-sm">
              <div>
                <span className="text-xs text-forest-400">Gold Package</span>
                <p className="font-sans font-bold text-forest-800">{formatPrice(4480)}</p>
              </div>
              <div className="border-l border-gold-200 pl-4">
                <span className="text-xs text-forest-400">Silver Package</span>
                <p className="font-sans font-bold text-forest-800">{formatPrice(2240)}</p>
              </div>
            </div>
            <Link to="/category/combos" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-forest-700 hover:text-forest-800">
              View Combos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Customer Journeys ── */}
      <CustomerJourneysSection />

      {/* ── Trust strip — inline, not cards ── */}
      <section className="border-y border-cream-200 bg-cream-50">
        <div className="container-page py-10">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, label: 'Curated Range', sub: 'Quality-selected products' },
              { icon: Headphones, label: 'Customer Support', sub: `${siteConfig.phone} · ${siteConfig.phone2}` },
              { icon: Truck, label: 'Delivery Across India', sub: 'Track your order online' },
              { icon: CreditCard, label: 'COD Available', sub: 'Online payment coming soon' },
            ].map((item, idx) => {
              const Icon = item.icon as LucideIcon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <Icon className="h-5 w-5 flex-shrink-0 text-gold-500" />
                  <div>
                    <p className="text-sm font-medium text-forest-800">{item.label}</p>
                    <p className="text-xs text-forest-400">{item.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Brand story ── */}
      <section className="container-page py-14 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="section-eyebrow">Our Brand</span>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-forest-800 sm:text-3xl text-balance">
              Growth Allowed People Strong
            </h2>
            <p className="mt-4 text-sm text-forest-600 leading-relaxed">
              {siteConfig.legalName} is an Indian wellness and lifestyle company based in Kalka, Haryana. From herbal wellness to nutrition, clothing, appliances, and GPS solutions — we bring quality products with honest service.
            </p>
            <p className="mt-3 text-sm text-forest-600 leading-relaxed">
              Our name carries our promise: helping people grow stronger through trustworthy products and genuine care.
            </p>
            <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest-700 hover:text-forest-800">
              Learn more about us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <ProductImage src={heroImages.editorial} alt="Gaps Magic herbal products" aspectRatio="video" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ── Contact strip ── */}
      <section className="bg-forest-800 py-10">
        <div className="container-page flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="font-serif text-lg font-medium text-cream-50">Need help with an order?</h3>
            <p className="mt-1 text-sm text-cream-300">Our customer care team is here for you.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-gold-500 px-5 py-2.5 text-sm font-medium text-forest-950 transition-all hover:bg-gold-400"
            >
              <Phone className="h-4 w-4" />
              WhatsApp Us
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-cream-200/25 px-5 py-2.5 text-sm font-medium text-cream-50 transition-all hover:bg-white/10">
              Contact Page
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Category tile component ──
function CategoryTile({ category, className = '', large = false }: { category: Category; className?: string; large?: boolean }) {
  const image = getCategoryImage(category.slug);
  return (
    <Link
      to={`/category/${category.slug}`}
      className={`group relative overflow-hidden rounded-lg ${className}`}
    >
      <ProductImage
        src={image}
        alt={category.name}
        aspectRatio={large ? 'tall' : 'square'}
        className={`transition-transform duration-700 group-hover:scale-105 ${large ? 'h-full' : ''}`}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/75 via-forest-900/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
        <h3 className={`font-serif font-medium text-cream-50 leading-tight ${large ? 'text-lg sm:text-xl' : 'text-sm'}`}>
          {category.shortName}
        </h3>
        {large && (
          <p className="mt-1 text-xs text-cream-300 max-w-xs leading-relaxed hidden sm:block">
            {category.description}
          </p>
        )}
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-gold-300 opacity-0 transition-opacity group-hover:opacity-100">
          Explore <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}

// ── Customer Journeys section ──
function CustomerJourneysSection() {
  return (
    <section className="bg-cream-100 py-14 lg:py-20">
      <div className="container-page">
        <div className="mb-8 text-center">
          <span className="section-eyebrow">Shared Experiences</span>
          <h2 className="mt-1 font-serif text-2xl font-semibold text-forest-800 sm:text-3xl">
            Customer Journeys
          </h2>
          <p className="mt-3 text-sm text-forest-500 max-w-xl mx-auto leading-relaxed">
            Real experiences from our customers will be featured here. We present authentic stories with consent and client approval.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { img: customerJourneyImages.person1, label: 'Customer Story 1' },
            { img: customerJourneyImages.person2, label: 'Customer Story 2' },
            { img: customerJourneyImages.person3, label: 'Customer Story 3' },
          ].map((story, idx) => (
            <div key={idx} className="overflow-hidden rounded-lg border border-cream-200 bg-white">
              <div className="relative">
                <ProductImage src={story.img} alt={`${story.label} — awaiting client-supplied content`} aspectRatio="tall" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="badge bg-gold-500/90 text-forest-950">{story.label}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-forest-400 leading-relaxed">
                  This slot is reserved for a client-supplied customer story. The actual testimonial text, image, and results will be added with customer consent and client approval.
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-2 rounded-md bg-forest-50 border border-forest-100 p-4 max-w-2xl mx-auto">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest-400" />
          <p className="text-xs text-forest-500 leading-relaxed">
            Individual experiences vary. These images are placeholders and do not represent actual Gaps Magic customers. Wellness products are not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare professional before use.
          </p>
        </div>
      </div>
    </section>
  );
}

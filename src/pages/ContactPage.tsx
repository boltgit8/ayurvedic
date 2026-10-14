import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Info } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { siteConfig } from '@/data/siteConfig';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email';
    if (!formData.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const update = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div>
      {/* Compact hero band */}
      <div className="bg-forest-900 py-10 sm:py-14">
        <div className="container-narrow">
          <span className="section-eyebrow !text-gold-300">Get in Touch</span>
          <h1 className="mt-2 font-serif text-2xl font-semibold text-cream-50 sm:text-3xl">Contact Us</h1>
          <p className="mt-3 text-sm text-cream-300 leading-relaxed max-w-lg">
            Have a question about a product or your order? We're here to help. Reach us through any of the channels below — we aim to respond promptly.
          </p>
        </div>
      </div>

      <div className="container-narrow py-12 lg:py-16">
        <Breadcrumb items={[{ label: 'Contact Us' }]} />

        <div className="mt-10 grid gap-10 lg:grid-cols-5 lg:gap-16">
          {/* Left — contact methods, editorial column */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600 mb-6">Reach Us Directly</h2>

            <div className="space-y-7">
              {/* WhatsApp — primary */}
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-forest-500" />
                  <p className="text-sm font-medium text-forest-800 group-hover:text-gold-700 transition-colors">WhatsApp</p>
                </div>
                <p className="mt-1.5 text-lg font-sans font-medium text-forest-700 group-hover:text-gold-700 transition-colors pl-6">{siteConfig.phone}</p>
                <p className="mt-0.5 text-xs text-forest-400 pl-6">Tap to start a chat</p>
              </a>

              {/* Phone */}
              <div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-forest-500" />
                  <p className="text-sm font-medium text-forest-800">Phone</p>
                </div>
                <div className="mt-1.5 pl-6 space-y-0.5">
                  <a href={`tel:${siteConfig.phone}`} className="block text-lg font-sans font-medium text-forest-700 hover:text-gold-700 transition-colors">{siteConfig.phone}</a>
                  <a href={`tel:${siteConfig.phone2}`} className="block text-lg font-sans font-medium text-forest-700 hover:text-gold-700 transition-colors">{siteConfig.phone2}</a>
                </div>
              </div>

              {/* Email */}
              <a href={`mailto:${siteConfig.email}`} className="group block">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-forest-500" />
                  <p className="text-sm font-medium text-forest-800 group-hover:text-gold-700 transition-colors">Email</p>
                </div>
                <p className="mt-1.5 text-sm text-forest-600 break-all group-hover:text-gold-700 transition-colors pl-6">{siteConfig.email}</p>
              </a>

              {/* Address */}
              <div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-forest-500" />
                  <p className="text-sm font-medium text-forest-800">Business Address</p>
                </div>
                <p className="mt-2 text-sm text-forest-500 leading-relaxed pl-6">{siteConfig.address}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-8 border-t border-cream-200 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-sage-500 mb-2">Company</p>
              <p className="text-sm font-medium text-forest-700">{siteConfig.legalName}</p>
              <p className="mt-1 text-xs text-forest-400">Kalka, District Panchkula, Haryana 133302</p>
            </div>
          </div>

          {/* Right — contact form */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-cream-200 bg-white p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-forest-800 mb-1">Send a Message</h2>
              <p className="text-xs text-forest-400 mb-6">Fields marked * are required.</p>

              {submitted && (
                <div className="mb-5 flex items-start gap-2 rounded-lg border border-cream-200 bg-cream-50 p-4">
                  <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest-500" />
                  <div>
                    <p className="text-sm font-medium text-forest-700">This form is not yet live.</p>
                    <p className="mt-1 text-sm text-forest-500 leading-relaxed">
                      Message delivery requires the PHP backend to be connected. Until then, please send your enquiry via WhatsApp or phone — we respond promptly.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <a
                        href={`https://wa.me/${siteConfig.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-forest-600 px-4 py-2 text-xs font-medium text-cream-50 transition-all hover:bg-forest-700"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        WhatsApp: {siteConfig.phone}
                      </a>
                      <a
                        href={`tel:${siteConfig.phone}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-forest-300 px-4 py-2 text-xs font-medium text-forest-700 transition-all hover:bg-forest-50"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        Call: {siteConfig.phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-forest-600 mb-1.5">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => update('name', e.target.value)}
                      className="input-field"
                      placeholder="Your name"
                    />
                    {errors.name && <p className="mt-1 text-xs text-accent-600">{errors.name}</p>}
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
                  <div>
                    <label className="block text-sm font-medium text-forest-600 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className="input-field"
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-forest-600 mb-1.5">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => update('subject', e.target.value)}
                      className="input-field"
                      placeholder="What is this about?"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-forest-600 mb-1.5">Message *</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => update('message', e.target.value)}
                      className="input-field min-h-[120px] resize-y"
                      placeholder="How can we help you?"
                    />
                    {errors.message && <p className="mt-1 text-xs text-accent-600">{errors.message}</p>}
                  </div>
                </div>

                <button type="submit" className="btn-primary mt-6">
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>

              <div className="mt-5 flex items-start gap-2 rounded-lg bg-cream-50 border border-cream-100 p-3">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest-400" />
                <p className="text-xs text-forest-500 leading-relaxed">
                  This form is a frontend placeholder. Message delivery to our team will work once the PHP + MySQL backend is connected. Until then, please use WhatsApp or phone for urgent enquiries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

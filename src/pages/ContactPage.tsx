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
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 6000);
  };

  const update = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="container-narrow py-8 lg:py-10">
      <Breadcrumb items={[{ label: 'Contact Us' }]} />

      <div className="mt-6 max-w-2xl">
        <span className="section-eyebrow">Get in Touch</span>
        <h1 className="mt-2 font-serif text-2xl font-semibold text-forest-800 sm:text-3xl">Contact Us</h1>
        <p className="mt-3 text-sm text-forest-500 leading-relaxed">
          Have a question about a product or your order? We're here to help. Reach us through any of the channels below — we aim to respond promptly.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-5 lg:gap-12">
        {/* Left: contact methods — editorial column */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gold-600 mb-4">Reach Us Directly</h2>
            <div className="space-y-5">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-forest-50 flex-shrink-0">
                  <MessageCircle className="h-5 w-5 text-forest-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-forest-800 group-hover:text-forest-600 transition-colors">WhatsApp</p>
                  <p className="text-sm text-forest-500">{siteConfig.phone}</p>
                  <p className="text-xs text-forest-400 mt-0.5">Tap to start a chat</p>
                </div>
              </a>

              {/* Phone */}
              <div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-forest-50 flex-shrink-0">
                    <Phone className="h-5 w-5 text-forest-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-forest-800">Phone</p>
                    <a href={`tel:${siteConfig.phone}`} className="block text-sm text-forest-500 hover:text-forest-700 transition-colors">{siteConfig.phone}</a>
                    <a href={`tel:${siteConfig.phone2}`} className="block text-sm text-forest-500 hover:text-forest-700 transition-colors">{siteConfig.phone2}</a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-3 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-forest-50 flex-shrink-0">
                  <Mail className="h-5 w-5 text-forest-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-forest-800 group-hover:text-forest-600 transition-colors">Email</p>
                  <p className="text-sm text-forest-500 break-all">{siteConfig.email}</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-forest-50 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-forest-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-forest-800">Business Address</p>
                  <p className="text-sm text-forest-500 leading-relaxed">{siteConfig.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: contact form */}
        <div className="lg:col-span-3">
          <div className="rounded-lg border border-cream-200 bg-white p-6 sm:p-8">
            <h2 className="font-serif text-lg font-medium text-forest-800 mb-1">Send a Message</h2>
            <p className="text-xs text-forest-400 mb-5">Fields marked * are required.</p>

            {submitted && (
              <div className="mb-4 flex items-start gap-2 rounded-md border border-gold-200 bg-gold-50 p-3">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-600" />
                <p className="text-sm text-gold-700">
                  Thank you for your message. It has been submitted for review. Once the PHP backend is connected, it will be delivered to our team automatically.
                </p>
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

            <div className="mt-4 flex items-start gap-2 rounded-md bg-cream-50 border border-cream-100 p-3">
              <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest-400" />
              <p className="text-xs text-forest-500 leading-relaxed">
                This form is a frontend placeholder. Message delivery to our team will work once the PHP + MySQL backend is connected. Until then, please use WhatsApp or phone for urgent enquiries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

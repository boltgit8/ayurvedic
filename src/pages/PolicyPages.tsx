import { Breadcrumb } from '@/components/Breadcrumb';
import type { ReactNode } from 'react';

interface PolicyPageProps {
  title: string;
  breadcrumbLabel: string;
  children: ReactNode;
}

export function PolicyPage({ title, breadcrumbLabel, children }: PolicyPageProps) {
  return (
    <div className="container-page py-8 max-w-3xl">
      <Breadcrumb items={[{ label: breadcrumbLabel }]} />
      <h1 className="mt-6 mb-6 font-serif text-2xl font-semibold text-forest-800 sm:text-3xl">{title}</h1>
      <div className="rounded-xl border border-cream-200 bg-white p-6 sm:p-8">
        <div className="prose prose-sm max-w-none text-forest-600 [&_h2]:font-serif [&_h2]:text-lg [&_h2]:font-medium [&_h2]:text-forest-800 [&_h2]:mt-6 [&_h2]:mb-3 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:mb-3 [&_ul]:text-sm [&_ul]:leading-relaxed [&_ul]:mb-3 [&_li]:mb-1 [&_strong]:text-forest-700">
          {children}
        </div>
      </div>
      <p className="mt-4 text-xs text-forest-400">
        Last updated: October 2026. This policy is a frontend placeholder and should be reviewed by legal counsel before publication.
      </p>
    </div>
  );
}

export function PrivacyPolicyPage() {
  return (
    <PolicyPage title="Privacy Policy" breadcrumbLabel="Privacy Policy">
      <h2>Introduction</h2>
      <p>
        Gaps Magic Wellness Private Limited ("we", "our", "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or purchase our products.
      </p>
      <h2>Information We Collect</h2>
      <ul>
        <li><strong>Contact details:</strong> Name, email, phone number, and shipping address when you place an order or contact us.</li>
        <li><strong>Order information:</strong> Products ordered, payment method, and delivery details.</li>
        <li><strong>Usage data:</strong> Pages visited, products viewed, and general browsing behaviour.</li>
      </ul>
      <h2>How We Use Your Information</h2>
      <ul>
        <li>To process and deliver your orders.</li>
        <li>To respond to your enquiries and provide customer support.</li>
        <li>To send order confirmations and delivery updates.</li>
        <li>To improve our website and product offerings.</li>
      </ul>
      <h2>Data Security</h2>
      <p>
        We take reasonable measures to protect your personal information from unauthorised access, alteration, or disclosure. Your payment information is not stored on our servers.
      </p>
      <h2>Third-Party Services</h2>
      <p>
        We may use trusted third-party services for payment processing and delivery. These providers have their own privacy policies governing the use of your information.
      </p>
      <h2>Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal information by contacting us at the details provided on our Contact Us page.
      </p>
      <h2>Contact</h2>
      <p>
        For any privacy-related questions, please contact us at kakubhatiagapsmaicshop@gmail.com or 8219531115.
      </p>
    </PolicyPage>
  );
}

export function TermsPage() {
  return (
    <PolicyPage title="Terms & Conditions" breadcrumbLabel="Terms & Conditions">
      <h2>Acceptance of Terms</h2>
      <p>
        By accessing and using the Gaps Magic Wellness website, you accept and agree to be bound by these Terms & Conditions. If you do not agree, please do not use our website.
      </p>
      <h2>Products & Pricing</h2>
      <ul>
        <li>All products are subject to availability.</li>
        <li>Prices are listed in Indian Rupees (INR) and include applicable taxes where specified.</li>
        <li>We reserve the right to change prices and offers without prior notice.</li>
        <li>Offer eligibility is based on the product's original MRP, before any discount.</li>
      </ul>
      <h2>Offers</h2>
      <ul>
        <li>MRP ₹199–₹999: Buy 2 Get 1 Free + 20% discount.</li>
        <li>MRP ₹1,199–₹4,480: Buy 1 Get 1 Free + 20% discount.</li>
        <li>Free item MRP must be equal to or lower than the qualifying paid product's MRP.</li>
        <li>GST on free products is applicable as per the client's instructions.</li>
        <li>Special products may have product-specific offers that override general rules.</li>
      </ul>
      <h2>Orders</h2>
      <ul>
        <li>Orders are confirmed only after payment verification (for online payments) or order acceptance (for COD).</li>
        <li>We reserve the right to cancel orders due to stock unavailability, pricing errors, or suspicious activity.</li>
      </ul>
      <h2>Product Information</h2>
      <p>
        We strive to provide accurate product information. However, we do not warrant that product descriptions, images, or other content are entirely accurate, complete, or current. Product images are for illustration; actual packaging may vary.
      </p>
      <h2>Health Disclaimer</h2>
      <p>
        Wellness products are not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare professional before using any herbal or wellness product.
      </p>
      <h2>Limitation of Liability</h2>
      <p>
        Gaps Magic Wellness shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.
      </p>
    </PolicyPage>
  );
}

export function ShippingPolicyPage() {
  return (
    <PolicyPage title="Shipping Policy" breadcrumbLabel="Shipping Policy">
      <h2>Delivery Areas</h2>
      <p>
        We deliver across India. Delivery times may vary based on your location and product availability.
      </p>
      <h2>Processing Time</h2>
      <ul>
        <li>Orders are typically processed within 1–2 business days of confirmation.</li>
        <li>Orders placed on weekends or holidays are processed on the next business day.</li>
      </ul>
      <h2>Estimated Delivery</h2>
      <ul>
        <li>Metro cities: 3–5 business days.</li>
        <li>Other cities: 5–7 business days.</li>
        <li>Remote areas: 7–10 business days.</li>
      </ul>
      <p>These are estimated timeframes and may vary due to factors beyond our control.</p>
      <h2>Shipping Charges</h2>
      <p>
        Shipping charges, if any, will be displayed at checkout before you place your order. Free shipping may be offered on select products or during promotional periods.
      </p>
      <h2>Order Tracking</h2>
      <p>
        Once your order is dispatched, you will receive a tracking reference. You can track your order using the Track Order feature on our website.
      </p>
      <h2>Delivery Issues</h2>
      <p>
        If you experience any delivery issues, please contact us at kakubhatiagapsmaicshop@gmail.com or 8219531115 with your order details.
      </p>
    </PolicyPage>
  );
}

export function CancellationPolicyPage() {
  return (
    <PolicyPage title="Cancellation Policy" breadcrumbLabel="Cancellation Policy">
      <h2>Order Cancellation by Customer</h2>
      <ul>
        <li>You may cancel your order before it has been dispatched. Please contact us immediately at kakubhatiagapsmaicshop@gmail.com or 8219531115.</li>
        <li>Once an order has been dispatched, it cannot be cancelled. Please refer to our Return & Refund Policy for post-delivery options.</li>
      </ul>
      <h2>Order Cancellation by Us</h2>
      <ul>
        <li>We reserve the right to cancel orders due to stock unavailability, pricing errors, or suspected fraudulent activity.</li>
        <li>In such cases, any payment made will be fully refunded.</li>
      </ul>
      <h2>Refund for Cancelled Orders</h2>
      <p>
        If you have paid online and your order is cancelled (by you before dispatch or by us), the refund will be processed to the original payment method within 7–10 business days.
      </p>
    </PolicyPage>
  );
}

export function RefundPolicyPage() {
  return (
    <PolicyPage title="Return & Refund Policy" breadcrumbLabel="Return & Refund Policy">
      <h2>Return Eligibility</h2>
      <ul>
        <li>Products may be eligible for return if they are damaged, defective, or incorrectly delivered.</li>
        <li>Return requests must be raised within 7 days of delivery.</li>
        <li>Products must be in their original packaging with all accessories and labels intact.</li>
        <li>Wellness and consumable products (powders, juices, syrups, tablets, atta) are not eligible for return once opened, unless damaged or defective.</li>
      </ul>
      <h2>How to Initiate a Return</h2>
      <ul>
        <li>Contact us at kakubhatiagapsmaicshop@gmail.com or 8219531115 with your order ID and reason for return.</li>
        <li>Our team will review your request and provide return instructions if approved.</li>
      </ul>
      <h2>Refund Process</h2>
      <ul>
        <li>Approved refunds will be processed to the original payment method within 7–10 business days.</li>
        <li>For Cash on Delivery orders, refunds will be processed to your bank account or UPI ID.</li>
      </ul>
      <h2>Non-Refundable Items</h2>
      <ul>
        <li>Opened consumable products (unless damaged or defective).</li>
        <li>Products returned without original packaging.</li>
        <li>Products damaged due to misuse by the customer.</li>
      </ul>
      <h2>Exchange</h2>
      <p>
        Exchanges may be available for damaged or defective products, subject to stock availability.
      </p>
    </PolicyPage>
  );
}

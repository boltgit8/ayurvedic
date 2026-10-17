/**
 * Gaps Magic wordmark — text-based brand identity.
 * Replace this component with the client-provided logo image when available.
 * The component accepts a `variant` prop for light/dark backgrounds.
 */
export function Logo({ className = '', variant = 'dark' }: { className?: string; variant?: 'dark' | 'light' }) {
  const primary = variant === 'dark' ? 'text-forest-800' : 'text-cream-50';
  const accent = variant === 'dark' ? 'text-gold-600' : 'text-gold-300';
  const subColor = variant === 'dark' ? 'text-forest-400' : 'text-cream-200/70';
  const dividerColor = variant === 'dark' ? 'bg-gold-400' : 'bg-gold-400';

  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 ${className}`}>
      <span className={`font-serif text-xl sm:text-2xl font-bold tracking-tight ${primary}`}>
        Gaps Magic
      </span>
      <span className={`h-5 sm:h-6 w-px ${dividerColor} opacity-60`} />
      <span className={`flex flex-col leading-none hidden sm:flex`}>
        <span className={`font-sans text-[10px] font-semibold uppercase tracking-[0.15em] ${accent}`}>
          Wellness
        </span>
        <span className={`font-sans text-[8px] uppercase tracking-[0.1em] ${subColor} mt-0.5`}>
          Pvt. Ltd.
        </span>
      </span>
    </div>
  );
}

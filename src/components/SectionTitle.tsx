import type { ReactNode } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  children?: ReactNode;
}

export function SectionTitle({ title, subtitle, centered = false, children }: SectionTitleProps) {
  return (
    <div className={`mb-8 flex items-end justify-between gap-4 ${centered ? 'flex-col items-center text-center' : ''}`}>
      <div>
        <h2 className="font-serif text-2xl font-semibold text-forest-800 sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-forest-500 max-w-2xl">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

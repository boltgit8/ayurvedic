import { useState } from 'react';
import { Package } from 'lucide-react';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'tall' | 'wide';
  loading?: 'eager' | 'lazy';
}

export function ProductImage({
  src,
  alt,
  className = '',
  aspectRatio = 'square',
  loading = 'lazy',
}: ProductImageProps) {
  const [error, setError] = useState(false);

  const aspectClass =
    aspectRatio === 'square' ? 'aspect-square' :
    aspectRatio === 'video' ? 'aspect-video' :
    aspectRatio === 'tall' ? 'aspect-[3/4]' :
    'aspect-[16/9]';

  if (error || !src) {
    return (
      <div className={`${aspectClass} ${className} flex items-center justify-center bg-gradient-to-br from-cream-100 to-sage-50`}>
        <div className="flex flex-col items-center gap-2 text-forest-300">
          <Package className="h-7 w-7" />
          <span className="text-[11px] font-medium text-forest-400 px-2 text-center">
            Product photo pending
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={`${aspectClass} ${className} object-cover`}
      onError={() => setError(true)}
    />
  );
}

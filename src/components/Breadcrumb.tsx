import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; path?: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-forest-400">
      <Link to="/" className="flex items-center gap-1 hover:text-forest-600 transition-colors">
        <Home className="h-3.5 w-3.5" />
        <span className="sr-only">Home</span>
      </Link>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-1">
          <ChevronRight className="h-3.5 w-3.5 text-cream-400" />
          {item.path ? (
            <Link to={item.path} className="hover:text-forest-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-forest-700 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

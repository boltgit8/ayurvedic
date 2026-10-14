import { Link } from 'react-router-dom';
import { Home, Search, ArrowRight } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="container-page py-16">
      <div className="flex flex-col items-center justify-center text-center min-h-[50vh]">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-forest-50 mb-6">
          <span className="font-serif text-4xl font-bold text-forest-600">404</span>
        </div>
        <h1 className="font-serif text-2xl font-semibold text-forest-800 sm:text-3xl">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm text-forest-500 max-w-md">
          The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="btn-primary">
            <Home className="h-4 w-4" />
            Go to Homepage
          </Link>
          <Link to="/shop" className="btn-secondary">
            <Search className="h-4 w-4" />
            Browse Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

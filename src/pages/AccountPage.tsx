import { Link } from 'react-router-dom';
import { User, Package, Heart, MapPin, LogOut, ChevronRight, Info } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useWishlist } from '@/context/WishlistContext';

export function AccountPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="container-page py-8">
      <Breadcrumb items={[{ label: 'My Account' }]} />

      <h1 className="mt-6 mb-8 font-serif text-2xl font-semibold text-forest-800 sm:text-3xl">My Account</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Profile */}
        <div className="rounded-xl border border-cream-200 bg-white p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-50">
              <User className="h-6 w-6 text-forest-600" />
            </div>
            <div>
              <h2 className="font-serif text-base font-medium text-forest-800">Profile</h2>
              <p className="text-xs text-forest-400">Manage your details</p>
            </div>
          </div>
          <p className="text-sm text-forest-500">
            Your profile information will appear here once you are signed in.
          </p>
          <Link to="/login" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-forest-600 hover:text-forest-700">
            Sign in <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Order History */}
        <div className="rounded-xl border border-cream-200 bg-white p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-50">
              <Package className="h-6 w-6 text-forest-600" />
            </div>
            <div>
              <h2 className="font-serif text-base font-medium text-forest-800">Order History</h2>
              <p className="text-xs text-forest-400">View past orders</p>
            </div>
          </div>
          <p className="text-sm text-forest-500">
            Your order history will appear here after your first purchase.
          </p>
          <Link to="/track-order" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-forest-600 hover:text-forest-700">
            Track an order <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Wishlist */}
        <div className="rounded-xl border border-cream-200 bg-white p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-50">
              <Heart className="h-6 w-6 text-forest-600" />
            </div>
            <div>
              <h2 className="font-serif text-base font-medium text-forest-800">Wishlist</h2>
              <p className="text-xs text-forest-400">{wishlist.length} saved item(s)</p>
            </div>
          </div>
          <p className="text-sm text-forest-500">
            Products you've saved for later.
          </p>
          <Link to="/wishlist" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-forest-600 hover:text-forest-700">
            View wishlist <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Addresses */}
        <div className="rounded-xl border border-cream-200 bg-white p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-50">
              <MapPin className="h-6 w-6 text-forest-600" />
            </div>
            <div>
              <h2 className="font-serif text-base font-medium text-forest-800">Saved Addresses</h2>
              <p className="text-xs text-forest-400">Delivery addresses</p>
            </div>
          </div>
          <p className="text-sm text-forest-500">
            Your saved addresses will appear here for faster checkout.
          </p>
        </div>

        {/* Sign out */}
        <div className="rounded-xl border border-cream-200 bg-white p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-100">
              <LogOut className="h-6 w-6 text-forest-500" />
            </div>
            <div>
              <h2 className="font-serif text-base font-medium text-forest-800">Sign Out</h2>
              <p className="text-xs text-forest-400">Log out of your account</p>
            </div>
          </div>
          <Link to="/login" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-forest-600 hover:text-forest-700">
            Go to login <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-lg border border-cream-200 bg-cream-50 p-4">
        <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-forest-400" />
        <p className="text-sm text-forest-500 leading-relaxed">
          Account features — including order history, saved addresses, and profile management — require the PHP + MySQL backend to be connected. You can browse and shop as a guest without an account.
        </p>
      </div>
    </div>
  );
}

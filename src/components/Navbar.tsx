import React from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  ShieldCheck, 
  User as UserIcon, 
  Layers, 
  BarChart3, 
  Package, 
  Truck, 
  ChevronDown,
  Cloud
} from 'lucide-react';
import { useShop, AppView } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    currentUser, 
    switchUser, 
    setIsAuthModalOpen, 
    cart, 
    setIsCartDrawerOpen, 
    wishlist, 
    searchQuery, 
    setSearchQuery 
  } = useShop();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems: { label: string; view: AppView; icon?: React.ReactNode; adminOnly?: boolean }[] = [
    { label: 'Storefront', view: 'shop' },
    { label: 'Track Orders', view: 'track-orders', icon: <Truck className="w-3.5 h-3.5" /> },
    { label: 'Inventory', view: 'admin-inventory', icon: <Package className="w-3.5 h-3.5" />, adminOnly: true },
    { label: 'Sales Analytics', view: 'admin-analytics', icon: <BarChart3 className="w-3.5 h-3.5" />, adminOnly: true },
    { label: 'Azure Stack', view: 'cloud-architecture', icon: <Cloud className="w-3.5 h-3.5" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-sm backdrop-blur-md">
      {/* Top Banner Notice */}
      <div className="bg-amber-950/60 text-amber-200 text-xs py-1.5 px-4 text-center border-b border-amber-900/40 flex items-center justify-center gap-3">
        <span className="font-medium">Special Launch Offer:</span>
        <span>Use code <strong className="text-amber-100 font-mono tracking-wider bg-amber-900/40 px-1.5 py-0.5 rounded">SPHERE10</strong> for 10% off · Free global express shipping over $150</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text brand wordmark */}
          <div className="flex items-center gap-6 shrink-0">
            <button 
              onClick={() => setCurrentView('shop')}
              className="text-left group flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <span className="text-xl font-bold tracking-tight text-white font-display group-hover:text-amber-300 transition-colors">
                ShopSphere
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400/80 px-1.5 py-0.5 bg-amber-950/80 border border-amber-800/60 rounded">
                v2.4
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
            {navItems.map(item => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.label}
                  onClick={() => setCurrentView(item.view)}
                  className={`flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer py-1 text-sm ${
                    isActive 
                      ? 'text-white font-semibold border-b-2 border-amber-400' 
                      : 'text-stone-400'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.adminOnly && (
                    <span className="text-[10px] font-mono text-stone-400 px-1 py-0.2 bg-stone-800 rounded">
                      Admin
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Account Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Role Switcher Pill */}
            <div className="hidden lg:flex items-center bg-stone-800/80 border border-stone-700/80 rounded-lg p-0.5 text-xs font-medium text-stone-300">
              <button
                onClick={() => switchUser('customer')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  currentUser.role === 'customer' 
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs' 
                    : 'text-stone-400 hover:text-white'
                }`}
                title="Switch demo context to Customer (Alice Smith)"
              >
                Customer
              </button>
              <button
                onClick={() => switchUser('admin')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  currentUser.role === 'admin' 
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs' 
                    : 'text-stone-400 hover:text-white'
                }`}
                title="Switch demo context to Admin (Marc Vance)"
              >
                Admin
              </button>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => setCurrentView('shop')}
              className="p-2 text-stone-300 hover:text-amber-300 transition-colors relative cursor-pointer"
              title="Saved Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-amber-400 text-amber-400' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-stone-950 text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-100 px-3.5 py-2 rounded-lg border border-stone-700 transition-colors text-xs font-semibold cursor-pointer relative"
              title="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-amber-400 text-stone-950 text-xs font-bold px-1.5 py-0.2 rounded font-mono">
                {totalCartCount}
              </span>
            </button>

            {/* Auth / Profile Button */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 px-3.5 py-2 rounded-lg font-semibold text-xs transition-colors cursor-pointer"
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden sm:inline truncate max-w-[110px]">
                {currentUser.name}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

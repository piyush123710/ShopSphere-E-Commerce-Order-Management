import React from 'react';
import { ShieldCheck, Truck, RotateCcw, CreditCard, Cloud } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setCurrentView } = useShop();

  return (
    <footer className="bg-stone-900 border-t border-stone-800 text-stone-400 text-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-stone-800">
          {/* Brand Col */}
          <div className="space-y-3">
            <span className="text-xl font-bold tracking-tight text-white font-display block">
              ShopSphere
            </span>
            <p className="text-stone-400 text-xs leading-relaxed">
              Curated mastercraft objects and precision audio, timepieces, and travel gear with real-time order tracking and express delivery.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-stone-200 font-semibold mb-3">
              Storefront
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors cursor-pointer">
                  Featured Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('track-orders')} className="hover:text-white transition-colors cursor-pointer">
                  Track Delivery
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('cloud-architecture')} className="hover:text-white transition-colors cursor-pointer">
                  System Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Admin Management */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-stone-200 font-semibold mb-3">
              Admin & Operations
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setCurrentView('admin-inventory')} className="hover:text-white transition-colors cursor-pointer">
                  Product Inventory Management
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('admin-analytics')} className="hover:text-white transition-colors cursor-pointer">
                  Sales Analytics Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('track-orders')} className="hover:text-white transition-colors cursor-pointer">
                  Fulfillment & Invoices
                </button>
              </li>
            </ul>
          </div>

          {/* Architecture Spec */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-stone-200 font-semibold mb-3">
              Enterprise Stack
            </h4>
            <div className="space-y-1.5 font-mono text-[11px] text-stone-400">
              <div>ASP.NET Core Web API (.NET 8)</div>
              <div>Microsoft SQL Server + EF Core</div>
              <div>Microsoft Azure Cloud Deployment</div>
              <div>Razorpay & Stripe Gateway</div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <span>&copy; {new Date().getFullYear()} ShopSphere Inc. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

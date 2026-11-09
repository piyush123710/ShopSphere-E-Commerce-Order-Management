import React from 'react';
import { ArrowRight, ShieldCheck, CreditCard, Cloud, Cpu } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const HeroBanner: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  return (
    <section className="relative overflow-hidden bg-stone-900 border-b border-stone-800 text-stone-100">
      {/* Background Hero Image with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_shopsphere_banner_1794225874675.jpg"
          alt="ShopSphere Flagship Studio Showcase"
          className="w-full h-full object-cover object-center opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/90 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl">
          {/* Subtle text kicker without pill enclosure */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
            <span>Autumn 2026 Collection</span>
            <span aria-hidden="true">·</span>
            <span>Precision & Artisanal Craft</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display mb-4 text-balance">
            Elevated objects for discerning workspaces & daily life.
          </h1>

          <p className="text-stone-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
            Explore our curated selection of acoustic headphones, aerospace titanium timepieces, and hand-finished Tuscan leather luggage. Backed by real-time order tracking and instantaneous checkout.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-lg transition-colors flex items-center gap-2 shadow-sm cursor-pointer whitespace-nowrap"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentView('track-orders')}
              className="px-5 py-3 bg-stone-800/90 hover:bg-stone-750 text-stone-200 border border-stone-700 font-semibold text-sm rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Track Live Delivery</span>
            </button>

            <button
              onClick={() => setCurrentView('cloud-architecture')}
              className="px-4 py-3 text-stone-400 hover:text-stone-200 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>ASP.NET Core & Azure SQL Spec</span>
            </button>
          </div>

          {/* Trust strip */}
          <div className="mt-12 pt-6 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-3 gap-6 text-stone-400 text-xs">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Stripe & Razorpay Integrated</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Global 2-3 Year Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Azure Cloud 99.99% SLA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

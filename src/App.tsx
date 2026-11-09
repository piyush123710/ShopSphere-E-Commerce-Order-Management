import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingView } from './components/OrderTrackingView';
import { InvoiceModal } from './components/InvoiceModal';
import { AdminInventory } from './components/AdminInventory';
import { AdminAnalytics } from './components/AdminAnalytics';
import { CloudArchitectureModal } from './components/CloudArchitectureModal';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    selectedProductId, 
    openProductDetail,
    invoiceOrder, 
    setInvoiceOrder 
  } = useShop();

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-950">
      <Navbar />

      <main className="flex-grow">
        {currentView === 'shop' && (
          <>
            <HeroBanner />
            <ProductCatalog />
          </>
        )}

        {currentView === 'track-orders' && (
          <OrderTrackingView />
        )}

        {currentView === 'admin-inventory' && (
          <AdminInventory />
        )}

        {currentView === 'admin-analytics' && (
          <AdminAnalytics />
        )}

        {currentView === 'cloud-architecture' && (
          <CloudArchitectureModal />
        )}
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <ProductDetailModal
        productId={selectedProductId}
        onClose={() => openProductDetail('')}
        onInstantCheckout={() => setIsCheckoutModalOpen(true)}
      />

      <CartDrawer 
        onProceedToCheckout={() => setIsCheckoutModalOpen(true)} 
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />

      <InvoiceModal
        order={invoiceOrder}
        onClose={() => setInvoiceOrder(null)}
      />

      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

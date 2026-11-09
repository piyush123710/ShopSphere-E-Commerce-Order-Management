import React from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  FileText, 
  ArrowRight, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  RotateCw,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { DeliveryStatus } from '../types/ecommerce';

export const OrderTrackingView: React.FC = () => {
  const { 
    orders, 
    selectedOrderId, 
    openOrderDetails, 
    advanceOrderStep,
    setInvoiceOrder,
    setCurrentView
  } = useShop();

  // Find active order or fallback to first order
  const activeOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  if (!activeOrder) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <Package className="w-12 h-12 text-stone-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-stone-800">No Orders Found</h3>
        <p className="text-stone-500 text-sm mt-1">
          You haven't placed any orders yet. Browse our collection and checkout.
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="mt-4 px-5 py-2.5 bg-stone-900 text-white font-semibold text-xs rounded-lg hover:bg-stone-800 cursor-pointer"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  const milestones: { status: DeliveryStatus; label: string; desc: string }[] = [
    { status: 'placed', label: 'Order Placed', desc: 'Payment verified & recorded' },
    { status: 'confirmed', label: 'Order Confirmed', desc: 'Allocated in warehouse' },
    { status: 'shipped', label: 'In Transit', desc: 'Departed distribution center' },
    { status: 'out_for_delivery', label: 'Out for Delivery', desc: 'With local driver' },
    { status: 'delivered', label: 'Delivered', desc: 'Package received' }
  ];

  const currentStatusIndex = milestones.findIndex(m => m.status === activeOrder.deliveryStatus);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Breadcrumb & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mb-1">
            <span>Customer Portal</span>
            <span aria-hidden="true">/</span>
            <span>Live Order Tracking</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
            Order #{activeOrder.orderNumber}
          </h2>
        </div>

        {/* Orders list selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-stone-500 font-medium">Select Order:</label>
          <select
            value={activeOrder.id}
            onChange={(e) => openOrderDetails(e.target.value)}
            className="px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-mono font-medium text-stone-800 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            {orders.map(ord => (
              <option key={ord.id} value={ord.id}>
                {ord.orderNumber} - ${ord.total.toFixed(2)} ({ord.deliveryStatus.toUpperCase()})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Column: Timeline & Courier Info (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Status Tracker Card */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-600 font-semibold">
                  Carrier Courier Status
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                  {activeOrder.deliveryStatus === 'delivered' ? 'Package Delivered' : 'In Transit to Destination'}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Estimated Delivery: <strong className="text-stone-800">{activeOrder.courier.estimatedDelivery}</strong>
                </p>
              </div>

              {/* Simulation test action button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => advanceOrderStep(activeOrder.id)}
                  disabled={activeOrder.deliveryStatus === 'delivered'}
                  className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-lg border border-stone-300 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Simulate courier scanning to next delivery milestone"
                >
                  <RotateCw className="w-3.5 h-3.5 text-stone-600" />
                  <span>Advance Status (Demo)</span>
                </button>

                <button
                  onClick={() => setInvoiceOrder(activeOrder)}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Tax Invoice</span>
                </button>
              </div>
            </div>

            {/* Visual Milestones Stepper */}
            <div className="py-8">
              {/* Stepper bar */}
              <div className="hidden sm:grid grid-cols-5 relative mb-8">
                {/* Connecting track */}
                <div className="absolute top-4 left-6 right-6 h-1 bg-stone-200 -z-0">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-500" 
                    style={{ 
                      width: `${Math.max(0, (currentStatusIndex / (milestones.length - 1)) * 100)}%` 
                    }}
                  />
                </div>

                {milestones.map((m, idx) => {
                  const isDone = idx <= currentStatusIndex;
                  const isCurrent = idx === currentStatusIndex;
                  return (
                    <div key={m.status} className="flex flex-col items-center text-center relative z-10 px-1">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                        isDone 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-white border-2 border-stone-300 text-stone-400'
                      } ${isCurrent ? 'ring-4 ring-emerald-100 scale-105' : ''}`}>
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>
                      <span className={`text-xs mt-2.5 font-semibold ${isDone ? 'text-stone-900' : 'text-stone-400'}`}>
                        {m.label}
                      </span>
                      <span className="text-[10px] text-stone-500 mt-0.5 leading-tight max-w-[100px]">
                        {m.desc}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Stepper Timeline */}
              <div className="sm:hidden space-y-4">
                {milestones.map((m, idx) => {
                  const isDone = idx <= currentStatusIndex;
                  return (
                    <div key={m.status} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isDone ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-400'
                      }`}>
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${isDone ? 'text-stone-900' : 'text-stone-400'}`}>
                          {m.label}
                        </div>
                        <div className="text-[11px] text-stone-500">{m.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Timeline Events */}
            <div className="mt-6 pt-6 border-t border-stone-100">
              <h4 className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-4">
                Detailed Carrier Scan History
              </h4>

              <div className="space-y-4">
                {activeOrder.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                      step.completed ? 'bg-emerald-500' : 'bg-stone-300'
                    }`} />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className={`font-semibold ${step.completed ? 'text-stone-900' : 'text-stone-400'}`}>
                          {step.title}
                        </span>
                        <span className="text-[11px] font-mono text-stone-400">
                          {step.timestamp}
                        </span>
                      </div>
                      <p className="text-stone-500 text-[11px] mt-0.5">{step.description}</p>
                      {step.location && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-stone-400 mt-1 font-mono">
                          <MapPin className="w-3 h-3 text-stone-400" />
                          <span>{step.location}</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Details & Invoice Link (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Order Metadata Card */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Delivery Information
            </h4>

            <div className="text-xs space-y-3">
              <div>
                <span className="text-stone-400 text-[11px] block">Courier Partner</span>
                <span className="font-semibold text-stone-800">{activeOrder.courier.name}</span>
              </div>

              <div>
                <span className="text-stone-400 text-[11px] block">Waybill / Tracking No.</span>
                <span className="font-mono font-bold text-stone-900 select-all">{activeOrder.courier.trackingNumber}</span>
              </div>

              <div>
                <span className="text-stone-400 text-[11px] block">Shipping Address</span>
                <p className="text-stone-700 leading-relaxed mt-0.5">
                  <strong>{activeOrder.customer.name}</strong><br />
                  {activeOrder.customer.shippingAddress.street}<br />
                  {activeOrder.customer.shippingAddress.city}, {activeOrder.customer.shippingAddress.state} {activeOrder.customer.shippingAddress.zipCode}<br />
                  {activeOrder.customer.shippingAddress.country}<br />
                  <span className="text-stone-500 font-mono text-[11px]">{activeOrder.customer.phone}</span>
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <span className="text-stone-400 text-[11px] block">Payment Method</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-medium text-stone-800 capitalize">
                    {activeOrder.paymentDetails.provider}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded font-bold uppercase">
                    {activeOrder.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Purchased Items Card */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Items in Package
              </h4>
              <span className="text-xs font-mono text-stone-400">{activeOrder.items.length} item(s)</span>
            </div>

            <div className="space-y-3">
              {activeOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 py-2 border-b border-stone-100 last:border-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-semibold text-stone-900 truncate">{item.title}</h5>
                    <div className="flex items-center justify-between text-[11px] text-stone-500 mt-0.5 font-mono">
                      <span>Qty: {item.quantity}</span>
                      <span className="font-bold text-stone-800">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total calculation */}
            <div className="pt-3 border-t border-stone-200 space-y-1 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">${activeOrder.subtotal.toFixed(2)}</span>
              </div>
              {activeOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount ({activeOrder.couponCode})</span>
                  <span className="font-mono tabular-nums">-${activeOrder.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Tax</span>
                <span className="font-mono tabular-nums">${activeOrder.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="font-mono tabular-nums">{activeOrder.shippingFee === 0 ? 'Free' : `$${activeOrder.shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total Paid</span>
                <span className="font-mono tabular-nums">${activeOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

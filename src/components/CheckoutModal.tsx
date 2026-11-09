import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  QrCode, 
  Building2, 
  Truck, 
  Lock, 
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PaymentGateway, ShippingAddress } from '../types/ecommerce';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { 
    currentUser, 
    cart, 
    cartSubtotal, 
    appliedDiscount, 
    cartShipping, 
    cartTax, 
    cartTotal,
    placeOrder,
    setInvoiceOrder
  } = useShop();

  // Form states
  const [shippingData, setShippingData] = useState<ShippingAddress>({
    fullName: currentUser.name || 'Alice Smith',
    email: currentUser.email || 'alice.smith@example.com',
    phone: currentUser.address?.phone || '+1 (206) 555-0199',
    street: currentUser.address?.street || '742 Evergreen Terrace',
    apartment: 'Apt 4B',
    city: currentUser.address?.city || 'Seattle',
    state: currentUser.address?.state || 'WA',
    zipCode: currentUser.address?.zipCode || '98101',
    country: currentUser.address?.country || 'United States'
  });

  const [paymentGateway, setPaymentGateway] = useState<PaymentGateway>('stripe');

  // Stripe card details
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('890');
  const [cardHolder, setCardHolder] = useState('ALICE SMITH');

  // Razorpay UPI / NetBanking
  const [upiId, setUpiId] = useState('alice@oksbi');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStepText, setProcessStepText] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingData(prev => ({ ...prev, [field]: value }));
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setProcessStepText('Connecting to ASP.NET Core API Payment Gateway...');

    setTimeout(() => {
      setProcessStepText(`Authenticating with ${paymentGateway === 'stripe' ? 'Stripe Elements' : paymentGateway === 'razorpay' ? 'Razorpay Gateway' : 'COD Verification'}...`);
    }, 800);

    setTimeout(() => {
      setProcessStepText('Updating inventory records in Azure SQL Server...');
    }, 1500);

    setTimeout(() => {
      // Finalize order
      const paymentDetails = {
        provider: (paymentGateway === 'stripe' ? 'Stripe' : paymentGateway === 'razorpay' ? 'Razorpay' : 'Cash on Delivery') as any,
        last4: paymentGateway === 'stripe' ? '4242' : undefined,
        upiId: paymentGateway === 'razorpay' ? upiId : undefined,
        transactionId: paymentGateway === 'stripe' ? `ch_3N${Math.random().toString(36).substring(2, 10)}` : `pay_rzp_${Math.random().toString(36).substring(2, 10)}`
      };

      const newOrder = placeOrder(shippingData, paymentGateway, paymentDetails);
      setIsProcessing(false);
      onClose();
      // Set to trigger invoice preview
      setInvoiceOrder(newOrder);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-600" />
            <h3 className="text-base font-bold text-stone-900 font-display">
              Express Secure Checkout
            </h3>
            <span className="text-xs text-stone-500 font-mono">
              · 256-Bit SSL
            </span>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 z-30 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
            <div className="w-12 h-12 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
            <h4 className="text-base font-bold text-stone-900">Finalizing Your Order</h4>
            <p className="text-xs font-mono text-stone-600 mt-2 max-w-sm">
              {processStepText}
            </p>
            <span className="text-[11px] text-stone-400 mt-4">
              Please do not close or refresh this window...
            </span>
          </div>
        )}

        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8 max-h-[80vh] overflow-y-auto">
          {/* Left Column: Form & Payment Methods (7 cols) */}
          <div className="md:col-span-7 space-y-6">
            {/* 1. Shipping Details */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-600" />
                <span>1. Shipping Destination</span>
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="col-span-2">
                  <label className="block text-stone-600 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    value={shippingData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={shippingData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    value={shippingData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-stone-600 font-medium mb-1">Street Address</label>
                  <input
                    type="text"
                    value={shippingData.street}
                    onChange={(e) => handleInputChange('street', e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">City</label>
                  <input
                    type="text"
                    value={shippingData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">State & Zip</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={shippingData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-16 px-2 py-2 border border-stone-200 rounded-lg text-xs"
                      placeholder="State"
                    />
                    <input
                      type="text"
                      value={shippingData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="w-full px-2 py-2 border border-stone-200 rounded-lg text-xs font-mono"
                      placeholder="Zip"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Payment Gateway Selection */}
            <div className="pt-2 border-t border-stone-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-amber-600" />
                <span>2. Payment Integration</span>
              </h4>

              {/* Gateway Selector Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-stone-100 rounded-lg mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentGateway('stripe')}
                  className={`py-2 px-2 text-xs font-semibold rounded-md transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    paymentGateway === 'stripe'
                      ? 'bg-white text-stone-900 shadow-xs border border-stone-200'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-indigo-600" />
                  <span>Stripe Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentGateway('razorpay')}
                  className={`py-2 px-2 text-xs font-semibold rounded-md transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    paymentGateway === 'razorpay'
                      ? 'bg-white text-stone-900 shadow-xs border border-stone-200'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-blue-600" />
                  <span>Razorpay UPI</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentGateway('cod')}
                  className={`py-2 px-2 text-xs font-semibold rounded-md transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    paymentGateway === 'cod'
                      ? 'bg-white text-stone-900 shadow-xs border border-stone-200'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Cash on Deliv.</span>
                </button>
              </div>

              {/* Gateway-specific forms */}
              {paymentGateway === 'stripe' && (
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
                    <span>Stripe Powered Payment Sheet</span>
                    <span className="text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded font-mono">Test Mode Ready</span>
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg font-mono text-xs"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-600 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg font-mono text-xs"
                        placeholder="MM / YY"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 mb-1">CVC / CVV</label>
                      <input
                        type="text"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg font-mono text-xs"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              )}

              {paymentGateway === 'razorpay' && (
                <div className="p-4 bg-blue-50/50 border border-blue-200/60 rounded-xl space-y-3 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-blue-900 font-medium">
                    <span>Razorpay UPI & NetBanking Gateway</span>
                    <span className="font-mono text-[10px] bg-blue-100 px-1.5 py-0.5 rounded text-blue-800">Direct Settle</span>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Virtual Payment Address (VPA / UPI ID)</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg font-mono text-xs text-stone-800"
                      placeholder="username@okhdfcbank"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="block text-stone-700 font-medium mb-1">Or choose your NetBanking Bank</label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-xs font-medium text-stone-800"
                    >
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>State Bank of India</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra</option>
                    </select>
                  </div>
                </div>
              )}

              {paymentGateway === 'cod' && (
                <div className="p-4 bg-emerald-50/50 border border-emerald-200/60 rounded-xl text-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Pay Cash Upon Delivery</span>
                  </div>
                  <p className="text-emerald-800 text-[11px] leading-relaxed">
                    You can inspect your package upon arrival and pay cash or use the courier QR scanner at your doorstep. No prepayment required.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="md:col-span-5 bg-stone-50 p-5 rounded-xl border border-stone-200 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                Order Summary ({cart.length} items)
              </h4>

              {/* Items mini list */}
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1 mb-4">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center justify-between text-xs py-1.5 border-b border-stone-200/60">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="font-mono text-stone-400 font-semibold text-[11px]">{quantity}x</span>
                      <span className="truncate text-stone-800 font-medium">{product.title}</span>
                    </div>
                    <span className="font-mono font-semibold text-stone-900 shrink-0 tabular-nums">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">${cartSubtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-${(cartSubtotal * appliedDiscount).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-mono tabular-nums">${cartTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono tabular-nums">{cartShipping === 0 ? 'Free' : `$${cartShipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 border-t border-stone-300 pt-2 mt-2">
                  <span>Total Due</span>
                  <span className="font-mono tabular-nums">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="mt-6 pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={handleCompleteOrder}
                disabled={isProcessing || cart.length === 0}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>Authorize & Pay ${cartTotal.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Instant automated invoice generation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

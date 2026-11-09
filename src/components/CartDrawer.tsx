import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  ShieldCheck, 
  Sparkles,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    appliedDiscount,
    couponCode,
    applyCoupon,
    removeCoupon,
    cartTax,
    cartShipping,
    cartTotal,
    openProductDetail
  } = useShop();

  const [inputCode, setInputCode] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(inputCode)) {
      setInputCode('');
    }
  };

  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="text-lg font-bold text-stone-900 font-display">
                Shopping Bag
              </h2>
              <span className="text-xs font-mono font-medium text-stone-500">
                ({cart.reduce((acc, i) => acc + i.quantity, 0)} items)
              </span>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-6 py-3 bg-amber-50/60 border-b border-amber-100 text-xs text-amber-950">
            {remainingForFreeShipping === 0 || couponCode === 'FREESHIP' ? (
              <div className="flex items-center gap-1.5 font-medium text-emerald-800">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>You unlocked <strong>Free Global Express Shipping</strong>!</span>
              </div>
            ) : (
              <div>
                <span>Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more for <strong>Free Shipping</strong></span>
                <div className="w-full bg-amber-200/60 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div 
                    className="bg-amber-600 h-1.5 rounded-full transition-all duration-300" 
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-stone-800">Your bag is empty</h3>
                <p className="text-stone-500 text-xs mt-1 max-w-xs mx-auto">
                  Explore our curated precision gear and artisanal collection to add items.
                </p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="mt-4 px-4 py-2 bg-stone-900 text-white font-semibold text-xs rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div 
                  key={product.id}
                  className="flex gap-4 p-3 bg-stone-50 border border-stone-200 rounded-xl"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      openProductDetail(product.id);
                    }}
                    className="w-18 h-18 rounded-lg object-cover bg-stone-200 cursor-pointer hover:opacity-90 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 
                          onClick={() => {
                            setIsCartDrawerOpen(false);
                            openProductDetail(product.id);
                          }}
                          className="text-xs font-semibold text-stone-900 line-clamp-1 hover:text-amber-600 cursor-pointer"
                        >
                          {product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-stone-400 hover:text-red-600 p-0.5 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400 block mt-0.5">
                        {product.sku}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-mono font-bold text-stone-900 tabular-nums">
                        ${(product.price * quantity).toFixed(2)}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-300 rounded-md bg-white">
                        <button
                          onClick={() => updateCartQuantity(product.id, quantity - 1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-[11px] font-mono font-semibold text-stone-800 tabular-nums">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(product.id, quantity + 1)}
                          disabled={quantity >= product.stock}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100 disabled:opacity-40 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-stone-50 border-t border-stone-200 space-y-4">
              {/* Promo code form */}
              {couponCode ? (
                <div className="flex items-center justify-between bg-amber-100/70 border border-amber-300 text-amber-900 px-3 py-2 rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Tag className="w-3.5 h-3.5 text-amber-700" />
                    <span>Coupon <strong>{couponCode}</strong> applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-amber-800 hover:text-red-700 text-xs font-bold underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Promo code (e.g. SPHERE10)"
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-500 uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200/80 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums font-semibold text-stone-800">${cartSubtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({(appliedDiscount * 100).toFixed(0)}%)</span>
                    <span className="font-mono tabular-nums">-${(cartSubtotal * appliedDiscount).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-mono tabular-nums">${cartTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono tabular-nums">
                    {cartShipping === 0 ? <strong className="text-emerald-700 uppercase text-[11px]">Free</strong> : `$${cartShipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 border-t border-stone-200 pt-2">
                  <span>Total</span>
                  <span className="font-mono tabular-nums text-base">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Bank-grade 256-bit encrypted checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

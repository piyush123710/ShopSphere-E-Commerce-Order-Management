import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Layers,
  ArrowLeft
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface ProductDetailModalProps {
  productId: string | null;
  onClose: () => void;
  onInstantCheckout?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ 
  productId, 
  onClose,
  onInstantCheckout
}) => {
  const { products, addToCart, toggleWishlist, isWishlisted, setIsCartDrawerOpen } = useShop();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'shipping'>('features');

  if (!productId) return null;
  const product = products.find(p => p.id === productId);
  if (!product) return null;

  const isFav = isWishlisted(product.id);
  const isOutOfStock = product.stock <= 0;

  const handleBuyNow = () => {
    addToCart(product, selectedQuantity);
    onClose();
    if (onInstantCheckout) {
      onInstantCheckout();
    } else {
      setIsCartDrawerOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/50">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
            <span>{product.category}</span>
            <span aria-hidden="true">/</span>
            <span>{product.sku}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-Column Split: Gallery Left, Purchase Module Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-8">
          {/* Gallery View Left */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded backdrop-blur-md bg-stone-900/80 text-white font-medium">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-stone-600 text-[11px] text-center">
              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100 flex flex-col items-center">
                <Truck className="w-4 h-4 text-amber-600 mb-1" />
                <span className="font-semibold text-stone-800">Express Courier</span>
                <span className="text-stone-400">2-3 Day Delivery</span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100 flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-amber-600 mb-1" />
                <span className="font-semibold text-stone-800">Warranty</span>
                <span className="text-stone-400">Up to 3 Years</span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100 flex flex-col items-center">
                <RotateCcw className="w-4 h-4 text-amber-600 mb-1" />
                <span className="font-semibold text-stone-800">30-Day Returns</span>
                <span className="text-stone-400">Hassle-Free</span>
              </div>
            </div>
          </div>

          {/* Contiguous Purchase Module Right */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-stone-800">{product.rating}</span>
                  <span>({product.reviewCount} customer reviews)</span>
                </div>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="flex items-center gap-1 text-xs text-stone-600 hover:text-red-600 cursor-pointer p-1"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                  <span>{isFav ? 'Wishlisted' : 'Save'}</span>
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display mt-2">
                {product.title}
              </h2>

              {/* Price Row */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-stone-900 font-mono tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through font-mono tabular-nums">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Detail Tabs */}
              <div className="mt-6">
                <div className="flex border-b border-stone-200 text-xs">
                  <button
                    onClick={() => setActiveTab('features')}
                    className={`py-2 px-3 font-medium transition-colors cursor-pointer ${
                      activeTab === 'features' ? 'border-b-2 border-stone-900 text-stone-900 font-semibold' : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Key Features
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`py-2 px-3 font-medium transition-colors cursor-pointer ${
                      activeTab === 'specs' ? 'border-b-2 border-stone-900 text-stone-900 font-semibold' : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`py-2 px-3 font-medium transition-colors cursor-pointer ${
                      activeTab === 'shipping' ? 'border-b-2 border-stone-900 text-stone-900 font-semibold' : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Shipping & Care
                  </button>
                </div>

                <div className="py-3 text-xs text-stone-600 min-h-[90px]">
                  {activeTab === 'features' && (
                    <ul className="space-y-1.5">
                      {product.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'specs' && (
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div><strong className="text-stone-700">Material:</strong> {product.material || 'Solid Alloy / Composite'}</div>
                      <div><strong className="text-stone-700">Dimensions:</strong> {product.dimensions || 'Standard Studio Dimensions'}</div>
                      <div><strong className="text-stone-700">Weight:</strong> {product.weight || 'Engineered Lightweight'}</div>
                      <div><strong className="text-stone-700">Warranty:</strong> {product.warranty || '2 Years Standard'}</div>
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <p className="leading-relaxed">
                      Orders ship via FedEx Express or DHL within 24 hours of payment verification. Includes comprehensive tracking numbers and tamper-evident packaging. Free worldwide delivery on orders over $150.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Purchase Controls & Quantity */}
            <div className="mt-6 pt-4 border-t border-stone-200">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-medium text-stone-700">Quantity:</span>
                <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                    disabled={isOutOfStock || selectedQuantity <= 1}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 disabled:opacity-40 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-mono font-bold text-stone-800 tabular-nums">
                    {selectedQuantity}
                  </span>
                  <button
                    onClick={() => setSelectedQuantity(Math.min(product.stock, selectedQuantity + 1))}
                    disabled={isOutOfStock || selectedQuantity >= product.stock}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 disabled:opacity-40 cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-stone-500 font-mono">
                  Subtotal: ${(product.price * selectedQuantity).toFixed(2)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    addToCart(product, selectedQuantity);
                    onClose();
                  }}
                  disabled={isOutOfStock}
                  className="py-3 px-4 border border-stone-800 text-stone-900 font-semibold text-xs rounded-lg hover:bg-stone-100 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="py-3 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Checkout Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

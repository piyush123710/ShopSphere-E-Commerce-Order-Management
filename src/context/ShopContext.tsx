import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  User, 
  Order, 
  ProductCategory, 
  DeliveryStatus,
  PaymentGateway,
  ShippingAddress
} from '../types/ecommerce';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, DEMO_USERS } from '../data/mockData';

export type AppView = 
  | 'shop' 
  | 'product-detail' 
  | 'cart' 
  | 'track-orders' 
  | 'admin-inventory' 
  | 'admin-analytics' 
  | 'cloud-architecture';

interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface ShopContextType {
  // Navigation View
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedProductId: string | null;
  openProductDetail: (id: string) => void;
  selectedOrderId: string | null;
  openOrderDetails: (id: string) => void;

  // Auth & Roles
  currentUser: User;
  switchUser: (role: 'customer' | 'admin') => void;
  loginUser: (email: string, role?: 'customer' | 'admin') => void;
  registerUser: (name: string, email: string) => void;
  logoutUser: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Products & Catalog
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'stock';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'stock') => void;
  resetFilters: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  couponCode: string;
  appliedDiscount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  cartSubtotal: number;
  cartTax: number;
  cartShipping: number;
  cartTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Orders & Tracking
  orders: Order[];
  placeOrder: (
    shippingAddress: ShippingAddress, 
    paymentMethod: PaymentGateway,
    paymentDetails: { provider: 'Stripe' | 'Razorpay' | 'Cash on Delivery'; last4?: string; upiId?: string; transactionId?: string; }
  ) => Order;
  updateOrderStatus: (orderId: string, status: DeliveryStatus) => void;
  advanceOrderStep: (orderId: string) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (text: string, type?: 'success' | 'info' | 'warning' | 'error') => void;

  // Invoice Modal
  invoiceOrder: Order | null;
  setInvoiceOrder: (order: Order | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & selection
  const [currentView, setCurrentView] = useState<AppView>('shop');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);

  // User State
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('shopsphere_user');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return DEMO_USERS[0]; // Customer Alice by default
  });

  // Products State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('shopsphere_products');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return INITIAL_PRODUCTS;
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('shopsphere_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return INITIAL_ORDERS;
  });

  // Cart & Wishlist State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('shopsphere_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return [
      { product: INITIAL_PRODUCTS[0], quantity: 1 }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('shopsphere_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return [INITIAL_PRODUCTS[1].id];
  });

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'stock'>('featured');

  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('shopsphere_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('shopsphere_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('shopsphere_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('shopsphere_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shopsphere_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // View Openers
  const openProductDetail = (id: string) => {
    setSelectedProductId(id);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openOrderDetails = (id: string) => {
    setSelectedOrderId(id);
    setCurrentView('track-orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Handlers
  const switchUser = (role: 'customer' | 'admin') => {
    const target = role === 'admin' ? DEMO_USERS[1] : DEMO_USERS[0];
    setCurrentUser(target);
    showToast(`Switched to ${target.name} (${target.role.toUpperCase()})`, 'info');
  };

  const loginUser = (email: string, requestedRole: 'customer' | 'admin' = 'customer') => {
    const found = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      showToast(`Welcome back, ${found.name}!`, 'success');
    } else {
      const newUser: User = {
        id: `usr-${Date.now().toString(36)}`,
        name: email.split('@')[0],
        email,
        role: requestedRole,
        token: `jwt_token_${Date.now()}`,
        address: {
          street: '123 Harbor View St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94107',
          country: 'United States',
          phone: '+1 (415) 555-0100'
        }
      };
      setCurrentUser(newUser);
      showToast(`Logged in as ${newUser.name}`, 'success');
    }
    setIsAuthModalOpen(false);
  };

  const registerUser = (name: string, email: string) => {
    const newUser: User = {
      id: `usr-${Date.now().toString(36)}`,
      name,
      email,
      role: 'customer',
      token: `jwt_token_${Date.now()}`,
      address: {
        street: '450 California St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94104',
        country: 'United States',
        phone: '+1 (415) 555-0122'
      }
    };
    setCurrentUser(newUser);
    showToast(`Welcome to ShopSphere, ${name}! Your account has been registered.`, 'success');
    setIsAuthModalOpen(false);
  };

  const logoutUser = () => {
    setCurrentUser({
      id: 'guest',
      name: 'Guest Customer',
      email: 'guest@shopsphere.io',
      role: 'customer'
    });
    showToast('Signed out successfully.', 'info');
  };

  // Product CRUD
  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now().toString(36)}`
    };
    setProducts(prev => [newProd, ...prev]);
    showToast(`Product "${newProd.title}" added to inventory catalog.`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...updates };
        // recalculate status if stock changed
        if (updates.stock !== undefined) {
          if (updated.stock <= 0) updated.status = 'out_of_stock';
          else if (updated.stock <= (updated.lowStockThreshold || 5)) updated.status = 'low_stock';
          else updated.status = 'in_stock';
        }
        return updated;
      }
      return p;
    }));
    showToast('Product updated successfully.', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog.', 'warning');
  };

  const updateStock = (id: string, newStock: number) => {
    const stockVal = Math.max(0, newStock);
    updateProduct(id, { stock: stockVal });
  };

  // Search & Filters Reset
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange([0, 1000]);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
    showToast('All filters have been reset.', 'info');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    if (product.stock <= 0) {
      showToast(`Sorry, "${product.title}" is out of stock.`, 'warning');
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(product.stock, existing.quantity + quantity);
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: newQty } : item);
      }
      return [...prev, { product, quantity: Math.min(product.stock, quantity) }];
    });

    showToast(`Added ${quantity}x "${product.title}" to bag.`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const product = products.find(p => p.id === productId);
    const maxQty = product ? product.stock : 99;
    const validatedQty = Math.min(maxQty, quantity);

    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: validatedQty } : item));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Coupons
  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SPHERE10') {
      setCouponCode('SPHERE10');
      setAppliedDiscount(0.10); // 10%
      showToast('Promo code applied: 10% discount on order!', 'success');
      return true;
    } else if (clean === 'WELCOME20') {
      setCouponCode('WELCOME20');
      setAppliedDiscount(0.20); // 20%
      showToast('Promo code applied: 20% welcome discount!', 'success');
      return true;
    } else if (clean === 'FREESHIP') {
      setCouponCode('FREESHIP');
      setAppliedDiscount(0.01);
      showToast('Promo code applied: Free Shipping guaranteed!', 'success');
      return true;
    }
    showToast('Invalid coupon code. Try SPHERE10 or WELCOME20', 'error');
    return false;
  };

  const removeCoupon = () => {
    setCouponCode('');
    setAppliedDiscount(0);
    showToast('Coupon removed.', 'info');
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountAmount = cartSubtotal * appliedDiscount;
  const isFreeShipPromo = couponCode === 'FREESHIP';
  const cartShipping = (cartSubtotal > 150 || isFreeShipPromo || cartSubtotal === 0) ? 0 : 15;
  const cartTax = Number(((cartSubtotal - discountAmount) * 0.08).toFixed(2));
  const cartTotal = Number(Math.max(0, cartSubtotal - discountAmount + cartShipping + cartTax).toFixed(2));

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Item removed from wishlist.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Item saved to your wishlist.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Orders
  const placeOrder = (
    shippingAddress: ShippingAddress,
    paymentMethod: PaymentGateway,
    paymentDetails: { provider: 'Stripe' | 'Razorpay' | 'Cash on Delivery'; last4?: string; upiId?: string; transactionId?: string; }
  ): Order => {
    const orderNum = `SPH-${Math.floor(1000 + Math.random() * 9000)}`;
    const invNum = `INV-2026-0${orderNum.split('-')[1]}`;
    const txId = paymentDetails.transactionId || (paymentMethod === 'stripe' ? `ch_3${Math.random().toString(36).substring(2, 16)}` : `pay_rzp_${Math.random().toString(36).substring(2, 14)}`);

    const orderItems = cart.map(item => ({
      productId: item.product.id,
      sku: item.product.sku,
      title: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image
    }));

    // Deduct stock in catalog
    cart.forEach(item => {
      updateStock(item.product.id, item.product.stock - item.quantity);
    });

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' - ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      id: `ord-${Date.now().toString(36)}`,
      orderNumber: orderNum,
      createdAt: now.toISOString(),
      customer: {
        id: currentUser.id,
        name: shippingAddress.fullName,
        email: shippingAddress.email,
        phone: shippingAddress.phone,
        shippingAddress
      },
      items: orderItems,
      subtotal: cartSubtotal,
      discount: discountAmount,
      couponCode: couponCode || undefined,
      shippingFee: cartShipping,
      tax: cartTax,
      total: cartTotal,
      paymentMethod,
      paymentDetails: {
        transactionId: txId,
        provider: paymentDetails.provider,
        last4: paymentDetails.last4,
        upiId: paymentDetails.upiId,
        paidAt: now.toISOString()
      },
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      deliveryStatus: 'placed',
      courier: {
        name: 'FedEx Express Global',
        trackingNumber: `FDX-${Math.floor(10000000 + Math.random() * 90000000)}-US`,
        estimatedDelivery: '3 business days'
      },
      invoiceNumber: invNum,
      timeline: [
        {
          status: 'placed',
          title: 'Order Placed',
          description: `Order successfully placed and verified via ${paymentDetails.provider}.`,
          timestamp: formattedDate,
          completed: true,
          location: 'ShopSphere Seattle Web Checkout'
        },
        {
          status: 'confirmed',
          title: 'Order Confirmed & Stock Allocated',
          description: 'Inventory reserved in Azure SQL DB, picking ticket dispatched.',
          timestamp: 'Scheduled shortly',
          completed: false,
          location: 'Regional Distribution Center'
        },
        {
          status: 'shipped',
          title: 'Package Shipped',
          description: 'Carrier courier pickup with shipping label scanned.',
          timestamp: 'Pending dispatch',
          completed: false,
          location: 'Logistics Facility'
        },
        {
          status: 'out_for_delivery',
          title: 'Out for Delivery',
          description: 'Driver assigned to local delivery route.',
          timestamp: 'Pending arrival',
          completed: false,
          location: 'Destination Station'
        },
        {
          status: 'delivered',
          title: 'Delivered',
          description: 'Delivered to recipient address.',
          timestamp: 'Pending final sign-off',
          completed: false,
          location: `${shippingAddress.city}, ${shippingAddress.state}`
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setSelectedOrderId(newOrder.id);
    setCurrentView('track-orders');
    showToast(`Order ${orderNum} created successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: DeliveryStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        // update delivery status and marked timeline steps
        const statusOrder: DeliveryStatus[] = ['placed', 'confirmed', 'shipped', 'out_for_delivery', 'delivered'];
        const targetIdx = statusOrder.indexOf(status);

        const updatedTimeline = o.timeline.map((step, idx) => ({
          ...step,
          completed: idx <= targetIdx,
          timestamp: idx <= targetIdx ? (step.timestamp.includes('Pending') ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : step.timestamp) : step.timestamp
        }));

        return {
          ...o,
          deliveryStatus: status,
          timeline: updatedTimeline
        };
      }
      return o;
    }));
    showToast(`Order status updated to "${status.replace('_', ' ')}".`, 'info');
  };

  const advanceOrderStep = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const sequence: DeliveryStatus[] = ['placed', 'confirmed', 'shipped', 'out_for_delivery', 'delivered'];
    const currentIdx = sequence.indexOf(order.deliveryStatus);
    if (currentIdx < sequence.length - 1) {
      const nextStatus = sequence[currentIdx + 1];
      updateOrderStatus(orderId, nextStatus);
    } else {
      showToast('Order has already reached final Delivered state.', 'info');
    }
  };

  return (
    <ShopContext.Provider value={{
      currentView,
      setCurrentView,
      selectedProductId,
      openProductDetail,
      selectedOrderId,
      openOrderDetails,
      currentUser,
      switchUser,
      loginUser,
      registerUser,
      logoutUser,
      isAuthModalOpen,
      setIsAuthModalOpen,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      updateStock,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      priceRange,
      setPriceRange,
      minRating,
      setMinRating,
      inStockOnly,
      setInStockOnly,
      sortBy,
      setSortBy,
      resetFilters,
      cart,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      isCartDrawerOpen,
      setIsCartDrawerOpen,
      couponCode,
      appliedDiscount,
      applyCoupon,
      removeCoupon,
      cartSubtotal,
      cartTax,
      cartShipping,
      cartTotal,
      wishlist,
      toggleWishlist,
      isWishlisted,
      orders,
      placeOrder,
      updateOrderStatus,
      advanceOrderStep,
      toasts,
      showToast,
      invoiceOrder,
      setInvoiceOrder
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};

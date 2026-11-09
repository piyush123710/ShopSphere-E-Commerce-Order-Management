export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  token?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
}

export type ProductCategory = 
  | 'All'
  | 'Audio & Acoustics'
  | 'Precision Timepieces'
  | 'Artisanal Leather'
  | 'Workspace & Living'
  | 'Minimalist Optics';

export interface Product {
  id: string;
  sku: string;
  title: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  lowStockThreshold: number;
  description: string;
  image: string;
  features: string[];
  tags: string[];
  isFeatured?: boolean;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  material?: string;
  warranty?: string;
  dimensions?: string;
  weight?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export type PaymentGateway = 'stripe' | 'razorpay' | 'cod';

export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded';

export type DeliveryStatus = 
  | 'placed' 
  | 'confirmed' 
  | 'shipped' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled';

export interface TrackingStep {
  status: DeliveryStatus;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  location?: string;
}

export interface OrderItem {
  productId: string;
  sku: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    shippingAddress: ShippingAddress;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  tax: number;
  total: number;
  paymentMethod: PaymentGateway;
  paymentDetails: {
    transactionId: string;
    provider: 'Stripe' | 'Razorpay' | 'Cash on Delivery';
    last4?: string;
    upiId?: string;
    paidAt?: string;
  };
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatus;
  courier: {
    name: string;
    trackingNumber: string;
    estimatedDelivery: string;
  };
  timeline: TrackingStep[];
  invoiceNumber: string;
}

export interface SalesMetric {
  period: string;
  revenue: number;
  orders: number;
  averageOrderValue: number;
}

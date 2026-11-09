import { Product, User, Order } from '../types/ecommerce';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    sku: 'SPH-AUD-01',
    title: 'Acoustic One Wireless Reference Headphones',
    category: 'Audio & Acoustics',
    price: 349,
    originalPrice: 399,
    rating: 4.9,
    reviewCount: 128,
    stock: 24,
    lowStockThreshold: 5,
    description: 'Custom 40mm bio-cellulose dynamic drivers with hybrid active noise cancellation, lossless LDAC streaming, and machined aluminum acoustic chambers.',
    image: '/src/assets/images/product_audio_headphones_1794225873430.jpg',
    features: [
      'Active Noise Cancellation with ambient transparency mode',
      'Lossless 24-bit / 96kHz Hi-Res wireless streaming',
      'Ultra-soft protein leather ear cushions with memory foam',
      '42-hour continuous battery life with quick charging'
    ],
    tags: ['Best Seller', 'Hi-Res Audio', 'Titanium'],
    isFeatured: true,
    status: 'in_stock',
    material: 'Anodized Aluminum & Lambskin',
    warranty: '2-Year Manufacturer Warranty',
    dimensions: '190 x 175 x 80 mm',
    weight: '278g'
  },
  {
    id: 'prod-002',
    sku: 'SPH-TIM-02',
    title: 'Chrono-Grade Titanium Precision Smartwatch',
    category: 'Precision Timepieces',
    price: 599,
    originalPrice: 650,
    rating: 4.8,
    reviewCount: 94,
    stock: 18,
    lowStockThreshold: 6,
    description: 'Forged Grade 5 aerospace titanium chassis with sapphire crystal glass, continuous optical heart rate sensor, and 100m water resistance.',
    image: '/src/assets/images/product_smartwatch_titanium_1794225874970.jpg',
    features: [
      'Grade 5 aerospace titanium case with micro-blasted satin finish',
      'Double-domed sapphire crystal with anti-reflective coating',
      'Multi-band GNSS tracking & continuous HRV sensor',
      '14-day battery life on a single magnetic inductive charge'
    ],
    tags: ['Luxury Tech', 'Titanium', 'Waterproof'],
    isFeatured: true,
    status: 'in_stock',
    material: 'Grade 5 Titanium & Sapphire',
    warranty: '3-Year Global Protection',
    dimensions: '42mm diameter x 11.2mm depth',
    weight: '58g (without strap)'
  },
  {
    id: 'prod-003',
    sku: 'SPH-LTH-03',
    title: 'Sienna Full-Grain Leather Weekender Bag',
    category: 'Artisanal Leather',
    price: 420,
    originalPrice: 480,
    rating: 4.9,
    reviewCount: 76,
    stock: 9,
    lowStockThreshold: 4,
    description: 'Handcrafted from vegetable-tanned Tuscan full-grain leather, featuring solid brass hardware, YKK Excella zippers, and reinforced base corners.',
    image: '/src/assets/images/product_leather_weekender_1794225876160.jpg',
    features: [
      'Full-grain vegetable-tanned Italian bridle leather',
      'Heavy-gauge solid antiqued brass hardware',
      'Dedicated padded 16-inch laptop compartment',
      'Water-resistant waxed cotton twill lining'
    ],
    tags: ['Handcrafted', 'Italian Leather', 'Limited'],
    isFeatured: true,
    status: 'in_stock',
    material: 'Tuscan Full-Grain Vegetable Leather',
    warranty: 'Lifetime Craftsmanship Guarantee',
    dimensions: '52 x 28 x 25 cm',
    weight: '1.85 kg'
  },
  {
    id: 'prod-004',
    sku: 'SPH-WRK-04',
    title: 'Monolith Solid Walnut Magnetic Desk Mat',
    category: 'Workspace & Living',
    price: 135,
    originalPrice: 160,
    rating: 4.7,
    reviewCount: 62,
    stock: 31,
    lowStockThreshold: 8,
    description: 'Precision milled American walnut accented with premium charcoal felt, embedded magnetic cable docks, and natural oil finish.',
    image: '/src/assets/images/hero_shopsphere_banner_1794225874675.jpg',
    features: [
      'Sustainable Appalachian American Walnut wood trim',
      'High-density virgin wool felt surface for smooth mouse glide',
      'Integrated hidden Neodymium magnetic cable guides',
      'Anti-slip natural cork underlayment'
    ],
    tags: ['Ergonomics', 'Walnut Wood'],
    isFeatured: false,
    status: 'in_stock',
    material: 'Solid American Walnut & Merino Wool',
    warranty: '5-Year Craft Warranty',
    dimensions: '900 x 420 x 4 mm',
    weight: '620g'
  },
  {
    id: 'prod-005',
    sku: 'SPH-AUD-05',
    title: 'Sphere Studio Audiophile Desktop Amplifier',
    category: 'Audio & Acoustics',
    price: 680,
    originalPrice: 750,
    rating: 5.0,
    reviewCount: 41,
    stock: 3,
    lowStockThreshold: 5,
    description: 'Class-A discrete balanced headphone amplifier and dual ES9038PRO DAC with ultra-low THD+N distortion and analog stepped attenuator volume.',
    image: '/src/assets/images/hero_shopsphere_banner_1794225874675.jpg',
    features: [
      'Dual ESS Sabre ES9038PRO DAC architecture',
      'Fully balanced Class-A discrete output stage',
      'Solid aluminum CNC unibody casing with heatsink fins',
      'Supports DSD512 and PCM 32-bit / 768kHz decoding'
    ],
    tags: ['Audiophile', 'Low Stock'],
    isFeatured: true,
    status: 'low_stock',
    material: 'Solid Aircraft-Grade Aluminum 6061',
    warranty: '3-Year Studio Warranty',
    dimensions: '220 x 200 x 65 mm',
    weight: '3.1 kg'
  },
  {
    id: 'prod-006',
    sku: 'SPH-OPT-06',
    title: 'Nordic Mineral Glass Desk Vessel & Lamp',
    category: 'Workspace & Living',
    price: 195,
    originalPrice: 220,
    rating: 4.6,
    reviewCount: 38,
    stock: 14,
    lowStockThreshold: 5,
    description: 'Mouth-blown borosilicate smoked glass ambient luminaire with touch-capacitive warm dimming and hand-turned solid brass fixture.',
    image: '/src/assets/images/hero_shopsphere_banner_1794225874675.jpg',
    features: [
      'Mouth-blown smoky borosilicate glass',
      'Full spectrum CRI 97+ warm LED emitter (2200K–3000K)',
      'Touch-sensitive stepless dimmer switch',
      'Braided cloth silicone power cable with brass plug'
    ],
    tags: ['Lighting', 'Hand Blown'],
    isFeatured: false,
    status: 'in_stock',
    material: 'Borosilicate Glass & Brass',
    warranty: '2-Year Lighting Warranty',
    dimensions: '180mm diameter x 240mm height',
    weight: '1.4 kg'
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'usr-customer-01',
    name: 'Alice Smith',
    email: 'alice.smith@example.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    token: 'jwt_mock_token_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.customer.alice',
    address: {
      street: '742 Evergreen Terrace',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'United States',
      phone: '+1 (206) 555-0199'
    }
  },
  {
    id: 'usr-admin-01',
    name: 'Marc Vance (Admin)',
    email: 'admin.marc@shopsphere.io',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    token: 'jwt_mock_token_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.admin.marcvance',
    address: {
      street: '100 Azure Commerce Way, Suite 400',
      city: 'Redmond',
      state: 'WA',
      zipCode: '98052',
      country: 'United States',
      phone: '+1 (425) 555-8900'
    }
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8942',
    orderNumber: 'SPH-8942',
    createdAt: '2026-11-08T14:32:00Z',
    customer: {
      id: 'usr-customer-01',
      name: 'Alice Smith',
      email: 'alice.smith@example.com',
      phone: '+1 (206) 555-0199',
      shippingAddress: {
        fullName: 'Alice Smith',
        email: 'alice.smith@example.com',
        phone: '+1 (206) 555-0199',
        street: '742 Evergreen Terrace',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        country: 'United States'
      }
    },
    items: [
      {
        productId: 'prod-001',
        sku: 'SPH-AUD-01',
        title: 'Acoustic One Wireless Reference Headphones',
        price: 349,
        quantity: 1,
        image: '/src/assets/images/product_audio_headphones_1794225873430.jpg'
      },
      {
        productId: 'prod-004',
        sku: 'SPH-WRK-04',
        title: 'Monolith Solid Walnut Magnetic Desk Mat',
        price: 135,
        quantity: 1,
        image: '/src/assets/images/hero_shopsphere_banner_1794225874675.jpg'
      }
    ],
    subtotal: 484,
    discount: 48.4,
    couponCode: 'SPHERE10',
    shippingFee: 0,
    tax: 39.20,
    total: 474.80,
    paymentMethod: 'stripe',
    paymentDetails: {
      transactionId: 'ch_3Nkd89Fkd819a2Xk0',
      provider: 'Stripe',
      last4: '4242',
      paidAt: '2026-11-08T14:34:10Z'
    },
    paymentStatus: 'paid',
    deliveryStatus: 'out_for_delivery',
    courier: {
      name: 'FedEx Express Worldwide',
      trackingNumber: 'FDX-994827103-US',
      estimatedDelivery: 'Today by 5:00 PM'
    },
    invoiceNumber: 'INV-2026-08942',
    timeline: [
      {
        status: 'placed',
        title: 'Order Placed',
        description: 'Customer order placed and payment authenticated via Stripe Webhook.',
        timestamp: 'Nov 8, 2026 - 02:32 PM',
        completed: true,
        location: 'ShopSphere Seattle Gateway'
      },
      {
        status: 'confirmed',
        title: 'Order Confirmed & Stock Allocated',
        description: 'Warehouse automated picking list generated in Azure SQL inventory.',
        timestamp: 'Nov 8, 2026 - 03:05 PM',
        completed: true,
        location: 'Pacific Northwest Fulfillment Center'
      },
      {
        status: 'shipped',
        title: 'Package Shipped',
        description: 'Handed over to carrier courier. Tracking barcoded and scanned into transit hub.',
        timestamp: 'Nov 9, 2026 - 04:15 AM',
        completed: true,
        location: 'Seattle Hub, WA'
      },
      {
        status: 'out_for_delivery',
        title: 'Out for Delivery',
        description: 'Carrier courier loaded package onto local route van for delivery to customer address.',
        timestamp: 'Nov 9, 2026 - 08:30 AM',
        completed: true,
        location: 'Seattle Downtown Delivery Station'
      },
      {
        status: 'delivered',
        title: 'Delivered',
        description: 'Package handed to recipient or placed at secure doorstep with digital signature.',
        timestamp: 'Pending delivery completion',
        completed: false,
        location: 'Customer Address'
      }
    ]
  },
  {
    id: 'ord-8910',
    orderNumber: 'SPH-8910',
    createdAt: '2026-11-06T10:15:00Z',
    customer: {
      id: 'usr-customer-02',
      name: 'Devon Miller',
      email: 'devon.miller@example.org',
      phone: '+1 (415) 555-0144',
      shippingAddress: {
        fullName: 'Devon Miller',
        email: 'devon.miller@example.org',
        phone: '+1 (415) 555-0144',
        street: '450 Mission Street, Apt 12B',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
        country: 'United States'
      }
    },
    items: [
      {
        productId: 'prod-002',
        sku: 'SPH-TIM-02',
        title: 'Chrono-Grade Titanium Precision Smartwatch',
        price: 599,
        quantity: 1,
        image: '/src/assets/images/product_smartwatch_titanium_1794225874970.jpg'
      }
    ],
    subtotal: 599,
    discount: 0,
    shippingFee: 0,
    tax: 53.91,
    total: 652.91,
    paymentMethod: 'razorpay',
    paymentDetails: {
      transactionId: 'pay_Rzp98218140KlP',
      provider: 'Razorpay',
      upiId: 'devon@oksbi',
      paidAt: '2026-11-06T10:17:22Z'
    },
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    courier: {
      name: 'DHL Express',
      trackingNumber: 'DHL-88192048-CA',
      estimatedDelivery: 'Nov 8, 2026'
    },
    invoiceNumber: 'INV-2026-08910',
    timeline: [
      {
        status: 'placed',
        title: 'Order Placed',
        description: 'Payment verified via Razorpay UPI instant settle.',
        timestamp: 'Nov 6, 2026 - 10:15 AM',
        completed: true,
        location: 'Online Checkout'
      },
      {
        status: 'confirmed',
        title: 'Order Confirmed',
        description: 'Item packaged in protective security box with tamper-evident seal.',
        timestamp: 'Nov 6, 2026 - 11:20 AM',
        completed: true,
        location: 'Bay Area Fulfillment Hub'
      },
      {
        status: 'shipped',
        title: 'Shipped',
        description: 'Sorted at regional sorting facility.',
        timestamp: 'Nov 7, 2026 - 02:45 AM',
        completed: true,
        location: 'South San Francisco Facility'
      },
      {
        status: 'out_for_delivery',
        title: 'Out for Delivery',
        description: 'With local courier on route.',
        timestamp: 'Nov 8, 2026 - 09:12 AM',
        completed: true,
        location: 'Mission District Depot'
      },
      {
        status: 'delivered',
        title: 'Delivered',
        description: 'Signed by D. Miller at front desk concierge.',
        timestamp: 'Nov 8, 2026 - 01:45 PM',
        completed: true,
        location: 'Delivered to San Francisco, CA'
      }
    ]
  },
  {
    id: 'ord-8875',
    orderNumber: 'SPH-8875',
    createdAt: '2026-11-04T18:40:00Z',
    customer: {
      id: 'usr-customer-03',
      name: 'Elena Rostova',
      email: 'elena.rostova@designcorp.io',
      phone: '+1 (312) 555-8912',
      shippingAddress: {
        fullName: 'Elena Rostova',
        email: 'elena.rostova@designcorp.io',
        phone: '+1 (312) 555-8912',
        street: '820 N Michigan Ave',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60611',
        country: 'United States'
      }
    },
    items: [
      {
        productId: 'prod-003',
        sku: 'SPH-LTH-03',
        title: 'Sienna Full-Grain Leather Weekender Bag',
        price: 420,
        quantity: 1,
        image: '/src/assets/images/product_leather_weekender_1794225876160.jpg'
      }
    ],
    subtotal: 420,
    discount: 42,
    couponCode: 'WELCOME20',
    shippingFee: 0,
    tax: 37.80,
    total: 415.80,
    paymentMethod: 'stripe',
    paymentDetails: {
      transactionId: 'ch_3Nz901Klw881023a',
      provider: 'Stripe',
      last4: '5556',
      paidAt: '2026-11-04T18:42:01Z'
    },
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    courier: {
      name: 'FedEx Priority',
      trackingNumber: 'FDX-77192834-IL',
      estimatedDelivery: 'Nov 6, 2026'
    },
    invoiceNumber: 'INV-2026-08875',
    timeline: [
      {
        status: 'placed',
        title: 'Order Placed',
        description: 'Order placed with promo code WELCOME20.',
        timestamp: 'Nov 4, 2026 - 06:40 PM',
        completed: true
      },
      {
        status: 'confirmed',
        title: 'Order Confirmed',
        description: 'Tuscan leather bag inspected and boxed.',
        timestamp: 'Nov 4, 2026 - 07:15 PM',
        completed: true
      },
      {
        status: 'shipped',
        title: 'In Transit',
        description: 'Departed sorting depot via air freight.',
        timestamp: 'Nov 5, 2026 - 05:00 AM',
        completed: true
      },
      {
        status: 'out_for_delivery',
        title: 'Out for Delivery',
        description: 'Local driver assigned.',
        timestamp: 'Nov 6, 2026 - 08:15 AM',
        completed: true
      },
      {
        status: 'delivered',
        title: 'Delivered',
        description: 'Delivered to recipient address with signature.',
        timestamp: 'Nov 6, 2026 - 02:20 PM',
        completed: true
      }
    ]
  }
];

export const SALES_METRICS = [
  { period: 'Mon', revenue: 6420, orders: 18, averageOrderValue: 356 },
  { period: 'Tue', revenue: 8950, orders: 24, averageOrderValue: 372 },
  { period: 'Wed', revenue: 7300, orders: 21, averageOrderValue: 347 },
  { period: 'Thu', revenue: 11200, orders: 32, averageOrderValue: 350 },
  { period: 'Fri', revenue: 14650, orders: 39, averageOrderValue: 375 },
  { period: 'Sat', revenue: 18400, orders: 48, averageOrderValue: 383 },
  { period: 'Sun', revenue: 16800, orders: 44, averageOrderValue: 381 }
];

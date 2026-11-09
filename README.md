# ShopSphere – E-Commerce & Order Management Platform

ShopSphere is an enterprise-grade e-commerce storefront and order fulfillment platform engineered with a high-performance frontend, an **ASP.NET Core Web API (.NET 8)** backend architecture, **Microsoft SQL Server** with **Entity Framework Core**, **Microsoft Azure** cloud deployment, and **Stripe & Razorpay** payment gateway integrations.

---

## 🚀 Key Features

### 1. User Registration & JWT Authentication
- **Role-Based Access Control (RBAC)**: Support for `Customer` and `Admin` roles.
- **JWT Authentication**: Token generation and claims extraction (`sub`, `email`, `role`, `iss`, `exp`) compliant with ASP.NET Core `ClaimsPrincipal`.
- **1-Click Demo Accounts**:
  - **Customer**: Alice Smith (`alice.smith@example.com`)
  - **Admin**: Marc Vance (`admin.marc@shopsphere.io`)
- **Profile & Address Book**: Stored shipping addresses with instant checkout autofill.

### 2. Product Catalog, Search & Filtering
- **Curated Collections**: Categories include *Audio & Acoustics*, *Precision Timepieces*, *Artisanal Leather*, and *Workspace & Living*.
- **Search Engine**: Instant query filtering across title, description, SKU, and metadata tags.
- **Parametric Filters**: Price range slider, in-stock availability toggle, and minimum rating filter.
- **Sorting Options**: Featured first, Price (Low to High), Price (High to Low), Highest Rated, and Stock level.

### 3. Shopping Bag & Wishlist
- **Persistent Cart State**: Slide-over drawer with itemized summary and quantity adjustments.
- **Promotional Engine**: Live promo code validator:
  - `SPHERE10`: 10% discount on entire order.
  - `WELCOME20`: 20% discount for first-time orders.
  - `FREESHIP`: Guaranteed free express delivery.
- **Tax & Shipping Calculation**: Automated 8% sales tax computation and free delivery threshold indicator ($150+).
- **Wishlist Management**: One-click product bookmarking with badge counters.

### 4. Checkout & Payment Gateway Integration
- **Stripe**: Simulated card checkout with automatic format masking, CVV validation, and test cards.
- **Razorpay**: Virtual Payment Address (UPI ID / QR) and NetBanking for leading banks.
- **Cash on Delivery (COD)**: Doorstep verification guarantee.
- **Atomic Stock Reservation**: Prevents checkout race conditions by deducting stock upon order verification.

### 5. Order Tracking & Tax Invoice Generation
- **5-Milestone Tracking Progress**:
  1. `Placed` (Order placed & payment verified)
  2. `Confirmed` (Allocated in warehouse & picklist created)
  3. `Shipped` (In transit with carrier)
  4. `Out for Delivery` (With local delivery courier)
  5. `Delivered` (Signed & completed)
- **Interactive Simulation**: Advance tracking milestone in real time to test courier step progressions.
- **Waybill Details**: Carrier tracking numbers (FedEx / DHL Express) and destination coordinates.
- **Printable Tax Invoices**: Formatted invoice document with company credentials, tax ID, line items, and browser print (`window.print()`) stylesheet.

### 6. Admin Inventory & Catalog Management
- **Inventory KPIs**: Total Catalog SKUs, Low Stock Warnings, Out of Stock alerts, and Total Inventory Valuation.
- **Inline Stock Adjustment**: Quick `+` and `-` steppers for real-time inventory adjustments.
- **Product CRUD**: Add new products with SKU generator, category tagging, low-stock thresholds, and image selection. Edit or archive existing catalog items.

### 7. Sales Analytics Dashboard
- **Executive Metrics**: Gross Sales, Total Orders, Average Order Value (AOV), and Store Conversion Rate.
- **Interactive Revenue Chart**: Responsive daily revenue bar chart with hover tooltips and 7-day revenue aggregation.
- **Category Share Breakdown**: Distribution of sales across product verticals.
- **Fulfillment Management Pipeline**: Status updater to transition customer orders (*Confirmed*, *Shipped*, *Out for Delivery*, *Delivered*).

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons, Vite |
| **Backend API** | ASP.NET Core Web API (.NET 8 LTS), C#, RESTful Architecture |
| **Database** | Microsoft SQL Server 2022 / Azure SQL Database |
| **ORM** | Entity Framework Core 8 (Code-First Migrations, LINQ) |
| **Cloud Hosting** | Microsoft Azure (App Service, Azure SQL, Blob Storage, Key Vault) |
| **Payment Gateways** | Stripe Elements & Razorpay Checkout / Webhooks |
| **Authentication** | JSON Web Tokens (JWT) with HMAC-SHA256 signature |

---

## 🏛️ System Architecture

```text
┌────────────────────────────────────────────────────────┐
│               ShopSphere Client Application            │
│         (TypeScript / Tailwind v4 / React 19)          │
└───────────────────────────┬────────────────────────────┘
                            │ HTTPS / REST + Bearer JWT
                            ▼
┌────────────────────────────────────────────────────────┐
│         ASP.NET Core Web API (.NET 8 LTS)              │
│  ├── AuthController          ├── ProductsController    │
│  ├── OrdersController        ├── PaymentsController    │
│  └── AdminInventoryController                          │
└───────────────┬──────────────────────────┬─────────────┘
                │ EF Core 8                │ HTTPS Webhooks
                ▼                          ▼
┌─────────────────────────────┐ ┌────────────────────────┐
│  Microsoft SQL Server       │ │  Payment Gateways      │
│  (Azure SQL Database)       │ │  ├── Stripe Elements   │
│  ├── Products Table         │ │  └── Razorpay UPI      │
│  ├── Orders & OrderItems    │ └────────────────────────┘
│  └── Users & Roles          │
└─────────────────────────────┘
```

---

## 📡 API Endpoints Reference

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create new customer account and return JWT.
- `POST /api/auth/login` - Authenticate with email/password and issue Bearer JWT token.
- `GET /api/auth/profile` - Retrieve current user profile and default shipping address.

### Products (`/api/products`)
- `GET /api/products` - List products with optional `category`, `search`, `minPrice`, `maxPrice`, and `sortBy` query parameters.
- `GET /api/products/{id}` - Retrieve detailed product specifications and stock availability.
- `POST /api/admin/products` - `[Authorize(Roles = "Admin")]` Create a new product.
- `PUT /api/admin/products/{id}` - `[Authorize(Roles = "Admin")]` Update product details or stock level.
- `DELETE /api/admin/products/{id}` - `[Authorize(Roles = "Admin")]` Delete product from catalog.

### Orders & Tracking (`/api/orders`)
- `POST /api/orders/checkout` - Verify payment intent, decrement inventory, and generate order.
- `GET /api/orders/{id}` - Retrieve order details and items.
- `GET /api/orders/{id}/tracking` - Fetch live milestone timeline steps and courier tracking number.
- `PUT /api/admin/orders/{id}/status` - `[Authorize(Roles = "Admin")]` Update order fulfillment status.

### Payments (`/api/payments`)
- `POST /api/payments/stripe/create-intent` - Create Stripe PaymentIntent client secret.
- `POST /api/payments/razorpay/create-order` - Create Razorpay order ID.
- `POST /api/payments/webhook` - Asynchronous webhook listener confirming payment settlement.

---

## 💾 Database Schema (Entity Framework Core)

```csharp
public class Product
{
    public Guid Id { get; set; }
    public string Sku { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public int LowStockThreshold { get; set; } = 5;
    public string Description { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    [Timestamp]
    public byte[] RowVersion { get; set; } = null!;
}

public class Order
{
    public Guid Id { get; set; }
    public string OrderNumber { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Guid CustomerId { get; set; }
    public decimal Subtotal { get; set; }
    public decimal Discount { get; set; }
    public decimal Tax { get; set; }
    public decimal ShippingFee { get; set; }
    public decimal Total { get; set; }
    public string PaymentProvider { get; set; } = string.Empty;
    public string PaymentStatus { get; set; } = "Paid";
    public string DeliveryStatus { get; set; } = "Placed";
    public List<OrderItem> Items { get; set; } = new();
}
```

---

## ⚡ Getting Started & Local Development

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation
1. Clone the repository or navigate to the workspace directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`.

### Build for Production
To create an optimized production build:
```bash
npm run build
```

---

## ☁️ Azure Cloud Deployment Guide

1. **Azure App Service**:
   - Runtime: `.NET 8 (LTS)` on Linux
   - Configure App Settings with `JWT_SECRET`, `STRIPE_SECRET_KEY`, and `RAZORPAY_KEY_SECRET`.
2. **Azure SQL Database**:
   - Deploy via Azure portal or Azure CLI:
     ```bash
     az sql db create --resource-group ShopSphereRG --server shopsphere-sql --name ShopSphereDb --edition GeneralPurpose
     ```
   - Run EF Core migrations on startup:
     ```bash
     dotnet ef database update
     ```
3. **Azure Blob Storage**:
   - Container: `product-assets`
   - Enable CDN endpoint for cached image delivery.

---

## 📄 License
This project is licensed under the Apache-2.0 License.

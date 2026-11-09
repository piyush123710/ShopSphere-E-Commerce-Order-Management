import React, { useState } from 'react';
import { 
  Cloud, 
  Database, 
  Server, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  Code2, 
  CreditCard, 
  Terminal, 
  ExternalLink,
  Layers,
  Activity,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CloudArchitectureModal: React.FC = () => {
  const { setCurrentView } = useShop();
  const [activeTab, setActiveTab] = useState<'architecture' | 'api' | 'azure' | 'db'>('architecture');
  const [testApiEndpoint, setTestApiEndpoint] = useState('/api/orders/track');
  const [testResult, setTestResult] = useState<string | null>(null);

  const simulateApiCall = (endpoint: string) => {
    setTestApiEndpoint(endpoint);
    setTestResult('Calling ASP.NET Core Web API (.NET 8) endpoint...');
    setTimeout(() => {
      if (endpoint === '/api/products') {
        setTestResult(JSON.stringify({
          statusCode: 200,
          status: 'success',
          server: 'Kestrel / .NET 8.0 LTS (Azure App Service)',
          dbLatency: '1.2ms (Azure SQL Server)',
          count: 6,
          data: [{ id: 'prod-001', sku: 'SPH-AUD-01', title: 'Acoustic One Wireless Reference Headphones', price: 349.00 }]
        }, null, 2));
      } else if (endpoint === '/api/payments/verify') {
        setTestResult(JSON.stringify({
          statusCode: 200,
          paymentGateway: 'Stripe Elements / Razorpay Webhook',
          paymentStatus: 'COMPLETED',
          transactionHash: 'tx_stripe_99248102a9b',
          invoiceGenerated: 'INV-2026-08942'
        }, null, 2));
      } else {
        setTestResult(JSON.stringify({
          statusCode: 200,
          orderNumber: 'SPH-8942',
          fulfillmentStatus: 'OUT_FOR_DELIVERY',
          courier: 'FedEx Express Worldwide',
          trackingSteps: 5,
          azureAppInsightsTraceId: '00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01'
        }, null, 2));
      }
    }, 450);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mb-1">
            <span>Engineering Architecture</span>
            <span aria-hidden="true">/</span>
            <span>ASP.NET Core Web API & Azure Cloud</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
            Backend, Database & Azure Deployment
          </h2>
        </div>

        <button
          onClick={() => setCurrentView('shop')}
          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
        >
          Return to Storefront
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 mt-6 text-xs font-medium">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'architecture' ? 'border-amber-500 text-stone-900 font-bold' : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-600" />
          <span>System Topology</span>
        </button>

        <button
          onClick={() => setActiveTab('api')}
          className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'api' ? 'border-amber-500 text-stone-900 font-bold' : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Code2 className="w-4 h-4 text-amber-600" />
          <span>ASP.NET Core Web API (.NET 8)</span>
        </button>

        <button
          onClick={() => setActiveTab('db')}
          className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'db' ? 'border-amber-500 text-stone-900 font-bold' : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Database className="w-4 h-4 text-amber-600" />
          <span>SQL Server & EF Core</span>
        </button>

        <button
          onClick={() => setActiveTab('azure')}
          className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'azure' ? 'border-amber-500 text-stone-900 font-bold' : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Cloud className="w-4 h-4 text-amber-600" />
          <span>Azure Cloud Services</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === 'architecture' && (
          <div className="space-y-8">
            {/* High-level system diagram */}
            <div className="bg-stone-900 text-stone-100 p-8 rounded-2xl border border-stone-800 shadow-lg">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Production Infrastructure</span>
                  <h3 className="text-lg font-bold text-white mt-0.5">ShopSphere Multi-Tier Distributed Architecture</h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Azure Region: East US 2 (Active)</span>
                </div>
              </div>

              {/* Architecture Tier Flow */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
                {/* Client Tier */}
                <div className="p-4 bg-stone-800/90 rounded-xl border border-stone-700 space-y-2">
                  <span className="text-amber-400 font-bold block">1. Presentation Tier</span>
                  <div className="text-stone-300 font-sans text-xs">
                    <strong className="text-white">Responsive Client SPA</strong>
                    <p className="text-stone-400 text-[11px] mt-1">TypeScript · Tailwind v4 · High-res assets · JWT Auth Handlers</p>
                  </div>
                  <div className="pt-2 border-t border-stone-700 text-[10px] text-stone-400">
                    Hosted on Azure Static Web Apps / CDN
                  </div>
                </div>

                {/* API Gateway Tier */}
                <div className="p-4 bg-stone-800/90 rounded-xl border border-stone-700 space-y-2">
                  <span className="text-amber-400 font-bold block">2. Web API Tier</span>
                  <div className="text-stone-300 font-sans text-xs">
                    <strong className="text-white">ASP.NET Core (.NET 8)</strong>
                    <p className="text-stone-400 text-[11px] mt-1">REST Controllers · JWT Bearer Middleware · Swagger UI · HealthChecks</p>
                  </div>
                  <div className="pt-2 border-t border-stone-700 text-[10px] text-stone-400">
                    Azure App Service (Linux B2)
                  </div>
                </div>

                {/* Data Tier */}
                <div className="p-4 bg-stone-800/90 rounded-xl border border-stone-700 space-y-2">
                  <span className="text-amber-400 font-bold block">3. Data Persistence</span>
                  <div className="text-stone-300 font-sans text-xs">
                    <strong className="text-white">Microsoft SQL Server</strong>
                    <p className="text-stone-400 text-[11px] mt-1">Entity Framework Core 8 · Migrations · ACID Transaction Isolation</p>
                  </div>
                  <div className="pt-2 border-t border-stone-700 text-[10px] text-stone-400">
                    Azure SQL Database (Serverless Elastic)
                  </div>
                </div>

                {/* Integrations Tier */}
                <div className="p-4 bg-stone-800/90 rounded-xl border border-stone-700 space-y-2">
                  <span className="text-amber-400 font-bold block">4. Payments & Assets</span>
                  <div className="text-stone-300 font-sans text-xs">
                    <strong className="text-white">Stripe & Razorpay</strong>
                    <p className="text-stone-400 text-[11px] mt-1">Payment Intent Webhooks · Azure Blob Storage CDN · App Insights</p>
                  </div>
                  <div className="pt-2 border-t border-stone-700 text-[10px] text-stone-400">
                    Zero-trust Token Authentication
                  </div>
                </div>
              </div>
            </div>

            {/* Live Controller Prober */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="text-base font-bold text-stone-900 font-display mb-2">
                Live REST API Controller Tester (.NET 8)
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Execute simulated requests to the ASP.NET Core controllers and inspect response telemetry.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => simulateApiCall('/api/products')}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-mono font-medium rounded-lg border border-stone-300 cursor-pointer"
                >
                  GET /api/products
                </button>
                <button
                  onClick={() => simulateApiCall('/api/payments/verify')}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-mono font-medium rounded-lg border border-stone-300 cursor-pointer"
                >
                  POST /api/payments/verify
                </button>
                <button
                  onClick={() => simulateApiCall('/api/orders/track')}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-mono font-medium rounded-lg border border-stone-300 cursor-pointer"
                >
                  GET /api/orders/SPH-8942/track
                </button>
              </div>

              {testResult && (
                <div className="p-4 bg-stone-900 text-amber-300 rounded-xl font-mono text-xs overflow-x-auto">
                  <span className="text-stone-400 block mb-1">HTTP 200 OK · {testApiEndpoint}</span>
                  <pre>{testResult}</pre>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-stone-900 font-display">
              ASP.NET Core Web API (.NET 8) Endpoints Specification
            </h3>

            <div className="space-y-4 text-xs font-mono">
              {/* Product Controller */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-[10px] font-bold">GET</span>
                  <span className="font-bold text-stone-900">/api/products</span>
                  <span className="text-stone-500 font-sans text-[11px]">Fetch catalog with search, category filters, and price ranges</span>
                </div>
                <div className="text-stone-600 text-[11px] font-sans">
                  Controller: <code className="font-mono text-stone-800">ProductsController.cs</code> · Returns <code className="font-mono">IEnumerable&lt;ProductDto&gt;</code> with EF Core caching.
                </div>
              </div>

              {/* Auth Controller */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold">POST</span>
                  <span className="font-bold text-stone-900">/api/auth/login</span>
                  <span className="text-stone-500 font-sans text-[11px]">JWT Bearer authentication with Role claim ('Customer' / 'Admin')</span>
                </div>
                <div className="text-stone-600 text-[11px] font-sans">
                  Controller: <code className="font-mono text-stone-800">AuthController.cs</code> · Issues HMAC-SHA256 signed JWT tokens valid for 24 hours.
                </div>
              </div>

              {/* Orders Controller */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold">POST</span>
                  <span className="font-bold text-stone-900">/api/orders/checkout</span>
                  <span className="text-stone-500 font-sans text-[11px]">Processes cart order, validates stock, and confirms payment</span>
                </div>
                <div className="text-stone-600 text-[11px] font-sans">
                  Controller: <code className="font-mono text-stone-800">OrdersController.cs</code> · Deducts inventory in a single atomic SQL transaction.
                </div>
              </div>

              {/* Order Tracking */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-[10px] font-bold">GET</span>
                  <span className="font-bold text-stone-900">/api/orders/{'{id}'}/tracking</span>
                  <span className="text-stone-500 font-sans text-[11px]">Live order tracking milestone steps and courier tracking</span>
                </div>
                <div className="text-stone-600 text-[11px] font-sans">
                  Controller: <code className="font-mono text-stone-800">TrackingController.cs</code> · Real-time courier webhook state synchronization.
                </div>
              </div>

              {/* Admin Inventory */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-amber-600 text-white rounded text-[10px] font-bold">PUT</span>
                  <span className="font-bold text-stone-900">/api/admin/products/{'{id}'}/stock</span>
                  <span className="text-stone-500 font-sans text-[11px]">Authorize(Roles = "Admin") · Updates product inventory stock</span>
                </div>
                <div className="text-stone-600 text-[11px] font-sans">
                  Controller: <code className="font-mono text-stone-800">AdminInventoryController.cs</code> · Triggers low-stock alerts if stock &le; threshold.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'db' && (
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-stone-900 font-display">
              Microsoft SQL Server & Entity Framework Core (EF Core 8)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-5 bg-stone-900 text-stone-100 rounded-xl font-mono text-[11px] overflow-x-auto">
                <span className="text-amber-400 block mb-2">// ShopSphereDbContext.cs</span>
                <pre>{`public class ShopSphereDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<TrackingMilestone> Milestones { get; set; }

    protected override void OnModelCreating(ModelBuilder mb)
    {
        mb.Entity<Product>()
          .HasIndex(p => p.Sku).IsUnique();
        mb.Entity<Order>()
          .HasIndex(o => o.OrderNumber).IsUnique();
    }
}`}</pre>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-stone-200 rounded-xl bg-stone-50">
                  <h4 className="font-bold text-stone-900 mb-1">High Availability & Scale</h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    Azure SQL Database with active geo-replication, automated backups, and 99.995% uptime SLA guarantee for enterprise transactions.
                  </p>
                </div>

                <div className="p-4 border border-stone-200 rounded-xl bg-stone-50">
                  <h4 className="font-bold text-stone-900 mb-1">Concurrency & Stock Locking</h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    Uses optimistic concurrency control (`[Timestamp] RowVersion`) to prevent race conditions during high-volume flash checkout.
                  </p>
                </div>

                <div className="p-4 border border-stone-200 rounded-xl bg-stone-50">
                  <h4 className="font-bold text-stone-900 mb-1">Automated Migrations</h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    EF Core code-first migrations executed safely via Azure DevOps CI/CD release pipeline before Web App blue-green deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'azure' && (
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-stone-900 font-display">
              Microsoft Azure Production Infrastructure
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-4 border border-stone-200 rounded-xl bg-stone-50/70">
                <div className="flex items-center gap-2 text-stone-900 font-bold mb-1">
                  <Cloud className="w-4 h-4 text-sky-600" />
                  <span>Azure App Service</span>
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  Linux .NET 8 runtime hosting ASP.NET Core Web API with automated SSL certificates, auto-scaling up to 10 instances.
                </p>
              </div>

              <div className="p-4 border border-stone-200 rounded-xl bg-stone-50/70">
                <div className="flex items-center gap-2 text-stone-900 font-bold mb-1">
                  <Database className="w-4 h-4 text-sky-600" />
                  <span>Azure SQL Database</span>
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  Fully managed SQL Server with Hyperscale storage, automatic performance indexing, and threat detection.
                </p>
              </div>

              <div className="p-4 border border-stone-200 rounded-xl bg-stone-50/70">
                <div className="flex items-center gap-2 text-stone-900 font-bold mb-1">
                  <Server className="w-4 h-4 text-sky-600" />
                  <span>Azure Blob Storage</span>
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  Global CDN distribution for studio product photography with automatic WebP conversion and geo-redundant storage.
                </p>
              </div>

              <div className="p-4 border border-stone-200 rounded-xl bg-stone-50/70">
                <div className="flex items-center gap-2 text-stone-900 font-bold mb-1">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  <span>Azure Key Vault</span>
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  Hardware security module protecting Stripe secrets, Razorpay keys, and JWT HMAC encryption keys.
                </p>
              </div>

              <div className="p-4 border border-stone-200 rounded-xl bg-stone-50/70">
                <div className="flex items-center gap-2 text-stone-900 font-bold mb-1">
                  <Activity className="w-4 h-4 text-sky-600" />
                  <span>Application Insights</span>
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  Real-time APM telemetry, end-to-end distributed tracing across controllers, and live metrics anomaly detection.
                </p>
              </div>

              <div className="p-4 border border-stone-200 rounded-xl bg-stone-50/70">
                <div className="flex items-center gap-2 text-stone-900 font-bold mb-1">
                  <CreditCard className="w-4 h-4 text-sky-600" />
                  <span>Webhooks Consumer</span>
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  Azure Event Grid / Service Bus listener processing asynchronous Stripe and Razorpay payment confirmation events.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

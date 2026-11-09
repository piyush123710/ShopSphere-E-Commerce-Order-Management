import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  ArrowUpRight, 
  Calendar, 
  Download,
  Filter,
  CheckCircle,
  Clock,
  Truck,
  FileText,
  Eye
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SALES_METRICS } from '../data/mockData';
import { DeliveryStatus } from '../types/ecommerce';

export const AdminAnalytics: React.FC = () => {
  const { orders, updateOrderStatus, openOrderDetails, setInvoiceOrder } = useShop();

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [selectedChartBar, setSelectedChartBar] = useState<number | null>(null);

  // Analytics KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 48920);
  const totalOrdersCount = orders.length + 128;
  const avgOrderValue = totalRevenue / totalOrdersCount;

  // Max value for SVG chart scaling
  const maxRevenue = Math.max(...SALES_METRICS.map(m => m.revenue));

  const handleStatusChange = (orderId: string, newStatus: DeliveryStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mb-1">
            <span>Admin Console</span>
            <span aria-hidden="true">/</span>
            <span>Sales & Order Fulfillment Analytics</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
            Executive Sales Dashboard
          </h2>
        </div>

        {/* Time range selector */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg text-xs font-medium">
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              timeRange === '7d' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              timeRange === '30d' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setTimeRange('90d')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              timeRange === '90d' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Quarter (90d)
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-8">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Gross Sales</span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
            ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs last week</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-lg">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
            {totalOrdersCount}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12.1% fulfillment rate</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Average Order Value</span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
            ${avgOrderValue.toFixed(2)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-2 font-mono">
            <span>High-ticket carts</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Store Conversion</span>
            <div className="p-2 bg-purple-50 text-purple-700 rounded-lg">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
            3.62%
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+0.4% from mobile checkout</span>
          </div>
        </div>
      </div>

      {/* Main Revenue Chart & Category Share Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
        {/* Weekly Revenue Trend Bar Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-display">
                  Daily Revenue Performance
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Aggregated from Stripe & Razorpay webhook settlements
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-stone-400 block">7-Day Total</span>
                <span className="text-sm font-bold font-mono text-stone-900 tabular-nums">
                  ${SALES_METRICS.reduce((a, b) => a + b.revenue, 0).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Interactive SVG Chart */}
            <div className="pt-8 pb-4">
              <div className="grid grid-cols-7 gap-3 sm:gap-4 items-end h-56">
                {SALES_METRICS.map((metric, idx) => {
                  const heightPercent = Math.round((metric.revenue / maxRevenue) * 100);
                  const isHovered = selectedChartBar === idx;

                  return (
                    <div 
                      key={metric.period}
                      onMouseEnter={() => setSelectedChartBar(idx)}
                      onMouseLeave={() => setSelectedChartBar(null)}
                      className="flex flex-col items-center h-full justify-end cursor-pointer group"
                    >
                      {/* Tooltip */}
                      {isHovered && (
                        <div className="text-[10px] font-mono font-bold bg-stone-900 text-white px-2 py-1 rounded shadow-lg mb-2 whitespace-nowrap animate-in fade-in">
                          ${metric.revenue.toLocaleString()} · {metric.orders} orders
                        </div>
                      )}

                      <div className="w-full bg-stone-100 rounded-lg p-1 h-full flex flex-col justify-end">
                        <div 
                          className={`w-full rounded-md transition-all duration-300 ${
                            isHovered ? 'bg-amber-400' : 'bg-stone-800 group-hover:bg-amber-500'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>

                      <span className="mt-2 text-xs font-mono font-semibold text-stone-600">
                        {metric.period}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>Peak Day: Saturday ($18,400)</span>
            <span>Average: $11,960 / day</span>
          </div>
        </div>

        {/* Category Share & Payment Distribution (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900 font-display pb-4 border-b border-stone-100">
              Category Revenue Share
            </h3>

            <div className="py-6 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-stone-800">Precision Timepieces</span>
                  <span className="font-mono text-stone-600">42% ($20,540)</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '42%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-stone-800">Audio & Acoustics</span>
                  <span className="font-mono text-stone-600">31% ($15,165)</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-stone-800 h-full rounded-full" style={{ width: '31%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-stone-800">Artisanal Leather</span>
                  <span className="font-mono text-stone-600">18% ($8,805)</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-700 h-full rounded-full" style={{ width: '18%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-stone-800">Workspace & Living</span>
                  <span className="font-mono text-stone-600">9% ($4,410)</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-stone-400 h-full rounded-full" style={{ width: '9%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 text-xs text-stone-500">
            <span className="block font-medium text-stone-700 mb-1">Payment Gateway Settle:</span>
            <div className="flex justify-between font-mono text-[11px]">
              <span>Stripe Cards: 64%</span>
              <span>Razorpay UPI: 29%</span>
              <span>COD: 7%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Order Fulfillment Management Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs mt-10">
        <div className="px-6 py-5 border-b border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-50/50">
          <div>
            <h3 className="text-base font-bold text-stone-900 font-display">
              Customer Orders & Fulfillment Pipeline
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Live updates directly sync with customer order tracking timelines
            </p>
          </div>

          <span className="text-xs font-mono font-medium text-stone-500 bg-stone-100 px-3 py-1 rounded-md">
            {orders.length} Active System Orders
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-mono text-[11px]">
                <th className="py-3 px-4 font-medium">Order ID</th>
                <th className="py-3 px-4 font-medium">Customer / Shipping</th>
                <th className="py-3 px-4 font-medium text-center">Items</th>
                <th className="py-3 px-4 font-medium text-right">Total</th>
                <th className="py-3 px-4 font-medium text-center">Payment</th>
                <th className="py-3 px-4 font-medium">Fulfillment Status</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-sans">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-stone-50/70 transition-colors">
                  {/* Order Number & Date */}
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-stone-900 block">
                      #{order.orderNumber}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-stone-900 block">
                      {order.customer.name}
                    </span>
                    <span className="text-[11px] text-stone-400">
                      {order.customer.shippingAddress.city}, {order.customer.shippingAddress.state}
                    </span>
                  </td>

                  {/* Item count */}
                  <td className="py-3.5 px-4 text-center font-mono text-stone-600">
                    {order.items.reduce((s, i) => s + i.quantity, 0)}
                  </td>

                  {/* Total */}
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-stone-900 tabular-nums">
                    ${order.total.toFixed(2)}
                  </td>

                  {/* Payment */}
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                      order.paymentStatus === 'paid' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {order.paymentDetails.provider.toUpperCase()} · {order.paymentStatus.toUpperCase()}
                    </span>
                  </td>

                  {/* Interactive Status Selector */}
                  <td className="py-3.5 px-4">
                    <select
                      value={order.deliveryStatus}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as DeliveryStatus)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md border cursor-pointer ${
                        order.deliveryStatus === 'delivered'
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : order.deliveryStatus === 'out_for_delivery'
                          ? 'bg-blue-50 border-blue-300 text-blue-800'
                          : order.deliveryStatus === 'shipped'
                          ? 'bg-indigo-50 border-indigo-300 text-indigo-800'
                          : 'bg-amber-50 border-amber-300 text-amber-800'
                      }`}
                    >
                      <option value="placed">Placed</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                  {/* Action buttons */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openOrderDetails(order.id)}
                        className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
                        title="View Live Tracking Timeline"
                      >
                        <Truck className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setInvoiceOrder(order)}
                        className="p-1.5 text-stone-500 hover:text-amber-600 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
                        title="View Official Invoice"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

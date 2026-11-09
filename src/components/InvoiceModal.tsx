import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  Building, 
  ShieldCheck, 
  FileCheck 
} from 'lucide-react';
import { Order } from '../types/ecommerce';

interface InvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 no-print">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Modal Top Action Toolbar */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-stone-900 font-display">
              Tax Invoice Document #{order.invoiceNumber}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div id="printable-invoice" className="p-8 sm:p-10 bg-white text-stone-900">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-8 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold font-display tracking-tight text-stone-950">
                  ShopSphere
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  Official Receipt
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                ShopSphere Retail & Enterprise Inc.<br />
                100 Azure Commerce Way, Suite 400<br />
                Redmond, WA 98052, United States<br />
                support@shopsphere.io · +1 (800) 555-0199<br />
                <span className="font-mono text-[11px] text-stone-400">VAT / Tax ID: US-WA-8894102</span>
              </p>
            </div>

            <div className="text-left sm:text-right text-xs">
              <h2 className="text-lg font-bold text-stone-900 uppercase tracking-wider font-mono">
                TAX INVOICE
              </h2>
              <div className="mt-2 space-y-1 font-mono text-[11px] text-stone-600">
                <div><strong className="text-stone-800">Invoice No:</strong> {order.invoiceNumber}</div>
                <div><strong className="text-stone-800">Order Ref:</strong> #{order.orderNumber}</div>
                <div><strong className="text-stone-800">Date:</strong> {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                <div>
                  <strong className="text-stone-800">Status: </strong>
                  <span className="text-emerald-700 font-bold uppercase">{order.paymentStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Payment Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-stone-200 text-xs">
            <div>
              <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] text-stone-400 mb-2">
                Billed To
              </h4>
              <p className="text-stone-700 leading-relaxed font-sans">
                <strong className="text-stone-900 font-semibold">{order.customer.name}</strong><br />
                {order.customer.shippingAddress.street}<br />
                {order.customer.shippingAddress.city}, {order.customer.shippingAddress.state} {order.customer.shippingAddress.zipCode}<br />
                {order.customer.shippingAddress.country}<br />
                <span className="font-mono text-stone-500">{order.customer.email}</span>
              </p>
            </div>

            <div className="sm:text-right">
              <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] text-stone-400 mb-2">
                Payment Verification
              </h4>
              <div className="space-y-1 font-mono text-[11px] text-stone-600">
                <div><strong className="text-stone-800 font-sans">Gateway Provider:</strong> {order.paymentDetails.provider}</div>
                <div><strong className="text-stone-800 font-sans">Transaction Hash:</strong> {order.paymentDetails.transactionId}</div>
                {order.paymentDetails.last4 && (
                  <div><strong className="text-stone-800 font-sans">Card:</strong> •••• •••• •••• {order.paymentDetails.last4}</div>
                )}
                {order.paymentDetails.upiId && (
                  <div><strong className="text-stone-800 font-sans">UPI ID:</strong> {order.paymentDetails.upiId}</div>
                )}
                <div><strong className="text-stone-800 font-sans">Waybill Carrier:</strong> {order.courier.name}</div>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="py-6">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-300 text-stone-400 uppercase font-mono text-[11px]">
                  <th className="py-2.5 font-medium">Item Description</th>
                  <th className="py-2.5 font-medium text-center">SKU</th>
                  <th className="py-2.5 font-medium text-right">Unit Price</th>
                  <th className="py-2.5 font-medium text-center">Qty</th>
                  <th className="py-2.5 font-medium text-right">Line Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-sans">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 font-medium text-stone-900">
                      {item.title}
                    </td>
                    <td className="py-3 text-center font-mono text-stone-500 text-[11px]">
                      {item.sku}
                    </td>
                    <td className="py-3 text-right font-mono text-stone-700 tabular-nums">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="py-3 text-center font-mono text-stone-700 tabular-nums">
                      {item.quantity}
                    </td>
                    <td className="py-3 text-right font-mono font-bold text-stone-900 tabular-nums">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="pt-4 border-t border-stone-200 flex justify-end">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount ({order.couponCode || 'PROMO'})</span>
                  <span className="font-mono tabular-nums">-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Sales Tax (8%)</span>
                <span className="font-mono tabular-nums">${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Express Courier Shipping</span>
                <span className="font-mono tabular-nums">{order.shippingFee === 0 ? 'Free' : `$${order.shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-950 border-t-2 border-stone-900 pt-2 mt-2">
                <span>Total Paid</span>
                <span className="font-mono text-base tabular-nums">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Invoice Footer */}
          <div className="mt-10 pt-6 border-t border-stone-200 text-center text-[11px] text-stone-400">
            <p>Thank you for choosing ShopSphere. This is a computer-generated tax invoice verified by Azure App Service & SQL Server.</p>
            <p className="mt-1">For support or warranty questions, contact support@shopsphere.io or visit our customer portal.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

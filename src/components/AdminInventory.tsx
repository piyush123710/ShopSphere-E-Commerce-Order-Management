import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  Package, 
  ArrowUpDown, 
  Layers, 
  DollarSign, 
  X,
  RefreshCw,
  Boxes
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, ProductCategory } from '../types/ecommerce';

const CATEGORIES: ProductCategory[] = [
  'Audio & Acoustics',
  'Precision Timepieces',
  'Artisanal Leather',
  'Workspace & Living',
  'Minimalist Optics'
];

export const AdminInventory: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, updateStock, showToast } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state for Add/Edit
  const [formTitle, setFormTitle] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formCategory, setFormCategory] = useState<ProductCategory>('Audio & Acoustics');
  const [formPrice, setFormPrice] = useState(199);
  const [formStock, setFormStock] = useState(20);
  const [formLowStockThreshold, setFormLowStockThreshold] = useState(5);
  const [formDesc, setFormDesc] = useState('');
  const [formImage, setFormImage] = useState('/src/assets/images/product_audio_headphones_1794225873430.jpg');

  // KPI Calculations
  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= (p.lowStockThreshold || 5)).length;
  const outOfStockCount = products.filter(p => p.stock <= 0).length;
  const totalValuation = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  // Filter products
  const filteredProducts = products.filter(product => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = product.title.toLowerCase().includes(q) || product.sku.toLowerCase().includes(q) || product.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (stockFilter === 'low') {
      return product.stock > 0 && product.stock <= (product.lowStockThreshold || 5);
    }
    if (stockFilter === 'out') {
      return product.stock <= 0;
    }
    return true;
  });

  const handleOpenAddModal = () => {
    setFormTitle('');
    setFormSku(`SPH-${Math.floor(100 + Math.random() * 900)}`);
    setFormCategory('Audio & Acoustics');
    setFormPrice(249);
    setFormStock(25);
    setFormLowStockThreshold(5);
    setFormDesc('Engineered with premium acoustic chambers and micro-milled finishing for audiophile fidelity.');
    setFormImage('/src/assets/images/product_audio_headphones_1794225873430.jpg');
    setIsAddModalOpen(true);
  };

  const handleSaveNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      showToast('Please provide a product title', 'warning');
      return;
    }

    addProduct({
      sku: formSku || `SPH-${Math.floor(100 + Math.random() * 900)}`,
      title: formTitle,
      category: formCategory,
      price: Number(formPrice),
      originalPrice: Number(formPrice) * 1.15,
      rating: 5.0,
      reviewCount: 1,
      stock: Number(formStock),
      lowStockThreshold: Number(formLowStockThreshold),
      description: formDesc,
      image: formImage,
      features: ['Precision engineered components', 'Quality assured manufacturing', '1-year standard warranty'],
      tags: ['New Arrival'],
      isFeatured: true,
      status: Number(formStock) <= 0 ? 'out_of_stock' : Number(formStock) <= Number(formLowStockThreshold) ? 'low_stock' : 'in_stock'
    });

    setIsAddModalOpen(false);
  };

  const handleOpenEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setFormTitle(prod.title);
    setFormSku(prod.sku);
    setFormCategory(prod.category);
    setFormPrice(prod.price);
    setFormStock(prod.stock);
    setFormLowStockThreshold(prod.lowStockThreshold || 5);
    setFormDesc(prod.description);
    setFormImage(prod.image);
  };

  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.id, {
      title: formTitle,
      category: formCategory,
      price: Number(formPrice),
      stock: Number(formStock),
      lowStockThreshold: Number(formLowStockThreshold),
      description: formDesc,
      image: formImage
    });

    setEditingProduct(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mb-1">
            <span>Admin Console</span>
            <span aria-hidden="true">/</span>
            <span>Inventory & Catalog Management</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
            Product Inventory Management
          </h2>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Catalog SKUs</span>
            <Boxes className="w-4 h-4 text-stone-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
            {totalProducts}
          </div>
          <span className="text-[11px] text-stone-400 mt-1 block">Active products in database</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-amber-700 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Low Stock Warnings</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-700 tabular-nums">
            {lowStockCount}
          </div>
          <span className="text-[11px] text-amber-700/80 mt-1 block">Threshold &le; 5 units</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-rose-700 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Out of Stock</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-700 tabular-nums">
            {outOfStockCount}
          </div>
          <span className="text-[11px] text-rose-700/80 mt-1 block">Requires supplier reorder</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Inventory Value</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
            ${totalValuation.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 block font-medium">Asset valuation at retail price</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title, SKU, or category..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Stock status filter tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg text-xs font-medium w-full sm:w-auto">
          <button
            onClick={() => setStockFilter('all')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              stockFilter === 'all' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All ({products.length})
          </button>
          <button
            onClick={() => setStockFilter('low')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              stockFilter === 'low' ? 'bg-white text-amber-800 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Low Stock ({lowStockCount})
          </button>
          <button
            onClick={() => setStockFilter('out')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              stockFilter === 'out' ? 'bg-white text-rose-800 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Out of Stock ({outOfStockCount})
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-mono text-[11px]">
                <th className="py-3.5 px-4 font-medium">Product / SKU</th>
                <th className="py-3.5 px-4 font-medium">Category</th>
                <th className="py-3.5 px-4 font-medium text-right">Retail Price</th>
                <th className="py-3.5 px-4 font-medium text-center">Stock Level</th>
                <th className="py-3.5 px-4 font-medium text-center">Status</th>
                <th className="py-3.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-sans">
              {filteredProducts.map(product => {
                const isOutOfStock = product.stock <= 0;
                const isLowStock = product.stock > 0 && product.stock <= (product.lowStockThreshold || 5);

                return (
                  <tr key={product.id} className="hover:bg-stone-50/70 transition-colors">
                    {/* Title & SKU */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.title}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200"
                        />
                        <div className="min-w-0">
                          <span className="font-semibold text-stone-900 block truncate max-w-xs sm:max-w-sm">
                            {product.title}
                          </span>
                          <span className="font-mono text-[10px] text-stone-400">
                            {product.sku}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 text-stone-600 font-medium">
                      {product.category}
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-stone-900 tabular-nums">
                      ${product.price.toFixed(2)}
                    </td>

                    {/* Inline stock stepper */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center border border-stone-300 rounded-lg bg-stone-50 overflow-hidden">
                        <button
                          onClick={() => updateStock(product.id, product.stock - 1)}
                          disabled={product.stock <= 0}
                          className="px-2 py-1 text-stone-600 hover:bg-stone-200 disabled:opacity-30 cursor-pointer"
                          title="Decrease stock"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-1 font-mono font-bold text-stone-900 tabular-nums text-xs">
                          {product.stock}
                        </span>
                        <button
                          onClick={() => updateStock(product.id, product.stock + 1)}
                          className="px-2 py-1 text-stone-600 hover:bg-stone-200 cursor-pointer"
                          title="Increase stock"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 text-center">
                      {isOutOfStock ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          OUT OF STOCK
                        </span>
                      ) : isLowStock ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          LOW STOCK
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          HEALTHY
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${product.title}"?`)) {
                              deleteProduct(product.id);
                            }
                          }}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {(isAddModalOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <h3 className="text-base font-bold text-stone-900 font-display">
                {editingProduct ? 'Edit Catalog Product' : 'Add New Inventory Item'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingProduct(null);
                }}
                className="p-1.5 text-stone-400 hover:text-stone-800 rounded-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingProduct ? handleSaveEditProduct : handleSaveNewProduct} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-amber-500"
                  placeholder="e.g. Masterwork Titanium Chronometer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">SKU Code</label>
                  <input
                    type="text"
                    required
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e: any) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg font-medium"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Price ($)</label>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Stock Units</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Low Alert At</label>
                  <input
                    type="number"
                    min="1"
                    value={formLowStockThreshold}
                    onChange={(e) => setFormLowStockThreshold(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-amber-500 leading-relaxed"
                  placeholder="Comprehensive description of materials and features..."
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Product Image Asset</label>
                <select
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-700 font-mono text-[11px]"
                >
                  <option value="/src/assets/images/product_audio_headphones_1794225873430.jpg">Acoustic Headphones (Studio Image)</option>
                  <option value="/src/assets/images/product_smartwatch_titanium_1794225874970.jpg">Titanium Smartwatch (Studio Image)</option>
                  <option value="/src/assets/images/product_leather_weekender_1794225876160.jpg">Leather Weekender (Studio Image)</option>
                  <option value="/src/assets/images/hero_shopsphere_banner_1794225874675.jpg">Workspace Flagship Showcase</option>
                </select>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 border border-stone-300 text-stone-700 font-semibold rounded-lg hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg shadow-xs cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

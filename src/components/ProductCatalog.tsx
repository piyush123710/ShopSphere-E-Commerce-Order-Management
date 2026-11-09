import React, { useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Star, 
  Heart, 
  ShoppingBag, 
  Eye, 
  RotateCcw,
  Check,
  AlertCircle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, ProductCategory } from '../types/ecommerce';

const CATEGORIES: ProductCategory[] = [
  'All',
  'Audio & Acoustics',
  'Precision Timepieces',
  'Artisanal Leather',
  'Workspace & Living'
];

export const ProductCatalog: React.FC = () => {
  const { 
    products, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly,
    sortBy,
    setSortBy,
    resetFilters,
    addToCart,
    openProductDetail,
    toggleWishlist,
    isWishlisted
  } = useShop();

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesSku = product.sku.toLowerCase().includes(q);
        const matchesTag = product.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesSku && !matchesTag) return false;
      }
      // Price
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      // In stock
      if (inStockOnly && product.stock <= 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'stock') return b.stock - a.stock;
      // Default: featured first
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, priceRange, inStockOnly, sortBy]);

  return (
    <section id="catalog-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Category Segmented Control */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
            Curated Collection
          </h2>
          <p className="text-stone-500 text-sm mt-0.5">
            Showing <span className="font-semibold text-stone-800 tabular-nums">{filteredProducts.length}</span> verified mastercraft products
          </p>
        </div>

        {/* Functional Segmented Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg">
          {CATEGORIES.map(category => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  isSelected 
                    ? 'bg-white text-stone-900 shadow-xs font-semibold' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="py-4 my-2 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search input */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search headphones, titanium, leather bag, SKU..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all placeholder:text-stone-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Price Slider Filter */}
        <div className="md:col-span-3 flex items-center gap-2 bg-white px-3 py-1.5 border border-stone-200 rounded-lg text-xs">
          <span className="text-stone-500 shrink-0">Max:</span>
          <span className="font-mono font-medium text-stone-800 w-12 tabular-nums">${priceRange[1]}</span>
          <input
            type="range"
            min="100"
            max="1000"
            step="50"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* In-Stock Toggle */}
        <div className="md:col-span-2 flex items-center">
          <label className="flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer select-none bg-white px-3 py-2 border border-stone-200 rounded-lg w-full justify-between">
            <span>In Stock Only</span>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="accent-amber-500 w-4 h-4 rounded cursor-pointer"
            />
          </label>
        </div>

        {/* Sort Dropdown */}
        <div className="md:col-span-2 flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs font-medium text-stone-700 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="stock">Stock Available</option>
          </select>
        </div>
      </div>

      {/* Active filters state indicator with quick reset */}
      {(searchQuery || selectedCategory !== 'All' || priceRange[1] < 1000 || inStockOnly) && (
        <div className="flex items-center gap-3 text-xs text-stone-600 mb-6 bg-amber-50/70 border border-amber-200/60 px-3.5 py-2 rounded-lg">
          <span className="font-medium text-amber-900">Active Filters Applied</span>
          <span aria-hidden="true">·</span>
          <span>Filtered to {filteredProducts.length} items</span>
          <button
            onClick={resetFilters}
            className="ml-auto text-amber-900 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* Product Cards Grid: 3-column desktop */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white border border-dashed border-stone-300 rounded-xl my-6">
          <AlertCircle className="w-10 h-10 text-stone-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-stone-800">No matching products found</h3>
          <p className="text-stone-500 text-sm mt-1 max-w-md mx-auto">
            Try adjusting your search criteria or reset your filters to view all products in the catalog.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-amber-500 text-stone-950 font-bold text-xs rounded-lg hover:bg-amber-400 transition-colors cursor-pointer"
          >
            Reset Catalog Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {filteredProducts.map(product => {
            const isFav = isWishlisted(product.id);
            const isOutOfStock = product.stock <= 0;
            const isLowStock = product.stock > 0 && product.stock <= (product.lowStockThreshold || 5);

            return (
              <div 
                key={product.id}
                className="group bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                {/* Media Container: 4:3 aspect ratio */}
                <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
                  />

                  {/* Top Floating Controls */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    {/* Stock status tag */}
                    <span className="pointer-events-auto text-[11px] font-mono font-medium px-2 py-0.5 rounded shadow-xs backdrop-blur-md bg-stone-900/80 text-white">
                      {isOutOfStock ? 'Sold Out' : isLowStock ? `Only ${product.stock} left` : 'In Stock'}
                    </span>

                    {/* Wishlist Heart button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="pointer-events-auto p-1.5 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-red-600 shadow-sm transition-all cursor-pointer"
                      title={isFav ? "Remove from wishlist" : "Save to wishlist"}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>

                  {/* Hover Quick Action Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    <button
                      onClick={() => openProductDetail(product.id)}
                      className="flex-1 py-1.5 px-3 bg-white/95 hover:bg-white text-stone-900 text-xs font-semibold rounded-md shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Content info */}
                <div className="p-5 flex flex-col grow justify-between">
                  <div>
                    {/* Clean metadata without pill badges */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                      <span className="uppercase tracking-wider font-mono text-[10px] text-stone-600">{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-[10px]">{product.sku}</span>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => openProductDetail(product.id)}
                      className="text-base font-semibold text-stone-900 hover:text-amber-600 cursor-pointer transition-colors line-clamp-1"
                    >
                      {product.title}
                    </h3>

                    <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-stone-900 font-mono tabular-nums">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5 text-xs text-stone-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-stone-700">{product.rating}</span>
                        <span className="text-stone-400">({product.reviewCount})</span>
                      </div>
                    </div>

                    {/* Add to Bag CTA */}
                    <button
                      onClick={() => addToCart(product, 1)}
                      disabled={isOutOfStock}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isOutOfStock 
                          ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                          : 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{isOutOfStock ? 'Sold Out' : 'Add to Bag'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

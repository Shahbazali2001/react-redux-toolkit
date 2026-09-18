import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  SlidersHorizontal,
  Search,
  Check,
  ArrowUpDown,
  Sparkles,
  Truck,
  ShieldCheck,
  RotateCcw,
  LayoutGrid,
  List,
  X,
  Plus,
  Minus,
} from "lucide-react";

// Curated high quality product catalog with Unsplash images
const PRODUCTS_DATA = [
  {
    id: 1,
    title: "Sony WH-1000XM5 Wireless Headphones",
    category: "Audio",
    price: 349.99,
    originalPrice: 399.99,
    rating: 4.9,
    reviewsCount: 328,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    badgeColor: "bg-amber-500",
    description:
      "Industry-leading noise cancellation with two processors and 8 microphones for unprecedented sound quality and crystal clear hands-free calling.",
    colors: ["#1e293b", "#e2e8f0", "#94a3b8"],
    inStock: true,
    features: [
      "30-hour battery life",
      "Ultra-comfortable lightweight fit",
      "Multipoint connection",
    ],
  },
  {
    id: 2,
    title: "Apple Watch Series 9 GPS 45mm",
    category: "Wearables",
    price: 429.0,
    originalPrice: 479.0,
    rating: 4.8,
    reviewsCount: 215,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    badge: "Trending",
    badgeColor: "bg-indigo-600",
    description:
      "Smarter, brighter, and mightier. Featuring the S9 chip, double tap gesture control, and precision health tracking sensor array.",
    colors: ["#0f172a", "#f43f5e", "#cbd5e1"],
    inStock: true,
    features: [
      "Always-On Retina display",
      "Blood Oxygen & ECG apps",
      "Water resistant 50m",
    ],
  },
  {
    id: 3,
    title: "Fujifilm X-T30 II Mirrorless Camera",
    category: "Cameras",
    price: 899.95,
    originalPrice: 999.95,
    rating: 4.9,
    reviewsCount: 142,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    badge: "Sale -10%",
    badgeColor: "bg-rose-500",
    description:
      "Compact, lightweight mirrorless body with advanced 26.1MP X-Trans CMOS 4 sensor and iconic film simulation modes.",
    colors: ["#000000", "#9ca3af"],
    inStock: true,
    features: ["4K/30p video", "26.1 Megapixels", "Face/Eye detection AF"],
  },
  {
    id: 4,
    title: "Minimalist Leather Travel Backpack",
    category: "Fashion",
    price: 129.5,
    originalPrice: 165.0,
    rating: 4.7,
    reviewsCount: 189,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    badge: "New Arrival",
    badgeColor: "bg-emerald-600",
    description:
      "Handcrafted water-resistant top-grain leather with dedicated 16-inch padded laptop sleeve and anti-theft hidden pockets.",
    colors: ["#78350f", "#1e293b", "#475569"],
    inStock: true,
    features: [
      "16-inch laptop pocket",
      "Waterproof YKK zippers",
      "Breathable back padding",
    ],
  },
];

const CATEGORIES = [
  "All",
  "Audio",
  "Wearables",
  "Electronics",
  "Fashion",
  "Cameras",
];

const Product = () => {
  const dispatch = useDispatch();

  // State management
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [wishlist, setWishlist] = useState({});
  const [addedItems, setAddedItems] = useState({});
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviewsCount - a.reviewsCount;
      return 0; // 'featured'
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Handle Add to Cart action
  const handleAddToCart = (product, quantity = 1, e = null) => {
    if (e) e.stopPropagation();

    // If Redux slice action exists, dispatch safely
    try {
      if (dispatch) {
        dispatch({
          type: "cart/addToCart",
          payload: { ...product, quantity },
        });
      }
    } catch {
      // Ignored if reducer/action is not configured yet
    }

    // Visual feedback
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setToastMessage(`Added "${product.title}" to cart!`);

    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);

    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const toggleWishlist = (productId, e) => {
    if (e) e.stopPropagation();
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-8 px-4 sm:px-6 lg:px-8 text-slate-800 font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero / Header Promo Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-violet-900 text-white p-8 sm:p-12 shadow-xl">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-indigo-200">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Autumn Collection 2026
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Curated Gear for <br />
              <span className="bg-gradient-to-r from-indigo-300 via-pink-300 to-amber-200 bg-clip-text text-transparent">
                Modern Creators
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore our handpicked collection of flagship electronics,
              acoustic gear, and designer accessories crafted for daily
              performance.
            </p>

            {/* Quick Benefits */}
            <div className="pt-2 flex flex-wrap gap-4 sm:gap-6 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-indigo-400" /> Free Shipping $50+
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 2-Year
                Warranty
              </span>
              <span className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-amber-400" /> 30-Day Easy
                Returns
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Controls Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-slate-200/80 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-[1.02]"
                      : "bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search, Sort, and View Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-xl border border-transparent focus:border-indigo-400 focus:outline-none focus:ring-3 focus:ring-indigo-100 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-3.5 pr-8 py-2 bg-slate-100 hover:bg-slate-200/80 text-sm font-medium text-slate-700 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-colors"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Grid / List View Toggle */}
              <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-white text-indigo-600 shadow-xs font-semibold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  aria-label="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-white text-indigo-600 shadow-xs font-semibold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active filter summary count */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>
              Showing{" "}
              <strong className="text-slate-800">
                {filteredProducts.length}
              </strong>{" "}
              products
            </span>
            {(selectedCategory !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                Reset all filters
              </button>
            )}
          </div>
        </div>

        {/* Product Catalog Display */}
        {filteredProducts.length === 0 ? (
          /* Empty state */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No products found
            </h3>
            <p className="text-slate-500 text-sm">
              We couldn't find any products matching your current search or
              filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isWishlisted = !!wishlist[product.id];
              const isAdded = !!addedItems[product.id];

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/70 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image container */}
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-bold shadow-md ${product.badgeColor}`}
                      >
                        {product.badge}
                      </span>
                    )}

                    {/* Quick action buttons on image */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                      {/* Wishlist */}
                      <button
                        onClick={(e) => toggleWishlist(product.id, e)}
                        className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
                          isWishlisted
                            ? "bg-rose-500 text-white"
                            : "bg-white/90 text-slate-700 hover:bg-white hover:text-rose-500"
                        }`}
                        aria-label="Wishlist"
                      >
                        <Heart
                          className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
                        />
                      </button>

                      {/* Quick View */}
                      <button
                        onClick={() => {
                          setQuickViewProduct(product);
                          setModalQuantity(1);
                        }}
                        className="p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-indigo-600 backdrop-blur-md transition-all shadow-md"
                        aria-label="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Available Colors indicator */}
                    {product.colors && (
                      <div className="absolute bottom-3 left-4 flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-full">
                        {product.colors.map((hex, i) => (
                          <span
                            key={i}
                            className="w-2.5 h-2.5 rounded-full border border-white/40"
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content & Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{product.rating}</span>
                          <span className="text-slate-400 font-normal">
                            ({product.reviewsCount})
                          </span>
                        </div>
                      </div>

                      <h3
                        onClick={() => {
                          setQuickViewProduct(product);
                          setModalQuantity(1);
                        }}
                        className="font-bold text-slate-900 text-lg leading-snug hover:text-indigo-600 transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.title}
                      </h3>

                      <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price and Add to Cart */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black text-slate-900">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-emerald-600 font-medium">
                          In Stock • Ready to ship
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(product, 1, e)}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all duration-200 shadow-sm ${
                          isAdded
                            ? "bg-emerald-600 text-white shadow-emerald-600/30"
                            : "bg-slate-900 hover:bg-indigo-600 text-white shadow-slate-900/20 active:scale-95"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" /> Added
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" /> Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredProducts.map((product) => {
              const isWishlisted = !!wishlist[product.id];
              const isAdded = !!addedItems[product.id];

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200/70 shadow-xs hover:shadow-md transition-all p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5"
                >
                  <div className="relative w-full sm:w-44 aspect-video sm:aspect-square rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <span
                        className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-white text-[10px] font-bold ${product.badgeColor}`}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{product.rating}</span>
                        <span className="text-slate-400 font-normal">
                          ({product.reviewsCount})
                        </span>
                      </div>
                    </div>

                    <h3
                      onClick={() => {
                        setQuickViewProduct(product);
                        setModalQuantity(1);
                      }}
                      className="font-bold text-slate-900 text-lg hover:text-indigo-600 transition-colors cursor-pointer"
                    >
                      {product.title}
                    </h3>

                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {product.features?.map((f, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md"
                        >
                          <Check className="w-3 h-3 text-emerald-500" /> {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="sm:border-l sm:border-slate-100 sm:pl-6 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 shrink-0">
                    <div className="text-left sm:text-right">
                      <div className="text-2xl font-black text-slate-900">
                        ${product.price.toFixed(2)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-xs text-slate-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => toggleWishlist(product.id, e)}
                        className={`p-2.5 rounded-xl border transition-colors ${
                          isWishlisted
                            ? "bg-rose-50 border-rose-200 text-rose-500"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
                        />
                      </button>

                      <button
                        onClick={(e) => handleAddToCart(product, 1, e)}
                        className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                          isAdded
                            ? "bg-emerald-600 text-white"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" /> Added
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" /> Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Image */}
              <div className="relative aspect-square md:aspect-auto bg-slate-100">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  className="w-full h-full object-cover"
                />
                {quickViewProduct.badge && (
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-bold ${quickViewProduct.badgeColor}`}
                  >
                    {quickViewProduct.badge}
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      {quickViewProduct.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{quickViewProduct.rating}</span>
                      <span className="text-slate-400 font-normal">
                        ({quickViewProduct.reviewsCount} reviews)
                      </span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-extrabold text-slate-900 leading-snug">
                    {quickViewProduct.title}
                  </h2>

                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-black text-slate-900">
                      ${quickViewProduct.price.toFixed(2)}
                    </span>
                    {quickViewProduct.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">
                        ${quickViewProduct.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {quickViewProduct.description}
                  </p>

                  {/* Highlights / Features */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                      Key Highlights
                    </span>
                    <ul className="space-y-1">
                      {quickViewProduct.features?.map((feat, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-xs text-slate-600"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">
                      Quantity
                    </span>
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() =>
                          setModalQuantity((q) => Math.max(1, q - 1))
                        }
                        className="p-2 hover:bg-slate-100 text-slate-600 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 text-sm font-bold text-slate-800">
                        {modalQuantity}
                      </span>
                      <button
                        onClick={() => setModalQuantity((q) => q + 1)}
                        className="p-2 hover:bg-slate-100 text-slate-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        handleAddToCart(quickViewProduct, modalQuantity);
                        setQuickViewProduct(null);
                      }}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all duration-200 active:scale-95"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add {modalQuantity} to Cart • $
                      {(quickViewProduct.price * modalQuantity).toFixed(2)}
                    </button>

                    <button
                      onClick={(e) => toggleWishlist(quickViewProduct.id, e)}
                      className={`p-3 rounded-2xl border transition-colors ${
                        wishlist[quickViewProduct.id]
                          ? "bg-rose-50 border-rose-200 text-rose-500"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                      aria-label="Wishlist"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          wishlist[quickViewProduct.id] ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;

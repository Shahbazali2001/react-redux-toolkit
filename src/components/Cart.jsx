import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";

const Cart = ({ className = "", showLabel = false }) => {
  // Safely select cart count supporting various Redux cart state structures
  const cartCount = useSelector((state) => {
    if (!state.cart) return 0;
    if (Array.isArray(state.cart)) {
      return state.cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    }
    if (Array.isArray(state.cart.items)) {
      return state.cart.items.reduce(
        (acc, item) => acc + (item.quantity || 1),
        0,
      );
    }
    if (typeof state.cart.totalQuantity === "number") {
      return state.cart.totalQuantity;
    }
    if (typeof state.cart.count === "number") {
      return state.cart.count;
    }
    return 0;
  });

  return (
    <Link
      to="/cart"
      className={`relative p-2.5 text-slate-700 hover:text-indigo-600 bg-slate-100/70 hover:bg-indigo-50 rounded-xl transition-all duration-200 flex items-center justify-center group ${className}`}
      aria-label={`Shopping cart with ${cartCount} items`}
    >
      <ShoppingCart className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />

      {/* Cart Item Badge */}
      <span
        className={`absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 flex items-center justify-center text-[11px] font-bold text-white bg-gradient-to-r from-indigo-600 to-pink-500 rounded-full shadow-sm ring-2 ring-white transform transition-all duration-300 ${
          cartCount > 0 ? "scale-100 opacity-100" : "scale-90 opacity-90"
        }`}
      >
        {cartCount}
      </span>

      {showLabel && <span className="ml-2 font-medium text-sm">Cart</span>}
    </Link>
  );
};

export default Cart;

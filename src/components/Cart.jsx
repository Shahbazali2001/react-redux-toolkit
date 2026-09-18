import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { selectCartCount } from "../redux/slice.js";

const Cart = ({ className = "", showLabel = false }) => {
  const cartCount = useSelector(selectCartCount);

  return (
    <Link
      to="/cart"
      className={`relative p-2.5 text-slate-700 hover:text-indigo-600 bg-slate-100/70 hover:bg-indigo-50 rounded-xl transition-all duration-200 flex items-center justify-center group ${className}`}
      aria-label={`Shopping cart with ${cartCount} items`}
    >
      <ShoppingCart className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
      <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1.5 flex items-center justify-center text-[11px] font-bold text-white bg-indigo-600 rounded-full shadow-sm ring-2 ring-white">
        {cartCount}
      </span>
      {showLabel && <span className="ml-2 font-medium text-sm">Cart</span>}
    </Link>
  );
};

export default Cart;

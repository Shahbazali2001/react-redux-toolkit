import React from "react";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/slice.js";

const PRODUCT = {
  id: 1,
  title: "Sony WH-1000XM5 Wireless Headphones",
  price: 349.99,
  image:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
  description:
    "Industry-leading noise cancellation, rich sound, and a comfortable fit for all-day listening.",
};

const Product = () => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({ product: PRODUCT, quantity: 1 }));
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              Featured product
            </p>
            <h1 className="mt-1 text-3xl font-black text-slate-900">Shop</h1>
          </div>
        </div>

        <article className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">
          <img
            src={PRODUCT.image}
            alt={PRODUCT.title}
            className="h-full min-h-72 w-full object-cover"
          />
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Audio
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
              {PRODUCT.title}
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              {PRODUCT.description}
            </p>
            <p className="mt-6 text-3xl font-black text-slate-900">
              ${PRODUCT.price.toFixed(2)}
            </p>
            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
          </div>
        </article>
      </div>
    </main>
  );
};

export default Product;

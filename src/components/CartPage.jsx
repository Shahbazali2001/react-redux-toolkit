import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  clearCart,
  removeItem,
  selectCartItems,
} from "../redux/slice.js";

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Your order
            </p>
            <h1 className="mt-1 text-3xl font-black text-slate-900">
              Shopping cart
            </h1>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-white hover:text-indigo-600"
          >
            <ArrowLeft className="h-4 w-4" /> Continue shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <ShoppingCart className="mx-auto h-10 w-10 text-slate-300" />
            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Add something from the product catalog to get started.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-700"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
            <section className="space-y-3">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-24 w-24 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                          {item.category}
                        </p>
                        <h2 className="mt-1 font-bold text-slate-900">
                          {item.title}
                        </h2>
                      </div>
                      <button
                        onClick={() => dispatch(removeItem(item.id))}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
                        aria-label={`Remove ${item.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex items-center rounded-lg border border-slate-200">
                        <button
                          onClick={() => dispatch(removeItem(item.id))}
                          className="p-2 text-slate-600 hover:bg-slate-50"
                          aria-label={`Decrease ${item.title} quantity`}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(addItem({ product: item, quantity: 1 }))
                          }
                          className="p-2 text-slate-600 hover:bg-slate-50"
                          aria-label={`Increase ${item.title} quantity`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="font-black text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-lg font-black text-slate-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-600">
                Checkout
              </button>
              <button
                onClick={() => dispatch(clearCart())}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-rose-500"
              >
                <Trash2 className="h-4 w-4" /> Clear cart
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage;

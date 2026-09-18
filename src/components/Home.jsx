import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap,
  Star,
} from "lucide-react";
import heroImg from "../assets/hero.png";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-600">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>New Season 2026 Collection Released</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none">
                Elevate Your Everyday <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Tech & Lifestyle
                </span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover next-generation electronics, premium acoustic gear, and
                designer lifestyle accessories carefully crafted for performance
                and elegance.
              </p>

              {/* Call to Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Explore Products
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-4 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-base rounded-2xl border border-slate-200 shadow-xs hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Zap className="w-5 h-5 text-amber-500" />
                  View Top Deals
                </Link>
              </div>

              {/* Social Proof */}
              <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-slate-800">4.9/5</span>
                </div>
                <span className="text-slate-300">|</span>
                <span>
                  Over <strong>50,000+</strong> Happy Customers
                </span>
              </div>
            </div>

            {/* Right Column - Hero Visual */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl -z-10" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white p-3">
                <img
                  src={heroImg}
                  alt="Premium Products Showcase"
                  className="w-full h-auto object-cover rounded-2xl transform hover:scale-[1.02] transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to high quality unsplash image if hero.png is not loaded
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Badges */}
      <section className="border-y border-slate-200/80 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Free Express Shipping
                </h4>
                <p className="text-xs text-slate-500">On all orders over $50</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  2-Year Warranty
                </h4>
                <p className="text-xs text-slate-500">
                  100% Genuine guaranteed
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  30-Day Easy Returns
                </h4>
                <p className="text-xs text-slate-500">Hassle-free refunds</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  24/7 Priority Support
                </h4>
                <p className="text-xs text-slate-500">Dedicated assistance</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

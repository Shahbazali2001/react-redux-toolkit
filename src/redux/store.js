import { configureStore } from "@reduxjs/toolkit";
import addToCart from "./slice.js";

export const store = configureStore({
  reducer: {
    cart: addToCart,
  },
});

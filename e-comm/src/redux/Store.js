import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./CategorySlice";
import ProductSlice from "./ProductSlice";

export const store = configureStore({
  reducer: {
    categories: categorySlice,
    products: ProductSlice
  },
});

export default store;

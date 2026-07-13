import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import { loadState , saveState } from "./storage";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState : preloadedState,
});

store.subscribe(()=>{
  const state = store.getState();
  saveState(state);
})
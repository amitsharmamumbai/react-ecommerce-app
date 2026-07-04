import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    items : [],
};

const wishlistSlice = createSlice({
    name : "wishlist",
    initialState,
    reducers:{

        addToWishlist : (state, action) => {
          const existingItem = state.items.find(
            (item) => item.id === action.payload.id
          )
          if(existingItem){
            return;
          }
          state.items = [...state.items, action.payload]
        },

        removeFromWishlist : (state, action) => {
          const updatedWishlist = state.items.filter(
            (item) => item.id !== action.payload
          )
          state.items = updatedWishlist;
        },
    },
});

export const {addToWishlist, removeFromWishlist} = wishlistSlice.actions

export default wishlistSlice.reducer;

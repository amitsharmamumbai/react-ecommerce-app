import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id );
      if(existingItem){
        const updatedCart = state.items.map((item)=> 
          item.id === action.payload.id 
            ? {...item, quantity: item.quantity + 1}
            : item
        );
        state.items = updatedCart;
      }else{
        state.items = [...state.items, {...action.payload,  quantity: 1 }];
      }
    },

    removeFromCart: (state, action) => {
      const updatedCart = state.items.filter((_, i) => i !== action.payload)
      state.items = updatedCart;
    },

    decreaseQuantity: (state, action) =>{
      const updatedCart = state.items.map((item, i) => {
        if (i === action.payload) {
          if (item.quantity === 1) return null;
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter(Boolean);

      state.items = updatedCart;
    } 
  },
});

export const { addToCart , removeFromCart, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
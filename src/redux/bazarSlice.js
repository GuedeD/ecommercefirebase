import { createSlice } from "@reduxjs/toolkit";

export const bazarSlice = createSlice({
  name: "bazar",
  initialState: {
    userInfo: null,
    products: [],
  },
  reducers: {
    loginUser: (state, action) => {
      return { ...state, userInfo: action.payload };
    },
    logoutUser: (state) => {
      return { ...state, userInfo: null };
    },
    addToCart: (state, action) => {
      const inCart = state.products.find(
        (item) => item.id === action.payload.id
      );

      if (inCart) {
        inCart.quantity += action.payload.quantity;
      } else {
        const updatedProducts = state.products.concat(action.payload);
        return { ...state, products: updatedProducts };
      }
    },

    deleteItem: (state, action) => {
      const updatedProducts = state.products.filter(
        (item) => item.id !== action.payload
      );
      return { ...state, products: updatedProducts };
    },
    resetCart: (state) => {
      return { ...state, products: [] };
    },

    incrementQuantity: (state, action) => {
      console.log(state.action);
      const item = state.products.find((item) => item.id === action.payload);
      console.log(item);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
  },
});

export const bazarReducer = bazarSlice.reducer;
export const {
  loginUser,
  logoutUser,
  addToCart,
  deleteItem,
  resetCart,
  incrementQuantity,
  decrementQuantity,
} = bazarSlice.actions;

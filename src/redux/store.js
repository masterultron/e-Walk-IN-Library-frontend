import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './Features/cart/cartSlice'
import booksApi from './Features/books/booksApi'
import ordersApi from './Features/orders/ordersApi'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [booksApi.reducerPath]: booksApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware),
})
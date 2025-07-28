import { configureStore } from "@reduxjs/toolkit";
import sideBarSliceReducer from "../features/stateSlice";
import ProductData from "../features/productData";
import cartSlice from "../features/cartSlice";
import CartCalc from "../features/cartCalc";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import resendOTPSlice from "../features/resendOTP";
import userDetailSlice from "../features/userDetailSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["otp"],
};
const rootReducer = combineReducers({
  otp: resendOTPSlice,
  sideBarState: sideBarSliceReducer,
  ProductData: ProductData,
  cart: cartSlice,
  CartCalc: CartCalc,
  userDetail: userDetailSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export default store;

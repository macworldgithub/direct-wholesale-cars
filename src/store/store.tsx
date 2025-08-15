// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import signupDealerSlice from "@/slices/signupDealerSlice";
import signinDealerSlice from "@/slices/signinDealerSlice";
import loaderSlice from "@/slices/loaderSlice";
import carAdsSlice from "@/slices/carAdsSlice";
import signupWholeSalerSlice from "@/slices/signupWholesalerSlice";

const rootReducer = combineReducers({
  loader: loaderSlice.reducer,
  SignupDealer: signupDealerSlice.reducer,
  SignupWholesaler: signupWholeSalerSlice.reducer,
  SignuinDealer: signinDealerSlice.reducer,
  carAds: carAdsSlice.reducer,
});

type RootReducerType = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<any> = {
  key: "direct-wholesale-cars",
  storage,
  blacklist: ["SignupDealer", "SignupWholesaler", "SignuinDealer", "carAds"], 
};

const persistedReducer = persistReducer<RootReducerType>(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions (safe & recommended)
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

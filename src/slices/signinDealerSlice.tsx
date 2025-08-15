import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SigninDealer, UpdateDealer } from "@/api/auth";

interface Dealer {
  _id: string;
  name: string;
  email: string;
  businessRegistrationNumber: string;
  phone: string;
  contactPerson?: string;
  address?: string;
  // profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginState {
  token: string | null;
  dealer: Dealer | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  token: null,
  dealer: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const loginDealerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("authToken");
      return initialState;
    },
    restoreSession: (state, action: PayloadAction<{ token: string }>) => {
      const dealerFromStorage = localStorage.getItem("dealerInfo");

      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.dealer = dealerFromStorage ? JSON.parse(dealerFromStorage) : null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SigninDealer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SigninDealer.fulfilled, (state, action) => {
        const { accessToken, accountType /*, signedProfileImage */ } = action.payload;
        state.loading = false;
        state.token = accessToken;
        state.dealer = {
          ...accountType,
          // profileImage: signedProfileImage || accountType.profileImage,
        };
        state.isAuthenticated = true;
        localStorage.setItem("authToken", accessToken);
        localStorage.setItem("dealerInfo", JSON.stringify(state.dealer));
      })
      .addCase(SigninDealer.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.isAuthenticated = false;
      })
      // .addCase(UpdateDealer.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(UpdateDealer.fulfilled, (state, action) => {
      //   const { account /*, signedProfileImage */ } = action.payload;
      //   state.loading = false;
      //   state.dealer = {
      //     ...account,
      //     // profileImage: signedProfileImage || account.profileImage,
      //   };
      //   localStorage.setItem("dealerInfo", JSON.stringify(state.dealer));
      // })
      // .addCase(UpdateDealer.rejected, (state, action: PayloadAction<any>) => {
      //   state.loading = false;
      //   state.error = action.payload || "Account update failed";
      // });
  },
});

export const { logout, restoreSession } = loginDealerSlice.actions;
export default loginDealerSlice;

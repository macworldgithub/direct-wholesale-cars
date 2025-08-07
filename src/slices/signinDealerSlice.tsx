import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SigninDealer } from "@/api/auth";

interface Dealer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  businessLicenseNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  accountType: string;
  profileImage: string;
  receiveUpdates: boolean;
  agreeTerms: boolean;
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
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SigninDealer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SigninDealer.fulfilled, (state, action) => {
        const { accessToken, accountType } = action.payload;
        state.loading = false;
        state.token = accessToken;
        state.dealer = accountType;
        state.isAuthenticated = true;
        localStorage.setItem("authToken", accessToken);
      })
      .addCase(SigninDealer.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.isAuthenticated = false;
      });
  },
});

export const { logout, restoreSession } = loginDealerSlice.actions;
export default loginDealerSlice;

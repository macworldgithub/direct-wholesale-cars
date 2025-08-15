import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SigninDealer } from "@/api/auth";

interface Dealer {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginState {
  token: string | null;
  dealer: Dealer | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const storedToken =
  typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
const storedDealer =
  typeof window !== "undefined" ? localStorage.getItem("dealerInfo") : null;

const initialState: LoginState = {
  token: storedToken,
  dealer: storedDealer ? JSON.parse(storedDealer) : null,
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
};

const loginDealerSlice = createSlice({
  name: "signinDealer",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("dealerInfo");
      return {
        token: null,
        dealer: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
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
        const { access_token, role, user } = action.payload;

        state.loading = false;
        state.token = access_token;
        state.dealer = {
          _id: user.id,
          name: user.name,
          email: user.email,
          role,
        };
        state.isAuthenticated = true;

        localStorage.setItem("authToken", access_token);
        localStorage.setItem("dealerInfo", JSON.stringify(state.dealer));
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

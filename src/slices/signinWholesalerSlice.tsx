import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SigninWholesaler } from "@/api/auth";

interface Wholesaler {
  _id: string;
  name: string;
  email: string;
  role: string;
  businessRegistrationNumber: string;
  address: string;
  phone: string;
  contactPerson: string;
}

interface LoginState {
  token: string | null;
  wholesaler: Wholesaler | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const storedToken =
  typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
const storedWholesaler =
  typeof window !== "undefined" ? localStorage.getItem("wholesalerInfo") : null;

const initialState: LoginState = {
  token: storedToken,
  wholesaler: storedWholesaler ? JSON.parse(storedWholesaler) : null,
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
};

const signinWholeSalerSlice = createSlice({
  name: "signinWholesaler",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("wholesalerInfo");
      return {
        token: null,
        wholesaler: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    },
    restoreSession: (state, action: PayloadAction<{ token: string }>) => {
      const wholesalerFromStorage = localStorage.getItem("wholesalerInfo");
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.wholesaler = wholesalerFromStorage
        ? JSON.parse(wholesalerFromStorage)
        : null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SigninWholesaler.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SigninWholesaler.fulfilled, (state, action) => {
        const { access_token, role, user } = action.payload;

        state.loading = false;
        state.token = access_token;
        state.wholesaler = {
          _id: user.id,
          name: user.name,
          email: user.email,
          businessRegistrationNumber: user.businessRegistrationNumber,
          address: user.address,
          phone: user.phone,
          contactPerson: user.contactPerson,
          role,
        };
        state.isAuthenticated = true;

        localStorage.setItem("authToken", access_token);
        localStorage.setItem(
          "wholesalerInfo",
          JSON.stringify(state.wholesaler)
        );
      })
      .addCase(
        SigninWholesaler.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload || "Login failed";
          state.isAuthenticated = false;
        }
      );
  },
});

export const { logout, restoreSession } = signinWholeSalerSlice.actions;
export default signinWholeSalerSlice;

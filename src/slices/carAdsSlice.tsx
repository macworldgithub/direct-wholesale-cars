import {
  createCarAd,
  fetchAllCarAds,
  fetchCarAdById,
  updateCarAd,
} from "@/api/cars";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CarAd {
  _id: string;
  title?: string;
  price: number;
  make?: string;
  model?: string;
  buildDate?: string;
  odometer?: number;
  condition?: "New" | "Used" | "Certified Pre-Owned";
  transmission?: string;
  driveType?: string;
  cyls?: number;
  seats?: number;
  fuelType?: "P" | "D" | "E" | "H";
  images?: string[];
  description?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  branch?: string;
  stockNumber?: string;
  bayNumber?: string;
  regoNumber?: string;
  vin?: string;
  engineNumber?: string;
  chassisNumber?: string;
  businessType?: "B2B" | "B2C";
}

export interface CreateCarAdRequest {
  title?: string;
  price: number;
  make?: string;
  model?: string;
  buildDate?: string;
  odometer?: number;
  condition?: "New" | "Used" | "Certified Pre-Owned";
  transmission?: string;
  driveType?: string;
  cyls?: number;
  seats?: number;
  fuelType?: "P" | "D" | "E" | "H";
  images?: string[];
  description?: string;
  dealer: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  branch?:
    | "W - WS VIC"
    | "W - WS QLD"
    | "W - WS SA"
    | "C - Corporate Buying"
    | "D - DG1911"
    | "W - WS Retail VIC";
  stockNumber?: string;
  bayNumber?: string;
  regoNumber?: string;
  vin?: string;
  engineNumber?: string;
  chassisNumber?: string;
  businessType?: string;
}

interface CarAdsState {
  ads: CarAd[];
  selectedAd: CarAd | null;
  loading: boolean;
  error: string | null;
}

const initialState: CarAdsState = {
  ads: [],
  selectedAd: null,
  loading: false,
  error: null,
};

const carAdsSlice = createSlice({
  name: "carAds",
  initialState,
  reducers: {
    clearSelectedAd: (state) => {
      state.selectedAd = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCarAds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllCarAds.fulfilled,
        (state, action: PayloadAction<CarAd[]>) => {
          state.loading = false;
          state.ads = action.payload;
        }
      )
      .addCase(fetchAllCarAds.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch car ads";
      })

      .addCase(fetchCarAdById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCarAdById.fulfilled,
        (state, action: PayloadAction<CarAd>) => {
          state.loading = false;
          state.selectedAd = action.payload;
        }
      )
      .addCase(fetchCarAdById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch car ad";
      })
      .addCase(createCarAd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCarAd.fulfilled, (state, action: PayloadAction<CarAd>) => {
        state.loading = false;
        state.ads.push(action.payload);
        state.selectedAd = action.payload;
      })
      .addCase(createCarAd.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to create car ad";
      })
      .addCase(updateCarAd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCarAd.fulfilled, (state, action: PayloadAction<CarAd>) => {
        state.loading = false;
        const idx = state.ads.findIndex((ad) => ad._id === action.payload._id);
        if (idx !== -1) {
          state.ads[idx] = action.payload;
        } else {
          state.ads.push(action.payload);
        }
        state.selectedAd = action.payload;
      })
      .addCase(updateCarAd.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to update car ad";
      });
  },
});

export const { clearSelectedAd } = carAdsSlice.actions;
export default carAdsSlice;

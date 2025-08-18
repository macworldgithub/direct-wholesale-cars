import {
  createCarAd,
  deleteCarAd,
  fetchAllCarAds,
  fetchCarAdById,
  updateCarAd,
  fetchCarsWithFilters,
  CarsApiResponse,
} from "@/api/cars";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CarAd {
  _id: string;
  wholesaler: string;
  branch: string;
  stock: string;
  bayNumber: string;
  description: string;
  odometer: number;
  buildDate: string;
  vin: string;
  driveType: string;
  fuelType: string;
  seats: number;
  regoDue: string;
  asking: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateCarAdRequest {
  wholesaler: string;
  branch: string;
  stock: string;
  bayNumber: string;
  description: string;
  odometer: number;
  buildDate: string;
  vin: string;
  driveType: string;
  fuelType: string;
  seats: number;
  regoDue: string;
  asking: number;
  available: boolean;
}

interface CarAdsState {
  ads: CarAd[];
  selectedAd: CarAd | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const initialState: CarAdsState = {
  ads: [],
  selectedAd: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  },
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
        (state, action: PayloadAction<CarsApiResponse>) => {
          state.loading = false;
          state.ads = action.payload.data;
          state.pagination = {
            page: action.payload.page,
            limit: action.payload.limit,
            total: action.payload.total,
            totalPages: action.payload.totalPages,
          };
        }
      )
      .addCase(fetchAllCarAds.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch car ads";
      })

      // Add fetchCarsWithFilters cases
      .addCase(fetchCarsWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCarsWithFilters.fulfilled,
        (state, action: PayloadAction<CarsApiResponse>) => {
          state.loading = false;
          state.ads = action.payload.data;
          state.pagination = {
            page: action.payload.page,
            limit: action.payload.limit,
            total: action.payload.total,
            totalPages: action.payload.totalPages,
          };
        }
      )
      .addCase(fetchCarsWithFilters.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch car ads with filters";
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
      })
      .addCase(deleteCarAd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteCarAd.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.ads = state.ads.filter((ad) => ad._id !== action.payload);
          if (state.selectedAd?._id === action.payload) {
            state.selectedAd = null;
          }
        }
      )
      .addCase(deleteCarAd.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete car ad";
      });
  },
});

export const { clearSelectedAd } = carAdsSlice.actions;
export default carAdsSlice;

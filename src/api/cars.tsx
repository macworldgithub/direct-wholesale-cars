import { BACKEND_URL } from "@/config/server";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface PresignedRequest {
  fileName: string;
  fileType: string;
  folder: string;
}

interface PresignedResponse {
  url: string;
  key: string;
}

export const getPresignedUrl = async (
  data: PresignedRequest
): Promise<PresignedResponse> => {
  const response = await axios.post<PresignedResponse>(
    `${BACKEND_URL}/ads/generate-presigned-url`,
    data
  );
  return response.data;
};

interface CreateCarAdRequest {
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

export const createCarAd = async (data: CreateCarAdRequest) => {
  const response = await axios.post(`${BACKEND_URL}/ads`, data);
  return response.data;
};

interface CarAd {
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

export const fetchAllCarAds = createAsyncThunk<
  CarAd[],
  void,
  { rejectValue: string }
>("ads/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<CarAd[]>(`${BACKEND_URL}/ads`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch car ads"
    );
  }
});

export const fetchCarAdById = createAsyncThunk<
  CarAd,
  string,
  { rejectValue: string }
>("ads/fetchById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<CarAd>(`${BACKEND_URL}/ads/${id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch car ad details"
    );
  }
});

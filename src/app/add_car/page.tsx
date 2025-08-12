"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import "./car_auction_form.scss";
import LocalizedButton from "@/components/UIComponents/LocalizedButton/LocalizedButton";
import LocalizedHeading from "@/components/UIComponents/LocalizedHeading/LocalizedHeading";
import LocalizedInput from "@/components/UIComponents/LocalizedInput/LocalizedInput";
import LocalizedTextArea from "@/components/UIComponents/LocalizedTextArea/LocalizedTextArea";
import Dropdown from "@/components/UIComponents/Dropdown/Dropdown";
import {
  createCarAd,
  fetchCarAdById,
  getPresignedUrl,
  updateCarAd,
} from "@/api/cars";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { City, State } from "country-state-city";
import Toast from "@/components/UIComponents/Toast/Toast";
import { showLoader } from "@/slices/loaderSlice";
import { useSearchParams } from "next/navigation";
import { clearSelectedAd } from "@/slices/carAdsSlice";

interface FormData {
  title?: string;
  price: string;
  make?: string;
  model?: string;
  buildDate?: string;
  odometer?: string;
  condition?: "New" | "Used" | "Certified Pre-Owned";
  transmission?: string;
  driveType?: string;
  cyls?: string;
  seats?: string;
  fuelType?: "P" | "D" | "E" | "H";
  images?: string[];
  description?: string;
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
  businessType?: "B2B" | "B2C";
  imageKeys: string[];
}

const CarAuctionForm: React.FC = () => {
  const { handleSubmit, control, setValue, watch, reset } = useForm<FormData>({
    defaultValues: {
      condition: "Used",
      country: "Australia",
      businessType: "B2C",
      imageKeys: [],
    },
  });
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const adId = searchParams?.get("id") || undefined;
  console.log(adId, "adId from search params");

  const dealer = useSelector((state: RootState) => state.SignuinDealer.dealer);
  const selectedAd = useSelector((state: RootState) => state.carAds.selectedAd);
  console.log(selectedAd);
  const isEditMode = Boolean(adId);
  console.log(isEditMode, "isEditMode");

  useEffect(() => {
    if (adId) {
      dispatch(fetchCarAdById(adId));
    } else {
      dispatch(clearSelectedAd());
    }
  }, [adId, dispatch]);

  useEffect(() => {
    if (isEditMode && selectedAd) {
      reset({
        ...selectedAd,
        price: selectedAd.price.toString(),
        odometer: selectedAd.odometer?.toString(),
        cyls: selectedAd.cyls?.toString(),
        seats: selectedAd.seats?.toString(),
        imageKeys: selectedAd.images || [],
        branch: selectedAd.branch as
          | "W - WS VIC"
          | "W - WS QLD"
          | "W - WS SA"
          | "C - Corporate Buying"
          | "D - DG1911"
          | "W - WS Retail VIC"
          | undefined,
      });
    }
  }, [selectedAd, isEditMode, reset]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageKeys, setImageKeys] = useState<string[]>([]);
  const [stateOptions, setStateOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [cityOptions, setCityOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [toastOpen, setToastOpen] = useState(false);

  const selectedState = watch("state");
  const MAX_IMAGES = 15;

  const handleImageSelection = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files).slice(
      0,
      MAX_IMAGES - imageKeys.length
    );

    const newPreviews: string[] = [];
    const newKeys: string[] = [];

    for (const file of selectedFiles) {
      try {
        const { url, key } = await getPresignedUrl({
          fileName: file.name,
          fileType: file.type,
          folder: "cars",
        });

        await axios.put(url, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        newPreviews.push(URL.createObjectURL(file));
        newKeys.push(key);
      } catch (error) {
        console.error("S3 upload error:", error);
      }
    }

    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setImageKeys((prev) => {
      const updated = [...prev, ...newKeys];
      setValue("imageKeys", updated);
      return updated;
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = (index: number) => {
    const updatedPreviews = [...imagePreviews];
    const updatedKeys = [...imageKeys];

    updatedPreviews.splice(index, 1);
    updatedKeys.splice(index, 1);

    setImagePreviews(updatedPreviews);
    setImageKeys(updatedKeys);
    setValue("imageKeys", updatedKeys);
  };

  useEffect(() => {
    const states = State.getStatesOfCountry("AU").map((s) => ({
      label: s.name,
      value: s.isoCode,
    }));
    setStateOptions(states);
  }, []);

  useEffect(() => {
    if (selectedState) {
      const cities = City.getCitiesOfState("AU", selectedState).map((c) => ({
        label: c.name,
        value: c.name,
      }));
      setCityOptions(cities);
      setValue("city", ""); // Reset city when state changes
    } else {
      setCityOptions([]);
    }
  }, [selectedState, setValue]);

  useEffect(() => {
    if (selectedAd && adId) {
      reset({
        ...selectedAd,
        price: selectedAd.price.toString(),
        odometer: selectedAd.odometer?.toString(),
        cyls: selectedAd.cyls?.toString(),
        seats: selectedAd.seats?.toString(),
        // imageKeys: selectedAd.images || [],
        branch: selectedAd.branch as
          | "W - WS VIC"
          | "W - WS QLD"
          | "W - WS SA"
          | "C - Corporate Buying"
          | "D - DG1911"
          | "W - WS Retail VIC"
          | undefined,
      });
      setImagePreviews(selectedAd.images || []);
      setImageKeys(selectedAd.images || []);
    }
  }, [selectedAd, adId, reset]);

  const onSubmit = async (data: FormData) => {
    if (!dealer?._id) {
      console.error("Dealer not logged in");
      return;
    }

    const cleanImageKeys = imageKeys.map((url) => {
      try {
        const parsedUrl = new URL(url);
        return parsedUrl.pathname.startsWith("/")
          ? parsedUrl.pathname.slice(1)
          : parsedUrl.pathname;
      } catch {
        return url;
      }
    });

    const payload = {
      title: data.title,
      price: Number(data.price),
      make: data.make,
      model: data.model,
      buildDate: data.buildDate,
      odometer: data.odometer ? Number(data.odometer) : undefined,
      condition: data.condition,
      transmission: data.transmission || undefined,
      driveType: data.driveType || undefined,
      cyls: data.cyls ? Number(data.cyls) : undefined,
      seats: data.seats ? Number(data.seats) : undefined,
      fuelType: data.fuelType,
      images: cleanImageKeys,
      description: data.description || "",
      dealer: dealer._id,
      street: data.street,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode || undefined,
      country: "Australia",
      branch: data.branch,
      stockNumber: data.stockNumber,
      bayNumber: data.bayNumber,
      regoNumber: data.regoNumber,
      vin: data.vin,
      engineNumber: data.engineNumber,
      chassisNumber: data.chassisNumber,
      businessType: "B2C",
    };

    try {
      if (adId) {
        await dispatch(updateCarAd({ id: adId, data: payload }));
      } else {
        await dispatch(createCarAd(payload));
      }
      reset();
      setToastOpen(true);
      setTimeout(() => {
        dispatch(showLoader());
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error submitting ad:", error);
    }
  };

  const fuelOptions = [
    { label: "Petrol", value: "P" },
    { label: "Diesel", value: "D" },
    { label: "Electric", value: "E" },
    { label: "Hybrid", value: "H" },
  ];

  const conditionOptions = [
    { label: "New", value: "New" },
    { label: "Used", value: "Used" },
    { label: "Certified Pre-Owned", value: "Certified Pre-Owned" },
  ];

  const businessTypeOptions = [
    { label: "B2B", value: "B2B" },
    { label: "B2C", value: "B2C" },
  ];

  const branchOptions = [
    { label: "W - WS VIC", value: "W - WS VIC" },
    { label: "W - WS QLD", value: "W - WS QLD" },
    { label: "W - WS SA", value: "W - WS SA" },
    { label: "C - Corporate Buying", value: "C - Corporate Buying" },
    { label: "D - DG1911", value: "D - DG1911" },
    { label: "W - WS Retail VIC", value: "W - WS Retail VIC" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="car-auction-form">
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <LocalizedInput {...field} label="Title" value={field.value ?? ""} />
        )}
      />
      <Controller
        name="price"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <LocalizedInput {...field} label="Price" required type="number" />
        )}
      />
      <Controller
        name="make"
        control={control}
        render={({ field }) => (
          <LocalizedInput {...field} label="Make" value={field.value ?? ""} />
        )}
      />
      <Controller
        name="model"
        control={control}
        render={({ field }) => (
          <LocalizedInput {...field} label="Model" value={field.value ?? ""} />
        )}
      />
      <Controller
        name="buildDate"
        control={control}
        render={({ field }) => (
          <LocalizedInput
            {...field}
            label="Build Date"
            placeholderKey="YYYY-MM"
            value={field.value ?? ""}
          />
        )}
      />
      <Controller
        name="odometer"
        control={control}
        render={({ field }) => (
          <LocalizedInput
            {...field}
            label="Odometer"
            type="number"
            value={field.value ?? ""}
          />
        )}
      />
      <Controller
        name="condition"
        control={control}
        render={({ field }) => (
          <Dropdown
            {...field}
            label="Condition"
            options={conditionOptions}
            value={field.value ?? ""}
          />
        )}
      />
      <Controller
        name="transmission"
        control={control}
        render={({ field }) => (
          <LocalizedInput
            {...field}
            label="Transmission"
            value={field.value ?? ""}
          />
        )}
      />
      <Controller
        name="driveType"
        control={control}
        render={({ field }) => (
          <LocalizedInput
            {...field}
            label="Drive Type"
            value={field.value ?? ""}
          />
        )}
      />
      <Controller
        name="cyls"
        control={control}
        render={({ field }) => (
          <LocalizedInput
            {...field}
            label="Cylinders"
            type="number"
            value={field.value ?? ""}
          />
        )}
      />
      <Controller
        name="seats"
        control={control}
        render={({ field }) => (
          <LocalizedInput
            {...field}
            label="Seats"
            type="number"
            value={field.value ?? ""}
          />
        )}
      />
      <Controller
        name="fuelType"
        control={control}
        render={({ field }) => (
          <Dropdown
            {...field}
            label="Fuel Type"
            options={fuelOptions}
            value={field.value ?? ""}
          />
        )}
      />
      <Controller
        name="branch"
        control={control}
        render={({ field }) => (
          <Dropdown
            {...field}
            label="Branch"
            options={branchOptions}
            value={field.value ?? ""}
          />
        )}
      />
      <Controller
        name="stockNumber"
        control={control}
        render={({ field }) => (
          <LocalizedInput
            {...field}
            label="Stock #"
            value={field.value ?? ""}
          />
        )}
      />
      <Controller
        name="bayNumber"
        control={control}
        render={({ field }) => (
          <LocalizedInput {...field} label="Bay #" value={field.value ?? ""} />
        )}
      />
      <Controller
        name="regoNumber"
        control={control}
        render={({ field }) => (
          <LocalizedInput {...field} label="Rego #" value={field.value ?? ""} />
        )}
      />
      <Controller
        name="vin"
        control={control}
        render={({ field }) => (
          <LocalizedInput {...field} label="VIN" value={field.value ?? ""} />
        )}
      />
      <Controller
        name="engineNumber"
        control={control}
        render={({ field }) => (
          <LocalizedInput
            {...field}
            label="Engine #"
            value={field.value ?? ""}
          />
        )}
      />
      <Controller
        name="chassisNumber"
        control={control}
        render={({ field }) => (
          <LocalizedInput
            {...field}
            label="Chassis #"
            value={field.value ?? ""}
          />
        )}
      />
      <Controller
        name="businessType"
        control={control}
        render={({ field }) => (
          <Dropdown
            {...field}
            label="Business Type"
            value="B2C"
            options={businessTypeOptions}
            disabled
          />
        )}
      />

      <LocalizedHeading heading="Address" level={6} />
      <Controller
        name="street"
        control={control}
        render={({ field }) => (
          <LocalizedInput {...field} label="Street" value={field.value ?? ""} />
        )}
      />
      <Controller
        name="state"
        control={control}
        render={({ field }) => (
          <Dropdown
            {...field}
            label="State"
            options={stateOptions}
            value={field.value ?? ""}
          />
        )}
      />
      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <Dropdown
            {...field}
            label="City"
            options={cityOptions}
            value={field.value ?? ""}
          />
        )}
      />
      <Controller
        name="zipCode"
        control={control}
        render={({ field }) => (
          <LocalizedInput
            {...field}
            label="Zip Code"
            value={field.value ?? ""}
          />
        )}
      />
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <LocalizedInput
            {...field}
            label="Country"
            value="Australia"
            disabled
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <LocalizedTextArea
            {...field}
            value={field.value ?? ""}
            placeholderKey="Describe the vehicle condition, history, etc."
          />
        )}
      />
      <LocalizedButton
        label="Upload Images"
        onClick={() => fileInputRef.current?.click()}
        size="sm"
        className="upload-image-button"
      />
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleImageSelection}
        style={{ display: "none" }}
      />
      {/* Previews */}
      {imagePreviews.length > 0 && (
        <div className="uploaded-image-preview">
          <label>Images:</label>
          <div className="image-grid">
            {imagePreviews.map((src, index) => (
              <div className="image-wrapper" key={index}>
                <img src={src} alt={`Uploaded ${index}`} />
                <button
                  type="button"
                  className="remove-image-button"
                  onClick={() => handleRemoveImage(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <LocalizedButton
        type="submit"
        label={isEditMode ? "Update Car Ad" : "Create Car Ad"}
        variant="filled"
        size="sm"
        className="submit-button"
      />

      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message={
          isEditMode
            ? "Car ad updated successfully!"
            : "Car ad created successfully!"
        }
        severity="success"
      />
    </form>
  );
};

export default CarAuctionForm;

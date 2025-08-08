"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import "./car_auction_form.scss";
import LocalizedButton from "@/components/UIComponents/LocalizedButton/LocalizedButton";
import LocalizedHeading from "@/components/UIComponents/LocalizedHeading/LocalizedHeading";
import LocalizedInput from "@/components/UIComponents/LocalizedInput/LocalizedInput";
import LocalizedTextArea from "@/components/UIComponents/LocalizedTextArea/LocalizedTextArea";
import Dropdown from "@/components/UIComponents/Dropdown/Dropdown";
import { createCarAd, getPresignedUrl } from "@/api/cars";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { City, State } from "country-state-city";
import Toast from "@/components/UIComponents/Toast/Toast";
import { useRouter } from "next/navigation";
import { hideLoader, showLoader } from "@/slices/loaderSlice";

interface FormData {
  title: string;
  make: string;
  model: string;
  year: string;
  mileage: string;
  price: string;
  condition: string;
  transmission: string;
  fuelType: string;
  description: string;

  street: string;
  city: string;
  state: string;
  zipCode?: string;
  country?: string;

  imageKeys: string[];
}

const CarAuctionForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      condition: "Used",
      country: "Australia",
      imageKeys: [],
    },
  });
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const dealer = useSelector((state: RootState) => state.SignuinDealer.dealer);
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

  const onSubmit = async (data: FormData) => {
    if (!dealer?._id) {
      console.error("Dealer not logged in");
      return;
    }

    try {
      dispatch(showLoader());

      const payload = {
        title: data.title,
        price: Number(data.price),
        make: data.make,
        model: data.model,
        year: Number(data.year),
        mileage: data.mileage ? Number(data.mileage) : undefined,
        condition: data.condition,
        transmission: data.transmission || undefined,
        fuelType: data.fuelType || undefined,
        images: imageKeys,
        description: data.description || "",
        dealer: dealer._id,
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode || undefined,
        country: "Australia",
      };

      await createCarAd(payload);

      setToastOpen(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error creating ad:", error);
    } finally {
      dispatch(hideLoader());
    }
  };

  // Dropdown options
  const fuelOptions = [
    { label: "Petrol", value: "Petrol" },
    { label: "Diesel", value: "Diesel" },
    { label: "Electric", value: "Electric" },
    { label: "Hybrid", value: "Hybrid" },
  ];

  const conditionOptions = [
    { label: "New", value: "New" },
    { label: "Used", value: "Used" },
    { label: "Certified Pre-Owned", value: "Certified Pre-Owned" },
  ];

  const transmissionOptions = [
    { label: "Automatic", value: "Automatic" },
    { label: "Manual", value: "Manual" },
    { label: "CVT", value: "CVT" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="car-auction-form">
      <LocalizedHeading heading="Add a Car" level={5} />
      {/* Form Fields */}
      <Controller
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <LocalizedInput {...field} label="Title" required />
        )}
      />
      <Controller
        name="make"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <LocalizedInput {...field} label="Make" required />
        )}
      />
      <Controller
        name="model"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <LocalizedInput {...field} label="Model" required />
        )}
      />
      <Controller
        name="year"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <LocalizedInput {...field} label="Year" type="number" required />
        )}
      />
      <Controller
        name="mileage"
        control={control}
        render={({ field }) => (
          <LocalizedInput {...field} label="Mileage (km)" />
        )}
      />
      <Controller
        name="price"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <LocalizedInput {...field} label="Price" required />
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
            required
          />
        )}
      />
      <Controller
        name="transmission"
        control={control}
        render={({ field }) => (
          <Dropdown
            {...field}
            label="Transmission"
            options={transmissionOptions}
          />
        )}
      />
      <Controller
        name="fuelType"
        control={control}
        render={({ field }) => (
          <Dropdown {...field} label="Fuel Type" options={fuelOptions} />
        )}
      />
      <LocalizedHeading heading="Address" level={6} />
      <Controller
        name="street"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <LocalizedInput {...field} label="Street" required />
        )}
      />
      <Controller
        name="state"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Dropdown {...field} label="State" options={stateOptions} required />
        )}
      />
      <Controller
        name="city"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Dropdown {...field} label="City" options={cityOptions} required />
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
            placeholderKey="Describe the vehicle condition, history, etc."
          />
        )}
      />
      {/* Upload Button */}
      <LocalizedButton
        label="Upload Images"
        onClick={() => fileInputRef.current?.click()}
        size="sm"
        className="upload-image-button"
      />
      {/* Hidden Input */}
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
        label="Submit Listing"
        variant="filled"
        size="sm"
        className="submit-button"
      />
      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message="Car ad created successfully!"
        severity="success"
      />
    </form>
  );
};

export default CarAuctionForm;

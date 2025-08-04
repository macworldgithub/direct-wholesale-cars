"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";

import "./car_auction_form.scss";
import Dropdown from "@/components/UIComponents/Dropdown/Dropdown";
import LocalizedButton from "@/components/UIComponents/LocalizedButton/LocalizedButton";
import LocalizedCheckbox from "@/components/UIComponents/LocalizedCheckbox/LocalizedCheckbox";
import LocalizedHeading from "@/components/UIComponents/LocalizedHeading/LocalizedHeading";
import LocalizedInput from "@/components/UIComponents/LocalizedInput/LocalizedInput";
import LocalizedTextArea from "@/components/UIComponents/LocalizedTextArea/LocalizedTextArea";

interface FormData {
  makeModel: string;
  year: string;
  priceRange: string;
  location: string;
  mileage: string;
  fuelType: string;
  color: string;
  condition: string;
  transmission: string;
  driveType: string;
  startingBid: string;
  reservePrice: string;
  description: string;
  serviceHistory: boolean;
  rcAvailable: boolean;
  insuranceValid: boolean;
  pollutionCert: boolean;
}

const CarAuctionForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      condition: "used",
      fuelType: "",
      transmission: "",
      driveType: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  const fuelOptions = [
    { label: "Petrol", value: "petrol" },
    { label: "Diesel", value: "diesel" },
    { label: "Electric", value: "electric" },
    { label: "Hybrid", value: "hybrid" },
  ];

  const conditionOptions = [
    { label: "New", value: "new" },
    { label: "Used", value: "used" },
    { label: "Certified Pre-Owned", value: "certified" },
  ];

  const transmissionOptions = [
    { label: "Automatic", value: "automatic" },
    { label: "Manual", value: "manual" },
    { label: "CVT", value: "cvt" },
  ];

  const driveTypeOptions = [
    { label: "FWD", value: "fwd" },
    { label: "RWD", value: "rwd" },
    { label: "AWD", value: "awd" },
    { label: "4WD", value: "4wd" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="car-auction-form">
      <LocalizedHeading heading="Add a Car" level={5} />

      <Controller
        name="makeModel"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <LocalizedInput {...field} label="Make & Model" required />
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
        name="priceRange"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <LocalizedInput {...field} label="Expected Price Range" required />
        )}
      />

      <Controller
        name="location"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <LocalizedInput {...field} label="Location" required />
        )}
      />

      <Controller
        name="mileage"
        control={control}
        render={({ field }) => (
          <LocalizedInput {...field} label="Mileage (e.g., 45,000 km)" />
        )}
      />

      <Controller
        name="fuelType"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Dropdown
            {...field}
            label="Fuel Type"
            options={fuelOptions}
            required
          />
        )}
      />

      <Controller
        name="color"
        control={control}
        render={({ field }) => (
          <LocalizedInput {...field} label="Color" />
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
        name="driveType"
        control={control}
        render={({ field }) => (
          <Dropdown
            {...field}
            label="Drive Type"
            options={driveTypeOptions}
          />
        )}
      />

      <Controller
        name="startingBid"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <LocalizedInput {...field} label="Starting Bid Price" required />
        )}
      />

      <Controller
        name="reservePrice"
        control={control}
        render={({ field }) => (
          <LocalizedInput {...field} label="Reserve Price (optional)" />
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

      <div className="form-checkboxes">
        <Controller
          name="serviceHistory"
          control={control}
          render={({ field }) => (
            <LocalizedCheckbox
              name="serviceHistory"
              checked={field.value}
              onChange={field.onChange}
              labelKey="Service History Available"
            />
          )}
        />

        <Controller
          name="rcAvailable"
          control={control}
          render={({ field }) => (
            <LocalizedCheckbox
              name="rcAvailable"
              checked={field.value}
              onChange={field.onChange}
              labelKey="RC Available"
            />
          )}
        />

        <Controller
          name="insuranceValid"
          control={control}
          render={({ field }) => (
            <LocalizedCheckbox
              name="insuranceValid"
              checked={field.value}
              onChange={field.onChange}
              labelKey="Insurance Valid"
            />
          )}
        />

        <Controller
          name="pollutionCert"
          control={control}
          render={({ field }) => (
            <LocalizedCheckbox
              name="pollutionCert"
              checked={field.value}
              onChange={field.onChange}
              labelKey="Pollution Certificate Valid"
            />
          )}
        />
      </div>

      <LocalizedButton
        type="submit"
        label="Submit Listing"
        variant="filled-and-uppercase"
        size="lg"
        className="submit-button"
      />
    </form>
  );
};

export default CarAuctionForm;

"use client";

import React, { useState, Suspense } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Grid,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CarAuctionForm from "../add_car/page";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const dealer = useSelector((state: RootState) => state.SignuinDealer.dealer);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", padding: 4 }}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
        sx={{
          "& .MuiTab-root": {
            textTransform: "capitalize",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontSize: "1rem",
            color: "#555",
          },
          "& .Mui-selected": {
            color: "#1801b4 !important",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#1801b4",
          },
        }}
      >
        <Tab label="Profile" />
        <Tab label="Add a Car" />
      </Tabs>

      <Box sx={{ mt: 4 }}>
        {selectedTab === 0 && dealer && (
          <Box sx={{ maxWidth: 900, mx: "auto", p: 4 }}>
            <Box display="flex" justifyContent="center" mb={5}>
              <Avatar
                src={dealer.profileImage}
                alt="Profile"
                sx={{ width: 120, height: 120, boxShadow: 3 }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                justifyContent: "space-between",
                backgroundColor: "#fafafa",
                borderRadius: 2,
                p: 4,
                boxShadow: 2,
              }}
            >
              {[
                { label: "First Name", value: dealer.firstName },
                { label: "Last Name", value: dealer.lastName },
                { label: "Email", value: dealer.email },
                { label: "Phone", value: dealer.phone },
                { label: "Business Name", value: dealer.businessName },
                { label: "Business Type", value: dealer.businessType },
                {
                  label: "License Number",
                  value: dealer.businessLicenseNumber,
                },
                { label: "City", value: dealer.city },
                { label: "State", value: dealer.state },
                { label: "Zip Code", value: dealer.zipCode },
                { label: "Account Type", value: dealer.accountType },
              ].map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    flex: "1 1 42%",
                    minWidth: 250,
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, color: "text.secondary", mb: 0.5 }}
                  >
                    {item.label}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.primary" }}>
                    {item.value || "N/A"}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box display="flex" justifyContent="center" mt={4}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1801b4",
                  textTransform: "capitalize",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#140191",
                  },
                }}
                onClick={() => {
                  console.log("Update Profile clicked");
                }}
              >
                update profile
              </Button>
            </Box>
          </Box>
        )}

        {selectedTab === 1 && (
          <Suspense fallback={<CircularProgress />}>
            <CarAuctionForm />
          </Suspense>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;

"use client";

import React, { useState, Suspense } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
// import CarAuctionForm from "../add_car/page";
import { useRouter } from "next/navigation";
import CarListing from "@/components/AppComponents/CarListing/CarListing";

const Dashboard = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);

  // Unified: get logged-in user from either dealer or wholesaler slice
  const user = useSelector(
    (state: RootState) =>
      state.SignuinDealer?.dealer || state.SigninWholesaler?.wholesaler
  );

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
        {user?.role === "dealer" && <Tab label="Add a Car" />}
        {user?.role === "dealer" && <Tab label="Car Listing" />}
      </Tabs>

      <Box sx={{ mt: 4 }}>
        {selectedTab === 0 && user && (
          <Box sx={{ maxWidth: 900, mx: "auto", p: 4 }}>
            <Box display="flex" justifyContent="center" mb={5}>
              <Avatar
                src="images/default-avatar.png"
                alt="Profile"
                sx={{ width: 120, height: 120, boxShadow: 3 }}
              />
            </Box>

            <Box
              sx={{
                backgroundColor: "#fafafa",
                borderRadius: 2,
                p: 4,
                boxShadow: 2,
              }}
            >
              <Box display="flex" mb={4}>
                {user.role === "dealer" && (
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
                      router.push("/signup");
                    }}
                  >
                    update profile
                  </Button>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                {[
                  { label: "Name", value: user.name },
                  { label: "Email", value: user.email },
                  // { label: "Phone", value: user.phone },
                  // { label: "Business Registration Number", value: user.businessRegistrationNumber },
                  // { label: "Contact Person", value: user.contactPerson },
                  // { label: "Address", value: user.address },
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
                      sx={{
                        fontWeight: 600,
                        color: "text.secondary",
                        mb: 0.5,
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "text.primary" }}>
                      {item.value || "N/A"}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}

        {selectedTab === 1 && user?.role === "dealer" && (
          <Suspense fallback={<CircularProgress />}>
            {/* <CarAuctionForm /> */}
          </Suspense>
        )}
        {selectedTab === 2 && user?.role === "dealer" && (
          <Suspense fallback={<CircularProgress />}>
            <CarListing />
          </Suspense>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;

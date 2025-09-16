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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import CarAuctionForm from "../add_car/page";
import { useRouter } from "next/navigation";
import CarListing from "@/components/AppComponents/CarListing/CarListing";

import Popup from "@/components/UIComponents/Popup/Popup";
import PasswordForm from "@/components/AppComponents/PasswordForm/PasswordForm";
import { deleteAllCarsByWholesaler } from "@/api/cars";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);

  const dealer = useSelector((state: RootState) => state.SignuinDealer?.dealer);
  const wholesaler = useSelector(
    (state: RootState) => state.SigninWholesaler?.wholesaler
  );

  const user = dealer || wholesaler;
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const openUpdatePopup = () => setIsUpdateOpen(true);
  const closeUpdatePopup = () => setIsUpdateOpen(false);

  const handleRemoveAll = async () => {
    if (!wholesaler?._id) return;

    const result = await dispatch(
      deleteAllCarsByWholesaler({ wholesalerId: wholesaler._id })
    );

    if (deleteAllCarsByWholesaler.fulfilled.match(result)) {
      alert(result.payload.message);
    } else {
      alert("Failed to delete cars");
    }
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
        {user?.role === "wholesaler" && <Tab label="Add a Car" />}
        {/* {user?.role === "wholesaler" && <Tab label="Car Listing" />} */}
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
              <Box display="flex" gap={2} mb={4}>
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
                    Update Profile
                  </Button>
                )}

                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#1801b4",
                    color: "#1801b4",
                    textTransform: "capitalize",
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    "&:hover": {
                      borderColor: "#140191",
                      color: "#140191",
                    },
                  }}
                  onClick={openUpdatePopup}
                >
                  Update Password
                </Button>
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
                  {
                    label: "Business Registration Number",
                    value: user.businessRegistrationNumber,
                  },
                  { label: "Address", value: user.address },
                  { label: "Phone Number", value: user.phone },
                  { label: "Contact Person", value: user.contactPerson },
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

            <Popup
              isOpen={isUpdateOpen}
              onClose={closeUpdatePopup}
              title="Update Password"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                onSubmit={(e) => e.stopPropagation()}
              >
                <PasswordForm
                  mode="update"
                  role={user.role as "dealer" | "wholesaler"}
                />
              </div>
            </Popup>
          </Box>
        )}
        {selectedTab === 2 && user?.role === "wholesaler" && (
          <Suspense fallback={<CircularProgress />}>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              {wholesaler?._id && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleRemoveAll}
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: 600,
                    borderRadius: 2,
                  }}
                >
                  Remove All
                </Button>
              )}
            </Box>
          </Suspense>
        )}

        {selectedTab === 1 && user?.role === "wholesaler" && (
          <Suspense fallback={<CircularProgress />}>
            <CarAuctionForm />
          </Suspense>
        )}
        {selectedTab === 2 && user?.role === "wholesaler" && (
          <Suspense fallback={<CircularProgress />}>
            <CarListing />
          </Suspense>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;

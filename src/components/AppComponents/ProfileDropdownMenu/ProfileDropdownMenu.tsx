"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Tooltip,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { AppDispatch, RootState } from "@/store/store";
import { logout } from "@/slices/signinDealerSlice";

const ProfileDropdownMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dealer = useSelector((state: RootState) => state.SignuinDealer.dealer);

  const profileImageSrc = React.useMemo(() => {
    if (dealer?.profileImage?.startsWith("http")) {
      return dealer.profileImage;
    }
    return "/images/default-avatar.png";
  }, [dealer]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    router.push("/login");
  };

  const goToDashboard = () => {
    handleMenuClose();
    router.push("/dashboard");
  };

  return (
    <>
      <Tooltip title="Profile">
        <IconButton onClick={handleMenuOpen} size="medium">
          <Avatar
            alt={dealer?.firstName || "User"}
            src={profileImageSrc}
            sx={{ width: 65, height: 65 }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{ mt: 1 }}
        PaperProps={{
          elevation: 4,
          sx: {
            borderRadius: 2,
            minWidth: 230,
            padding: 1,
          },
        }}
      >
        <Box display="flex" alignItems="center" px={1.5} py={1}>
          <Avatar
            alt={dealer?.firstName || "User"}
            src={profileImageSrc}
            sx={{ width: 56, height: 56, mr: 1.5 }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {dealer?.firstName} {dealer?.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {dealer?.email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Actions */}
        <MenuItem onClick={goToDashboard}>Dashboard</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileDropdownMenu;

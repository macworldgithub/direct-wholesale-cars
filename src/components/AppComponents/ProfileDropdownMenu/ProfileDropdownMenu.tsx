"use client";

import React, { useState, useMemo } from "react";
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
import { logout as dealerLogout } from "@/slices/signinDealerSlice";
import { logout as wholesalerLogout } from "@/slices/signinWholesalerSlice";

const ProfileDropdownMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dealer = useSelector((state: RootState) => state.SignuinDealer.dealer);
  const wholesaler = useSelector(
    (state: RootState) => state.SigninWholesaler.wholesaler
  );
  console.log(wholesaler, "wholesaler");
  const user = dealer || wholesaler;
  const userType = dealer ? "dealer" : wholesaler ? "wholesaler" : null;

  const profileImageSrc = useMemo(() => {
    // if (user?.profileImage?.startsWith("http")) {
    //   return user.profileImage;
    // }
    return "/images/default-avatar.png";
  }, [user]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (userType === "dealer") {
      dispatch(dealerLogout());
    } else if (userType === "wholesaler") {
      dispatch(wholesalerLogout());
    }
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
            alt={user?.name || "User"}
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
            alt={user?.name || "User"}
            src={profileImageSrc}
            sx={{ width: 56, height: 56, mr: 1.5 }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {user?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
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

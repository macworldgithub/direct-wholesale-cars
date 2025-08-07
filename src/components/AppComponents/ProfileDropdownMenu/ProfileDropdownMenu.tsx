"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Menu, MenuItem, IconButton, Avatar, Tooltip } from "@mui/material";
import { AppDispatch } from "@/store/store";
import { logout } from "@/slices/signinDealerSlice";

const ProfileDropdownMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
        <IconButton onClick={handleMenuOpen} size="small">
          <Avatar alt="User Avatar" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={goToDashboard}>Dashboard</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileDropdownMenu;

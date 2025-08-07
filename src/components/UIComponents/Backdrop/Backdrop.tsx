"use client";

import React from "react";
import { Box, useTheme } from "@mui/material";

interface BackdropProps {
  active?: boolean;
  children?: React.ReactNode;
}

export const Backdrop: React.FC<BackdropProps> = ({ active = false, children }) => {
  const theme = useTheme();

  if (!active) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: theme.zIndex.modal, 
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        backgroundColor: "rgba(128, 128, 128, 0.1)", 
      }}
    >
      {children}
    </Box>
  );
};

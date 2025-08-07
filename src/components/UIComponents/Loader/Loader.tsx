"use client";

import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { Backdrop } from "../Backdrop/Backdrop";

export const Loader: React.FC = () => {
  return (
    <Backdrop active={true}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "& svg": {
            fill: "#1801b4",
          },
        }}
      >
        <CircularProgress size={60} thickness={4.5} sx={{ color: "#1801b4" }} />
      </Box>
    </Backdrop>
  );
};

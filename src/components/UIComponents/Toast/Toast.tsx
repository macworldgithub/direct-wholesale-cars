import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface ToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: "success" | "info" | "warning" | "error";
  autoHideDuration?: number;
}

const Toast: React.FC<ToastProps> = ({
  open,
  onClose,
  message,
  severity = "success",
  autoHideDuration = 3000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;

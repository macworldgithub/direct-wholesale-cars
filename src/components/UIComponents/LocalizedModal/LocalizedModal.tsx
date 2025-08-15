"use client";

import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Fade,
  Backdrop,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type CustomModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actionButtonText?: string;
  onActionClick?: () => void;
};

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 420,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  children,
  actionButtonText,
  onActionClick,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>

          {title && (
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {title}
            </Typography>
          )}

          <Box sx={{ mb: 3 }}>{children}</Box>

          {actionButtonText && onActionClick && (
            <Button
              variant="contained"
              onClick={onActionClick}
              sx={{
                backgroundColor: "#1801b4",
                textTransform: "capitalize",
                fontFamily: "Poppins, sans-serif",
                "&:hover": {
                  backgroundColor: "#140099", 
                },
              }}
            >
              {actionButtonText}
            </Button>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;

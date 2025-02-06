import React from "react";
import { Button, CircularProgress } from "@mui/material";

const CustomButton = ({
  title = "Button",
  variant = "contained",
  color = "primary",
  size = "medium",
  fullWidth = false,
  startIcon,
  endIcon,
  disabled = false,
  loading = false,
  sx = {},
  onClick,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      startIcon={!loading ? startIcon : null}
      {...props}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : title}
    </Button>
  );
};

export default CustomButton;

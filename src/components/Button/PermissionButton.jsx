import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const PermissionButton = ({
  label,
  variant,
  onClick,
  startIcon,
  allowedUserTypes,
  disabledUserTypes = [],
}) => {
  const userType = useSelector((state) => state?.user?.userType);

  if (!allowedUserTypes?.includes(userType) && !disabledUserTypes?.length) {
    return null;
  }

  const isDisabled = disabledUserTypes?.includes(userType);

  if (isDisabled && !disabledUserTypes?.length) {
    return null;
  }

  return (
    <Button
      variant={variant}
      onClick={onClick}
      startIcon={startIcon ? startIcon : null}
      disabled={isDisabled}
    >
      {label}
    </Button>
  );
};

export default PermissionButton;

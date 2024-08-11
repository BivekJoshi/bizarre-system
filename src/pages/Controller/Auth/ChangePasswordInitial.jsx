import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockPersonRoundedIcon from "@mui/icons-material/LockPersonRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useChangePasswordForm } from "../../../hooks/user/User/useChangePasswordForm";

const ChangePasswordInitial = () => {
  const theme = useTheme();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { formik, loading } = useChangePasswordForm();

  const { newPassword } = formik.values;

  const isUpperCasePresent = /[A-Z]/.test(newPassword);
  const isLowerCasePresent = /[a-z]/.test(newPassword);
  const isNumberPresent = /[0-9]/.test(newPassword);
  const isSpecialCharPresent = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const isMinLength = newPassword.length >= 8;

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const handleClose = () => {
    formik.handleReset();
  };

  const renderValidationIcon = (condition) => {
    return condition ? (
      <CheckCircleRoundedIcon sx={{ color: "green", marginLeft: "0.5rem" }} />
    ) : (
      <CancelRoundedIcon sx={{ color: "red", marginLeft: "0.5rem" }} />
    );
  };

  return (
    <Box
      sx={{
        padding: {
          xs: "1rem", 
          sm: "0",
          md: "4rem", 
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h3"
            sx={{
              color: theme.palette.text.default,
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            Change Password <LockPersonRoundedIcon />
          </Typography>
        </Grid>
      </Grid>
      <br />

      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: "1rem",
        }}
      >
        <Grid item xs={12} md={6} lg={6} sm={12}>
          <Typography
            variant="h4"
            sx={{
              color: "#8f969b",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            New Password Must Contain
          </Typography>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h5"
                sx={{
                  color: isUpperCasePresent ? "green" : "red",
                  fontWeight: 700,
                }}
              >
                At least one Capital letter
              </Typography>
              {renderValidationIcon(isUpperCasePresent)}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h5"
                sx={{
                  color: isLowerCasePresent ? "green" : "red",
                  fontWeight: 700,
                }}
              >
                At least one lowercase letter
              </Typography>
              {renderValidationIcon(isLowerCasePresent)}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h5"
                sx={{
                  color: isNumberPresent ? "green" : "red",
                  fontWeight: 700,
                }}
              >
                At least one number
              </Typography>
              {renderValidationIcon(isNumberPresent)}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h5"
                sx={{
                  color: isSpecialCharPresent ? "green" : "red",
                  fontWeight: 700,
                }}
              >
                At least one special character
              </Typography>
              {renderValidationIcon(isSpecialCharPresent)}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h5"
                sx={{
                  color: isMinLength ? "green" : "red",
                  fontWeight: 700,
                }}
              >
                Minimum 8 characters
              </Typography>
              {renderValidationIcon(isMinLength)}
            </div>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          sm={12}
          sx={{ display: "flex", gap: ".5rem", flexDirection: "column" }}
        >
          <Typography
            variant="p"
            sx={{
              color: theme.palette.text.default,
              fontWeight: 700,
              marginBottom: "0.1rem",
            }}
          >
            Mobile Number
          </Typography>
          <TextField
            id="mobileNumber"
            name="mobileNumber"
            placeholder="Enter your mobile password"
            fullWidth
            required
            value={formik.values.mobileNumber}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            error={
              formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)
            }
            helperText={
              formik.touched.mobileNumber && formik.errors.mobileNumber
            }
            variant="outlined"
            type={"text"}
            size="small"
          />
          <Typography
            variant="p"
            sx={{
              color: theme.palette.text.default,
              fontWeight: 700,
              marginBottom: "0.1rem",
            }}
          >
            Old Password
          </Typography>
          <TextField
            id="oldPassword"
            name="oldPassword"
            placeholder="Enter your old password"
            fullWidth
            required
            value={formik.values.oldPassword}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            error={
              formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
            }
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
            variant="outlined"
            type={showOldPassword ? "text" : "password"}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={`Show ${
                      showOldPassword ? "Hidden" : "Visible"
                    } Old Password`}
                  >
                    <IconButton
                      aria-label="toggle old password visibility"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      edge="end"
                    >
                      {showOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <Typography
            variant="p"
            sx={{
              color: theme.palette.text.default,
              fontWeight: 700,
              marginBottom: "0.1rem",
            }}
          >
            New Password
          </Typography>
          <TextField
            id="newPassword"
            name="newPassword"
            value={formik.values.newPassword}
            placeholder="Enter your new password"
            onChange={formik.handleChange}
            fullWidth
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
            variant="outlined"
            type={showNewPassword ? "text" : "password"}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={`Show ${
                      showNewPassword ? "Hidden" : "Visible"
                    } New Password`}
                  >
                    <IconButton
                      aria-label="toggle old password visibility"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <Typography
            variant="p"
            sx={{
              color: theme.palette.text.default,
              fontWeight: 700,
              marginBottom: "0.1rem",
            }}
          >
            Confirm New Password
          </Typography>
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your new password"
            fullWidth
            required
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            variant="outlined"
            type={showConfirmPassword ? "text" : "password"}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={`Show ${
                      showConfirmPassword ? "Hidden" : "Visible"
                    } Confirm Password`}
                  >
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "end", gap: "1rem" }}>
            <LoadingButton
              loading={loading}
              onClick={handleFormSubmit}
              variant={"contained"}
            >
              Change Password
            </LoadingButton>
            <Button variant="contained" color="error" onClick={handleClose}>
              Reset
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChangePasswordInitial;

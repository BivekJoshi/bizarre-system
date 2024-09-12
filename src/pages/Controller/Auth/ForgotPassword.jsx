import { Box, Grid, Typography, useTheme } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthForm } from "../../../hooks/auth/Auth/useAuthForm";
import { LoadingButton } from "@mui/lab";
import RenderInput from "../../../components/RenderInput/RenderInput";
import RandomLogin from "../../../assets/RandomLogin.png";
import { Link } from "react-router-dom";
import { useForgotPasswordForm } from "../../../hooks/user/User/useForgotPasswordForm";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

const ForgotPassword = () => {
  const theme = useTheme();
  const { loading, formik } = useForgotPasswordForm();
  const [recapchaVal, setRecapchaVal] = useState(false);
  const handleRecaptcha = (val) => {
    if (val) {
      setRecapchaVal(true);
    } else {
      setRecapchaVal(false);
      console.error("ReCAPTCHA validation failed");
    }
  }; 

  const inputField = [
    {
      id: 1,
      name: "mobileNumber",
      label: "Mobile Number",
      placeholder: "Enter mobile number",
      type: "text",
      required: true,
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
    {
      id: 2,
      name: "birthDate",
      label: "Date of Birth",
      placeholder: "Enter your date of birth",
      required: true,
      type: "date",
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
  ];

  return (
    <Box
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{
          maxWidth: 800,
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
          <img
            src={RandomLogin}
            alt="Random"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            sx={{
              color: theme.palette.text.default,
              fontWeight: 700,
              marginBottom: "0.1rem",
            }}
          >
            Recover Password !
          </Typography>
          <br />
          <RenderInput inputField={inputField} formik={formik} />
          <br />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              maxWidth: { xs: "100%", sm: "400px" },
              overflow: "hidden",
            }}
          >
            <ReCAPTCHA
              onChange={handleRecaptcha}
              sitekey="6LfAUEAqAAAAAH3DFZXUE-iXWOdi63jXiFo6iavl"
              style={{
                width: "100%",
              }}
            />
          </Box>
          <LoadingButton
            loading={loading}
            onClick={() => formik.handleSubmit()}
            variant={"contained"}
            fullWidth
            disabled={!recapchaVal}
            sx={{
              marginTop: 2,
              "&:hover": {
                backgroundColor: "#04a19a",
              },
            }}
          >
            Email Now
          </LoadingButton>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.default,
              margin: "0.4rem 0",
              textAlign: "end",
            }}
          >
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: theme.palette.primary.main,
              }}
            >
              Back to login page
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ForgotPassword;

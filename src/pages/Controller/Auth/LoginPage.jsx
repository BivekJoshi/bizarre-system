import { Box, Grid, Typography, useTheme } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthForm } from "../../../hooks/auth/Auth/useAuthForm";
import { LoadingButton } from "@mui/lab";
import RenderInput from "../../../components/RenderInput/RenderInput";
import RandomLogin from "../../../assets/RandomLoginAlt.png";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

const LoginPage = () => {
  const theme = useTheme();
  const {
    loading,
    formik,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
  } = useAuthForm();

  const [recapchaVal, setRecapchaVal] = useState(false);
  const handleRecaptcha = (val) => {
    if (val) {
      setRecapchaVal(true);
    } else {
      setRecapchaVal(false);
      console.error("ReCAPTCHA validation failed");
    }
  };
  const props = {
    loading,
    formik,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
  };

  const inputField = [
    {
      id: 1,
      name: "mobileNumber",
      label: "Mobile Number",
      placeholder: "Enter mobile number",
      type: "number",
      required: true,
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
    {
      id: 2,
      name: "password",
      label: "Password",
      placeholder: "Enter password",
      required: true,
      type: "password",
      iconEnd1: <Visibility />,
      iconEnd2: <VisibilityOff />,
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
            Welcome Back !
          </Typography>
          <br />
          <RenderInput
            inputField={inputField}
            formik={formik}
            passwordProps={props}
          />
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.default,
              margin: "0.4rem 0",
              textAlign: "end",
            }}
          >
            <Link
              to="/forgot-password"
              style={{
                textDecoration: "none",
                color: theme.palette.primary.main,
              }}
            >
              Forgot your password?
            </Link>
          </Typography>
          <br />
          {/* <Box
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
              sitekey="6Lf9cV4qAAAAAIuC9CxThcE4CRaW8FW5Uk35ye7C"
              style={{
                width: "100%",
              }}
            />
          </Box> */}
          <LoadingButton
            loading={loading}
            onClick={() => formik.handleSubmit()}
            variant={"contained"}
            fullWidth
            // disabled={!recapchaVal}
            sx={{
              marginTop: 2,
              "&:hover": {
                backgroundColor: "#04a19a",
              },
            }}
          >
            Login
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;

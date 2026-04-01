import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthForm } from "../../../hooks/auth/Auth/useAuthForm";
import { LoadingButton } from "@mui/lab";
import RenderInput from "../../../components/RenderInput/RenderInput";
import RandomLogin from "../../../assets/RandomLogin.png";
import { Link } from "react-router-dom";
import { useForgotPasswordForm } from "../../../hooks/user/User/useForgotPasswordForm";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import BizarreInBg from "../../../assets/BizarreInBg.png";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const theme = useTheme();
  const VITE_STATUS = import.meta.env.VITE_STATUS || "";
  const VITE_SITE_ACCESS_KEY = import.meta.env.VITE_SITE_ACCESS_KEY || "";

  const { loading, formik } = useForgotPasswordForm();
  const [recapchaVal, setRecapchaVal] = useState(
    VITE_STATUS === "dev" ? true : false,
  );
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
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f8fafc",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${BizarreInBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          /* Artistic effects requested: */
          filter: "blur(1px)", // Makes it "unclear"
          opacity: 0.45, // "Decrease opacity" so it's subtle
          zIndex: 0,
        },
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{
          maxWidth: 900,
          padding: { xs: 2, md: 6 },
          borderRadius: 2,
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
          zIndex: 1,
          mx: 2,
        }}
      >
        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <Box
              sx={{
                width: "100%",
                height: "auto",
                mx: "auto",
                mb: 2,
              }}
            >
              <img
                src={RandomLogin}
                alt="Random"
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            </Box>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#1e293b",
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Recover Password!
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#64748b",
                  mt: 0.5,
                  mb: 4,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Enter your details to stay connected.
              </Typography>
            </motion.div>

            <Stack spacing={2.5}>
              <Box>
                <RenderInput inputField={inputField} formik={formik} />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  overflow: "hidden",
                  transform: { xs: "scale(0.85)", sm: "scale(1)" },
                }}
              >
                <ReCAPTCHA
                  onChange={handleRecaptcha}
                  sitekey={VITE_SITE_ACCESS_KEY}
                  style={{
                    width: "100%",
                  }}
                />
              </Box>
              <motion.div whileTap={{ scale: 0.98 }}>
                <LoadingButton
                  loading={loading}
                  onClick={() => formik.handleSubmit()}
                  variant={"contained"}
                  fullWidth
                  disabled={!recapchaVal}
                  sx={{
                    py: 1.8,
                    borderRadius: "16px",
                    fontSize: "1rem",
                    fontWeight: 700,
                  }}
                >
                  Email Now
                </LoadingButton>
              </motion.div>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Link
                  to="/login"
                  sx={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    color: "#64748b",
                    transition: "0.2s",
                    "&:hover": { color: "#04a19a" },
                  }}
                >
                  Back to login page
                </Link>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ForgotPassword;

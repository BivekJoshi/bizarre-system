import { Box, Chip, Grid, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import maleProfile from "../../../assets/MaleProfile.png";
import femaleProfile from "../../../assets/FemaleProfile.png"; // Import the female profile image
import { useGetUserData } from "../../../hooks/user/useUser";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FormModal from "../../../components/Modal/FormModal";
import FinalSelectionUI from "../../../components/Camera/FinalSelectionUI";
import { DOC_URL } from "../../../api/axiosInterceptor";

const InfoRow = ({ label, value }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      fontSize: "16px",
      padding: "1rem",
      borderBottom: "1px solid #BDBDBD",
    }}
  >
    <div style={{ fontWeight: 700 }}>{label}</div>
    <div>{value}</div>
  </Box>
);

const Profile = () => {
  const theme = useTheme();
  const { data: userData, isLoading } = useGetUserData();
  const imageUrl = userData?.data?.profilePictureUrl;
  console.log("🚀 ~ Profile ~ imageUrl:", imageUrl);
  const [openModal, setOpenModal] = useState(false);

  const gender = userData?.data?.gender;
  const imageFinal = imageUrl
    ? DOC_URL + imageUrl
    : gender === "MALE"
    ? maleProfile
    : gender === "FEMALE"
    ? femaleProfile
    : null;

  return (
    <div style={{ width: "100%" }}>
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
            My Profile <AccountCircleRoundedIcon />
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: {
            xs: "1rem",
            sm: "0",
            md: "6rem",
          },
        }}
      >
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            {imageFinal && (
              <img
                src={imageFinal}
                alt="Profile"
                style={{ width: "200px", height: "200px", borderRadius: "50%" }}
                onClick={() => setOpenModal(true)}
              />
            )}
            <Chip
              label={isLoading ? "..." : userData?.data?.fullName}
              color="primary"
              sx={{ fontSize: "16px", padding: "1rem" }}
            />
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.text.default,
                marginBottom: "1rem",
              }}
            >
              <EmailIcon /> {isLoading ? "..." : userData?.data?.email}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: "#BDBDBD",
                marginBottom: "1rem",
              }}
            >
              <LocalPhoneIcon />{" "}
              {isLoading ? "..." : userData?.data?.mobileNumber}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
            }}
          >
            <InfoRow
              label="User Type :"
              value={isLoading ? "..." : userData?.data?.userType}
            />
            <InfoRow
              label="Address :"
              value={isLoading ? "..." : userData?.data?.address}
            />
            <InfoRow
              label="Date of Birth :"
              value={isLoading ? "..." : userData?.data?.birthDate}
            />
            <InfoRow
              label="Joined Date :"
              value={isLoading ? "..." : userData?.data?.joinedDate}
            />
            <InfoRow
              label="Status :"
              value={isLoading ? "..." : userData?.data?.status}
            />
          </Box>
        </Grid>
      </Grid>
      <FormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        width={"25%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Add Your Profile Image"}
        formComponent={
          <>
            <FinalSelectionUI onClose={() => setOpenModal(false)} />
          </>
        }
        showButton={false}
      />
    </div>
  );
};

export default Profile;

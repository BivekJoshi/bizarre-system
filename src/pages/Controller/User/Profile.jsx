import React, { useState } from "react";
import {
  Box,
  Chip,
  Grid,
  Typography,
  useTheme,
  Avatar,
  Paper,
  Divider,
  Skeleton,
  Stack,
  Container,
} from "@mui/material";
import {
  Email as EmailIcon,
  LocalPhone as LocalPhoneIcon,
  CameraAlt as CameraAltIcon,
  Person as PersonIcon,
  LocationOn as LocationOnIcon,
  Cake as CakeIcon,
  EventAvailable as EventIcon,
  VerifiedUser as StatusIcon,
  Badge as BadgeIcon,
} from "@mui/icons-material";

import maleProfile from "../../../assets/MaleProfile.png";
import femaleProfile from "../../../assets/FemaleProfile.png";
import { useGetUserData } from "../../../hooks/user/useUser";
import FormModal from "../../../components/Modal/FormModal";
import FinalSelectionUI from "../../../components/Camera/FinalSelectionUI";
import { DOC_URL } from "../../../api/axiosInterceptor";

const DetailItem = ({ icon, label, value, isLoading }) => (
  <Box sx={{ p: 2 }}>
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar sx={{ bgcolor: "primary.light", width: 40, height: 40 }}>
        {React.cloneElement(icon, {
          sx: { color: "primary.main", fontSize: 20 },
        })}
      </Avatar>
      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontWeight: 600, textTransform: "uppercase" }}
        >
          {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {isLoading ? <Skeleton width={120} /> : value || "—"}
        </Typography>
      </Box>
    </Stack>
  </Box>
);

const Profile = () => {
  const theme = useTheme();
  const { data: userData, isLoading, refetch } = useGetUserData();
  const [openModal, setOpenModal] = useState(false);

  const imageUrl = userData?.data?.profilePictureUrl;
  const gender = userData?.data?.gender;
  const imageFinal = imageUrl
    ? DOC_URL + imageUrl
    : gender === "MALE"
      ? maleProfile
      : femaleProfile;

  const handleModalClose = () => {
    setOpenModal(false);
    refetch();
  };

  return (
    <Container sx={{ py: 8 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        {/* Header Section (Symmetric Anchor) */}
        <Box sx={{ pt: 6, pb: 4, px: 3, textAlign: "center" }}>
          <Box
            sx={{
              position: "relative",
              width: 150,
              height: 150,
              margin: "0 auto",
              mb: 3,
              "&:hover .camera-overlay": { opacity: 1 },
            }}
          >
            <Avatar
              src={imageFinal}
              sx={{
                width: "100%",
                height: "100%",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              }}
            />
            <Box
              className="camera-overlay"
              onClick={() => setOpenModal(true)}
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "rgba(0,0,0,0.4)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                opacity: 0,
                transition: "0.3s",
              }}
            >
              <CameraAltIcon sx={{ color: "white" }} />
            </Box>
          </Box>

          <Typography variant="h4" fontWeight={800} gutterBottom>
            {isLoading ? (
              <Skeleton width={200} sx={{ mx: "auto" }} />
            ) : (
              userData?.data?.fullName
            )}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Chip
              icon={<BadgeIcon style={{ fontSize: 16 }} />}
              label={userData?.data?.userType || "Member"}
              variant="outlined"
              color="primary"
              sx={{ fontWeight: 600 }}
            />
            <Chip
              label={userData?.data?.status || "Active"}
              color="success"
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="center"
            divider={
              <Divider
                orientation="vertical"
                flexItem
                sx={{ display: { xs: "none", sm: "block" } }}
              />
            }
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <EmailIcon fontSize="small" color="action" />
              <Typography variant="body2">
                {isLoading ? <Skeleton width={140} /> : userData?.data?.email}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocalPhoneIcon fontSize="small" color="action" />
              <Typography variant="body2">
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  userData?.data?.mobileNumber
                )}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <Divider />

        {/* Info Grid (Symmetric Details) */}
        <Box sx={{ p: 4 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <DetailItem
                icon={<PersonIcon />}
                label="Gender"
                value={gender}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DetailItem
                icon={<LocationOnIcon />}
                label="Address"
                value={userData?.data?.address}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DetailItem
                icon={<CakeIcon />}
                label="Birthday"
                value={userData?.data?.birthDate}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DetailItem
                icon={<EventIcon />}
                label="Member Since"
                value={userData?.data?.joinedDate}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <FormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        width={"25%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Update Profile Picture"}
        formComponent={<FinalSelectionUI onClose={handleModalClose} />}
        showButton={false}
      />
    </Container>
  );
};

export default Profile;

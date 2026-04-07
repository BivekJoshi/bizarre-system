import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  Box,
  IconButton,
  useTheme,
  Chip,
  Divider,
  Stack,
  Tooltip,
} from "@mui/material";
import MaleProfile from "../../../assets/MaleProfile.png";
import FemaleProfile from "../../../assets/FemaleProfile.png";
import LocalPostOfficeRoundedIcon from "@mui/icons-material/LocalPostOfficeRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { DOC_URL } from "../../../api/axiosInterceptor";

const UserCard = ({
  data,
  setIsEditModalOpen,
  setRowData,
  setIsDocumentModalOpen,
}) => {
  const theme = useTheme();

  const imageFinal = data?.user?.profilePictureUrl
    ? DOC_URL + data?.user?.profilePictureUrl
    : data?.user?.gender === "MALE"
      ? MaleProfile
      : FemaleProfile;

  const InfoItem = ({ icon, text, href }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5}}>
      {React.cloneElement(icon, {
        sx: { fontSize: 20, color: theme.palette.text.disabled },
      })}
      {href ? (
        <Typography
          variant="body2"
          component="a"
          href={href}
          sx={{
            textDecoration: "none",
            color: theme.palette.text.primary,
            "&:hover": { color: theme.palette.primary.main },
          }}
        >
          {text}
        </Typography>
      ) : (
        <Typography variant="body2" color="text.primary">
          {text}
        </Typography>
      )}
    </Box>
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "24px",
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        },
      }}
    >
      {/* Header: Avatar and Title */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={imageFinal}
            sx={{
              width: 70,
              height: 70,
              borderRadius: "20px",
              bgcolor: theme.palette.grey[100],
            }}
          />
          <Box>
            <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
              {data?.user?.fullName}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              {data?.user?.userType} • {data?.branch?.address} Branch
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={0.5}>
          {/* <Tooltip title="View Documents">
            <IconButton
              size="small"
              onClick={() => {
                setRowData(data);
                setIsDocumentModalOpen(true);
              }}
              sx={{ bgcolor: theme.palette.grey[50] }}
            >
              <VisibilityRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip> */}
          <IconButton
            size="small"
            onClick={() => {
              setRowData(data);
              setIsEditModalOpen(true);
            }}
            sx={{
              color: theme.palette.primary.main,
              bgcolor: theme.palette.primary.lighter,
            }}
          >
            <EditRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>

      <Box sx={{ mt: 3, mb: 2 }}>
        <Stack direction="row" spacing={1}>
          <Chip
            label={data?.user?.status}
            size="small"
            color={data?.user?.status === "ACTIVE" ? "success" : "default"}
            sx={{ fontWeight: 600, fontSize: "0.65rem", borderRadius: "8px" }}
          />
          <Chip
            label={`ID: ${data?.user?.id.slice(0, 8)}`}
            size="small"
            variant="outlined"
            sx={{ fontSize: "0.65rem", borderRadius: "8px" }}
          />
        </Stack>
      </Box>

      <Divider sx={{ my: 2, borderStyle: "dashed" }} />

      {/* Body: Contact Info */}
      <Box>
        <InfoItem
          icon={<LocalPostOfficeRoundedIcon />}
          text={data?.user?.email}
          href={`mailto:${data?.user?.email}`}
        />
        <InfoItem
          icon={<LocalPhoneRoundedIcon />}
          text={data?.user?.mobileNumber}
        />
        <InfoItem icon={<HomeRoundedIcon />} text={data?.user?.address} />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <InfoItem
              icon={<CalendarMonthRoundedIcon />}
              text={data?.user?.birthDate}
            />
          </Grid>
          <Grid item xs={6}>
            <InfoItem
              icon={<BadgeRoundedIcon />}
              text={`Joined ${new Date(data?.user?.joinedDate).toLocaleDateString()}`}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default UserCard;

import React from "react";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import LocalPostOfficeRoundedIcon from "@mui/icons-material/LocalPostOfficeRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import MaleProfile from "../../../assets/MaleProfile.png";
import FemaleProfile from "../../../assets/FemaleProfile.png";
import { DOC_URL } from "../../../api/axiosInterceptor";

const InfoRow = ({ icon, text, href }) => {
  if (!text) return null;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}>
      {React.cloneElement(icon, {
        sx: { fontSize: 16, color: "text.disabled", flexShrink: 0 },
      })}
      {href ? (
        <Typography
          variant="body2"
          component="a"
          href={href}
          sx={{
            color: "text.primary",
            textDecoration: "none",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            "&:hover": { color: "primary.main" },
          }}
        >
          {text}
        </Typography>
      ) : (
        <Typography
          variant="body2"
          color="text.primary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
};

const CustomerCard = ({ data, onEdit }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const borderColor = isDark ? "#262626" : "#E7E5E4";

  // Backward-compatible fallback so the component stays usable without props.
  const c = data || {
    fullName: "Bivek Prasad Joshi",
    email: "bvkjosi03@gmail.com",
    mobileNumber: "9865466989",
    address: "Tangal, Lalitpur",
    birthDate: "2027-09-09",
    gender: "MALE",
    status: "ACTIVE",
  };

  const imageFinal = c?.profilePictureUrl
    ? DOC_URL + c.profilePictureUrl
    : c?.gender === "FEMALE"
      ? FemaleProfile
      : MaleProfile;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2.5,
        border: `1px solid ${borderColor}`,
        bgcolor: "background.paper",
        transition: "border-color .15s ease",
        "&:hover": { borderColor: isDark ? "#3a3a3a" : "#D6D3D1" },
      }}
    >
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        spacing={1}
      >
        <Stack direction="row" spacing={1.75} alignItems="center" sx={{ minWidth: 0 }}>
          <Avatar
            src={imageFinal}
            alt={c?.fullName}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              border: `1px solid ${borderColor}`,
            }}
            variant="rounded"
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {c?.fullName}
            </Typography>
            {c?.status && (
              <Chip
                label={c.status}
                size="small"
                color={c.status === "ACTIVE" ? "success" : "default"}
                sx={{
                  mt: 0.5,
                  height: 20,
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  borderRadius: 1,
                }}
              />
            )}
          </Box>
        </Stack>

        {onEdit && (
          <IconButton
            size="small"
            onClick={() => onEdit(c)}
            sx={{ width: 32, height: 32 }}
          >
            <EditRoundedIcon sx={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Stack>

      <Divider sx={{ my: 1.75 }} />

      <Stack spacing={1}>
        <InfoRow
          icon={<LocalPostOfficeRoundedIcon />}
          text={c?.email}
          href={c?.email ? `mailto:${c.email}` : null}
        />
        <InfoRow
          icon={<LocalPhoneRoundedIcon />}
          text={c?.mobileNumber}
          href={c?.mobileNumber ? `tel:${c.mobileNumber}` : null}
        />
        <InfoRow icon={<HomeRoundedIcon />} text={c?.address} />
        <InfoRow icon={<CalendarMonthRoundedIcon />} text={c?.birthDate} />
      </Stack>
    </Paper>
  );
};

export default CustomerCard;

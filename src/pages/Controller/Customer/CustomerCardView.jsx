import React from "react";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import LocalPostOfficeRoundedIcon from "@mui/icons-material/LocalPostOfficeRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import HexagonIcon from "@mui/icons-material/Hexagon";
import {
  MonetizationOn,
  AccountBalance,
  EmojiEvents,
  Star,
} from "@mui/icons-material";
import MaleProfile from "../../../assets/MaleProfile.png";
import FemaleProfile from "../../../assets/FemaleProfile.png";
import { DOC_URL } from "../../../api/axiosInterceptor";

const LEAGUE_META = {
  SILVER: { icon: <Star sx={{ fontSize: 14 }} />, color: "#9CA3AF" },
  GOLD: { icon: <EmojiEvents sx={{ fontSize: 14 }} />, color: "#D4A017" },
  PLATINUM: { icon: <AccountBalance sx={{ fontSize: 14 }} />, color: "#7C3AED" },
  BRONZE: { icon: <HexagonIcon sx={{ fontSize: 14 }} />, color: "#B45309" },
};
const DEFAULT_LEAGUE = {
  icon: <MonetizationOn sx={{ fontSize: 14 }} />,
  color: "#2563EB",
};

const InfoRow = ({ icon, text, href }) => {
  if (!text) return null;
  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
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
    </Stack>
  );
};

const CustomerCardView = ({ data, setIsEditModalOpen, setRowData }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const borderColor = isDark ? "#262626" : "#E7E5E4";

  const league = data?.league;
  const leagueMeta = LEAGUE_META[league] || DEFAULT_LEAGUE;

  const imageFinal = data?.user?.profilePictureUrl
    ? DOC_URL + data?.user?.profilePictureUrl
    : data?.user?.gender === "MALE"
      ? MaleProfile
      : data?.user?.gender === "FEMALE"
        ? FemaleProfile
        : null;

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
        spacing={1}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Stack
          direction="row"
          spacing={1.75}
          alignItems="center"
          sx={{ minWidth: 0 }}
        >
          <Box sx={{ position: "relative", flexShrink: 0 }}>
            <Avatar
              src={imageFinal}
              alt={data?.user?.fullName}
              variant="rounded"
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                border: `1px solid ${borderColor}`,
                bgcolor: isDark ? "#1F1F1F" : "#F5F5F4",
              }}
            />
            {league && (
              <Tooltip title={`${league} league`} arrow>
                <Avatar
                  sx={{
                    position: "absolute",
                    bottom: -6,
                    right: -6,
                    width: 22,
                    height: 22,
                    bgcolor: leagueMeta.color,
                    color: "#fff",
                    border: `2px solid ${theme.palette.background.paper}`,
                  }}
                >
                  {leagueMeta.icon}
                </Avatar>
              </Tooltip>
            )}
          </Box>
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
              {data?.user?.fullName || "—"}
            </Typography>
            <Stack direction="row" spacing={0.75} sx={{ mt: 0.5 }}>
              {league && (
                <Chip
                  size="small"
                  label={league}
                  sx={{
                    height: 20,
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    borderRadius: 1,
                    bgcolor: `${leagueMeta.color}1A`,
                    color: leagueMeta.color,
                    border: `1px solid ${leagueMeta.color}40`,
                  }}
                />
              )}
              {data?.user?.userType && (
                <Chip
                  size="small"
                  variant="outlined"
                  label={data.user.userType}
                  sx={{
                    height: 20,
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    borderRadius: 1,
                  }}
                />
              )}
            </Stack>
          </Box>
        </Stack>

        {setIsEditModalOpen && (
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => {
                setRowData?.(data);
                setIsEditModalOpen(true);
              }}
              sx={{ width: 32, height: 32, color: "primary.main" }}
            >
              <EditRoundedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      <Divider sx={{ my: 1.75 }} />

      <Stack spacing={1}>
        <InfoRow
          icon={<LocalPostOfficeRoundedIcon />}
          text={data?.user?.email}
          href={data?.user?.email ? `mailto:${data.user.email}` : null}
        />
        <InfoRow
          icon={<LocalPhoneRoundedIcon />}
          text={data?.user?.mobileNumber}
          href={
            data?.user?.mobileNumber ? `tel:${data.user.mobileNumber}` : null
          }
        />
        <InfoRow icon={<HomeRoundedIcon />} text={data?.user?.address} />
        <InfoRow
          icon={<CalendarMonthRoundedIcon />}
          text={data?.user?.birthDate}
        />
      </Stack>
    </Paper>
  );
};

export default CustomerCardView;

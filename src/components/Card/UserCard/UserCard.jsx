import React from "react";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
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
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import MaleProfile from "../../../assets/MaleProfile.png";
import FemaleProfile from "../../../assets/FemaleProfile.png";
import { DOC_URL } from "../../../api/axiosInterceptor";

const InfoItem = ({ icon, text, href }) => {
  if (!text) return null;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
      {React.cloneElement(icon, {
        sx: { fontSize: 16, color: "text.disabled", flexShrink: 0 },
      })}
      {href ? (
        <Typography
          variant="body2"
          component="a"
          href={href}
          sx={{
            textDecoration: "none",
            color: "text.primary",
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

const UserCard = ({
  data,
  setIsEditModalOpen,
  setRowData,
  setIsDocumentModalOpen,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const borderColor = isDark ? "#262626" : "#E7E5E4";

  const imageFinal = data?.user?.profilePictureUrl
    ? DOC_URL + data?.user?.profilePictureUrl
    : data?.user?.gender === "MALE"
      ? MaleProfile
      : FemaleProfile;

  const joinedDate = data?.user?.joinedDate
    ? new Date(data.user.joinedDate).toLocaleDateString()
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={1}
      >
        <Stack
          direction="row"
          spacing={1.75}
          alignItems="center"
          sx={{ minWidth: 0 }}
        >
          <Avatar
            src={imageFinal}
            sx={{
              width: 52,
              height: 52,
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
              {data?.user?.fullName}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
              sx={{ display: "block", mt: 0.25 }}
            >
              {data?.user?.userType}
              {data?.branch?.address ? ` · ${data.branch.address}` : ""}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={0.5}>
          {setIsDocumentModalOpen && (
            <Tooltip title="View Documents">
              <IconButton
                size="small"
                onClick={() => {
                  setRowData?.(data);
                  setIsDocumentModalOpen(true);
                }}
                sx={{ width: 32, height: 32 }}
              >
                <VisibilityRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          )}
          {setIsEditModalOpen && (
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={() => {
                  setRowData?.(data);
                  setIsEditModalOpen(true);
                }}
                sx={{
                  width: 32,
                  height: 32,
                  color: "primary.main",
                }}
              >
                <EditRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Box>

      <Stack direction="row" spacing={1} sx={{ mt: 1.75 }}>
        {data?.user?.status && (
          <Chip
            label={data.user.status}
            size="small"
            color={data.user.status === "ACTIVE" ? "success" : "default"}
            sx={{
              height: 20,
              fontSize: "0.65rem",
              fontWeight: 600,
              borderRadius: 1,
            }}
          />
        )}
        {data?.user?.id && (
          <Chip
            label={`ID · ${data.user.id.slice(0, 8)}`}
            size="small"
            variant="outlined"
            sx={{
              height: 20,
              fontSize: "0.65rem",
              borderRadius: 1,
            }}
          />
        )}
      </Stack>

      <Divider sx={{ my: 1.75 }} />

      <Stack spacing={1}>
        <InfoItem
          icon={<LocalPostOfficeRoundedIcon />}
          text={data?.user?.email}
          href={data?.user?.email ? `mailto:${data.user.email}` : null}
        />
        <InfoItem
          icon={<LocalPhoneRoundedIcon />}
          text={data?.user?.mobileNumber}
          href={data?.user?.mobileNumber ? `tel:${data.user.mobileNumber}` : null}
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
              text={joinedDate ? `Joined ${joinedDate}` : null}
            />
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};

export default UserCard;

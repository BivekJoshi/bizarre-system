import React, { useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";

const InfoRow = ({ icon, text }) => {
  if (!text) return null;
  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
      {React.cloneElement(icon, {
        sx: { fontSize: 16, color: "text.disabled", flexShrink: 0 },
      })}
      <Typography
        variant="body2"
        sx={{
          color: "text.primary",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
};

const BranchCardView = ({ data, onToggleStatus }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const borderColor = isDark ? "#262626" : "#E7E5E4";
  const surfaceAlt = isDark ? "#1F1F1F" : "#F5F5F4";

  const [isActive, setIsActive] = useState(data?.status === "ACTIVE");

  const handleToggle = (e) => {
    setIsActive(e.target.checked);
    onToggleStatus?.(data, e.target.checked);
  };

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
          <Avatar
            variant="rounded"
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: surfaceAlt,
              color: "primary.main",
              border: `1px solid ${borderColor}`,
            }}
          >
            <HomeWorkRoundedIcon />
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data?.address || "Branch"}
            </Typography>
            <Chip
              size="small"
              label={isActive ? "Active" : "Inactive"}
              color={isActive ? "success" : "default"}
              variant={isActive ? "filled" : "outlined"}
              sx={{
                mt: 0.5,
                height: 20,
                fontSize: "0.65rem",
                fontWeight: 600,
                borderRadius: 1,
              }}
            />
          </Box>
        </Stack>
        <Switch
          size="small"
          checked={isActive}
          onChange={handleToggle}
          color="primary"
        />
      </Stack>

      <Divider sx={{ my: 1.75 }} />

      <Stack spacing={1}>
        <InfoRow icon={<CallRoundedIcon />} text={data?.phoneNumber} />
        <InfoRow
          icon={<GroupRoundedIcon />}
          text={
            data?.housingCapacity != null
              ? `Capacity ${data.housingCapacity}`
              : null
          }
        />
      </Stack>
    </Paper>
  );
};

export default BranchCardView;

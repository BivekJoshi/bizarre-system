import React from "react";
import {
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TableRestaurantRoundedIcon from "@mui/icons-material/TableRestaurantRounded";

const STATUS = {
  OCCUPIED: { color: "error", label: "Occupied", accent: "#EF4444" },
  AVAILABLE: { color: "success", label: "Available", accent: "#22C55E" },
  RESERVED: { color: "warning", label: "Reserved", accent: "#F59E0B" },
  OUT_OF_ORDER: { color: "default", label: "Maintenance", accent: "#94A3B8" },
};

const CustomerTableCardView = ({ data }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const borderColor = isDark ? "#262626" : "#E7E5E4";
  const surfaceAlt = isDark ? "#1F1F1F" : "#F5F5F4";

  const status = STATUS[data?.status] || {
    color: "default",
    label: data?.status || "—",
    accent: "#94A3B8",
  };

  return (
    <Paper
      elevation={0}
      onClick={() => navigate(`${data?.id}`)}
      sx={{
        position: "relative",
        p: 2,
        pl: 2.5,
        borderRadius: 2.5,
        border: `1px solid ${borderColor}`,
        bgcolor: "background.paper",
        cursor: "pointer",
        overflow: "hidden",
        transition: "border-color .15s ease, transform .15s ease",
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          bgcolor: status.accent,
        },
        "&:hover": {
          borderColor: status.accent,
          transform: "translateY(-1px)",
        },
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1.5,
              bgcolor: surfaceAlt,
              border: `1px solid ${borderColor}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
              flexShrink: 0,
            }}
          >
            <TableRestaurantRoundedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="overline"
              sx={{ color: "text.secondary", lineHeight: 1, display: "block" }}
            >
              Table
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                mt: 0.25,
              }}
            >
              {data?.tableNumber ?? "—"}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            size="small"
            color={status.color}
            label={status.label}
            sx={{
              height: 22,
              fontWeight: 600,
              fontSize: "0.65rem",
              borderRadius: 1,
            }}
          />
          <IconButton
            size="small"
            sx={{
              width: 30,
              height: 30,
              border: `1px solid ${borderColor}`,
              "&:hover": {
                borderColor: status.accent,
                color: status.accent,
              },
            }}
          >
            <ChevronRightIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CustomerTableCardView;

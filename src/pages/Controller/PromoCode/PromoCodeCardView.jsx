import React from "react";
import {
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import { format } from "date-fns";

const formatDate = (date) => {
  if (!date) return "—";
  try {
    return format(new Date(date), "PP, p");
  } catch {
    return String(date);
  }
};

const PromoCodeCardView = ({ data }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const borderColor = isDark ? "#262626" : "#E7E5E4";
  const surfaceAlt = isDark ? "#1F1F1F" : "#F5F5F4";

  const isPercent = data?.discountType === "PERCENTAGE";
  const valueDisplay = isPercent
    ? `${data?.discountValue}%`
    : `Rs ${data?.discountValue}`;

  const now = new Date();
  const start = data?.effectiveDateTime
    ? new Date(data.effectiveDateTime)
    : null;
  const end = data?.terminationDateTime
    ? new Date(data.terminationDateTime)
    : null;

  const stateChip = (() => {
    if (end && now > end)
      return { color: "default", label: "Expired", variant: "outlined" };
    if (start && now < start)
      return { color: "info", label: "Scheduled", variant: "outlined" };
    return { color: "success", label: "Active", variant: "filled" };
  })();

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
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={1}
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
              color: "primary.main",
            }}
          >
            <LocalOfferRoundedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="overline"
              sx={{ color: "text.secondary", display: "block", lineHeight: 1 }}
            >
              Promo Code
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{
                letterSpacing: "0.02em",
                fontFamily: "monospace",
                fontSize: "1rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data?.code || "—"}
            </Typography>
          </Box>
        </Stack>
        <Chip
          size="small"
          color={stateChip.color}
          variant={stateChip.variant}
          label={stateChip.label}
          sx={{
            height: 22,
            fontWeight: 600,
            fontSize: "0.65rem",
            borderRadius: 1,
          }}
        />
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        sx={{ mt: 1.5, flexWrap: "wrap", gap: 0.5 }}
      >
        <Chip
          size="small"
          variant="outlined"
          label={data?.userType || "ALL"}
          sx={{
            height: 20,
            fontSize: "0.65rem",
            fontWeight: 500,
            borderRadius: 1,
          }}
        />
        <Chip
          size="small"
          variant="outlined"
          label={data?.discountType || "—"}
          sx={{
            height: 20,
            fontSize: "0.65rem",
            fontWeight: 500,
            borderRadius: 1,
          }}
        />
      </Stack>

      <Box
        sx={{
          mt: 1.5,
          p: 1.5,
          borderRadius: 1.5,
          border: `1px solid ${borderColor}`,
          bgcolor: surfaceAlt,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Discount
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, letterSpacing: "-0.01em" }}
        >
          {valueDisplay}
        </Typography>
      </Box>

      <Divider sx={{ my: 1.5 }} />

      <Stack spacing={0.75}>
        <Stack direction="row" spacing={1} alignItems="center">
          <EventRoundedIcon sx={{ fontSize: 14, color: "text.disabled" }} />
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            From
          </Typography>
          <Typography
            variant="caption"
            sx={{ ml: "auto", fontWeight: 600, color: "text.primary" }}
          >
            {formatDate(data?.effectiveDateTime)}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <EventRoundedIcon sx={{ fontSize: 14, color: "text.disabled" }} />
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Until
          </Typography>
          <Typography
            variant="caption"
            sx={{ ml: "auto", fontWeight: 600, color: "text.primary" }}
          >
            {formatDate(data?.terminationDateTime)}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default PromoCodeCardView;

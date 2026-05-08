import React from "react";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import RedeemRoundedIcon from "@mui/icons-material/RedeemRounded";
import {
  MonetizationOn,
  AccountBalance,
  EmojiEvents,
  Star,
} from "@mui/icons-material";
import HexagonIcon from "@mui/icons-material/Hexagon";
import { format } from "date-fns";

const LEAGUE_META = {
  SILVER: { icon: <Star />, color: "#9CA3AF" },
  GOLD: { icon: <EmojiEvents />, color: "#D4A017" },
  PLATINUM: { icon: <AccountBalance />, color: "#7C3AED" },
  BRONZE: { icon: <HexagonIcon />, color: "#B45309" },
};
const DEFAULT_LEAGUE = { icon: <MonetizationOn />, color: "#2563EB" };

const formatDate = (date) => {
  if (!date) return "—";
  try {
    return format(new Date(date), "PP, p");
  } catch {
    return String(date);
  }
};

const RedeemCodeCardView = ({ data }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const borderColor = isDark ? "#262626" : "#E7E5E4";
  const surfaceAlt = isDark ? "#1F1F1F" : "#F5F5F4";

  const meta = LEAGUE_META[data?.league] || DEFAULT_LEAGUE;

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
          <Avatar
            sx={{
              width: 44,
              height: 44,
              bgcolor: `${meta.color}1A`,
              color: meta.color,
              border: `1px solid ${meta.color}40`,
            }}
          >
            {meta.icon}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="overline"
              sx={{ color: "text.secondary", display: "block", lineHeight: 1 }}
            >
              Redeem Code
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{
                fontFamily: "monospace",
                letterSpacing: "0.02em",
                fontSize: "1rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data?.code || "—"}
            </Typography>
            {data?.league && (
              <Chip
                size="small"
                label={`${data.league} league`}
                sx={{
                  mt: 0.5,
                  height: 20,
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  borderRadius: 1,
                  bgcolor: `${meta.color}1A`,
                  color: meta.color,
                  border: `1px solid ${meta.color}40`,
                }}
              />
            )}
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

      <Box
        sx={{
          mt: 1.5,
          p: 1.5,
          borderRadius: 1.5,
          border: `1px solid ${borderColor}`,
          bgcolor: surfaceAlt,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <RedeemRoundedIcon sx={{ fontSize: 18, color: meta.color }} />
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Redeemable Coins
        </Typography>
        <Typography
          variant="h6"
          sx={{ ml: "auto", fontWeight: 700, letterSpacing: "-0.01em" }}
        >
          {data?.redeemableCoins ?? 0}
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

export default RedeemCodeCardView;

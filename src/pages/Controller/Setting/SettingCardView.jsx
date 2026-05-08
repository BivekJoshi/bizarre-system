import React from "react";
import {
  Avatar,
  Box,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  MonetizationOn,
  Percent,
  AccountBalance,
  EmojiEvents,
  Star,
} from "@mui/icons-material";

const SETTING_META = {
  SILVER_LEAGUE_THRESHOLD: { icon: <Star />, color: "#9CA3AF" },
  GOLD_LEAGUE_THRESHOLD: { icon: <EmojiEvents />, color: "#D4A017" },
  PLATINUM_LEAGUE_THRESHOLD: {
    icon: <AccountBalance />,
    color: "#7C3AED",
  },
  REDEEMABLE_COINS_PERCENTAGE: { icon: <Percent />, color: "#16A34A" },
};
const DEFAULT_META = { icon: <MonetizationOn />, color: "#2563EB" };

const humanize = (key = "") =>
  key
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const SettingCardView = ({ data }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const borderColor = isDark ? "#262626" : "#E7E5E4";

  const meta = SETTING_META[data?.setting] || DEFAULT_META;
  const isPercent = String(data?.setting || "").includes("PERCENTAGE");

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
        spacing={1.75}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1.75} alignItems="center" sx={{ minWidth: 0 }}>
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
              sx={{ color: "text.secondary", lineHeight: 1, display: "block" }}
            >
              Setting
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{
                letterSpacing: "-0.01em",
                lineHeight: 1.25,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {humanize(data?.setting)}
            </Typography>
          </Box>
        </Stack>
        <Box sx={{ textAlign: "right", flexShrink: 0 }}>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", display: "block" }}
          >
            Value
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.1 }}
          >
            {data?.value ?? "—"}
            {isPercent && (
              <Box
                component="span"
                sx={{
                  fontSize: "0.6em",
                  fontWeight: 600,
                  color: "text.secondary",
                  ml: 0.25,
                }}
              >
                %
              </Box>
            )}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default SettingCardView;

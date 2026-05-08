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
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";

const formatDate = (date) => {
  if (!date) return "—";
  const d = new Date(date);
  if (isNaN(d.getTime())) return String(date);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const InfoRow = ({ icon, label, value }) => (
  <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
    {React.cloneElement(icon, {
      sx: { fontSize: 16, color: "text.disabled", flexShrink: 0 },
    })}
    <Typography variant="caption" sx={{ color: "text.secondary" }}>
      {label}
    </Typography>
    <Typography
      variant="body2"
      sx={{
        fontWeight: 600,
        color: "text.primary",
        ml: "auto",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        maxWidth: "60%",
      }}
    >
      {value || "—"}
    </Typography>
  </Stack>
);

const BookCardView = ({ data }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const borderColor = isDark ? "#262626" : "#E7E5E4";
  const surfaceAlt = isDark ? "#1F1F1F" : "#F5F5F4";

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
      <Stack direction="row" spacing={1.75} alignItems="center" sx={{ minWidth: 0 }}>
        <Avatar
          variant="rounded"
          sx={{
            width: 56,
            height: 72,
            bgcolor: surfaceAlt,
            color: "primary.main",
            border: `1px solid ${borderColor}`,
            borderRadius: 1.5,
            flexShrink: 0,
          }}
        >
          <MenuBookRoundedIcon sx={{ fontSize: 28 }} />
        </Avatar>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{
              letterSpacing: "-0.01em",
              lineHeight: 1.25,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            {data?.title || "Untitled"}
          </Typography>
          {data?.genre && (
            <Chip
              size="small"
              variant="outlined"
              label={data.genre}
              sx={{
                mt: 0.5,
                height: 20,
                fontSize: "0.65rem",
                fontWeight: 500,
                borderRadius: 1,
              }}
            />
          )}
        </Box>
      </Stack>

      <Divider sx={{ my: 1.75 }} />

      <Stack spacing={1}>
        <InfoRow
          icon={<PersonRoundedIcon />}
          label="Author"
          value={data?.author}
        />
        <InfoRow
          icon={<EventRoundedIcon />}
          label="Published"
          value={formatDate(data?.publicationDate)}
        />
        <InfoRow
          icon={<QrCode2RoundedIcon />}
          label="ISBN"
          value={data?.isbn}
        />
      </Stack>
    </Paper>
  );
};

export default BookCardView;

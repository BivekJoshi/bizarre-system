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
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import StickyNote2RoundedIcon from "@mui/icons-material/StickyNote2Rounded";
import { DOC_URL } from "../../../api/axiosInterceptor";

const STATUS_STYLE = {
  WAITING: { color: "warning", label: "Waiting" },
  PREPARING: { color: "info", label: "Preparing" },
  READY: { color: "primary", label: "Ready" },
  SERVED: { color: "success", label: "Served" },
  CANCELLED: { color: "error", label: "Cancelled" },
};

const OrderByTableIdCardView = ({ data }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const borderColor = isDark ? "#262626" : "#E7E5E4";
  const remarkBg = isDark ? "rgba(245, 158, 11, 0.10)" : "#FFFBEB";
  const remarkBorder = isDark ? "rgba(245, 158, 11, 0.30)" : "#FDE68A";

  const status = data?.orderStatus;
  const statusMeta = STATUS_STYLE[status] || { color: "default", label: status };
  const isFinal = status === "SERVED" || status === "CANCELLED";

  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2.5,
        border: `1px solid ${borderColor}`,
        bgcolor: "background.paper",
        transition: "border-color .15s ease",
        opacity: isFinal ? 0.92 : 1,
        "&:hover": { borderColor: isDark ? "#3a3a3a" : "#D6D3D1" },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={1}
      >
        <Stack
          direction="row"
          spacing={1.75}
          alignItems="center"
          sx={{ minWidth: 0 }}
        >
          <Avatar
            src={data?.itemImageUrl ? DOC_URL + data.itemImageUrl : undefined}
            alt={data?.itemName}
            variant="rounded"
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              border: `1px solid ${borderColor}`,
              bgcolor: isDark ? "#1F1F1F" : "#F5F5F4",
            }}
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
              {data?.itemName}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block", mt: 0.25 }}
            >
              Rs {data?.sellingPrice ?? 0}
            </Typography>
          </Box>
        </Stack>
        <Chip
          label={statusMeta.label}
          color={statusMeta.color}
          size="small"
          variant="outlined"
          sx={{ height: 22, fontSize: "0.65rem", fontWeight: 600 }}
        />
      </Stack>

      {data?.remark && (
        <Box
          sx={{
            mt: 1.75,
            display: "flex",
            gap: 1,
            alignItems: "flex-start",
            p: 1.25,
            borderRadius: 1.5,
            border: `1px solid ${remarkBorder}`,
            bgcolor: remarkBg,
          }}
        >
          <StickyNote2RoundedIcon
            sx={{ fontSize: 16, color: "warning.main", mt: 0.25, flexShrink: 0 }}
          />
          <Typography
            variant="body2"
            sx={{ color: "text.primary", fontSize: 12.5 }}
          >
            {data.remark}
          </Typography>
        </Box>
      )}

      {status === "SERVED" && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-12deg)",
            border: "2px solid",
            borderColor: "success.main",
            color: "success.main",
            px: 1.25,
            py: 0.25,
            borderRadius: 1,
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.08em",
            opacity: 0.6,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            bgcolor: "background.paper",
          }}
        >
          <CheckCircleRoundedIcon sx={{ fontSize: 14 }} />
          SERVED
        </Box>
      )}
      {status === "CANCELLED" && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-12deg)",
            border: "2px solid",
            borderColor: "error.main",
            color: "error.main",
            px: 1.25,
            py: 0.25,
            borderRadius: 1,
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.08em",
            opacity: 0.65,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            bgcolor: "background.paper",
          }}
        >
          <CancelRoundedIcon sx={{ fontSize: 14 }} />
          CANCELLED
        </Box>
      )}
    </Paper>
  );
};

export default OrderByTableIdCardView;

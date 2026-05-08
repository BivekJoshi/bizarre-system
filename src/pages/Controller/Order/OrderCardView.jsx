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
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import { DOC_URL } from "../../../api/axiosInterceptor";

const STATUS_STYLE = {
  WAITING: { color: "warning", label: "Waiting" },
  PREPARING: { color: "info", label: "Preparing" },
  READY: { color: "primary", label: "Ready" },
  SERVED: { color: "success", label: "Served" },
  CANCELLED: { color: "error", label: "Cancelled" },
};

const OrderCardView = ({ data }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const borderColor = isDark ? "#262626" : "#E7E5E4";

  const { item = {}, batch = {}, status } = data || {};
  const { name, sellingPrice, stockCount, itemImageUrl, type } = item;
  const { customerTable = {}, totalBilled, orderCount } = batch;
  const { tableNumber, branch = {} } = customerTable;
  const { address, phoneNumber } = branch;

  const statusMeta = STATUS_STYLE[status] || { color: "default", label: status };

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
        <Stack direction="row" spacing={1.75} alignItems="center" sx={{ minWidth: 0 }}>
          <Avatar
            src={itemImageUrl ? DOC_URL + itemImageUrl : undefined}
            alt={name}
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
              {name}
            </Typography>
            {type && (
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block", mt: 0.25 }}
              >
                {type}
              </Typography>
            )}
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

      <Divider sx={{ my: 1.75 }} />

      <Stack spacing={0.85}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <RestaurantRoundedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Table{" "}
            <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
              {tableNumber || "—"}
            </Box>
            <Box component="span" sx={{ mx: 1, color: "text.disabled" }}>
              ·
            </Box>
            Orders{" "}
            <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
              {orderCount ?? 0}
            </Box>
          </Typography>
        </Stack>
        {address && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <StorefrontRoundedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {address}
            </Typography>
          </Stack>
        )}
        {phoneNumber && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <CallRoundedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {phoneNumber}
            </Typography>
          </Stack>
        )}
      </Stack>

      <Divider sx={{ my: 1.75 }} />

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Stack direction="row" spacing={2.5}>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block" }}
            >
              Price
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              Rs {sellingPrice ?? 0}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block" }}
            >
              Stock
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {stockCount ?? 0}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block" }}
            >
              Billed
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              Rs {totalBilled ?? 0}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default OrderCardView;

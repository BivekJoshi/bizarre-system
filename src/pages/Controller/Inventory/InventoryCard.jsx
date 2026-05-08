import React from "react";
import {
  Box,
  Chip,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import { DOC_URL } from "../../../api/axiosInterceptor";

const formatRs = (n) =>
  n == null
    ? "—"
    : `Rs ${Number(n).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}`;

const splitTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  return String(tags)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
};

const InventoryCard = ({ data }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const borderColor = isDark ? "#262626" : "#E7E5E4";
  const surfaceAlt = isDark ? "#1F1F1F" : "#FAFAF9";

  const { item = {}, branch = {}, stockQuantity = 0 } = data || {};
  const reorderLevel = data?.reorderLevel ?? 0;
  const maxStockLevel = data?.maxStockLevel ?? 0;
  const {
    name,
    color,
    costPrice,
    markedPrice,
    sellingPrice,
    tags,
    itemImageUrl,
    type,
  } = item;
  const { address, phoneNumber, housingCapacity } = branch;

  const isOut = Number(stockQuantity) <= 0;
  const isLow =
    !isOut && reorderLevel > 0 && Number(stockQuantity) <= reorderLevel;
  const stockState = isOut
    ? { color: "error", label: "Out of stock" }
    : isLow
      ? { color: "warning", label: "Low stock" }
      : { color: "success", label: "In stock" };

  const ratio =
    maxStockLevel > 0
      ? Math.min(1, Math.max(0, Number(stockQuantity) / maxStockLevel))
      : 0;
  const ratioColor = isOut ? "error" : isLow ? "warning" : "success";

  const margin =
    sellingPrice && costPrice && Number(costPrice) > 0
      ? ((Number(sellingPrice) - Number(costPrice)) / Number(costPrice)) * 100
      : null;

  const tagList = splitTags(tags);

  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        borderRadius: 2.5,
        border: `1px solid ${borderColor}`,
        overflow: "hidden",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        transition: "border-color .15s ease, transform .15s ease",
        "&:hover": {
          borderColor: isDark ? "#3a3a3a" : "#D6D3D1",
          transform: "translateY(-1px)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 150,
          bgcolor: surfaceAlt,
          overflow: "hidden",
        }}
      >
        {itemImageUrl ? (
          <Box
            component="img"
            src={DOC_URL + itemImageUrl}
            alt={name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.disabled",
              fontSize: 12,
              letterSpacing: "0.06em",
              fontWeight: 600,
            }}
          >
            NO IMAGE
          </Box>
        )}

        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            right: 8,
            justifyContent: "space-between",
          }}
        >
          <Chip
            size="small"
            color={stockState.color}
            label={stockState.label}
            sx={{
              height: 22,
              fontWeight: 600,
              fontSize: "0.65rem",
              borderRadius: 1,
            }}
          />
          {type && (
            <Chip
              size="small"
              variant="filled"
              label={type}
              sx={{
                height: 22,
                fontWeight: 500,
                fontSize: "0.65rem",
                borderRadius: 1,
                bgcolor: "rgba(15,23,42,0.55)",
                color: "#fff",
              }}
            />
          )}
        </Stack>
      </Box>

      <Box sx={{ p: 1.75, display: "flex", flexDirection: "column", gap: 1.25 }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Box sx={{ minWidth: 0 }}>
            <Tooltip title={name || ""} placement="top" arrow disableInteractive>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                noWrap
                sx={{ letterSpacing: "-0.01em", lineHeight: 1.25 }}
              >
                {name || "—"}
              </Typography>
            </Tooltip>
            {color && (
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block", mt: 0.25 }}
              >
                {color}
              </Typography>
            )}
          </Box>
          <Box sx={{ textAlign: "right", flexShrink: 0 }}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block" }}
            >
              Selling
            </Typography>
            <Typography variant="subtitle1" fontWeight={700}>
              {formatRs(sellingPrice)}
            </Typography>
          </Box>
        </Stack>

        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: 0.5 }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Stock
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: isOut
                  ? "error.main"
                  : isLow
                    ? "warning.main"
                    : "text.primary",
              }}
            >
              {stockQuantity}
              {maxStockLevel > 0 && (
                <Box component="span" sx={{ color: "text.disabled" }}>
                  {" "}
                  / {maxStockLevel}
                </Box>
              )}
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={ratio * 100}
            color={ratioColor}
            sx={{
              height: 6,
              borderRadius: 99,
              bgcolor: surfaceAlt,
              "& .MuiLinearProgress-bar": { borderRadius: 99 },
            }}
          />
          {(reorderLevel > 0 || maxStockLevel > 0) && (
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ mt: 0.5, color: "text.disabled" }}
            >
              {reorderLevel > 0 && (
                <Typography variant="caption">
                  Reorder ≤ {reorderLevel}
                </Typography>
              )}
              {maxStockLevel > 0 && (
                <Typography variant="caption">
                  Cap {maxStockLevel}
                </Typography>
              )}
            </Stack>
          )}
        </Box>

        <Divider />

        <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
          <Box sx={{ minWidth: 70 }}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block" }}
            >
              Cost
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {formatRs(costPrice)}
            </Typography>
          </Box>
          <Box sx={{ minWidth: 70 }}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block" }}
            >
              MRP
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {formatRs(markedPrice)}
            </Typography>
          </Box>
          {margin != null && (
            <Box sx={{ minWidth: 70, ml: "auto" }}>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block" }}
              >
                Margin
              </Typography>
              <Typography
                variant="body2"
                fontWeight={700}
                sx={{
                  color: margin >= 0 ? "success.main" : "error.main",
                }}
              >
                {margin >= 0 ? "+" : ""}
                {margin.toFixed(1)}%
              </Typography>
            </Box>
          )}
        </Stack>

        {tagList.length > 0 && (
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ flexWrap: "wrap", gap: 0.5 }}
          >
            <LocalOfferRoundedIcon
              sx={{ fontSize: 14, color: "text.disabled", mt: 0.5 }}
            />
            {tagList.slice(0, 4).map((tag, i) => (
              <Chip
                key={i}
                label={tag}
                size="small"
                variant="outlined"
                sx={{
                  height: 20,
                  fontSize: "0.65rem",
                  borderRadius: 1,
                }}
              />
            ))}
            {tagList.length > 4 && (
              <Tooltip title={tagList.slice(4).join(", ")} arrow>
                <Chip
                  label={`+${tagList.length - 4}`}
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 20,
                    fontSize: "0.65rem",
                    borderRadius: 1,
                  }}
                />
              </Tooltip>
            )}
          </Stack>
        )}

        {(address || phoneNumber || housingCapacity) && (
          <>
            <Divider />
            <Stack spacing={0.5}>
              {address && (
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <StorefrontRoundedIcon
                    sx={{ fontSize: 14, color: "text.disabled" }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                    noWrap
                  >
                    {address}
                  </Typography>
                </Stack>
              )}
              <Stack direction="row" spacing={1.5}>
                {phoneNumber && (
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <CallRoundedIcon
                      sx={{ fontSize: 14, color: "text.disabled" }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      {phoneNumber}
                    </Typography>
                  </Stack>
                )}
                {housingCapacity && (
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <GroupRoundedIcon
                      sx={{ fontSize: 14, color: "text.disabled" }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      Cap {housingCapacity}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default InventoryCard;

import React from "react";
import {
  Box,
  Chip,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/Slice/cartSlice";
import { DOC_URL } from "../../../api/axiosInterceptor";
import CustomButton from "../../../components/Button/CustomButton";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";

const formatRs = (n) =>
  n == null
    ? "—"
    : `Rs ${Number(n).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}`;

const stripHtml = (html = "") =>
  String(html).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const ItemCardView = ({ data, onAdd }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const borderColor = isDark ? "#262626" : "#E7E5E4";
  const surfaceAlt = isDark ? "#1F1F1F" : "#FAFAF9";

  const description = stripHtml(data?.description);
  const isOutOfStock = (data?.stockCount ?? 0) <= 0;
  const isInactive = data?.status && data.status !== "ACTIVE";

  const handleAdd = (e) => {
    e?.stopPropagation();
    if (onAdd) onAdd(data);
    else dispatch(addToCart(data));
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2.5,
        border: `1px solid ${borderColor}`,
        bgcolor: "background.paper",
        overflow: "hidden",
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
        {data?.itemImageUrl ? (
          <Box
            component="img"
            src={DOC_URL + data.itemImageUrl}
            alt={data?.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
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
        {(isOutOfStock || isInactive) && (
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ position: "absolute", top: 8, left: 8 }}
          >
            {isOutOfStock && (
              <Chip
                size="small"
                color="error"
                label="Out of stock"
                sx={{
                  height: 22,
                  fontWeight: 600,
                  fontSize: "0.65rem",
                  borderRadius: 1,
                }}
              />
            )}
            {isInactive && (
              <Chip
                size="small"
                label="Inactive"
                sx={{
                  height: 22,
                  fontWeight: 600,
                  fontSize: "0.65rem",
                  borderRadius: 1,
                  bgcolor: "rgba(15,23,42,0.55)",
                  color: "#fff",
                }}
              />
            )}
          </Stack>
        )}
      </Box>

      <Box
        sx={{
          p: 1.75,
          display: "flex",
          flexDirection: "column",
          gap: 1.25,
          flex: 1,
        }}
      >
        <Box>
          <Tooltip title={data?.name || ""} placement="top" arrow>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              noWrap
              sx={{ letterSpacing: "-0.01em", lineHeight: 1.25 }}
            >
              {data?.name || "—"}
            </Typography>
          </Tooltip>
          {description && (
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                mt: 0.25,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>

        <Stack direction="row" spacing={2} sx={{ mt: "auto" }}>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block" }}
            >
              Selling
            </Typography>
            <Typography variant="subtitle2" fontWeight={700}>
              {formatRs(data?.sellingPrice)}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block" }}
            >
              MRP
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.disabled",
                textDecoration:
                  data?.markedPrice && data.markedPrice !== data.sellingPrice
                    ? "line-through"
                    : "none",
              }}
            >
              {formatRs(data?.markedPrice)}
            </Typography>
          </Box>
        </Stack>

        <CustomButton
          fullWidth
          size="small"
          title="Add to Cart"
          startIcon={<AddShoppingCartRoundedIcon />}
          disabled={isOutOfStock}
          onClick={handleAdd}
        />
      </Box>
    </Paper>
  );
};

export default ItemCardView;

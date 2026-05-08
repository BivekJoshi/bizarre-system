import React from "react";
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";

const formatRs = (n) =>
  n == null
    ? "—"
    : `Rs ${Number(n).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}`;

const ExpenseCard = ({ data, onEdit, onDelete, onVerify }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const borderColor = isDark ? "#262626" : "#E7E5E4";

  const {
    expenseType,
    paymentType,
    amount,
    description,
    createdBy,
    createdDate,
    verified,
  } = data || {};

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2.5,
        border: `1px solid ${borderColor}`,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        gap: 1.25,
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
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontWeight: 600,
            }}
          >
            {expenseType || "Expense"}
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.1 }}
          >
            {formatRs(amount)}
          </Typography>
        </Box>
        <Chip
          size="small"
          color={verified ? "success" : "warning"}
          variant={verified ? "filled" : "outlined"}
          icon={verified ? <VerifiedRoundedIcon sx={{ fontSize: 14 }} /> : null}
          label={verified ? "Verified" : "Unverified"}
          onClick={!verified && onVerify ? () => onVerify(data) : undefined}
          sx={{
            height: 22,
            fontWeight: 600,
            fontSize: "0.65rem",
            borderRadius: 1,
            cursor: !verified && onVerify ? "pointer" : "default",
          }}
        />
      </Stack>

      {paymentType && (
        <Stack direction="row" spacing={0.75} alignItems="center">
          <PaymentsRoundedIcon
            sx={{ fontSize: 14, color: "text.disabled" }}
          />
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {paymentType}
          </Typography>
        </Stack>
      )}

      {description && (
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
            whiteSpace: "pre-line",
          }}
        >
          {description}
        </Typography>
      )}

      <Divider />

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Stack direction="row" spacing={0.75} alignItems="center" sx={{ minWidth: 0 }}>
          <PersonOutlineRoundedIcon
            sx={{ fontSize: 14, color: "text.disabled" }}
          />
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {createdBy || "—"}
            {createdDate && ` · ${createdDate}`}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.5}>
          {onEdit && (
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={() => onEdit(data)}
                sx={{ width: 30, height: 30 }}
              >
                <EditRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={() => onDelete(data)}
                sx={{ width: 30, height: 30, color: "error.main" }}
              >
                <DeleteRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ExpenseCard;

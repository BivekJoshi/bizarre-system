import { Box, Typography, useTheme, Chip } from "@mui/material";
import {
  CheckCircle,
  HourglassEmpty,
  AttachMoney,
  EventSeat,
  Error,
} from "@mui/icons-material";
import React from "react";

const statusColors = {
  PAID: "success.main",
  UNPAID: "error.main",
  SPLIT: "warning.main",
};

const tableStatusColors = {
  RESERVED: "info.main",
  AVAILABLE: "success.main",
  OCCUPIED: "warning.main",
  OUT_OF_ORDER: "error.main",
};

const getStatusIcon = (status) => {
  switch (status) {
    case "PAID":
      return <CheckCircle />;
    case "UNPAID":
      return <AttachMoney />;
    case "SPLIT":
      return <HourglassEmpty />;
    default:
      return <Error />;
  }
};

const getTableStatusIcon = (status) => {
  switch (status) {
    case "RESERVED":
      return <EventSeat />;
    case "AVAILABLE":
      return <CheckCircle />;
    case "OCCUPIED":
      return <HourglassEmpty />;
    case "OUT_OF_ORDER":
      return <Error />;
    default:
      return <Error />;
  }
};

const getColorForAmount = (amount) => {
  if (amount > 5000) return "success.main";
  if (amount > 0) return "primary.main";
  if (amount === 0) return "warning.main";
  return "error.main";
};

const OrderReport = ({ orderReport }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: "1.5rem",
        borderRadius: 2,
        marginTop: "1rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          Order Count
        </Typography>
        <Typography variant="h6" color="text.primary">
          {orderReport?.orderCount || "N/A"}
        </Typography>
      </Box>

      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          Total Billed
        </Typography>
        <Typography
          variant="h6"
          color={getColorForAmount(orderReport?.totalBilled)}
        >
          Rs {orderReport?.totalBilled?.toFixed(2) || "N/A"}
        </Typography>
      </Box>

      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          Discount
        </Typography>
        <Typography
          variant="h6"
          color={getColorForAmount(orderReport?.discount)}
        >
          Rs {orderReport?.discount?.toFixed(2) || "N/A"}
        </Typography>
      </Box>

      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          Total Receivable
        </Typography>
        <Typography
          variant="h6"
          color={getColorForAmount(orderReport?.totalReceivable)}
        >
          Rs {orderReport?.totalReceivable?.toFixed(2) || "N/A"}
        </Typography>
      </Box>

      <Box
        sx={{
          borderLeft: `4px solid ${
            theme.palette[
              statusColors[orderReport?.batchStatus] || "text.primary"
            ]
          }`,
          paddingLeft: "0.5rem",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Batch Status
          </Typography>
        </Box>
        <Chip
          label={orderReport?.batchStatus || "N/A"}
          color={
            orderReport?.batchStatus === "PAID"
              ? "success"
              : orderReport?.batchStatus === "UNPAID"
              ? "error"
              : "warning"
          }
          icon={getStatusIcon(orderReport?.batchStatus)}
          sx={{ mt: 1 }}
        />
      </Box>

      <Box
        sx={{
          borderLeft: `4px solid ${
            theme.palette[
              tableStatusColors[orderReport?.tableStatus] || "text.primary"
            ]
          }`,
          paddingLeft: "0.5rem",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Table Status
          </Typography>
        </Box>
        <Chip
          label={orderReport?.tableStatus || "N/A"}
          color={
            orderReport?.tableStatus === "RESERVED"
              ? "info"
              : orderReport?.tableStatus === "AVAILABLE"
              ? "success"
              : orderReport?.tableStatus === "OCCUPIED"
              ? "warning"
              : "error"
          }
          icon={getTableStatusIcon(orderReport?.tableStatus)}
          sx={{ mt: 1 }}
        />
      </Box>
    </Box>
  );
};

export default OrderReport;

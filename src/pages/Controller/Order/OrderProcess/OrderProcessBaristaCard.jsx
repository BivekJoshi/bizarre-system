import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { DOC_URL } from "../../../../api/axiosInterceptor";

const statusOptions = [
  {
    label: "Waiting",
    value: "WAITING",
    color: "#2980b9",
    hoverColor: "#3498db",
  },
  {
    label: "Preparing",
    value: "PREPARING",
    color: "#27ae60",
    hoverColor: "#2ecc71",
  },
  {
    label: "Ready",
    value: "READY",
    color: "#e67e22",
    hoverColor: "#f39c12",
  },
  {
    label: "Served",
    value: "SERVED",
    color: "#8e44ad",
    hoverColor: "#9b59b6",
  },
  {
    label: "Canceled",
    value: "CANCELLED",
    color: "#c0392b",
    hoverColor: "#e74c3c",
  },
];

const OrderProcessBaristaCard = ({ data, setRowId }) => {
  const { item, batch, status } = data;

  const { name, sellingPrice, stockCount, itemImageUrl, type } = item;
  const { customerTable, totalBilled, orderCount } = batch;

  const handleSelectRow = () => {
    setRowId(data?.id);
  };

  // Find the status option that matches the current status
  const statusOption = statusOptions.find(
    (option) => option.value === status
  );

  const statusColor = statusOption ? statusOption.color : "#3a3a3a";
  const statusBackground = statusOption ? `${statusOption.hoverColor}1A` : "#f0f0f0"; // Add transparency to hoverColor

  return (
    <Card
      sx={{
        maxWidth: 450,
        margin: "20px auto",
        padding: 2,
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
        borderRadius: "16px",
        border: "1px solid #e0e0e0",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0px 12px 36px rgba(0, 0, 0, 0.12)",
        },
      }}
      onClick={handleSelectRow}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            src={DOC_URL + itemImageUrl}
            alt={name}
            variant="rounded"
            sx={{
              width: 72,
              height: 72,
              marginRight: 2,
              border: "2px solid #b3a369",
            }}
          />
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#3a3a3a" }}
            >
              {name}
            </Typography>
            <Typography variant="body2" sx={{ color: "#6e6e6e" }}>
              {type}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "#e0e0e0", marginY: 2 }} />
        <Typography
          variant="body2"
          sx={{
            color: "#3a3a3a",
            fontWeight: "500",
            backgroundColor: "#fff5cc",
            padding: "8px 12px",
            borderRadius: "8px",
            marginBottom: "16px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          Remarks: {data?.remark}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{ color: "#3a3a3a", fontWeight: "500" }}
            >
              <strong>Price: </strong>Rs {sellingPrice}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#3a3a3a", fontWeight: "500" }}
            >
              <strong>Table: </strong>
              {customerTable?.tableNumber}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#3a3a3a", fontWeight: "500" }}
            >
              <strong>Order Count: </strong>
              {orderCount}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="body1"
              fontWeight="bold"
              color={statusColor}
              sx={{
                backgroundColor: statusBackground,
                padding: "4px 10px",
                borderRadius: "16px",
                border: `1px solid ${statusColor}`,
                textAlign: "center",
                minWidth: "100px",
              }}
            >
              {status}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrderProcessBaristaCard;

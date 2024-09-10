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

const OrderProcessBaristaCard = ({ data, setRowId }) => {
  const { item, batch, status } = data;

  const { name, sellingPrice, stockCount, itemImageUrl, type } = item;

  const { customerTable, totalBilled, orderCount } = batch;

  const handleSelectRow = () => {
    setRowId(data?.id);
  };

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
              color={status === "WAITING" ? "#d1a754" : "#3a3a3a"}
              sx={{
                backgroundColor: status === "WAITING" ? "#fff7e6" : "#f0f0f0",
                padding: "6px 12px",
                borderRadius: "16px",
                border: "1px solid",
                borderColor: status === "WAITING" ? "#d1a754" : "#b3b3b3",
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

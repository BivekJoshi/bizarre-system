import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import {
  useGetCancelOrder,
  useGetOrderById,
  useGetOrderPreparing,
  useGetOrderReady,
  useGetOrderServed,
} from "../../../../hooks/order/useOrder";
import { DOC_URL } from "../../../../api/axiosInterceptor";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import CancelIcon from "@mui/icons-material/Cancel";

const OpenProcessModal = ({ rowId, refetch, onClose }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const { data: orderData, isLoading: isOrderLoading } = useGetOrderById(rowId);

  const { isLoading: isPreparingLoading, refetch: refetchPreparing } =
    useGetOrderPreparing(rowId);
  const { isLoading: isReadyLoading, refetch: refetchReady } =
    useGetOrderReady(rowId);
  const { isLoading: isServedLoading, refetch: refetchServed } =
    useGetOrderServed(rowId);
  const { isLoading: isCancelledLoading, refetch: refetchCancelled } =
    useGetCancelOrder(rowId);

  const isLoading =
    isOrderLoading ||
    (selectedCard === "preparing" && isPreparingLoading) ||
    (selectedCard === "ready" && isReadyLoading) ||
    (selectedCard === "cancelled" && isCancelledLoading) ||
    (selectedCard === "served" && isServedLoading);

  const statusCards = [
    {
      id: nanoid(),
      status: "Preparing",
      icon: <HourglassEmptyIcon style={{ fontSize: 40, color: "orange" }} />,
      description: "The order is being prepared.",
    },
    {
      id: nanoid(),
      status: "Ready",
      icon: <FastfoodIcon style={{ fontSize: 40, color: "blue" }} />,
      description: "The order is ready for pickup.",
    },
    {
      id: nanoid(),
      status: "Served",
      icon: <CheckCircleIcon style={{ fontSize: 40, color: "green" }} />,
      description: "The order has been served.",
    },
  ];

  const handleCardClick = (status) => {
    setSelectedCard(status.toLowerCase());
    switch (status.toLowerCase()) {
      case "preparing":
        refetchPreparing();
        refetch();
        toast.success("Status Changed to Preparing sucessfully");
        onClose();
        break;
      case "ready":
        refetchReady();
        refetch();
        toast.success("Status Changed to Ready sucessfully");
        onClose();
        break;
      case "served":
        refetchServed();
        refetch();
        toast.success("Status Changed to Served sucessfully");
        onClose();
        break;
      case "cancelled":
        refetchCancelled();
        refetch();
        toast.success("Status Changed to Cancelled sucessfully");
        onClose();
        break;
      default:
        break;
    }
  };

  return (
    <Box p={2}>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="auto"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              marginBottom:'1rem'
            }}
          >
            <Box display="flex" alignItems="center" mb={3}>
              <Avatar
                src={DOC_URL + orderData?.data?.item?.itemImageUrl}
                alt={orderData?.data?.item?.name}
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
                  {orderData?.data?.item?.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#6e6e6e" }}>
                  {orderData?.data?.item?.type}
                </Typography>
                <div style={{ minWidth: "300px" }}>
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
                    Remarks: {orderData?.data?.remark}
                  </Typography>
                </div>
              </Box>
            </Box>
            <Card
              variant="outlined"
              sx={{
                width: "130px",
                height: "40px",
                textAlign: "center",
                padding: "1rem",
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
              onClick={() => handleCardClick("cancelled")}
            >
              <CancelIcon style={{ color: "red" }} />
              <Typography variant="h6" gutterBottom>
                Cancel Order
              </Typography>
            </Card>
          </div>
          <Grid container spacing={3}>
            {statusCards.map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card.id}>
                <Card
                  variant="outlined"
                  sx={{
                    textAlign: "center",
                    padding: "1rem",
                    transition:
                      "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                  onClick={() => handleCardClick(card.status)}
                >
                  <CardContent>
                    {card.icon}
                    <Typography variant="h6" gutterBottom>
                      {card.status}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default OpenProcessModal;

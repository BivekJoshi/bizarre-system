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
  useDeleteOrder,
  useGetCancelOrder,
  useGetOrderById,
  useGetOrderPreparing,
  useGetOrderReady,
  useGetOrderServed,
} from "../../../../hooks/order/useOrder";
import { DOC_URL } from "../../../../api/axiosInterceptor";
import { nanoid } from "nanoid";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getUserType } from "../../../../utils/cookieHelper";

const OpenProcessModal = ({ rowId, refetch, onClose }) => {
  console.log("🚀 ~ OpenProcessModal ~ rowId:", rowId)
  const [selectedCard, setSelectedCard] = useState(null);

  const userType = getUserType();
  const { data: orderData, isLoading: isOrderLoading } = useGetOrderById(rowId);

  const { mutate: fetchPreparingOrder, isLoading: isPreparingLoading } =
    useGetOrderPreparing();
  const { mutate: fetchReadyOrder, isLoading: isReadyLoading } =
    useGetOrderReady();
  const { mutate: fetchServedOrder, isLoading: isServedLoading } =
    useGetOrderServed();
  const { mutate: fetchCancelledOrder, isLoading: isCancelledLoading } =
    useGetCancelOrder();

  const { mutate: deleteOrder, isLoading: isDelitingOrder } = useDeleteOrder({
    rowId,
  });

  const isLoading =
    isOrderLoading ||
    (selectedCard === "preparing" && isPreparingLoading) ||
    (selectedCard === "ready" && isReadyLoading) ||
    (selectedCard === "cancelled" && isCancelledLoading) ||
    (selectedCard === "served" && isServedLoading);

  const statusOrder = ["waiting", "preparing", "ready", "served"];
  const currentStatusIndex = statusOrder.indexOf(
    orderData?.data?.status?.toLowerCase()
  );

  const statusCards = [
    {
      id: nanoid(),
      status: "Preparing",
      icon: <HourglassEmptyIcon style={{ fontSize: 40, color: "orange" }} />,
      description: "The order is being prepared.",
      action: fetchPreparingOrder,
      statusKey: "preparing",
    },
    {
      id: nanoid(),
      status: "Ready",
      icon: <FastfoodIcon style={{ fontSize: 40, color: "blue" }} />,
      description: "The order is ready for pickup.",
      action: fetchReadyOrder,
      statusKey: "ready",
    },
    {
      id: nanoid(),
      status: "Served",
      icon: <CheckCircleIcon style={{ fontSize: 40, color: "green" }} />,
      description: "The order has been served.",
      action: fetchServedOrder,
      statusKey: "served",
    },
  ];

  const handleCardClick = (status, action) => {
    setSelectedCard(status);
    action(rowId);
    onClose();
    refetch();
  };

  const handleClick = (status, action) => {
    setSelectedCard(status);
    action(rowId);
    onClose();
    refetch();
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
              marginBottom: "1rem",
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
              // onClick={
              //   orderData?.data?.status === "WAITING"
              //     ? () => handleCardClick("delete", deleteOrder)
              //     : () => handleClick("cancelled", fetchCancelledOrder)
              // }
              onClick={() => {
                if (userType === "BRANCH_OWNER") {
                  return handleCardClick("delete", deleteOrder);
                }
                return orderData?.data?.status === "WAITING"
                  ? handleCardClick("delete", deleteOrder)
                  : handleClick("cancelled", fetchCancelledOrder);
              }}
            >
              {orderData?.data?.status === "WAITING" ? (
                <>
                  <DeleteForeverIcon style={{ color: "red" }} />
                  <Typography variant="h6" gutterBottom>
                    Delete Order
                  </Typography>
                </>
              ) : (
                <>
                  <CancelIcon style={{ color: "red" }} />
                  <Typography variant="h6" gutterBottom>
                    {userType === "BRANCH_OWNER"
                      ? "DeleteOrder"
                      : "Cancel Order"}
                  </Typography>
                </>
              )}
            </Card>
          </div>
          <Grid container spacing={3}>
            {statusCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={card.id}>
                <Card
                  variant="outlined"
                  sx={{
                    textAlign: "center",
                    padding: "1rem",
                    transition:
                      "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    cursor:
                      currentStatusIndex === index ? "pointer" : "not-allowed",
                    opacity: currentStatusIndex === index ? 1 : 0.5,
                    "&:hover": {
                      transform:
                        currentStatusIndex === index ? "scale(1.05)" : "none",
                      boxShadow:
                        currentStatusIndex === index
                          ? "0px 8px 16px rgba(0, 0, 0, 0.2)"
                          : "none",
                    },
                  }}
                  onClick={() =>
                    currentStatusIndex === index &&
                    handleCardClick(card.statusKey, card.action)
                  }
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

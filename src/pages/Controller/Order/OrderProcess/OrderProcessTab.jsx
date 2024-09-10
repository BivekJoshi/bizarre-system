import { Box, Tab, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useGetOrder } from "../../../../hooks/order/useOrder";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import OrderProcess from "./OrderProcess";
import { CustomPagination } from "../../../../components/Pagination/CustomPagination";
import Loader from "../../../../components/Loader/Loader";

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

const OrderProcessTab = () => {
  const theme = useTheme();
  const [status, setStatus] = useState("WAITING");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleChange = (event, newValue) => {
    setStatus(newValue);
  };

  const {
    data: orderData,
    refetch,
    isLoading,
  } = useGetOrder(pageNumber, pageSize, status);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: theme.palette.text.default,
            fontWeight: 700,
          }}
        >
          Order
        </Typography>
      </Box>
      <br />
      <TabContext value={status}>
        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
            padding: "1rem",
            marginTop: ".1rem",
          }}
        >
          <TabList
            onChange={handleChange}
            aria-label="Order Status Tabs"
            indicatorColor="none"
          >
            {statusOptions.map(({ label, value, color, hoverColor }) => (
              <Tab
                key={value}
                label={label}
                value={value}
                sx={{
                  color: "black",
                  backgroundColor: status === value ? color : "#ecf0f1",
                  fontWeight: status === value ? "bold" : "normal",
                  borderRadius: "8px",
                  textTransform: "none",
                  padding: "10px 20px",
                  marginRight: "8px",
                  "&:hover": {
                    backgroundColor: hoverColor,
                  },
                }}
              />
            ))}
          </TabList>
        </Box>

        {isLoading ? (
          <Loader />
        ) : (
          statusOptions.map(({ value }) => (
            <TabPanel key={value} value={value}>
              <OrderProcess orderData={orderData} refetch={refetch} />
            </TabPanel>
          ))
        )}
      </TabContext>

      <CustomPagination
        totalPages={orderData?.totalPages || 1}
        currentPage={pageNumber}
        onPageChange={setPageNumber}
        rowsPerPage={pageSize}
        onRowsPerPageChange={setPageSize}
        totalElements={orderData?.totalElements || 0}
      />
    </>
  );
};

export default OrderProcessTab;

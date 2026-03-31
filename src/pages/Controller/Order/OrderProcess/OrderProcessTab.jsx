import {
  Box,
  CircularProgress,
  Tab,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
  { label: "Ready", value: "READY", color: "#e67e22", hoverColor: "#f39c12" },
  { label: "Served", value: "SERVED", color: "#8e44ad", hoverColor: "#9b59b6" },
  {
    label: "Canceled",
    value: "CANCELLED",
    color: "#c0392b",
    hoverColor: "#e74c3c",
  },
];

const OrderProcessTab = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} gap={1}>
      <TabContext value={status}>
        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
            padding: "9px",
          }}
        >
          <TabList
            onChange={handleChange}
            aria-label="Order Status Tabs"
            variant={isMobile ? "scrollable" : "standard"}
            indicatorColor="none"
            sx={{
              display: "flex",
              flexWrap: isMobile ? "wrap" : "nowrap",
              justifyContent: isMobile ? "center" : "flex-start",
            }}
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
                  padding: "8px 16px",
                  margin: isMobile ? "4px" : "0 8px",
                  minWidth: isMobile ? "auto" : "120px",
                  "&:hover": {
                    backgroundColor: hoverColor,
                  },
                }}
              />
            ))}
          </TabList>
        </Box>

        {isLoading ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              minHeight: "400px",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          statusOptions.map(({ value }) => (
            <TabPanel
              key={value}
              value={value}
              sx={{ padding: "0"}}
            >
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
    </Box>
  );
};

export default OrderProcessTab;

import React, { useMemo, useState } from "react";
import { Box, Typography, Grid, useTheme } from "@mui/material";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { useGetOrder } from "../../../../hooks/order/useOrder";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import OrderProcessBaristaCard from "./OrderProcessBaristaCard";
import { CustomPagination } from "../../../../components/Pagination/CustomPagination";
import FormModal from "../../../../components/Modal/FormModal";
import OpenProcessModal from "./OpenProcessModal";

const OrderProcess = () => {
  const theme = useTheme();
  const view = useSelector((state) => state?.view?.mode);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [rowId, setRowId] = useState(null);
  const [openProcessModal, setOpenProcessModal] = useState(false);

  const { data: orderData } = useGetOrder(pageNumber, pageSize);

  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        accessorKey: "item.name",
        header: "Name",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "item.status",
        header: "Status",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "item.sellingPrice",
        header: "sellingPrice",
        maxWidth: 80,
        sortable: false,
      },
    ],
    []
  );

  const renderView = () => {
    if (view === "table") {
      return (
        <CustomTable
          columns={columns}
          data={orderData?.content}
          overFlow={"scroll"}
          width={"100%"}
          enablePagination={false}
          enableRowNumbers
          enableColumnActions
          enableEditing={true}
          edit
        />
      );
    } else {
      return (
        <Grid container spacing={2}>
          {orderData?.content.map((item, index) => (
            <Grid item xs={12} md={4} lg={3} sm={12} key={index}>
              <OrderProcessBaristaCard data={item} setRowId={setRowId} />
            </Grid>
          ))}
        </Grid>
      );
    }
  };

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
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: "1rem",
          marginTop: ".1rem",
        }}
      >
        {renderView()}
      </Box>
      <CustomPagination
        totalPages={orderData?.totalPages || 1}
        currentPage={pageNumber}
        onPageChange={setPageNumber}
        rowsPerPage={pageSize}
        onRowsPerPageChange={setPageSize}
      />

      <FormModal
        open={openProcessModal || rowId}
        onClose={() => {
          setOpenProcessModal(false);
          setRowId(null);
        }}
        width={"40%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Order Process"}
        formComponent={<OpenProcessModal rowId={rowId} />}
        showButton={false}
      />
    </>
  );
};

export default OrderProcess;

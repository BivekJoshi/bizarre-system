import React, { useMemo, useState } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { nanoid } from "nanoid";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useSelector } from "react-redux";
import { useOrderForm } from "../../../hooks/order/Order/useOrderForm";
import OrderForm from "./OrderForm";
import { useGetOrder } from "../../../hooks/order/useOrder";
import FormModal from "../../../components/Modal/FormModal";
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";
import CustomTable from "../../../components/CustomTable/CustomTable";
import SwitchTableForm from "../Batch/SwitchTableForm";
import { CustomPagination } from "../../../components/Pagination/CustomPagination";

const Order = () => {
  const theme = useTheme();
  const view = useSelector((state) => state?.view?.mode);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAddModalOpen, setIsAddModal] = useState(false);
  const [isSwitchTableModalOpen, setIsSwitchTableModalOpen] = useState(false);

  const { data: orderData } = useGetOrder(pageNumber, pageSize);

  const onClose = () => setIsAddModal(false);
  const { formik, loading } = useOrderForm({ onClose });

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
        accessorKey: "batch.status",
        header: "Status",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "remark",
        header: "Remark",
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
          {orderData?.content?.map((item, index) => (
            <Grid item xs={12} md={4} lg={3} sm={12} key={index}>
              {/* Replace with actual card view component */}
              {/* <OrderCardView data={item} /> */}
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
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button
            variant="contained"
            onClick={() => setIsSwitchTableModalOpen(true)}
            startIcon={<ControlPointRoundedIcon />}
          >
            Switch Table
          </Button>
          <Button
            variant="outlined"
            onClick={() => setIsAddModal(true)}
            startIcon={<ControlPointRoundedIcon />}
          >
            Place Order
          </Button>
        </div>
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
        open={isAddModalOpen}
        onClose={() => setIsAddModal(false)}
        width={"70%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Place Order"}
        formik={formik}
        loading={loading}
        formComponent={<OrderForm formik={formik} />}
        showButton={true}
      />
      <FormModal
        open={isSwitchTableModalOpen}
        onClose={() => setIsSwitchTableModalOpen(false)}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Switch Table"}
        formComponent={<SwitchTableForm />}
        showButton={false}
      />
    </>
  );
};

export default Order;

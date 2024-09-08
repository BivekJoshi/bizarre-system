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
import OrderCardView from "./OrderCardView";
import { useGetBatchById } from "../../../hooks/batch/usebatch";
import { useParams } from "react-router-dom";
import OrderByTableIdCardView from "./OrderByTableIdCardView";
import NoDataFound from "../../PageNotFound/NoDataFound";
import OrderReport from "./OrderReport";

const Order = () => {
  const theme = useTheme();
  const id = useParams();
  const tableId = id?.id;

  const view = useSelector((state) => state?.view?.mode);

  const [isAddModalOpen, setIsAddModal] = useState(true);
  const [isSwitchTableModalOpen, setIsSwitchTableModalOpen] = useState(false);

  const { data: orderData } = useGetBatchById(tableId);
  console.log("🚀 ~ Order ~ orderData:", orderData?.data?.orders);

  const onClose = () => setIsAddModal(false);

  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        accessorKey: "itemName",
        header: "Name",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "orderStatus",
        header: "Status",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "sellingPrice",
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
          data={orderData?.data?.orders}
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
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography>Table</Typography>
          </Grid>
          {orderData?.data?.orders?.map((item, index) => (
            <Grid item xs={12} md={4} lg={2} sm={12} key={index}>
              <OrderByTableIdCardView data={item} />
            </Grid>
          ))}
          {!orderData?.data?.orders && <NoDataFound />}
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
      <OrderReport orderReport={orderData?.data} />
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

      <FormModal
        open={isAddModalOpen}
        onClose={() => setIsAddModal(false)}
        width={"90%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Place Order"}
        // formik={formik}
        // loading={loading}
        formComponent={<OrderForm onClose={() => setIsAddModal(false)} />}
        showButton={false}
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

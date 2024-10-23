import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { nanoid } from "nanoid";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { useSelector } from "react-redux";
import OrderForm from "./OrderForm";
import FormModal from "../../../components/Modal/FormModal";
import CustomTable from "../../../components/CustomTable/CustomTable";
import SwitchTableForm from "../Batch/SwitchTableForm";
import { useGetBatchById } from "../../../hooks/batch/usebatch";
import { useParams } from "react-router-dom";
import OrderByTableIdCardView from "./OrderByTableIdCardView";
import NoDataFound from "../../PageNotFound/NoDataFound";
import OrderReport from "./OrderReport";
import GenerateBillModal from "../Batch/Bill/GenerateBillModal";
import PaymentModal from "../Batch/Payment/PaymentModal";
import PermissionButton from "../../../components/Button/PermissionButton";
import { useGetCustomerTableById } from "../../../hooks/customerTable/useCustomerTable";

const Order = () => {
  const theme = useTheme();
  const id = useParams();
  const tableId = id?.id;

  const view = useSelector((state) => state?.view?.mode);
  const userType = useSelector((state) => state?.user?.userType);

  const [isAddModalOpen, setIsAddModal] = useState(
    userType == "WAITER" ? true : false
  );
  const [isSwitchTableModalOpen, setIsSwitchTableModalOpen] = useState(false);
  const [isGenerateBillModalOpen, setIsGenerateBillModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { data: orderData, isLoading: loadingOrder } = useGetBatchById(tableId);
  console.log("🚀 ~ Order ~ orderData:", orderData?.data?.orders?.length);
  const { data: coustomerTableData, isLoading: loadingCustomerTable } =
    useGetCustomerTableById(tableId);
  // console.log("🚀 ~ Order ~ coustomerTableData:", coustomerTableData);

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
    if (loadingOrder && loadingCustomerTable) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      );
    }

    if (orderData?.data?.orders?.length === (0 || undefined)) {
      return <NoDataFound />;
    }

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
          {orderData?.data?.orders?.map((item, index) => (
            <Grid item xs={12} md={4} lg={2} sm={6} key={index}>
              <OrderByTableIdCardView data={item} />
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
            {orderData?.data?.orders?.length > 0 ? "Add Order" : " Place Order"}
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
        <div style={{ textAlign: "center" }}>
          <Typography variant="h5">
            Table No. <b>{coustomerTableData?.data?.tableNumber}</b>
          </Typography>
          <br />
        </div>
        {renderView()}
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        mt={3}
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: "1rem",
        }}
      >
        <Stack direction="row" spacing={2}>
          <PermissionButton
            label="Generate Bill"
            variant="outlined"
            onClick={() => setIsGenerateBillModalOpen(true)}
            // startIcon={<ControlPointRoundedIcon />}
            allowedUserTypes={["WAITER", "CASHIER"]}
            disabledUserTypes={[]}
          />
          <PermissionButton
            label="Make Payment"
            variant="outlined"
            onClick={() => setIsPaymentModalOpen(true)}
            // startIcon={<ControlPointRoundedIcon />}
            allowedUserTypes={["CASHIER"]}
            disabledUserTypes={[]}
          />
        </Stack>
      </Box>

      <FormModal
        open={isAddModalOpen}
        onClose={() => setIsAddModal(false)}
        width={"90%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Place Order"}
        formComponent={
          <OrderForm
            onClose={() => setIsAddModal(false)}
            orderData={orderData?.data}
          />
        }
        showButton={false}
      />
      <FormModal
        open={isSwitchTableModalOpen}
        onClose={() => setIsSwitchTableModalOpen(false)}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Switch Table"}
        formComponent={
          <SwitchTableForm
            onClose={() => setIsSwitchTableModalOpen(false)}
            tableId={tableId}
          />
        }
        showButton={false}
      />
      <FormModal
        open={isGenerateBillModalOpen}
        onClose={() => setIsGenerateBillModalOpen(false)}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Generate Bill"}
        formComponent={<GenerateBillModal batchId={orderData?.data?.batchId} />}
        showButton={false}
      />
      <FormModal
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Payment Method"}
        formComponent={<PaymentModal batchId={orderData?.data?.batchId} />}
        showButton={false}
      />
    </>
  );
};
export default Order;

import React, { useMemo, useState, useEffect } from "react";
import {
  Box,
  Button,
  Chip,
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
import {
  useGetBatchById,
  useGetRegenerateBillByBatchId,
} from "../../../hooks/batch/usebatch";
import { useParams } from "react-router-dom";
import OrderByTableIdCardView from "./OrderByTableIdCardView";
import NoDataFound from "../../PageNotFound/NoDataFound";
import OrderReport from "./OrderReport";
import GenerateBillModal from "../Batch/Bill/GenerateBillModal";
import PaymentModal from "../Batch/Payment/PaymentModal";
import PermissionButton from "../../../components/Button/PermissionButton";
import { useGetCustomerTableById } from "../../../hooks/customerTable/useCustomerTable";
import ReGenerateBillModal from "../Batch/Bill/ReGenerateBillModal";
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import OpenProcessModal from "./OrderProcess/OpenProcessModal";

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
  const [isReGenerateBillModalOpen, setIsReGenerateBillModalOpen] =
    useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [openBillLayout, setOpenLayout] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [openProcessModal, setOpenProcessModal] = useState(false);

  const {
    data: orderData,
    refetch,
    isLoading: loadingOrder,
  } = useGetBatchById(tableId);
  const { data: coustomerTableData, isLoading: loadingCustomerTable } =
    useGetCustomerTableById(tableId);

  const handleReGenerateBill = () => {
    setOpenLayout(true);
  };

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
        sortable: false,
        Cell: ({ cell }) => {
          const data = cell.getValue();
          const getColor = (status) => {
            switch (status) {
              case "PREPARING":
                return "warning";
              case "READY":
                return "success"
              case "WAITING":
                return "error";
              case "SERVED":
                return "primary";
              case "CANCELLED":
                return "error";
              default:
                return "default";
            }
          };
          return <Chip label={data} color={getColor(data)} />;
        },
      },
      {
        id: nanoid(),
        accessorKey: "sellingPrice",
        header: "Selling Price",
        maxWidth: 80,
        sortable: false,
      },
    ],
    []
  );

  const editRow = (row) => {
    setOpenProcessModal(true);
    setRowId(row?.original?.orderId);
  };

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
          enableDelete
          enableEditing={true}
          handleEdit={editRow}
          edit
        />
      );
    } else {
      return (
        <Grid container spacing={2}>
          {orderData?.data?.orders?.map((item, index) => (
            <Grid
              item
              xs={12}
              md={4}
              lg={3}
              sm={6}
              key={index}
              onClick={() => {
                setRowId(item?.orderId);
                setOpenProcessModal(true);
              }}
            >
              <OrderByTableIdCardView data={item} />
            </Grid>
          ))}
        </Grid>
      );
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [refetch]);

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
          {orderData?.data?.isBillCalculated ? (
            <div style={{ display: "flex", gap: "1rem" }}>
              <PermissionButton
                label="Regenerate Bill"
                variant="outlined"
                onClick={() => setIsReGenerateBillModalOpen(true)}
                // startIcon={<ControlPointRoundedIcon />}
                allowedUserTypes={["CASHIER", "BRANCH_OWNER", "ADMIN"]}
                disabledUserTypes={[]}
              />
              <PermissionButton
                label="Make Payment"
                variant="contained"
                onClick={() => setIsPaymentModalOpen(true)}
                // startIcon={<ControlPointRoundedIcon />}
                allowedUserTypes={["CASHIER", "BRANCH_OWNER", "ADMIN"]}
                disabledUserTypes={[]}
              />
            </div>
          ) : (
            <PermissionButton
              label="Generate Bill"
              variant="outlined"
              onClick={() => setIsGenerateBillModalOpen(true)}
              // startIcon={<ControlPointRoundedIcon />}
              allowedUserTypes={["WAITER", "CASHIER", "BRANCH_OWNER", "ADMIN"]}
              disabledUserTypes={[]}
            />
          )}
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
        formComponent={
          <GenerateBillModal
            batchId={orderData?.data?.batchId}
            onClose={() => setIsGenerateBillModalOpen(false)}
          />
        }
        showButton={false}
      />
      <FormModal
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Payment Method"}
        formComponent={
          <PaymentModal
            batchStatus={orderData?.data?.batchStatus}
            batchId={orderData?.data?.batchId}
            onClose={() => setIsPaymentModalOpen(false)}
          />
        }
        showButton={false}
      />

      <ConfirmationModal
        disagreeLabel={"No, Close !"}
        agreeLabel={"Yes, Procced"}
        alertTitle={"Regerate Bill"}
        header={"You are going to regenerate bill!"}
        confirmhead={"Are you sure ?"}
        isModalOpen={isReGenerateBillModalOpen}
        handleModalClose={handleReGenerateBill}
        handleSave={() => setIsReGenerateBillModalOpen(false)}
        icon={
          <CardMembershipIcon
            sx={{
              backgroundColor: "#e9d3f1",
              borderRadius: "50%",
              fontSize: 36,
              padding: "1rem",
              color: "#ab0ad8",
            }}
          />
        }
      />

      <FormModal
        open={openBillLayout}
        onClose={() => setOpenLayout(false)}
        width={"20%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Regenerate Bill"}
        formComponent={
          <ReGenerateBillModal
            batchId={orderData?.data?.batchId}
            onClose={() => {
              setOpenLayout(false);
              setIsReGenerateBillModalOpen(false);
            }}
          />
        }
        showButton={false}
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
        formComponent={
          <OpenProcessModal
            rowId={rowId}
            refetch={refetch}
            onClose={() => {
              setOpenProcessModal(false);
              setRowId(null);
            }}
          />
        }
        showButton={false}
      />
    </>
  );
};
export default Order;

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

const Order = () => {
  const theme = useTheme();
  const view = useSelector((state) => state?.view?.mode);
  const { data } = useGetOrder();

  const [rowData, setRowData] = useState(null);
  const [isAddModalOpen, setIsAddModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // const { mutate } = useDeleteBranch({ rowData });

  const onClose = () => setIsAddModal(false);
  const { formik, loading } = useOrderForm({ onClose });

  const deleteRow = (row) => {
    setRowData(row?.original?.id);
    setIsDeleteModalOpen(true);
  };

  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        accessorKey: "user.fullName",
        header: "Name",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "user.gender",
        header: "Gender",
        maxWidth: 80,
        sortable: false,
      },
    ],
    []
  );

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
        <Button
          variant="outlined"
          onClick={() => setIsAddModal(true)}
          startIcon={<ControlPointRoundedIcon />}
        >
          Place Order
        </Button>
      </Box>

      <br />
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: "1rem",
          marginTop: ".1rem",
        }}
      >
        {/* {view === "table" ? ( */}
        <CustomTable
          columns={columns}
          data={data?.content}
          overFlow={"scroll"}
          width={"100%"}
          enableRowNumbers
          enableColumnActions
          // enableDelete
          enableEditing={true}
          // handleDeleteRow={deleteRow}
          // handleEdit={editRow}
          // delete
          edit
        />
        {/* ) : (
        <Grid container spacing={2}>
          {data?.content?.map((data, index) => {
            return (
              <Grid item xs={12} md={4} lg={4} sm={12} key={index}>
                <BranchOwnerCardView data={data} />
              </Grid>
            );
          })}
        </Grid>
      )} */}
      </Box>

      <FormModal
        open={isAddModalOpen}
        onClose={() => setIsAddModal(false)}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Add Cashier"}
        formik={formik}
        loading={loading}
        formComponent={
          <>
            <OrderForm formik={formik} />
          </>
        }
        showButton={true}
      />
      <FormModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Edit Cashier Detial"}
        formik={formik}
        loading={loading}
        formComponent={
          <>
            <OrderForm formik={formik} />
          </>
        }
        showButton={true}
      />
      <ConfirmationModal
        disagreeLabel={"Yes, Delete !"}
        agreeLabel={"No, Keep It."}
        alertTitle={"Delete Alert"}
        header={"You're going to delete this Id?"}
        confirmhead={"Are you sure ?"}
        handleModalClose={() => setIsDeleteModalOpen(false)}
        isModalOpen={isDeleteModalOpen}
        // handleSave={() => mutate(rowData)}
        icon={
          <DeleteRoundedIcon
            sx={{
              backgroundColor: "#FFDDDC",
              borderRadius: "50%",
              fontSize: 36,
              padding: "1rem",
            }}
          />
        }
      />
    </>
  );
};

export default Order;

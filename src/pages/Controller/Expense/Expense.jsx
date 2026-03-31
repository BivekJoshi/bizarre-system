import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import FormModal from "../../../components/Modal/FormModal";
import ExpenseForm from "./ExpenseForm/ExpenseForm/ExpenseForm";
import { useAddExpenseForm } from "../../../hooks/expense/expense/addExpense/useAddExpenseForm";
import { useFilterExpenseForm } from "../../../hooks/expense/expense/filterExpense/useFilterExpenseForm";
import { nanoid } from "nanoid";
import NoDataFound from "../../PageNotFound/NoDataFound";
import CustomTable from "../../../components/CustomTable/CustomTable";
import FilterExpenseForm from "./ExpenseForm/FilterExpense/FilterExpenseForm";
import { useSelector } from "react-redux";
import { CustomPaginationUpdated } from "../../../components/Pagination/CustomPaginationUpdated";
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {
  useDeleteExpense,
  useGetExpenseVerifyById,
} from "../../../hooks/expense/useExpense";
import VerfiedIcon from "@mui/icons-material/Verified";
import ExpenseCard from "./ExpenseForm/ExpenseCard";

const Expense = () => {
  const theme = useTheme();
  const view = useSelector((state) => state?.view?.mode);

  const [rowData, setRowData] = useState(null);

  const [isAddModalOpen, setIsAddModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  const [filteredData, setFilteredData] = useState(null);

  const onClose = () => {
    setIsAddModal(false);
    setIsEditModalOpen(false);
  };

  const { formik, successFlag, loading } = useAddExpenseForm({
    onClose,
    rowData,
  });

  const handleModalClose = () => {
    formik.resetForm();
    setRowData(null);
    setIsAddModal(false);
    setIsEditModalOpen(false);
  };

  const { formik: filterFormik, loading: isLoading } = useFilterExpenseForm({
    expenseData: (data) => setFilteredData(data),
    successFlag,
  });
  const { mutate } = useDeleteExpense({
    onSuccess: () => {
      filterFormik.handleSubmit();
      setIsDeleteModalOpen(false);
    },
  });
  const { mutate: verifyExpense } = useGetExpenseVerifyById(
    rowData,
    setIsVerifyModalOpen,
    filterFormik,
  );

  const editRow = (row) => {
    setIsEditModalOpen(true);
    setRowData(row?.original);
  };
  const deleteRow = (row) => {
    setRowData(row?.original?.id);
    setIsDeleteModalOpen(true);
  };

  const confimVerify = () => {
    verifyExpense({
      onSuccess: () => {
        setIsVerifyModalOpen(false);
        filterFormik.handleSubmit();
      },
    });
  };

  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        accessorKey: "expenseType",
        header: "Expense Type",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "paymentType",
        header: "Payment Type",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "amount",
        header: "Amount",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "description",
        header: "Description",
        maxWidth: 250,
        size: 200,
        sortable: false,
        Cell: ({ cell }) => {
          const { description } = cell?.row?.original || {};
          return (
            <div
              style={{
                wordBreak: "break-word",
                whiteSpace: "normal",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {description || "N/A"}
            </div>
          );
        },
      },

      {
        id: nanoid(),
        accessorKey: "createdBy",
        header: "Created By",
        maxWidth: 150,
        sortable: false,
        Cell: ({ cell }) => {
          const { createdBy, createdDate } = cell?.row?.original || {};
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>{createdBy || "N/A"}</span>
              <span>{createdDate || "-"}</span>
            </div>
          );
        },
      },
      {
        id: nanoid(),
        header: "Verified By",
        maxWidth: 150,
        sortable: false,
        Cell: ({ cell }) => {
          const { verified, verifiedBy, id } = cell?.row?.original || {};
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>{verifiedBy || ""}</span>
              <span>
                {verified ? (
                  <Chip label="Verified" color="success" />
                ) : (
                  <Chip
                    label="Unverified"
                    color="warning"
                    onClick={() => {
                      setIsVerifyModalOpen(true);
                      setRowData(id);
                    }}
                  />
                )}
              </span>
            </div>
          );
        },
      },
    ],
    [],
  );

  const renderView = () => {
    if (isLoading) {
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
    if (!filteredData?.content || filteredData.content.length === 0) {
      return <NoDataFound />;
    }
    if (view === "table") {
      return (
        <CustomTable
          columns={columns}
          data={filteredData?.content}
          overFlow={"scroll"}
          width={"100%"}
          enablePagination={false}
          enableRowNumbers
          enableColumnActions
          enableDelete
          enableEditing={true}
          handleDeleteRow={deleteRow}
          handleEdit={editRow}
          delete
          edit
        />
      );
    } else {
      return (
        <Grid container spacing={2}>
          {filteredData.content.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <ExpenseCard
                data={item}
                onEdit={editRow}
                onDelete={deleteRow}
                onVerify={(id) => {
                  setIsVerifyModalOpen(true);
                  setRowData(id);
                }}
              />
            </Grid>
          ))}
        </Grid>
      );
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} gap={1}>
      <FilterExpenseForm
        filterFormik={filterFormik}
        setIsAddModal={setIsAddModal}
      />

      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: "1rem",
          marginTop: ".1rem",
        }}
      >
        {renderView()}
      </Box>
      <CustomPaginationUpdated
        totalPages={filteredData?.totalPages || 1}
        currentPage={filteredData?.pageable?.pageNumber + 1}
        rowsPerPage={filteredData?.pageable?.pageSize}
        totalElements={filteredData?.totalElements || 0}
        filterFormik={filterFormik}
      />

      <FormModal
        open={isAddModalOpen}
        onClose={handleModalClose}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Add Expense"}
        formik={formik}
        loading={loading}
        formComponent={
          <>
            <ExpenseForm formik={formik} />
          </>
        }
        showButton={true}
      />
      <FormModal
        open={isEditModalOpen}
        onClose={handleModalClose}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Edit Expenses"}
        formik={formik}
        loading={loading}
        isEditModalOpen={isEditModalOpen}
        formComponent={
          <>
            <ExpenseForm formik={formik} />
          </>
        }
        showButton={true}
      />
      <ConfirmationModal
        disagreeLabel={"Yes, Delete !"}
        agreeLabel={"No, Keep It."}
        alertTitle={"Delete Alert"}
        header={"You're going to delete this expense data !!"}
        confirmhead={"Are you sure ?"}
        handleModalClose={() => setIsDeleteModalOpen(false)}
        isModalOpen={isDeleteModalOpen}
        handleSave={() => mutate(rowData)}
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
      <ConfirmationModal
        disagreeLabel={"Yes, Confirm"}
        agreeLabel={"No, Don't Verify."}
        alertTitle={"Confirm !!!"}
        header={"Verify Expense"}
        confirmhead={"Are you sure ?"}
        handleModalClose={() => {
          setIsVerifyModalOpen(false);
          // close();
        }}
        isModalOpen={isVerifyModalOpen}
        icon={
          <VerfiedIcon
            sx={{
              backgroundColor: "#a3fca1",
              borderRadius: "50%",
              fontSize: 36,
              padding: "1rem",
              color: "green",
            }}
          />
        }
        handleSave={confimVerify}
      />
    </Box>
  );
};

export default Expense;

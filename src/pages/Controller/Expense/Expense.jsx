import {
  Box,
  Button,
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

const Expense = () => {
  const theme = useTheme();
  const view = useSelector((state) => state?.view?.mode);

  const [rowData, setRowData] = useState(null);

  const [isAddModalOpen, setIsAddModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [filteredData, setFilteredData] = useState(null);

  const onClose = () => {
    setIsAddModal(false);
    setIsEditModalOpen(false);
  };
  
  const { formik, successFlag, loading } = useAddExpenseForm({
    onClose,
    rowData,
  });

  const { formik: filterFormik, loading: isLoading } = useFilterExpenseForm({
    expenseData: (data) => setFilteredData(data),
    successFlag,
  });

  const editRow = (row) => {
    setIsEditModalOpen(true);
    setRowData(row?.original);
  };

  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        accessorKey: "expenseType",
        header: "expenseType",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "description",
        header: "description",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "paymentType",
        header: "paymentType",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "amount",
        header: "amount",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "createdBy",
        header: "createdBy",
        maxWidth: 80,
        sortable: false,
      },

      {
        id: nanoid(),
        accessorKey: "createdDate",
        header: "createdDate",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "verified",
        header: "verified",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "verifiedBy",
        header: "verifiedBy",
        maxWidth: 80,
        sortable: false,
      },
    ],
    []
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
          // enableDelete
          enableEditing={true}
          // handleDeleteRow={deleteRow}
          handleEdit={editRow}
          // delete
          edit
        />
      );
    } else {
      return (
        <Grid container spacing={2}>
          {filteredData?.content?.map((item, index) => (
            <Grid item xs={12} md={4} lg={3} sm={12} key={index}>
              {/* <BookCardView data={item} /> */}
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
          Expense
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setIsAddModal(true)}
          startIcon={<ControlPointRoundedIcon />}
        >
          Add Expense
        </Button>
      </Box>

      <br />
      <FilterExpenseForm filterFormik={filterFormik} />
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
      <CustomPaginationUpdated
        totalPages={filteredData?.totalPages || 1}
        currentPage={filteredData?.pageable?.pageNumber + 1}
        rowsPerPage={filteredData?.pageable?.pageSize}
        totalElements={filteredData?.totalElements || 0}
        filterFormik={filterFormik}
      />

      <FormModal
        open={isAddModalOpen}
        onClose={() => setIsAddModal(false)}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Add Book"}
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
        onClose={() => setIsEditModalOpen(false)}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Add Book"}
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
    </>
  );
};

export default Expense;

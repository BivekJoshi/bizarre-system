import React, { useMemo, useState, useCallback } from "react";
import { Box, Button, Chip, Grid, Typography, useTheme } from "@mui/material";
import { nanoid } from "nanoid";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useCustomerTableForm } from "../../../hooks/customerTable/CustomerTable/useCustomerTable";
import FormModal from "../../../components/Modal/FormModal";
import CustomTable from "../../../components/CustomTable/CustomTable";
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";
import { useGetCustomerTable } from "../../../hooks/customerTable/useCustomerTable";
import { useSelector } from "react-redux";
import CustomerTableCardView from "./CustomerTableCardView";
import { CustomPagination } from "../../../components/Pagination/CustomPagination";
import CustomerTableForm from "./CustomerTableForm";
import { useNavigate } from "react-router-dom";
import Filter from "../../../components/Filter/Filter";

const CustomerTable = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const view = useSelector((state) => state?.view?.mode);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [rowData, setRowData] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data } = useGetCustomerTable(pageNumber, pageSize);

  const onClose = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const { formik, loading } = useCustomerTableForm({ onClose, rowData });

  const deleteRow = useCallback((row) => {
    setRowData(row?.original?.id);
    setIsDeleteModalOpen(true);
  }, []);

  const editRow = useCallback((row) => {
    setIsEditModalOpen(true);
    setRowData(row?.original);
  }, []);

  const handleEnter = useCallback((row) => {
    if (row?.original?.id) {
      navigate(`${row.original?.id}`);
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "OCCUPIED":
        return "error";
      case "AVAILABLE":
        return "success";
      case "RESERVED":
        return "warning";
      case "OUT_OF_ORDER":
        return "secondary";
      default:
        return "default";
    }
  };

  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        accessorKey: "tableNumber",
        header: "Table Number",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "status",
        header: "Status",
        maxWidth: 80,
        sortable: false,
        Cell: ({ cell }) => {
          const data = cell.getValue();
          return <Chip label={data} color={getStatusColor(data)} />;
        },
      },
    ],
    []
  );

  const renderView = () => {
    if (view === "table") {
      return (
        <CustomTable
          columns={columns}
          data={data?.content || []}
          overFlow={"scroll"}
          width={"100%"}
          enablePagination={false}
          enableRowNumbers
          enableColumnActions
          enableEditing={true}
          handleEdit={editRow}
          handleEnter={handleEnter}
          edit
          enter
        />
      );
    } else {
      return (
        <Grid container spacing={2}>
          {data?.content?.map((item, index) => (
            <Grid item xs={12} md={4} lg={3} sm={12} key={index}>
              <CustomerTableCardView data={item} />
            </Grid>
          ))}
        </Grid>
      );
    }
  };

  return (
    <>
      {/* <NewFilter
        inputField={filterMenuItem}
        searchCallBack={handleSearch}
        validate={adminUsersViewSchema}
        showfilter={false}
        submitButtonText="Search"
        extraFilter={true}
        handleSearch={handleSearch}
      /> */}
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
          Customer Table
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setIsAddModalOpen(true)}
          startIcon={<ControlPointRoundedIcon />}
        >
          Add Customer Table
        </Button>
      </Box>

      <Filter
        inputField={[]}
        showfilter={false}
        submitButtonText="Search"
        extraFilter={true}
      />

      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: "1rem",
          marginTop: "1rem",
        }}
      >
        {renderView()}
      </Box>
      <CustomPagination
        totalPages={data?.totalPages || 1}
        currentPage={pageNumber}
        onPageChange={setPageNumber}
        rowsPerPage={pageSize}
        onRowsPerPageChange={setPageSize}
        totalElements={data?.totalElements || 0}
      />
      <FormModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Add Customer Table"}
        formik={formik}
        loading={loading}
        formComponent={<CustomerTableForm formik={formik} />}
        showButton={true}
      />
      <FormModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Edit Customer Table"}
        formik={formik}
        loading={loading}
        formComponent={<CustomerTableForm formik={formik} />}
        showButton={true}
      />
      <ConfirmationModal
        disagreeLabel={"Yes, Delete!"}
        agreeLabel={"No, Keep It."}
        alertTitle={"Delete Alert"}
        header={"You're going to delete this Id?"}
        confirmhead={"Are you sure?"}
        handleModalClose={() => setIsDeleteModalOpen(false)}
        isModalOpen={isDeleteModalOpen}
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

export default CustomerTable;

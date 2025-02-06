import React, { useMemo, useState, useCallback } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { nanoid } from "nanoid";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useCustomerTableForm } from "../../../hooks/customerTable/CustomerTable/useCustomerTableForm";
import FormModal from "../../../components/Modal/FormModal";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { useSelector } from "react-redux";
import CustomerTableCardView from "./CustomerTableCardView";
import CustomerTableForm from "./CustomerTableForm";
import { useNavigate } from "react-router-dom";
import Filter from "../../../components/Filter/Filter";
import NoDataFound from "../../PageNotFound/NoDataFound";
import { useFilterCustomerTableForm } from "../../../hooks/customerTable/CustomerTable/filterCustomerTable/useFilterCustomerTableForm";
import FilterCustomerTableForm from "./FilterCustomerTableForm";
import { CustomPaginationUpdated } from "../../../components/Pagination/CustomPaginationUpdated";
import GpsFixedRoundedIcon from "@mui/icons-material/GpsFixedRounded";

const CustomerTable = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const view = useSelector((state) => state?.view?.mode);

  const [rowData, setRowData] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [filteredData, setFilteredData] = useState(null);

  const onClose = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const { formik, successFlag, loading } = useCustomerTableForm({
    onClose,
    rowData,
  });

  const handleModalClose = () => {
    formik.resetForm();
    setRowData(null);
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };
  const { formik: filterFormik, loading: isLoading } =
    useFilterCustomerTableForm({
      customerTableData: (data) => setFilteredData(data),
      successFlag,
    });

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
          data={filteredData?.content || []}
          overFlow={"scroll"}
          width={"100%"}
          enablePagination={false}
          enableRowNumbers
          enableColumnActions
          enableEditing={true}
          handleEdit={editRow}
          handleEnter={handleEnter}
          enterIcon={<GpsFixedRoundedIcon />}
          entertooltip={"Enter"}
          edit
          enter
        />
      );
    } else {
      return (
        <Grid container spacing={2}>
          {filteredData?.content?.map((item, index) => (
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

      <br />
      <FilterCustomerTableForm filterFormik={filterFormik} />
      <br />

      {/* <Filter
        inputField={[]}
        showfilter={false}
        submitButtonText="Search"
        extraFilter={true}
      /> */}

      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: "1rem",
          marginTop: "1rem",
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
        header={"Add Customer Table"}
        formik={formik}
        loading={loading}
        formComponent={<CustomerTableForm formik={formik} />}
        showButton={true}
      />
      <FormModal
        open={isEditModalOpen}
        onClose={handleModalClose}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Edit Customer Table"}
        formik={formik}
        loading={loading}
        isEditModalOpen={isEditModalOpen}
        formComponent={<CustomerTableForm formik={formik} />}
        showButton={true}
      />
    </>
  );
};

export default CustomerTable;

import React, { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { nanoid } from "nanoid";
import maleProfile from "../../../assets/MaleProfile.png";
import femaleProfile from "../../../assets/FemaleProfile.png";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CustomerForm from "./CustomerForm";
import { useCustomerForm } from "../../../hooks/customer/Customer/useCustomerForm";
import FormModal from "../../../components/Modal/FormModal";
import CustomTable from "../../../components/CustomTable/CustomTable";
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";
import { useSelector } from "react-redux";
import { CustomPagination } from "../../../components/Pagination/CustomPagination";
import { DOC_URL } from "../../../api/axiosInterceptor";
import CustomerCardView from "./CustomerCardView";
import NoDataFound from "../../PageNotFound/NoDataFound";
import FilterCustomerForm from "./FilterCustomerForm";
import { useFilterCustomerForm } from "../../../hooks/customer/Customer/filterCustomer/useFilterCustomerForm";
import { CustomPaginationUpdated } from "../../../components/Pagination/CustomPaginationUpdated";
import VerfiedIcon from "@mui/icons-material/Verified";
import { useVerifyCustomer } from "../../../hooks/customer/useCustomer";

const Customer = () => {
  const theme = useTheme();
  const view = useSelector((state) => state?.view?.mode);

  const [rowData, setRowData] = useState(null);
  const rowId = rowData?.id;
  const [isAddModalOpen, setIsAddModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  const [filteredData, setFilteredData] = useState(null);

  const { mutate: verifyCustomer } = useVerifyCustomer(rowId);

  const onClose = () => setIsAddModal(false);
  const { formik, loading } = useCustomerForm({ onClose });

  const { formik: filterFormik, loading: isLoading } = useFilterCustomerForm({
    customerData: (data) => setFilteredData(data),
  });

  const deleteRow = (row) => {
    setRowData(row?.original?.id);
    setIsDeleteModalOpen(true);
  };

  const handleEnter = (row) => {
    setRowData(row?.original);
    setIsVerifyModalOpen(true);
  };

  const confimVerify = () => {
    verifyCustomer({
      onSuccess: () => {
        setIsVerifyModalOpen(false);
      },
    });
  };

  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        header: "Name",
        sortable: false,
        Cell: ({ cell }) => {
          const data = cell.row.original?.user;
          const imageFinal = data?.profilePictureUrl
            ? DOC_URL + data?.profilePictureUrl
            : data?.gender === "MALE"
            ? maleProfile
            : data?.gender === "FEMALE"
            ? femaleProfile
            : null;
          return (
            <div style={{ display: "flex", gap: ".5rem" }}>
              <Avatar alt="Profile Image" src={imageFinal} />
              <p>{data?.fullName}</p>
            </div>
          );
        },
      },
      {
        id: nanoid(),
        accessorKey: "user.gender",
        header: "Gender",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "user.birthDate",
        header: "DOB",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "user.address",
        header: "Address",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "user.email",
        header: "Email",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "user.mobileNumber",
        header: "Mobile Number",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "user.userType",
        header: "User Type",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "user.status",
        header: "Status",
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
          data={filteredData.content}
          overFlow={"scroll"}
          width={"100%"}
          enablePagination={false}
          enableRowNumbers
          enableColumnActions
          enableEditing={true}
          // handleDeleteRow={deleteRow}
          // handleEdit={editRow}
          handleEnter={handleEnter}
          enterIcon={<VerfiedIcon />}
          entertooltip={"Verify Customer"}
          enter
        />
      );
    } else {
      return (
        <Grid container spacing={2}>
          {filteredData.content.map((item, index) => (
            <Grid item xs={12} md={4} lg={4} sm={12} key={index}>
              <CustomerCardView data={item} />
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
          Customer
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setIsAddModal(true)}
          startIcon={<ControlPointRoundedIcon />}
        >
          Add Customer
        </Button>
      </Box>

      <br />
      <FilterCustomerForm filterFormik={filterFormik} />
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
        header={"Add Cashier"}
        formik={formik}
        loading={loading}
        formComponent={
          <>
            <CustomerForm formik={formik} />
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
            <CustomerForm formik={formik} />
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
      <ConfirmationModal
        disagreeLabel={"Yes, Confirm"}
        agreeLabel={"No, Don't Verify."}
        alertTitle={"Confirm !!!"}
        header={"Verify Customer"}
        confirmhead={"Are you sure ?"}
        handleModalClose={() => {
          setIsVerifyModalOpen(false);
          close();
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
    </>
  );
};

export default Customer;

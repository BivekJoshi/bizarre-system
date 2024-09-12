import React, { useMemo, useState } from "react";
import { Avatar, Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { nanoid } from "nanoid";
import maleProfile from "../../../../assets/MaleProfile.png";
import femaleProfile from "../../../../assets/FemaleProfile.png";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FormModal from "../../../../components/Modal/FormModal";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import { useGetMember } from "../../../../hooks/member/useMember";
import WaiterForm from "./WaiterForm";
import { useWaiterMemberForm } from "../../../../hooks/member/Member/WaiterMember/useWaiterMemberForm";
import ConfirmationModal from "../../../../components/Modal/ConfirmationModal";
import { useSelector } from "react-redux";
import WaiterCardView from "./WaiterCardView";
import { CustomPagination } from "../../../../components/Pagination/CustomPagination";
import { DOC_URL } from "../../../../api/axiosInterceptor";
import PermissionButton from "../../../../components/Button/PermissionButton";

const Waiter = () => {
  const theme = useTheme();
  const view = useSelector((state) => state?.view?.mode);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [rowData, setRowData] = useState(null);
  const [isAddModalOpen, setIsAddModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data } = useGetMember(pageNumber, pageSize);

  // const { mutate } = useDeleteBranch({ rowData });

  const onClose = () => setIsAddModal(false);
  const { formik, loading } = useWaiterMemberForm({ onClose, rowData });

  const deleteRow = (row) => {
    setRowData(row?.original?.id);
    setIsDeleteModalOpen(true);
  };
  const editRow = (row) => {
    setIsEditModalOpen(true);
    setRowData(row?.original);
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
        accessorKey: "salary",
        header: "Salary",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "branch.address",
        header: "Branch",
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
    if (view === "table") {
      return (
        <CustomTable
          columns={columns}
          data={data?.content}
          overFlow={"scroll"}
          width={"100%"}
          enablePagination={false}
          enableRowNumbers
          enableColumnActions
          // enableDelete
          // handleDeleteRow={deleteRow}
          // delete
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
          {data?.content?.map((data, index) => {
            return (
              <Grid item xs={12} md={4} lg={4} sm={12} key={index}>
                <WaiterCardView data={data} />
              </Grid>
            );
          })}
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
          Waiter Member
        </Typography>

        <PermissionButton
          label="Add Waiter"
          variant="outlined"
          onClick={() => setIsAddModal(true)}
          startIcon={<ControlPointRoundedIcon />}
          allowedUserTypes={["BRANCH_OWNER"]}
          disabledUserTypes={["ADMIN"]}
        />
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
        totalPages={data?.totalPages || 1}
        currentPage={pageNumber}
        onPageChange={setPageNumber}
        rowsPerPage={pageSize}
        onRowsPerPageChange={setPageSize}
        totalElements={data?.totalElements || 0}
      />

      <FormModal
        open={isAddModalOpen}
        onClose={() => setIsAddModal(false)}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Add Branch"}
        formik={formik}
        loading={loading}
        formComponent={
          <>
            <WaiterForm formik={formik} />
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
        header={"Add Branch"}
        formik={formik}
        loading={loading}
        formComponent={
          <>
            <WaiterForm formik={formik} data={rowData} />
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

export default Waiter;

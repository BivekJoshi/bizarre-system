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
import ConfirmationModal from "../../../../components/Modal/ConfirmationModal";
import { useSelector } from "react-redux";
import BaristaForm from "./BaristaForm";
import BaristaCardView from "./BaristaCardView";
import { useBaristaMemberForm } from "../../../../hooks/member/Member/BaristaMember/useBaristaMemberForm";
import { CustomPagination } from "../../../../components/Pagination/CustomPagination";
import { DOC_URL } from "../../../../api/axiosInterceptor";
import PermissionButton from "../../../../components/Button/PermissionButton";
import MemberDocumentForm from "../MemberDocumentForm";

const Barista = () => {
  const theme = useTheme();
  const view = useSelector((state) => state?.view?.mode);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [rowData, setRowData] = useState(null);
  const [isAddModalOpen, setIsAddModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data } = useGetMember(pageNumber, pageSize);

  // const { mutate } = useDeleteBranch({ rowData });

  const onClose = () => setIsAddModal(false);
  const { formik, loading } = useBaristaMemberForm({ onClose, rowData });

  const deleteRow = (row) => {
    setRowData(row?.original?.id);
    setIsDeleteModalOpen(true);
  };

  const editRow = (row) => {
    setIsEditModalOpen(true);
    setRowData(row?.original);
  };

  const handleAddDocumentRow = (row) => {
    setIsDocumentModalOpen(true);
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
          enableEditing={true}
          handleEdit={editRow}
          handleAddDocumentRow={handleAddDocumentRow}
          edit
          document
        />
      );
    } else {
      return (
        <Grid container spacing={2}>
          {data?.content?.map((data, index) => {
            return (
              <Grid item xs={12} md={4} lg={4} sm={12} key={index}>
                <BaristaCardView data={data} />
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
          Barista
        </Typography>

        <PermissionButton
          label="Add Barista"
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
        header={"Add Cashier"}
        formik={formik}
        loading={loading}
        formComponent={
          <>
            <BaristaForm formik={formik} />
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
            <BaristaForm formik={formik} />
          </>
        }
        showButton={true}
      />
      <FormModal
        open={isDocumentModalOpen}
        onClose={() => setIsDocumentModalOpen(false)}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Add Member Document"}
        // formik={formik}
        // loading={loading}
        formComponent={
          <>
            <MemberDocumentForm
              onClose={() => setIsDocumentModalOpen(false)}
              rowData={rowData?.id}
            />
          </>
        }
        showButton={false}
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

export default Barista;

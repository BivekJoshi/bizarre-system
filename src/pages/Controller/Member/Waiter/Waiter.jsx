import React, { useMemo, useState } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
// import FormModal from "../../../components/Modal/FormModal";
// import AddBranch from "./AddBranch";
// import { useBranchForm } from "../../../hooks/branch/Branch/useBranchForm";
// import CustomTable from "../../../components/CustomTable/CustomTable";
import { nanoid } from "nanoid";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
// import ConfirmationModal from "../../../components/Modal/ConfirmationModal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FormModal from "../../../../components/Modal/FormModal";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import { useGetMember } from "../../../../hooks/member/useMember";
import WaiterForm from "./WaiterForm";
import { useWaiterMemberForm } from "../../../../hooks/member/Member/WaiterMember/useWaiterMemberForm";
import ConfirmationModal from "../../../../components/Modal/ConfirmationModal";

const Waiter = () => {
  const theme = useTheme();
  const { data } = useGetMember();
  console.log("🚀 ~ Waiter ~ data:", data)

  const [rowData, setRowData] = useState(null);
  const [isAddModalOpen, setIsAddModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // const { mutate } = useDeleteBranch({ rowData });

  const onClose = () => setIsAddModal(false);
  const { formik, loading } = useWaiterMemberForm(onClose);

  const deleteRow = (row) => {
    setRowData(row?.original?.id);
    setIsDeleteModalOpen(true);
  };

  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        accessorKey: "user.fullName",
        header: "fullName",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "user.gender",
        header: "gender",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "user.birthDate",
        header: "birthDate",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "user.address",
        header: "address",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "user.email",
        header: "email",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "user.mobileNumber",
        header: "mobileNumber",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "user.userType",
        header: "userType",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "user.status",
        header: "status",
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
          Waiter Member
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setIsAddModal(true)}
          startIcon={<ControlPointRoundedIcon />}
        >
          Add Waiter
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
      </Box>

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
            <WaiterForm formik={formik} />
          </>
        }
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

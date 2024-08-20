import React, { useMemo, useState } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import FormModal from "../../../components/Modal/FormModal";
import { useBranchForm } from "../../../hooks/branch/Branch/useBranchForm";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { nanoid } from "nanoid";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddItem from "./AddItem";
import { useGetItem } from "../../../hooks/item/useItem";
import { useItemForm } from "../../../hooks/item/Item/useItemForm";

const Item = () => {
  const theme = useTheme();
  const { data } = useGetItem();

  const [rowData, setRowData] = useState(null);
  const [isAddModalOpen, setIsAddModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // const { mutate } = useDeleteBranch({ rowData });

  const onClose = () => setIsAddModal(false);
  const { formik, loading } = useItemForm({onClose});

  const deleteRow = (row) => {
    console.log("🚀 ~ deleteRow ~ row:", row);
    setRowData(row?.original?.id);
    setIsDeleteModalOpen(true);
  };

  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        accessorKey: "name",
        header: "Name",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "costPrice",
        header: "Cost Price",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "markedPrice",
        header: "Marked Price",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "sellingPrice",
        header: "Selling Price",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "description",
        header: "Description",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "stockCount",
        header: "Stock Count",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "type",
        header: "type",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "tags",
        header: "Tags",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "color",
        header: "Color",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "status",
        header: "Status",
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
          Item
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setIsAddModal(true)}
          startIcon={<ControlPointRoundedIcon />}
        >
          Add Item
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
          enableDelete
          enableEditing={true}
          handleDeleteRow={deleteRow}
          // handleEdit={editRow}
          delete
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
            <AddItem formik={formik} />
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
            <AddItem formik={formik} />
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

export default Item;

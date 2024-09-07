import React, { useMemo, useState } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import FormModal from "../../../components/Modal/FormModal";
import { useBranchForm } from "../../../hooks/branch/Branch/useBranchForm";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { nanoid } from "nanoid";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddItem from "./AddItem";
import { useGetItem } from "../../../hooks/item/useItem";
import { useItemForm } from "../../../hooks/item/Item/useItemForm";
import { useSelector } from "react-redux";
import ItemCardView from "./ItemCardView";
import EditItem from "./EditItem";
import { DOC_URL } from "../../../api/axiosInterceptor";
import { CustomPagination } from "../../../components/Pagination/CustomPagination";

const Item = () => {
  const theme = useTheme();
  const view = useSelector((state) => state?.view?.mode);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [rowData, setRowData] = useState(null);
  const [isAddModalOpen, setIsAddModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data } = useGetItem(pageNumber, pageSize);

  // const { mutate } = useDeleteBranch({ rowData });

  const onClose = () => {
    setIsAddModal(false);
    setIsEditModalOpen(false);
  };
  const { formik, loading } = useItemForm({ onClose, rowData });

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
        accessorKey: "itemImageUrl",
        header: "Image",
        Cell: ({ cell }) => {
          const imageUrl = cell.getValue();
          return (
            <div style={{ width: "100px", height: "100pxnpm " }}>
              <img
                src={DOC_URL + imageUrl}
                alt="Image"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          );
        },
      },
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
          enableDelete
          handleDeleteRow={deleteRow}
          enableEditing={true}
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
              <Grid item xs={12} md={3} lg={2} sm={12} key={index}>
                <ItemCardView data={data} />
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
        {renderView()}
      </Box>


      <CustomPagination
        totalPages={data?.totalPages || 1}
        currentPage={pageNumber}
        onPageChange={setPageNumber}
        rowsPerPage={pageSize}
        onRowsPerPageChange={setPageSize}
      />

      {isAddModalOpen && (
        <FormModal
          open={isAddModalOpen}
          onClose={() => setIsAddModal(false)}
          width={"30%"}
          height={"auto"}
          maxHeight={"80vh"}
          header={"Add Item"}
          formik={formik}
          loading={loading}
          formComponent={
            <>
              <AddItem formik={formik} />
            </>
          }
          showButton={true}
        />
      )}

      {isEditModalOpen && (
        <FormModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          width={"30%"}
          height={"auto"}
          maxHeight={"80vh"}
          header={"Edit Item"}
          formik={formik}
          loading={loading}
          enableAddPhoto={true}
          formComponent={
            <>
              <EditItem formik={formik} rowData={rowData} />
            </>
          }
          showButton={true}
        />
      )}
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

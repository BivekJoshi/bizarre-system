// import React from "react";
// import { useSelector } from "react-redux";

// const Cart = () => {
//   const cart = useSelector((state) => state.cart.cart);
//   console.log("🚀 ~ Cart ~ cart:", cart);
//   return <div>Cart</div>;
// };

// export default Cart;

import React, { useMemo, useState } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
// import FormModal from "../../../components/Modal/FormModal";
// import { useBranchForm } from "../../../hooks/branch/Branch/useBranchForm";
// import CustomTable from "../../../components/CustomTable/CustomTable";
import { nanoid } from "nanoid";
import CustomTable from "../../components/CustomTable/CustomTable";
import ItemCardView from "../Controller/Item/ItemCardView";
import { useSelector } from "react-redux";
// import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
// import ConfirmationModal from "../../../components/Modal/ConfirmationModal";
// import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
// import AddItem from "./AddItem";
// import { useGetItem } from "../../../hooks/item/useItem";
// import { useItemForm } from "../../../hooks/item/Item/useItemForm";
// import { useSelector } from "react-redux";
// import ItemCardView from "./ItemCardView";

const Item = () => {
  const theme = useTheme();
  const view = useSelector((state) => state?.view?.mode);
  const data = useSelector((state) => state.cart.cart);
  console.log("🚀 ~ Item ~ data:", data)

  const [rowData, setRowData] = useState(null);
  const [isAddModalOpen, setIsAddModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // const { mutate } = useDeleteBranch({ rowData });

  const onClose = () => setIsAddModal(false);

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
          Cart
        </Typography>
      </Box>

      <br />
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: "1rem",
          marginTop: ".1rem",
        }}
      >
        {view === "table" ? (
          <CustomTable
            columns={columns}
            data={data}
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
        ) : (
          <Grid container spacing={2}>
            {data?.map((data, index) => {
              return (
                <Grid item xs={12} md={2} lg={2} sm={12} key={index}>
                  <ItemCardView data={data} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Item;

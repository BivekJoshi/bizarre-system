import React, { useMemo, useState } from "react";
import {
  useDeleteStockInventory,
  useGetInventory,
} from "../../../hooks/inventory/useInventory";
import { nanoid } from "nanoid";
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { useFilterExpenseForm } from "../../../hooks/expense/expense/filterExpense/useFilterExpenseForm";
import FilterInventory from "./FilterInventory/FilterInventory";
import { CustomPaginationUpdated } from "../../../components/Pagination/CustomPaginationUpdated";
import CustomTable from "../../../components/CustomTable/CustomTable";
import NoDataFound from "../../PageNotFound/NoDataFound";
import { useSelector } from "react-redux";
import { useFilterInventoryForm } from "../../../hooks/inventory/filterInventory/useFilterInventoryForm";
import { DOC_URL } from "../../../api/axiosInterceptor";
import InventoryCard from "./InventoryCard";
import FormModal from "../../../components/Modal/FormModal";
import StockList from "./UpdateStock/StockList";
import { useInventoryForm } from "../../../hooks/inventory/inventory/useInventoryForm";
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";

const Inventory = () => {
  const theme = useTheme();
  const view = useSelector((state) => state?.view?.mode);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [rowId, setIsRowId] = useState();
  const [filteredData, setFilteredData] = useState(null);
  const [isAddModalOpen, setIsAddModal] = useState(false);

  const {
    formik: filterFormik,
    loading: isLoading,
    refetch,
  } = useFilterInventoryForm({
    inventoryData: (data) => setFilteredData(data),
    // successFlag,
  });

  const { mutate } = useDeleteStockInventory({
    rowId,
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      filterFormik.handleSubmit();
    },
  });

  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        accessorKey: "item",
        header: "Item",
        maxWidth: 80,
        sortable: false,
        Cell: ({ cell }) => {
          const data = cell.getValue();
          return (
            <>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {data?.name}
                </div>

                <div>
                  Cost Price <b>{data?.costPrice}</b>
                </div>
                <div>
                  Marked Price: <b>{data?.markedPrice}</b>
                </div>
                <div>
                  Selling Price: <b>{data?.sellingPrice}</b>
                </div>
                {/* <div>
                  Count: <b>{data?.stockCount}</b>
                </div> */}

                <div>Color: {data?.color}</div>

                <div>Tags: {data?.tags}</div>
                <div>Type: {data?.type}</div>
              </div>
            </>
          );
        },
      },
      {
        id: nanoid(),
        accessorKey: "item",
        header: "Image",
        Cell: ({ cell }) => {
          const data = cell.getValue();
          return (
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid #e5e5e5",
              }}
            >
              <img
                src={DOC_URL + data?.itemImageUrl}
                alt="Upload Image"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          );
        },
      },
      {
        id: nanoid(),
        accessorKey: "stockQuantity",
        header: "Stock Quantity",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "update stock",
        header: "Update Stock",
        Cell: ({ cell }) => {
          const itemId = cell?.row?.original?.item?.id;
          const [showMessageInput, setShowMessageInput] = useState(false);
          const [inputValue, setInputValue] = useState("");

          const handleInputChange = (event) => {
            setInputValue(event.target.value);
          };

          const { formik } = useInventoryForm({
            itemId,
            inputValue,
            filterFormik,
          });

          const handleMessageSubmit = () => {
            formik.handleSubmit();
          };

          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <Button
                onClick={() => setShowMessageInput(true)}
                variant="outlined"
              >
                Update Stock
              </Button>
              <Collapse in={showMessageInput}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Enter stock count"
                    value={inputValue}
                    type="number"
                    onChange={handleInputChange}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleMessageSubmit}
                  >
                    Update
                  </Button>
                </div>
              </Collapse>
            </div>
          );
        },
      },
    ],
    [],
  );

  const deleteRow = (row) => {
    setIsRowId(row?.original?.id);
    setIsDeleteModalOpen(true);
  };

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
          enableDelete
          handleDeleteRow={deleteRow}
          delete
          enableEditing={true}
        />
      );
    } else {
      return (
        <Grid container spacing={2}>
          {filteredData.content.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <InventoryCard data={item} />
            </Grid>
          ))}
        </Grid>
      );
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} gap={1}>
      <FilterInventory
        filterFormik={filterFormik}
        setIsAddModal={setIsAddModal}
      />

      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: "1rem",
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
        width={"90%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Add Inventory"}
        formComponent={
          <>
            <StockList />
          </>
        }
        showButton={false}
      />
      <ConfirmationModal
        disagreeLabel={"Yes, Delete !"}
        agreeLabel={"No, Keep It."}
        alertTitle={"Delete Alert"}
        header={"You're going to delete this inventory data !!"}
        confirmhead={"Are you sure ?"}
        handleModalClose={() => setIsDeleteModalOpen(false)}
        isModalOpen={isDeleteModalOpen}
        handleSave={() => mutate(rowId)}
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
    </Box>
  );
};

export default Inventory;

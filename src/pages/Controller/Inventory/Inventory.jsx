import React, { useMemo, useState } from "react";
import { useGetInventory } from "../../../hooks/inventory/useInventory";
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

const Inventory = () => {
  const theme = useTheme();
  const view = useSelector((state) => state?.view?.mode);

  const [filteredData, setFilteredData] = useState(null);
  const [isAddModalOpen, setIsAddModal] = useState(false);

  const { formik: filterFormik, loading: isLoading } = useFilterInventoryForm({
    inventoryData: (data) => setFilteredData(data),
    // successFlag,
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

          const { formik } = useInventoryForm({ itemId, inputValue });

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
          data={filteredData?.content}
          overFlow={"scroll"}
          width={"100%"}
          enablePagination={false}
          enableRowNumbers
          // enableColumnActions
          // enableDelete
          // enableEditing={true}
          // handleDeleteRow={deleteRow}
          // handleEdit={editRow}
          // delete
          // edit
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
          Inventory
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setIsAddModal(true)}
          startIcon={<ControlPointRoundedIcon />}
        >
          Add Inventory
        </Button>
      </Box>

      <br />
      <FilterInventory filterFormik={filterFormik} />
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
    </>
  );
};

export default Inventory;

import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  TextField,
  IconButton,
  Box,
  ButtonGroup,
  useTheme,
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { DOC_URL } from "../../../api/axiosInterceptor";
import { useOrderForm } from "../../../hooks/order/Order/useOrderForm";
import { LoadingButton } from "@mui/lab";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import NoDataFound from "../../PageNotFound/NoDataFound";
import { CustomPaginationUpdated } from "../../../components/Pagination/CustomPaginationUpdated";

const OrderItem = ({
  filteredData,
  filterFormik,
  isLoadingItem,
  onClose,
  orderData,
}) => {
  const theme = useTheme();

  const [selectedIds, setSelectedIds] = useState([]);
  const [remarks, setRemarks] = useState({});
  const [itemCounts, setItemCounts] = useState({});

  const { formik, loading } = useOrderForm({
    remarks,
    selectedIds,
    onClose,
    orderData,
    itemCounts,
  });

  const handleClick = (id) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );

    if (!selectedIds.includes(id)) {
      setRemarks((prevRemarks) => ({
        ...prevRemarks,
        [id]: [""] 
      }));
    } else {
      const { [id]: _, ...remainingRemarks } = remarks;
      setRemarks(remainingRemarks);
      setItemCounts((prevCounts) => {
        const { [id]: _, ...remainingCounts } = prevCounts;
        return remainingCounts;
      });
    }
  };

  const handleCountChange = (id, increment) => {
    setItemCounts((prevCounts) => {
      const newCount = Math.max(1, (prevCounts[id] || 1) + increment);
      setRemarks((prevRemarks) => {
        const currentRemarks = prevRemarks[id] || [];
        const updatedRemarks = [...currentRemarks];

        if (newCount > currentRemarks.length) {
          updatedRemarks.push("");
        } else {
          updatedRemarks.length = newCount; 
        }

        return {
          ...prevRemarks,
          [id]: updatedRemarks,
        };
      });

      return {
        ...prevCounts,
        [id]: newCount,
      };
    });
  };

  const handleRemarkChange = (id, index, value) => {
    setRemarks((prevRemarks) => {
      const updatedRemarks = [...(prevRemarks[id] || [])];
      updatedRemarks[index] = value || "";
      return {
        ...prevRemarks,
        [id]: updatedRemarks,
      };
    });
  };

  return (
    <Grid container spacing={3}>
      {isLoadingItem && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <CircularProgress />
        </Box>
      )}
      {!filteredData?.content ||
        (filteredData.content.length === 0 && <NoDataFound />)}
      <br />
      {filteredData?.content.map((item) => (
        <Grid item xs={12} sm={6} md={2} key={item.id}>
          <Card
            onClick={() => handleClick(item.id)}
            sx={{
              cursor: "pointer",
              position: "relative",
              border: selectedIds.includes(item.id)
                ? "2px solid green"
                : "1px solid #ddd",
              transition: "0.3s",
              boxShadow: selectedIds.includes(item.id)
                ? "0 4px 12px rgba(0, 128, 0, 0.3)"
                : "none",
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={
                item.itemImageUrl
                  ? `${DOC_URL}${item.itemImageUrl}`
                  : "https://via.placeholder.com/150"
              }
              alt={item.name}
            />

            {item.stockCount <= 0 && (
              <div
                style={{
                  backgroundColor: "red",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  color: "white",
                  fontWeight: 900,
                  padding: "5px",
                  borderRadius: "0 0 8px 0",
                }}
              >
                Out of Stock
              </div>
            )}

            <CardContent
              sx={{
                backgroundColor: theme.palette.background.alt,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.default,
                  fontWeight: 700,
                  textAlign: "center",
                }}
                gutterBottom
                noWrap
              >
                {item.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                textAlign="center"
              >
                {`Price: Rs ${item.sellingPrice.toFixed(2)}`}
              </Typography>
              {selectedIds.includes(item.id) && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={2}
                >
                  <Typography variant="subtitle1">Quantity</Typography>
                  <ButtonGroup size="small">
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCountChange(item.id, -1);
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Chip label={itemCounts[item.id] || 1} color="primary" />
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCountChange(item.id, 1);
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </ButtonGroup>
                </Box>
              )}
            </CardContent>

            {selectedIds.includes(item.id) && (
              <IconButton
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  color: "green",
                }}
              >
                <CheckCircleIcon />
              </IconButton>
            )}
          </Card>

          {selectedIds.includes(item.id) && (
            <Box mt={2}>
              {[...Array(itemCounts[item.id] || 1)].map((_, index) => (
                <Box key={`${item.id}-remark-${index}`} mb={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={`Remark ${index + 1}`}
                    size="small"
                    value={remarks[item.id]?.[index] || ""}
                    onChange={(e) =>
                      handleRemarkChange(item.id, index, e.target.value)
                    }
                  />
                </Box>
              ))}
            </Box>
          )}
        </Grid>
      ))}

      <Grid item xs={12}>
        <CustomPaginationUpdated
          totalPages={filteredData?.totalPages || 1}
          currentPage={filteredData?.pageable?.pageNumber + 1}
          rowsPerPage={filteredData?.pageable?.pageSize}
          totalElements={filteredData?.totalElements || 0}
          filterFormik={filterFormik}
          backgroundColor="#F5F9FC"
        />
      </Grid>

      <Grid item xs={12}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            color="error"
            sx={{ marginRight: "1rem" }}
            onClick={() => {
              formik.handleReset();
              onClose();
            }}
            startIcon={<HighlightOffRoundedIcon />}
          >
            Close
          </Button>
          <LoadingButton
            loading={loading}
            onClick={() => formik.handleSubmit()}
            variant="contained"
            startIcon={<ControlPointRoundedIcon />}
            size="large"
          >
            {orderData?.orders?.length > 0 ? "Add Order" : "Place Order"}
          </LoadingButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OrderItem;

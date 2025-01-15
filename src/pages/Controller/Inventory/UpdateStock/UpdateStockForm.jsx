import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  TextField,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import NoDataFound from "../../../PageNotFound/NoDataFound";
import { DOC_URL } from "../../../../api/axiosInterceptor";
import { CustomPaginationUpdated } from "../../../../components/Pagination/CustomPaginationUpdated";
import { useAddInventoryForm, useInventoryForm } from "../../../../hooks/inventory/inventory/useInventoryForm";

const UpdateStockForm = ({
  filteredData,
  filterFormik,
  isLoadingItem,
}) => {
  const theme = useTheme();
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const { formik } = useAddInventoryForm({ selectedCardId, inputValue });

  const handleCardClick = (id) => {
    setSelectedCardId((prev) => (prev === id ? null : id));
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    formik.handleSubmit();
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
            onClick={() => handleCardClick(item.id)}
            sx={{
              cursor: "pointer",
              position: "relative",
              border: "1px solid #ddd",
              transition: "0.3s",
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
                  right: 0,
                  color: "white",
                  fontWeight: 900,
                  padding: "5px",
                  borderRadius: "0 0 0 8px",
                }}
              >
                Out of Stock
              </div>
            )}
            {item.status !== "ACTIVE" && (
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
                Not Available
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
            </CardContent>
          </Card>
          {selectedCardId === item.id && (
            <Box mt={2}>
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
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 1 }}
                onClick={handleSubmit}
              >
                Update Stock
              </Button>
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
    </Grid>
  );
};

export default UpdateStockForm;

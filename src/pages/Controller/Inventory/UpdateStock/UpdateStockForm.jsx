import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Collapse,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import NoDataFound from "../../../PageNotFound/NoDataFound";
import { DOC_URL } from "../../../../api/axiosInterceptor";
import { CustomPaginationUpdated } from "../../../../components/Pagination/CustomPaginationUpdated";
import Loader from "../../../../components/Loader/Loader";
import CustomButton from "../../../../components/Button/CustomButton";
import { useAddInventoryForm } from "../../../../hooks/inventory/inventory/useInventoryForm";

const NumericField = ({ label, name, formik, helperText, required }) => (
  <TextField
    fullWidth
    size="small"
    type="number"
    name={name}
    label={label}
    required={required}
    value={formik.values[name] ?? ""}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched[name] && Boolean(formik.errors[name])}
    helperText={(formik.touched[name] && formik.errors[name]) || helperText}
    inputProps={{ min: 0 }}
  />
);

const UpdateStockForm = ({ filteredData, filterFormik, isLoadingItem }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const borderColor = isDark ? "#262626" : "#E7E5E4";
  const surfaceAlt = isDark ? "#1F1F1F" : "#FAFAF9";

  const [selectedCardId, setSelectedCardId] = useState(null);

  const { formik, loading } = useAddInventoryForm({
    selectedCardId,
    onSuccess: () => {
      setSelectedCardId(null);
      filterFormik?.handleSubmit?.();
    },
  });

  const handleCardClick = (id) => {
    setSelectedCardId((prev) => (prev === id ? null : id));
  };

  const isEmpty =
    !filteredData?.content || filteredData.content.length === 0;

  return (
    <Box>
      {isLoadingItem && <Loader inline label="Loading items" />}

      {!isLoadingItem && isEmpty && <NoDataFound />}

      {!isLoadingItem && !isEmpty && (
        <Grid container spacing={2}>
          {filteredData.content.map((item) => {
            const isSelected = selectedCardId === item.id;
            const outOfStock = item.stockCount === 0;
            const inactive = item.status !== "ACTIVE";

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card
                  elevation={0}
                  onClick={() => handleCardClick(item.id)}
                  sx={{
                    cursor: "pointer",
                    position: "relative",
                    border: `1px solid ${
                      isSelected ? theme.palette.primary.main : borderColor
                    }`,
                    borderRadius: 2,
                    overflow: "hidden",
                    transition: "border-color .15s ease, transform .15s ease",
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        item.itemImageUrl
                          ? `${DOC_URL}${item.itemImageUrl}`
                          : "https://via.placeholder.com/300x200?text=Item"
                      }
                      alt={item.name}
                      sx={{
                        objectFit: "cover",
                        bgcolor: surfaceAlt,
                      }}
                    />
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        right: 8,
                        justifyContent: "space-between",
                      }}
                    >
                      {outOfStock && (
                        <Chip
                          label="Out of stock"
                          size="small"
                          color="error"
                          sx={{
                            height: 20,
                            fontSize: "0.65rem",
                            fontWeight: 600,
                          }}
                        />
                      )}
                      {inactive && (
                        <Chip
                          label="Inactive"
                          size="small"
                          color="default"
                          sx={{
                            height: 20,
                            fontSize: "0.65rem",
                            fontWeight: 600,
                            ml: "auto",
                          }}
                        />
                      )}
                    </Stack>
                  </Box>
                  <CardContent sx={{ p: 1.5, pb: "12px !important" }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      noWrap
                      sx={{ letterSpacing: "-0.01em" }}
                    >
                      {item.name}
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mt: 0.5 }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        Rs {item.sellingPrice?.toFixed?.(2) ?? item.sellingPrice}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        Stock {item.stockCount ?? 0}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>

                <Collapse in={isSelected} timeout={180} unmountOnExit>
                  <Box
                    component="form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      formik.handleSubmit();
                    }}
                    sx={{
                      mt: 1,
                      p: 1.5,
                      borderRadius: 2,
                      border: `1px solid ${borderColor}`,
                      bgcolor: "background.paper",
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: "text.secondary",
                        display: "block",
                        mb: 1,
                      }}
                    >
                      Add to inventory
                    </Typography>
                    <Grid container spacing={1.25}>
                      <Grid item xs={12} sm={6}>
                        <NumericField
                          label="Stock Quantity"
                          name="stockQuantity"
                          formik={formik}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <NumericField
                          label="Reorder Level"
                          name="reorderLevel"
                          formik={formik}
                          helperText="Trigger restock at"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <NumericField
                          label="Max Stock Level"
                          name="maxStockLevel"
                          formik={formik}
                          helperText="Cap"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <NumericField
                          label="Lead Time (days)"
                          name="leadTimeDays"
                          formik={formik}
                          helperText="Restock arrival"
                        />
                      </Grid>
                    </Grid>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ mt: 1.25 }}
                      justifyContent="flex-end"
                    >
                      <CustomButton
                        title="Cancel"
                        variant="outlined"
                        onClick={() => setSelectedCardId(null)}
                      />
                      <CustomButton
                        title="Add to Inventory"
                        startIcon={<AddCircleOutlineRoundedIcon />}
                        loading={loading}
                        onClick={() => formik.handleSubmit()}
                      />
                    </Stack>
                  </Box>
                </Collapse>
              </Grid>
            );
          })}
        </Grid>
      )}

      {!isLoadingItem && !isEmpty && (
        <Box sx={{ mt: 2 }}>
          <CustomPaginationUpdated
            totalPages={filteredData?.totalPages || 1}
            currentPage={(filteredData?.pageable?.pageNumber ?? 0) + 1}
            rowsPerPage={filteredData?.pageable?.pageSize}
            totalElements={filteredData?.totalElements || 0}
            filterFormik={filterFormik}
          />
        </Box>
      )}
    </Box>
  );
};

export default UpdateStockForm;

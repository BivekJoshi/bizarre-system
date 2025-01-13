import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Container,
  TextField,
  useTheme,
} from "@mui/material";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import { useFilterItemForm } from "../../../../hooks/item/Item/filterItem/useFilterItemForm";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import UpdateStockForm from "./UpdateStockForm";

const StockList = ({ onClose, orderData }) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("Beverage");

  const [filteredData, setFilteredData] = useState(null);

  const { formik: filterFormik, loading: isLoadingItem } = useFilterItemForm({
    itemData: (data) => setFilteredData(data),
    type: selectedCategory,
  });

  const categories = [
    {
      name: "Beverage",
      value: "BEVERAGE",
      icon: <LocalCafeIcon fontSize="large" />,
    },
    {
      name: "Food",
      value: "FOOD",
      icon: <FastfoodIcon fontSize="large" />,
    },
    {
      name: "Clothing",
      value: "CLOTHING",
      icon: <CheckroomIcon fontSize="large" />,
    },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          mb: 4,
          backgroundColor: theme.palette.background.alt,
          p: 1,
        }}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          {categories.map((category) => (
            <Paper
              key={category.name}
              elevation={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                padding: 1,
                textAlign: "center",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "transform 0.3s ease",
                border:
                  category.value === selectedCategory
                    ? `3px solid ${theme.palette.text.default}`
                    : "1px solid #ccc",
                color:
                  category.value === selectedCategory
                    ? `${theme.palette.text.default}`
                    : `${theme.palette.text.main}`,
                width: { xs: "100px", sm: "120px" },
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              onClick={() => handleCategoryClick(category.value)}
            >
              {category.icon}
              <Typography variant="subtitle1" sx={{ mt: 1, fontSize: "14px" }}>
                {category.name}
              </Typography>
            </Paper>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ mt: 1, color: "#000", fontSize: "14px" }}
          >
            Filter
          </Typography>
          <RenderInput
            inputField={[
              {
                id: 1,
                name: "value",
                placeholder: "Search by item name",
                type: "textfilterField",
                extraField: "name",
                required: true,
                xs: 12,
                md: 12,
                lg: 12,
                sm: 12,
              },
            ]}
            formik={filterFormik}
          />
        </div>
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <UpdateStockForm
            filteredData={filteredData}
            filterFormik={filterFormik}
            isLoadingItem={isLoadingItem}
            onClose={onClose}
            orderData={orderData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default StockList;

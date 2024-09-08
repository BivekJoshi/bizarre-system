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
import OrderItem from "./OrderItem";

const OrderForm = ({ onClose }) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("Beverage");

  const categories = [
    { name: "Beverage", icon: <LocalCafeIcon fontSize="large" /> },
    { name: "Food", icon: <FastfoodIcon fontSize="large" /> },
    { name: "Clothing", icon: <CheckroomIcon fontSize="large" /> },
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
                  category.name === selectedCategory
                    ? `3px solid ${theme.palette.text.default}`
                    : "1px solid #ccc",
                color:
                  category.name === selectedCategory
                    ? `${theme.palette.text.default}`
                    : `${theme.palette.text.main}`,
                width: { xs: "100px", sm: "120px" },
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              onClick={() => handleCategoryClick(category.name)}
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
          <TextField
            label="Search Item"
            variant="outlined"
            size="small"
            // value={inputValue}
            // onChange={handleInputChange}
            sx={{
              width: { xs: "150px", sm: "200px", md: "250px" },
            }}
          />
        </div>
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <OrderItem category={selectedCategory} onClose={onClose}/>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderForm;

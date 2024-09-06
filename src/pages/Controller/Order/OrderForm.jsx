import React, { useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import OrderItem from "./OrderItem"; 

const OrderForm = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { name: "Beverage", icon: <LocalCafeIcon fontSize="large" /> },
    { name: "Food", icon: <FastfoodIcon fontSize="large" /> },
    { name: "Clothing", icon: <CheckroomIcon fontSize="large" /> },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); 
  };

  return (
    <div>
      {!selectedCategory ? (
        <Grid container spacing={3} justifyContent="center">
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.name}>
              <Paper
                elevation={4}
                style={{
                  padding: "20px",
                  textAlign: "center",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onClick={() => handleCategoryClick(category.name)} // Trigger category selection
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {category.icon}
                <Typography variant="h6" style={{ marginTop: "10px", color: "#000" }}>
                  {category.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        // Conditionally render the OrderItem component when a category is selected
        <OrderItem category={selectedCategory} />
      )}
    </div>
  );
};

export default OrderForm;

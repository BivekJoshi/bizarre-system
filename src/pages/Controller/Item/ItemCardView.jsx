import React from "react";
import { Paper, Typography, Grid, Button, IconButton, Box } from "@mui/material";
import { AddShoppingCart, FavoriteBorder } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/Slice/cartSlice";
// import { addToCart } from "../../../redux/Slice/cartSlice";

const ItemCardView = ({ data }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(data));
  };

  return (
    <Paper elevation={3} sx={{ p: 0, borderRadius: 2, maxWidth: 345 }}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <div style={{ width: "100%", height: "150px" }}>
            <img
              src="https://via.placeholder.com/150"
              alt="Product"
              style={{
                width: "100%",
                borderRadius: "8px 8px 0 0",
                height: "100%",
              }}
            />
          </div>
        </Grid>
        <Box p={1}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {data?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Short description of the product goes here. It should be concise
              and informative.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              $29.99
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddToCart}
                  startIcon={<AddShoppingCart />}
                >
                  Add to Cart
                </Button>
              </Grid>
              <Grid item>
                <IconButton color="secondary" aria-label="add to favorites">
                  <FavoriteBorder />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Paper>
  );
};

export default ItemCardView

import React from "react";
import {
  Paper,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/Slice/cartSlice";
import { DOC_URL } from "../../../api/axiosInterceptor";

const ItemCardView = ({ data }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(data));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 0,
        borderRadius: 2,
        maxWidth: 345,
        transition: "transform 0.1s ease", // Smooth transition
        '&:hover': {
          transform: 'scale(1.05)', // Scale up on hover
        },
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <div style={{ width: "100%", height: "150px" }}>
            <img
              src={
                data?.itemImageUrl
                  ? DOC_URL + data?.itemImageUrl
                  : "https://via.placeholder.com/150"
              }
              alt="Product"
              style={{
                width: "100%",
                borderRadius: "8px 8px 0 0",
                height: "100%",
                objectFit: "cover", // Ensure the image covers the area
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
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                WebkitLineClamp: 2, // Limit to 2 lines
                height: "3em", // Set a specific height for 2 lines
                transition: "height 0.3s ease", // Smooth transition for height
                '&:hover': {
                  WebkitLineClamp: 'unset', // Remove line clamp on hover
                  height: 'auto', // Allow height to expand
                },
              }}
            >
              {data?.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              Rs 29.99
            </Typography>
          </Grid>
        </Box>
      </Grid>
    </Paper>
  );
};

export default ItemCardView;

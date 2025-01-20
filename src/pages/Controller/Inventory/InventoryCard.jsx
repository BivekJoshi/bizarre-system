import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Divider,
  Chip,
  Tooltip,
  Stack,
} from "@mui/material";
import { DOC_URL } from "../../../api/axiosInterceptor";

const InventoryCard = ({ data }) => {
  const { item, branch, stockQuantity } = data;
  const {
    name,
    color,
    costPrice,
    markedPrice,
    sellingPrice,
    stockCount,
    tags,
    itemImageUrl,
    description,
    type,
  } = item;

  const { address, phoneNumber, housingCapacity } = branch;

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform 0.3s",
      }}
    >
      {/* Item Image */}
      <CardMedia
        component="img"
        height="180"
        image={DOC_URL + itemImageUrl}
        alt={name}
        sx={{ objectFit: "cover" }}
      />

      {/* Item Details */}
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Type:</strong> {type}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="body2" color="text.secondary">
            <strong>Color:</strong> {color}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Stock Quantity:</strong> {stockQuantity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Cost Price:</strong> ${costPrice?.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Marked Price:</strong> ${markedPrice?.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Selling Price:</strong> ${sellingPrice?.toFixed(2)}
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />

        {/* Tags */}
        <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
          {tags.split(",").map((tag, index) => (
            <Tooltip title={`Tag: ${tag}`} key={index}>
              <Chip label={tag.trim()} size="small" color="primary" />
            </Tooltip>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default InventoryCard;

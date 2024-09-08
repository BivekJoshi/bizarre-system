import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DOC_URL } from "../../../api/axiosInterceptor";

const OrderByTableIdCardView = ({ data }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: theme.shadows[10],
        transition: "0.3s",
        overflow: "visible",
        "&:hover": {
          boxShadow: theme.shadows[15],
          transform: "scale(1.03)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={
          data.itemImageUrl
            ? DOC_URL + data.itemImageUrl
            : "https://via.placeholder.com/350x200"
        }
        alt={data.itemName}
        sx={{
          objectFit: "cover",
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          borderBottom: `4px solid ${theme.palette.primary.main}`,
        }}
      />
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
          {data.itemName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          Selling Price: ${data.sellingPrice}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          Remark: {data.remark || "No remarks"}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Chip
            label={data.orderStatus}
            color={data.orderStatus === "WAITING" ? "warning" : "success"}
            variant="filled"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              borderRadius: 2,
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderByTableIdCardView;

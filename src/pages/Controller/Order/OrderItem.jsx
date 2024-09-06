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
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useGetItem } from "../../../hooks/item/useItem";
import { DOC_URL } from "../../../api/axiosInterceptor";
import { useOrderForm } from "../../../hooks/order/Order/useOrderForm";
import { LoadingButton } from "@mui/lab";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";

const OrderItem = ({ category }) => {
  const { data: itemData } = useGetItem();

  const [selectedIds, setSelectedIds] = useState([]);
  const [remarks, setRemarks] = useState({});

  const { formik, loading } = useOrderForm({ remarks, selectedIds });

  const handleClick = (id) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleRemarkChange = (id, value) => {
    setRemarks((prevRemarks) => ({ ...prevRemarks, [id]: value }));
  };

  return (
    <Grid container spacing={3}>
      {itemData?.content?.map((item) => (
        <Grid item xs={12} sm={6} md={2} key={item.id}>
          <Card
            onClick={() => handleClick(item.id)}
            style={{
              cursor: "pointer",
              position: "relative",
              border: selectedIds.includes(item.id)
                ? "2px solid green"
                : "none",
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={
                item.itemImageUrl
                  ? DOC_URL + item.itemImageUrl
                  : "https://via.placeholder.com/150"
              }
              alt={item.name}
            />
            <CardContent>
              <Typography variant="h6">{item.name}</Typography>
            </CardContent>

            {selectedIds.includes(item.id) && (
              <IconButton
                style={{
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
            <TextField
              fullWidth
              variant="outlined"
              label="Remark"
              value={remarks[item.id] || ""}
              onChange={(e) => handleRemarkChange(item.id, e.target.value)}
            />
          )}
        </Grid>
      ))}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="flex-end">
          <LoadingButton
            loading={loading}
            onClick={() => formik.handleSubmit()}
            variant="outlined"
            fullWidth
            startIcon={<ControlPointRoundedIcon />}
          >
            Place Order
          </LoadingButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OrderItem;

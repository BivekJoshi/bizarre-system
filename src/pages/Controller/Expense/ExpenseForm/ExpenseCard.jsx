import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ExpenseCard = ({ data, onEdit, onDelete, onVerify }) => {
  const {
    expenseType,
    paymentType,
    amount,
    description,
    createdBy,
    createdDate,
    verified,
    verifiedBy,
  } = data;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 220,
        minWidth: 275,
        mb: 2,
        p: 2,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {expenseType}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mb: 1.5 }}
        >
          Payment Type: {paymentType}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography
          variant="body1"
          color="primary"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          Amount: ₹{amount}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, mb: 1, whiteSpace: "pre-line", color: "text.secondary" }}
        >
          {description || "No description provided"}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="caption" color="text.secondary">
          Created by: {createdBy} on {createdDate || "N/A"}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Chip
            label={verified ? "Verified" : "Unverified"}
            color={verified ? "success" : "warning"}
            // onClick={() => !verified && onVerify(data.id)}
            icon={verified && <VerifiedIcon />}
            sx={{
              cursor: verified ? "default" : "pointer",
              fontWeight: "bold",
            }}
          />
        </Box>
      </CardContent>
      {/* <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Button
          size="small"
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => onEdit(data)}
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(data)}
        >
          Delete
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default ExpenseCard;

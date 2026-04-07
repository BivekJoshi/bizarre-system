import React from "react";
import { Paper, Typography, Box, Chip, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PeopleIcon from "@mui/icons-material/People";

const CustomerTableCardView = ({ data }) => {
  const navigate = useNavigate();

  const getStatusStyles = (status) => {
    const configs = {
      OCCUPIED: { color: "#ef4444", label: "Occupied", bg: "#fef2f2" },
      AVAILABLE: { color: "#22c55e", label: "Available", bg: "#f0fdf4" },
      RESERVED: { color: "#f59e0b", label: "Reserved", bg: "#fffbeb" },
      OUT_OF_ORDER: { color: "#64748b", label: "Maintenance", bg: "#f8fafc" },
    };
    return (
      configs[status] || { color: "#94a3b8", label: status, bg: "#f1f5f9" }
    );
  };

  const status = getStatusStyles(data?.status);

  return (
    <Paper
      elevation={0}
      onClick={() => navigate(`${data?.id}`)}
      sx={{
        p: 2.5,
        borderRadius: 3,
        cursor: "pointer",
        border: "1px solid",
        borderColor: "divider",
        position: "relative",
        transition: "all 0.2s ease-in-out",
        overflow: "hidden",
        // The accent bar on the left
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "6px",
          backgroundColor: status.color,
        },
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 20px -5px rgba(0,0,0,0.1)",
          borderColor: status.color,
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <Typography
            variant="caption"
            sx={{
              textTransform: "uppercase",
              fontWeight: 700,
              color: "text.secondary",
              letterSpacing: 1,
            }}
          >
            TABLE
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, color: "text.primary" }}
          >
            {data?.tableNumber}
          </Typography>
        </Box>

        <Chip
          label={status.label}
          size="small"
          sx={{
            bgcolor: status.bg,
            color: status.color,
            fontWeight: 700,
            fontSize: "0.7rem",
            borderRadius: "6px",
            border: `1px solid ${status.color}33`,
            "& .MuiChip-label": { px: 1 },
          }}
        />
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 3 }}
      >
        {/* Meta Info: Seats/Capacity */}
        {/* <Box
          display="flex"
          alignItems="center"
          gap={0.5}
          sx={{ color: "text.secondary" }}
        >
          <PeopleIcon sx={{ fontSize: 18 }} />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {data?.capacity || 4} Seats
          </Typography>
        </Box> */}

        <IconButton
          size="small"
          sx={{
            bgcolor: "action.hover",
            "&:hover": { bgcolor: status.color, color: "white" },
          }}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default CustomerTableCardView;

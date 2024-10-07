import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Avatar,
  Button,
  useTheme,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const NotificationViewAll = () => {
  // Sample notifications data

  const theme = useTheme();

  const notifications = [
    {
      id: 1,
      type: "New Order",
      message: "Table 5: New order received",
      time: "2 mins ago",
      icon: <RestaurantMenuIcon color="primary" />,
    },
    {
      id: 2,
      type: "Order Update",
      message: "Table 3: Order is ready to serve",
      time: "5 mins ago",
      icon: <DoneIcon color="success" />,
    },
    {
      id: 3,
      type: "Service Request",
      message: "Table 1: Request for bill",
      time: "10 mins ago",
      icon: <ErrorIcon color="error" />,
    },
  ];

  const handleMarkAllRead = () => {
    // Function to mark all notifications as read
    console.log("Marked all as read");
  };

  const handleClearAll = () => {
    // Function to clear all notifications
    console.log("Cleared all notifications");
  };

  return (
    <>
      <Box
        sx={{
          mt: 4,
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <Typography variant="h4" component="h1" gutterBottom>
          Notifications

        </Typography> */}

        <Typography
          variant="h3"
          sx={{
            color: theme.palette.text.default,
            fontWeight: 700,
          }}
        >
          Notifications
        </Typography>
        <Box>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CheckCircleIcon />}
            onClick={handleMarkAllRead}
            sx={{ mr: 1 }}
          >
            Mark All as Read
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={handleClearAll}
          >
            Clear All
          </Button>
        </Box>
      </Box>

      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {notifications.map((notification) => (
            <React.Fragment key={notification.id}>
              <ListItem alignItems="flex-start">
                <ListItemIcon>{notification.icon}</ListItemIcon>
                <ListItemText
                  primary={notification.message}
                  secondary={notification.time}
                  primaryTypographyProps={{ fontSize: "1rem", fontWeight: 500 }}
                  secondaryTypographyProps={{
                    fontSize: "0.85rem",
                    color: "text.secondary",
                  }}
                />
                <IconButton edge="end" aria-label="mark as read">
                  <CheckCircleIcon color="action" />
                </IconButton>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </>
  );
};

export default NotificationViewAll;

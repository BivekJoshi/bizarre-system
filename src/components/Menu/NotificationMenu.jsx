import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import NotificationsIcon from "@mui/icons-material/Notifications";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { ListItemText, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewAll = () => {
    handleClose();
    navigate("notifications"); // Navigate to the 'View All Notifications' page
  };

  // Sample notification data tailored for a waiter
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
    {
      id: 3,
      type: "Service Request",
      message: "Table 1: Request for bill",
      time: "10 mins ago",
      icon: <ErrorIcon color="error" />,
    },
  ];

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Notifications">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "notification-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Badge badgeContent={notifications.length} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="notification-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {notifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleClose}>
            <ListItemIcon>{notification.icon}</ListItemIcon>
            <ListItemText
              primary={notification.message}
              secondary={notification.time}
              primaryTypographyProps={{
                fontSize: "0.9rem",
                fontWeight: "bold",
              }}
            />
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={handleViewAll} sx={{ justifyContent: "center" }}>
          <Typography
            variant="body2"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            View All Notifications
          </Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default NotificationMenu;

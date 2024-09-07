import { useTheme } from "@emotion/react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  IconButton,
} from "@mui/material";
import React from "react";

const AdminDashboard = () => {
  const theme = useTheme();

  const recentActivities = [
    { id: 1, text: "Order #1234 placed by Manoj Basnet", time: "2 mins ago" },
    {
      id: 2,
      text: "Reservation #5678 updated for Bivek Joshi",
      time: "10 mins ago",
    },
    {
      id: 3,
      text: "New menu item added: Spaghetti Carbonara",
      time: "30 mins ago",
    },
  ];

  const upcomingReservations = [
    { id: 1, table: 12, time: "7:00 PM", name: "John Doe" },
    { id: 2, table: 5, time: "8:00 PM", name: "Jane Smith" },
  ];

  const topItems = [
    { id: 1, name: "Spaghetti Carbonara", sold: 150 },
    { id: 2, name: "Margherita Pizza", sold: 120 },
    { id: 3, name: "Caesar Salad", sold: 100 },
  ];

  const staffActivity = [
    { id: 1, name: "Alice", action: "Completed 20 orders", time: "1 hour ago" },
    { id: 2, name: "Bob", action: "Updated menu items", time: "2 hours ago" },
  ];

  return (
    <Box p={3}>
      <Typography
        variant="h3"
        sx={{
          color: theme.palette.text.default,
          fontWeight: 700,
          marginBottom: "1rem",
        }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Sales</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Rs 12,345
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="textSecondary">
                Overall sales this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Number of Orders</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                678
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="textSecondary">
                Total orders placed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Active Reservations</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                45
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="textSecondary">
                Current active reservations
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Recent Activity</Typography>
              <Divider sx={{ my: 2 }} />
              <List>
                {recentActivities.map((activity) => (
                  <ListItem key={activity.id}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.secondary.main,
                        marginRight: 2,
                      }}
                    >
                      <Typography variant="body2" color="white">
                        {activity.text.charAt(0)}
                      </Typography>
                    </Avatar>
                    <ListItemText
                      primary={activity.text}
                      secondary={activity.time}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Sales Overview</Typography>
              <Box sx={{ height: 300, backgroundColor: theme.palette.background.alt }}></Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Upcoming Reservations</Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                {upcomingReservations.map((reservation) => (
                  <Grid item xs={12} sm={6} md={4} key={reservation.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">
                          Table {reservation.table}
                        </Typography>
                        <Typography variant="body1">
                          Time: {reservation.time}
                        </Typography>
                        <Typography variant="body2">
                          Name: {reservation.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Top Items Sold</Typography>
              <Divider sx={{ my: 2 }} />
              <List>
                {topItems.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={item.name}
                      secondary={`Sold: ${item.sold}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Staff Activity</Typography>
              <Divider sx={{ my: 2 }} />
              <List>
                {staffActivity.map((activity) => (
                  <ListItem key={activity.id}>
                    <ListItemText
                      primary={activity.name}
                      secondary={activity.action}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {activity.time}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;

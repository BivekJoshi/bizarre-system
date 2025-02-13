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
} from "@mui/material";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";
import { useGetReportDashboard } from "../../../hooks/report/useReport";
import AIGenerate from "../AI/AIGenerate/AIGenerate";

const AdminDashboard = () => {
  const theme = useTheme();
  const { data: reportData, isLoading } = useGetReportDashboard();
  console.log("🚀 ~ AdminDashboard ~ reportData:", reportData);

  const salesData = reportData?.salesOverview || [];

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
                Rs {reportData?.totalSales || "NA"}
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
                {reportData?.noOfOrders || "NA"}
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
                {reportData?.activeReservations}
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
              <Typography variant="h6">Top Items Sold</Typography>
              <Divider sx={{ my: 2 }} />
              <List>
                {reportData?.topSoldItems?.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={item.itemName}
                      secondary={`Sold: ${item.orderCount}`}
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
              <Divider sx={{ my: 2 }} />
              {salesData.length > 1 ? (
                <Box
                  sx={{
                    height: 300,
                    backgroundColor: theme.palette.background.alt,
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={salesData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="totalSales" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              ) : (
                <List>
                  {salesData.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`Month: ${item.month}`}
                        secondary={`Total Sales: Rs ${item.totalSales}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <AIGenerate/>
        </Grid>

        {reportData?.birthDayMembers &&
          reportData?.birthDayMembers?.map((data, index) => {
            return (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      🎉 Celebrate the Joy of Birthdays! 🎂
                    </Typography>
                    <Typography variant="body1">
                      "Today is a special day for{" "}
                      <span style={{ fontSize: "16px" }}>
                        <b>{data}</b>
                      </span>
                      . Let's make it memorable!"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;

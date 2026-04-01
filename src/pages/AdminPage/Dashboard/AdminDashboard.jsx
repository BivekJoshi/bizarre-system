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
  Tooltip,
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
import {
  ShoppingCart,
  EventAvailable,
  Star,
  InfoOutlined,
  Analytics,
} from "@mui/icons-material";
import { useGetReportDashboard } from "../../../hooks/report/useReport";
import AIGenerate from "../AI/AIGenerate/AIGenerate";
import AIGenerateItem from "../AI/AIGenerateItem/AIGenerateItem";

const StatCard = ({ title, value, subtitle, icon, color }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Card
      sx={{
        height: "100%",
        background: isDark
          ? "linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%)"
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.95) 100%)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"}`,
        boxShadow: isDark
          ? "0 4px 20px rgba(0, 0, 0, 0.4)"
          : "0 4px 20px rgba(148, 163, 184, 0.1)",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            borderRadius: "12px",
            backgroundColor: `${color}15`,
            color: color,
            mb: 2,
          }}
        >
          {icon}
        </Box>

        <Typography
          variant="body2"
          fontWeight={500}
          sx={{ color: theme.palette.text.secondary, mb: 0.5 }}
        >
          {title}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 1,
            color: theme.palette.text.primary,
          }}
        >
          {value}
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary }}
        >
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

const AdminDashboard = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { data: reportData, isLoading } = useGetReportDashboard();

  const salesData = reportData?.salesOverview || [];

  return (
    <Grid container spacing={3}>
      {/* Stats Grid */}
      <Grid item xs={12} sm={6} md={4}>
        <StatCard
          title="Total Sales"
          value={`Rs ${reportData?.totalSales || "0"}`}
          subtitle="Overall sales this month"
          icon={<Analytics />}
          color="#3b82f6"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatCard
          title="Number of Orders"
          value={reportData?.noOfOrders || "0"}
          subtitle="Total orders placed"
          icon={<ShoppingCart />}
          color="#8b5cf6"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatCard
          title="Active Reservations"
          value={reportData?.activeReservations || "0"}
          subtitle="Current active reservations"
          icon={<EventAvailable />}
          color="#f59e0b"
        />
      </Grid>

      {/* Sales Chart Section */}
      <Grid item xs={12} lg={8}>
        <Card
          sx={{
            p: 3,
            borderRadius: "20px",
            background: isDark
              ? "rgba(30, 41, 59, 0.4)"
              : "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"}`,
            boxShadow: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              Sales Overview
            </Typography>
            <Tooltip title="Sales trend">
              <IconButton size="small">
                <InfoOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ height: 350, width: "100%" }}>
            {salesData?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={
                      isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"
                    }
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: theme.palette.text.secondary,
                      fontSize: 12,
                    }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: theme.palette.text.secondary,
                      fontSize: 12,
                    }}
                  />
                  <RechartsTooltip
                    cursor={{
                      fill: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.05)",
                    }}
                    contentStyle={{
                      backgroundColor: isDark ? "#1e293b" : "#fff",
                      borderRadius: "10px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar
                    dataKey="totalSales"
                    fill="#3b82f6"
                    radius={[6, 6, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Typography color="text.secondary" variant="body2">
                  No sales data available
                </Typography>
              </Box>
            )}
          </Box>
        </Card>
      </Grid>

      {/* Top Items Section */}
      <Grid item xs={12} lg={4}>
        <Card
          sx={{
            p: 3,
            borderRadius: "20px",
            background: isDark
              ? "rgba(30, 41, 59, 0.4)"
              : "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"}`,
            boxShadow: "none",
          }}
        >
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            Top Items Sold
          </Typography>
          <List disablePadding>
            {reportData?.topSoldItems?.map((item, index) => (
              <ListItem
                key={index}
                disableGutters
                sx={{
                  mb: 1.5,
                  p: 1.5,
                  borderRadius: "12px",
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(0,0,0,0.02)",
                }}
              >
                <Avatar
                  sx={{
                    mr: 2,
                    bgcolor:
                      index === 0
                        ? "#fbbf24"
                        : index === 1
                          ? "#94a3b8"
                          : index === 2
                            ? "#d97706"
                            : "primary.main",
                    width: 32,
                    height: 32,
                  }}
                >
                  <Star sx={{ color: "#fff", fontSize: 16 }} />
                </Avatar>
                <ListItemText
                  primary={
                    <Typography variant="body2" fontWeight={600}>
                      {item.itemName}
                    </Typography>
                  }
                  secondary={`${item.orderCount} orders`}
                  secondaryTypographyProps={{ variant: "caption" }}
                />
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    color="primary"
                  >
                    #{index + 1}
                  </Typography>
                </Box>
              </ListItem>
            ))}
            {(!reportData?.topSoldItems ||
              reportData.topSoldItems.length === 0) && (
              <Typography
                color="text.secondary"
                align="center"
                variant="body2"
                sx={{ py: 3 }}
              >
                No top items data yet
              </Typography>
            )}
          </List>
        </Card>
      </Grid>

      {/* AI Sections */}
      <Grid item xs={12} md={6}>
        <AIGenerate />
      </Grid>
      <Grid item xs={12} md={6}>
        <AIGenerateItem />
      </Grid>

      {/* Birthday Notifications */}
      {reportData?.birthDayMembers?.length > 0 && (
        <Grid item xs={12}>
          <Card
            sx={{
              p: 2.5,
              borderRadius: "20px",
              background: isDark
                ? "linear-gradient(135deg, rgba(146, 64, 14, 0.1) 0%, rgba(146, 64, 14, 0.05) 100%)"
                : "linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%)",
              border: isDark
                ? "1px solid rgba(146, 64, 14, 0.2)"
                : "1px solid #fde68a",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}
            >
              <Typography variant="h5">🎉</Typography>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={800}
                  color={isDark ? "#fbbf24" : "#92400e"}
                >
                  Birthday Celebrations!
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Special day for our valued members.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {reportData.birthDayMembers.map((name, index) => (
                <Chip
                  key={index}
                  label={name}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    bgcolor: isDark ? "rgba(251, 191, 36, 0.1)" : "#fff",
                    border: "1px solid",
                    borderColor: isDark ? "rgba(251, 191, 36, 0.3)" : "#fde68a",
                    color: isDark ? "#fbbf24" : "#92400e",
                  }}
                />
              ))}
            </Box>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default AdminDashboard;

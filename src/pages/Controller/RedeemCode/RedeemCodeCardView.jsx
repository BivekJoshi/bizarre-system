import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  useTheme,
  Divider,
} from "@mui/material";
import {
  MonetizationOn,
  Percent,
  AccountBalance,
  EmojiEvents,
  Star,
} from "@mui/icons-material";
import { format } from "date-fns";

const getIconAndColor = (league) => {
  switch (league) {
    case "SILVER":
      return { icon: <Star />, color: "#C0C0C0" };
    case "GOLD":
      return { icon: <EmojiEvents />, color: "#FFD700" };
    case "PLATINUM":
      return { icon: <AccountBalance />, color: "#E5E4E2" };
    case "BRONZE":
      return { icon: <Percent />, color: "#CD7F32" };
    default:
      return { icon: <MonetizationOn />, color: "#2196f3" };
  }
};

const RedeemCodeCardView = ({ data }) => {
  const theme = useTheme();
  const { icon, color } = getIconAndColor(data.league);

  const formatDate = (date) => format(new Date(date), "PPPpp");

  return (
    <Card
      style={{
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar
              style={{
                backgroundColor: color,
                width: 56,
                height: 56,
                color: "#fff",
              }}
            >
              {icon}
            </Avatar>
          </Grid>

          <Grid item xs>
            <Typography
              variant="h6"
              style={{
                fontWeight: "bold",
                color: theme.palette.text.primary,
              }}
              gutterBottom
            >
              {data.code} ({data.league} League)
            </Typography>
            <Typography
              variant="body2"
              style={{ color: theme.palette.text.secondary }}
            >
              Redeemable Coins: {data.redeemableCoins}
            </Typography>
          </Grid>
        </Grid>

        <Divider style={{ margin: "16px 0" }} />

        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="body2"
              style={{ color: theme.palette.text.primary }}
            >
              Effective From:
            </Typography>
            <Typography variant="body2" style={{ fontWeight: 500 }}>
              {formatDate(data.effectiveDateTime)}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              variant="body2"
              style={{ color: theme.palette.text.primary }}
            >
              Valid Until:
            </Typography>
            <Typography variant="body2" style={{ fontWeight: 500 }}>
              {formatDate(data.terminationDateTime)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RedeemCodeCardView;

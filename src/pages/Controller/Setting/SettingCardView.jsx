import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  useTheme,
} from "@mui/material";
import {
  MonetizationOn,
  Percent,
  AccountBalance,
  EmojiEvents,
  Star,
} from "@mui/icons-material";

const getIconAndColor = (setting) => {
  switch (setting) {
    case "SILVER_LEAGUE_THRESHOLD":
      return { icon: <Star />, color: "#C0C0C0" };
    case "GOLD_LEAGUE_THRESHOLD":
      return { icon: <EmojiEvents />, color: "#FFD700" };
    case "PLATINUM_LEAGUE_THRESHOLD":
      return { icon: <AccountBalance />, color: "#E5E4E2" };
    case "REDEEMABLE_COINS_PERCENTAGE":
      return { icon: <Percent />, color: "#4caf50" };
    default:
      return { icon: <MonetizationOn />, color: "#2196f3" };
  }
};

const SettingCardView = ({ data }) => {
  const theme = useTheme();
  const { icon, color } = getIconAndColor(data.setting);

  return (
    <Card
      style={{
        color: "#333",
        borderRadius: "12px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        padding: "16px",
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
                textTransform: "capitalize",
                color: theme.palette.text.default,
              }}
              gutterBottom
            >
              {data.setting.replace(/_/g, " ").toLowerCase()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Value: {data.value}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SettingCardView;

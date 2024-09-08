import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  Divider,
} from "@mui/material";
import { format } from "date-fns";

const PromoCodeCardView = ({ data }) => {
  const theme = useTheme();

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
          <Grid item xs>
            <Typography
              variant="h6"
              style={{
                fontWeight: "bold",
                color: theme.palette.text.primary,
              }}
              gutterBottom
            >
              Code: {data.code}
            </Typography>
            <Typography
              variant="body2"
              style={{ color: theme.palette.text.secondary }}
            >
              User Type: {data.userType}
            </Typography>
            <Typography
              variant="body2"
              style={{ color: theme.palette.text.secondary }}
            >
              Discount Type: {data.discountType}
            </Typography>
            <Typography
              variant="body2"
              style={{ color: theme.palette.text.secondary }}
            >
              Discount Value: {data.discountType === 'AMOUNT' ? `Rs ${data.discountValue}` : `${data.discountValue}%`}
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

export default PromoCodeCardView;

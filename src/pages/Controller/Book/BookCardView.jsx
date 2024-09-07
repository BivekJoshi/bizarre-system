import React from "react";
import { Card, CardContent, Typography, Grid, Avatar } from "@mui/material";
import { Book, DateRange, Person, Info, Code } from "@mui/icons-material";

const BookCardView = ({ data }) => {
  console.log("🚀 ~ BookCardView ~ data:", data);

  return (
    <Card
      style={{
        borderRadius: "12px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        padding: "16px",
        maxWidth: "400px",
        margin: "20px auto",
      }}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Book Icon or Placeholder for Cover Image */}
          <Grid item>
            <Avatar
              variant="square"
              style={{
                backgroundColor: "#f5f5f5",
                color: "#1976d2",
                width: "80px",
                height: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2rem",
              }}
            >
              <Book fontSize="large" />
            </Avatar>
          </Grid>

          {/* Book Details */}
          <Grid item xs={8}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              {data.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <Person style={{ fontSize: "1rem", marginRight: "4px" }} />
              {data.author}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <DateRange style={{ fontSize: "1rem", marginRight: "4px" }} />
              Published: {new Date(data.publicationDate).toDateString()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Info style={{ fontSize: "1rem", marginRight: "4px" }} />
              Genre: {data.genre}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Code style={{ fontSize: "1rem", marginRight: "4px" }} />
              ISBN: {data.isbn}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BookCardView;

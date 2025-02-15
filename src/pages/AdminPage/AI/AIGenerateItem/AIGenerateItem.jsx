import React, { useEffect, useState } from "react";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import { Button, CircularProgress, Grid, Typography, Paper, Box } from "@mui/material";
import { nanoid } from "nanoid";
import Typewriter from "../../../../components/Typewriter/Typewriter";
import { useAIGenerateItemForm } from "../../../../hooks/chat/AIGenerateItem/useAIgenerateItemForm";

const AIGenerateItem = () => {
  const { formik, generateItemData, isLoading } = useAIGenerateItemForm({});
  console.log("🚀 ~ AIGenerateItem ~ generateItemData:", generateItemData);

  const inputField = [
    {
      id: nanoid(),
      name: "description",
      label: "Product Info",
      type: "text",
      required: true,
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
  ];

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          {/* Input Field */}
          <RenderInput inputField={inputField} formik={formik} />
          
          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => formik.handleSubmit()}
            style={{
              marginTop: "16px",
              padding: "10px",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Submit
          </Button>
          
          {/* Loading Spinner */}
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Paper
              elevation={3}
              sx={{
                marginTop: "20px",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: 3,
                backgroundColor: "#fafafa",
              }}
            >
              {/* Display Item Data */}
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
                Item: {generateItemData?.name}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                <strong>Cost Price:</strong> {generateItemData?.costPrice}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                <strong>Marked Price:</strong> {generateItemData?.markedPrice}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                <strong>Selling Price:</strong> {generateItemData?.sellingPrice}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                <strong>Type:</strong> {generateItemData?.type}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                <strong>Tags:</strong> {generateItemData?.tags}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                <strong>Color:</strong> {generateItemData?.color}
              </Typography>

              {/* Typewriter Effect */}
              <Box sx={{ marginTop: "20px" }}>
                <Typewriter
                  text={generateItemData?.description}
                  speed={50}
                  isLoading={isLoading}
                />
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default AIGenerateItem;

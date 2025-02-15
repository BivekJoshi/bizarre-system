import React, { useEffect, useState } from "react";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import { useAIgenerateForm } from "../../../../hooks/chat/AIGenerate/useAIgenerateForm";
import {
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import { nanoid } from "nanoid";
import Typewriter from "../../../../components/Typewriter/Typewriter";

const AIGenerate = () => {
  const { formik, generateData, isLoading } = useAIgenerateForm({});

  const inputField = [
    {
      id: nanoid(),
      name: "message",
      label: "Ask any thing",
      type: "text",
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
  ];

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={8}>
        <RenderInput inputField={inputField} formik={formik} />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => formik.handleSubmit()}
          style={{ marginTop: "16px" }}
        >
          Submit
        </Button>

        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div
            style={{
              marginTop: "20px",
              border: "1px solid lightgrey",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typewriter text={generateData?.generation} speed={50} />
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default AIGenerate;

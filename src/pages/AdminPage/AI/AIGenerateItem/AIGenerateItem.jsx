import React, { useEffect, useState } from "react";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  useTheme,
  Chip,
  Divider,
} from "@mui/material";
import { nanoid } from "nanoid";
import Typewriter from "../../../../components/Typewriter/Typewriter";
import { useAIGenerateItemForm } from "../../../../hooks/chat/AIGenerateItem/useAIgenerateItemForm";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import SendIcon from "@mui/icons-material/Send";

const AIGenerateItem = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { formik, generateItemData, isLoading } = useAIGenerateItemForm({});

  const inputField = [
    {
      id: nanoid(),
      name: "description",
      label: "Describe your new product...",
      type: "text",
      required: true,
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
    },
  ];

  return (
    <Card
      sx={{
        borderRadius: "20px",
        background: isDark
          ? "rgba(30, 41, 59, 0.4)"
          : "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(10px)",
        border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"}`,
        boxShadow: "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
              color: "#fff",
            }}
          >
            <AutoFixHighIcon fontSize="small" />
          </Box>
          <Typography variant="h5" fontWeight={700}>
            Product Generator
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1, mb: 3, minHeight: "150px" }}>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress
                size={32}
                thickness={5}
                sx={{ color: "#8b5cf6" }}
              />
            </Box>
          ) : generateItemData?.name ? (
            <Box
              sx={{
                p: 2.5,
                borderRadius: "16px",
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(0,0,0,0.02)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, mb: 2, color: "primary.main" }}
              >
                {generateItemData?.name}
              </Typography>

              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={4}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    Cost
                  </Typography>
                  <Typography variant="body2" fontWeight={700}>
                    Rs {generateItemData?.costPrice}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    Marked
                  </Typography>
                  <Typography variant="body2" fontWeight={700}>
                    Rs {generateItemData?.markedPrice}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    Selling
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="success.main"
                  >
                    Rs {generateItemData?.sellingPrice}
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                <Chip
                  label={generateItemData?.type}
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
                {generateItemData?.tags?.split(",").map((tag, i) => (
                  <Chip
                    key={i}
                    label={tag.trim()}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>

              <Divider sx={{ my: 1.5, opacity: 0.5 }} />

              <Box>
                <Typewriter text={generateItemData?.description} speed={30} />
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                height: "75%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `2px dashed ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                borderRadius: "16px",
                p: 3,
              }}
            >
              <Typography color="text.secondary" align="center" variant="body2">
                Describe a product (e.g., "A spicy Italian pasta with fresh
                basil") and let AI generate the details for you!
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ position: "relative" }}>
          <RenderInput inputField={inputField} formik={formik} />
          <Button
            variant="contained"
            fullWidth
            onClick={() => formik.handleSubmit()}
            disabled={isLoading}
            startIcon={
              isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SendIcon />
              )
            }
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: "16px",
              background: "linear-gradient(90deg, #8b5cf6 0%, #7c3aed 100%)",
              boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
              "&:hover": {
                background: "linear-gradient(90deg, #7c3aed 0%, #6d28d9 100%)",
              },
            }}
          >
            {isLoading ? "Generating..." : "Generate Product"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AIGenerateItem;

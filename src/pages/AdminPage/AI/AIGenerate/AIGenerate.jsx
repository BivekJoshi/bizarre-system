import React from "react";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import { useAIgenerateForm } from "../../../../hooks/chat/AIGenerate/useAIgenerateForm";
import {
  Button,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import { nanoid } from "nanoid";
import Typewriter from "../../../../components/Typewriter/Typewriter";
import SendIcon from "@mui/icons-material/Send";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const AIGenerate = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { formik, generateData, isLoading } = useAIgenerateForm({});

  const inputField = [
    {
      id: nanoid(),
      name: "message",
      label: "Ask anything to AI...",
      type: "text",
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
      <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%)",
              color: "#fff",
            }}
          >
            <AutoAwesomeIcon fontSize="small" />
          </Box>
          <Typography variant="h5" fontWeight={700}>AI Assistant</Typography>
        </Box>

        <Box sx={{ flexGrow: 1, mb: 3, minHeight: "150px" }}>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress size={32} thickness={5} sx={{ color: "#3b82f6" }} />
            </Box>
          ) : generateData?.generation ? (
            <Box
              sx={{
                p: 2,
                borderRadius: "16px",
                backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
              }}
            >
              <Typewriter text={generateData?.generation} speed={30} />
            </Box>
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `2px dashed ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                borderRadius: "16px",
                p: 3,
              }}
            >
              <Typography color="text.secondary" align="center" variant="body2">
                Ask me anything about your restaurant's performance, menu, or customers!
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
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: "16px",
              background: "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)",
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
              "&:hover": {
                background: "linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)",
              },
            }}
          >
            {isLoading ? "Generating..." : "Get AI Insight"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AIGenerate;

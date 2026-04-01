import React, { useMemo } from "react";
import AppRoute from "./route/AppRoute";
import { createTheme, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme/theme";
import { useSelector } from "react-redux";
import "./App.css";

const App = () => {
  const mode = useSelector((state) => state.themeMode.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <div
        className={mode === "dark" ? "animated-bg-dark" : "animated-bg"}
        style={{
          // backgroundColor: theme.palette.background.alt,
          minHeight: "100vh",
          color: theme.palette.text.main,
        }}
      >
        <AppRoute />
      </div>
    </ThemeProvider>
  );
};

export default App;

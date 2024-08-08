import React, { useMemo } from "react";
import AppRoute from "./route/AppRoute";
import { createTheme, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme/theme";

const App = () => {
  const theme = useMemo(() => createTheme(themeSettings()));
  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: "#F4F7F6",minHeight: "100vh" }}>
        <AppRoute />
      </div>
    </ThemeProvider>
  );
};

export default App;

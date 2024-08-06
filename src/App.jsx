import React, { useMemo } from 'react'
import AppRoute from './route/AppRoute'
import { createTheme, ThemeProvider } from '@mui/material';
import { themeSettings } from './theme/theme';

const App = () => {
  const theme = useMemo(() => createTheme(themeSettings()));
  return (
    <ThemeProvider theme={theme}>
      <AppRoute />
    </ThemeProvider>
  )
}

export default App
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import React from "react";

/**
 * Composable filter bar. Renders an optional search box and any children
 * (selects, chips, date pickers) on a single row. On mobile the search
 * spans the full row and the children flow underneath.
 *
 * Backward compatible — accepts no props and renders an empty bar.
 */
const Filter = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search…",
  showSearch = true,
  onToggleAdvanced,
  sticky = false,
  top = 0,
  children,
  sx = {},
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const borderColor = isDark ? "#262626" : "#E7E5E4";

  return (
    <Box
      sx={{
        position: sticky ? "sticky" : "relative",
        top: sticky ? top : "auto",
        zIndex: 4,
        bgcolor: "background.default",
        borderBottom: sticky ? `1px solid ${borderColor}` : "none",
        py: 1,
        ...sx,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        alignItems={{ xs: "stretch", sm: "center" }}
      >
        {showSearch && (
          <TextField
            fullWidth
            value={searchValue || ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            size="small"
            sx={{
              maxWidth: { sm: 320 },
              "& .MuiOutlinedInput-root": { bgcolor: "background.paper" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon
                    sx={{ fontSize: 18, color: "text.disabled" }}
                  />
                </InputAdornment>
              ),
              endAdornment: searchValue ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => onSearchChange?.("")}
                    sx={{ p: 0.25 }}
                  >
                    <CloseRoundedIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
        )}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ flexWrap: "wrap", flex: 1 }}
        >
          {children}
        </Stack>
        {onToggleAdvanced && (
          <Tooltip title="Advanced filters">
            <IconButton
              size="small"
              onClick={onToggleAdvanced}
              sx={{
                border: `1px solid ${borderColor}`,
                borderRadius: 1.5,
                width: 36,
                height: 36,
              }}
            >
              <TuneRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </Box>
  );
};

export default Filter;

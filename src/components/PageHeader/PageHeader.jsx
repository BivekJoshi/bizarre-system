import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";

/**
 * Shared page header with optional sticky behavior — designed to host a title,
 * description, filter bar, and primary actions. Use the same component on
 * both desktop and mobile; the layout collapses gracefully on narrow screens.
 *
 * Props:
 *  - title: string | ReactNode
 *  - description: string | ReactNode
 *  - actions: ReactNode (right side — primary buttons, etc.)
 *  - filters: ReactNode (rendered on its own row below the title)
 *  - sticky: boolean (default true) — sticks to top of scroll container
 *  - top: number — offset for sticky position (use when nested below another sticky bar)
 */
const PageHeader = ({
  title,
  description,
  actions,
  filters,
  sticky = true,
  top = 0,
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
        zIndex: 5,
        bgcolor: "background.default",
        borderBottom: `1px solid ${borderColor}`,
        mb: 2,
        pt: { xs: 1, md: 1.5 },
        pb: 1.5,
        ...sx,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        spacing={1.5}
      >
        <Box sx={{ minWidth: 0 }}>
          {title && (
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.01em",
                lineHeight: 1.25,
              }}
            >
              {title}
            </Typography>
          )}
          {description && (
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mt: 0.25 }}
            >
              {description}
            </Typography>
          )}
        </Box>

        {actions && (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              width: { xs: "100%", sm: "auto" },
              justifyContent: { xs: "stretch", sm: "flex-end" },
              flexWrap: "wrap",
              "& > *": { flex: { xs: 1, sm: "none" } },
            }}
          >
            {actions}
          </Stack>
        )}
      </Stack>

      {filters && (
        <Box
          sx={{
            mt: 1.25,
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {filters}
        </Box>
      )}
    </Box>
  );
};

export default PageHeader;

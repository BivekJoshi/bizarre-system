import React from "react";
import PropTypes from "prop-types";
import {
  Pagination,
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export const CustomPagination = ({
  totalPages,
  currentPage,
  onPageChange,
  rowsPerPageOptions = [10, 25, 50, 100, 200],
  rowsPerPage,
  onRowsPerPageChange,
  totalElements,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const borderColor = isDark ? "#262626" : "#E7E5E4";

  const handlePageChange = (_event, newPage) => {
    onPageChange(newPage);
    window.scrollTo(0, 0);
  };

  const handleRowsPerPageChange = (event) => {
    onRowsPerPageChange(event?.target?.value);
  };

  const normalizedCurrentPage = Math.min(
    Math.max(currentPage, 1),
    totalPages || 1,
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1.5,
        justifyContent: isMobile ? "center" : "space-between",
        alignItems: "center",
        px: { xs: 1, sm: 2 },
        py: 1.25,
        borderTop: `1px solid ${borderColor}`,
        bgcolor: "background.paper",
      }}
    >
      {!isMobile && (
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Total: <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>{totalElements ?? 0}</Box>
        </Typography>
      )}
      <Pagination
        count={totalPages || 1}
        page={normalizedCurrentPage}
        onChange={handlePageChange}
        color="primary"
        size="small"
        shape="rounded"
        showFirstButton
        showLastButton
        aria-label="Pagination"
        sx={{
          "& .MuiPaginationItem-root": {
            fontWeight: 500,
            borderRadius: 1.5,
          },
        }}
      />
      {!isMobile && (
        <FormControl variant="outlined" size="small">
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            aria-label="Rows per page"
            displayEmpty
            sx={{ width: 120, height: 34 }}
          >
            {rowsPerPageOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option} / page
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

CustomPagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  rowsPerPage: PropTypes.number.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
};

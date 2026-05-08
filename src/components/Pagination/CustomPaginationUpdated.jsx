import React from "react";
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

export const CustomPaginationUpdated = ({
  totalPages,
  currentPage,
  rowsPerPageOptions = [10, 25, 50, 100, 200],
  rowsPerPage,
  totalElements = 0,
  filterFormik,
  backgroundColor,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const borderColor = isDark ? "#262626" : "#E7E5E4";

  const handlePageChange = (_event, newPage) => {
    filterFormik.setFieldValue("pageNumber", newPage);
    window.scrollTo(0, 0);
    filterFormik.handleSubmit();
  };

  const handleRowsPerPageChange = (event) => {
    const newSize = event.target.value;
    filterFormik.setFieldValue("noOfRecords", newSize);
    filterFormik.handleSubmit();
  };

  const normalizedCurrentPage = Math.min(
    Math.max(currentPage, 1),
    totalPages || 1,
  );

  return (
    <Box
      sx={{
        bgcolor: backgroundColor || "background.paper",
        px: { xs: 1, sm: 2 },
        py: 1.25,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1.5,
        borderTop: `1px solid ${borderColor}`,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          minWidth: { xs: "auto", sm: 120 },
        }}
      >
        Total:{" "}
        <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
          {totalElements}
        </Box>
      </Typography>
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages || 1}
          page={normalizedCurrentPage}
          onChange={handlePageChange}
          color="primary"
          size="small"
          shape="rounded"
          showFirstButton={!isMobile}
          showLastButton={!isMobile}
          siblingCount={isMobile ? 0 : 1}
          aria-label="Pagination Navigation"
          sx={{
            "& .MuiPaginationItem-root": {
              fontWeight: 500,
              borderRadius: 1.5,
            },
          }}
        />
      </Box>
      <FormControl variant="outlined" size="small">
        <Select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          aria-label="Rows per page"
          sx={{ width: { xs: 110, sm: 130 }, height: 34 }}
        >
          {rowsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option} / page
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

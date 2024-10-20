import React from "react";
import {
  Pagination,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
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

  const handlePageChange = (event, newPage) => {
    filterFormik.setFieldValue("pageNumber", newPage);
    window.scrollTo(0, 0);
    filterFormik.handleSubmit();
  };

  const handleRowsPerPageChange = (event) => {
    const newSize = event.target.value;
    // filterFormik.setFieldValue("pageable.pageSize", newSize);
    // filterFormik.setFieldValue("pageable.pageNumber", 1);
    filterFormik.setFieldValue("noOfRecords", newSize);
    filterFormik.handleSubmit();
  };

  const normalizedCurrentPage = Math.min(
    Math.max(currentPage, 1),
    totalPages || 1
  );

  return (
    <Box
      mt={3}
      sx={{
        backgroundColor: backgroundColor
          ? backgroundColor
          : theme.palette.background.default,
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: { xs: "wrap", sm: "nowrap" },
        gap: "1rem",
      }}
    >
      <Box sx={{ minWidth: "150px" }} aria-label="Total Elements">
        Total Elements: {totalElements}
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages || 1}
          page={normalizedCurrentPage}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
          aria-label="Pagination Navigation"
        />
      </Box>
      <FormControl variant="outlined" size="small" sx={{ minWidth: "150px" }}>
        <InputLabel id="rows-per-page-label">Rows per page</InputLabel>
        <Select
          labelId="rows-per-page-label"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          label="Rows per page"
          aria-label="Rows per page"
          sx={{ width: { xs: "150px", sm: "200px" } }}
        >
          {rowsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

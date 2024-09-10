import React from "react";
import PropTypes from "prop-types";
import {
  Pagination,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
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
  const handlePageChange = (event, newPage) => {
    onPageChange(newPage);
    window.scrollTo(0, 0);
  };

  const handleRowsPerPageChange = (event) => {
    onRowsPerPageChange(event?.target?.value);
  };

  const normalizedCurrentPage = Math.min(
    Math.max(currentPage, 1),
    totalPages || 1
  );

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="center"
      mt={3}
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: "1rem",
      }}
    >
      <div>Total Element: {totalElements}</div>
      <Pagination
        count={totalPages || 1}
        page={normalizedCurrentPage}
        onChange={handlePageChange}
        color="primary"
        showFirstButton
        showLastButton
        aria-label="Pagination"
      />
      <FormControl variant="outlined" size="small">
        <InputLabel>Rows per page</InputLabel>
        <Select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          label="Rows per page"
          aria-label="Rows per page"
          sx={{ width: "200px" }}
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

CustomPagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  rowsPerPage: PropTypes.number.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
};

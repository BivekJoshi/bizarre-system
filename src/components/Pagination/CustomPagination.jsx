import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";

const CustomPagination = ({
  totalRows = 100,
  rowsPerPageOptions = [10, 25, 50],
  initialPage = 0,
  initialRowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  showFirstButton = true,
  showLastButton = true,
  ...props
}) => {
  const [page, setPage] = React.useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (onPageChange) onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    if (onRowsPerPageChange) onRowsPerPageChange(newRowsPerPage);
  };

  return (
    <TablePagination
      component="div"
      count={totalRows}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
      showFirstButton={showFirstButton}
      showLastButton={showLastButton}
      {...props}
    />
  );
};

export default CustomPagination;

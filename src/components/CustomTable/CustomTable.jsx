import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { useCallback } from "react";

const CustomTable = (props) => {
  const theme = useTheme();

  const handleRowClick = (row) => {
    if (props?.onRowClick) {
      props?.onRowClick(row);
    }
  };

  const handleDeleteRow = useCallback((row) => {
    if (props.handleDeleteRow) {
      props.handleDeleteRow(row);
    }
  }, []);

  const handleEditRow = useCallback((row) => {
    if (props.edit && props.handleEdit) props.handleEdit(row);
  }, []);

  const bodyBackgroundColor =
    theme.palette.mode === "light" ? "#ffff" : theme.palette.background.default;

  return (
    <div className="custom_table">
      <MaterialReactTable
        columns={
          props?.columns.map((col) => ({
            ...col,
            size: col.size || "170",
            flex: col.flex || 1,
          })) || []
        }
        data={props?.data || []}
        isLoading={true}
        enableRowNumbers={props.enableRowNumbers || false}
        enableRowVirtualization
        headerTitle={props?.title || "My Table Title"}
        enableStickyHeader
        enablePagination={props?.enablePagination || false}
        paginationPageSize={props?.pageSize || 10}
        enableEditing={props.enableEditing || false}
        editingMode={props.editingMode}
        rowCount={props?.rowCount}
        state={{
          isLoading: props?.isLoading,
        }}
        initialState={{
          density: props?.density || "compact",
          showColumnFilters: props?.filter || false,
          columnPinning: {
            right: ["mrt-row-actions"],
          },
        }}
        enableColumnResizing={props?.enableColumnResizing || true}
        enableColumnActions={props?.enableColumnActions}
        enableColumnFilters={props?.enableColumnFilters}
        enableSorting={props?.enableSorting}
        enableRowActions={props.enableRowActions || false}
        showColumnFilters={props?.showColumnFilters || false}
        enableBottomToolbar={props?.enableBottomToolbar}
        enableTopToolbar={props?.enableTopToolbar}
        enableDensityToggle={props?.enableDensityToggle}
        enableHiding={props?.enableHiding}
        enableFullScreenToggle={props?.enableFullScreenToggle}
        enableGlobalFilter={props?.enableGlobalFilter}
        density={props?.density}
        renderRowActions={({ row, table }) => {
          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.1rem",
              }}
            >
              {props.edit && (
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton
                    variant="outlined"
                    onClick={() => handleEditRow(row)}
                    sx={{
                      border: "1px solid",
                      borderColor: "primary.main",
                      borderRadius: "6px",
                      padding: "6px",
                    }}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
              )}
              {props.delete && (
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRow(row)}
                    sx={{
                      border: "1px solid",
                      borderColor: "error",
                      borderRadius: "6px",
                      padding: "6px",
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          );
        }}
        muiTableHeadRowProps={{
          sx: {
            backgroundColor: theme.palette.primary.main,
            height: props?.filter ? "70px" : "40px",
          },
        }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => handleRowClick(row),
          sx: {
            cursor: "pointer",
            backgroundColor: bodyBackgroundColor,
          },
        })}
        muiTableHeadCellProps={{
          sx: {
            color: "#ffff",
          },
        }}
      />
    </div>
  );
};

export default CustomTable;

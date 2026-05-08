import { Delete, Edit } from "@mui/icons-material";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { Box, Button, IconButton, Tooltip, useTheme } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { useCallback } from "react";

const CustomTable = (props) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const borderColor = isDark ? "#262626" : "#E7E5E4";
  const headBg = isDark ? "#161616" : "#F5F5F4";
  const headColor = isDark ? "#A3A3A3" : "#57534E";
  const rowHoverBg = isDark
    ? "rgba(255,255,255,0.03)"
    : "rgba(0,0,0,0.025)";
  const bodyBackgroundColor = isDark ? "#0F0F0F" : "#FFFFFF";

  const handleRowClick = (row) => {
    props?.onRowClick?.(row);
  };

  const handleEnter = useCallback(
    (row) => {
      props.handleEnter?.(row);
    },
    [props.handleEnter],
  );

  const handleGenerate = useCallback(
    (row) => {
      props.handleGenerate?.(row);
    },
    [props.handleGenerate],
  );

  const handleAddDocumentRow = useCallback(
    (row) => {
      props.handleAddDocumentRow?.(row);
    },
    [props.handleAddDocumentRow],
  );

  const handleDeleteRow = useCallback(
    (row) => {
      props.handleDeleteRow?.(row);
    },
    [props.handleDeleteRow],
  );

  const handleEditRow = useCallback(
    (row) => {
      if (props.edit && props.handleEdit) props.handleEdit(row);
    },
    [props.edit, props.handleEdit],
  );

  return (
    <Box
      className="custom_table"
      sx={{
        border: `1px solid ${borderColor}`,
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "background.paper",
        "& .MuiPaper-root": {
          border: "none",
          borderRadius: 0,
          boxShadow: "none",
        },
      }}
    >
      <MaterialReactTable
        columns={
          props?.columns?.map((col) => ({
            ...col,
            size: col.size || 170,
            flex: col.flex || 1,
          })) || []
        }
        data={props?.data || []}
        enableRowNumbers={props.enableRowNumbers || false}
        enableRowVirtualization
        headerTitle={props?.title || "My Table Title"}
        enableStickyHeader
        enablePagination={props?.enablePagination || false}
        paginationPageSize={props?.pageSize || 10}
        enableEditing={props.enableEditing || false}
        editingMode={props.editingMode}
        rowCount={props?.rowCount}
        state={{ isLoading: props?.isLoading }}
        initialState={{
          density: props?.density || "compact",
          showColumnFilters: props?.filter || false,
          columnPinning: { right: ["mrt-row-actions"] },
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
        renderRowActions={({ row }) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 0.5,
            }}
          >
            {props.edit && (
              <Tooltip arrow placement="top" title="Edit">
                <IconButton
                  size="small"
                  onClick={() => handleEditRow(row)}
                  sx={{
                    border: `1px solid ${borderColor}`,
                    borderRadius: 1.5,
                    p: 0.5,
                    color: "text.secondary",
                    "&:hover": {
                      borderColor: "primary.main",
                      color: "primary.main",
                      bgcolor: "transparent",
                    },
                  }}
                >
                  <Edit sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            )}
            {props.delete && (
              <Tooltip arrow placement="top" title="Delete">
                <IconButton
                  size="small"
                  onClick={() => handleDeleteRow(row)}
                  sx={{
                    border: `1px solid ${borderColor}`,
                    borderRadius: 1.5,
                    p: 0.5,
                    color: "text.secondary",
                    "&:hover": {
                      borderColor: "error.main",
                      color: "error.main",
                      bgcolor: "transparent",
                    },
                  }}
                >
                  <Delete sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            )}
            {props.document && (
              <Tooltip arrow placement="top" title="Add Document">
                <IconButton
                  size="small"
                  onClick={() => handleAddDocumentRow(row)}
                  sx={{
                    border: `1px solid ${borderColor}`,
                    borderRadius: 1.5,
                    p: 0.5,
                    color: "text.secondary",
                    "&:hover": {
                      borderColor: "primary.main",
                      color: "primary.main",
                    },
                  }}
                >
                  <UploadFileRoundedIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            )}
            {props.enter && (
              <Tooltip arrow placement="top" title={props.entertooltip}>
                <IconButton
                  size="small"
                  onClick={() => handleEnter(row)}
                  sx={{
                    border: `1px solid ${borderColor}`,
                    borderRadius: 1.5,
                    p: 0.5,
                    color: "text.secondary",
                    "&:hover": {
                      borderColor: "primary.main",
                      color: "primary.main",
                    },
                  }}
                >
                  {props?.enterIcon}
                </IconButton>
              </Tooltip>
            )}
            {props.generate && (
              <Tooltip arrow placement="top" title={props.generateTitle}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleGenerate(row)}
                >
                  {props?.generateButton}
                </Button>
              </Tooltip>
            )}
          </Box>
        )}
        muiTablePaperProps={{
          sx: {
            backgroundColor: bodyBackgroundColor,
            border: "none",
            boxShadow: "none",
            borderRadius: 0,
          },
        }}
        muiTableHeadRowProps={{
          sx: {
            backgroundColor: props?.headColor || headBg,
            boxShadow: "none",
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            color: headColor,
            fontWeight: 600,
            fontSize: 12,
            textTransform: "none",
            letterSpacing: 0,
            borderBottom: `1px solid ${borderColor}`,
            "& .Mui-TableHeadCell-Content-Labels": {
              color: headColor,
            },
          },
        }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => handleRowClick(row),
          sx: {
            cursor: "pointer",
            backgroundColor: bodyBackgroundColor,
            "&:hover td": { backgroundColor: rowHoverBg },
          },
        })}
        muiTableBodyCellProps={{
          sx: {
            fontSize: 12.5,
            borderBottom: `1px solid ${borderColor}`,
          },
        }}
      />
    </Box>
  );
};

export default CustomTable;

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useFilterExpenseForm } from "../../../hooks/expense/expense/filterExpense/useFilterExpenseForm";
import { nanoid } from "nanoid";
import NoDataFound from "../../PageNotFound/NoDataFound";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { CustomPaginationUpdated } from "../../../components/Pagination/CustomPaginationUpdated";

const ExpenseRedirectProfitLoss = () => {
  const theme = useTheme();

  const [filteredData, setFilteredData] = useState(null);

  const { formik: filterFormik, loading: isLoading } = useFilterExpenseForm({
    expenseData: (data) => setFilteredData(data),
  });

  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        accessorKey: "expenseType",
        header: "Expense Type",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "paymentType",
        header: "Payment Type",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "amount",
        header: "Amount",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "description",
        header: "Description",
        maxWidth: 250,
        size: 200,
        sortable: false,
        Cell: ({ cell }) => {
          const { description } = cell?.row?.original || {};
          return (
            <div
              style={{
                wordBreak: "break-word",
                whiteSpace: "normal",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {description || "N/A"}
            </div>
          );
        },
      },

      {
        id: nanoid(),
        accessorKey: "createdBy",
        header: "Created By",
        maxWidth: 150,
        sortable: false,
        Cell: ({ cell }) => {
          const { createdBy, createdDate } = cell?.row?.original || {};
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>{createdBy || "N/A"}</span>
              <span>{createdDate || "-"}</span>
            </div>
          );
        },
      },
      {
        id: nanoid(),
        header: "Verified By",
        maxWidth: 150,
        sortable: false,
        Cell: ({ cell }) => {
          const { verified, verifiedBy, id } = cell?.row?.original || {};
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>{verifiedBy || ""}</span>
              <span>
                {verified ? (
                  <Chip label="Verified" color="success" />
                ) : (
                  <Chip label="Unverified" color="warning" />
                )}
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const renderView = () => {
    if (isLoading) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      );
    }
    if (!filteredData?.content || filteredData.content.length === 0) {
      return <NoDataFound />;
    }

    <CustomTable
      columns={columns}
      data={filteredData?.content}
      overFlow={"scroll"}
      width={"100%"}
      enablePagination={false}
      enableRowNumbers
    />;
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: theme.palette.text.default,
            fontWeight: 700,
          }}
        >
          Expense
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: "1rem",
          marginTop: ".1rem",
        }}
      >
        {renderView()}
      </Box>
      <CustomPaginationUpdated
        totalPages={filteredData?.totalPages || 1}
        currentPage={filteredData?.pageable?.pageNumber + 1}
        rowsPerPage={filteredData?.pageable?.pageSize}
        totalElements={filteredData?.totalElements || 0}
        filterFormik={filterFormik}
      />
    </>
  );
};

export default ExpenseRedirectProfitLoss;

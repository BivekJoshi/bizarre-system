import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ReportProfitLossForm from "./ReportProfitLossForm";
import { useProfitLossReportDownloadForm } from "../../../../hooks/report/profitLoss/useProfitLossReportDownloadForm";
import { useProfitLossReportForm } from "../../../../hooks/report/profitLoss/useProfitLossReportForm";

const ReportProfitLoss = () => {
  const theme = useTheme();
  const [profitLossData, setProfitLossData] = useState(null);
  const [fileType, setFileType] = useState(null);

  const { formik } = useProfitLossReportForm({
    profitLossReport: (data) => setProfitLossData(data),
  });

  const { formik: downloadFormik } = useProfitLossReportDownloadForm({
    setData: formik?.values,
    fileType: fileType,
  });

  const handleClickExport = (fileType) => {
    if (fileType) {
      setFileType(fileType);
      downloadFormik.handleSubmit();
    }
  };

  return (
    <div>
      <ReportProfitLossForm formik={formik} />
      <br />
      {profitLossData && (
        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
            padding: "1rem",
            marginTop: ".1rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h3"
              sx={{ color: theme.palette.text.default, fontWeight: 700 }}
            >
              Profit Loss Report
            </Typography>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Tooltip
                title="Export as PDF"
                onClick={() => handleClickExport("pdf")}
              >
                <PictureAsPdfIcon sx={{ fontSize: "30px" }} />
              </Tooltip>
              <Tooltip
                title="Export as Excel"
                onClick={() => handleClickExport("excel")}
              >
                <AnalyticsIcon sx={{ fontSize: "30px" }} />
              </Tooltip>
            </div>
          </div>
          <br />

          <TableContainer sx={{ maxWidth: 600, margin: "auto", mt: 3, p: 2 }}>
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
              Profit & Loss Account
            </Typography>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>
                    <strong>Category</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Amount (रु)</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    sx={{ fontWeight: "bold", backgroundColor: "#c8e6c9" }}
                  >
                    REVENUE
                  </TableCell>
                </TableRow>
                {profitLossData?.incomes.length > 0 ? (
                  profitLossData?.incomes.map((income, index) => (
                    <TableRow
                      key={`income-${index}`}
                      sx={{ backgroundColor: "#d0f0d0" }}
                    >
                      <TableCell>{income.title}</TableCell>
                      <TableCell align="right">
                        {income.amount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2}>No Income Data</TableCell>
                  </TableRow>
                )}
                <TableRow
                  sx={{ backgroundColor: "#a5d6a7", fontWeight: "bold" }}
                >
                  <TableCell>Total Income</TableCell>
                  <TableCell align="right">
                    {profitLossData?.totalIncome.toLocaleString()}
                  </TableCell>
                </TableRow>
                <br />
                <br />
                <TableRow>
                  <TableCell
                    colSpan={2}
                    sx={{ fontWeight: "bold", backgroundColor: "#ffcdd2" }}
                  >
                    EXPENSES
                  </TableCell>
                </TableRow>
                {profitLossData?.expenses.length > 0 ? (
                  profitLossData?.expenses.map((expense, index) => (
                    <TableRow
                      key={`expense-${index}`}
                      sx={{ backgroundColor: "#ffebee" }}
                    >
                      <TableCell>{expense.title}</TableCell>
                      <TableCell align="right">
                        -{expense.amount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2}>No Expense Data</TableCell>
                  </TableRow>
                )}
                <TableRow
                  sx={{ backgroundColor: "#ef9a9a", fontWeight: "bold" }}
                >
                  <TableCell>Total Expenses</TableCell>
                  <TableCell align="right">
                    -{profitLossData?.totalExpense.toLocaleString()}
                  </TableCell>
                </TableRow>
                <br />
                <br />
                <TableRow
                  sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                >
                  <TableCell>Cost of Goods Sold</TableCell>
                  <TableCell align="right">
                    {profitLossData?.cogs.toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                >
                  <TableCell>Gross Profit</TableCell>
                  <TableCell align="right">
                    {profitLossData?.grossProfit.toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    backgroundColor:
                      profitLossData?.netProfit >= 0 ? "#00a000" : "#f74040",
                    fontWeight: "bold",
                  }}
                >
                  <TableCell sx={{ fontWeight: "bold" }}>NET PROFIT</TableCell>
                  <TableCell align="right">
                    {profitLossData?.netProfit.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
};

export default ReportProfitLoss;

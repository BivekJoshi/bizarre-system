import React, { useMemo, useState } from "react";
import { Box, Grid, Paper, Tooltip, Typography, useTheme } from "@mui/material";
import { nanoid } from "nanoid";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import NoDataFound from "../../../PageNotFound/NoDataFound";
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

  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        accessorKey: "title",
        header: "Title",
      },
      {
        id: nanoid(),
        accessorKey: "amount",
        header: "Amount",
        maxWidth: 80,
      },
    ],
    []
  );

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

          {profitLossData ? (
            <>
              <Paper
                sx={{
                  padding: "2rem",
                  backgroundColor: theme.palette.background.alt,
                }}
              >
                <div style={{ display: "flex", gap: "2rem" }}>
                  <Typography
                    variant="h4"
                    sx={{ color: theme.palette.text.default, fontWeight: 700 }}
                  >
                    Net Profit
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: "green", fontWeight: 900 }}
                  >
                    {/* {profitLossData?.totalIncome} */}
                    {profitLossData?.netProfit || "NA"}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5">Total Income</Typography>
                    <Typography variant="h5">
                      {profitLossData?.totalIncome || "NA"}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5">Total Expense</Typography>
                    <Typography variant="h5">
                      {profitLossData?.totalExpense || "NA"}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5">Gross Profit</Typography>
                    <Typography variant="h5">
                      {profitLossData?.grossProfit || "NA"}
                    </Typography>
                  </div>
                </div>
              </Paper>
              <br />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  Incomes
                  <CustomTable
                    columns={columns}
                    title="Income"
                    data={profitLossData?.incomes}
                    overFlow="scroll"
                    width="100%"
                    enablePagination={false}
                    enableRowNumbers
                    headColor={"green"}
                  />
                </Grid>
                <Grid item xs={6}>
                  Expenses
                  <CustomTable
                    columns={columns}
                    title="Income"
                    data={profitLossData?.expenses}
                    overFlow="scroll"
                    width="100%"
                    enablePagination={false}
                    enableRowNumbers
                    headColor={"red"}
                  />
                </Grid>
              </Grid>
            </>
          ) : (
            <NoDataFound />
          )}
        </Box>
      )}
    </div>
  );
};

export default ReportProfitLoss;

import React, { useMemo, useState } from "react";
import { Box, Paper, Tooltip, Typography, useTheme } from "@mui/material";
import { nanoid } from "nanoid";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import NoDataFound from "../../../PageNotFound/NoDataFound";
import ReportItemSalesForm from "./ReportItemSalesForm";
import { useItemSalesReportForm } from "../../../../hooks/report/itemSales/useItemSalesReportForm";
import { useItemSalesReportDownloadForm } from "../../../../hooks/report/itemSales/useItemSalesReportDownloadForm";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const ReportItemSales = () => {
  const theme = useTheme();
  const [reportData, setReportData] = useState(null);
  const [fileType, setFileType] = useState(null);


  const { formik } = useItemSalesReportForm({
    salesItemReport: (data) => setReportData(data),
  });

  const { formik: downloadFormik } = useItemSalesReportDownloadForm({
    setData: formik?.values,
    fileType: fileType,
  });

  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        accessorKey: "name",
        header: "Item Name",
        maxWidth: 80,
      },
      {
        id: nanoid(),
        accessorKey: "cost",
        header: "Cost",
        maxWidth: 80,
      },
      {
        id: nanoid(),
        accessorKey: "sales",
        header: "Sales",
        maxWidth: 80,
      },

      {
        id: nanoid(),
        accessorKey: "sellingPrice",
        header: "Selling Price",
        maxWidth: 80,
      },
      {
        id: nanoid(),
        accessorKey: "salesAmount",
        header: "Sales Amount",
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
      <ReportItemSalesForm formik={formik} />
      <br />

      {reportData && (
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
              Item Sales Report
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

          {reportData?.itemSalesList ? (
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
                    Best Sold Item
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: "green", fontWeight: 900 }}
                  >
                    {reportData?.bestItem}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5">Total Cost</Typography>
                    <Typography variant="h5">
                      {reportData?.totalCost || "NA"}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5">Total Sales</Typography>
                    <Typography variant="h5">
                      {reportData?.totalSales || "NA"}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5">Total Profit</Typography>
                    <Typography variant="h5">
                      {reportData?.totalProfit || "NA"}
                    </Typography>
                  </div>
                </div>
              </Paper>
              <br />
              <CustomTable
                columns={columns}
                data={reportData.itemSalesList}
                overFlow="scroll"
                width="100%"
                enablePagination={false}
                enableRowNumbers
              />
              <br />
              <Paper
                sx={{
                  padding: "2rem",
                  backgroundColor: theme.palette.background.alt,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "2rem",
                    justifyContent: "end",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ color: theme.palette.text.default, fontWeight: 700 }}
                  >
                    Total Sales
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: "green", fontWeight: 900 }}
                  >
                    रु {reportData?.totalSales}
                  </Typography>
                </div>
              </Paper>
            </>
          ) : (
            <NoDataFound />
          )}
        </Box>
      )}
    </div>
  );
};

export default ReportItemSales;

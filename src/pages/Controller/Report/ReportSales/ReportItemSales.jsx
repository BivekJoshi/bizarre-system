import React, { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { nanoid } from "nanoid";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import NoDataFound from "../../../PageNotFound/NoDataFound";
import ReportItemSalesForm from "./ReportItemSalesForm";
import { useItemSalesReportForm } from "../../../../hooks/report/itemSales/useItemSalesReportForm";

const ReportItemSales = () => {
  const theme = useTheme();
  const [reportData, setReportData] = useState(null);

  const { formik } = useItemSalesReportForm({
    salesItemReport: (data) => setReportData(data),
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
        accessorKey: "sales",
        header: "Total sales",
        maxWidth: 80,
      },
      {
        id: nanoid(),
        accessorKey: "sellingPrice",
        header: "Selling Price",
        maxWidth: 80,
      },
    ],
    []
  );

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
          <Typography
            variant="h3"
            sx={{ color: theme.palette.text.default, fontWeight: 700 }}
          >
            Item Sales Report
          </Typography>
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

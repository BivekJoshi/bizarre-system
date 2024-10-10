import React, { useMemo, useState } from "react";
import { useBatchOrderReportForm } from "../../../../hooks/report/batchOrder/useBatchOrderReportForm";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { nanoid } from "nanoid";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import ReportBatchOrderForm from "./ReportBatchOrderForm";

const ReportBatchOrder = () => {
  const theme = useTheme();
  const [reportData, setReportData] = useState(null);

  const { formik } = useBatchOrderReportForm({
    salesItemReport: (data) => setReportData(data),
  });

  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        accessorKey: "branch",
        header: "Branch",
        maxWidth: 80,
      },
      {
        id: nanoid(),
        accessorKey: "tableNumber",
        header: "Table No.",
        maxWidth: 80,
      },
      {
        id: nanoid(),
        header: "Customer",
        Cell: ({ cell }) => {
          const data = cell?.row?.original;
          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                Customer Name: <b>{data?.customerName || "NA"}</b>
              </div>
              <div>
                Order: <b>{data?.orderCount || "NA"}</b>
              </div>
            </div>
          );
        },
      },
      {
        id: nanoid(),
        header: "Bill",
        Cell: ({ cell }) => {
          const data = cell?.row?.original;
          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                Total Billed: <b>रु {data?.totalBilled || "NA"}</b>
              </div>
              <div>
                Bank Received: <b>रु {data?.bankReceived || "NA"}</b>
              </div>
              <div>
                Cash Received: <b>रु {data?.cashReceived || "NA"}</b>
              </div>
              <div>
                Coins Received: <b>{data?.coinsReceived || "NA"}</b>
              </div>
              <div>
                Total Received: <b>रु {data?.totalReceived || "NA"}</b>
              </div>
            </div>
          );
        },
      },
      {
        id: nanoid(),
        header: "Discount",
        Cell: ({ cell }) => {
          const data = cell?.row?.original;
          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                Promo Code: <b>{data?.promoCode || "NA"}</b>
              </div>
              <div>
                Discount Type: <b>{data?.discountType || "NA"}</b>
              </div>
              <div>
                Discount Value: <b>{data?.discountValue || "NA"}</b>
              </div>
            </div>
          );
        },
      },
      {
        id: nanoid(),
        accessorKey: "batchStatus",
        header: "Status",
        maxWidth: 80,
        Cell: ({ cell }) => <Chip label={cell.getValue()} color="primary" />,
      },
      {
        id: nanoid(),
        header: "Served By",
        Cell: ({ cell }) => {
          const data = cell?.row?.original;
          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                Name: <b>{data?.handledBy || "NA"}</b>
              </div>
              <div>
                Type: <b>{data?.userType || "NA"}</b>
              </div>
            </div>
          );
        },
      },
      {
        id: nanoid(),
        header: "Duration",
        Cell: ({ cell }) => {
          const data = cell?.row?.original;
          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>Arrival: {data?.orderBeginDateTime || "NA"}</div>
              <div>Departure: {data?.orderEndDateTime || "NA"}</div>
            </div>
          );
        },
      },
    ],
    []
  );

  const renderReportCard = (title, value, icon) => (
    <Card>
      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <div>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {value ?? "N/A"}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <ReportBatchOrderForm formik={formik} />
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
            Batch Order Report
          </Typography>
          <br />
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Grid item xs={12} md={2}>
              {renderReportCard(
                "Total Billed",
                `रु ${reportData.sumTotalBilled}`,
                "attach_money"
              )}
            </Grid>
            <Grid item xs={12} md={2}>
              {renderReportCard(
                "Total Cash Received",
                `रु ${reportData.totalCashReceived}`,
                "money"
              )}
            </Grid>
            <Grid item xs={12} md={2}>
              {renderReportCard(
                "Total Bank Received",
                `रु ${reportData.totalBankReceived}`,
                "account_balance"
              )}
            </Grid>
            <Grid item xs={12} md={2}>
              {renderReportCard(
                "Total Coins Received",
                reportData.totalCoinsReceived,
                "monetization_on"
              )}
            </Grid>
            <Grid item xs={12} md={2}>
              {renderReportCard(
                "Total Received",
                `रु ${reportData.sumTotalReceived}`,
                "savings"
              )}
            </Grid>
            <Grid item xs={12} md={2}>
              {renderReportCard(
                "Grand Total",
                `रु ${reportData.total}`,
                "calculate"
              )}
            </Grid>
          </Grid>
          <br />
          <CustomTable
            columns={columns}
            data={reportData.batchOrders}
            overFlow="scroll"
            width="100%"
            enablePagination={false}
            enableRowNumbers
          />
        </Box>
      )}
    </div>
  );
};

export default ReportBatchOrder;

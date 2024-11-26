import React, { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { nanoid } from "nanoid";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import ReportBatchOrderForm from "./ReportBatchOrderForm";
import NoDataFound from "../../../PageNotFound/NoDataFound";
import { useBatchOrderReportForm } from "../../../../hooks/report/batchOrder/useBatchOrderReportForm";
import { useBatchOrderReportDownloadForm } from "../../../../hooks/report/batchOrder/useBatchOrderReportDownloadForm";
import ConfirmationModal from "../../../../components/Modal/ConfirmationModal";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import FormModal from "../../../../components/Modal/FormModal";
import ReGenerateBillModal from "../../Batch/Bill/ReGenerateBillModal";
import { DOC_URL } from "../../../../api/axiosInterceptor";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const ReportBatchOrder = () => {
  const theme = useTheme();
  const [reportData, setReportData] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [fileType, setFileType] = useState(null);

  const [isReGenerateBillModalOpen, setIsReGenerateBillModalOpen] =
    useState(false);
  const [openBillLayout, setOpenLayout] = useState(false);

  const { formik } = useBatchOrderReportForm({
    salesItemReport: (data) => {
      setReportData(data);
    },
  });

  const { formik: downloadFormik } = useBatchOrderReportDownloadForm({
    setData: formik?.values,
    fileType: fileType,
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
        Cell: ({ cell }) => {
          const status = cell.getValue();
          const chipColor = status === "UNPAID" ? "error" : "success";

          return <Chip label={status} color={chipColor} />;
        },
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

  const handleGenerate = (row) => {
    setIsReGenerateBillModalOpen(true);
    setRowData(row?.original);
  };

  const handleReGenerateBill = () => {
    setOpenLayout(true);
  };

  const handleClickExport = (fileType) => {
    if (fileType) {
      setFileType(fileType);
      downloadFormik.handleSubmit();
    }
  };
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h3"
              sx={{ color: theme.palette.text.default, fontWeight: 700 }}
            >
              Batch Order Report
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

          {reportData?.batchOrders && reportData?.batchOrders?.length > 0 ? (
            <>
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
                enableColumnActions
                generate
                enableEditing={true}
                generateTitle="Regenerate Bill"
                generateButton="Regenerate Bill"
                handleGenerate={handleGenerate}
              />
            </>
          ) : (
            <NoDataFound />
          )}
        </Box>
      )}

      <ConfirmationModal
        disagreeLabel={"No, Close !"}
        agreeLabel={"Yes, Procced"}
        alertTitle={"Regerate Bill"}
        header={"You are going to regenerate bill!"}
        confirmhead={"Are you sure ?"}
        isModalOpen={isReGenerateBillModalOpen}
        handleModalClose={handleReGenerateBill}
        handleSave={() => setIsReGenerateBillModalOpen(false)}
        icon={
          <CardMembershipIcon
            sx={{
              backgroundColor: "#e9d3f1",
              borderRadius: "50%",
              fontSize: 36,
              padding: "1rem",
              color: "#ab0ad8",
            }}
          />
        }
      />
      <FormModal
        open={openBillLayout}
        onClose={() => setOpenLayout(false)}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Regenerate Bill"}
        formComponent={
          <ReGenerateBillModal
            batchId={rowData?.id}
            onClose={() => {
              setOpenLayout(false);
              setIsReGenerateBillModalOpen(false);
            }}
          />
        }
        showButton={false}
      />
    </div>
  );
};

export default ReportBatchOrder;

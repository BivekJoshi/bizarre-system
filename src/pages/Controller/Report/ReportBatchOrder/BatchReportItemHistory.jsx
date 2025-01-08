import React from "react";
import { useParams } from "react-router-dom";
import { useGetBatchOrder } from "../../../../hooks/order/useOrder";
import OrderProcessBaristaCard from "../../Order/OrderProcess/OrderProcessBaristaCard";
import { Grid } from "@mui/material";
import OrderCardView from "../../Order/OrderCardView";
import OrderReport from "../../Order/OrderReport";

const BatchReportItemHistory = () => {
  const { id } = useParams();

  const batchId = id;

  const { data: batchDataInfo, isLoading } = useGetBatchOrder(batchId);
  console.log("🚀 ~ BatchReportItemHistory ~ batchDataInfo:", batchDataInfo);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <OrderReport orderReport={batchDataInfo?.[0]?.batch} />
      </Grid>

      {batchDataInfo?.map((data, index) => {
        return (
          <Grid item xs={12} md={4} lg={3} sm={12} key={index}>
            <OrderCardView data={data} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BatchReportItemHistory;

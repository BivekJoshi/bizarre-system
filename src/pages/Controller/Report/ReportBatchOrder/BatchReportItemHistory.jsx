import React from "react";
import { useParams } from "react-router-dom";
import { useGetBatchOrder } from "../../../../hooks/order/useOrder";

const BatchReportItemHistory = () => {
  const { id } = useParams();

  const batchId = id;

  const { data: batchDataInfo, isLoading } = useGetBatchOrder(batchId);
  return (
    <>
    {batchDataInfo?.map((data,index)=>{
      return(
        <div>
          cxsdcsdc
        </div>
      )
    })}
    </>
  );
};

export default BatchReportItemHistory;

import React from "react";
import { useGetRegenerateBillByBatchId } from "../../../../hooks/batch/usebatch";
import BillLayout from "../Payment/BillLayout";
import BillRegerateLayout from "../Payment/BillRegerateLayout";

const ReGenerateBillModal = ({ batchId, onClose }) => {
  const { data: regenerateBillData, isLoading } =
    useGetRegenerateBillByBatchId(batchId);


  return (
    <>
      <BillRegerateLayout
        finalBill={regenerateBillData?.data}
        onClose={() => {
          setFinalBillModalOpen(false);
          onClose();
        }}
      />
    </>
  );
};

export default ReGenerateBillModal;

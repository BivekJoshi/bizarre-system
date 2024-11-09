import React from "react";
import BillRegerateLayout from "../Payment/BillRegerateLayout";

const SplitBillPrint = ({ finalBill, onClose }) => {
  return (
    <div>
      <BillRegerateLayout
        finalBill={finalBill}
        onClose={onClose}
      />
    </div>
  );
};

export default SplitBillPrint;

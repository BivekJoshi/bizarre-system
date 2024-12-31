import React from "react";
import UserCard from "../../../../components/Card/UserCard/UserCard";

const CashierCardView = ({ data, setIsEditModalOpen, setRowData }) => {
  return (
    <UserCard
      data={data}
      setIsEditModalOpen={setIsEditModalOpen}
      setRowData={setRowData}
    />
  );
};

export default CashierCardView;

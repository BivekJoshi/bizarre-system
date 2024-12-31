import React from "react";
import UserCard from "../../../../components/Card/UserCard/UserCard";

const BranchOwnerCardView = ({ data, setIsEditModalOpen, setRowData }) => {
  return (
    <UserCard
      data={data}
      setIsEditModalOpen={setIsEditModalOpen}
      setRowData={setRowData}
    />
  );
};

export default BranchOwnerCardView;

import React from "react";
import UserCard from "../../../../components/Card/UserCard/UserCard";

const BranchOwnerCardView = ({
  data,
  setIsEditModalOpen,
  setRowData,
  setIsDocumentModalOpen,
}) => {
  return (
    <UserCard
      data={data}
      setIsEditModalOpen={setIsEditModalOpen}
      setRowData={setRowData}
      setIsDocumentModalOpen={setIsDocumentModalOpen}
    />
  );
};

export default BranchOwnerCardView;

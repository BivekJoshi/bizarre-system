import React from "react";
import UserCard from "../../../components/Card/UserCard/UserCard";

const CustomerCardView = ({ data, setIsEditModalOpen, setRowData }) => {
  return (
    <UserCard
      data={data}
      setIsEditModalOpen={setIsEditModalOpen}
      setRowData={setRowData}
    />
  );
};

export default CustomerCardView;

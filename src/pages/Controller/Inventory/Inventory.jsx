import React from "react";
import { useGetInventory } from "../../../hooks/inventory/useInventory";

const Inventory = () => {
  const { data } = useGetInventory(0, 10);
  console.log("🚀 ~ Inventory ~ data:", data);
  return <div>Inventory</div>;
};

export default Inventory;

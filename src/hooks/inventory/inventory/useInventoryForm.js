import { useFormik } from "formik";
import { useState } from "react";
import { useAddStockInventory, useEditStockInventory } from "../useInventory";

export const useAddInventoryForm = ({ selectedCardId, inputValue }) => {
  const { mutate, isLoading } = useAddStockInventory({});

  const formik = useFormik({
    initialValues: {
      itemId: selectedCardId || "",
      stockCount: inputValue || "",
      reorderLevel: 0,
      maxStockLevel: 0,
      leadTimeDays: 0,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      handleAddRequest(values);
    },
  });

  const handleAddRequest = (values) => {
    mutate(values, {
      onSuccess: (data) => {},
      onError: () => {},
    });
  };

  return {
    formik,
    loading: isLoading,
  };
};

export const useInventoryForm = ({ itemId, inputValue, filterFormik }) => {
  const { mutate, isLoading } = useEditStockInventory({});

  const formik = useFormik({
    initialValues: {
      itemId: itemId || "",
      stockCount: inputValue || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      handleAddRequest(values);
    },
  });

  const handleAddRequest = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        filterFormik.handleSubmit();
      },
      onError: () => {},
    });
  };

  return {
    formik,
    loading: isLoading,
  };
};

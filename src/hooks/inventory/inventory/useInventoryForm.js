import { useFormik } from "formik";
import { useState } from "react";
import { useAddStockInventory, useEditStockInventory } from "../useInventory";

export const useAddInventoryForm = ({ selectedCardId, inputValue }) => {
  const { mutate, isLoading } = useAddStockInventory({});
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      itemId: selectedCardId || "",
      stockCount: inputValue || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      handleAddRequest(values);
    },
  });

  const handleAddRequest = (values) => {
    setLoading(true);
    mutate(values, {
      onSuccess: (data) => {
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  return {
    formik,
    loading: isLoading || loading,
  };
};

export const useInventoryForm = ({ itemId, inputValue }) => {
  const { mutate, isLoading } = useEditStockInventory({});
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    mutate(values, {
      onSuccess: (data) => {
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  return {
    formik,
    loading: isLoading || loading,
  };
};

import { useFormik } from "formik";
import { useChatGenerateAItem } from "../useChat";
import { useState } from "react";

export const useAIGenerateItemForm = ({}) => {
  const { mutate: addMutate, isLoading } = useChatGenerateAItem({});
  const [generateItemData, setGenerateItemData] = useState({});

  const formik = useFormik({
    initialValues: {
      generate: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      handledAddRequest(values);
    },
  });

  const handledAddRequest = (values) => {
    values = { ...values };
    addMutate(values, {
      onSuccess: (data) => {
        setGenerateItemData(data);
      },
    });
  };

  return {
    formik,
    generateItemData,
    isLoading,
  };
};

import { useFormik } from "formik";
import { useChatGenerateAI } from "../useChat";
import { useState } from "react";

export const useAIgenerateForm = ({}) => {
  const { mutate: addMutate, isLoading } = useChatGenerateAI({});
  const [generateData, setGenerateData] = useState({});

  const formik = useFormik({
    initialValues: {
      message: "",
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
        setGenerateData(data);
      },
    });
  };

  return {
    formik,
    generateData,
    isLoading,
  };
};

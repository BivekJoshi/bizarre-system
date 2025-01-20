import { useFormik } from "formik";
import { useState } from "react";
import { useSwitchTableBatch } from "../usebatch";
import * as Yup from "yup";

const switchTableSchema = Yup.object().shape({
  targetTableId: Yup.string()
    .required("Please Select Target Table"),
});


export const useSwitchTableForm = ({ tableId }) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSwitchTableBatch({});

  const formik = useFormik({
    initialValues: {
      sourceTableId: tableId || "",
      targetTableId: "",
    },
    validationSchema: switchTableSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handledAddRequest(values);
    },
  });

  const handledAddRequest = (values) => {
    setLoading(true);
    values = { ...values };
    mutate(values, {
      onSuccess: () => {
        setLoading(false);
      },
    });
  };

  return {
    formik,
    loading,
  };
};

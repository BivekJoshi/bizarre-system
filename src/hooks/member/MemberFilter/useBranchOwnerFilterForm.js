import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useFilterMember } from "../useMember";

export const useBranchOwnerFilterForm = ({ onClose, memberData }) => {
  const { mutate } = useFilterMember({});
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      search: [
        {
          field: "userType",
          value: "BRANCH_OWNER",
          type: "object",
          object: "user",
        }
      ],
      actionType: "FILTER",
      pageNumber: "" || 1,
      noOfRecords: "" || 10,
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
        memberData(data?.data?.data);
        onClose && onClose();
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    if (formik?.values?.pageNumber > 0) {
      handleAddRequest(formik.values);
    }
  }, [formik.values.search]);

  return {
    formik,
    loading,
  };
};

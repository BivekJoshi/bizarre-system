import { useFormik } from "formik";

import { useChangePassword } from "../useUser";

export const useChangePasswordForm = () => {

    const { mutate } = useChangePassword({});

    const formik = useFormik({
        initialValues: {
            mobileNumber: "",
            oldPassword: "",
            newPassword: ""
        },
        //   validationSchema: sendMoneyRecipientBankSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            handledAddRequest(values);
        },
    });

    const handledAddRequest = (values) => {
        values = { ...values };
        mutate(values, {
        });
    };

    return {
        formik,
    };
};

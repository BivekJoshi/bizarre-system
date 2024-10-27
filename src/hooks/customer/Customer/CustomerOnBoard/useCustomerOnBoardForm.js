import { useFormik } from "formik";

import { useAddCustomerByOnBoard } from "../../useCustomer";

export const useCustomerOnBoardForm = ({ onClose }) => {
    const { mutate: addMutate } = useAddCustomerByOnBoard({});


    const formik = useFormik({
        initialValues: {
            id: "",
            fullName: "",
            mobileNumber: "",
        },
        // validationSchema: branchSchema,
        enableReinitialize: true,
        onSubmit: (values) => {

            handledAddRequest(values);
        },
    });
    const handledAddRequest = (values) => {
        values = { ...values };
        addMutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return {
        formik,
    };
};

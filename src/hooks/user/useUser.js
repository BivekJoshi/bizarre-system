import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { changePassword } from "../../api/controller/user-api";

/*_____________________________CHANGE PASSWORD_______________________________________________ */
export const useChangePassword = ({ onSuccess }) => {
    return useMutation(
        ["changePassword"],
        (formData) => changePassword(formData),
        {
            onSuccess: (data, variables, context) => {
                toast.success("Successfully changed Password");
                onSuccess && onSuccess(data, variables, context);
            },
            onError: (err, _variables, _context) => {
                toast.error(`${err.message}`);
            },
        }
    );
};
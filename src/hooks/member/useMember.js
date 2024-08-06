import { useMutation } from "react-query";
import { addWaiterMember } from "../../api/controller/memeber-api";
import { toast } from "react-toastify";

/*_____________________________POST WAITER MEMBER_______________________________________________ */
export const useAddWaiterMember = ({ onSuccess }) => {
    return useMutation(
        ["addWaiter"],
        (formData) => addWaiterMember(formData),
        {
            onSuccess: (data, variables, context) => {
                toast.success("Successfully added waiter");
                onSuccess && onSuccess(data, variables, context);
            },
            onError: (err, _variables, _context) => {
                toast.error(`${err.message}`);
            },
        }
    );
};
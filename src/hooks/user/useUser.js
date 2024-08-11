import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { changePassword, forgotPassword, getUserData } from "../../api/controller/user-api";

/*________________________GET USER DATA_____________________________________*/
export const useGetUserData = () => {
  return useQuery(["getUserData"], () => getUserData(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

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


/*_____________________________CHANGE PASSWORD_______________________________________________ */
export const useForgotPassword = ({ onSuccess }) => {
  return useMutation(
    ["forgotPassword"],
    (formData) => forgotPassword(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully requested for recover password");
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(`${err.message}`);
      },
    }
  );
};
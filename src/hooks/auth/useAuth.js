import { useMutation } from "react-query";
import { authenticate } from "../../api/controller/auth-api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setTokenType, setUser, setUserType } from "../../utils/cookieHelper";

/*________________________AUTHENTICATE_____________________________________*/
export const useAuth = () => {
  const navigate = useNavigate();

  return useMutation(
    ["login"],
    async ({ mobileNumber, password }) => {
      try {
        const response = await authenticate(mobileNumber, password);
        return response.data;
      } catch (error) {
        throw (
          error?.response.data?.errorMessage || "An error occurred during login"
        );
      }
    },
    {
      onSuccess: (data) => {
        setUser(data?.tokenId);
        setUserType(data?.userType);
        setTokenType(data?.tokenType);
        toast.success("Login Successful");

        switch (data?.userType) {
          case "ADMIN":
            navigate("/admin/dashboard");
            break;
          case "BRANCH_OWNER":
            navigate("/branch-owner/dashboard");
            break;
          case "CASHIER":
            navigate("/cashier/dashboard");
            break;
          case "WAITER":
            navigate("/waiter/dashboard");
            break;
          case "BARISTA":
            navigate("/barista/dashboard");
            break;
          case "SUPPLIER":
            navigate("/supplier/dashboard");
            break;
          case "CUSTOMER":
            navigate("/customer/dashboard");
            break;
          default:
            navigate("/404");
        }
      },
      onError: (err, _variables, _context) => {
        toast.error(err);
      },
    }
  );
};

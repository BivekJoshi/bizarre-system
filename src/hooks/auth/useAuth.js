import { useMutation, useQueryClient } from "react-query";
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
        if (data?.userType === "ADMIN") {
          navigate("/admin/dashboard");
        } else if (data?.userType === "BRANCH_OWNER") {
          navigate("/branch-owner/dashboard");
        } else if (data?.userType === "CASHIER") {
          navigate("/cashier/dashboard");
        } else if (data?.userType === "WAITER") {
          navigate("/waiter/dashboard");
        } else if (data?.userType === "BARISTA") {
          navigate("/barista/dashboard");
        } else if (data?.userType === "SUPPLIER") {
          navigate("/supplier/dashboard");
        } else if (data?.userType === "CUSTOMER") {
          navigate("/customer/dashboard");
        } else {
          navigate("/404");
        }
      },
      onError: (err, _variables, _context) => {
        toast.error(err);
      },
    }
  );
};

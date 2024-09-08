import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/getErrorMessage";
import {
  addRedeemCode,
  addRedeemCodeWithoutAuth,
  editRedeemCode,
  getRedeemCode,
  getRedeemCodeById,
} from "../../api/controller/redeemcode-api";

/*________________________GET_____________________________________*/
export const useGetRedeemCode = (pageNumber, pageSize) => {
  return useQuery(
    ["getRedeemCode", pageNumber, pageSize],
    () => getRedeemCode(pageNumber, pageSize),
    {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________GET_BY_ID_____________________________________*/
export const useGetRedeemCodeById = (id) => {
  return useQuery(["getRedeemCodeById"], () => getRedeemCodeById(id), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddRedeemCode = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addRedeemCode"], (formData) => addRedeemCode(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Redeem Code added successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getRedeemCode");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

/*________________________POST WITH OUT AUTH_____________________________________*/
export const useAddRedeemCodeWithoutAuth = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addRedeemCodeWithoutAuth"],
    (formData) => addRedeemCodeWithoutAuth(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Redeem Code added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getRedeemCode");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*________________________PATCH_____________________________________*/
export const useEditRedeemCode = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editRedeemCode"],
    (formData) => editRedeemCode(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Redeem Code edited successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getRedeemCode");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

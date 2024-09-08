import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/getErrorMessage";
import {
  addPromoCode,
  editPromoCode,
  getPromoCode,
  getPromoCodeById,
  getValidPromoCode,
} from "../../api/controller/promocode-api";

/*________________________GET_____________________________________*/
export const useGetPromoCode = (pageNumber, pageSize) => {
  return useQuery(
    ["getPromoCode", pageNumber, pageSize],
    () => getPromoCode(pageNumber, pageSize),
    {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________GET VALID PROMO CODE_____________________________________*/
export const useGetValidPromoCode = (code, userType) => {
  return useQuery(
    ["getValidPromoCode", code, userType],
    () => getValidPromoCode(code, userType),
    {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________GET_BY_ID_____________________________________*/
export const useGetPromoCodeById = (id) => {
  return useQuery(["getPromoCodeById"], () => getPromoCodeById(id), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddPromoCode = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addPromoCode"], (formData) => addPromoCode(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Promo Code added successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getPromoCode");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

/*________________________PATCH_____________________________________*/
export const useEditPromoCode = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["editPromoCode"], (formData) => editPromoCode(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Promo Code edited successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getPromoCode");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

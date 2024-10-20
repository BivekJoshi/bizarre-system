import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addCustomer,
  editCustomer,
  filterCustomer,
  getCustomer,
  getCustomerById,
} from "../../api/controller/customer-api";
import { getErrorMessage } from "../../utils/getErrorMessage";

/*________________________GET_____________________________________*/
export const useGetCustomer = (pageNumber, pageSize) => {
  return useQuery(
    ["getCustomer", pageNumber, pageSize],
    () => getCustomer(pageNumber, pageSize),
    {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________GET_BY_ID_____________________________________*/
export const useGetCustomerById = (id) => {
  return useQuery(["getCustomerById"], () => getCustomerById(id), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddCustomer = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addCustomer"], (formData) => addCustomer(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Customer added successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getCustomer");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

/*________________________PATCH_____________________________________*/
export const useEditCustomer = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["editCustomer"], (formData) => editCustomer(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Customer edited successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getCustomer");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

/*________________________FILTER CUSTOMER_____________________________________*/
export const useFilterCustomer = ({ onSuccess }) => {
  return useMutation(["filterCustomer"], (formData) => filterCustomer(formData), {
    onSuccess: (data, variables, context) => {
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

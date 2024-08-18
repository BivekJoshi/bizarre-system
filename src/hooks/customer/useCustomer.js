import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addCustomer,
  editCustomer,
  getCustomer,
  getCustomerById,
} from "../../api/controller/customer-api";

/*________________________GET_____________________________________*/
export const useGetCustomer = () => {
  return useQuery(["getCustomer"], () => getCustomer(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
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
      toast.error(`${err.message}`);
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
      toast.error(`${err.message}`);
    },
  });
};

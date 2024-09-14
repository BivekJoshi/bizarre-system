import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addCustomerTable,
  editCustomerTable,
  getCustomerTable,
  getCustomerTableById,
  getCustomerTableByStatus,
} from "../../api/controller/customer-table-api";
import { getErrorMessage } from "../../utils/getErrorMessage";

/*________________________GET_____________________________________*/
export const useGetCustomerTable = (pageNumber, pageSize) => {
  return useQuery(
    ["getCustomerTable", pageNumber, pageSize],
    () => getCustomerTable(pageNumber, pageSize),
    {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
};

/*________________________GET BY STATUS_____________________________________*/
export const useGetCustomerTableByStatus = (status) => {
  return useQuery(
    ["getCustomerTableByStatus", status],
    () => getCustomerTableByStatus(status),
    {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
};

/*________________________GET_BY_ID_____________________________________*/
export const useGetCustomerTableById = (id) => {
  return useQuery(["getCustomerTableById"], () => getCustomerTableById(id), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddCustomerTable = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addCustomerTable"],
    (formData) => addCustomerTable(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Customer Table added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getCustomerTable");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*________________________PATCH_____________________________________*/
export const useEditCustomerTable = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editCustomerTable"],
    (formData) => editCustomerTable(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Customer Table edited successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getCustomerTable");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

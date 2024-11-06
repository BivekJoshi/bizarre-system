import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addCustomer,
  addCustomerByOnBoard,
  editCustomer,
  filterCustomer,
  getCustomer,
  getCustomerById,
  getCustomerByMobileNumber,
  verifyCustomer,
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

/*________________________POST CUSTOMER ONBOARD_____________________________________*/
export const useAddCustomerByOnBoard = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addCustomerByOnBoard"],
    (formData) => addCustomerByOnBoard(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Customer onboarded successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("filterCustomer");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
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
  return useMutation(
    ["filterCustomer"],
    (formData) => filterCustomer(formData),
    {
      onSuccess: (data, variables, context) => {
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*________________________VERIFY CUSTOMER_____________________________________*/
export const useVerifyCustomer = (id) => {
  console.log("🚀 ~ useVerifyCustomer ~ id:", id);
  return useMutation(() => verifyCustomer(id), {
    onSuccess: (data) => {
      toast.success("Customer verified successfully");
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });
};

/*________________________GET_BY_ID_____________________________________*/
export const useGetCustomerByMobileNumber = (mobileNumber) => {
  console.log("🚀 ~ useGetCustomerByMobileNumber ~ mobileNumber:", mobileNumber)
  return useQuery(
    ["getCustomerByMobileNumber", mobileNumber],
    () => getCustomerByMobileNumber(mobileNumber),
    {
      enabled: mobileNumber.length === 10,
      keepPreviousData: true, 
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      onError: (err) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

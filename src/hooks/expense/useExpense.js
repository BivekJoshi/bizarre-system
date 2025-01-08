import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/getErrorMessage";
import {
  addExpense,
  deleteExpense,
  editExpense,
  filterExpense,
  getExpense,
  getExpenseById,
  getExpenseVerifyById,
} from "../../api/controller/expense-api";

/*________________________PATCH_____________________________________*/
export const useEditExpense = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["editExpense"], (formData) => editExpense(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Expense record edited successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getExpense");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

/*________________________POST_____________________________________*/
export const useAddExpense = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addExpense"], (formData) => addExpense(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Expense Record added successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getExpense");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

/*________________________GET_____________________________________*/
export const useGetExpense = (pageNumber, pageSize) => {
  return useQuery(
    ["getExpense", pageNumber, pageSize],
    () => getExpense(pageNumber, pageSize),
    {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________FILTER EXPENSES_____________________________________*/
export const useFilterExpenses = ({ onSuccess }) => {
  return useMutation(["filterExpense"], (formData) => filterExpense(formData), {
    onSuccess: (data, variables, context) => {
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

/*________________________GET_BY_ID_____________________________________*/
export const useGetExpenseById = (id) => {
  return useQuery(["getExpenseById"], () => getExpenseById(id), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET_BY_EXPENSE_VERIFY_BY_ID_____________________________________*/
export const useGetExpenseVerifyById = (id) => {
  return useQuery(["getExpenseVerifyById"], () => getExpenseVerifyById(id), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________DELETE_____________________________________*/
export const useDeleteExpense = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["deleteExpense"], (id) => deleteExpense(id), {
    onSuccess: (data, variables, context) => {
      toast.success("Expense record deleted successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getExpense");
    },
  });
};

import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addBaristaMember,
  addBranchOwnerMember,
  addCashierMember,
  addIdDocument,
  addWaiterMember,
  editMember,
  filterMember,
  getMember,
  getMemberById,
} from "../../api/controller/memeber-api";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/getErrorMessage";

/*________________________GET_____________________________________*/
export const useGetMember = (pageNumber, pageSize) => {
  return useQuery(
    ["getMember", pageNumber, pageSize],
    () => getMember(pageNumber, pageSize),
    {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________GET_BY_ID_____________________________________*/
export const useGetMemberById = (id) => {
  return useQuery(["getMemberById"], () => getMemberById(id), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*_____________________________POST WAITER MEMBER_______________________________________________ */
export const useAddWaiterMember = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addWaiter"], (formData) => addWaiterMember(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Successfully added waiter");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getMember");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

/*_____________________________POST CASHIER MEMBER_______________________________________________ */
export const useAddCashierMember = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addCashierMember"],
    (formData) => addCashierMember(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully added cashier");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getMember");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*_____________________________POST BARISTA MEMBER_______________________________________________ */
export const useAddBaristaMember = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addBaristaMember"],
    (formData) => addBaristaMember(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully added barista");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getMember");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*_____________________________POST BRANCH OWNER MEMBER_______________________________________________ */
export const useAddBranchOwnerMember = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addBranchOwnerMember"],
    (formData) => addBranchOwnerMember(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully added branch owner");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getMember");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*_____________________________POST BRANCH OWNER MEMBER_______________________________________________ */
export const useEditMember = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["editMember"], (formData) => editMember(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Successfully edited memeber detail");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getMember");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

/*________________________POST PP DETAIL_____________________________________*/
export const useAddIdDocument = ({ onSuccess }) => {
  const queryClient = useQueryClient();

  return useMutation((formData) => addIdDocument(formData), {
    onSuccess: (data, variables, context) => {
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getMember");
      toast.success("Added Document of memeber successfuly");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

/*________________________FILTER MEMBER_____________________________________*/
export const useFilterMember = ({ onSuccess }) => {
  return useMutation(["filterMember"], (formData) => filterMember(formData), {
    onSuccess: (data, variables, context) => {
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

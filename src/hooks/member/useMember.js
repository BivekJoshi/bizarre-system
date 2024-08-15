import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addBranchOwnerMember,
  addCashierMember,
  addWaiterMember,
  getMember,
  getMemberById,
} from "../../api/controller/memeber-api";
import { toast } from "react-toastify";

/*________________________GET_____________________________________*/
export const useGetMember = () => {
  return useQuery(["getMember"], () => getMember(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
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
      toast.error(`${err.message}`);
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
        toast.error(`${err.message}`);
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
        toast.error(`${err.message}`);
      },
    }
  );
};

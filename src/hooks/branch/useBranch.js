import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addBranch,
  deleteBranch,
  editBranch,
  getBranch,
  getBranchById,
} from "../../api/controller/branch-api";

/*________________________GET_____________________________________*/
export const useGetBranch = () => {
  return useQuery(["getBranch"], () => getBranch(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET_BY_ID_____________________________________*/
export const useGetRewardById = (id) => {
  return useQuery(["getBranchById"], () => getBranchById(id), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddBranch = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addBranch"], (formData) => addBranch(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Branch added successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getBranch");
    },
    onError: (err, _variables, _context) => {
      //   toast.error(getErrorMessage(err));
    },
  });
};

/*________________________PATCH_____________________________________*/
export const useEditReward = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["editReward"], (formData) => editBranch(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Branch edited successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getBranch");
    },
    onError: (err, _variables, _context) => {
      //   toast.error(getErrorMessage(err));
    },
  });
};

/*________________________DELETE_____________________________________*/
export const useDeleteReward = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["deleteReward"], (id) => deleteBranch(id), {
    onSuccess: (data, variables, context) => {
      toast.success("Branch deleted successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getBranch");
    },
  });
};

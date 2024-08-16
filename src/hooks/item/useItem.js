import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addItem,
  addItemChangeStatus,
  editItem,
  getItem,
  getItemById,
} from "../../api/controller/item-api";

/*________________________GET_____________________________________*/
export const useGetItem = () => {
  return useQuery(["getItem"], () => getItem(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET_BY_ID_____________________________________*/
export const useGetItemById = (id) => {
  return useQuery(["getItemById"], () => getItemById(id), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddItem = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addItem"], (formData) => addItem(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Item added successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getItem");
    },
    onError: (err, _variables, _context) => {
      //   toast.error(getErrorMessage(err));
    },
  });
};

/*________________________PATCH_____________________________________*/
export const useEditItem = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["editItem"], (formData) => editItem(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Item edited successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getItem");
    },
    onError: (err, _variables, _context) => {
      //   toast.error(getErrorMessage(err));
    },
  });
};

/*________________________POST_____________________________________*/
export const useChangeStatus = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addItemChangeStatus"],
    (formData) => addItemChangeStatus(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Status Changed successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getItem");
      },
      onError: (err, _variables, _context) => {
        //   toast.error(getErrorMessage(err));
      },
    }
  );
};

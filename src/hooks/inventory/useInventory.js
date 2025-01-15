import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addInventoryByItemId,
  editStockInventory,
  filterInventoryItem,
  getInventoryFind,
} from "../../api/controller/inventory-api";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { toast } from "react-toastify";

/*________________________GET_____________________________________*/
export const useGetInventory = (pageNumber, pageSize) => {
  return useQuery(
    ["getInventoryFind", pageNumber, pageSize],
    () => getInventoryFind(pageNumber, pageSize),
    {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________GET_BY_ID_____________________________________*/
// export const useAddInventoryById = (id) => {
//   return useQuery(["addInventoryByItemId"], () => addInventoryByItemId(id), {
//     cacheTime: 10000,
//     refetchInterval: false,
//     refetchOnWindowFocus: false,
//   });
// };
export const useAddStockInventory = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addInventoryByItemId"],
    (formData) => addInventoryByItemId(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Inventory data added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("useGetInventory");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};


/*________________________FILTER INVENTORY_____________________________________*/
export const useFilterInventory = ({ onSuccess }) => {
  return useMutation(
    ["filterInventoryItem"],
    (formData) => filterInventoryItem(formData),
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

/*________________________PATCH_____________________________________*/
export const useEditStockInventory = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editStockInventory"],
    (formData) => editStockInventory(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Inventory data edited successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("useGetInventory");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

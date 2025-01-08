import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  editStockInventory,
  filterInventoryItem,
  getInventoryByItemId,
  getInventoryFind,
} from "../../api/controller/inventory-api";

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
export const useGetInventoryById = (id) => {
  return useQuery(["getInventoryByItemId"], () => getInventoryByItemId(id), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
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

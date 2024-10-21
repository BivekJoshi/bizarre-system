import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addOrder,
  deleteOrder,
  editOrder,
  getbatchOrder,
  getCancelOrder,
  getOrder,
  getOrderById,
  getOrderReady,
  getOrderServed,
  getPreparing,
} from "../../api/controller/order-api";
import { getErrorMessage } from "../../utils/getErrorMessage";

/*________________________GET ALL_____________________________________*/
export const useGetOrder = (pageNumber, pageSize, status) => {
  return useQuery(
    ["getOrder", pageNumber, pageSize, status],
    () => getOrder(pageNumber, pageSize, status),
    {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________GET_BY_ID_____________________________________*/
export const useGetOrderById = (id) => {
  return useQuery(["getOrderById"], () => getOrderById(id), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET_SERVED_____________________________________*/
export const useGetOrderServed = (orderId) => {
  return useQuery(["getOrderServed", orderId], () => getOrderServed(orderId), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET_READY_____________________________________*/
export const useGetOrderReady = (orderId) => {
  return useQuery(["getOrderReady", orderId], () => getOrderReady(orderId), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET_PREPARING_____________________________________*/
export const useGetOrderPreparing = (orderId) => {
  return useQuery(["getPreparing", orderId], () => getPreparing(orderId), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET_CANCEL_____________________________________*/
export const useGetCancelOrder = (orderId) => {
  return useQuery(["getCancelOrder", orderId], () => getCancelOrder(orderId), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET_BATCH_ORDER_____________________________________*/
export const useGetBatchOrder = (batchId) => {
  return useQuery(["getbatchOrder", batchId], () => getbatchOrder(batchId), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddOrder = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addOrder"], (formData) => addOrder(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Ordered placed successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getBatchByTableId");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

/*________________________PATCH_____________________________________*/
export const useEditOrder = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["editOrder"], (formData) => editOrder(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Order edited successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getBatchByTableId");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

/*________________________DELETE_____________________________________*/
export const useDeleteOrder = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["deleteOrder"], (id) => deleteOrder(id), {
    onSuccess: (data, variables, context) => {
      toast.success("Order deleted successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getOrder");
    },
  });
};

import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addOrder,
  editOrder,
  getOrder,
  getOrderById,
  getOrderReady,
  getOrderServed,
  getPreparing,
} from "../../api/controller/order-api";

/*________________________GET ALL_____________________________________*/
export const useGetOrder = () => {
  return useQuery(["getOrder"], () => getOrder(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
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
  return useQuery(["getOrderServed"], () => getOrderServed(orderId), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET_READY_____________________________________*/
export const useGetOrderReady = (orderId) => {
  return useQuery(["getOrderReady"], () => getOrderReady(orderId), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET_PREPARING_____________________________________*/
export const useGetOrderPreparing = (orderId) => {
  return useQuery(["getPreparing"], () => getPreparing(orderId), {
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
      queryClient.invalidateQueries("getOrder");
    },
    onError: (err, _variables, _context) => {
      toast.error(`${err.message}`);
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
      queryClient.invalidateQueries("getOrder");
    },
    onError: (err, _variables, _context) => {
      toast.error(`${err.message}`);
    },
  });
};

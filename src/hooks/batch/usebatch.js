import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  bypassPaymentBatch,
  generateNormalBillBatch,
  generateRouletteBillBatch,
  generateSplitBillBatch,
  getBatchByTableId,
  getReGenerateBillByBatchId,
  normalPayBatch,
  splitPayBatch,
  switchTableBatch,
} from "../../api/controller/batch-api";
import { getErrorMessage } from "../../utils/getErrorMessage";

/*________________________GET_BY_ID_____________________________________*/
export const useGetBatchById = (tableId) => {
  return useQuery(["getBatchByTableId"], () => getBatchByTableId(tableId), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET_REGENERATE_BILL_BY_BATCHID_____________________________________*/
export const useGetRegenerateBillByBatchId = (batchId) => {
  console.log("🚀 ~ useGetRegenerateBillByBatchId ~ batchId:", batchId)
  return useQuery(["getReGenerateBillByBatchId"], () => getReGenerateBillByBatchId(batchId), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*___________________________SWITCH TABLE_____________________________________*/
export const useSwitchTableBatch = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["switchTableBatch"],
    (formData) => switchTableBatch(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Table Switched successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getBatchByTableId");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*___________________________SPLIT PAY_____________________________________*/
export const useSplitPayBatch = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["splitPayBatch"], (formData) => splitPayBatch(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Split pay successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getBatchByTableId");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

/*___________________________NORMAL PAY_____________________________________*/
export const useNormalPayBatch = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["normalPayBatch"],
    (formData) => normalPayBatch(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Normal Pay successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getBatchByTableId");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*___________________________GENERATE SPLIT BILL_____________________________________*/
export const useGenerateSplitBillBatch = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["generateSplitBillBatch"],
    (formData) => generateSplitBillBatch(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Generated Split Bill successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getBatchByTableId");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*___________________________GENERATE ROULETTE BILL_____________________________________*/
export const useGenerateRouletteBillBatch = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["generateRouletteBillBatch"],
    (formData) => generateRouletteBillBatch(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Generated Roulette Bill successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getBatchByTableId");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*___________________________GENERATE NORMAL BILL_____________________________________*/
export const useGenerateNormalBillBatch = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["generateNormalBillBatch"],
    (formData) => generateNormalBillBatch(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Generated Normal Bill successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getBatchByTableId");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*___________________________BYPASS PAYMENT_____________________________________*/
export const useByPassPaymentBatch = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["bypassPaymentBatch"],
    (formData) => bypassPaymentBatch(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Bypass Payment successfull");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getBatchByTableId");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

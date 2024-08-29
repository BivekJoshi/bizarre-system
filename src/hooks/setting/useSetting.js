import { useMutation, useQuery, useQueryClient } from "react-query";
import { addSetting, getSetting } from "../../api/controller/setting-api";
import { toast } from "react-toastify";

/*________________________GET_____________________________________*/
export const useGetSetting = () => {
  return useQuery(["getSetting"], () => getSetting(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*_____________________________POST WAITER MEMBER_______________________________________________ */
export const useAddSetting = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addSetting"], (formData) => addSetting(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Successfully added setting");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getSetting");
    },
    onError: (err, _variables, _context) => {
      toast.error(`${err.message}`);
    },
  });
};

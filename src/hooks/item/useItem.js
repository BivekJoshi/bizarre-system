import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addItem,
  addItemChangeStatus,
  addUploadItemImage,
  editItem,
  getItem,
  getItemById,
} from "../../api/controller/item-api";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { useFormik } from "formik";

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
      toast.error(getErrorMessage(err));
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
      toast.error(getErrorMessage(err));
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
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*________________________UPLOAD ITEM IMAGAGE_____________________________________*/
export const useUploadItemImage = ({ onSuccess }) => {
  const queryClient = useQueryClient();

  return useMutation(
    ["addUploadItemImage"],
    (image, formData) => addUploadItemImage(image, formData),
    {
      onSuccess: (data, variables, context) => {
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getItem");
        toast.success("Item Image Uplaoded Successfully");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

export const useUploadItemImageForm = ({ finalImageFile, rowDataId }) => {
  const { mutate } = useUploadItemImage({});

  const handleAddProfileImage = (value) => {
    const formData = { ...value, multipartFile: finalImageFile };
    mutate(formData);
  };
  const formik = useFormik({
    initialValues: {
      id: rowDataId,
      multipartFile: finalImageFile,
    },
    onSubmit: (values) => {
      handleAddProfileImage(values);
    },
  });

  return {
    formik,
  };
};

export default useUploadItemImageForm;

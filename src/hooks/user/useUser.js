import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addProfilePic,
  changePassword,
  forgotPassword,
  getUserData,
} from "../../api/controller/user-api";
import { useFormik } from "formik";
import { getErrorMessage } from "../../utils/getErrorMessage";

/*________________________GET USER DATA_____________________________________*/
export const useGetUserData = () => {
  return useQuery(["getUserData"], () => getUserData(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*_____________________________CHANGE PASSWORD_______________________________________________ */
export const useChangePassword = ({ onSuccess }) => {
  return useMutation(
    ["changePassword"],
    (formData) => changePassword(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully changed Password");
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*_____________________________CHANGE PASSWORD_______________________________________________ */
export const useForgotPassword = ({ onSuccess }) => {
  return useMutation(
    ["forgotPassword"],
    (formData) => forgotPassword(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully requested for recover password");
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*________________________POST PP DETAIL_____________________________________*/
export const useAddProfilePicture = ({ onSuccess }) => {
  const queryClient = useQueryClient();

  return useMutation(["addProfile"], (image) => addProfilePic(image), {
    onSuccess: (data, variables, context) => {
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getUserData");
      toast.success("Profile Picture Successfully Changed");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

export const useProfilePic = ({ finalImageFile, onClose }) => {
  const { mutate } = useAddProfilePicture({});

  const handleAddProfileImage = (value) => {
    mutate(value, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  const formik = useFormik({
    initialValues: {
      id:"a053ca12-5cea-11ef-b231-cecd0207e311",
      multipartFile: finalImageFile,
    },
    onSubmit: () => {
      handleAddProfileImage(finalImageFile);
    },
  });

  return {
    formik,
  };
};

export default useProfilePic
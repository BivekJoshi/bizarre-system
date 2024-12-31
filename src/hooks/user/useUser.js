import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addProfilePic,
  changePassword,
  forgotPassword,
  getUserData,
  lockUser,
  unLockUser,
} from "../../api/controller/user-api";
import { useFormik } from "formik";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { useSelector } from "react-redux";

/*________________________GET USER DATA_____________________________________*/
export const useGetUserData = () => {
  return useQuery(["getUserData"], () => getUserData(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*_____________________________LOCK_USER_______________________________________________ */
export const useLockUser = ({ onSuccess }) => {
  return useMutation(["lockUser"], (formData) => lockUser(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Successfully locked user");
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

/*_____________________________UNLOCK_USER_______________________________________________ */
export const useUnLockUser = ({ onSuccess }) => {
  return useMutation(["unLockUser"], (formData) => unLockUser(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Successfully unlocked user");
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
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

  return useMutation((formData) => addProfilePic(formData), {
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
  const { mutate } = useAddProfilePicture({ onSuccess: onClose });

  const userId = useSelector((state) => state?.user?.userId);

  const handleAddProfileImage = (values) => {
    const formData = { ...values, multipartFile: finalImageFile };
    mutate(formData);
  };
  const formik = useFormik({
    initialValues: {
      id: userId,
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

export default useProfilePic;

import { useState } from 'react';
import { useFormik } from 'formik';
import { authSchema } from './authSchema';
import { useAuth } from '../useAuth';

export const useAuthForm = () => {
  const [loading, setLoading] = useState(false);
  const [showValues, setShowValues] = useState({
    password: '',
    showPassword: false,
  });
  const { mutate } = useAuth({});
  const formik = useFormik({
    initialValues: {
      mobileNumber: '',
      password: '',
    },
    validationSchema: authSchema,
    onSubmit: (values) => {
      setLoading(true);
      handleLogin(values);
    },
  });

  const handleLogin = (values) => {

    const { mobileNumber, password } = values;

    const trimmedPassword = password.trim();
    mutate(
      { mobileNumber, password: trimmedPassword },
      { onSettled: () => setLoading(false) }
    );
  };

  const handleClickShowPassword = () => {
    setShowValues({
      ...showValues,
      showPassword: !showValues.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return {
    handleLogin,
    formik,
    showValues,
    loading,
    handleMouseDownPassword,
    handleClickShowPassword,
  };
};

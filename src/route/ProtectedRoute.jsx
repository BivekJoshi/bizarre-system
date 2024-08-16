import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getUserType, removeUser } from "../utils/cookieHelper";
import { toast } from "react-toastify";

const ProtectedRoute = ({ redirectTo, allowedRoles }) => {
  const navigate = useNavigate();
  const user = getUserType();

  useEffect(() => {
    if (!user) {
      removeUser();
      navigate("/login");
      toast.error("Unauthorized user");
    }
  }, [user]);

  if(!allowedRoles?.includes(user)) return <Navigate exact to={redirectTo}/>;
  return <Outlet/>;
};

export default ProtectedRoute;

import React, { lazy } from "react";
import ScrollToTop from "../utils/ScrollToTop";
import { HashRouter, Route, Routes } from "react-router-dom";
import Error404 from "../pages/PageNotFound/Error404";
import LoginPage from "../pages/Controller/Auth/LoginPage";
import ChangePassword from "../pages/Controller/User/ChangePassword";
import Loadable from "../components/Loader/Loadable";
import Loader from "../components/Loader/Loader";
import AdminAppLayout from "../components/AppLayout/AdminAppLayout";

const AddBranch = Loadable(
  lazy(() => import("../pages/Controller/Branch/AddBranch"))
);
const AppRoute = () => {
  return (
    <HashRouter hashType="slash">
      <ScrollToTop>
        <Routes>
          <Route exact path="*" element={<Error404 />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/loader" element={<Loader />} />

          <Route path="/admin" element={<AdminAppLayout />}>
            <Route path="dashboard" element={<AddBranch />} />
          <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </HashRouter>
  );
};

export default AppRoute;

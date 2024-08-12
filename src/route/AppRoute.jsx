import React, { lazy } from "react";
import ScrollToTop from "../utils/ScrollToTop";
import { HashRouter, Route, Routes } from "react-router-dom";
import Loadable from "../components/Loader/Loadable";
import ProtectedRoute from "./ProtectedRoute";

// Loadable imports for pages
const Error404 = Loadable(lazy(() => import("../pages/PageNotFound/Error404")));
const LoginPage = Loadable(
  lazy(() => import("../pages/Controller/Auth/LoginPage"))
);
const ChangePassword = Loadable(
  lazy(() => import("../pages/Controller/User/ChangePassword"))
);
const AdminAppLayout = Loadable(
  lazy(() => import("../components/AppLayout/AdminAppLayout"))
);
const PageNotFound = Loadable(
  lazy(() => import("../pages/PageNotFound/PageNotFound"))
);
const AdminDashboard = Loadable(
  lazy(() => import("../pages/AdminPage/Dashboard/AdminDashboard"))
);
const Branch = Loadable(
  lazy(() => import("../pages/Controller/Branch/Branch"))
);
const Customer = Loadable(
  lazy(() => import("../pages/Controller/Customer/Customer"))
);
const Batch = Loadable(lazy(() => import("../pages/Controller/Batch/Batch")));
const Cashier = Loadable(
  lazy(() => import("../pages/Controller/Member/Cashier/Cashier"))
);
const Waiter = Loadable(
  lazy(() => import("../pages/Controller/Member/Waiter/Waiter"))
);
const ChangePasswordInitial = Loadable(
  lazy(() => import("../pages/Controller/Auth/ChangePasswordInitial"))
);
const Profile = Loadable(
  lazy(() => import("../pages/Controller/User/Profile"))
);
const ForgotPassword = Loadable(
  lazy(() => import("../pages/Controller/Auth/ForgotPassword"))
);

// Example of another lazy-loaded page
const AddBranch = Loadable(
  lazy(() => import("../pages/Controller/Branch/AddBranch"))
);

const AppRoute = () => {
  return (
    <HashRouter hashType="slash">
      <ScrollToTop>
        <Routes>
          <Route exact path="/404" element={<Error404 />} />
          <Route exact path="*" element={<PageNotFound />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePasswordInitial />} />

          <Route
            element={
              <ProtectedRoute redirectTo="/404" allowedRoles={["ADMIN"]} />
            }
          >
            <Route path="/admin" element={<AdminAppLayout />}>
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="profile" element={<Profile />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="branch" element={<Branch />} />
              <Route path="waiter" element={<Waiter />} />
              <Route path="cashier" element={<Cashier />} />
              <Route path="customer" element={<Customer />} />
              <Route path="batch" element={<Batch />} />
            </Route>
          </Route>
        </Routes>
      </ScrollToTop>
    </HashRouter>
  );
};

export default AppRoute;

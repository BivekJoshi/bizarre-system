import React, { lazy } from "react";
import ScrollToTop from "../utils/ScrollToTop";
import { HashRouter, Route, Routes } from "react-router-dom";
import Loadable from "../components/Loader/Loadable";
import ProtectedRoute from "./ProtectedRoute";
import { branchOwnerRoute } from "./Routes/branchOwnerRoute";
import { adminRoutes } from "./Routes/adminRoutes";
import { cashierRoute } from "./Routes/cashierRoute";
import { waiterRoute } from "./Routes/waiterRoute";
import { baristaRoutes } from "./Routes/baristaRoute";
import { supplierRoute } from "./Routes/supplierRoute";
import { customerRoute } from "./Routes/customerRoute";

const Error404 = Loadable(lazy(() => import("../pages/PageNotFound/Error404")));
const LoginPage = Loadable(
  lazy(() => import("../pages/Controller/Auth/LoginPage"))
);
const AppLayout = Loadable(
  lazy(() => import("../components/AppLayout/AppLayout"))
);
const PageNotFound = Loadable(
  lazy(() => import("../pages/PageNotFound/PageNotFound"))
);
const ChangePasswordInitial = Loadable(
  lazy(() => import("../pages/Controller/Auth/ChangePasswordInitial"))
);
const ForgotPassword = Loadable(
  lazy(() => import("../pages/Controller/Auth/ForgotPassword"))
);
const Profile = Loadable(
  lazy(() => import("../pages/Controller/User/Profile"))
);
const ChangePassword = Loadable(
  lazy(() => import("../pages/Controller/User/ChangePassword"))
);

const roleRoutesMap = {
  ADMIN: adminRoutes,
  BRANCH_OWNER: branchOwnerRoute,
  CASHIER: cashierRoute,
  WAITER: waiterRoute,
  BARISTA: baristaRoutes,
  SUPPLIER: supplierRoute,
  CUSTOMER: customerRoute,
};

const AppRoute = () => {
  return (
    <HashRouter hashType="slash">
      <ScrollToTop>
        <Routes>
          <Route path="/404" element={<Error404 />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePasswordInitial />} />

          {Object.entries(roleRoutesMap).map(([role, routes]) => (
            <Route
              key={role}
              element={
                <ProtectedRoute redirectTo="/404" allowedRoles={[role]} />
              }
            >
              {console.log(role.toLowerCase())}
              <Route path={`/${role.toLowerCase()}`} element={<AppLayout />}>
                <Route path="change-password" element={<ChangePassword />} />
                <Route path="profile" element={<Profile />} />
                {routes.map((route) => (
                  <Route
                    key={route.id}
                    path={route.path}
                    exact
                    element={<route.component />}
                  />
                ))}
              </Route>
            </Route>
          ))}
        </Routes>
      </ScrollToTop>
    </HashRouter>
  );
};

export default AppRoute;

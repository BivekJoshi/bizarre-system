import React, { lazy } from "react";
import ScrollToTop from "../utils/ScrollToTop";
import { HashRouter, Route, Routes } from "react-router-dom";
import Loadable from "../components/Loader/Loadable";
import ProtectedRoute from "./ProtectedRoute";
import { adminRoutes } from "./Routes/adminRoutes";
import { branchOwnerRoute } from "./Routes/branchOwnerRoute";
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
            <Route path="/admin" element={<AppLayout />}>
              {adminRoutes.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  exact
                  element={<route.component />}
                />
              ))}
            </Route>
          </Route>
          <Route
            element={
              <ProtectedRoute
                redirectTo="/404"
                allowedRoles={["BRANCH_OWNER"]}
              />
            }
          >
            <Route path="/branch-owner" element={<AppLayout />}>
              {branchOwnerRoute.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  exact
                  element={<route.component />}
                />
              ))}
            </Route>
          </Route>
          <Route
            element={
              <ProtectedRoute redirectTo="/404" allowedRoles={["CASHIER"]} />
            }
          >
            <Route path="/cashier" element={<AppLayout />}>
              {cashierRoute.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  exact
                  element={<route.component />}
                />
              ))}
            </Route>
          </Route>
          <Route
            element={
              <ProtectedRoute redirectTo="/404" allowedRoles={["WAITER"]} />
            }
          >
            <Route path="/waiter" element={<AppLayout />}>
              {waiterRoute.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  exact
                  element={<route.component />}
                />
              ))}
            </Route>
          </Route>
          <Route
            element={
              <ProtectedRoute redirectTo="/404" allowedRoles={["BARISTA"]} />
            }
          >
            <Route path="/barista" element={<AppLayout />}>
              {baristaRoutes.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  exact
                  element={<route.component />}
                />
              ))}
            </Route>
          </Route>
          <Route
            element={
              <ProtectedRoute redirectTo="/404" allowedRoles={["SUPPLIER"]} />
            }
          >
            <Route path="/supplier" element={<AppLayout />}>
              {supplierRoute.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  exact
                  element={<route.component />}
                />
              ))}
            </Route>
          </Route>
          <Route
            element={
              <ProtectedRoute redirectTo="/404" allowedRoles={["SUPPLIER"]} />
            }
          >
            <Route path="/customer" element={<AppLayout />}>
              {customerRoute.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  exact
                  element={<route.component />}
                />
              ))}
            </Route>
          </Route>
        </Routes>
      </ScrollToTop>
    </HashRouter>
  );
};

export default AppRoute;

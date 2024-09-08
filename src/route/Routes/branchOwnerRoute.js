import { nanoid } from "nanoid";
import Loadable from "../../components/Loader/Loadable";
import { lazy } from "react";
import PromoCode from "../../pages/Controller/PromoCode/PromoCode";

const AdminDashboard = Loadable(
  lazy(() => import("../../pages/AdminPage/Dashboard/AdminDashboard"))
);

const Barista = Loadable(
  lazy(() => import("../../pages/Controller/Member/Barista/Barista"))
);

const Waiter = Loadable(
  lazy(() => import("../../pages/Controller/Member/Waiter/Waiter"))
);

const Cashier = Loadable(
  lazy(() => import("../../pages/Controller/Member/Cashier/Cashier"))
);

const Customer = Loadable(
  lazy(() => import("../../pages/Controller/Customer/Customer"))
);

const Order = Loadable(
  lazy(() => import("../../pages/Controller/Order/Order"))
);

const CustomerTable = Loadable(
  lazy(() => import("../../pages/Controller/CustomerTable/CustomerTable"))
);

const AllOrders = Loadable(
  lazy(() => import("../../pages/Controller/Order/AllOrders"))
);

const branchOwnerRoute = [
  {
    path: "dashboard",
    name: "Dashboard",
    id: nanoid(),
    component: AdminDashboard,
  },
  {
    path: "customer-table",
    name: "customer-table",
    id: nanoid(),
    component: CustomerTable,
  },

  {
    path: "customer-table/:id",
    name: "Customer Table Details",
    id: nanoid(),
    component: Order,
  },
  {
    path: "barista",
    name: "barista",
    id: nanoid(),
    component: Barista,
  },
  {
    path: "cashier",
    name: "cashier",
    id: nanoid(),
    component: Cashier,
  },
  {
    path: "waiter",
    name: "waiter",
    id: nanoid(),
    component: Waiter,
  },
  {
    path: "orders",
    name: "Orders",
    id: nanoid(),
    component: AllOrders,
  },
  {
    path: "customer",
    name: "customer",
    id: nanoid(),
    component: Customer,
  },
  {
    path: "promo-code",
    name: "promo-code",
    id: nanoid(),
    component: PromoCode,
  },
];

export { branchOwnerRoute };

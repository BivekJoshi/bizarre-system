import { nanoid } from "nanoid";

import Item from "../../pages/Controller/Item/Item";
import Cart from "../../pages/Cart/Cart";
import { lazy } from "react";
import Loadable from "../../components/Loader/Loadable";
import ExpenseRedirectProfitLoss from "../../pages/Controller/Expense/ExpenseRedirectProfitLoss";

const AdminDashboard = Loadable(
  lazy(() => import("../../pages/AdminPage/Dashboard/AdminDashboard"))
);
const CustomerTable = Loadable(
  lazy(() => import("../../pages/Controller/CustomerTable/CustomerTable"))
);
const OrderProcessTab = Loadable(
  lazy(() =>
    import("../../pages/Controller/Order/OrderProcess/OrderProcessTab")
  )
);
const Order = Loadable(
  lazy(() => import("../../pages/Controller/Order/Order"))
);
const Customer = Loadable(
  lazy(() => import("../../pages/Controller/Customer/Customer"))
);
const Inventory = Loadable(
  lazy(() => import("../../pages/Controller/Inventory/Inventory"))
);
const Expense = Loadable(
  lazy(() => import("../../pages/Controller/Expense/Expense"))
);

const cashierRoute = [
  {
    path: "dashboard",
    name: "Dashboard",
    id: nanoid(),
    component: AdminDashboard,
  },
  {
    path: "orders",
    name: "Orders",
    id: nanoid(),
    component: OrderProcessTab,
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
    path: "customer",
    name: "customer",
    id: nanoid(),
    component: Customer,
  },
  {
    path: "inventory",
    name: "inventory",
    id: nanoid(),
    component: Inventory,
  },
  {
    path: "expense/:status",
    name: "expense/verified",
    id: nanoid(),
    component: Expense,
  },
  {
    path: "profit/loss-report/expense/:status/:year/:month",
    name: "profit/loss-report/expense/verified",
    id: nanoid(),
    component: ExpenseRedirectProfitLoss,
  },
];

export { cashierRoute };

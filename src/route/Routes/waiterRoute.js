import { nanoid } from "nanoid";

import AdminDashboard from "../../pages/AdminPage/Dashboard/AdminDashboard";
import Item from "../../pages/Controller/Item/Item";
import Cart from "../../pages/Cart/Cart";
import OrderProcessTab from "../../pages/Controller/Order/OrderProcess/OrderProcessTab";
import CustomerTable from "../../pages/Controller/CustomerTable/CustomerTable";
import { lazy } from "react";
import Loadable from "../../components/Loader/Loadable";
import WebSocketClient from "../../constants/websocket";
const Order = Loadable(
  lazy(() => import("../../pages/Controller/Order/Order"))
);

const waiterRoute = [
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
    path: "chat",
    name: "Chat",
    id: nanoid(),
    component: WebSocketClient,
  },
];

export { waiterRoute };

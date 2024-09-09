import { nanoid } from "nanoid";
import Loadable from "../../components/Loader/Loadable";
import { lazy } from "react";

import AdminDashboard from "../../pages/AdminPage/Dashboard/AdminDashboard";

const OrderProcess = Loadable(
  lazy(() => import("../../pages/Controller/Order/OrderProcess/OrderProcess"))
);


const baristaRoutes = [
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
    component: OrderProcess,
  },
];

export { baristaRoutes };

import { nanoid } from "nanoid";

import AdminDashboard from "../../pages/AdminPage/Dashboard/AdminDashboard";
import CustomerTable from "../../pages/Controller/CustomerTable/CustomerTable";
import Order from "../../pages/Controller/Order/Order";
import Barista from "../../pages/Controller/Member/Barista/Barista";
import Cashier from "../../pages/Controller/Member/Cashier/Cashier";
import Waiter from "../../pages/Controller/Member/Waiter/Waiter";

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
];

export { branchOwnerRoute };

import { nanoid } from "nanoid";

import AdminDashboard from "../../pages/AdminPage/Dashboard/AdminDashboard";
import Branch from "../../pages/Controller/Branch/Branch";
import Waiter from "../../pages/Controller/Member/Waiter/Waiter";
import Cashier from "../../pages/Controller/Member/Cashier/Cashier";
import Customer from "../../pages/Controller/Customer/Customer";
import Batch from "../../pages/Controller/Batch/Batch";
import BranchOwner from "../../pages/Controller/Member/BranchOwner/BranchOwner";
import Item from "../../pages/Controller/Item/Item";
import Book from "../../pages/Controller/Book/Book";
import CustomerTable from "../../pages/Controller/CustomerTable/CustomerTable";
import Cart from "../../pages/Cart/Cart";
import Setting from "../../pages/Controller/Setting/Setting";
import Barista from "../../pages/Controller/Member/Barista/Barista";

const adminRoutes = [
  {
    path: "dashboard",
    name: "Dashboard",
    id: nanoid(),
    component: AdminDashboard,
  },
  {
    path: "branch",
    name: "branch",
    id: nanoid(),
    component: Branch,
  },
  {
    path: "waiter",
    name: "waiter",
    id: nanoid(),
    component: Waiter,
  },
  {
    path: "cashier",
    name: "cashier",
    id: nanoid(),
    component: Cashier,
  },
  {
    path: "customer",
    name: "customer",
    id: nanoid(),
    component: Customer,
  },
  {
    path: "batch",
    name: "batch",
    id: nanoid(),
    component: Batch,
  },
  {
    path: "branch-owner",
    name: "branch-owner",
    id: nanoid(),
    component: BranchOwner,
  },
  {
    path: "barista",
    name: "barista",
    id: nanoid(),
    component: Barista,
  },
  {
    path: "item",
    name: "item",
    id: nanoid(),
    component: Item,
  },
  {
    path: "book",
    name: "book",
    id: nanoid(),
    component: Book,
  },
  {
    path: "customer-table",
    name: "customer-table",
    id: nanoid(),
    component: CustomerTable,
  },
  {
    path: "setting",
    name: "Setting",
    id: nanoid(),
    component: Setting,
  },
  {
    path: "cart",
    name: "Cart",
    id: nanoid(),
    component: Cart,
  },
];

export { adminRoutes };

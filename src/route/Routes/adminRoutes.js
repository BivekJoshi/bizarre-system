import { nanoid } from "nanoid";

import AdminDashboard from "../../pages/AdminPage/Dashboard/AdminDashboard";
import Branch from "../../pages/Controller/Branch/Branch";
import Waiter from "../../pages/Controller/Member/Waiter/Waiter";
import Cashier from "../../pages/Controller/Member/Cashier/Cashier";
import Customer from "../../pages/Controller/Customer/Customer";
import Batch from "../../pages/Controller/Batch/Batch";
import User from "../../pages/Controller/User/User";
import BranchOwner from "../../pages/Controller/Member/BranchOwner/BranchOwner";
import Item from "../../pages/Controller/Item/Item";
import Book from "../../pages/Controller/Book/Book";

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
    path: "user",
    name: "user",
    id: nanoid(),
    component: User,
  },
  {
    path: "branch-owner",
    name: "branch-owner",
    id: nanoid(),
    component: BranchOwner,
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
];

export { adminRoutes };

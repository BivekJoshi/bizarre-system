import { nanoid } from "nanoid";

import AdminDashboard from "../../pages/AdminPage/Dashboard/AdminDashboard";
import Order from "../../pages/Controller/Order/Order";
import Item from "../../pages/Controller/Item/Item";
import Cart from "../../pages/Cart/Cart";

const cashierRoute = [
  {
    path: "dashboard",
    name: "Dashboard",
    id: nanoid(),
    component: AdminDashboard,
  },
  {
    path: "item",
    name: "Item",
    id: nanoid(),
    component: Item,
  },
  {
    path: "order",
    name: "Order",
    id: nanoid(),
    component: Order,
  },
  {
    path: "cart",
    name: "Cart",
    id: nanoid(),
    component: Cart,
  },
];

export { cashierRoute };

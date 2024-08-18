import { nanoid } from "nanoid";

import AdminDashboard from "../../pages/AdminPage/Dashboard/AdminDashboard";
import ChangePassword from "../../pages/Controller/User/ChangePassword";
import Profile from "../../pages/Controller/User/Profile";

const waiterRoute = [
  {
    path: "change-password",
    name: "change-password",
    id: nanoid(),
    component: ChangePassword,
  },
  {
    path: "profile",
    name: "profile",
    id: nanoid(),
    component: Profile,
  },
  {
    path: "dashboard",
    name: "Dashboard",
    id: nanoid(),
    component: AdminDashboard,
  },
];

export { waiterRoute };

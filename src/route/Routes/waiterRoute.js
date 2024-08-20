import { nanoid } from "nanoid";

import AdminDashboard from "../../pages/AdminPage/Dashboard/AdminDashboard";

const waiterRoute = [
  {
    path: "dashboard",
    name: "Dashboard",
    id: nanoid(),
    component: AdminDashboard,
  },
];

export { waiterRoute };

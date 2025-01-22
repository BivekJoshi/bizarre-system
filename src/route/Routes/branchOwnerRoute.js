import { nanoid } from "nanoid";
import Loadable from "../../components/Loader/Loadable";
import { lazy } from "react";

const PromoCode = Loadable(
  lazy(() => import("../../pages/Controller/PromoCode/PromoCode"))
);

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

const OrderProcessTab = Loadable(
  lazy(() =>
    import("../../pages/Controller/Order/OrderProcess/OrderProcessTab")
  )
);
const ReportBatchOrder = Loadable(
  lazy(() =>
    import("../../pages/Controller/Report/ReportBatchOrder/ReportBatchOrder")
  )
);
const ReportItemSales = Loadable(
  lazy(() =>
    import("../../pages/Controller/Report/ReportSales/ReportItemSales")
  )
);
const BatchReportItemHistory = Loadable(
  lazy(() =>
    import(
      "../../pages/Controller/Report/ReportBatchOrder/BatchReportItemHistory"
    )
  )
);
const ReportProfitLoss = Loadable(
  lazy(() =>
    import("../../pages/Controller/Report/ReportProfitLoss/ReportProfitLoss")
  )
);
const Inventory = Loadable(
  lazy(() => import("../../pages/Controller/Inventory/Inventory"))
);
const Expense = Loadable(
  lazy(() => import("../../pages/Controller/Expense/Expense"))
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
    component: OrderProcessTab,
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

  {
    path: "batch-report",
    name: "batch-report",
    id: nanoid(),
    component: ReportBatchOrder,
  },
  {
    path: "batch-report/:id",
    name: "batch-report-details",
    id: nanoid(),
    component: BatchReportItemHistory,
  },
  {
    path: "sales-report",
    name: "sales-report",
    id: nanoid(),
    component: ReportItemSales,
  },
  {
    path: "profit/loss-report",
    name: "profit/loss-report",
    id: nanoid(),
    component: ReportProfitLoss,
  },
  {
    path: "inventory",
    name: "inventory",
    id: nanoid(),
    component: Inventory,
  },
  {
    path: "expense",
    name: "expense",
    id: nanoid(),
    component: Expense,
  },
];

export { branchOwnerRoute };

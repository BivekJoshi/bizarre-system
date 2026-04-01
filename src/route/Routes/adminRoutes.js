import { nanoid } from "nanoid";
import { lazy } from "react";
import Loadable from "../../components/Loader/Loadable";
import ExpenseRedirectProfitLoss from "../../pages/Controller/Expense/ExpenseRedirectProfitLoss";

const AdminDashboard = Loadable(
  lazy(() => import("../../pages/AdminPage/Dashboard/AdminDashboard"))
);

const Branch = Loadable(
  lazy(() => import("../../pages/Controller/Branch/Branch"))
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

const Batch = Loadable(
  lazy(() => import("../../pages/Controller/Batch/Batch"))
);

const BranchOwner = Loadable(
  lazy(() => import("../../pages/Controller/Member/BranchOwner/BranchOwner"))
);

const Item = Loadable(lazy(() => import("../../pages/Controller/Item/Item")));

const Book = Loadable(lazy(() => import("../../pages/Controller/Book/Book")));

const CustomerTable = Loadable(
  lazy(() => import("../../pages/Controller/CustomerTable/CustomerTable"))
);

const Cart = Loadable(lazy(() => import("../../pages/Cart/Cart")));

const Setting = Loadable(
  lazy(() => import("../../pages/Controller/Setting/Setting"))
);

const Barista = Loadable(
  lazy(() => import("../../pages/Controller/Member/Barista/Barista"))
);

const PromoCode = Loadable(
  lazy(() => import("../../pages/Controller/PromoCode/PromoCode"))
);

const RedeemCode = Loadable(
  lazy(() => import("../../pages/Controller/RedeemCode/RedeemCode"))
);

const ReportDashboard = Loadable(
  lazy(() =>
    import("../../pages/Controller/Report/ReportDashboard/ReportDashboard")
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
const ReportProfitLoss = Loadable(
  lazy(() =>
    import("../../pages/Controller/Report/ReportProfitLoss/ReportProfitLoss")
  )
);
const BatchReportItemHistory = Loadable(
  lazy(() =>
    import(
      "../../pages/Controller/Report/ReportBatchOrder/BatchReportItemHistory"
    )
  )
);
const Expense = Loadable(
  lazy(() => import("../../pages/Controller/Expense/Expense"))
);

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
    path: "promo-code",
    name: "Promo Code",
    id: nanoid(),
    component: PromoCode,
  },
  {
    path: "redeem-code",
    name: "Redeem Code",
    id: nanoid(),
    component: RedeemCode,
  },

  {
    path: "report-dashboard",
    name: "report-dashboard",
    id: nanoid(),
    component: ReportDashboard,
  },

  {
    path: "batch-report",
    name: "batch-report",
    id: nanoid(),
    component: ReportBatchOrder,
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
    path: "profit/loss-report/expense/:status/:year/:month",
    name: "profit/loss-report/expense/verified",
    id: nanoid(),
    component: ExpenseRedirectProfitLoss,
  },

  {
    path: "batch-report/:id",
    name: "batch-report-details",
    id: nanoid(),
    component: BatchReportItemHistory,
  },
];

export { adminRoutes };

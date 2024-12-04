import { nanoid } from "nanoid";
import CottageRoundedIcon from "@mui/icons-material/CottageRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import BatchPredictionRoundedIcon from "@mui/icons-material/BatchPredictionRounded";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";
import FaceRetouchingNaturalRoundedIcon from "@mui/icons-material/FaceRetouchingNaturalRounded";
import CopyrightRoundedIcon from "@mui/icons-material/CopyrightRounded";
import DynamicFeedRoundedIcon from "@mui/icons-material/DynamicFeedRounded";
import WcRoundedIcon from "@mui/icons-material/WcRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CoffeeMakerRoundedIcon from "@mui/icons-material/CoffeeMakerRounded";
import TableRowsIcon from "@mui/icons-material/TableRows";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import RedeemRoundedIcon from "@mui/icons-material/RedeemRounded";
import DnsIcon from '@mui/icons-material/Dns';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';

export const adminTab = [
  {
    id: nanoid(),
    label: "Dashboard",
    value: "dashboard",
    icon: <CottageRoundedIcon />,
  },
  {
    id: nanoid(),
    label: "Member",
    value: "branch-owner",
    icon: <SupervisedUserCircleRoundedIcon />,
    subTabs: [
      {
        id: nanoid(),
        label: "Branch Owner",
        value: "branch-owner",
        icon: <CopyrightRoundedIcon />,
      },
      {
        id: nanoid(),
        label: "Cashier",
        value: "cashier",
        icon: <CurrencyExchangeRoundedIcon />,
      },
      {
        id: nanoid(),
        label: "Barista",
        value: "barista",
        icon: <CoffeeMakerRoundedIcon />,
      },
      {
        id: nanoid(),
        label: "Waiter",
        value: "waiter",
        icon: <WcRoundedIcon />,
      },
    ],
  },
  {
    id: nanoid(),
    label: "Customer",
    value: "customer",
    icon: <FaceRetouchingNaturalRoundedIcon />,
  },

  // {
  //   id: nanoid(),
  //   label: "Batch",
  //   value: "batch",
  //   icon: <BatchPredictionRoundedIcon />,
  // },

  {
    id: nanoid(),
    label: "Item",
    value: "item",
    icon: <PostAddIcon />,
  },
  {
    id: nanoid(),
    label: "Book",
    value: "book",
    icon: <MenuBookRoundedIcon />,
  },
  {
    id: nanoid(),
    label: "Report",
    value: "batch-report",
    icon: <DnsIcon />,
    subTabs: [
      // {
      //   id: nanoid(),
      //   label: "Report Dashboard",
      //   value: "report-dashboard",
      //   icon: <AspectRatioIcon />,
      // },
      {
        id: nanoid(),
        label: "Batch Report",
        value: "batch-report",
        icon: <BatchPredictionIcon />,
      },
      {
        id: nanoid(),
        label: "Sales Report",
        value: "sales-report",
        icon: <ReceiptIcon />,
      },
    ],
  },
  {
    id: nanoid(),
    label: "Setting",
    value: "setting",
    icon: <SettingsRoundedIcon />,
    subTabs: [
      {
        id: nanoid(),
        label: "Setting",
        value: "setting",
        icon: <SettingsRoundedIcon />,
      },
      {
        id: nanoid(),
        label: "Branch",
        value: "branch",
        icon: <DynamicFeedRoundedIcon />,
      },
      {
        id: nanoid(),
        label: "Promo Code",
        value: "promo-code",
        icon: <QrCodeScannerIcon />,
      },
      {
        id: nanoid(),
        label: "Redeem Code",
        value: "redeem-code",
        icon: <RedeemRoundedIcon />,
      },
    ],
  },
];

export const branchOwnerTab = [
  {
    id: nanoid(),
    label: "Dashboard",
    value: "dashboard",
    icon: <CottageRoundedIcon />,
  },
  {
    id: nanoid(),
    label: "Customer Table",
    value: "customer-table",
    icon: <TableRowsIcon />,
  },
  {
    id: nanoid(),
    label: "Orders",
    value: "orders",
    icon: <FilterFramesIcon />,
  },
  {
    id: nanoid(),
    label: "Member",
    value: "cashier",
    icon: <SupervisedUserCircleRoundedIcon />,
    subTabs: [
      {
        id: nanoid(),
        label: "Cashier",
        value: "cashier",
        icon: <CurrencyExchangeRoundedIcon />,
      },
      {
        id: nanoid(),
        label: "Barista",
        value: "barista",
        icon: <CoffeeMakerRoundedIcon />,
      },
      {
        id: nanoid(),
        label: "Waiter",
        value: "waiter",
        icon: <WcRoundedIcon />,
      },
    ],
  },
  {
    id: nanoid(),
    label: "Customer",
    value: "customer",
    icon: <FaceRetouchingNaturalRoundedIcon />,
  },
  {
    id: nanoid(),
    label: "Report",
    value: "batch-report",
    icon: <DnsIcon />,
    subTabs: [
      // {
      //   id: nanoid(),
      //   label: "Report Dashboard",
      //   value: "report-dashboard",
      //   icon: <AspectRatioIcon />,
      // },
      {
        id: nanoid(),
        label: "Batch Report",
        value: "batch-report",
        icon: <BatchPredictionIcon />,
      },
      {
        id: nanoid(),
        label: "Sales Report",
        value: "sales-report",
        icon: <ReceiptIcon />,
      },
    ],
  },
];

export const cashierTab = [
  {
    id: nanoid(),
    label: "Dashboard",
    value: "dashboard",
    icon: <CottageRoundedIcon />,
  },
  {
    id: nanoid(),
    label: "Order",
    value: "orders",
    icon: <FilterFramesIcon />,
  },
  {
    id: nanoid(),
    label: "Customer Table",
    value: "customer-table",
    icon: <TableRowsIcon />,
  },
  {
    id: nanoid(),
    label: "Customer",
    value: "customer",
    icon: <FaceRetouchingNaturalRoundedIcon />,
  },
];

export const waiterTab = [
  {
    id: nanoid(),
    label: "Dashboard",
    value: "dashboard",
    icon: <CottageRoundedIcon />,
  },
  {
    id: nanoid(),
    label: "Order",
    value: "orders",
    icon: <FilterFramesIcon />,
  },
  {
    id: nanoid(),
    label: "Customer Table",
    value: "customer-table",
    icon: <TableRowsIcon />,
  },
  {
    id: nanoid(),
    label: "Chat",
    value: "chat",
    icon: <TableRowsIcon />,
  },
];

export const baristaTab = [
  {
    id: nanoid(),
    label: "Dashboard",
    value: "dashboard",
    icon: <CottageRoundedIcon />,
  },
  {
    id: nanoid(),
    label: "Orders",
    value: "orders",
    icon: <FilterFramesIcon />,
  },
];

export const supplierTab = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Customer", value: "customer" },
];

export const customerTab = [
  { label: "Dashboard", value: "dashboard" },
  // { label: "Customer", value: "customer" },
  { label: "Order", value: "order" },
  { label: "Item", value: "item" },
];

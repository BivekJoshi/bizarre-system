import { nanoid } from "nanoid";
import CottageRoundedIcon from "@mui/icons-material/CottageRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import BatchPredictionRoundedIcon from "@mui/icons-material/BatchPredictionRounded";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";
import FaceRetouchingNaturalRoundedIcon from "@mui/icons-material/FaceRetouchingNaturalRounded";
import CopyrightRoundedIcon from "@mui/icons-material/CopyrightRounded";
import DynamicFeedRoundedIcon from "@mui/icons-material/DynamicFeedRounded";
import WcRoundedIcon from "@mui/icons-material/WcRounded";

export const adminTab = [
  {
    id: nanoid(),
    label: "Dashboard",
    value: "dashboard",
    icon: <CottageRoundedIcon />,
  },
  {
    id: nanoid(),
    label: "Customer",
    value: "customer",
    icon: <FaceRetouchingNaturalRoundedIcon />,
  },
  {
    id: nanoid(),
    label: "Waiter",
    value: "waiter",
    icon: <WcRoundedIcon />,
  },
  {
    id: nanoid(),
    label: "Branch",
    value: "branch",
    icon: <DynamicFeedRoundedIcon />,
  },
  {
    id: nanoid(),
    label: "Cashier",
    value: "cashier",
    icon: <CurrencyExchangeRoundedIcon />,
  },
  {
    id: nanoid(),
    label: "Batch",
    value: "batch",
    icon: <BatchPredictionRoundedIcon />,
  },
  {
    id: nanoid(),
    label: "Branch Owner",
    value: "branch-owner",
    icon: <CopyrightRoundedIcon />,
  },
  {
    id: nanoid(),
    label: "Item",
    value: "item",
    icon: <SupervisedUserCircleRoundedIcon />,
  },
  {
    id: nanoid(),
    label: "Book",
    value: "book",
    icon: <SupervisedUserCircleRoundedIcon />,
  },
  {
    id: nanoid(),
    label: "Customer Table",
    value: "customer-table",
    icon: <SupervisedUserCircleRoundedIcon />,
  },
];

export const branchOwnerTab = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Customer", value: "customer" },
];

export const cashierTab = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Item", value: "item" },
  { label: "Order", value: "order" },
];

export const waiterTab = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Customer", value: "customer" },
];

export const baristaTab = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Customer", value: "customer" },
];

export const supplierTab = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Customer", value: "customer" },
];

export const customerTab = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Customer", value: "customer" },
];

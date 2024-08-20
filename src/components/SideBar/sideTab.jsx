import CottageRoundedIcon from "@mui/icons-material/CottageRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import BatchPredictionRoundedIcon from "@mui/icons-material/BatchPredictionRounded";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";
import FaceRetouchingNaturalRoundedIcon from "@mui/icons-material/FaceRetouchingNaturalRounded";
import CopyrightRoundedIcon from '@mui/icons-material/CopyrightRounded';
import DynamicFeedRoundedIcon from '@mui/icons-material/DynamicFeedRounded';
import WcRoundedIcon from '@mui/icons-material/WcRounded';

export const adminTab = [
  { label: "Dashboard", value: "dashboard", icon: <CottageRoundedIcon /> },
  {
    label: "Customer",
    value: "customer",
    icon: <FaceRetouchingNaturalRoundedIcon />,
  },
  { label: "Waiter", value: "waiter", icon: <WcRoundedIcon /> },
  { label: "Branch", value: "branch", icon: <DynamicFeedRoundedIcon /> },
  { label: "Cashier", value: "cashier", icon: <CurrencyExchangeRoundedIcon /> },
  { label: "Batch", value: "batch", icon: <BatchPredictionRoundedIcon /> },
  {
    label: "Branch Owner",
    value: "branch-owner",
    icon: <CopyrightRoundedIcon />,
  },
  { label: "User", value: "user", icon: <SupervisedUserCircleRoundedIcon /> },
  { label: "Item", value: "item", icon: <SupervisedUserCircleRoundedIcon /> },
  { label: "Book", value: "book", icon: <SupervisedUserCircleRoundedIcon /> },

];

export const branchOwnerTab = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Customer", value: "customer" },
];

export const cashierTab = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Customer", value: "customer" },
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

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import {
  adminTab,
  baristaTab,
  branchOwnerTab,
  cashierTab,
  customerTab,
  supplierTab,
  waiterTab,
} from "../SideBar/sideTab";
import { getUserType } from "../../utils/cookieHelper";

// Helper to flatten tabs for lookup and build parent map
const flattenTabs = (tabs) => {
  const map = {};
  const parentMap = {};
  tabs.forEach((tab) => {
    map[tab.value] = tab.label;
    if (tab.subTabs) {
      tab.subTabs.forEach((sub) => {
        map[sub.value] = sub.label;
        parentMap[sub.value] = tab.value;
      });
    }
  });
  return { map, parentMap };
};

const roleTabsMap = {
  ADMIN: adminTab,
  BRANCH_OWNER: branchOwnerTab,
  CASHIER: cashierTab,
  WAITER: waiterTab,
  BARISTA: baristaTab,
  SUPPLIER: supplierTab,
  CUSTOMER: customerTab,
};

const BreadCrumpCustom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUserType();
  const userTabs = roleTabsMap[user] || [];
  const { map: labelMap, parentMap } = flattenTabs(userTabs);

  // Remove leading slash, split, and filter empty
  const pathnames = location.pathname
    .replace(/^\//, "")
    .split("/")
    .filter(Boolean);

  // If using role-based root, remove the role segment
  const roleSegment = user ? user.toLowerCase() : "";
  let segments = pathnames;
  if (segments[0] === roleSegment) {
    segments = segments.slice(1);
  }

  // If the first segment is a subTab, prepend its parent main tab
  let fullSegments = [...segments];
  if (segments.length > 0 && parentMap[segments[0]]) {
    fullSegments = [parentMap[segments[0]], segments[0], ...segments.slice(1)];
  }

  // Home should always go to dashboard (first main tab)
  const dashboardValue = userTabs[0]?.value || "dashboard";
  const homeCrumb = {
    label: (
      <HomeRoundedIcon
        sx={{ verticalAlign: "middle", fontSize: 20, color: "#00c2cb" }}
      />
    ),
    to: `/${roleSegment}/${dashboardValue}`,
    isHome: true,
  };

  // Build breadcrumb items
  const crumbs = [
    homeCrumb,
    ...fullSegments.map((seg, idx) => {
      // For nested segments like 'profit/loss-report', join up to idx
      const to = `/${roleSegment}/${fullSegments.slice(0, idx + 1).join("/")}`;
      // Try to get label from labelMap, fallback to segment
      const label =
        labelMap[fullSegments.slice(0, idx + 1).join("/")] ||
        labelMap[seg] ||
        seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      return { label, to };
    }),
  ];

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{
        py: 0.5,
        px: 3,
        background: "rgba(6, 105, 111, 0.07)",
        borderRadius: 2,
        fontWeight: 500,
        fontSize: "1rem",
        color: "#00c2cb",
        boxShadow: "0 2px 8px 0 rgba(0,194,203,0.07)",
      }}
    >
      {crumbs.map((crumb, idx) =>
        idx < crumbs.length - 1 ? (
          <Link
            key={crumb.to}
            underline="hover"
            color={crumb.isHome ? "#00c2cb" : "inherit"}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
            onClick={() => navigate(crumb.to)}
          >
            <Typography
              key={crumb.to}
              color="#0097a7"
              sx={{
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              {crumb.label}
            </Typography>
          </Link>
        ) : (
          <Typography
            key={crumb.to}
            color="#0097a7"
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {crumb.label}
          </Typography>
        ),
      )}
    </Breadcrumbs>
  );
};

export default BreadCrumpCustom;

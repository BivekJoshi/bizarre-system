import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useTheme,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useLocation, useNavigate } from "react-router-dom";
import {
  adminTab,
  baristaTab,
  branchOwnerTab,
  cashierTab,
  customerTab,
  supplierTab,
  waiterTab,
} from "./sideTab";
import { getUserType } from "../../utils/cookieHelper";

const roleTabsMap = {
  ADMIN: adminTab,
  BRANCH_OWNER: branchOwnerTab,
  CASHIER: cashierTab,
  WAITER: waiterTab,
  BARISTA: baristaTab,
  SUPPLIER: supplierTab,
  CUSTOMER: customerTab,
};

// Pick the top entries to feature in the bottom bar. Tabs with subTabs are
// surfaced as a deep-link to the first subTab so a single tap navigates rather
// than dropping a menu in front of the user.
const getPrimaryTabs = (userTabs, max = 4) => {
  return userTabs.slice(0, max).map((t) => {
    if (t.subTabs?.length) {
      return {
        label: t.label,
        value: t.subTabs[0].value,
        icon: t.icon,
        rootMatch: t.value,
      };
    }
    return { label: t.label, value: t.value, icon: t.icon, rootMatch: t.value };
  });
};

const MobileBottomNav = ({ onMore }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const user = getUserType();
  const userTabs = roleTabsMap[user] || [];
  const primary = getPrimaryTabs(userTabs, 4);

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const roleSegment = user ? user.toLowerCase() : "";
  const segments =
    pathSegments[0] === roleSegment ? pathSegments.slice(1) : pathSegments;
  const rootSeg = segments[0] || "";

  const activeIdx = primary.findIndex(
    (t) => t.rootMatch === rootSeg || t.value === rootSeg,
  );

  const value = activeIdx === -1 ? "__more__" : activeIdx;

  return (
    <Paper
      elevation={0}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        borderRadius: 0,
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "none",
        borderTop: `1px solid ${isDark ? "#262626" : "#E7E5E4"}`,
        bgcolor: "background.default",
        pb: "env(safe-area-inset-bottom)",
      }}
    >
      <BottomNavigation
        value={value}
        showLabels
        sx={{
          height: 60,
          bgcolor: "transparent",
          "& .MuiBottomNavigationAction-root": {
            color: isDark ? "rgba(255,255,255,0.55)" : "#78716C",
            minWidth: 0,
            paddingTop: 1,
            "&.Mui-selected": { color: "#06c5c0" },
          },
          "& .MuiBottomNavigationAction-label": {
            fontSize: 10.5,
            fontWeight: 500,
            "&.Mui-selected": { fontSize: 10.5, fontWeight: 600 },
          },
          "& .MuiSvgIcon-root": { fontSize: 22 },
        }}
      >
        {primary.map((t, idx) => (
          <BottomNavigationAction
            key={t.value}
            value={idx}
            label={t.label}
            icon={t.icon}
            onClick={() => navigate(t.value)}
          />
        ))}
        <BottomNavigationAction
          value="__more__"
          label="More"
          icon={<MenuRoundedIcon />}
          onClick={() => onMore?.()}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default MobileBottomNav;

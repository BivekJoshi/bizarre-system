import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
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

const SideBar = ({ handleCloseDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const user = getUserType();
  const userTabs = roleTabsMap[user] || [];

  // Derive active tab/sub from URL so the highlight stays correct on refresh
  // and after navigating via breadcrumbs.
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const roleSegment = user ? user.toLowerCase() : "";
  const segments =
    pathSegments[0] === roleSegment ? pathSegments.slice(1) : pathSegments;
  const currentPath = segments.join("/") || "";
  const currentRoot = segments[0] || "";

  const matchedSubParent = userTabs.find((tab) =>
    tab.subTabs?.some(
      (s) => s.value === currentRoot || s.value === currentPath,
    ),
  );

  const [openSubTabs, setOpenSubTabs] = React.useState(
    matchedSubParent?.value || "",
  );

  React.useEffect(() => {
    if (matchedSubParent && openSubTabs !== matchedSubParent.value) {
      setOpenSubTabs(matchedSubParent.value);
    }
  }, [matchedSubParent?.value]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNavigate = (value) => {
    navigate(value);
    handleCloseDrawer?.();
  };

  const handleMainTabChange = (tab) => {
    if (tab.subTabs?.length) {
      setOpenSubTabs((prev) => (prev === tab.value ? "" : tab.value));
      return;
    }
    handleNavigate(tab.value);
  };

  const accent = "#06c5c0";

  const itemBase = {
    mx: 1,
    mb: 0.25,
    borderRadius: "8px",
    px: 1.25,
    py: 0.85,
    minHeight: 36,
    color: isDark ? "rgba(255,255,255,0.7)" : "#44403C",
    transition: "background-color .12s ease, color .12s ease",
    "& .MuiListItemIcon-root": {
      minWidth: 30,
      color: "inherit",
      "& svg": { fontSize: 18 },
    },
    "&:hover": {
      backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
      color: isDark ? "#fff" : "#1C1917",
    },
    "&.Mui-selected": {
      backgroundColor: isDark
        ? "rgba(6,197,192,0.14)"
        : "rgba(6,197,192,0.10)",
      color: accent,
      "& .MuiListItemIcon-root": { color: accent },
      "& .MuiTypography-root": { color: accent, fontWeight: 600 },
      "&:hover": {
        backgroundColor: isDark
          ? "rgba(6,197,192,0.20)"
          : "rgba(6,197,192,0.16)",
      },
    },
  };

  const subItemBase = {
    ...itemBase,
    ml: 3,
    mr: 1,
    py: 0.6,
    minHeight: 32,
    "& .MuiListItemIcon-root svg": { fontSize: 8 },
    "& .MuiTypography-root": { fontSize: 12.5 },
  };

  return (
    <Box sx={{ width: "100%", py: 1 }}>
      <Typography
        variant="overline"
        sx={{
          px: 2.25,
          mb: 0.5,
          display: "block",
          color: isDark ? "rgba(255,255,255,0.4)" : "#A8A29E",
        }}
      >
        Menu
      </Typography>
      <List disablePadding>
        {userTabs.map((tab) => {
          const hasSubTabs = tab.subTabs?.length > 0;
          const isExpanded = openSubTabs === tab.value;
          const isMainSelected =
            !hasSubTabs &&
            (currentPath === tab.value || currentRoot === tab.value);

          return (
            <React.Fragment key={tab.value}>
              <ListItemButton
                selected={isMainSelected}
                onClick={() => handleMainTabChange(tab)}
                sx={itemBase}
              >
                {tab.icon && <ListItemIcon>{tab.icon}</ListItemIcon>}
                <ListItemText
                  primary={tab.label}
                  primaryTypographyProps={{
                    fontSize: "13px",
                    fontWeight: isMainSelected ? 600 : 500,
                  }}
                />
                {hasSubTabs &&
                  (isExpanded ? (
                    <ExpandLessIcon sx={{ fontSize: 18, opacity: 0.6 }} />
                  ) : (
                    <ExpandMoreIcon sx={{ fontSize: 18, opacity: 0.6 }} />
                  ))}
              </ListItemButton>

              {hasSubTabs && (
                <Collapse in={isExpanded} timeout={180} unmountOnExit>
                  <Box
                    sx={{
                      position: "relative",
                      ml: 2.75,
                      pl: 1,
                      borderLeft: `1px solid ${
                        isDark ? "rgba(255,255,255,0.08)" : "#E7E5E4"
                      }`,
                      my: 0.25,
                    }}
                  >
                    <List component="div" disablePadding>
                      {tab.subTabs.map((sub) => {
                        const isSubSelected =
                          currentPath === sub.value ||
                          currentRoot === sub.value;
                        return (
                          <ListItemButton
                            key={sub.value}
                            selected={isSubSelected}
                            onClick={() => handleNavigate(sub.value)}
                            sx={subItemBase}
                          >
                            <ListItemIcon>
                              <FiberManualRecordIcon />
                            </ListItemIcon>
                            <ListItemText primary={sub.label} />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Box>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default SideBar;

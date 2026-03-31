import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  alpha,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useNavigate } from "react-router-dom";
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

const SideBar = ({ handleCloseDrawer }) => {
  const navigate = useNavigate();
  const user = getUserType();

  const [mainTab, setMainTab] = React.useState("dashboard");
  const [subTab, setSubTab] = React.useState("");
  const [openSubTabs, setOpenSubTabs] = React.useState("");

  const roleTabsMap = {
    ADMIN: adminTab,
    BRANCH_OWNER: branchOwnerTab,
    CASHIER: cashierTab,
    WAITER: waiterTab,
    BARISTA: baristaTab,
    SUPPLIER: supplierTab,
    CUSTOMER: customerTab,
  };

  const userTabs = roleTabsMap[user] || [];

  const handleMainTabChange = (newValue) => {
    setMainTab(newValue);
    setSubTab("");
    setOpenSubTabs((prev) => (prev === newValue ? "" : newValue));
    navigate(newValue);
    window.scrollTo(0, 0);
  };

  const handleSubTabChange = (newValue) => {
    setSubTab(newValue);
    navigate(newValue);
    window.scrollTo(0, 0);
    handleCloseDrawer();
  };

  const itemStyle = {
    mx: 1.2,
    mb: 0.8,
    borderRadius: "10px",
    transition: "all 0.2s ease-in-out",
    color: "rgba(255, 255, 255, 0.65)", // Muted text for inactive
    "& .MuiListItemIcon-root": {
      minWidth: "38px",
      color: "inherit",
      fontSize: "20px",
    },
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      color: "#fff",
    },
    "&.Mui-selected": {
      backgroundColor: "rgba(0, 194, 203, 0.12)", // Subdued teal tint
      color: "#4fd1d9", // Softer teal for the text
      "& .MuiTypography-root": {
        fontWeight: 600,
        color: "#4fd1d9",
      },
      "& .MuiListItemIcon-root": {
        color: "#4fd1d9",
      },
      "&:hover": {
        backgroundColor: "rgba(0, 194, 203, 0.18)",
      },
      // Subtle vertical indicator
      "&::before": {
        content: '""',
        position: "absolute",
        left: -6,
        height: "20px",
        width: "3px",
        borderRadius: "0 4px 4px 0",
        backgroundColor: "#00c2cb",
        boxShadow: "0 0 10px rgba(0, 194, 203, 0.5)", // Soft glow
      },
    },
  };

  const subItemStyle = {
    ...itemStyle,
    ml: 4.5,
    mr: 1.2,
    py: 0.5,
    "& .MuiTypography-root": { fontSize: "0.85rem" },
    "&.Mui-selected::before": { left: -36 },
  };

  return (
    <Box sx={{ width: "100%", pt: 1 }}>
      <List disablePadding>
        {userTabs?.map((tab) => {
          const isMainSelected = mainTab === tab.value;
          const hasSubTabs = tab?.subTabs?.length > 0;
          const isExpanded = openSubTabs === tab.value;

          return (
            <React.Fragment key={tab.value}>
              <ListItemButton
                selected={isMainSelected}
                onClick={() => handleMainTabChange(tab.value)}
                sx={itemStyle}
              >
                {tab.icon && <ListItemIcon>{tab.icon}</ListItemIcon>}
                <ListItemText
                  primary={tab.label}
                  primaryTypographyProps={{
                    fontSize: "0.9rem",
                    fontWeight: isMainSelected ? 600 : 400,
                  }}
                />
                {hasSubTabs &&
                  (isExpanded ? (
                    <ExpandLessIcon sx={{ fontSize: "1.1rem", opacity: 0.7 }} />
                  ) : (
                    <ExpandMoreIcon sx={{ fontSize: "1.1rem", opacity: 0.7 }} />
                  ))}
              </ListItemButton>

              {hasSubTabs && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {tab.subTabs.map((sub) => (
                      <ListItemButton
                        key={sub.value}
                        selected={subTab === sub.value}
                        onClick={() => handleSubTabChange(sub.value)}
                        sx={subItemStyle}
                      >
                        {sub.icon && (
                          <ListItemIcon sx={{ minWidth: "28px !important" }}>
                            {sub.icon}
                          </ListItemIcon>
                        )}
                        <ListItemText primary={sub.label} />
                      </ListItemButton>
                    ))}
                  </List>
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

import React from "react";
import { Box, Tab, useTheme } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CottageRoundedIcon from "@mui/icons-material/CottageRounded";
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
  const theme = useTheme();
  const [values, setValues] = React.useState("dashboard");
  const navigate = useNavigate();
  const user = getUserType();

  const handleChanges = (event, newValue) => {
    setValues(newValue);
    navigate(newValue);
    window.scrollTo(0, 0);
    handleCloseDrawer();
  };

  const labelStyle = {
    textTransform: "none",
    justifyContent: "flex-start",
    minHeight: "50px",
    fontSize: "15px",
    fontWeight: 700,
    "&:hover": {
      color: theme.palette.primary.main,
      borderLeft: `6px solid ${theme.palette.primary.main}`,
    },
  };

  const activeLabelStyle = {
    ...labelStyle,
    backgroundColor: theme.palette.background.light,
    color: theme.palette.primary.main,
    borderLeft: `6px solid ${theme.palette.primary.main}`,
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

  const userTabs = roleTabsMap[user] || [];

  return (
    <Box>
      <TabContext value={values}>
        <TabPanel value={values} sx={{ padding: "0" }}>
          <TabList
            onChange={handleChanges}
            orientation="vertical"
            indicatorColor="none"
          >
            {userTabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                icon={<CottageRoundedIcon />}
                value={tab.value}
                sx={values === tab.value ? activeLabelStyle : labelStyle}
                iconPosition="start"
              />
            ))}
          </TabList>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default SideBar;

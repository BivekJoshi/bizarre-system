import React from "react";
import { Box, Tab, useTheme, Collapse } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
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
  const theme = useTheme();
  const [mainTab, setMainTab] = React.useState("dashboard");
  const [subTab, setSubTab] = React.useState("");
  const [openSubTabs, setOpenSubTabs] = React.useState("");
  const navigate = useNavigate();
  const user = getUserType();

  const handleMainTabChange = (event, newValue) => {
    setMainTab(newValue);
    setSubTab("");
    setOpenSubTabs((prev) => (prev === newValue ? "" : newValue));
    navigate(newValue);
    window.scrollTo(0, 0);
    handleCloseDrawer();
  };

  const handleSubTabChange = (event, newValue) => {
    setSubTab(newValue);
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
    display: "flex",
    alignItems: "center",
    width: "100%",
    "&:hover": {
      color: theme.palette.primary.main,
      borderLeft: `6px solid ${theme.palette.primary.main}`,
    },
  };

  const activeLabelStyle = {
    ...labelStyle,
    backgroundColor: theme.palette.background.alt,
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

  const selectedTab = userTabs.find((tab) => tab.value === mainTab);
  const subTabs = selectedTab?.subTabs || [];

  return (
    <Box>
      <TabContext value={mainTab}>
        <TabPanel value={mainTab} sx={{ padding: "0" }}>
          <TabList
            onChange={handleMainTabChange}
            orientation="vertical"
            indicatorColor="none"
          >
            {userTabs?.map((tab) => (
              <React.Fragment key={tab?.value}>
                <Tab
                  label={
                    <Box display="flex" alignItems="center" width="100%">
                      {tab?.label}
                      {tab?.subTabs?.length > 0 && (
                        <Box ml="auto">
                          {openSubTabs === tab.value ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </Box>
                      )}
                    </Box>
                  }
                  icon={tab?.icon}
                  value={tab?.value}
                  sx={mainTab === tab.value ? activeLabelStyle : labelStyle}
                  iconPosition="start"
                  onClick={() => handleMainTabChange(null, tab.value)}
                />
                {tab?.subTabs?.length > 0 && (
                  <Collapse in={openSubTabs === tab.value}>
                    <TabContext value={subTab}>
                      <TabPanel value={subTab} sx={{ padding: "0" }}>
                        <TabList
                          onChange={handleSubTabChange}
                          orientation="vertical"
                          indicatorColor="none"
                        >
                          {tab?.subTabs?.map((subTab) => (
                            <Tab
                              key={subTab?.value}
                              label={subTab?.label}
                              icon={subTab?.icon}
                              value={subTab?.value}
                              sx={
                                subTab === subTab?.value
                                  ? activeLabelStyle
                                  : { ...labelStyle, ml: 2, fontSize: "14px" }
                              }
                              iconPosition="start"
                            />
                          ))}
                        </TabList>
                      </TabPanel>
                    </TabContext>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </TabList>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default SideBar;

import React from "react";
import { Box, Tab, useTheme } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CottageRoundedIcon from "@mui/icons-material/CottageRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import { useNavigate } from "react-router-dom";

const SideBar = ({ handleCloseDrawer }) => {
  const theme = useTheme();
  const [values, setValues] = React.useState("dashboard");
  const navigate = useNavigate();

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

  return (
    <Box>
      <TabContext value={values}>
        <TabPanel value={values} sx={{ padding: "0" }}>
          <TabList
            onChange={handleChanges}
            orientation="vertical"
            indicatorColor="none"
          >
            <Tab
              label="Dashboard"
              icon={<CottageRoundedIcon />}
              value="dashboard"
              sx={values === "dashboard" ? activeLabelStyle : labelStyle}
              iconPosition="start"
            />
            <Tab
              label="Customer"
              icon={<CottageRoundedIcon />}
              value="customer"
              sx={values === "customer" ? activeLabelStyle : labelStyle}
              iconPosition="start"
            />
            <Tab
              label="Waiter"
              icon={<CottageRoundedIcon />}
              value="waiter"
              sx={values === "waiter" ? activeLabelStyle : labelStyle}
              iconPosition="start"
            />
            <Tab
              label="Branch"
              icon={<CottageRoundedIcon />}
              value="branch"
              sx={values === "branch" ? activeLabelStyle : labelStyle}
              iconPosition="start"
            />
            <Tab
              label="Cashier"
              icon={<CottageRoundedIcon />}
              value="cashier"
              sx={values === "cashier" ? activeLabelStyle : labelStyle}
              iconPosition="start"
            />
            <Tab
              label="Batch"
              icon={<CottageRoundedIcon />}
              value="batch"
              sx={values === "batch" ? activeLabelStyle : labelStyle}
              iconPosition="start"
            />
            <Tab
              label="user"
              icon={<CottageRoundedIcon />}
              value="user"
              sx={values === "user" ? activeLabelStyle : labelStyle}
              iconPosition="start"
            />
          </TabList>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default SideBar;

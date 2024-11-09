import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import Normalpay from "./Normalpay";
import SplitPay from "./SplitPay";
import BypassPayment from "./BypassPayment";

const PaymentModal = ({ batchStatus, batchId, onClose }) => {
  const [value, setValue] = React.useState("NORMAL");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Make Payment" value="NORMAL" />
            {/* <Tab label="Split Pay" value="SPLIT" /> */}
            <Tab label="Bypass Payment" value="BYPASS" />
          </TabList>
        </Box>
        <TabPanel value="NORMAL">
          <Normalpay
            batchStatus={batchStatus}
            batchId={batchId}
            onClose={onClose}
          />
        </TabPanel>
        <TabPanel value="SPLIT">
          <SplitPay batchId={batchId} onClose={onClose} />
        </TabPanel>
        <TabPanel value="BYPASS">
          <BypassPayment batchId={batchId} onClose={onClose} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default PaymentModal;

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import GenerateNormalBill from "./GenerateNormalBill";
import GenerateSplitBill from "./GenerateSplitBill";
import GenerateRouletteBill from "./GenerateRouletteBill";

const GenerateBillModal = ({ batchId, onClose }) => {
  const [value, setValue] = React.useState("NORMAL");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Normal Bill" value="NORMAL" />
            <Tab label="Split Bill" value="SPLIT" />
            <Tab label="Roulette Bill" value="ROULETTE" />
          </TabList>
        </Box>
        <TabPanel value="NORMAL">
          <GenerateNormalBill batchId={batchId} onClose={onClose} />
        </TabPanel>
        <TabPanel value="SPLIT">
          <GenerateSplitBill batchId={batchId} onClose={onClose} />
        </TabPanel>
        <TabPanel value="ROULETTE">
          <GenerateRouletteBill batchId={batchId} onClose={onClose} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default GenerateBillModal;

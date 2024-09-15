import {
  Box,
  TextField,
  Typography,
  useTheme,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";

const Filter = () => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState("");
  console.log("🚀 ~ Filter ~ selectedOption:", selectedOption);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="center"
      mt={3}
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: "1rem",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: theme.palette.text.default,
          fontWeight: 700,
        }}
      >
        Filter
      </Typography>

      <FormControl sx={{ width: "300px" }} size="small">
        <InputLabel>Search Table</InputLabel>
        <Select
          value={selectedOption}
          onChange={handleSelectChange}
          label="Options"
        >
          <MenuItem value={"RESERVED"}>Reserved</MenuItem>
          <MenuItem value={"AVAILABLE"}>Available</MenuItem>
          <MenuItem value={"OCCUPIED"}>Occupied</MenuItem>
          <MenuItem value={"OUT_OF_ORDER"}>Out of Order</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filter;

import { Box, Button, Typography, useTheme, IconButton } from "@mui/material";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import SearchIcon from "@mui/icons-material/Search";
import RenderInput from "../../../components/RenderInput/RenderInput";

const FilterBranchForm = ({ filterFormik }) => {
  const theme = useTheme();
  const [showFields, setShowFields] = useState(false);

  const inputField = [
    {
      id: nanoid(),
      name: "value",
      label: "Address",
      placeholder: "Search by address",
      type: "textfilterField",
      extraField: "address",
      required: true,
      xs: 12,
      md: 3,
      lg: 3,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "value",
      label: "Phone Number",
      placeholder: "Search by phone number",
      type: "numberfilterField",
      extraField: "phoneNumber",
      required: true,
      xs: 12,
      md: 3,
      lg: 3,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "value",
      label: "Housing Capacity",
      placeholder: "Search by housing capacity",
      type: "numberfilterField",
      extraField: "housingCapacity",
      required: true,
      xs: 12,
      md: 3,
      lg: 3,
      sm: 12,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.default,
        padding: "1rem",
      }}
    >
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
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
        <IconButton onClick={() => setShowFields((prev) => !prev)}>
          {showFields ? <FilterListOffIcon /> : <FilterListIcon />}
        </IconButton>
      </Box>
      <br />
      {showFields && (
        <>
          <RenderInput inputField={inputField} formik={filterFormik} />
          {/* <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              onClick={() => filterFormik.handleSubmit()}
              variant="outlined"
              sx={{ marginTop: "1rem" }}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </div> */}
        </>
      )}
    </div>
  );
};

export default FilterBranchForm;

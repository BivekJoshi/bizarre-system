import { Box, Button, Typography, useTheme, IconButton } from "@mui/material";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import SearchIcon from "@mui/icons-material/Search";
import RenderInput from "../../../components/RenderInput/RenderInput";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";

const FilterCustomerTableForm = ({ filterFormik, setIsAddModalOpen }) => {
  const theme = useTheme();
  const [showFields, setShowFields] = useState(false);

  const inputField = [
    {
      id: nanoid(),
      name: "value",
      label: "Table Number",
      placeholder: "Search by table number",
      type: "textfilterField",
      extraField: "tableNumber",
      required: true,
      xs: 12,
      md: 3,
      lg: 3,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "value",
      label: "Status",
      placeholder: "Filter by status",
      type: "dropDownfilterField",
      extraField: "status",
      options: [
        { value: "RESERVED", label: "Reserved", id: nanoid() },
        { value: "AVAILABLE", label: "Available", id: nanoid() },
        { value: "OCCUPIED", label: "Occupied", id: nanoid() },
        { value: "OUT_OF_ORDER", label: "Out of Order", id: nanoid() },
      ],
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
        padding: "9px",
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
        <Box sx={{ display: "flex" }} gap={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => setIsAddModalOpen(true)}
              startIcon={<ControlPointRoundedIcon />}
            >
              Add Customer Table
            </Button>
            <IconButton onClick={() => setShowFields((prev) => !prev)}>
              {showFields ? <FilterListOffIcon /> : <FilterListIcon />}
            </IconButton>
          </Box>
        </Box>
      </Box>
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

export default FilterCustomerTableForm;

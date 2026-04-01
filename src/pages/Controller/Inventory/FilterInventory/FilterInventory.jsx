import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";

const FilterInventory = ({ filterFormik, setIsAddModal }) => {
  const theme = useTheme();
  const [showFields, setShowFields] = useState(false);
  const inputField = [
    {
      id: nanoid(),
      name: "value",
      label: "Item Name",
      placeholder: "Search by item name",
      type: "textfilterField",
      extraField: "name",
      isObject: true,
      objectValue: "item",
      defalutValue: "",
      xs: 12,
      md: 3,
      lg: 3,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "value",
      label: "Type",
      placeholder: "Filter by item type",
      type: "dropDownfilterField",
      extraField: "type",
      options: [
        { value: "", label: "None", id: nanoid() },
        { value: "BEVERAGE", label: "Beverage", id: nanoid() },
        { value: "FOOD", label: "Food", id: nanoid() },
        { value: "CLOTHING", label: "Clothing", id: nanoid() },
      ],
      isObject: true,
      objectValue: "item",
      defalutValue: "",
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
              onClick={() => setIsAddModal(true)}
              startIcon={<ControlPointRoundedIcon />}
            >
              Add Inventory
            </Button>
          </Box>
          <IconButton onClick={() => setShowFields((prev) => !prev)}>
            {showFields ? <FilterListOffIcon /> : <FilterListIcon />}
          </IconButton>
        </Box>
      </Box>
      {showFields && (
        <>
          <RenderInput inputField={inputField} formik={filterFormik} />
        </>
      )}
    </div>
  );
};

export default FilterInventory;

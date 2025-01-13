import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import RenderInput from "../../../../components/RenderInput/RenderInput";

const FilterInventory = ({ filterFormik }) => {
  const theme = useTheme();
  const [showFields, setShowFields] = useState(false);
  const inputField = [
    {
      id: nanoid(),
      name: "value",
      label: "Expense Type",
      placeholder: "Filter by expense type",
      type: "dropDownfilterField",
      extraField: "expenseType",
      options: [
        { value: "DIRECT_OPERATING", label: "Direct Operating", id: nanoid() },
        {
          value: "INDIRECT_OPERATING",
          label: "Indirect Operating",
          id: nanoid(),
        },
        { value: "ADMINISTRATIVE", label: "Administrative", id: nanoid() },
        {
          value: "SELLING_DISTRIBUTION",
          label: "Selling Distribution",
          id: nanoid(),
        },
        { value: "FINANCIAL", label: "Financial", id: nanoid() },
        {
          value: "DEPRECIATION_AMORTIZATION",
          label: "Depreciation Amortization",
          id: nanoid(),
        },
        { value: "MISCELLANEOUS", label: "Miscellaneous", id: nanoid() },
      ],
      xs: 12,
      md: 3,
      lg: 3,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "value",
      label: "Payment Type",
      placeholder: "Filter by payment type",
      type: "dropDownfilterField",
      extraField: "paymentType",
      options: [
        { value: "CASH", label: "Cash", id: nanoid() },
        { value: "BANK", label: "Bank", id: nanoid() },
        { value: "LOSS", label: "Loss", id: nanoid() },
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
        </>
      )}
    </div>
  );
};

export default FilterInventory;

import { Box, Button, Typography, useTheme, IconButton } from "@mui/material";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import SearchIcon from "@mui/icons-material/Search";
import RenderInput from "../../../../../components/RenderInput/RenderInput";

const FilterExpenseForm = ({ filterFormik }) => {
  const theme = useTheme();
  const [showFields, setShowFields] = useState(false);

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 2020 + 1 },
    (_, index) => ({
      value: (2020 + index).toString(),
      label: (2020 + index).toString(),
      id: nanoid(),
    })
  );

  const inputField = [
    {
      id: nanoid(),
      name: "year",
      label: "Year",
      type: "dropDown",
      required: true,
      options: yearOptions,
      xs: 12,
      md: 3,
      lg: 3,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "month",
      label: "Month",
      type: "dropDown",
      required: "true",
      options: [
        { value: "1", label: "January", id: nanoid() },
        { value: "2", label: "February", id: nanoid() },
        { value: "3", label: "March", id: nanoid() },
        { value: "4", label: "April", id: nanoid() },
        { value: "5", label: "May", id: nanoid() },
        { value: "6", label: "June", id: nanoid() },
        { value: "7", label: "July", id: nanoid() },
        { value: "8", label: "August", id: nanoid() },
        { value: "9", label: "September", id: nanoid() },
        { value: "10", label: "October", id: nanoid() },
        { value: "11", label: "November", id: nanoid() },
        { value: "12", label: "December", id: nanoid() },
      ],
      xs: 12,
      md: 3,
      lg: 3,
      sm: 12,
    },
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

export default FilterExpenseForm;

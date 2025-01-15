// import React from 'react'

// const ReportProfitLossForm = () => {
//   return (
//     <div>ReportProfitLossForm</div>
//   )
// }

// export default ReportProfitLossForm

import { Box, Button, Typography, useTheme, IconButton } from "@mui/material";
import React, { useState } from "react";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import { nanoid } from "nanoid";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import SearchIcon from "@mui/icons-material/Search";

const ReportProfitLossForm = ({ formik }) => {
  const theme = useTheme();
  const [showFields, setShowFields] = useState(true);

  const inputField = [
    {
      id: nanoid(),
      responseId: "id",
      name: "branchId",
      label: "Branch",
      path: "/branch/find?pageNumber=1&pageSize=100",
      type: "asyncDropDown",
      required: true,
      responseLabel: "address",
      xs: 12,
      md: 3,
      lg: 3,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "year",
      label: "Year",
      type: "number",
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
  ];

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.default,
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: theme.shadows[2],
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
          <RenderInput inputField={inputField} formik={formik} />
          <div style={{ display: "flex", justifyContent: "end", gap: "1rem" }}>
            <Button
              onClick={() => formik.handleSubmit()}
              variant="outlined"
              sx={{ marginTop: "1rem" }}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
            {/* <Button
              onClick={() => downloadFormik.handleSubmit()}
              variant="contained"
              sx={{ marginTop: "1rem" }}
              startIcon={<SearchIcon />}
            >
              Download Report
            </Button> */}
          </div>
        </>
      )}
    </div>
  );
};

export default ReportProfitLossForm;

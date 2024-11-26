import { Box, Button, Typography, useTheme, IconButton } from "@mui/material";
import React, { useState } from "react";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import { nanoid } from "nanoid";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import SearchIcon from "@mui/icons-material/Search";

const ReportItemSalesForm = ({ formik, downloadFormik }) => {
  const theme = useTheme();
  const [showFields, setShowFields] = useState(true);

  const inputField = [
    {
      id: nanoid(),
      name: "from",
      label: "From",
      placeholder: "Enter start date",
      type: "date",
      required: true,
      xs: 12,
      md: 3,
      lg: 3,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "to",
      label: "To",
      placeholder: "Enter end date",
      required: true,
      type: "date",
      xs: 12,
      md: 3,
      lg: 3,
      sm: 12,
    },
    // {
    //   id: nanoid(),
    //   responseId: "id",
    //   name: "itemId",
    //   label: "Item",
    //   path: "/item/find",
    //   type: "asyncDropDown",
    //   required: true,
    //   responseLabel: "address",
    //   xs: 12,
    //   md: 3,
    //   lg: 3,
    //   sm: 12,
    // },
    {
      id: nanoid(),
      name: "itemType",
      label: "Item Type",
      type: "dropDown",
      required: true,
      options: [
        { value: "BEVERAGE", label: "Beverage", id: nanoid() },
        { value: "FOOD", label: "Food", id: nanoid() },
        { value: "CLOTHING", label: "Clothing", id: nanoid() },
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
          <RenderInput
            inputField={inputField}
            formik={formik || downloadFormik}
          />
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

export default ReportItemSalesForm;

import { Box, Button, Typography, useTheme, IconButton } from "@mui/material";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import SearchIcon from "@mui/icons-material/Search";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import PermissionButton from "../../../../components/Button/PermissionButton";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";

const FilterCashierForm = ({ filterFormik, setIsAddModal }) => {
  const theme = useTheme();
  const [showFields, setShowFields] = useState(false);

  const inputField = [
    {
      id: nanoid(),
      name: "value",
      label: "Cashier Name",
      placeholder: "Filter by full name",
      type: "textfilterField",
      extraField: "fullName",
      isObject: true,
      objectValue: "user",
      defalutValue: "",
      xs: 12,
      md: 3,
      lg: 3,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "value",
      label: "Mobile Number",
      placeholder: "Filter by mobile number",
      type: "numberfilterField",
      extraField: "mobileNumber",
      isObject: true,
      objectValue: "user",
      defalutValue: "",
      xs: 12,
      md: 3,
      lg: 3,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "value",
      label: "Email",
      placeholder: "Filter by email",
      type: "textfilterField",
      extraField: "email",
      isObject: true,
      objectValue: "user",
      defalutValue: "",
      xs: 12,
      md: 3,
      lg: 3,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "value",
      label: "Gender",
      placeholder: "Filter by gender",
      type: "dropDownfilterField",
      extraField: "gender",
      isObject: true,
      objectValue: "user",
      defalutValue: "",
      options: [
        { value: "FEMALE", label: "Female", id: nanoid() },
        { value: "MALE", label: "Male", id: nanoid() },
        { value: "OTHERS", label: "Others", id: nanoid() },
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
            <PermissionButton
              label="Add Cashier"
              variant="outlined"
              onClick={() => setIsAddModal(true)}
              startIcon={<ControlPointRoundedIcon />}
              allowedUserTypes={["BRANCH_OWNER"]}
              disabledUserTypes={["ADMIN"]}
            />
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

export default FilterCashierForm;

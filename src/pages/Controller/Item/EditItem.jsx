import React, { useState } from "react";
import { nanoid } from "nanoid";
import RenderInput from "../../../components/RenderInput/RenderInput";
import DropZoneUploadFile from "../../../components/DropZoneUploadFIle/DropZoneUploadFile";
import { DOC_URL } from "../../../api/axiosInterceptor";
import { Button } from "@mui/material";

const EditItem = ({ formik, rowData }) => {
  // State to toggle between image display and dropzone
  const [showDropzone, setShowDropzone] = useState(false);

  // Toggle the dropzone on button click
  const handleReuploadClick = () => {
    setShowDropzone(true);
  };

  const inputField = [
    {
      id: nanoid(),
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "costPrice",
      label: "Cost Price",
      type: "number",
      required: true,
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "markedPrice",
      label: "Marked Price",
      type: "number",
      required: true,
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "sellingPrice",
      label: "Selling Price",
      type: "text",
      required: true,
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "description",
      label: "Description",
      type: "text",
      required: true,
      multiline: true,
      rows: 3,
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "type",
      label: "Type",
      type: "dropDown",
      required: true,
      options: [
        { value: "BEVERAGE", label: "Beverage", id: nanoid() },
        { value: "FOOD", label: "Food", id: nanoid() },
        { value: "CLOTHING", label: "Clothing", id: nanoid() },
      ],
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "tags",
      label: "Tags",
      type: "text",
      required: true,
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "color",
      label: "Color",
      type: "text",
      required: true,
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
  ];

  return (
    <>
      {rowData?.itemImageUrl && !showDropzone ? (
        <>
          <div style={{ width: "100%", height: "200px" }}>
            <img
              src={DOC_URL + rowData?.itemImageUrl}
              alt="Uploaded Item"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <Button
            variant="contained"
            fullWidth
            onClick={handleReuploadClick}
            sx={{ margin: "1rem 0" }}
          >
            Re-upload Image
          </Button>
        </>
      ) : (
        <DropZoneUploadFile rowData={rowData} />
      )}

      <br />
      <RenderInput inputField={inputField} formik={formik} />
    </>
  );
};

export default EditItem;

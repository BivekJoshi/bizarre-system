import React from "react";
import { nanoid } from "nanoid";
import RenderInput from "../../../components/RenderInput/RenderInput";
import DropZoneUploadFile from "../../../components/DropZoneUploadFIle/DropZoneUploadFile";

const EditItem = ({ formik, rowData }) => {
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
      name: "stockCount",
      label: "Stock Count",
      type: "text",
      required: true,
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
      <DropZoneUploadFile rowData={rowData}/>
      <br />
      <RenderInput inputField={inputField} formik={formik} />
    </>
  );
};

export default EditItem;

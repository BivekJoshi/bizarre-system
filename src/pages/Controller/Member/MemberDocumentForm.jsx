import React from "react";
import { nanoid } from "nanoid";
import { Button, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import useMemberDocumentForm from "../../../hooks/member/Member/MemberDocument/useMemberDocumentForm";
import RenderInput from "../../../components/RenderInput/RenderInput";

const MemberDocumentForm = ({ onClose, rowData,filterFormik }) => {
  const { formik, loading } = useMemberDocumentForm({ onClose, rowData,filterFormik });

  const inputField = [
    {
      id: nanoid(),
      type: "file",
      name: "idFrontImage",
      label: "Id Front Image",
      acceptedFileTypes: "image/*,application/pdf",
      maxFiles: 5,
      maxSize: 10000000,
      multiple: true,
      xs: 12,
      md: 12,
      lg: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      type: "file",
      name: "idBackImage",
      label: "Id Back Image",
      acceptedFileTypes: "image/*,application/pdf",
      maxFiles: 5,
      maxSize: 10000000,
      multiple: true,
      xs: 12,
      md: 12,
      lg: 6,
      sm: 12,
    },
  ];
  return (
    <>
      <RenderInput inputField={inputField} formik={formik} />
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          alignItems: "center",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <Grid item>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              formik.handleReset();
              onClose();
            }}
            startIcon={<HighlightOffRoundedIcon />}
          >
            Close
          </Button>
        </Grid>
        <Grid>
          <LoadingButton
            loading={loading}
            onClick={() => formik.handleSubmit()}
            variant={"outlined"}
            Width={"-webkit-fill-available"}
            startIcon={<ControlPointRoundedIcon />}
          >
            Add
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};

export default MemberDocumentForm;

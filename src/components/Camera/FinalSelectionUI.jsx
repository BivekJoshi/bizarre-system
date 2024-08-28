import { Box, Button, Divider } from "@mui/material";
import React, { useState } from "react";
import ClickImage from "./ClickImage";
import DropZone from "./DropZone";
import LinkedCameraRoundedIcon from "@mui/icons-material/LinkedCameraRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

const FinalSelectionUI = ({onClose}) => {
  const [selection, setSelection] = useState(null);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {!selection ? (
        <>
          <Button
            variant="contained"
            onClick={() => setSelection("click")}
            startIcon={<LinkedCameraRoundedIcon />}
          >
            Click Image
          </Button>
          <Divider>OR</Divider>
          <Button
            variant="contained"
            onClick={() => setSelection("upload")}
            startIcon={<CloudUploadRoundedIcon />}
          >
            Upload Image
          </Button>
        </>
      ) : (
        <>
          {selection === "upload" && <DropZone onClose={onClose} />}
          {selection === "click" && <ClickImage onClose={onClose} />}
        </>
      )}
    </Box>
  );
};

export default FinalSelectionUI;

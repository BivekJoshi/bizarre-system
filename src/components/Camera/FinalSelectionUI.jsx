import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import ClickImage from "./ClickImage";
import DropZone from "./DropZone";

const FinalSelectionUI = () => {
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
          <Button variant="contained" onClick={() => setSelection("upload")}>
            Upload Image
          </Button>
          <Button variant="contained" onClick={() => setSelection("click")}>
            Click Image
          </Button>
        </>
      ) : (
        <>
          {selection === "upload" && <DropZone />}
          {selection === "click" && <ClickImage />}
          <Button variant="outlined" onClick={() => setSelection(null)}>
            Back
          </Button>
        </>
      )}
    </Box>
  );
};

export default FinalSelectionUI;

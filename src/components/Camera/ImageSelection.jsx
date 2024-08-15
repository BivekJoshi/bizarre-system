import { Box } from "@mui/material";
import React from "react";

const ImageSelection = ({ selectedImage, isUploaded }) => {
  console.log("🚀 ~ ImageSelection ~ selectedImage:", selectedImage)
  
  const PreviewImage = isUploaded ? selectedImage.preview : selectedImage;

  return (
    <Box>
      <div style={{ marginTop: "1rem" }}>
        <img
          src={PreviewImage}
          alt="Captured"
          style={{
            width: "100%",
            maxWidth: "600px",
            maxHeight: "400px",
            border: "1px solid #ccc",
          }}
        />
      </div>
    </Box>
  );
};

export default ImageSelection;

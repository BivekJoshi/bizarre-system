import { Box } from "@mui/material";
import React from "react";

const ImageSelection = ({ selectedImage, isUploaded }) => {
  console.log("🚀 ~ ImageSelection ~ selectedImage:", selectedImage);

  const PreviewImage = isUploaded ? selectedImage.preview : selectedImage;

  return (
    <Box>
      <div style={{ marginTop: "1rem", backgroundColor: "black" ,display:"flex",justifyContent:"center"}}>
        <img
          src={PreviewImage}
          alt="Captured"
          style={{
            width: "auto",
            height: "300px",
          }}
        />
      </div>
    </Box>
  );
};

export default ImageSelection;

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, Paper, Grid, Button, Alert } from "@mui/material";
import ImageSelectionUpload from "./ImageSelectionUpload";

const DropZoneUploadFile = ({ rowData }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const newImage = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setImage(newImage);
      setError("");
    }
  };

  const onDropRejected = (rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setError(
        "Invalid file type. Only *.jpeg, *.jpg, and *.png images are accepted."
      );
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
  });

  const handleReupload = () => {
    setImage(null);
    setError("");
  };

  return (
    <Box>
      {!image && (
        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed #ccc",
            borderRadius: "8px",
            // p: 2,
            textAlign: "center",
            cursor: "pointer",
            height: "200px",
            // backgroundColor: isDragActive ? "#f0f0f0" : "#fafafa",
            "&:hover": {
              // backgroundColor: "#f0f0f0",
            },
          }}
        >
          <input {...getInputProps()} />
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            {isDragActive ? (
              <Typography variant="h6" color="primary">
                Drop the file here ...
              </Typography>
            ) : (
              <Typography variant="h6">
                Drag & drop an image here, or click to select a file
              </Typography>
            )}
            <Typography variant="body2" color="textSecondary">
              (Only *.jpeg, *.jpg, and *.png images will be accepted)
            </Typography>
          </Paper>
        </Box>
      )}

      {error && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {image && (
        <Box sx={{ mt: 2 }}>
          <ImageSelectionUpload
            selectedImage={image}
            isUploaded={true}
            rowDataId={rowData?.id}
          />
          <Button
            variant="outlined"
            color="error"
            // sx={{ mt: 2 }}
            onClick={handleReupload}
            fullWidth
          >
            Re-upload Image
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DropZoneUploadFile;

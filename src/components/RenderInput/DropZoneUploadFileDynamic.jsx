import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Typography, Grid, Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DropZoneUploadFileDynamic = ({
  accept = "image/*", // default to image files
  maxFiles = 1, // default to single file upload
  maxSize = 5000000, // 5MB by default
  formik,
  fieldName,
  label,
  multiple = false, // allow multiple files if needed
}) => {
  const [filePreviews, setFilePreviews] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const previewFiles = acceptedFiles.map((file) => {
        if (file.type.startsWith("image")) {
          file.preview = URL.createObjectURL(file);
        }
        return file;
      });

      setFilePreviews(previewFiles);
      formik.setFieldValue(fieldName, acceptedFiles);
    },
    [formik, fieldName]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
    multiple,
  });

  // Clean up file previews on unmount
  React.useEffect(() => {
    return () => {
      filePreviews.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [filePreviews]);

  const removeFile = () => {
    setFilePreviews([]);
    formik.setFieldValue(fieldName, []);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>

      {filePreviews.length === 0 ? (
        <Box
          {...getRootProps({
            className: "dropzone",
            sx: {
              padding: "20px",
              border: "2px dashed #ccc",
              borderRadius: "4px",
              backgroundColor: isDragActive ? "#eee" : "#fafafa",
              height:"200px"
            },
          })}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography variant="body1">Drop the files here...</Typography>
          ) : (
            <Typography variant="body1">
              Drag and drop some files here, or click to select files
            </Typography>
          )}
          <Typography variant="caption" color="textSecondary">
            Accepted file types: {accept} | Max size: {maxSize / 1000000} MB
          </Typography>
        </Box>
      ) : (
        <div>
          {filePreviews.map((file, index) => (
            <Grid item key={index} xs={12} md={12}>
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {file.type.startsWith("image") ? (
                  <div style={{ width: "100%", height: "200px" }}>
                    <img
                      src={file.preview}
                      alt={file.name}
                      width="100%"
                      height="100px"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                ) : (
                  <Typography variant="body2">{file.name}</Typography>
                )}

                <Typography variant="body2">
                  {file.name} - {(file.size / 1000).toFixed(1)} KB
                </Typography>
                <Tooltip title="Remove">
                  <IconButton color="error" onClick={removeFile}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropZoneUploadFileDynamic;

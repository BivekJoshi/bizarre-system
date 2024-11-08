import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import { axiosInstance } from "../../api/axiosInterceptor";
import { ITEM } from "../../api/api";
import { toast } from "react-toastify";

const DropZoneUploadCsv = ({ onClose }) => {
  const [fileName, setFileName] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [acceptedFiles, setAcceptedFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setAcceptedFiles(acceptedFiles);
    const file = acceptedFiles[0];
    if (file) {
      setFileName(file.name);
      setIsFileUploaded(true);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv, .xls, .xlsx",
    maxFiles: 1,
  });

  const handleChooseFileClick = () => {
    document.querySelector("input[type='file']").click();
  };

  const handleFileUpload = async () => {
    if (!isFileUploaded) return;
    setLoading(true);
    setUploadError("");

    const file = acceptedFiles[0];
    if (!file) {
      setUploadError("No file selected.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post(
        `${ITEM}/update-all-items`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("File uploaded successfully!");
        setIsFileUploaded(false);
        setFileName("");
        onClose();
      }
    } catch (error) {
      toast.error(error);
      setUploadError("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      {!isFileUploaded ? (
        <Paper
          {...getRootProps()}
          elevation={3}
          style={{
            padding: "20px",
            textAlign: "center",
            border: "2px dashed #1976d2",
            borderRadius: "8px",
          }}
        >
          <input {...getInputProps()} />
          <Typography variant="h6">
            Drag & Drop your file here, or click to select a file
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={handleChooseFileClick}
          >
            Choose File
          </Button>
        </Paper>
      ) : (
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            textAlign: "center",
            border: "2px dashed #1976d2",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" style={{ marginTop: "20px" }}>
            Uploaded File: {fileName}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: "20px" }}
            onClick={handleFileUpload}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Upload File"}
          </Button>
          {uploadError && (
            <Typography
              variant="body2"
              color="error"
              style={{ marginTop: "10px" }}
            >
              {uploadError}
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default DropZoneUploadCsv;

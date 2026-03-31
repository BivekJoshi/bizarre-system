import React, { useState, useEffect } from "react";
import { Typography, useTheme } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ element, formik }) => {
  const theme = useTheme();
  const { name, placeholder, isDisabled, required, extraLabel } = element;

  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    if (formik.values[name] !== editorContent) {
      setEditorContent(formik.values[name] || "");
    }
  }, [formik.values[name]]);

  const handleEditorChange = (content) => {
    setEditorContent(content);
    formik.setFieldValue(name, content);
  };

  return (
    <div>
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.text.default,
          fontWeight: 700,
          marginBottom: "0.1rem",
        }}
      >
        {element?.label}{" "}
        {element.required && <span style={{ color: "#EC4034" }}>*</span>}
      </Typography>

      <ReactQuill
        value={editorContent}
        onChange={handleEditorChange}
        readOnly={isDisabled}
        placeholder={placeholder}
        theme="snow"
        style={{
          minHeight: "150px",
          cursor: "text",
          borderRadius: "4px",
          fontSize: "16px",
          color:"black"
        }}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            [{ color: [] }, { background: [] }],
            ["link", "image"],
            ["emoji"],
            ["clean"],
            ["undo", "redo"],
          ],
        }}
        className="custom-quill-editor"
      />

      {formik.errors[name] && formik.touched[name] && (
        <Typography variant="body2" color="error" sx={{ marginTop: "0.25rem" }}>
          {formik.errors[name]}
        </Typography>
      )}
    </div>
  );
};

export default RichTextEditor;

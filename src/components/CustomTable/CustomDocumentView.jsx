import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Tooltip,
  Zoom,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import { DOC_URL } from "../../api/axiosInterceptor";
import FormModal from "../Modal/FormModal";

const CustomDocumentView = ({ idFrontUrl, idBackUrl }) => {
  const [openBigImage, setOpenBigImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const documents = [
    { url: idFrontUrl, label: "Front Side" },
    { url: idBackUrl, label: "Back Side" },
  ];

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenBigImage(true);
  };

  const handleViewInNewTab = () => {
    window.open(selectedImage, "_blank");
  };

  return (
    <Box sx={{ display: "flex", gap: 1.5 }}>
      {documents.map((doc, index) => (
        <Box
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => doc.url && handleImageClick(DOC_URL + doc.url)}
          sx={{
            position: "relative",
            width: 110,
            height: 75, // Aspect ratio closer to a real ID card
            borderRadius: 2,
            overflow: "hidden",
            cursor: doc.url ? "pointer" : "default",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "grey.100",
            transition: "all 0.3s ease",
            boxShadow: hoveredIndex === index ? 4 : 0,
            "&:hover": { borderColor: "primary.main" },
          }}
        >
          {doc.url ? (
            <>
              <img
                src={DOC_URL + doc.url}
                alt={doc.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.5s ease",
                }}
              />
              {/* Modern Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: "rgba(0, 0, 0, 0.4)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: hoveredIndex === index ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  backdropFilter: "blur(2px)",
                }}
              >
                <VisibilityIcon
                  sx={{ color: "white", fontSize: "1.5rem", mb: 0.5 }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: "white", fontWeight: 700, fontSize: "0.65rem" }}
                >
                  VIEW
                </Typography>
              </Box>
              {/* Label Badge */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: "rgba(0,0,0,0.6)",
                  py: 0.2,
                  textAlign: "center",
                  display: hoveredIndex === index ? "none" : "block",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {doc.label}
                </Typography>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ fontWeight: 600 }}
              >
                MISSING
              </Typography>
            </Box>
          )}
        </Box>
      ))}

      <FormModal
        open={openBigImage}
        onClose={() => setOpenBigImage(false)}
        width={"40%"}
        height={"auto"}
        header={"Document Preview"}
        formComponent={
          <Box sx={{ position: "relative", textAlign: "center" }}>
            <Box
              sx={{
                mb: 2,
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                height:"300px",
                width:"100%",
                display:"flex",
                justifyContent:"center"
              }}
            >
              <img
                src={selectedImage}
                alt="Enlarged Document"
                style={{ height: "100%", display: "block" }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<CloseIcon />}
                onClick={() => setOpenBigImage(false)}
                sx={{ borderRadius: 2 }}
              >
                Close
              </Button>
              <Button
                variant="contained"
                startIcon={<OpenInNewIcon />}
                onClick={handleViewInNewTab}
                sx={{ borderRadius: 2, px: 4 }}
              >
                Open Original
              </Button>
            </Box>
          </Box>
        }
      />
    </Box>
  );
};

export default CustomDocumentView;

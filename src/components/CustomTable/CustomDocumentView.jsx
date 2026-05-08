import React, { useState } from "react";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import { DOC_URL } from "../../api/axiosInterceptor";
import FormModal from "../Modal/FormModal";

const CustomDocumentView = ({ idFrontUrl, idBackUrl }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const borderColor = isDark ? "#262626" : "#E7E5E4";
  const placeholderBg = isDark ? "#1F1F1F" : "#F5F5F4";

  const [openBigImage, setOpenBigImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const documents = [
    { url: idFrontUrl, label: "Front" },
    { url: idBackUrl, label: "Back" },
  ];

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenBigImage(true);
  };

  const handleViewInNewTab = () => {
    window.open(selectedImage, "_blank");
  };

  return (
    <Box sx={{ display: "flex", gap: 1.25 }}>
      {documents.map((doc, index) => (
        <Box
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => doc.url && handleImageClick(DOC_URL + doc.url)}
          sx={{
            position: "relative",
            width: 110,
            height: 75,
            borderRadius: 1.5,
            overflow: "hidden",
            cursor: doc.url ? "pointer" : "default",
            border: `1px solid ${borderColor}`,
            bgcolor: placeholderBg,
            transition: "border-color .15s ease",
            "&:hover": {
              borderColor: doc.url ? "primary.main" : borderColor,
            },
          }}
        >
          {doc.url ? (
            <>
              <Box
                component="img"
                src={DOC_URL + doc.url}
                alt={doc.label}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform:
                    hoveredIndex === index ? "scale(1.04)" : "scale(1)",
                  transition: "transform .25s ease",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: "rgba(15,23,42,0.45)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: hoveredIndex === index ? 1 : 0,
                  transition: "opacity .15s ease",
                }}
              >
                <VisibilityIcon
                  sx={{ color: "#fff", fontSize: 18, mb: 0.25 }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.65rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  VIEW
                </Typography>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: "rgba(15,23,42,0.55)",
                  py: 0.25,
                  textAlign: "center",
                  display: hoveredIndex === index ? "none" : "block",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
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
                sx={{ fontWeight: 600, letterSpacing: "0.06em" }}
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
        width="min(560px, 92vw)"
        height="auto"
        header="Document Preview"
        formComponent={
          <Box>
            <Box
              sx={{
                mb: 2,
                borderRadius: 1.5,
                overflow: "hidden",
                border: `1px solid ${borderColor}`,
                height: 320,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: placeholderBg,
              }}
            >
              <Box
                component="img"
                src={selectedImage}
                alt="Enlarged Document"
                sx={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </Box>

            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<CloseIcon />}
                onClick={() => setOpenBigImage(false)}
              >
                Close
              </Button>
              <Button
                variant="contained"
                startIcon={<OpenInNewIcon />}
                onClick={handleViewInNewTab}
              >
                Open Original
              </Button>
            </Stack>
          </Box>
        }
      />
    </Box>
  );
};

export default CustomDocumentView;

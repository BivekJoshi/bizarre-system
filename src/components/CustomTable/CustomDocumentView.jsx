import React, { useState } from "react";
import { DOC_URL } from "../../api/axiosInterceptor";
import FormModal from "../Modal/FormModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@mui/material";

const CustomDocumentView = ({ idFrontUrl, idBackUrl }) => {
  const [openBigImage, setOpenBigImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenBigImage(true);
  };

  const handleViewInNewTab = () => {
    window.open(selectedImage, "_blank");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "0.5rem",
        }}
      >
        {[idFrontUrl, idBackUrl].map((url, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              position: "relative",
              width: "100px",
              height: "100px",
              border: "1px solid lightgrey",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => handleImageClick(DOC_URL + url)}
          >
            {/* Image */}
            <img
              src={DOC_URL + url}
              alt={`Document ${index === 0 ? "Front" : "Back"}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                transition: "transform 0.3s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: hoveredIndex === index ? 1 : 0,
                transition: "opacity 0.3s ease",
                backdropFilter: "blur(5px)",
              }}
            >
              <VisibilityIcon style={{ color: "white", fontSize: "2rem" }} />
            </div>
          </div>
        ))}
      </div>

      <FormModal
        open={openBigImage}
        onClose={() => setOpenBigImage(false)}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"View Document"}
        formComponent={
          <>
            <div style={{ textAlign: "center" }}>
              <img
                src={selectedImage}
                alt="Enlarged"
                style={{ width: "100%", height: "auto", marginBottom: "1rem" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleViewInNewTab}
              >
                View in New Tab
              </Button>
            </div>
          </>
        }
        showButton={false}
      />
    </>
  );
};

export default CustomDocumentView;

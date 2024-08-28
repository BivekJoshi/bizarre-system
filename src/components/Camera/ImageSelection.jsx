import { Box, Button, Slider } from "@mui/material";
import Cropper from "react-easy-crop";
import React, { useState } from "react";
import CropTwoToneIcon from "@mui/icons-material/CropTwoTone";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import { useProfilePic } from "../../hooks/user/useUser";

const ImageSelection = ({ selectedImage, isUploaded, onClose }) => {
  const [showCrop, setShowCrop] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [finalImageFile, setFinalImageFile] = useState(null);

  const { formik } = useProfilePic({
    finalImageFile,
    onClose,
  });

  const PreviewImage = isUploaded ? selectedImage.preview : selectedImage;

  const handleCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    const { imageSrc, file } = await getCroppedImg(
      PreviewImage,
      croppedAreaPixels
    );
    setFinalImage(imageSrc);
    setFinalImageFile(file);
    setShowCrop(false);
  };

  const getCroppedImg = async (imageSrc, crop) => {
    const image = new Image();
    image.src = imageSrc;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const file = new File([blob], "croppedImage.jpeg", {
          type: "image/jpeg",
        });
        const imageSrc = URL.createObjectURL(blob);
        resolve({ imageSrc, file });
      }, "image/jpeg");
    });
  };

  const handleSubmit = () => {
    formik.submitForm();
  };

  return (
    <>
      {showCrop ? (
        <>
          <Box>
            <div
              style={{
                width: "auto",
                height: "300px",
                position: "relative",
              }}
            >
              <Cropper
                image={PreviewImage}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
              />
            </div>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, zoom) => setZoom(zoom)}
              style={{ marginTop: "20px" }}
            />
          </Box>
          <Button
            variant="contained"
            onClick={showCroppedImage}
            fullWidth
            sx={{ marginBottom: "1rem" }}
            startIcon={<CropTwoToneIcon />}
          >
            Save Crop
          </Button>
        </>
      ) : (
        <>
          <Box>
            <div
              style={{
                backgroundColor: "black",
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <img
                src={finalImage || PreviewImage}
                alt="Captured"
                style={{
                  width: "auto",
                  height: "300px",
                }}
              />
            </div>
          </Box>
          {!finalImage && (
            <Button
              variant="contained"
              fullWidth
              onClick={() => setShowCrop(true)}
              sx={{ marginBottom: "1rem" }}
            >
              Next Step
            </Button>
          )}
          {finalImage && (
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{ marginBottom: "1rem" }}
              startIcon={<PublishRoundedIcon />}
            >
              Submit
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default ImageSelection;

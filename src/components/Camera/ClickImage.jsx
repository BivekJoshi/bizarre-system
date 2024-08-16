import { Button } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import ImageSelection from "./ImageSelection";

const ClickImage = () => {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const openCamera = async () => {
    try {
      setCapturedImage(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      setStream(mediaStream);
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play();
    } catch (error) {
      console.error("Error accessing camera: ", error);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const imageDataUrl = canvas.toDataURL("image/png");
      setCapturedImage(imageDataUrl);

      
      setStream(null);

      // Stop the camera stream
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }
  };

  useEffect(() => {
    openCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); 

  return (
    <div style={{ textAlign: "center" }}>
      {!capturedImage && (
        <div>
          <video
            ref={videoRef}
            style={{
              width: "100%",
              backgroundColor: "black",
              height: "300px",
            }}
            autoPlay
          />
        </div>
      )}

      {stream && (
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={captureImage}
          sx={{ display: "flex", gap: "1rem", marginTop: "1rem" }}
        >
          Capture Image
        </Button>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {capturedImage && (
        <ImageSelection selectedImage={capturedImage} isUploaded={false} />
      )}

      {capturedImage && !stream && (
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={openCamera}
          sx={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
        >
          Retake Image
        </Button>
      )}
    </div>
  );
};

export default ClickImage;

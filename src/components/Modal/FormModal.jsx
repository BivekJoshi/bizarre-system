import React from "react";
import {
  Box,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import CustomButton from "../Button/CustomButton";

const FormModal = ({
  open,
  onClose,
  height,
  formComponent,
  sx,
  width,
  header,
  maxHeight,
  formik,
  loading,
  showButton,
  isEditModalOpen,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const borderColor = isDark ? "#262626" : "#E7E5E4";

  // Prefer the explicit `loading` prop when consumers wire it to a mutation
  // hook; otherwise fall back to formik's own submit state so callers don't
  // have to thread loading flags through manually.
  const effectiveLoading =
    loading !== undefined ? loading : !!formik?.isSubmitting;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSmallScreen ? "94%" : width || "min(640px, 92vw)",
    maxWidth: "94vw",
    maxHeight: maxHeight || (isSmallScreen ? "92vh" : "88vh"),
    height: height,
    borderRadius: 2,
    border: `1px solid ${borderColor}`,
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow:
      "0 12px 48px rgba(15, 23, 42, 0.18), 0 2px 6px rgba(15, 23, 42, 0.06)",
    display: "flex",
    flexDirection: "column",
    outline: "none",
    overflow: "hidden",
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={sx}
    >
      <Box sx={style}>
        {header && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2.5,
              py: 1.5,
              borderBottom: `1px solid ${borderColor}`,
              flexShrink: 0,
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, letterSpacing: "-0.01em" }}
            >
              {header}
            </Typography>
            <IconButton size="small" onClick={onClose}>
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            px: 2.5,
            py: 2,
          }}
        >
          {formComponent}
        </Box>

        {showButton && (
          <>
            <Divider />
            <Stack
              direction="row"
              spacing={1}
              justifyContent="flex-end"
              sx={{
                px: 2.5,
                py: 1.5,
                bgcolor: isDark ? "#161616" : "#FAFAF9",
                flexShrink: 0,
              }}
            >
              <CustomButton
                variant="outlined"
                title="Close"
                onClick={onClose}
                startIcon={<HighlightOffRoundedIcon />}
              />
              <CustomButton
                variant="contained"
                color="primary"
                title={isEditModalOpen ? "Update" : "Add"}
                loading={effectiveLoading}
                startIcon={<ControlPointRoundedIcon />}
                onClick={() => formik?.handleSubmit()}
              />
            </Stack>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default FormModal;

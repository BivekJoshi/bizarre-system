import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  Stack,
  Typography,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationModal = (props) => {
  const {
    isModalOpen,
    handleModalClose,
    agreeLabel,
    disagreeLabel,
    content,
    header,
    alertTitle,
    confirmhead,
    icon,
    handleSave,
    color,
  } = props;

  return (
    <Dialog
      open={isModalOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleModalClose}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        sx: { width: { xs: "92%", sm: 420 }, m: { xs: 1, sm: 2 }, p: 1 },
      }}
    >
      <DialogContent sx={{ pt: 3, pb: 1.5 }}>
        <Stack alignItems="center" spacing={1.5}>
          {icon && (
            <Box
              sx={{
                color: color || "error.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </Box>
          )}
          {alertTitle && (
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.01em",
                textAlign: "center",
              }}
            >
              {alertTitle}
            </Typography>
          )}
          {header && (
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", textAlign: "center" }}
            >
              {header}
            </Typography>
          )}
          {confirmhead && (
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", textAlign: "center" }}
            >
              {confirmhead}
            </Typography>
          )}
          {content && (
            <DialogContentText
              id="alert-dialog-slide-description"
              sx={{ textAlign: "center", color: "text.secondary" }}
            >
              {content}
            </DialogContentText>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, pt: 1, gap: 1 }}>
        <Button
          onClick={handleModalClose}
          variant="outlined"
          fullWidth
          sx={{ py: 1 }}
        >
          {agreeLabel}
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="error"
          fullWidth
          sx={{ py: 1 }}
        >
          {disagreeLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;

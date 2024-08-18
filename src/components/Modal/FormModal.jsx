import React from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { LoadingButton } from "@mui/lab";

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
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:
      isSmallScreen || isMediumScreen ? "90%" : width ? width : "max-content",
    height: height ? height : "-webkit-fill-available",
    maxHeight: maxHeight && maxHeight,
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
    background: theme.palette.background.default,
    overflow: "auto",
    color: theme.palette.text.default,
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
          <>
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid item>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {header}
                </Typography>
              </Grid>
              <Grid>
                <IconButton
                  onClick={() => {
                    onClose();
                    formik.handleReset();
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
            <div style={{ border: "1px solid grey" }}></div>
            <br />
          </>
        )}
        {formComponent}
        {showButton ? (
          <>
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <Grid item>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    formik.handleReset();
                    onClose();
                  }}
                  startIcon={<HighlightOffRoundedIcon />}
                >
                  Close
                </Button>
              </Grid>
              <Grid>
                <LoadingButton
                  loading={loading}
                  onClick={() => formik.handleSubmit()}
                  variant={"outlined"}
                  Width={"-webkit-fill-available"}
                  startIcon={<ControlPointRoundedIcon />}
                >
                  {/* {data ? "Update" : "Add"} */}
                  Add
                </LoadingButton>
              </Grid>
            </Grid>
          </>
        ) : null}
      </Box>
    </Modal>
  );
};

export default FormModal;

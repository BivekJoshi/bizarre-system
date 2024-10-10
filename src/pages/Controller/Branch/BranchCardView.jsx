import React, { useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  Box,
  Avatar,
  Switch,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useTheme } from "@mui/material/styles";

const BranchCardView = ({ data }) => {
  const theme = useTheme();
  const [isActive, setIsActive] = useState(data?.status === "ACTIVE");

  const handleToggleStatus = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <Paper
      elevation={3}
      sx={{ p: 3, borderRadius: "16px", maxWidth: "450px", mx: "auto" }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={12} md={3}>
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 70,
              height: 70,
            }}
          >
            <HomeWorkRoundedIcon fontSize="large" sx={{ color: "white" }} />
          </Avatar>
        </Grid>

        <Grid item xs={12} sm={9}>
          <Typography
            variant="h6"
            fontWeight="bold"
            color={theme.palette.text.primary}
          >
            {data?.address || "Branch Address"}
          </Typography>

          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", mt: 1 }}
          >
            <PhoneRoundedIcon
              sx={{ mr: 1, color: theme.palette.primary.main }}
            />
            {data?.phoneNumber || "No phone number"}
          </Typography>

          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", mt: 1 }}
          >
            <GroupRoundedIcon
              sx={{ mr: 1, color: theme.palette.primary.main }}
            />
            {`Housing Capacity: ${data?.housingCapacity || 0}`}
          </Typography>
        </Grid>
      </Grid>

      <Box mt={3} display="flex" justifyContent="flex-end" alignItems="center">
        <FormControlLabel
          control={
            <Switch
              checked={isActive}
              onChange={handleToggleStatus}
              sx={{
                '& .MuiSwitch-switchBase': {
                  color: isActive ? theme.palette.primary.main : theme.palette.warning.main,
                  '&.Mui-checked': {
                    color: theme.palette.primary.main,
                  },
                  '&.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: theme.palette.primary.main,
                  },
                },
                '& .MuiSwitch-track': {
                  backgroundColor: isActive ? theme.palette.grey[300] : theme.palette.warning.light,
                  borderRadius: '50px',
                  boxShadow: `0 2px 5px ${theme.palette.grey[400]}`,
                },
                '& .MuiSwitch-thumb': {
                  borderRadius: '50%',
                  boxShadow: `0 1px 3px ${theme.palette.grey[500]}`,
                },
              }}
              icon={
                <IconButton
                  sx={{
                    p: 0,
                    color: isActive ? 'inherit' : theme.palette.warning.main,
                  }}
                >
                  {isActive ? <CheckCircleRoundedIcon /> : <CancelRoundedIcon />}
                </IconButton>
              }
              checkedIcon={
                <IconButton
                  sx={{
                    p: 0,
                    color: theme.palette.primary.main,
                  }}
                >
                  <CheckCircleRoundedIcon />
                </IconButton>
              }
            />
          }
          label={isActive ? "Active" : "Inactive"}
          labelPlacement="start"
          sx={{
            color: isActive ? theme.palette.primary.main : theme.palette.warning.main,
            fontWeight: "bold",
            '& .MuiFormControlLabel-label': {
              fontSize: '1rem',
              marginRight: 2,
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default BranchCardView;

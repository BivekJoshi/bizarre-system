import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Sample placeholder image URL
const NO_DATA_IMAGE = "https://i.pinimg.com/236x/c9/22/68/c92268d92cf2dbf96e3195683d9e14fb.jpg";

const NoDataFound = () => {
  const theme = useTheme();

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
      }}
    >
      <Box
        component="img"
        src={NO_DATA_IMAGE}
        alt="No Data Found"
        sx={{
          maxWidth: '100%',
          height: 'auto',
          marginBottom: theme.spacing(2),
          borderRadius: 2,
          boxShadow: theme.shadows[5],
        }}
      />
      <Typography
        variant="h5"
        sx={{
          color: theme.palette.text.primary,
          fontWeight: 'bold',
          marginBottom: theme.spacing(1),
        }}
      >
        No Data Found
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          maxWidth: '400px',
          lineHeight: 1.5,
        }}
      >
        We couldn't find any data to display. Please try again later or check back with different filters.
      </Typography>
    </Container>
  );
};

export default NoDataFound;

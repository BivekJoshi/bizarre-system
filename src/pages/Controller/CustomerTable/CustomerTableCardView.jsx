import { Paper, Typography, Box, Chip } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerTableCardView = ({ data }) => {
    const navigate = useNavigate();

    const getStatusColor = (status) => {
        switch (status) {
            case 'OCCUPIED':
                return 'error';
            case 'AVAILABLE':
                return 'success';
            case 'RESERVED':
                return 'warning';
            case 'OUT_OF_ORDER':
                return 'secondary';
            default:
                return 'default';
        }
    };

    const handleCardClick = () => {
        navigate(`${data?.id}`);
    };

    return (
        <Paper
            elevation={3}
            sx={{ p: 2, borderRadius: 2, minWidth: 100, cursor: 'pointer' }}
            onClick={handleCardClick}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" color="primary">
                    Table {data?.tableNumber}
                </Typography>
                <Chip
                    label={data?.status}
                    color={getStatusColor(data?.status)}
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                />
            </Box>
        </Paper>
    );
};

export default CustomerTableCardView;

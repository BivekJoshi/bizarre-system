import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Avatar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { useGetOrderById } from '../../../../hooks/order/useOrder';
import { DOC_URL } from '../../../../api/axiosInterceptor';

const OpenProcessModal = ({ rowId }) => {

    const { data, isLoading } = useGetOrderById(rowId);
    const statusCards = [

        {
            id: 2,
            status: 'Preparing',
            icon: <HourglassEmptyIcon style={{ fontSize: 40, color: 'orange' }} />,
            description: 'The order is being prepared.',
        },
        {
            id: 3,
            status: 'Ready',
            icon: <FastfoodIcon style={{ fontSize: 40, color: 'blue' }} />,
            description: 'The order is ready for pickup.',
        },
        {
            id: 1,
            status: 'Served',
            icon: <CheckCircleIcon style={{ fontSize: 40, color: 'green' }} />,
            description: 'The order has been served.',
        },
    ];

    return (
        <Box>
            <Box display="flex" alignItems="center" mb={3}>
                <Avatar
                    src={DOC_URL + data?.data?.item?.itemImageUrl}
                    alt={data?.data?.item?.name}
                    variant="rounded"
                    sx={{
                        width: 72,
                        height: 72,
                        marginRight: 2,
                        border: "2px solid #b3a369",
                    }}
                />
                <Box>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#3a3a3a" }}
                    >
                        {data?.data?.item?.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#6e6e6e" }}>
                        {data?.data?.item?.type}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#6e6e6e" }}>
                        {data?.data?.remark}
                    </Typography>
                </Box>
            </Box>
            <Grid container spacing={3}>
                {statusCards.map((card) => (
                    <Grid item xs={12} sm={6} md={4} key={card.id}>
                        <Card variant="outlined" sx={{ textAlign: 'center', padding: '1rem' }}>
                            <CardContent>
                                {card.icon}
                                <Typography variant="h6" gutterBottom>
                                    {card.status}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {card.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default OpenProcessModal;

import React from 'react';
import { useBranchForm } from '../../../hooks/branch/Branch/useBranchForm';
import { Button, Grid } from '@mui/material';
import RenderInput from '../../../components/RenderInput/RenderInput';
import { LoadingButton } from '@mui/lab';

const AddBranch = ({ onClose, data }) => {
    const { formik, loading } = useBranchForm({ onClose, data });

    const inputField = [
        {
            id: 1,
            name: "address",
            label: "address",
            type: "text",
            required: true,
            xs: 12,
            md: 6,
            lg: 6,
            sm: 12,
        },
        {
            id: 1,
            name: "phoneNumber",
            label: "Phone Number",
            type: "text",
            required: true,
            xs: 12,
            md: 6,
            lg: 6,
            sm: 12,
        },
        {
            id: 1,
            name: "housingCapacity",
            label: "housingCapacity",
            type: "text",
            required: true,
            xs: 12,
            md: 6,
            lg: 6,
            sm: 12,
        },
    ];

    const handleFormSubmit = () => {
        formik.handleSubmit();
    };
    const handleClose = () => {
        formik.handleReset();
        onclose();
    }
    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <RenderInput inputField={inputField} formik={formik} />
            </Grid>
            <Grid
                xs={12}
                mt={2}
                sx={{ display: "flex", justifyContent: "end", gap: "1rem" }}
            >
                <LoadingButton
                    loading={loading}
                    onClick={handleFormSubmit}
                    variant={"outlined"}
                    Width={"-webkit-fill-available"}
                    sx={{
                        "&:hover": {
                            // background: theme.palette.hover.primary,
                            color: "#fff",
                        },
                    }}
                >
                    {data ? "Update" : "Add"}
                </LoadingButton>
                <Button variant="outlined" color="error" onClick={handleClose}>
                    Cancel
                </Button>
            </Grid>
        </Grid>
    );
}

export default AddBranch;

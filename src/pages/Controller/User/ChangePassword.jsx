import React from 'react';
import { Button, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useChangePasswordForm } from '../../../hooks/user/User/useUserForm';
import RenderInput from '../../../components/RenderInput/RenderInput';

const ChangePassword = () => {
    const { formik, loading } = useChangePasswordForm();

    const inputField = [
        {
            id: 1,
            name: "mobileNumber",
            label: "mobileNumber",
            type: "text",
            required: true,
            xs: 12,
            md: 6,
            lg: 6,
            sm: 12,
        },
        {
            id: 1,
            name: "oldPassword",
            label: "oldPassword",
            type: "text",
            required: true,
            xs: 12,
            md: 6,
            lg: 6,
            sm: 12,
        },
        {
            id: 1,
            name: "newPassword",
            label: "newPassword",
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
                    Change Password
                </LoadingButton>
                <Button variant="outlined" color="error" onClick={handleClose}>
                    Cancel
                </Button>
            </Grid>
        </Grid>
    );
}

export default ChangePassword;

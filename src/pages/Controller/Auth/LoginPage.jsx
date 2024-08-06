import { TextField, Button, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuthForm } from '../../../hooks/auth/Auth/useAuthForm';

const LoginPage = () => {
    const {
        formik,
        showValues,
        loading,
        handleClickShowPassword,
        handleMouseDownPassword,
    } = useAuthForm();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <div>Mobile Numner</div>
                <TextField
                    id="mobileNumber"
                    name="mobileNumber"
                    // label="Mobile Number"
                    value={formik.values.mobileNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                    helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                    margin="normal"
                      size="small"
                />
                <div>Mobile Numner</div>

                <TextField
                    id="password"
                    name="password"
                    // label="Password"
                    type={showValues.showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    margin="normal"
                      size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showValues.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    style={{ marginTop: '16px' }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Login'}
                </Button>
            </form>
        </div>
    );
}

export default LoginPage;

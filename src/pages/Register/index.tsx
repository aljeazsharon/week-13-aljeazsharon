import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Grid, Typography, Paper, Link } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
interface UserData {
    name: string;
    email: string;
    password: string;
}

const validationSchema = Yup.object().shape({ 
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
})

const initialValues = {
    name: '',
    email: '',
    password: '',
};

const Register: React.FC = () => {
    const navigate = useNavigate();
    const handleRegister = (values: UserData) => {
        axios.post('https://mock-api.arikmpt.com/api/user/register', {
                name: values.name,
                email: values.email,
                password: values.password,
            })
            .then((response) => {
                console.log('Success', response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                })
                setInterval(() => { navigate('/')}, 3000)
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                });
            })
    }

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={8} md={6}>
                <Paper elevation={3} style={{ padding: '30px' }}>
                    <Typography variant="h5" gutterBottom>Please Register To Our Platform</Typography>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRegister}>
                        {({ errors, touched }) => (
                            <Form>
                                <Field as={TextField} name="name" label="Name" variant="outlined" fullWidth margin="normal" error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name}/>
                                <Field as={TextField} name="email" label="Email" variant="outlined" fullWidth margin="normal" error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email}/>
                                <Field as={TextField} type="password" name="password" label="Password" variant="outlined" fullWidth margin="normal" error={touched.password && Boolean(errors.password)} helperText={touched.password && errors.password}/>
                                <Button type="submit" variant="contained" color="primary" fullWidth> Register</Button>
                            </Form>
                        )}
                    </Formik>
                    <Typography variant="body2" gutterBottom style={{ marginTop: "10px" }}> Already have an account,
                        <Link component="button" variant="body2"style={{ marginLeft: "5px" }}onClick={() => navigate('/')}>Login here!</Link>.
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Register
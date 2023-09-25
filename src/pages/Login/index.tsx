import React from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';

interface UserData {
    email: string;
    password: string;
}

const initialValues = {
    email: '',
    password: '',
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address or email is not found').required('Email is required the right format'),
    password: Yup.string().min(8).required('Password is required'),
}).required()

const Login = () => {
    const navigate = useNavigate()
    const handleLogin = (values: UserData) => {
        axios.post('https://mock-api.arikmpt.com/api/user/login', {
            email: values.email,
            password: values.password,
        })
        .then((response) => {
            console.log('Login Success!', response.data)
            sessionStorage.setItem('userToken', response.data.data.token)
                navigate('/') 
        })
        .catch ((error) => {
            console.log(error)
        })
    } 

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
            <Grid item xs={3}>  
                <Paper elevation={3} style={{ padding: '30px' }}>
                    <Typography variant="h5" gutterBottom> Please Login to Continue</Typography>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
                        {({ errors, touched }) => (
                            <Form>
                                <Field as={TextField} name="email" label="Email Address" fullWidth margin="normal" error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email}/>
                                <Field as={TextField} name="password" type="password" label="Password" fullWidth margin="normal" error={touched.password && Boolean(errors.password)} helperText={touched.password && errors.password}/>
                                <Button type='submit' variant='contained' color='primary' fullWidth>Register</Button>
                                <Typography sx={{fontSize: 14}}>or</Typography>
                                <Button type='submit' variant='contained' color='primary' fullWidth>Login</Button>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Grid>
        </Grid>
    )
}
export default Login
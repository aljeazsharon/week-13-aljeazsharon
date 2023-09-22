import React from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface UserData {
    name: string;
    email: string;
    password: string;
}

const initialValues = {
    name: '',
    email: '',
    password: '',
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email('Invalid format email address').required(),
    password: Yup.string().required('Password is required'),
});

const Register: React.FC = () => {

    const navigate = useNavigate();
    const handleRegister = async (values: UserData) => {
        console.log(`Registration Success`, values)
        const api = "https://mock-api.arikmpt.com/api/user/register"

        try {
            const response = await fetch (api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            console.log(response)
            const data = await response.json()

            if (response.ok) {
                navigate('/login')
            } else {
                alert(data.errors)
            }
        } catch (error) {alert ("Failed to Register")}
    }
    
    return (
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
            <Grid item xs={3}>
                <Paper elevation={3} style={{ padding: '30px' }}>
                    <Typography variant="h5" gutterBottom>Please Register To Our Platform</Typography>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRegister}>
                        {({ errors, touched }) => (
                            <Form>
                                <Field as={TextField} name="name" label="Name" fullWidth margin="normal" error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name}/>
                                <Field as={TextField} name="email" label="Email Address" fullWidth margin="normal" error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email}/>
                                <Field as={TextField} name="password" type="password" label="Password" fullWidth margin="normal" error={touched.password && Boolean(errors.password)} helperText={touched.password && errors.password} />
                                <Button type="submit" variant='contained' color='primary' fullWidth>Register</Button>
                                <Typography sx={{fontSize: 14}}>or</Typography>
                                <Button type="submit" variant='contained' color='primary' fullWidth>Login</Button>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Register
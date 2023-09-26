import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Grid, Typography, Paper, Link } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Swal from 'sweetalert2'

interface UserData {
    email: string;
    password: string;
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
})

const initialValues = {
    email: '',
    password: '',
}

const Login: React.FC = () => {

    const navigate = useNavigate();

    const handleLogin = (values:UserData) => {
        axios.post('https://mock-api.arikmpt.com/api/user/login', {
            email: values.email,
            password: values.password,
        })
        .then((response) => {
            console.log('Login Success', response.data);
            sessionStorage.setItem('userToken', response.data.data.token);
            Swal.fire({
                icon: 'success',
                title: 'Login Success',
            })
            setInterval(() => { navigate('/home')}, 3000);
        })
        .catch((error) => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: `${error.response.status} Login Failed`,
            })

            if (error.response.status === 500) {
                Swal.fire({
                    icon: 'error',
                })
            }
        })
    }

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={10} md={8}>
                <Paper elevation={3} style={{ padding: '30px' }}>
                    <Typography variant="h5" gutterBottom>Please Login to Continue</Typography>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
                        {({ errors, touched }) => (
                            <Form>
                                <Field as={TextField} name="email" label="Email" variant="outlined" fullWidth margin="normal" error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email}/>
                                <Field as={TextField} type="password" name="password" label="Password" variant="outlined" fullWidth margin="normal" error={touched.password && Boolean(errors.password)} helperText={touched.password && errors.password}/>
                                <Button type="submit" variant="contained" color="primary" style={{ marginTop: "10px" }} fullWidth>Login</Button>
                            </Form>
                        )}
                    </Formik>
                    <Typography variant="body2" gutterBottom style={{ marginTop: "10px" }}>Don't have an account?, <Link component="button" variant="body2" onClick={() => navigate('/register')}>Register here!</Link></Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Login

// import React from 'react';
// import { TextField, Button, Grid, Link, Typography, Paper } from '@mui/material';
// import { Formik, Form, Field } from 'formik';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import * as Yup from 'yup';

// interface UserData {
//     email: string;
//     password: string;
// }

// const initialValues = {
//     email: '',
//     password: '',
// };

// const validationSchema = Yup.object().shape({
//     email: Yup.string().email('Invalid email address or email is not found').required('Email is required the right format'),
//     password: Yup.string().min(8).required('Password is required'),
// })

// const Login: React.FC = () => {
//     const navigate = useNavigate()
//     const handleLogin = (values: UserData) => {
//         axios.post('https://mock-api.arikmpt.com/api/user/login', {
//             email: values.email,
//             password: values.password,
//         })
//         .then((response) => {
//             console.log('Login Success!', response.data)
//             sessionStorage.setItem('userToken', response.data.data.token)
//                 navigate('/home') 
//         })
//         .catch ((error) => {
//             console.log(error)
//         })
//     } 

//     return (
//         <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
//             <Grid item xs={3}>  
//                 <Paper elevation={3} style={{ padding: '30px' }}>
//                     <Typography variant="h5" gutterBottom> Please Login to Continue</Typography>
//                     <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
//                         {({ errors, touched }) => (
//                             <Form>
//                                 <Field as={TextField} name="email" label="Email Address" variant="outlined" fullWidth margin="normal" error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email}/>
//                                 <Field as={TextField} name="password" type="password" label="Password" variant="outlined" fullWidth margin="normal" error={touched.password && Boolean(errors.password)} helperText={touched.password && errors.password}/>
//                                 <Button type='submit' variant='contained' color='primary' fullWidth>Login</Button>
//                             </Form>
//                         )}
//                     </Formik>
//                     <Typography variant='body2'>Don't have an account, <Link component="button" variant='body2' onClick={() => navigate('/register')}>Register Here</Link></Typography>
//                 </Paper>
//             </Grid>
//         </Grid>
//     )
// }
// export default Login
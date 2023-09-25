import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Card, TextField, MenuItem, Typography, CardContent} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { useFetch } from '../../hooks'
import axios from 'axios';
import * as Yup from 'yup';

interface Category {
    id?: string;
    name: string;
    is_active: boolean;
}

interface UserData {
    name: string;
    email: string;
}

const initialValuesAdd = {
    name: '',
    is_active: true,
}

const validationSchema = Yup.object().shape({
    id: Yup.string().required(),
    name: Yup.string().required(),
    is_active: Yup.boolean().required(),
}).required()

const Home: React.FC = () => {
    const [create, setCreate] = useState<boolean>(false)
    const [read, setRead]  = useState<Category[]>([])
    const [update, setUpdate] = useState(false)
    const [toUpdate, setToUpdate] = useState<Category|null>(null)
    const [deleteCat, setDeleteCat] = useState(false)
    const [toDelete, setToDelete] =  useState<Category|null>(null)

    const validate = sessionStorage.getItem('authToken')
    const navigate = useNavigate()

    if(!validate) {
        navigate('/')
    }

    const {loading, error} = useFetch<Category[]>({
        url: 'https://mock-api.arikmpt.com/api/category',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${validate}`
        }
    })

    useEffect(() => {
        FetchData();
    }, [])

    const FetchData = () => {
        axios.get('https://mock-api.arikmpt.com/api/category', {
            headers: {
                Authorization: `Bearer ${validate}`
            }
        })
        .then ((response) => {
            console.log('Success Get Data', response.data.data)
            setRead(response.data.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    const {data: UserData} = useFetch<UserData> ({
        url: 'https://mock-api.arikmpt.com/api/user/profile',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${validate}`
        }
    })

    const handleCreate = () => {
        setCreate(true)
        setCreate(false)
    }

    const handleUpdate = () => {
        setToUpdate(null)
        setUpdate(true)
    }

    const handleDelete = () => {
        setToDelete(null);
        setDeleteCat(false)
    };

    const handleCreateCategory = (values: Category) => {
        console.log("Add New Category")
        const getData = read?.map((item) => item.name)
        if(getData?.includes(values?.name)){
            handleCreate()
            return
        }
        axios.post('https://mock-api.arikmpt.com/api/category/create', {
            name: values?.name,
            is_active: values?.is_active,
        }, {
            headers: {
                Authorization: `Bearer ${validate}`
            }
        })
        .then((response) => {
            handleCreate()
            console.log('Data Add Success', response.data)
            FetchData()
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleUpdateCategory = () => {
        axios.put(`https://mock-api.arikmpt.com/api/category/update`, {
            id: toUpdate?.id,
            name: toUpdate?.name,
            is_active: toUpdate?.is_active,
        },{
            headers: {
                Authorization: `Bearer ${validate}`
            }
        })
        .then((response) => {
            handleUpdate()
            console.log('Data Update Success', response.data)
            FetchData()
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleDeleteCategory = () => {
        axios.delete(`https://mock-api.arikmpt.com/api/category/${toDelete?.id}`,{
            headers: {
                Authorization: `Bearer ${validate}`
            }
        })
        .then ((response) => {
            handleDelete()
            console.log('Data Deleted', response.data)
            FetchData()
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <Formik initialValues={initialValuesAdd} validationSchema={validationSchema} onSubmit={handleCreateCategory}>
               {({touched, errors}) => 
                 <Form>
                    <div className='Content-Category'>
                        <Card>
                             <CardContent className={'Category-content'}>
                                <Typography sx={{ fontSize: 14 }}>Add Category</Typography>
                                <Field as={TextField} type="text" name="name" label="Name" fullWidth margin="normal" error={touched.name && Boolean(errors.name)}></Field>
                                <Field as={TextField} type="text" select name="is_active" label="Status" fullWidth margin="normal" error={touched.is_active && Boolean(errors.is_active)}></Field>
                                <MenuItem value="true">Active</MenuItem>
                                <MenuItem value="false">De-Active</MenuItem>
                            </CardContent>
                        </Card>
                    </div>
                    <Button variant='contained' color='primary' type='submit'>Save</Button>
                </Form>
               }
            </Formik>

            <Formik initialValues={initialValuesAdd} validationSchema={validationSchema} onSubmit={handleUpdateCategory}>
                 <Form>
                    <div className='Content-Category'>
                        <Card>
                             <CardContent className={'Category-content'}>
                                <Typography sx={{ fontSize: 14 }}>Edit Category</Typography>
                                <TextField label="Name" value={toUpdate?.name || ''}
                                    onChange={(e) => {
                                        if (toUpdate) {
                                            setToUpdate({ ...toUpdate, name: e.target.value });
                                        }
                                    }} fullWidth> 
                                </TextField>

                                <TextField label="Status" select value={toUpdate?.is_active ? 'active' : 'deactive'}
                                    onChange={(e) => {
                                        if (toUpdate) {
                                            setToUpdate({ ...toUpdate, is_active: e.target.value === 'active' });
                                        }
                                    }} fullWidth>
                                </TextField>
                                <MenuItem value="true">Active</MenuItem>
                                <MenuItem value="false">De-Active</MenuItem>
                            </CardContent>
                        </Card>
                    </div>
                    <Button variant='contained' color='primary' type='submit'>Save</Button>
                </Form>
            </Formik>

            <Formik initialValues={initialValuesAdd} validationSchema={validationSchema} onSubmit={handleDeleteCategory}>
                 <Form>
                    <div className='Content-Category'>
                        <Card>
                             <CardContent className={'Category-content'}>
                                <Typography sx={{ fontSize: 14 }}>Delete</Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <Button variant='contained' color='error' onClick={() => handleDelete} type='submit'>Delete</Button>
                </Form>
            </Formik>
        </>
    )
}

export default Home
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Box, Container, Typography, TextField, MenuItem, DialogContent, Dialog} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useFetch } from '../../hooks'
import axios from 'axios'
import Swal from 'sweetalert2'

interface DataCategory {
    id?: number;
    name: string;
    is_active: boolean;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    is_active: Yup.boolean().required()
  })

const initialValuesAdd = {
    name: '',
    is_active: true,
}

const Home: React.FC = () => {
    const [createData, setCreateData] = useState<boolean>(false)
    const [updateData, setUpdateData] = useState(false)
    const [deleteData, setDeleteData] = useState(false)
    const [createRow, setCreateRow] = useState<DataCategory[]>([])
    const [updateRow, setUpdateRow] = useState<DataCategory|null>(null)
    const [deleteRow, setDeleteRow] = useState<DataCategory|null>(null)

    const validate = sessionStorage.getItem('userToken')
    const navigate = useNavigate()

    if(!validate) {
        navigate('/')
    }

    const { error } = useFetch<DataCategory[]>({
        url: 'https://mock-api.arikmpt.com/api/category',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${validate}`
        }
    })

    useEffect(() => { 
        fetchData()
      }, []);

    const fetchData = () => {
        axios.get('https://mock-api.arikmpt.com/api/category', {
            headers: {
                Authorization: `Bearer ${validate}`
            }
        })
        .then((response) => {
            console.log('Success Get Data', response.data.data)
            setCreateRow(response.data.data)
        })
        .catch((error) => {
            console.log(error)
            Swal.fire({
                icon: 'error',
                text: 'An error occurred during get. Please try again.'
            })
        })
    }

    const handleCreateData = () => {
        setCreateData(true)
    }

    const handleUpdateData = (row: DataCategory) => {
        setUpdateRow(row)
        setUpdateData(true)
    }

    const handleDeleteData = (row: DataCategory) => {
        setDeleteRow(row)
        setDeleteData(true)
    }

    const handleCloseData = () => {
        setUpdateRow(null)
        setDeleteRow(null)
        setCreateData(false)
        setUpdateData(false)
        setDeleteData(false)
    }

    const handleCreateCategory = (values: DataCategory) => {
        console.log("Add New Category")
        const getNewData = createRow?.map((item) => item.name);
        if (getNewData?.includes(values?.name)) {
            handleCloseData()
            Swal.fire({
                icon: 'error',
                text: 'Failed to get data'
            })
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
            handleCloseData()
            console.log('Data Add Success', response.data)
            Swal.fire({
                icon: 'success',
                title: 'New Data Category add!',
            })
            fetchData()
        })
        .catch((error) => {
            console.log(error)
            Swal.fire({
                icon: 'error',
                text: 'An error occurred during add new category. Please try again.',
            })
        })
    }

    const handleUpdateCategory = () => {
        axios.put(`https://mock-api.arikmpt.com/api/category/update`, {
            id: updateRow?.id,
            name: updateRow?.name,
            is_active: updateRow?.is_active,
        },{ headers: {
                Authorization: `Bearer ${validate}`
            }
        })
        .then((response) => {
            handleCloseData()
            console.log('Data Update Success', response.data)
            Swal.fire({
                icon: 'success',
                title: 'Data Updated!',
            })
            fetchData()
        })
        .catch((error) => {
            console.log(error)
            Swal.fire({
                icon: 'error',
                text: 'An error occurred during update data. Please try again.',
            })
        })
    }

    const handleDeleteCategory = () => {
        axios.delete(`https://mock-api.arikmpt.com/api/category/${deleteRow?.id}`,
        { headers: {
                Authorization: `Bearer ${validate}`
            }
        })
        .then ((response) => {
            handleCloseData()
            console.log('Data Deleted', response.data)
            Swal.fire({
                icon: 'success',
                title: 'Data Deleted!'
            })
            fetchData()
        })
        .catch((error) => {
            console.log(error)
            Swal.fire({
                icon: 'error',
                text: 'An error occurred during deleting data. Please try again.',
            })
        })
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 300 },
        { field: 'name', headerName: 'Name', width: 150},
        { field: 'is_status', headerName: 'Status', width: 150, filterable: false,
          renderCell: (params) => (<div>{params.row.is_active ? 'Active' : 'Inactive'}</div>)
        },
        {
          field: 'action',
          headerName: 'Action',
          filterable: false,
          sortable: false,
          width: 200,
          editable: true,
          renderCell: (params) => (
                <div>
                    <Button variant='contained' color='primary' size='small' onClick={(e)=> {
                            console.log(params.row)
                            e.stopPropagation()
                            handleUpdateData(params.row)}}>Edit</Button>
                    <Button variant='contained' color='error' size='small' onClick={(e)=> {
                            e.stopPropagation()
                            handleDeleteData(params.row)}}>Delete</Button>
                </div>
            )
        }
    ]

    if (error) {
        return <div>Error while fetching data...</div>
    }

    if (!validate) {
        window.location.replace('/')
    }

    const handleLogout = () => {
        sessionStorage.removeItem('userToken')
        window.location.replace('/')
    }

    return (
        <>
        <Formik initialValues={initialValuesAdd} validationSchema={validationSchema} onSubmit={handleCreateCategory}>
          {({errors, touched}) => (
            <Dialog style={{padding: '20px'}} open={createData} onClose={handleCloseData}>
              <Form>
                <Typography sx={{ fontSize: 14 }}>Add New Category</Typography>
                <DialogContent>
                  <Field type="text" as={TextField} name="name" label="Name" style={{ margin: '10px 0' }} fullWidth error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name}></Field>
                  <Field type="text" as={TextField} name="is_active" label="Status" select style={{ margin: '10px 0' }} fullWidth error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name}>
                    <MenuItem value="true">Active</MenuItem>
                    <MenuItem value="false">Inactive</MenuItem>
                  </Field>
                  <Button onClick={handleCloseData}>Back</Button>
                  <Button variant='contained' color='primary' type='submit'>Save</Button>
                </DialogContent>
              </Form>
            </Dialog>
          )}
        </Formik>

        <Dialog open={updateData} onClose={handleCloseData}>
          <Typography>Update Category</Typography>
          <DialogContent>
            <TextField label="Name" value={updateRow?.name || ''} style={{ margin: '10px 0' }} fullWidth onChange={(e) => {if (updateRow) { setUpdateRow({ ...updateRow, name: e.target.value })}}}></TextField>
            <TextField label="Status" select value={updateRow?.is_active ? 'Active' : 'Inactive'} style={{ margin: '10px 0' }} fullWidth onChange={(e) => {if (updateRow) { setUpdateRow({ ...updateRow, is_active: e.target.value === 'Active'})}}}>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </DialogContent>
          <Button onClick={handleCloseData}>Back</Button>
          <Button variant='contained' color='primary' onClick={()=>{handleUpdateCategory()}}>Update</Button>
        </Dialog>

        <Dialog open={deleteData} onClose={handleCloseData}>
          <Typography>Delete Category</Typography>
          <Button onClick={handleCloseData}>Back</Button>
          <Button variant='outlined' color='error' onClick={()=>{handleDeleteCategory()}}>Delete</Button>
        </Dialog>

        <Container fixed>
        <Button variant='contained' color='secondary' onClick={handleCreateData}>Add New Category</Button>
        <Button variant='contained' color='error' onClick={handleLogout}>Logout</Button>
        </Container>

        <Box sx = {{height: 400, width: '100%'}}>
            <div>
                {createRow ? (
                <DataGrid rows={createRow} columns={columns} initialState={{ 
                    pagination: {
                        paginationModel: { 
                            pageSize: 5 }
                        }
                    }}
                    style={{ backgroundColor: '#fff' }}
                    pageSizeOptions={[5]}
                    />
                    ) : (<div>No Data Found.</div>)
                }
            </div>
        </Box>
        </>
    )
}

export default Home

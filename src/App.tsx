import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Register, Login, Home } from './pages'

import './App.css'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login/>
    },
    {
      path: '/register',
      element: <Register/>
    },
    {
      path: '/home',
      element: <Home/>
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
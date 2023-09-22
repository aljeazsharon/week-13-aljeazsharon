import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Register, Login, Home } from './pages'

import './App.css'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Register/>
    },
    {
      path: '/login',
      element: <Login/>
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
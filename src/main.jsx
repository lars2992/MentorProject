import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Fruits from './components/Fruits.jsx'
import Home from './components/Home.jsx'
import NotFound from './components/NotFound.jsx'
import Auth from './components/Auth.jsx'
import UserDashboard from './components/UserDashboard.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import MainLayout from './components/MainLayout.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    // element: <Home />, эта строка была до Navigate
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Auth />
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/dashboard',
        element: <UserDashboard />
      },
      {
        path: '/admin',
        element: <AdminDashboard />
      },
      {
        path: '/fruits',
        element: <Fruits />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  },
])

createRoot(document.getElementById('root')).render(
  // <RouterProvider router={router}>
  //   <StrictMode>
  //     <App />
  //   </StrictMode>
  // </RouterProvider>
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)

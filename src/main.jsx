import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Fruits from './components/Fruits.jsx'
import Home from './components/Home.jsx'
import NotFound from './components/NotFound.jsx'
import Auth from './components/Auth.jsx'
import UserDashboard from './components/UserDashboard.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/fruits',
    element: <Fruits />
  },
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '/login',
    element: <Auth />
  },
  {
    path: '/dashboard',
    element: <UserDashboard />
  },
  {
    path: '/admin',
    element: <AdminDashboard />
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <StrictMode>
      <App />
    </StrictMode>
  </RouterProvider>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Fruits from './components/Fruits.jsx'
import Home from './components/Home.jsx'
import NotFound from './components/NotFound.jsx'

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
    path: '/404',
    element: <NotFound />
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <StrictMode>
      <App />
    </StrictMode>
  </RouterProvider>
)

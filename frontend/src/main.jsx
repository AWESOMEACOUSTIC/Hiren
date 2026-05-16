import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './styles/index.css'
import router from './routes/index.jsx'

createRoot(document.getElementById('root')).render(
        <RouterProvider router={router} />,
)

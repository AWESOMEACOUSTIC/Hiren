import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './styles/index.css'
import router from './routes/index.jsx'
import { AuthProvider } from './features/auth/state/auth.context.jsx'

createRoot(document.getElementById('root')).render(
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './styles/index.css'
import router from './routes/index.jsx'
import { AuthProvider } from './features/auth/state/auth.context.jsx'
import { InterviewProvider } from './features/resume-analysis/state/resumeAnalysis.jsx'

createRoot(document.getElementById('root')).render(
        <AuthProvider>
            <InterviewProvider>
                <RouterProvider router={router} />
            </InterviewProvider>
        </AuthProvider>
)

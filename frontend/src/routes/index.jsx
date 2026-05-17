import { createBrowserRouter } from 'react-router'
import App from '../app/App.jsx'
import ProtectedRoute from '../features/auth/components/ProtectedRoute.jsx'
import Login from '../features/auth/pages/Login.jsx'
import Register from '../features/auth/pages/Register.jsx'
import Home from '../pages/public/Home.jsx'
import NotFound from '../pages/public/NotFound.jsx'
import ResumeAnalysis from '../features/resume-analysis/pages/ResumeAnalysis.jsx'
import Dashboard from '../features/dashboard/pages/Dashboard.jsx'
import { DashboardReportsProvider } from '../features/dashboard/state/dashboardReports.jsx'

const router = createBrowserRouter([
  {
    path: '/auth/login',
    element: <Login />,
  },
  {
    path: '/auth/register',
    element: <Register />,
  },
  {
    path: '/auth/resume-analysis',
    element:  <ResumeAnalysis />
  },
  {
    path: '/auth/dashboard/:reportId?',
    element: (
      <DashboardReportsProvider>
        <Dashboard />
      </DashboardReportsProvider>
    )
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          { index: true, element: <Home /> },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
])

export default router

import { createBrowserRouter } from 'react-router'
import App from '../app/App.jsx'
import Home from '../pages/public/Home.jsx'
import NotFound from '../pages/public/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default router

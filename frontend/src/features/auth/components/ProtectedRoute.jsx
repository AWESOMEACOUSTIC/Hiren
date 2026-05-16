import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'

const ProtectedRoute = () => {
	const { user, loading } = useAuth()
	const location = useLocation()

	if (loading) {
		return (
			<main className="min-h-screen w-full bg-[#0b0b10] text-white">
				<div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-10">
					<h1>Loading...</h1>
				</div>
			</main>
		)
	}

	if (!user) {
		return <Navigate to="/auth/login" replace state={{ from: location }} />
	}

	return <Outlet />
}

export default ProtectedRoute

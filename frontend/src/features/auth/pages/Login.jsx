import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import AuthDivider from '../components/AuthDivider.jsx'
import AuthLayout from '../components/AuthLayout.jsx'
import AuthSocialButtons from '../components/AuthSocialButtons.jsx'
import PasswordField from '../components/PasswordField.jsx'
import TextField from '../components/TextField.jsx'
import { useAuth } from '../hooks/useAuth.js'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const isReady = email.trim().length > 0 && password.trim().length > 0
	const showPasswordError = Boolean(error)
    
	const { user, loading, handleLogin } = useAuth()
	const navigate = useNavigate()
	const canSubmit = isReady && !loading

	if (user) {
		return <Navigate to="/auth/resume-analysis" replace />
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (!isReady) {
			return
		}

		if (password.length < 8) {
			setError('Password should be at least 8 characters.')
			return
		}

		try {
			await handleLogin({ email, password })
			navigate('/')
		} catch (error) {
			setError('Incorrect email or password. Please try again.')
		}
	}
    
	const handleEmailChange = (event) => {
		setEmail(event.target.value)
		if (error) {
			setError('')
		}
	}

	const handlePasswordChange = (event) => {
		setPassword(event.target.value)
		if (error) {
			setError('')
		}
	}

	return (
		<AuthLayout
			subtitle="Log in to Hiren to continue to your workspace."
			title="Welcome!"
		>
			<AuthSocialButtons actionLabel="Log in" />
			<AuthDivider />
			<form className="space-y-5" onSubmit={handleSubmit}>
				<TextField
					label="Email"
					name="email"
					onChange={handleEmailChange}
					placeholder="Your email address"
					type="email"
					value={email}
				/>
				<PasswordField
					errorMessage={error}
					hasError={showPasswordError}
					label="Password"
					labelAction={
						<button
							className="text-xs text-[color:var(--auth-violet-300)] opacity-80"
							type="button"
						>
							Forgot password?
						</button>
					}
					name="password"
					onChange={handlePasswordChange}
					placeholder="Your password"
					value={password}
				/>
				<button
					className={`mt-2 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
						canSubmit
							? 'bg-[color:var(--auth-violet-400)] text-[color:var(--auth-text-black)] shadow-[0_0_30px_var(--auth-shadow-violet)] hover:bg-[color:var(--auth-violet-300)]'
							: 'bg-[color:var(--auth-white-10)] text-[color:var(--auth-white-40)]'
					}`}
					disabled={!canSubmit}
					type="submit"
				>
					<span className="inline-flex items-center justify-center">
						{loading ? 'Signing in...' : 'Log in'}
						{loading && (
							<span
								aria-hidden="true"
								className="ml-2 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
							/>
						)}
					</span>
				</button>
			</form>
			<p className="mt-6 text-center text-xs text-[color:var(--auth-white-50)]">
				Don&apos;t have an account?{' '}
				<Link className="text-[color:var(--auth-violet-300)]" to="/auth/register">
					Sign up
				</Link>
			</p>
		</AuthLayout>
	)
}

export default Login

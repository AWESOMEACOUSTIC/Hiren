import { useState } from 'react'
import { Link } from 'react-router'
import AuthDivider from '../components/AuthDivider.jsx'
import AuthLayout from '../components/AuthLayout.jsx'
import AuthSocialButtons from '../components/AuthSocialButtons.jsx'
import PasswordField from '../components/PasswordField.jsx'
import TextField from '../components/TextField.jsx'

const Register = () => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')

	const isReady =
		username.trim().length > 0 &&
		email.trim().length > 0 &&
		password.trim().length > 0 &&
		confirmPassword.trim().length > 0

	const passwordsMismatch =
		confirmPassword.trim().length > 0 && password !== confirmPassword
	const showPasswordError = Boolean(error) || passwordsMismatch

	const handleSubmit = (event) => {
		event.preventDefault()
		if (!isReady) {
			return
		}

		if (password.length < 8) {
			setError('Password should be at least 8 characters.')
			return
		}

		if (password !== confirmPassword) {
			setError('Passwords do not match.')
			return
		}

		setError('')
	}

	const clearError = () => {
		if (error) {
			setError('')
		}
	}

	return (
		<AuthLayout
			subtitle="Join Hiren and start building your profile today."
			title="Create account"
		>
			<AuthSocialButtons actionLabel="Sign up" />
			<AuthDivider />
			<form className="space-y-5" onSubmit={handleSubmit}>
				<TextField
					label="Username"
					name="Username"
					onChange={(event) => {
						setUsername(event.target.value)
						clearError()
					}}
					placeholder="Username"
					type="text"
					value={username}
				/>
				<TextField
					label="Email"
					name="email"
					onChange={(event) => {
						setEmail(event.target.value)
						clearError()
					}}
					placeholder="Your email address"
					type="email"
					value={email}
				/>
				<PasswordField
					label="Password"
					name="password"
					onChange={(event) => {
						setPassword(event.target.value)
						clearError()
					}}
					placeholder="Create a password"
					value={password}
				/>
				<PasswordField
					errorMessage={error || 'Passwords do not match.'}
					hasError={showPasswordError}
					label="Confirm password"
					name="confirmPassword"
					onChange={(event) => {
						setConfirmPassword(event.target.value)
						clearError()
					}}
					placeholder="Confirm your password"
					value={confirmPassword}
				/>
				<button
					className={`mt-2 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
						isReady
							? 'bg-violet-400 text-black shadow-[0_0_30px_rgba(167,139,250,0.35)] hover:bg-violet-300'
							: 'bg-white/10 text-white/40'
					}`}
					disabled={!isReady}
					type="submit"
				>
					Create account
				</button>
			</form>
			<p className="mt-6 text-center text-xs text-white/50">
				Already have an account?{' '}
				<Link className="text-violet-300" to="/auth/login">
					Sign in
				</Link>
			</p>
		</AuthLayout>
	)
}

export default Register

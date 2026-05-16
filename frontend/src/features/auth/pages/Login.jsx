import { useState } from 'react'
import { Link } from 'react-router'
import AuthDivider from '../components/AuthDivider.jsx'
import AuthLayout from '../components/AuthLayout.jsx'
import AuthSocialButtons from '../components/AuthSocialButtons.jsx'
import PasswordField from '../components/PasswordField.jsx'
import TextField from '../components/TextField.jsx'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const isReady = email.trim().length > 0 && password.trim().length > 0
	const showPasswordError = Boolean(error)

	const handleSubmit = (event) => {
		event.preventDefault()
		if (!isReady) {
			return
		}

		if (password.length < 8) {
			setError('Incorrect password. Please try again.')
			return
		}

		setError('')
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
						<button className="text-xs text-violet-300/80" type="button">
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
						isReady
							? 'bg-violet-400 text-black shadow-[0_0_30px_rgba(167,139,250,0.35)] hover:bg-violet-300'
							: 'bg-white/10 text-white/40'
					}`}
					disabled={!isReady}
					type="submit"
				>
					Log in
				</button>
			</form>
			<p className="mt-6 text-center text-xs text-white/50">
				Don&apos;t have an account?{' '}
				<Link className="text-violet-300" to="/auth/register">
					Sign up
				</Link>
			</p>
		</AuthLayout>
	)
}

export default Login

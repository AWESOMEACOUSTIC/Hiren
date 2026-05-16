import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const PasswordField = ({
	label,
	labelAction,
	hasError = false,
	errorMessage = '',
	...inputProps
}) => {
	const [showPassword, setShowPassword] = useState(false)

	const labelContent = labelAction ? (
		<span className="flex items-center justify-between">
			{label}
			{labelAction}
		</span>
	) : (
		label
	)

	return (
		<label className="block text-xs text-white/60">
			{labelContent}
			<div className="relative mt-2">
				<input
					aria-invalid={hasError}
					className={`w-full rounded-lg border bg-white/5 px-3.5 py-2.5 pr-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 ${
						hasError
							? 'border-rose-500/70 focus:border-rose-400 focus:ring-rose-500/20'
							: 'border-white/10 focus:border-violet-400/70 focus:ring-violet-500/20'
					}`}
					type={showPassword ? 'text' : 'password'}
					{...inputProps}
				/>
				<button
					className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white"
					onClick={() => setShowPassword((value) => !value)}
					type="button"
				>
					{showPassword ? (
						<EyeOff className="h-4 w-4" />
					) : (
						<Eye className="h-4 w-4" />
					)}
				</button>
			</div>
			{hasError && errorMessage ? (
				<p className="mt-2 text-xs text-rose-400">{errorMessage}</p>
			) : null}
		</label>
	)
}

export default PasswordField

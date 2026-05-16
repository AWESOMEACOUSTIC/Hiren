import { Apple, Globe } from 'lucide-react'

const AuthSocialButtons = ({ actionLabel }) => {
	return (
		<div className="mt-6 space-y-3">
			<button
				className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/10"
				type="button"
			>
				<Globe className="h-4 w-4" />
				{actionLabel} with Google
			</button>
			<button
				className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/10"
				type="button"
			>
				<Apple className="h-4 w-4" />
				{actionLabel} with Apple
			</button>
		</div>
	)
}

export default AuthSocialButtons

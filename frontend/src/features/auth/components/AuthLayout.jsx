import { ChevronDown, Sparkles } from 'lucide-react'

const AuthLayout = ({ title, subtitle, children }) => {
	return (
		<div className="min-h-screen w-full bg-[#0b0b10] text-white">
			<div className="relative min-h-screen w-full overflow-hidden bg-black/60">
				<div className="pointer-events-none absolute inset-0">
					<div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[120px]" />
					<div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />
					<div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-purple-500/10 blur-[130px]" />
				</div>

				<div className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-10 font-['Space_Grotesk'] sm:px-10">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 text-sm font-semibold">
							<span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/20">
								<Sparkles className="h-4 w-4 text-violet-300" />
							</span>
							<span>Hiren</span>
						</div>
						<button
							className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
							type="button"
						>
							English
							<ChevronDown className="h-3.5 w-3.5" />
						</button>
					</div>

					<div className="mt-10">
						<h1 className="text-2xl font-semibold">{title}</h1>
						<p className="mt-2 text-sm text-white/50">{subtitle}</p>
					</div>

					{children}
				</div>
			</div>
		</div>
	)
}

export default AuthLayout

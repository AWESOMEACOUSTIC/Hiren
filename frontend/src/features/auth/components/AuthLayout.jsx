import { ArrowRight, ChevronDown, Play, Sparkles } from 'lucide-react'

const AuthSidePanel = () => {
	return (
		<div className="relative px-8 py-10">
			<div className="absolute inset-0 hidden md:block">
				<div className="absolute right-10 top-6 text-[150px] font-semibold text-white/5">
					3D
				</div>
			</div>

			<div className="relative">
				<div className="flex items-start justify-between">
					<h2 className="max-w-xs text-2xl font-semibold text-white/80">
						400K+ users. <span className="text-white/50">50M+ AI generated graphics.</span>
					</h2>
					<button className="flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-400/10 px-3.5 py-1.5 text-xs text-violet-200 shadow-[0_0_20px_rgba(167,139,250,0.25)]">
						Join Now
						<ArrowRight className="h-3.5 w-3.5" />
					</button>
				</div>

				<div className="relative mt-14 flex items-center justify-center">
					<div className="absolute h-56 w-56 rounded-full border border-violet-500/30" />
					<div className="absolute h-72 w-72 rounded-full border border-violet-500/10" />
					<div className="absolute h-36 w-72 rounded-full border border-violet-500/30" />

					<div className="relative h-52 w-32 rounded-2xl border border-white/10 bg-linear-to-b from-white/10 via-white/5 to-transparent shadow-[0_35px_70px_rgba(0,0,0,0.6)]">
						<div className="absolute -top-5 left-1/2 h-10 w-20 -translate-x-1/2 rounded-lg border border-white/10 bg-white/10" />
						<div className="absolute inset-x-4 top-6 h-px border-t border-dashed border-white/20" />
						<div className="absolute left-1/2 top-10 flex w-14 -translate-x-1/2 items-center justify-between">
							<span className="h-1.5 w-1.5 rounded-full bg-white/30" />
							<span className="h-1.5 w-1.5 rounded-full bg-white/30" />
							<span className="h-1.5 w-1.5 rounded-full bg-white/30" />
						</div>
						<div className="absolute inset-x-4 bottom-10 h-px border-t border-white/10" />
					</div>

					<div className="absolute -left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-violet-400 text-black shadow-[0_12px_30px_rgba(167,139,250,0.45)]">
						<Play className="h-4 w-4" fill="currentColor" stroke="none" />
					</div>
				</div>
			</div>
		</div>
	)
}

const AuthLayout = ({ title, subtitle, children }) => {
	return (
		<div className="relative min-h-screen bg-[#0b0b10] text-white">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[120px]" />
				<div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />
				<div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-purple-500/10 blur-[130px]" />
			</div>

			<div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-10 font-['Space_Grotesk']">
				<div className="w-full overflow-hidden rounded-[28px] border border-white/10 bg-black/60 shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur">
					<div className="grid md:grid-cols-[1.05fr_1fr]">
						<div className="border-b border-white/10 px-8 py-8 md:border-b-0 md:border-r">
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

						<AuthSidePanel />
					</div>
				</div>
			</div>
		</div>
	)
}

export default AuthLayout

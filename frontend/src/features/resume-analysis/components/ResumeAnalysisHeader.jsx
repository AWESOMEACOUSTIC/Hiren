const ResumeAnalysisHeader = () => (
	<header className="relative border-b border-[#2e292a]">
		<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
			<div className="flex items-center gap-6">
				<div className="flex items-center gap-3">
					<span className="text-lg font-semibold tracking-wide text-[#f2b7c6]">
						InterviewAI
					</span>
				</div>
				<nav className="hidden items-center gap-5 text-sm text-[#d4c2c5] md:flex">
					<button className="transition hover:text-[#ebe0e1]">Dashboard</button>
					<button className="relative text-[#ebe0e1]">
						My Plans
						<span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-[#f2b7c6]" />
					</button>
					<button className="transition hover:text-[#ebe0e1]">Resources</button>
				</nav>
			</div>
			<div className="flex items-center gap-3">
				<button
					className="rounded-full border border-[#504446] p-2 text-[#d4c2c5] transition hover:border-[#9d8d90] hover:text-[#ebe0e1]"
					type="button"
				>
					<span className="sr-only">Settings</span>
					<svg
						aria-hidden="true"
						className="h-4 w-4"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
						viewBox="0 0 24 24"
					>
						<path d="M11.983 3a1 1 0 0 1 .99.858l.2 1.496a7.47 7.47 0 0 1 1.79.73l1.3-.81a1 1 0 0 1 1.28.148l1.41 1.41a1 1 0 0 1 .148 1.28l-.81 1.3a7.47 7.47 0 0 1 .73 1.79l1.496.2a1 1 0 0 1 .858.99v1.994a1 1 0 0 1-.858.99l-1.496.2a7.47 7.47 0 0 1-.73 1.79l.81 1.3a1 1 0 0 1-.148 1.28l-1.41 1.41a1 1 0 0 1-1.28.148l-1.3-.81a7.47 7.47 0 0 1-1.79.73l-.2 1.496a1 1 0 0 1-.99.858h-1.994a1 1 0 0 1-.99-.858l-.2-1.496a7.47 7.47 0 0 1-1.79-.73l-1.3.81a1 1 0 0 1-1.28-.148l-1.41-1.41a1 1 0 0 1-.148-1.28l.81-1.3a7.47 7.47 0 0 1-.73-1.79l-1.496-.2a1 1 0 0 1-.858-.99V12.01a1 1 0 0 1 .858-.99l1.496-.2a7.47 7.47 0 0 1 .73-1.79l-.81-1.3a1 1 0 0 1 .148-1.28l1.41-1.41a1 1 0 0 1 1.28-.148l1.3.81a7.47 7.47 0 0 1 1.79-.73l.2-1.496a1 1 0 0 1 .99-.858h1.994Z" />
						<circle cx="12" cy="12" r="3" />
					</svg>
				</button>
				<button
					className="rounded-full border border-[#504446] p-2 text-[#d4c2c5] transition hover:border-[#9d8d90] hover:text-[#ebe0e1]"
					type="button"
				>
					<span className="sr-only">Help</span>
					<svg
						aria-hidden="true"
						className="h-4 w-4"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
						viewBox="0 0 24 24"
					>
						<path d="M12 18h.01" />
						<path d="M9.09 9a3 3 0 0 1 5.82 1c0 2-3 2-3 4" />
						<circle cx="12" cy="12" r="9" />
					</svg>
				</button>
				<button
					className="rounded-full border border-[#504446] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#f2b7c6] transition hover:border-[#9d8d90]"
					type="button"
				>
					Sign in
				</button>
			</div>
		</div>
	</header>
)

export default ResumeAnalysisHeader

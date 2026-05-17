const IconSettings = ({ className }) => (
	<svg
		aria-hidden="true"
		className={className}
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="1.5"
		viewBox="0 0 24 24"
	>
		<path d="M12 8a4 4 0 1 0 4 4" />
		<path d="M12 4v2" />
		<path d="M12 18v2" />
		<path d="M4 12h2" />
		<path d="M18 12h2" />
		<path d="m6.3 6.3 1.4 1.4" />
		<path d="m16.3 16.3 1.4 1.4" />
		<path d="m6.3 17.7 1.4-1.4" />
		<path d="m16.3 7.7 1.4-1.4" />
	</svg>
)

const IconUser = ({ className }) => (
	<svg
		aria-hidden="true"
		className={className}
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="1.5"
		viewBox="0 0 24 24"
	>
		<path d="M12 12a4 4 0 1 0-4-4" />
		<path d="M4 20a8 8 0 0 1 16 0" />
	</svg>
)

const TopBar = () => (
	<div className="flex items-center justify-between border-b border-[#2a2932] pb-4">
		<p className="text-sm font-semibold text-[#c9c4d7]">DevMetrics Pro</p>
		<div className="flex items-center gap-3">
			<button
				className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2a2932] bg-[#1c1b23] text-[#c9c4d7] transition hover:text-[#e5e0ed]"
				type="button"
			>
				<IconSettings className="h-4 w-4" />
			</button>
			<button
				className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2a2932] bg-[#1c1b23] text-[#c9c4d7] transition hover:text-[#e5e0ed]"
				type="button"
			>
				<IconUser className="h-4 w-4" />
			</button>
		</div>
	</div>
)

export default TopBar

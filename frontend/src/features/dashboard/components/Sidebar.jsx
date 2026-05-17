import SidebarItem from './SidebarItem.jsx'

const IconTerminal = ({ className }) => (
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
		<path d="M5 6h14v12H5z" />
		<path d="m8 10 3 2-3 2" />
		<path d="M13 14h4" />
	</svg>
)

const IconCode = ({ className }) => (
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
		<path d="m9 8-4 4 4 4" />
		<path d="m15 8 4 4-4 4" />
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

const IconMap = ({ className }) => (
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
		<path d="M4 6l6-2 4 2 6-2v14l-6 2-4-2-6 2z" />
		<path d="M10 4v14" />
		<path d="M14 6v14" />
	</svg>
)

const IconBook = ({ className }) => (
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
		<path d="M6 4h11a3 3 0 0 1 3 3v12H6a3 3 0 0 0-3 3V7a3 3 0 0 1 3-3Z" />
		<path d="M6 8h11" />
		<path d="M6 12h11" />
	</svg>
)

const IconHelp = ({ className }) => (
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
		<circle cx="12" cy="12" r="9" />
		<path d="M9.5 9a2.5 2.5 0 1 1 4 2c-.9.6-1.5 1.1-1.5 2" />
		<path d="M12 17h.01" />
	</svg>
)

const Sidebar = ({ activeKey = 'technical', onNavigate }) => {
	const primaryItems = [
		{ key: 'technical', label: 'Technical Questions', icon: IconCode },
		{ key: 'behavioral', label: 'Behavioral Questions', icon: IconUser },
		{ key: 'roadmap', label: 'Road Map', icon: IconMap },
	]

	const supportItems = [
		{ label: 'Documentation', icon: IconBook },
		{ label: 'Support', icon: IconHelp },
	]

	return (
		<div className="flex h-full flex-col justify-between">
			<div className="space-y-8">
				<div className="flex items-center gap-3">
					<span className="flex h-10 w-10 items-center justify-center rounded-md border border-[#35343d] bg-[#2a2932] text-[#c7bfff]">
						<IconTerminal className="h-5 w-5" />
					</span>
					<div>
						<p className="text-sm font-semibold text-[#e5e0ed]">Developer Portal</p>
						<p className="text-[11px] font-['JetBrains_Mono'] uppercase tracking-[0.3em] text-[#928ea0]">
							Workspace
						</p>
					</div>
				</div>

				<nav className="space-y-2">
					<p className="text-[11px] font-['JetBrains_Mono'] uppercase tracking-[0.3em] text-[#928ea0]">
						Navigation
					</p>
					{primaryItems.map((item) => (
						<SidebarItem
							key={item.key}
							active={item.key === activeKey}
							icon={item.icon}
							label={item.label}
							onClick={() => onNavigate?.(item.key)}
						/>
					))}
				</nav>
			</div>

			<div className="space-y-2 border-t border-[#2a2932] pt-4">
				{supportItems.map((item) => (
					<SidebarItem key={item.label} icon={item.icon} label={item.label} />
				))}
			</div>
		</div>
	)
}

export default Sidebar

const SectionTabs = ({ tabs, activeTab }) => (
	<div className="flex items-center gap-6 border-b border-[#2a2932]">
		{tabs.map((tab) => {
			const isActive = tab === activeTab

			return (
				<button
					className={`-mb-px border-b-2 pb-3 text-xs font-['JetBrains_Mono'] uppercase tracking-[0.3em] transition ${
						isActive
							? 'border-[#c7bfff] text-[#e5e0ed]'
							: 'border-transparent text-[#928ea0] hover:text-[#c9c4d7]'
					}`}
					key={tab}
					type="button"
				>
					{tab}
				</button>
			)
		})}
	</div>
)

export default SectionTabs

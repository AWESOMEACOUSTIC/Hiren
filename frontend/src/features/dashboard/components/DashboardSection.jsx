import SectionTabs from './SectionTabs.jsx'

const DashboardSection = ({ title, subtitle, tabs, activeTab, children }) => (
	<section className="space-y-5">
		<div className="space-y-4">
			<div className="space-y-2">
				<h1 className="text-2xl font-semibold text-[#e5e0ed]">{title}</h1>
				<p className="text-sm text-[#c9c4d7]">{subtitle}</p>
			</div>
			{tabs && tabs.length > 0 ? (
				<SectionTabs activeTab={activeTab} tabs={tabs} />
			) : null}
		</div>
		{children}
	</section>
)

export default DashboardSection

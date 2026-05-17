import SurfaceCard from './SurfaceCard.jsx'

const RoadmapCard = ({ phase, title, summary, tags = [], badge = 'Active' }) => (
	<SurfaceCard className="space-y-4">
		<div className="flex items-start justify-between gap-3">
			<div>
				<p className="text-[11px] font-['JetBrains_Mono'] uppercase tracking-[0.3em] text-[#928ea0]">
					{phase}
				</p>
				<h3 className="mt-2 text-lg font-semibold text-[#e5e0ed]">{title}</h3>
			</div>
			<span className="rounded-full border border-[#35343d] bg-[#1c1b23] px-3 py-1 text-[11px] font-['JetBrains_Mono'] uppercase tracking-[0.2em] text-[#c7bfff]">
				{badge}
			</span>
		</div>
		<p className="text-sm text-[#c9c4d7]">{summary}</p>
		{tags.length > 0 ? (
			<div className="flex flex-wrap gap-2">
				{tags.map((tag) => (
					<span
						className="rounded-full border border-[#35343d] bg-[#1c1b23] px-3 py-1 text-[11px] font-['JetBrains_Mono'] uppercase tracking-[0.2em] text-[#c9c4d7]"
						key={tag}
					>
						{tag}
					</span>
				))}
			</div>
		) : null}
	</SurfaceCard>
)

export default RoadmapCard

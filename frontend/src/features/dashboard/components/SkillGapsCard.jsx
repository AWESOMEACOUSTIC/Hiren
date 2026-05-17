import SurfaceCard from './SurfaceCard.jsx'

const IconRadar = ({ className }) => (
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
		<path d="M12 3v6l5 3" />
		<path d="M7 17l5-5" />
	</svg>
)

const IconDots = ({ className }) => (
	<svg
		aria-hidden="true"
		className={className}
		fill="currentColor"
		viewBox="0 0 24 24"
	>
		<circle cx="6" cy="12" r="1.5" />
		<circle cx="12" cy="12" r="1.5" />
		<circle cx="18" cy="12" r="1.5" />
	</svg>
)

const SkillChip = ({ label }) => (
	<span className="rounded-full border border-[#35343d] bg-[#1c1b23] px-3 py-1 text-[11px] font-['JetBrains_Mono'] uppercase tracking-[0.2em] text-[#c9c4d7]">
		{label}
	</span>
)

const SkillGapsCard = ({ gaps }) => (
	<SurfaceCard className="space-y-4">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<span className="flex h-8 w-8 items-center justify-center rounded-md border border-[#2a2932] bg-[#1c1b23] text-[#c7bfff]">
					<IconRadar className="h-4 w-4" />
				</span>
				<p className="text-sm font-semibold text-[#e5e0ed]">Skill Gaps</p>
			</div>
			<button
				className="flex h-7 w-7 items-center justify-center rounded-full border border-[#2a2932] text-[#928ea0]"
				type="button"
			>
				<IconDots className="h-3.5 w-3.5" />
			</button>
		</div>
		<div className="flex flex-wrap gap-2">
			{gaps.map((gap, index) => (
				<SkillChip key={`${gap}-${index}`} label={gap} />
			))}
		</div>
	</SurfaceCard>
)

export default SkillGapsCard

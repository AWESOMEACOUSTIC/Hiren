import SurfaceCard from './SurfaceCard.jsx'

const IconSpec = ({ className }) => (
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
		<path d="M7 4h7l3 3v13H7z" />
		<path d="M14 4v4h4" />
		<path d="M9 12h6" />
		<path d="M9 16h4" />
	</svg>
)

const QuestionCard = ({
	title,
	description,
	intention = 'Clarify the goal, constraints, and success criteria before answering.',
	label = 'Technical Specification',
}) => (
	<SurfaceCard className="space-y-4">
		<h3 className="text-lg font-semibold text-[#e5e0ed]">{title}</h3>
		<div>
			<p className="text-[11px] font-['JetBrains_Mono'] uppercase tracking-[0.3em] text-[#928ea0]">
				Intention
			</p>
			<p className="mt-2 text-sm text-[#c9c4d7]">{intention}</p>
		</div>
		<div className="rounded-lg border border-[#2a2932] bg-[#1c1b23] p-4">
			<div className="flex items-center gap-2 text-[11px] font-['JetBrains_Mono'] uppercase tracking-[0.3em] text-[#c9c4d7]">
				<IconSpec className="h-4 w-4" />
				{label}
			</div>
			<p className="mt-3 text-sm text-[#c9c4d7]">{description}</p>
		</div>
	</SurfaceCard>
)

export default QuestionCard

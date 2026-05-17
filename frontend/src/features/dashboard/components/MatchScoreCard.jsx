import ProgressRing from './ProgressRing.jsx'
import SurfaceCard from './SurfaceCard.jsx'

const IconScore = ({ className }) => (
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
		<circle cx="12" cy="8" r="4" />
		<path d="M5 20a7 7 0 0 1 14 0" />
	</svg>
)

const IconInfo = ({ className }) => (
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
		<path d="M12 16h.01" />
		<path d="M12 8a4 4 0 0 1 4 4v1" />
	</svg>
)

const IconCheck = ({ className }) => (
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
		<path d="m6 12 4 4 8-8" />
	</svg>
)

const IconAlert = ({ className }) => (
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
		<path d="M12 9v4" />
		<path d="M12 17h.01" />
		<path d="M4 20h16L12 4z" />
	</svg>
)

const IconSpark = ({ className }) => (
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
		<path d="m12 3 1.9 4.6L19 9l-4.1 3.1L16 17l-4-2.6L8 17l1.1-4.9L5 9l5.1-1.4z" />
	</svg>
)

const InsightItem = ({ icon: Icon, text, tone }) => (
	<div className="flex items-start gap-2 text-sm text-[#c9c4d7]">
		<span
			className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-[#2a2932] ${
				tone || 'text-[#c7bfff]'
			}`}
		>
			<Icon className="h-3 w-3" />
		</span>
		<span>{text}</span>
	</div>
)

const MatchScoreCard = ({ score, insights }) => (
	<SurfaceCard className="space-y-5">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<span className="flex h-8 w-8 items-center justify-center rounded-md border border-[#2a2932] bg-[#1c1b23] text-[#c7bfff]">
					<IconScore className="h-4 w-4" />
				</span>
				<p className="text-sm font-semibold text-[#e5e0ed]">Resume Match Score</p>
			</div>
			<button
				className="flex h-7 w-7 items-center justify-center rounded-full border border-[#2a2932] text-[#928ea0]"
				type="button"
			>
				<IconInfo className="h-3.5 w-3.5" />
			</button>
		</div>
		<div className="flex items-center justify-center">
			<ProgressRing value={score} />
		</div>
		<div className="space-y-3">
			<p className="text-[11px] font-['JetBrains_Mono'] uppercase tracking-[0.3em] text-[#928ea0]">
				Match Insights
			</p>
			<div className="space-y-2">
				{insights.map((insight, index) => (
					<InsightItem
						key={`${insight.text}-${index}`}
						icon={insight.icon}
						text={insight.text}
						tone={insight.tone}
					/>
				))}
			</div>
		</div>
	</SurfaceCard>
)

export const MatchScoreIcons = {
	Check: IconCheck,
	Alert: IconAlert,
	Spark: IconSpark,
}

export default MatchScoreCard

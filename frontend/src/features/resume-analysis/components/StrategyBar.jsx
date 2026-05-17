import { motion } from 'motion/react'

const StrategyBar = ({ canGenerate, onGenerate, isLoading = false }) => (
	<motion.div
		animate={{ opacity: 1, y: 0 }}
		className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#2e292a] bg-[#1b1718]/80 px-6 py-4 text-sm text-[#d4c2c5] md:flex-row md:items-center"
		initial={{ opacity: 0, y: 16 }}
		transition={{ duration: 0.7, ease: 'easeOut', delay: 0.32 }}
	>
		<span>AI-Powered Strategy Generation - Approx 30s</span>
		<button
			className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
				canGenerate && !isLoading
					? 'border-[#f2b7c6] bg-[#20030d] text-[#f2b7c6] shadow-[0_0_25px_rgba(242,183,198,0.18)] hover:border-[#ffd9e2]'
					: 'border-[#393334] bg-[#231e1f] text-[#9d8d90]'
			}`}
			disabled={!canGenerate || isLoading}
			onClick={onGenerate}
			type="button"
		>
			<span className="flex h-6 w-6 items-center justify-center rounded-full border border-current">
				<svg
					aria-hidden="true"
					className="h-3 w-3"
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
					viewBox="0 0 24 24"
				>
					<path d="M12 5v14" />
					<path d="M5 12h14" />
				</svg>
			</span>
			{isLoading ? 'Generating Strategy...' : 'Generate My Interview Strategy'}
		</button>
	</motion.div>
)

export default StrategyBar

const JobDescriptionCard = ({ value, onChange, maxLength, characterCount }) => (
	<section className="rounded-2xl border border-[#2e292a] bg-[#1f1a1b]/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
		<header className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<span className="rounded-md bg-[#231e1f] p-2 text-[#f2b7c6]">
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
						<path d="M6 4h9l3 3v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
						<path d="M14 4v4h4" />
						<path d="M8 11h8" />
						<path d="M8 15h6" />
					</svg>
				</span>
				<div>
					<p className="text-sm font-semibold text-[#ebe0e1]">Target Job Description</p>
					<p className="text-xs text-[#9d8d90]">Paste the role you are applying for.</p>
				</div>
			</div>
			<span className="rounded-full border border-[#504446] px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-[#f2b7c6]">
				Required
			</span>
		</header>

		<div className="mt-6">
			<textarea
				className="min-h-[280px] w-full rounded-xl border border-[#2e292a] bg-[#171213] px-4 py-3 text-sm text-[#ebe0e1] placeholder:text-[#9d8d90] focus:border-[#f2b7c6] focus:outline-none focus:ring-2 focus:ring-[#f2b7c6]/20"
				maxLength={maxLength}
				onChange={(event) => onChange(event.target.value)}
				placeholder="Paste the full job description here...\n\nE.g. Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design."
				value={value}
			/>
		</div>
		<div className="mt-3 flex items-center justify-between text-xs text-[#9d8d90]">
			<span>
				{characterCount} / {maxLength} chars
			</span>
			<span>Keep it focused and complete for best results.</span>
		</div>
	</section>
)

export default JobDescriptionCard

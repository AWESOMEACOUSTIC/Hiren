import useDragDrop from '../hooks/useDragDrop.js'

const ProfileCard = ({ resumeFile, onResumeChange, selfDescription, onSelfDescriptionChange }) => {
	const {
		isDragging,
		handleInputChange,
		handleDragEnter,
		handleDragOver,
		handleDragLeave,
		handleDrop,
	} = useDragDrop(onResumeChange)

	return (
		<section className="rounded-2xl border border-[#2e292a] bg-[#1f1a1b]/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
			<header className="flex items-center gap-3">
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
						<path d="M12 12a4 4 0 1 0-4-4" />
						<path d="M4 20a8 8 0 0 1 16 0" />
					</svg>
				</span>
				<div>
					<p className="text-sm font-semibold text-[#ebe0e1]">Your Profile</p>
					<p className="text-xs text-[#9d8d90]">Resume upload or quick summary.</p>
				</div>
			</header>

			<div className="mt-6 space-y-5">
				<div>
					<div className="flex items-center justify-between text-xs text-[#d4c2c5]">
						<span>Upload Resume</span>
						<span className="text-[#f2b7c6]">Required</span>
					</div>
					<label
						className={`mt-2 flex min-h-[130px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#504446] bg-[#171213]/60 px-6 text-center text-xs text-[#9d8d90] transition hover:border-[#9d8d90] ${
							isDragging ? 'border-[#f2b7c6] bg-[#231e1f]/70' : ''
						}`}
						aria-label="Upload resume"
						onDragEnter={handleDragEnter}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
					>
						<input
							accept=".pdf,.doc,.docx"
							className="hidden"
							onChange={handleInputChange}
							type="file"
						/>
						<div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#504446] bg-[#231e1f] text-[#f2b7c6]">
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
								<path d="M12 16V6" />
								<path d="m8 10 4-4 4 4" />
								<path d="M8 18h8" />
							</svg>
						</div>
						<p className="font-medium text-[#d4c2c5]">
							{resumeFile ? resumeFile.name : 'Click to upload or drag & drop'}
						</p>
						<p className="text-[10px] uppercase tracking-[0.2em] text-[#9d8d90]">
							PDF or DOCX (Max 5MB)
						</p>
					</label>
				</div>

				<div className="flex items-center gap-3">
					<span className="h-px flex-1 bg-[#2e292a]" />
					<span className="text-[10px] uppercase tracking-[0.3em] text-[#9d8d90]">
						Or
					</span>
					<span className="h-px flex-1 bg-[#2e292a]" />
				</div>

				<div>
					<div className="flex items-center justify-between text-xs text-[#d4c2c5]">
						<span>Quick Self-Description</span>
						<span className="text-[#9d8d90]">Optional</span>
					</div>
					<textarea
						className="mt-2 min-h-[140px] w-full rounded-xl border border-[#2e292a] bg-[#171213] px-4 py-3 text-sm text-[#ebe0e1] placeholder:text-[#9d8d90] focus:border-[#f2b7c6] focus:outline-none focus:ring-2 focus:ring-[#f2b7c6]/20"
						onChange={(event) => onSelfDescriptionChange(event.target.value)}
						placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
						value={selfDescription}
					/>
				</div>

				<div className="rounded-xl border border-[#2e292a] bg-[#171213]/80 px-4 py-3 text-xs text-[#d4c2c5]">
					<span className="inline-flex items-center gap-2 text-[#9d8d90]">
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
							<path d="M12 16h.01" />
							<path d="M12 8a4 4 0 0 1 4 4v1" />
							<circle cx="12" cy="12" r="9" />
						</svg>
						A Resume is required to generate a personalized plan. Self-description is optional.
					</span>
				</div>
			</div>
		</section>
	)
}

export default ProfileCard

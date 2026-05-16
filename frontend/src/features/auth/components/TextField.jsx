const TextField = ({ label, ...inputProps }) => {
	return (
		<label className="block text-xs text-white/60">
			{label}
			<input
				className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-violet-400/70 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
				{...inputProps}
			/>
		</label>
	)
}

export default TextField

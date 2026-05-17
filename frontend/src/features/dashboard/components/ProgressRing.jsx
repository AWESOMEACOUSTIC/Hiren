const ProgressRing = ({ value = 0, size = 132 }) => {
	const clamped = Math.min(100, Math.max(0, value))
	const angle = (clamped / 100) * 360
	const innerSize = Math.round(size * 0.68)

	return (
		<div
			className="relative flex items-center justify-center"
			style={{ height: size, width: size }}
		>
			<div
				className="absolute inset-0 rounded-full"
				style={{
					background: `conic-gradient(#c7bfff ${angle}deg, #2a2932 0deg)`,
				}}
			/>
			<div
				className="relative flex flex-col items-center justify-center rounded-full bg-[#14121b] text-[#e5e0ed]"
				style={{ height: innerSize, width: innerSize }}
			>
				<span className="text-2xl font-semibold">{clamped}%</span>
				<span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-[0.3em] text-[#928ea0]">
					Match
				</span>
			</div>
		</div>
	)
}

export default ProgressRing

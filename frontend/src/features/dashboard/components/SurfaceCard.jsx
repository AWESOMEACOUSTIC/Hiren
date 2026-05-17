const SurfaceCard = ({ children, className = '' }) => (
	<div className={`rounded-xl border border-[#35343d] bg-[#201f27] p-5 ${className}`}>
		{children}
	</div>
)

export default SurfaceCard

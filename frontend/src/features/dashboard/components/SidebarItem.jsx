const SidebarItem = ({ icon: Icon, label, active = false, onClick }) => {
	const baseStyles =
		'relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition'
	const activeStyles =
		"bg-[#201f27] text-[#e5e0ed] before:content-[''] before:absolute before:left-0 before:top-1/2 before:h-6 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-[#c7bfff]"
	const inactiveStyles = 'text-[#c9c4d7] hover:bg-[#1f1e27] hover:text-[#e5e0ed]'
	const iconStyles = active ? 'bg-[#2a2932] text-[#c7bfff]' : 'bg-[#1c1b23] text-[#928ea0]'

	return (
		<button
			aria-current={active ? 'page' : undefined}
			className={`${baseStyles} ${active ? activeStyles : inactiveStyles}`}
			onClick={onClick}
			type="button"
		>
			<span
				className={`flex h-8 w-8 items-center justify-center rounded-md border border-[#2a2932] ${iconStyles}`}
			>
				{Icon ? <Icon className="h-4 w-4" /> : null}
			</span>
			<span className="flex-1">{label}</span>
		</button>
	)
}

export default SidebarItem

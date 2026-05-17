const DashboardLayout = ({ sidebar, rightPanel, children }) => (
	<div className="min-h-screen bg-[#14121b] text-[#e5e0ed] font-['Hanken_Grotesk']">
		<div className="min-h-screen bg-gradient-to-br from-[#14121b] via-[#111019] to-[#0e0d15]">
			<div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col gap-6 px-4 py-6 lg:grid lg:grid-cols-[250px_minmax(0,1fr)_320px] lg:gap-6 lg:px-8">
				<aside className="flex h-full flex-col rounded-xl border border-[#2a2932] bg-[#1c1b23] p-5 lg:sticky lg:top-6 lg:h-[calc(100vh-48px)]">
					{sidebar}
				</aside>
				<main className="flex flex-col gap-6">{children}</main>
				<aside className="flex flex-col gap-6">{rightPanel}</aside>
			</div>
		</div>
	</div>
)

export default DashboardLayout

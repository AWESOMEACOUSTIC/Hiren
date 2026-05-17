import { motion } from 'motion/react'

const ResumeAnalysisHero = ({ title, accent, subtitle }) => (
	<div className="mx-auto max-w-3xl text-center">
		<motion.h1
			animate={{ opacity: 1, y: 0 }}
			className="text-3xl font-semibold leading-tight text-[#ebe0e1] md:text-4xl"
			initial={{ opacity: 0, y: 16 }}
			transition={{ duration: 0.7, ease: 'easeOut' }}
		>
			{title}{' '}
			<span className="text-[#f2b7c6]">{accent}</span>
		</motion.h1>
		<motion.p
			animate={{ opacity: 1, y: 0 }}
			className="mt-3 text-sm text-[#d4c2c5] md:text-base"
			initial={{ opacity: 0, y: 16 }}
			transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
		>
			{subtitle}
		</motion.p>
	</div>
)

export default ResumeAnalysisHero

import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout.jsx'
import DashboardSection from '../components/DashboardSection.jsx'
import MatchScoreCard, { MatchScoreIcons } from '../components/MatchScoreCard.jsx'
import QuestionList from '../components/QuestionList.jsx'
import RoadmapCard from '../components/RoadmapCard.jsx'
import Sidebar from '../components/Sidebar.jsx'
import SkillGapsCard from '../components/SkillGapsCard.jsx'
import TopBar from '../components/TopBar.jsx'

const Dashboard = () => {
	const [activeSection, setActiveSection] = useState('technical')

	const technicalQuestions = [
		{
			title: 'Implement a Distributed Rate Limiter',
			intention:
				'Frame the shared storage model and time-window strategy before choosing data structures.',
			description:
				'Design and implement a scalable rate limiter that can handle requests across multiple servers using a sliding window algorithm. Consider edge cases involving network partitions and clock drift.',
		},
		{
			title: 'Implement a Distributed Rate Limiter',
			intention:
				'Define fairness, burst tolerance, and consistency requirements across regions up front.',
			description:
				'Design and implement a scalable rate limiter that can handle requests across multiple servers using a sliding window algorithm. Consider edge cases involving network partitions and clock drift.',
		},
	]

	const behavioralQuestions = [
		{
			title: 'Leading a Cross-Team Migration',
			intention:
				'Highlight leadership decisions, stakeholder alignment, and measurable outcomes.',
			description:
				'Share a time you led a cross-team migration under a tight deadline. What tradeoffs did you make, and how did you keep stakeholders aligned?',
		},
		{
			title: 'Navigating Conflicting Priorities',
			intention:
				'Show how you communicated risk, negotiated priorities, and built consensus.',
			description:
				'Describe a moment where product goals conflicted with technical constraints. How did you communicate risk and drive a decision?',
		},
	]

	const roadmapItems = [
		{
			phase: 'Phase 01',
			title: 'Foundations of Distributed Systems',
			summary:
				'Build depth in consensus, replication strategies, and fault-tolerant messaging to support senior-level system design rounds.',
			tags: ['Consensus', 'Replication', 'Messaging'],
			badge: 'Active',
		},
		{
			phase: 'Phase 02',
			title: 'Scalable Backend Patterns',
			summary:
				'Strengthen rate limiting, caching, and async workflows using system design drills and targeted practice sessions.',
			tags: ['Caching', 'Rate Limits', 'Queues'],
			badge: 'Next',
		},
	]

	const skillGaps = ['#', '# Message', '# Event', '# Loop', '# Concurrency']

	const insights = [
		{
			icon: MatchScoreIcons.Check,
			text: 'Strong Backend alignment with target roles.',
			tone: 'text-[#c7bfff]',
		},
		{
			icon: MatchScoreIcons.Alert,
			text: 'Missing Kubernetes & Cloud Orchestration experience.',
			tone: 'text-[#ffb4ab]',
		},
		{
			icon: MatchScoreIcons.Spark,
			text: 'Project complexity scores in the top 10%.',
			tone: 'text-[#90cdff]',
		},
	]

	return (
		<DashboardLayout
			rightPanel={
				<>
					<SkillGapsCard gaps={skillGaps} />
					<MatchScoreCard insights={insights} score={85} />
				</>
			}
			sidebar={<Sidebar activeKey={activeSection} onNavigate={setActiveSection} />}
		>
			<TopBar />
			{activeSection === 'technical' ? (
				<DashboardSection
					activeTab="Recent"
					subtitle="Resume your active practice sessions or explore new algorithmic challenges."
					tabs={['Recent', 'Saved']}
					title="Technical Interview Prep"
				>
					<QuestionList questions={technicalQuestions} />
				</DashboardSection>
			) : null}
			{activeSection === 'behavioral' ? (
				<DashboardSection
					subtitle="Practice high-signal narratives for leadership, conflict, and ownership questions."
					title="Behavioral Interview Prep"
				>
					<QuestionList
						label="Behavioral Prompt"
						questions={behavioralQuestions}
					/>
				</DashboardSection>
			) : null}
			{activeSection === 'roadmap' ? (
				<DashboardSection
					subtitle="Track your progression across deep systems topics and targeted interview drills."
					title="Road Map"
				>
					<div className="space-y-5">
						{roadmapItems.map((item) => (
							<RoadmapCard
								badge={item.badge}
								key={item.title}
								phase={item.phase}
								summary={item.summary}
								tags={item.tags}
								title={item.title}
							/>
						))}
					</div>
				</DashboardSection>
			) : null}
		</DashboardLayout>
	)
}

export default Dashboard

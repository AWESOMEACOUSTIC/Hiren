import QuestionCard from './QuestionCard.jsx'

const QuestionList = ({ questions, label }) => (
	<div className="space-y-5">
		{questions.map((question, index) => (
			<QuestionCard
				key={`${question.title}-${index}`}
				description={question.description}
				intention={question.intention}
				label={label}
				title={question.title}
			/>
		))}
	</div>
)

export default QuestionList

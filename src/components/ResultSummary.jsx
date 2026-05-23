export default function ResultSummary({ score }) {
  const getGrade = (pct) => {
    if (pct >= 90) return { label: 'Excellent', color: 'text-green-400' }
    if (pct >= 75) return { label: 'Good', color: 'text-blue-400' }
    if (pct >= 60) return { label: 'Fair', color: 'text-yellow-400' }
    return { label: 'Needs Improvement', color: 'text-red-400' }
  }

  const grade = getGrade(score.percentage)

  return (
    <div className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-6 text-center">
      <h2 className="mb-2 text-2xl font-bold text-purple-100">Exam Results</h2>
      <p className={`text-4xl font-bold ${grade.color}`}>
        {score.total}/{score.totalQuestions}
      </p>
      <p className={`mt-1 text-lg ${grade.color}`}>{grade.label} ({score.percentage}%)</p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-purple-700/30 bg-purple-950/40 p-4">
          <p className="text-sm text-purple-400">Grammar</p>
          <p className="text-2xl font-bold text-purple-100">{score.grammar}/{score.grammarQuestions}</p>
        </div>
        <div className="rounded-lg border border-purple-700/30 bg-purple-950/40 p-4">
          <p className="text-sm text-purple-400">Reading</p>
          <p className="text-2xl font-bold text-purple-100">{score.reading}/{score.readingQuestions}</p>
        </div>
      </div>
    </div>
  )
}

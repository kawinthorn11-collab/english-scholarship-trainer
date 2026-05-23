export function analyzeWeakSkills(details) {
  const skillMap = {}

  details.forEach((d) => {
    if (!skillMap[d.skillTag]) {
      skillMap[d.skillTag] = { correct: 0, total: 0 }
    }
    skillMap[d.skillTag].total++
    if (d.isCorrect) skillMap[d.skillTag].correct++
  })

  const weak = []
  const strong = []

  Object.entries(skillMap).forEach(([skill, data]) => {
    const rate = data.correct / data.total
    if (rate < 0.5) {
      weak.push({ skill, correct: data.correct, total: data.total, rate })
    } else {
      strong.push({ skill, correct: data.correct, total: data.total, rate })
    }
  })

  weak.sort((a, b) => a.rate - b.rate)
  strong.sort((a, b) => b.rate - a.rate)

  return { weak, strong }
}

export function getRecommendations(weak) {
  return weak.map((w) => ({
    skill: w.skill,
    message: `Focus on "${w.skill}" — you got ${w.correct}/${w.total} correct.`,
  }))
}

export function getStatsFromAttempts(attempts) {
  if (attempts.length === 0) {
    return { total: 0, best: 0, latest: 0, average: 0 }
  }

  const scores = attempts.map((a) => a.score.percentage)
  const best = Math.max(...scores)
  const latest = scores[scores.length - 1]
  const average = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)

  return { total: attempts.length, best, latest, average }
}

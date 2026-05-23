export const ACADEMY_SEARCH_ALIASES = {
  passive: ['passive', 'ถูกกระทำ', 'be v3', 'by'],
  gerund: ['gerund', 'v-ing', 'preposition + v-ing', 'ing'],
  infinitive: ['infinitive', 'to v', 'to-infinitive'],
  preposition: ['preposition', 'at on in', 'for since', 'บุพบท'],
  conditionals: ['conditional', 'if', 'unless', 'เงื่อนไข'],
  articles: ['article', 'a an the', 'a/an/the'],
  'question tags': ['question tag', 'tag question', "isn't it", "do they"],
  'relative clauses': ['relative', 'who which that whose where'],
  'reported speech': ['reported', 'indirect speech', 'say tell ask'],
  modals: ['modal', 'must should can could may might would'],
  tense: ['tense', 'present', 'past', 'future', 'perfect', 'continuous'],
  pronoun: ['pronoun', 'reference', 'he she it they'],
  comparison: ['comparison', 'comparative', 'superlative', 'than as'],
}

function normalize(text) {
  return String(text || '').toLowerCase().trim()
}

function expandQuery(query) {
  const q = normalize(query)
  if (!q) return []

  const tokens = new Set([q, ...q.split(/\s+/).filter(Boolean)])
  for (const [key, aliases] of Object.entries(ACADEMY_SEARCH_ALIASES)) {
    if (key.includes(q) || aliases.some((alias) => normalize(alias).includes(q) || q.includes(normalize(alias)))) {
      tokens.add(key)
      aliases.forEach((alias) => tokens.add(normalize(alias)))
    }
  }
  return [...tokens]
}

export function searchAcademyCatalog(query, modules) {
  const tokens = expandQuery(query)
  if (tokens.length === 0) return []

  const results = []
  for (const module of modules) {
    for (const unit of module.units) {
      const haystack = normalize([
        module.title,
        module.titleThai,
        module.descriptionThai,
        unit.title,
        unit.titleThai,
        unit.id,
        module.id,
      ].join(' '))

      const score = tokens.reduce((sum, token) => sum + (haystack.includes(token) ? 1 : 0), 0)
      if (score > 0) {
        results.push({ ...unit, moduleTitle: module.title, score })
      }
    }
  }

  return results.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, 30)
}

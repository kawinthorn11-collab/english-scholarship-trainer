export const STUDY_SESSION_PAGES = new Set([
  'dashboard',
  'mock-exam',
  'practice',
  'results',
  'grammar',
  'grammar-lesson',
  'grammar-drill',
  'academy',
  'academy-module',
  'academy-unit',
  'academy-drill',
  'listening',
])

export function isStudyPage(page) {
  return STUDY_SESSION_PAGES.has(page)
}

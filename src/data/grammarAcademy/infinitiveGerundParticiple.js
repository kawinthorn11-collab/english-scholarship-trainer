import { academyOutline } from './academyOutline.js'
import { createAcademyModule } from './unitFactory.js'

export default createAcademyModule(academyOutline.find((module) => module.id === 'infinitive-gerund-participle'))

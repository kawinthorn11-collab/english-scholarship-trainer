/**
 * Membership plans for the English Scholarship Exam Trainer.
 *
 * Free tier: limited access, demo mode.
 * Pro tier: full access to all features.
 */

export const PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    nameThai: 'ฟรี',
    price: 0,
    currency: 'THB',
    features: [
      'Demo exam (Set 01 only)',
      '3 free grammar lessons',
      'Limited drills (5 per day)',
      'Basic score summary',
      'localStorage progress only',
    ],
    featuresThai: [
      'ข้อสอบตัวอย่าง (Set 01 เท่านั้น)',
      'บทเรียนไวยากรณ์ฟรี 3 บท',
      'แบบฝึกหัดจำกัด (5 ครั้ง/วัน)',
      'สรุปคะแนนเบื้องต้น',
      'บันทึกความก้าวหน้าในเครื่องเท่านั้น',
    ],
    limits: {
      examSets: ['set01'],
      grammarLessonsMax: 3,
      drillsPerDay: 5,
      detailedExplanations: false,
      weakSkillAnalysis: false,
      cloudSync: false,
    },
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    nameThai: 'โปร',
    price: 299,
    currency: 'THB',
    interval: 'month',
    features: [
      'All exam sets (Set 01–36 as available)',
      'All grammar lessons (20 categories)',
      'Unlimited drills',
      'Detailed explanations with Thai + English',
      'Weak skill analysis and recommendations',
      'Cloud sync across devices',
      'Priority support',
    ],
    featuresThai: [
      'ข้อสอบทุกชุด (Set 01–36 ตามที่มี)',
      'บทเรียนไวยากรณ์ทุกหมวด (20 หมวด)',
      'แบบฝึกหัดไม่จำกัด',
      'คำอธิบายละเอียดทั้งไทยและอังกฤษ',
      'วิเคราะห์จุดอ่อนและแนะนำบทเรียน',
      'ซิงค์ข้อมูลข้ามอุปกรณ์',
      'สนับสนุนลำดับความสำคัญ',
    ],
    limits: {
      examSets: 'all',
      grammarLessonsMax: Infinity,
      drillsPerDay: Infinity,
      detailedExplanations: true,
      weakSkillAnalysis: true,
      cloudSync: true,
    },
  },
}

export const FREE_GRAMMAR_LESSON_IDS = ['modals', 'conjunctions', 'tenses']
export const FREE_EXAM_SET_IDS = ['set01']

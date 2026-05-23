const questions = [
  // ===== GRAMMAR (5 questions) =====
  {
    id: "g-001",
    section: "Grammar",
    passage: "",
    question: "She _____ to the library every Saturday since she was ten years old.",
    choices: ["has gone", "went", "goes", "is going"],
    correctAnswer: "has gone",
    skillTag: "Present Perfect Tense",
    difficulty: "medium",
    explanationThai: "ใช้ Present Perfect (has gone) เพราะมี 'since' บอกจุดเริ่มต้นของเหตุการณ์ที่ยังต่อเนื่องถึงปัจจุบัน",
    explanationEnglish: "Use present perfect with 'since' to indicate an action that started in the past and continues to the present.",
    whyCorrect: "'has gone' is correct because 'since she was ten' signals a duration from past to present, requiring present perfect tense.",
    whyWrong: {
      "1": "",
      "2": "'went' is simple past — it describes a completed action, not one continuing to the present.",
      "3": "'goes' is simple present — it describes habit but ignores the 'since' time marker.",
      "4": "'is going' is present continuous — it describes an action happening right now, not a long-term habit."
    },
    examTrick: "Look for 'since' or 'for' as signals for present perfect. Don't be tricked by the habitual meaning into choosing simple present.",
    commonMistake: "Thai students often choose 'goes' because the sentence describes a habit, but 'since' requires present perfect.",
    miniLesson: "since + point in time → Present Perfect. for + duration → Present Perfect. Every Saturday (alone) → Simple Present.",
    extraPractice: {
      question: "He _____ in Bangkok since 2015.",
      choices: ["lives", "has lived", "lived", "is living"],
      answer: "has lived",
      explanation: "'since 2015' requires present perfect to show the action continues to now."
    }
  },
  {
    id: "g-002",
    section: "Grammar",
    passage: "",
    question: "If I _____ enough money, I would travel around the world.",
    choices: ["have", "had", "has", "will have"],
    correctAnswer: "had",
    skillTag: "Conditional Sentences (Type 2)",
    difficulty: "medium",
    explanationThai: "เป็น If-clause Type 2 (เงื่อนไขที่ไม่จริงในปัจจุบัน) ใช้ past simple ใน if-clause",
    explanationEnglish: "Second conditional uses 'if + past simple' to describe unreal or hypothetical present situations.",
    whyCorrect: "'had' is correct because this is a Type 2 conditional — an imaginary situation in the present. The structure is: If + past simple, would + base verb.",
    whyWrong: {
      "1": "'have' would make it a Type 1 conditional (real possibility), but 'would travel' in the main clause signals Type 2.",
      "2": "",
      "3": "'has' is third-person singular present — grammatically wrong with 'I' and wrong tense for Type 2.",
      "4": "'will have' is future tense — never used in the if-clause of conditionals."
    },
    examTrick: "Check the main clause first. If you see 'would + verb', the if-clause must use past simple (Type 2).",
    commonMistake: "Thai students often use 'have' because the meaning feels present, but English conditionals require past tense for unreal situations.",
    miniLesson: "Type 1: If + present simple, will + verb (real). Type 2: If + past simple, would + verb (unreal present). Type 3: If + past perfect, would have + past participle (unreal past).",
    extraPractice: {
      question: "If she _____ harder, she would pass the exam.",
      choices: ["studies", "studied", "will study", "has studied"],
      answer: "studied",
      explanation: "Type 2 conditional — unreal present situation requires past simple in the if-clause."
    }
  },
  {
    id: "g-003",
    section: "Grammar",
    passage: "",
    question: "The report _____ by the committee before the deadline last Friday.",
    choices: ["was completed", "completed", "has been completed", "is completed"],
    correctAnswer: "was completed",
    skillTag: "Passive Voice (Past Simple)",
    difficulty: "medium",
    explanationThai: "ใช้ Passive Voice รูป Past Simple (was completed) เพราะประธาน 'The report' เป็นผู้ถูกกระทำ และมี 'last Friday' บอกเวลาในอดีต",
    explanationEnglish: "Use past simple passive (was/were + past participle) when the subject receives the action and the time is clearly in the past.",
    whyCorrect: "'was completed' is correct because the report received the action (passive), and 'last Friday' places it in the past.",
    whyWrong: {
      "1": "",
      "2": "'completed' is active voice — it would mean the report completed something, which doesn't make sense.",
      "3": "'has been completed' is present perfect passive — incorrect because 'last Friday' specifies a finished past time.",
      "4": "'is completed' is present passive — contradicts the past time marker 'last Friday'."
    },
    examTrick: "When you see a past time expression (last week, yesterday, in 2020) + a subject that receives action, choose past simple passive.",
    commonMistake: "Thai students sometimes choose 'has been completed' because they associate 'before the deadline' with present perfect, but 'last Friday' anchors it firmly in the past.",
    miniLesson: "Passive formula: Subject + be (tense) + past participle. Past simple passive: was/were + V3. Present perfect passive: has/have been + V3.",
    extraPractice: {
      question: "The new bridge _____ in 2023.",
      choices: ["built", "was built", "has been built", "is built"],
      answer: "was built",
      explanation: "'in 2023' is a specific past time, so use past simple passive: was built."
    }
  },
  {
    id: "g-004",
    section: "Grammar",
    passage: "",
    question: "Neither the teacher nor the students _____ aware of the schedule change.",
    choices: ["is", "was", "were", "has been"],
    correctAnswer: "were",
    skillTag: "Subject-Verb Agreement",
    difficulty: "hard",
    explanationThai: "เมื่อใช้ 'neither...nor' กริยาจะผันตามประธานตัวที่อยู่ใกล้กริยาที่สุด คือ 'students' (พหูพจน์) จึงใช้ 'were'",
    explanationEnglish: "With 'neither...nor', the verb agrees with the subject closest to it. 'Students' is plural, so use 'were'.",
    whyCorrect: "'were' is correct because in 'neither A nor B' constructions, the verb agrees with B (the nearest subject). 'Students' is plural → 'were'.",
    whyWrong: {
      "1": "'is' is singular present tense — doesn't agree with plural 'students' and wrong tense.",
      "2": "'was' is singular past — agrees with 'teacher' but not with 'students' which is closer to the verb.",
      "3": "",
      "4": "'has been' is singular present perfect — doesn't agree with plural 'students'."
    },
    examTrick: "For 'neither...nor' and 'either...or', always look at the subject CLOSEST to the verb to determine agreement.",
    commonMistake: "Thai students often choose 'was' thinking the sentence is about one teacher, but English grammar requires agreement with the nearest subject.",
    miniLesson: "Proximity rule: neither A nor B + verb agrees with B. Either A or B + verb agrees with B. Not only A but also B + verb agrees with B.",
    extraPractice: {
      question: "Either the manager or his assistants _____ responsible for the error.",
      choices: ["is", "are", "was", "has been"],
      answer: "are",
      explanation: "'assistants' (plural) is closest to the verb, so use plural 'are'."
    }
  },
  {
    id: "g-005",
    section: "Grammar",
    passage: "",
    question: "The scientist insisted that the experiment _____ repeated under controlled conditions.",
    choices: ["is", "be", "was", "would be"],
    correctAnswer: "be",
    skillTag: "Subjunctive Mood",
    difficulty: "hard",
    explanationThai: "หลังกริยา 'insist/demand/suggest/recommend' + that ใช้ subjunctive mood คือ verb ช่องที่ 1 ไม่ผัน (be) เสมอ",
    explanationEnglish: "After verbs of demand (insist, demand, suggest, recommend) + that, use the base form of the verb (subjunctive mood).",
    whyCorrect: "'be' is correct because 'insisted that' triggers the subjunctive mood, which always uses the base form regardless of subject.",
    whyWrong: {
      "1": "'is' follows normal present tense rules but the subjunctive doesn't conjugate the verb.",
      "2": "",
      "3": "'was' is past tense — while sometimes used informally, the formal/exam-correct answer is subjunctive 'be'.",
      "4": "'would be' adds conditionality not present in the original demand."
    },
    examTrick: "Memorize the subjunctive triggers: insist, demand, suggest, recommend, require, propose + that + subject + BASE VERB.",
    commonMistake: "Thai students often choose 'was' because it sounds natural, but scholarship exams test formal subjunctive grammar.",
    miniLesson: "Subjunctive pattern: S + insist/demand/suggest + that + S + base verb. Example: I suggest that he study harder. (NOT studies, NOT studied)",
    extraPractice: {
      question: "The doctor recommended that she _____ more water daily.",
      choices: ["drinks", "drink", "drank", "would drink"],
      answer: "drink",
      explanation: "'recommended that' requires subjunctive — base form 'drink' regardless of subject."
    }
  },

  // ===== READING COMPREHENSION (5 questions) =====
  {
    id: "r-001",
    section: "Reading",
    passageId: "passage-1",
    passage: "Urban vertical farming is gaining popularity as cities struggle to feed growing populations. Unlike traditional agriculture, vertical farms stack crops in layers inside climate-controlled buildings. These facilities use up to 95% less water than conventional farms through recirculating hydroponic systems. However, critics point out that the high energy costs of artificial lighting make vertical farms economically challenging. Supporters argue that as LED technology improves and energy costs decrease, vertical farming will become the primary food source for megacities by 2050.",
    question: "What is the main advantage of vertical farming mentioned in the passage?",
    choices: [
      "It produces tastier vegetables than traditional farms",
      "It uses significantly less water than conventional farming",
      "It requires no human labor to operate",
      "It is cheaper than traditional agriculture"
    ],
    correctAnswer: "It uses significantly less water than conventional farming",
    skillTag: "Main Idea / Detail Identification",
    difficulty: "easy",
    explanationThai: "บทความระบุชัดเจนว่า vertical farm ใช้น้ำน้อยกว่าฟาร์มปกติถึง 95% ซึ่งเป็นข้อดีหลักที่กล่าวถึง",
    explanationEnglish: "The passage explicitly states 'up to 95% less water' as the key advantage of vertical farming.",
    whyCorrect: "The passage directly states vertical farms 'use up to 95% less water than conventional farms' — this is the main advantage discussed.",
    whyWrong: {
      "1": "Taste is never mentioned in the passage.",
      "2": "",
      "3": "The passage doesn't discuss labor requirements at all.",
      "4": "The passage actually says vertical farms have 'high energy costs' — they are NOT cheaper."
    },
    examTrick: "For 'main advantage' questions, look for specific numbers or superlatives in the passage. '95% less water' is a clear, stated benefit.",
    commonMistake: "Thai students sometimes choose the answer that sounds most impressive rather than what the passage actually states.",
    miniLesson: "Detail questions ask 'what does the passage say?' — always find the exact sentence that supports your answer. Don't infer beyond what's written.",
    extraPractice: {
      question: "According to the passage, what is a criticism of vertical farming?",
      choices: ["Water waste", "High energy costs", "Poor crop quality", "Land use"],
      answer: "High energy costs",
      explanation: "The passage states 'high energy costs of artificial lighting' as the criticism."
    }
  },
  {
    id: "r-002",
    section: "Reading",
    passageId: "passage-1",
    passage: "Urban vertical farming is gaining popularity as cities struggle to feed growing populations. Unlike traditional agriculture, vertical farms stack crops in layers inside climate-controlled buildings. These facilities use up to 95% less water than conventional farms through recirculating hydroponic systems. However, critics point out that the high energy costs of artificial lighting make vertical farms economically challenging. Supporters argue that as LED technology improves and energy costs decrease, vertical farming will become the primary food source for megacities by 2050.",
    question: "What can be inferred about the future of vertical farming from the passage?",
    choices: [
      "It will completely replace all traditional farming by 2030",
      "Its economic viability depends on advances in lighting technology",
      "Governments will ban traditional farming methods",
      "Water scarcity will no longer be a global problem"
    ],
    correctAnswer: "Its economic viability depends on advances in lighting technology",
    skillTag: "Inference",
    difficulty: "medium",
    explanationThai: "จากที่บทความบอกว่า 'as LED technology improves and energy costs decrease' จะทำให้ vertical farming เป็นแหล่งอาหารหลัก แสดงว่าความคุ้มค่าทางเศรษฐกิจขึ้นอยู่กับเทคโนโลยีแสง",
    explanationEnglish: "The passage links the future success of vertical farming to LED improvements and lower energy costs, implying economic viability depends on lighting tech.",
    whyCorrect: "The passage states success depends on 'LED technology improves and energy costs decrease' — this directly implies economic viability is tied to lighting advances.",
    whyWrong: {
      "1": "The passage says 'primary food source for megacities by 2050' — not ALL farming replaced, and not by 2030.",
      "2": "",
      "3": "Government bans are never mentioned or implied.",
      "4": "The passage discusses water efficiency but doesn't claim water scarcity will be solved globally."
    },
    examTrick: "Inference questions ask what is LOGICALLY implied, not directly stated. Connect cause and effect: if success requires X, then viability depends on X.",
    commonMistake: "Thai students often choose extreme answers ('completely replace ALL') — inference answers are usually moderate and logical.",
    miniLesson: "Inference = what must be true based on the information given. Avoid answers with absolute words (all, never, completely) unless the passage supports them.",
    extraPractice: {
      question: "From the passage, we can infer that current LED technology is ___.",
      choices: ["perfect for farming", "still too expensive", "unavailable", "only used outdoors"],
      answer: "still too expensive",
      explanation: "If LED needs to 'improve' and costs need to 'decrease', current technology must still be too costly."
    }
  },
  {
    id: "r-003",
    section: "Reading",
    passageId: "passage-2",
    passage: "Sleep scientists have discovered that the brain performs critical maintenance during deep sleep phases. Cerebrospinal fluid flows through the brain at increased rates, clearing toxic proteins that accumulate during waking hours. This cleaning process, called the glymphatic system, is most active during the third and fourth stages of non-REM sleep. Research suggests that chronic sleep deprivation may accelerate neurodegenerative diseases because these waste products are not adequately removed. Adults who consistently sleep fewer than six hours show measurably higher levels of tau protein, a marker associated with Alzheimer's disease.",
    question: "According to the passage, when is the brain's cleaning process most active?",
    choices: [
      "During REM sleep",
      "During the first stage of sleep",
      "During stages three and four of non-REM sleep",
      "Immediately after waking up"
    ],
    correctAnswer: "During stages three and four of non-REM sleep",
    skillTag: "Detail Identification",
    difficulty: "easy",
    explanationThai: "บทความระบุชัดเจนว่า glymphatic system ทำงานมากที่สุดใน 'third and fourth stages of non-REM sleep'",
    explanationEnglish: "The passage directly states the glymphatic system 'is most active during the third and fourth stages of non-REM sleep.'",
    whyCorrect: "The passage explicitly states: 'most active during the third and fourth stages of non-REM sleep.'",
    whyWrong: {
      "1": "The passage specifies non-REM sleep, not REM sleep.",
      "2": "First stage is not mentioned as the active cleaning period.",
      "3": "",
      "4": "The cleaning happens during sleep, not after waking."
    },
    examTrick: "For 'according to the passage' questions, the answer is stated directly — scan for the key phrase and match it exactly.",
    commonMistake: "Thai students sometimes confuse REM and non-REM because both are sleep stages. Read carefully: the passage says NON-REM.",
    miniLesson: "Detail questions = find the exact sentence. Tip: identify keywords in the question ('cleaning process', 'most active') and scan the passage for those words.",
    extraPractice: {
      question: "What fluid helps clean the brain during sleep?",
      choices: ["Blood plasma", "Cerebrospinal fluid", "Lymphatic fluid", "Saline solution"],
      answer: "Cerebrospinal fluid",
      explanation: "The passage states 'Cerebrospinal fluid flows through the brain' during the cleaning process."
    }
  },
  {
    id: "r-004",
    section: "Reading",
    passageId: "passage-2",
    passage: "Sleep scientists have discovered that the brain performs critical maintenance during deep sleep phases. Cerebrospinal fluid flows through the brain at increased rates, clearing toxic proteins that accumulate during waking hours. This cleaning process, called the glymphatic system, is most active during the third and fourth stages of non-REM sleep. Research suggests that chronic sleep deprivation may accelerate neurodegenerative diseases because these waste products are not adequately removed. Adults who consistently sleep fewer than six hours show measurably higher levels of tau protein, a marker associated with Alzheimer's disease.",
    question: "The word 'accumulate' in the passage is closest in meaning to:",
    choices: ["disappear gradually", "build up over time", "move quickly", "break down"],
    correctAnswer: "build up over time",
    skillTag: "Vocabulary in Context",
    difficulty: "medium",
    explanationThai: "'accumulate' แปลว่า สะสม/เพิ่มพูนขึ้นเรื่อยๆ ซึ่งตรงกับ 'build up over time' (สะสมขึ้นตามเวลา)",
    explanationEnglish: "'Accumulate' means to gather or increase in quantity over time, which matches 'build up over time.'",
    whyCorrect: "'build up over time' correctly captures the meaning of 'accumulate' — to gradually increase in amount.",
    whyWrong: {
      "1": "'disappear gradually' is the opposite meaning — proteins are gathering, not vanishing.",
      "2": "",
      "3": "'move quickly' describes speed of movement, not gradual increase.",
      "4": "'break down' means to decompose — opposite of accumulating."
    },
    examTrick: "For vocabulary questions, substitute each choice into the original sentence and see which one maintains the same meaning in context.",
    commonMistake: "Thai students sometimes guess based on the sound of the word rather than its meaning in context. Always re-read the sentence with your chosen answer substituted in.",
    miniLesson: "Vocabulary-in-context strategy: 1) Read the sentence with the word. 2) Guess the meaning from context. 3) Substitute each choice. 4) Pick the one that keeps the same meaning.",
    extraPractice: {
      question: "The word 'chronic' in 'chronic sleep deprivation' means:",
      choices: ["sudden", "long-lasting", "mild", "rare"],
      answer: "long-lasting",
      explanation: "'Chronic' means persisting for a long time or constantly recurring."
    }
  },
  {
    id: "r-005",
    section: "Reading",
    passageId: "passage-2",
    passage: "Sleep scientists have discovered that the brain performs critical maintenance during deep sleep phases. Cerebrospinal fluid flows through the brain at increased rates, clearing toxic proteins that accumulate during waking hours. This cleaning process, called the glymphatic system, is most active during the third and fourth stages of non-REM sleep. Research suggests that chronic sleep deprivation may accelerate neurodegenerative diseases because these waste products are not adequately removed. Adults who consistently sleep fewer than six hours show measurably higher levels of tau protein, a marker associated with Alzheimer's disease.",
    question: "What is the author's primary purpose in writing this passage?",
    choices: [
      "To persuade readers to buy sleep medication",
      "To explain how sleep deprivation affects brain health",
      "To compare different types of sleep disorders",
      "To criticize people who sleep less than six hours"
    ],
    correctAnswer: "To explain how sleep deprivation affects brain health",
    skillTag: "Author's Purpose",
    difficulty: "medium",
    explanationThai: "จุดประสงค์หลักของผู้เขียนคือการอธิบายว่าการนอนไม่พอส่งผลต่อสุขภาพสมองอย่างไร โดยอธิบายกลไกการทำความสะอาดสมองและผลเสียของการนอนน้อย",
    explanationEnglish: "The author's main purpose is to explain the relationship between sleep deprivation and brain health through the glymphatic cleaning mechanism.",
    whyCorrect: "The passage explains the brain's cleaning process during sleep and connects insufficient sleep to disease — its purpose is informational/explanatory.",
    whyWrong: {
      "1": "No medication is mentioned or promoted in the passage.",
      "2": "",
      "3": "The passage discusses one mechanism, not a comparison of different disorders.",
      "4": "The tone is scientific and informational, not critical or judgmental toward anyone."
    },
    examTrick: "Purpose questions: Is the author explaining (inform), arguing (persuade), comparing (analyze), or telling a story (narrate)? This passage presents facts → informational purpose.",
    commonMistake: "Thai students sometimes choose answers that reflect a moral judgment ('criticize people') when the passage is purely scientific.",
    miniLesson: "Author's purpose types: Inform (present facts), Persuade (convince reader), Entertain (tell stories), Analyze (compare/contrast). Scientific passages are almost always 'inform' or 'explain'.",
    extraPractice: {
      question: "A passage that presents data about climate change without taking sides is written to:",
      choices: ["persuade", "entertain", "inform", "criticize"],
      answer: "inform",
      explanation: "Presenting data without bias = informational purpose."
    }
  }
]

export default questions

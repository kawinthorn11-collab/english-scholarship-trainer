// Grammar Lesson: Pronouns and Reference
// Level: foundation
// Covers both grammatical pronoun forms and pronoun-reference reading comprehension.

const pronounsReference = {
  id: 'pronouns-reference',
  title: 'Pronouns and Reference',
  titleThai: 'คำสรรพนามและการอ้างอิง (Pronouns and Reference)',
  level: 'foundation',
  status: 'available',
  relatedSkillTags: ['pronoun', 'pronoun_reference'],
  shortDescriptionThai: 'Pronouns คือคำที่ใช้แทนคำนาม เช่น I, me, my, mine, this, that. ในข้อสอบทดสอบทั้งการเลือกรูปที่ถูกต้อง (subject vs object vs possessive) และการระบุว่า pronoun อ้างถึงนามตัวใดในเนื้อเรื่อง (pronoun reference)',
  whyItMattersThai: 'Pronouns เป็นจุดที่นักเรียนไทยมักผิดเพราะภาษาไทยไม่ได้แยก subject/object/possessive ชัดเจน นอกจากนี้ในข้อสอบ Reading Comprehension มักถามว่า "this/it/they อ้างถึงอะไร?" การเข้าใจกฎ pronoun forms และ pronoun reference จะช่วยตอบได้ทั้งใน Grammar และ Reading',

  coreRules: [
    {
      ruleTitle: 'subject pronouns vs object pronouns',
      explanationThai: 'subject pronouns (I, you, he, she, it, we, they) ใช้เป็นประธานของกริยา. object pronouns (me, you, him, her, it, us, them) ใช้เป็นกรรมของกริยา หรือหลัง preposition',
      explanationEnglish: 'Subject pronouns (I, he, she, etc.) act as the subject of a verb. Object pronouns (me, him, her, etc.) act as the object of a verb or follow a preposition.',
      pattern: 'subject pronoun + verb | verb/preposition + object pronoun',
      correctExamples: [
        {
          sentence: 'She gave the book to me yesterday.',
          translationThai: 'เธอให้หนังสือแก่ฉันเมื่อวาน',
          noteThai: '"She" = ประธาน. "me" = กรรมหลัง preposition "to"',
        },
        {
          sentence: 'My parents invited him to dinner.',
          translationThai: 'พ่อแม่ของฉันชวนเขาไปทานข้าว',
          noteThai: '"him" = กรรมของกริยา "invited"',
        },
        {
          sentence: 'They are waiting for us at the entrance.',
          translationThai: 'พวกเขากำลังรอเราที่ทางเข้า',
          noteThai: '"They" = ประธาน. "us" = กรรมหลัง "for"',
        },
        {
          sentence: 'He and I went to the same school.',
          translationThai: 'เขากับฉันเรียนโรงเรียนเดียวกัน',
          noteThai: 'ทั้งคู่เป็นประธาน → ใช้ "He" และ "I"',
        },
      ],
      wrongExamples: [
        {
          sentence: 'Me and my brother went to the park.',
          correction: 'My brother and I went to the park.',
          whyWrongThai: '"Me" เป็น object form แต่ในประโยคเป็นประธาน → ใช้ "I". (มารยาท: ใส่ชื่อคนอื่นก่อน "I")',
        },
        {
          sentence: 'The teacher praised she for her work.',
          correction: 'The teacher praised her for her work.',
          whyWrongThai: 'หลังกริยา "praised" ต้องใช้ object pronoun "her" ไม่ใช่ subject "she"',
        },
        {
          sentence: 'Between you and I, this is a secret.',
          correction: 'Between you and me, this is a secret.',
          whyWrongThai: 'หลัง preposition "between" ต้องใช้ object pronoun "me" ไม่ใช่ "I"',
        },
      ],
    },
    {
      ruleTitle: 'possessive adjectives vs possessive pronouns',
      explanationThai: 'possessive adjectives (my, your, his, her, its, our, their) ขยายคำนาม — ต้องตามด้วยนาม. possessive pronouns (mine, yours, his, hers, ours, theirs) ยืนเดี่ยว — แทนที่ noun phrase ทั้งกลุ่ม',
      explanationEnglish: 'Possessive adjectives (my, your, his, etc.) modify a noun and must be followed by one. Possessive pronouns (mine, yours, his, etc.) stand alone and replace a noun phrase.',
      pattern: 'possessive adjective + noun | possessive pronoun (stands alone)',
      correctExamples: [
        {
          sentence: 'This is my book. That one is yours.',
          translationThai: 'เล่มนี้เป็นหนังสือของฉัน เล่มนั้นเป็นของคุณ',
          noteThai: '"my book" (adj + noun). "yours" = "your book" (ยืนเดี่ยว)',
        },
        {
          sentence: 'Her parents and his are old friends.',
          translationThai: 'พ่อแม่ของเธอกับของเขาเป็นเพื่อนเก่ากัน',
          noteThai: '"Her parents" (adj + noun). "his" = "his parents"',
        },
        {
          sentence: 'The decision is theirs to make.',
          translationThai: 'การตัดสินใจเป็นของพวกเขา',
          noteThai: '"theirs" ยืนเดี่ยว = "their decision"',
        },
      ],
      wrongExamples: [
        {
          sentence: 'This is mine book.',
          correction: 'This is my book.',
          whyWrongThai: '"mine" เป็น possessive pronoun (ยืนเดี่ยว) — เมื่อตามด้วยนาม ต้องใช้ "my"',
        },
        {
          sentence: 'The umbrella is my.',
          correction: 'The umbrella is mine.',
          whyWrongThai: '"my" ต้องตามด้วยนาม — เมื่อยืนเดี่ยว ต้องใช้ "mine"',
        },
        {
          sentence: 'His and her decided to leave.',
          correction: 'He and she decided to leave.',
          whyWrongThai: 'ตำแหน่งประธาน ต้องใช้ subject pronoun (he, she) ไม่ใช่ possessive (his, her)',
        },
      ],
    },
    {
      ruleTitle: 'reflexive pronouns: myself, yourself, etc.',
      explanationThai: 'reflexive pronouns (myself, yourself, himself, herself, itself, ourselves, yourselves, themselves) ใช้เมื่อประธานและกรรมเป็นบุคคลเดียวกัน หรือเพื่อเน้นว่า "ทำเอง"',
      explanationEnglish: 'Use reflexive pronouns when subject and object refer to the same person, or to emphasize "by oneself."',
      pattern: 'subject + verb + reflexive pronoun (subject = object)',
      correctExamples: [
        {
          sentence: 'She taught herself to play the guitar.',
          translationThai: 'เธอสอนตัวเองให้เล่นกีตาร์',
          noteThai: 'ประธาน (She) = กรรม (herself) → reflexive',
        },
        {
          sentence: 'I cooked the meal myself.',
          translationThai: 'ฉันทำอาหารด้วยตัวเอง',
          noteThai: '"myself" เน้นว่าทำเอง',
        },
        {
          sentence: 'They reminded themselves to stay calm.',
          translationThai: 'พวกเขาย้ำเตือนตัวเองให้ใจเย็น',
          noteThai: 'ประธาน = กรรม → themselves',
        },
      ],
      wrongExamples: [
        {
          sentence: 'She taught her to play the guitar. (when meaning herself)',
          correction: 'She taught herself to play the guitar.',
          whyWrongThai: 'ถ้าประธานและกรรมเป็นคนเดียวกัน ใช้ reflexive (herself) ไม่ใช่ object pronoun (her)',
        },
      ],
    },
    {
      ruleTitle: 'demonstratives: this/that/these/those',
      explanationThai: 'this (เอกพจน์ ใกล้) / that (เอกพจน์ ไกล) / these (พหูพจน์ ใกล้) / those (พหูพจน์ ไกล). ใช้เป็นทั้ง pronoun (ยืนเดี่ยว) และ adjective (ขยายนาม)',
      explanationEnglish: 'this (singular, near), that (singular, far), these (plural, near), those (plural, far). Used as pronouns or adjectives.',
      pattern: 'this/that + singular noun | these/those + plural noun',
      correctExamples: [
        {
          sentence: 'This book is more interesting than that one.',
          translationThai: 'หนังสือเล่มนี้น่าสนใจกว่าเล่มนั้น',
          noteThai: '"This book" (เอกพจน์ ใกล้) vs "that one" (เอกพจน์ ไกล)',
        },
        {
          sentence: 'These shoes are too small, but those are perfect.',
          translationThai: 'รองเท้าคู่นี้เล็กไป แต่คู่นั้นพอดี',
          noteThai: '"These shoes" (พหูพจน์ ใกล้) vs "those" (พหูพจน์ ไกล)',
        },
        {
          sentence: 'I have not seen these results before.',
          translationThai: 'ฉันไม่เคยเห็นผลเหล่านี้มาก่อน',
          noteThai: '"results" พหูพจน์ → these',
        },
      ],
      wrongExamples: [
        {
          sentence: 'This shoes are too small.',
          correction: 'These shoes are too small.',
          whyWrongThai: '"shoes" พหูพจน์ → ใช้ these ไม่ใช่ this',
        },
        {
          sentence: 'I love these dress.',
          correction: 'I love this dress.',
          whyWrongThai: '"dress" เอกพจน์ → ใช้ this ไม่ใช่ these',
        },
      ],
    },
    {
      ruleTitle: 'pronoun-antecedent agreement (number and gender)',
      explanationThai: 'pronoun ต้องตรงกับ antecedent (นามที่อ้างถึง) ในจำนวน (เอกพจน์/พหูพจน์) และเพศ (ชาย/หญิง/กลาง). นามเอกพจน์ → he/she/it/his/her/its. นามพหูพจน์ → they/them/their',
      explanationEnglish: 'A pronoun must agree with its antecedent in number (singular/plural) and gender (male/female/neuter).',
      pattern: 'antecedent (singular) → he/she/it. antecedent (plural) → they',
      correctExamples: [
        {
          sentence: 'The student forgot her notebook at home.',
          translationThai: 'นักเรียนลืมสมุดที่บ้าน',
          noteThai: '"student" เอกพจน์เพศหญิง → her',
        },
        {
          sentence: 'The students forgot their notebooks at home.',
          translationThai: 'นักเรียนลืมสมุดที่บ้าน (พหูพจน์)',
          noteThai: '"students" พหูพจน์ → their',
        },
        {
          sentence: 'The committee announced its decision yesterday.',
          translationThai: 'คณะกรรมการประกาศการตัดสินใจเมื่อวาน',
          noteThai: '"committee" เป็น collective noun ปกติใช้เอกพจน์ → its',
        },
        {
          sentence: 'Each student must bring his or her own laptop.',
          translationThai: 'นักเรียนแต่ละคนต้องนำแล็ปท็อปของตนเองมา',
          noteThai: '"Each student" เอกพจน์ → his or her (formal) หรือ their (modern usage)',
        },
      ],
      wrongExamples: [
        {
          sentence: 'The student forgot their notebook. (in formal exam context)',
          correction: 'The student forgot his/her notebook.',
          whyWrongThai: 'ในข้อสอบเป็นทางการ "the student" เอกพจน์ → ใช้ his/her หรือระบุเพศชัดเจน. การใช้ their เริ่มยอมรับในภาษาสมัยใหม่แต่ในข้อสอบเก่าควรหลีกเลี่ยง',
        },
        {
          sentence: 'Every employee must complete their training.',
          correction: 'Every employee must complete his or her training.',
          whyWrongThai: '"Every + noun" เอกพจน์ → ในข้อสอบเป็นทางการใช้ "his or her"',
        },
      ],
    },
    {
      ruleTitle: 'pronoun reference in reading context',
      explanationThai: 'ในการอ่าน เมื่อเจอ pronoun ต้องระบุว่าหมายถึงนามตัวใด หลักการ: (1) ตรงกันเรื่องจำนวนและเพศ (2) ใกล้ที่สุดเป็นไปได้ (3) เป็นประธานที่กระทำการอย่างต่อเนื่อง (4) ตรงกับบริบทเชิงตรรกะ',
      explanationEnglish: 'In reading, identify what each pronoun refers to. Match by (1) number and gender, (2) recency, (3) parallel subject continuity, (4) logical context.',
      pattern: 'pronoun → most recent matching noun in logical context',
      correctExamples: [
        {
          sentence: 'Anong called her cousin. She told her cousin about the lost camera.',
          translationThai: 'อนงค์โทรหาญาติ เธอเล่าให้ญาติฟังเรื่องกล้องที่หาย',
          noteThai: '"She" = Anong (ประธานต่อเนื่องของการกระทำ)',
        },
        {
          sentence: 'The students were studying when their teacher arrived. He greeted them warmly.',
          translationThai: 'นักเรียนกำลังเรียนอยู่เมื่อครูมาถึง เขาทักทายพวกเขาอย่างอบอุ่น',
          noteThai: '"He" = the teacher (ตรงกับเพศชาย ใกล้ที่สุด). "them" = the students (พหูพจน์ที่ถูกกระทำ)',
        },
        {
          sentence: 'The pharmacist took the medicine from her bag and gave it to the boy.',
          translationThai: 'เภสัชกรหยิบยาจากกระเป๋าและให้เด็กผู้ชาย',
          noteThai: '"it" = the medicine (เอกพจน์ที่ถูกกระทำ). "her" = the pharmacist (เพศหญิง)',
        },
      ],
      wrongExamples: [
        {
          sentence: 'When the boy met the doctor, he gave him a candy. (ambiguous)',
          correction: 'When the boy met the doctor, the doctor gave him a candy. (clearer)',
          whyWrongThai: '"he" และ "him" ทั้งสองตัวอ้างถึงคนชายได้ทั้ง boy และ doctor — ต้องใช้บริบทช่วย',
        },
      ],
    },
    {
      ruleTitle: '"this/these" referring back to whole ideas',
      explanationThai: 'this/these สามารถอ้างถึงทั้งประโยคหรือแนวคิดที่เพิ่งกล่าวมาได้ ไม่ใช่แค่นามตัวเดียว ในข้อสอบ Reading จะเจอบ่อย "This means that..." "This is why..."',
      explanationEnglish: '"this/these" can refer back to a whole idea or sentence, not just a single noun. Common in academic writing: "This means..." "This is why..."',
      pattern: 'previous statement + This/These + verb (referring to the whole idea)',
      correctExamples: [
        {
          sentence: 'The bridge was damaged in the storm. This caused major traffic problems.',
          translationThai: 'สะพานเสียหายในพายุ สิ่งนี้ทำให้เกิดปัญหาจราจรอย่างมาก',
          noteThai: '"This" = สถานการณ์ทั้งหมด (สะพานเสียหาย)',
        },
        {
          sentence: 'Many students are using AI tools to write essays. This raises concerns about academic integrity.',
          translationThai: 'นักเรียนจำนวนมากใช้เครื่องมือ AI ในการเขียนเรียงความ สิ่งนี้สร้างความกังวลด้านความซื่อสัตย์ทางวิชาการ',
          noteThai: '"This" = แนวโน้มทั้งหมด',
        },
      ],
      wrongExamples: [
        {
          sentence: 'It rained heavily yesterday. They cancelled the picnic.',
          correction: 'It rained heavily yesterday. This is why they cancelled the picnic.',
          whyWrongThai: 'ถ้าต้องการอ้างถึงเหตุการณ์ทั้งหมดและสร้างความเชื่อมโยง ใช้ "This" + ผลลัพธ์',
        },
      ],
    },
  ],

  examPatterns: [
    {
      patternName: 'subject vs object pronoun trap',
      howItAppearsInExamThai: 'โจทย์มีตัวเลือก subject และ object pronoun (he/him, she/her, they/them) ในตำแหน่งที่ทดสอบบทบาทไวยากรณ์',
      signalWords: ['between you and ___', 'verb + ___', 'and ___ went', 'with ___', 'for ___'],
      trapChoices: ['subject form หลัง preposition', 'object form ในตำแหน่งประธาน'],
      examTipThai: 'หลังกริยาและ preposition ใช้ object (me, him, her, us, them). ในตำแหน่งประธานใช้ subject (I, he, she, we, they)',
    },
    {
      patternName: 'possessive adjective vs pronoun',
      howItAppearsInExamThai: 'ตัวเลือก my/mine, your/yours, his/his, her/hers, our/ours, their/theirs',
      signalWords: ['___ + noun', 'is ___ (alone)', 'is mine', 'is yours'],
      trapChoices: ['my (ยืนเดี่ยว)', 'mine + noun', 'her (ยืนเดี่ยว)'],
      examTipThai: 'ก่อนนาม → my/your/his/her/our/their. ยืนเดี่ยว → mine/yours/his/hers/ours/theirs',
    },
    {
      patternName: 'this/these singular vs plural',
      howItAppearsInExamThai: 'โจทย์ทดสอบว่า demonstrative ตรงกับจำนวนของนาม',
      signalWords: ['this + singular', 'these + plural', 'that + singular', 'those + plural'],
      trapChoices: ['this + plural noun', 'these + singular noun'],
      examTipThai: 'this/that + เอกพจน์. these/those + พหูพจน์',
    },
    {
      patternName: 'reflexive pronoun trap',
      howItAppearsInExamThai: 'โจทย์ที่ประธานและกรรมเป็นบุคคลเดียวกัน ตัวเลือกมีทั้ง object และ reflexive',
      signalWords: ['herself', 'himself', 'themselves', 'taught ___ to', 'reminded ___ to'],
      trapChoices: ['object pronoun (her/him) เมื่อต้อง reflexive'],
      examTipThai: 'ถ้าประธาน = กรรม ใช้ reflexive (myself, herself, themselves). ถ้าต่างคน ใช้ object pronoun',
    },
    {
      patternName: 'pronoun reference in reading',
      howItAppearsInExamThai: 'คำถาม "the pronoun X refers to:" พร้อม 4 ตัวเลือกที่เป็นนามต่างกัน',
      signalWords: ['who/what does ___ refer to', 'the pronoun ___'],
      trapChoices: ['นามไกล แต่ตรงเพศ/จำนวน', 'นามใกล้ แต่ไม่ตรงบทบาท'],
      examTipThai: 'หลักการเลือก: (1) ตรงเพศและจำนวน (2) ใกล้ที่สุดเป็นไปได้ (3) เป็นประธานต่อเนื่อง (4) ตรรกะของบริบท',
    },
    {
      patternName: 'their vs his or her in formal writing',
      howItAppearsInExamThai: 'โจทย์ที่มี "Each" "Every" "Anyone" "Someone" + tested pronoun',
      signalWords: ['Each + noun', 'Every + noun', 'Anyone', 'Someone', 'A student'],
      trapChoices: ['their (ในข้อสอบเป็นทางการเก่า)'],
      examTipThai: 'ในข้อสอบเขียนเป็นทางการดั้งเดิม Each/Every/Anyone + his or her. ในภาษาสมัยใหม่ "their" ก็ยอมรับ แต่ขึ้นกับสไตล์ข้อสอบ',
    },
  ],

  commonMistakesThaiStudents: [
    {
      mistake: 'ใช้ subject pronoun หลัง preposition',
      whyItHappensThai: 'นักเรียนคุ้นเคยกับ I มากกว่า me เลยใช้ "I" หลัง preposition',
      fixThai: 'หลัง preposition (between, with, for, to) ใช้ object pronoun เสมอ — between you and me',
      example: 'ผิด: Between you and I → ถูก: Between you and me',
    },
    {
      mistake: 'สับสน my กับ mine',
      whyItHappensThai: 'ภาษาไทยใช้ "ของฉัน" ทั้งสองกรณี',
      fixThai: 'my + noun (my book). mine ยืนเดี่ยว (the book is mine)',
      example: 'ผิด: This is mine book. → ถูก: This is my book.',
    },
    {
      mistake: 'ใช้ this กับนามพหูพจน์',
      whyItHappensThai: 'นักเรียนแปล "นี่" เป็น this เสมอโดยไม่ดูจำนวน',
      fixThai: 'this/that = เอกพจน์. these/those = พหูพจน์',
      example: 'ผิด: This shoes are nice. → ถูก: These shoes are nice.',
    },
    {
      mistake: 'ใช้ object pronoun แทน reflexive',
      whyItHappensThai: 'ภาษาไทยใช้ "ตัวเอง" เป็นคำเดียว นักเรียนเลยไม่รู้ว่าต้องเปลี่ยนเป็น -self/-selves',
      fixThai: 'ถ้าประธาน = กรรม ใช้ reflexive (myself, yourself, himself, herself, ourselves, themselves)',
      example: 'ผิด: She bought her a present. (when meaning herself) → ถูก: She bought herself a present.',
    },
    {
      mistake: 'pronoun ไม่ตรงกับ antecedent',
      whyItHappensThai: 'นักเรียนใช้ they เป็น default แม้ antecedent เป็นเอกพจน์',
      fixThai: 'ตรวจ antecedent ก่อน — เอกพจน์ → he/she/it. พหูพจน์ → they',
      example: 'ผิด: Each student should bring their book. (formal exam) → ถูก: Each student should bring his or her book.',
    },
    {
      mistake: 'เลือก pronoun reference ผิดในข้อสอบอ่าน',
      whyItHappensThai: 'นักเรียนเลือกนามที่อยู่ใกล้ที่สุดโดยไม่ตรวจเพศ/จำนวน/บทบาท',
      fixThai: 'หลักการ 4 ขั้น: (1) ตรงเพศ/จำนวน (2) ใกล้ที่สุด (3) ประธานต่อเนื่อง (4) ตรรกะ',
      example: 'In "Mary helped John, and she thanked him" — "she" = Mary (เพศหญิง), "him" = John (เพศชาย)',
    },
  ],

  quickRulesThai: [
    'subject pronouns: I, you, he, she, it, we, they (ก่อนกริยา)',
    'object pronouns: me, you, him, her, it, us, them (หลังกริยา/preposition)',
    'possessive adjectives: my, your, his, her, its, our, their (+ noun)',
    'possessive pronouns: mine, yours, his, hers, ours, theirs (ยืนเดี่ยว)',
    'reflexive: myself, yourself, himself, herself, ourselves, themselves (ประธาน = กรรม)',
    'this/that = เอกพจน์. these/those = พหูพจน์',
    'pronoun ต้องตรงกับ antecedent ทั้งจำนวนและเพศ',
    'reference: ตรงเพศ/จำนวน + ใกล้ที่สุด + ตรรกะของบริบท',
  ],

  memoryTipsThai: [
    'ตารางสรรพนาม 4 รูป: I/me/my/mine, you/you/your/yours, he/him/his/his, she/her/her/hers, it/it/its/its, we/us/our/ours, they/them/their/theirs',
    'ทดสอบ "between you and ?": ใช้ me เสมอ (ห้าม I)',
    'จำว่า possessive adjective ตามด้วย noun. possessive pronoun ยืนเดี่ยว',
    'this/these คือใกล้ — that/those คือไกล',
    'ในการอ่าน: ขีดเส้นใต้ pronoun แล้วลองแทนนามที่อาจเป็นได้ — ดูตรงเพศ จำนวน บริบท',
  ],

  miniQuiz: [
    {
      question: 'My brother and _____ went hiking last weekend in Khao Yai.',
      choices: ['I', 'me', 'my', 'myself'],
      correctAnswer: 'I',
      explanationThai: 'ตำแหน่งประธาน (ก่อนกริยา went) ใช้ subject pronoun "I" ส่วน "me" เป็น object form, "my" เป็น possessive, "myself" เป็น reflexive',
      skillTag: 'pronoun',
    },
    {
      question: 'The teacher gave the assignment to John and _____ at the end of class.',
      choices: ['I', 'me', 'my', 'myself'],
      correctAnswer: 'me',
      explanationThai: 'หลัง preposition "to" ใช้ object pronoun "me" ส่วน "I" เป็น subject form, "my" เป็น possessive',
      skillTag: 'pronoun',
    },
    {
      question: 'Sarah forgot _____ umbrella at the café yesterday.',
      choices: ['she', 'her', 'hers', 'herself'],
      correctAnswer: 'her',
      explanationThai: 'ก่อน noun "umbrella" ใช้ possessive adjective "her" ส่วน "hers" ยืนเดี่ยว, "she" เป็น subject, "herself" เป็น reflexive',
      skillTag: 'pronoun',
    },
    {
      question: 'I lent my notes to Tom because _____ are more detailed than _____.',
      choices: ['my / his', 'mine / his', 'my / him', 'mine / he'],
      correctAnswer: 'mine / his',
      explanationThai: 'ทั้งสองตำแหน่งยืนเดี่ยว (ไม่มีนามตามหลัง) → ใช้ possessive pronouns "mine" (= my notes) และ "his" (= his notes)',
      skillTag: 'pronoun',
    },
    {
      question: 'After working all day, she made _____ a cup of tea and relaxed.',
      choices: ['her', 'hers', 'herself', 'she'],
      correctAnswer: 'herself',
      explanationThai: 'ประธาน (she) = กรรม (made tea for whom?) → reflexive "herself". ส่วน "her" จะหมายถึงคนอื่น',
      skillTag: 'pronoun',
    },
    {
      question: '_____ are the new books I ordered last week.',
      choices: ['This', 'That', 'These', 'Them'],
      correctAnswer: 'These',
      explanationThai: '"books" พหูพจน์ + ใกล้ → "These". ส่วน "This/That" สำหรับเอกพจน์, "Them" เป็น object pronoun',
      skillTag: 'pronoun',
    },
    {
      question: 'Each student must submit _____ assignment by Friday afternoon.',
      choices: ['their', 'his or her', 'they', 'them'],
      correctAnswer: 'his or her',
      explanationThai: 'ในข้อสอบเขียนเป็นทางการ "Each student" เป็นเอกพจน์ → "his or her". ในภาษาสมัยใหม่ "their" ก็ยอมรับ แต่ "his or her" ยังเป็นมาตรฐานในข้อสอบ',
      skillTag: 'pronoun',
    },
    {
      question: 'The committee announced _____ decision after a long meeting.',
      choices: ['their', 'its', 'they', 'them'],
      correctAnswer: 'its',
      explanationThai: '"committee" เป็น collective noun ใช้เอกพจน์ในความหมายขององค์กร → "its". ใช้ "their" ได้เฉพาะเมื่อเน้นที่สมาชิกในคณะกรรมการแบบรายบุคคล',
      skillTag: 'pronoun',
    },
    {
      question: 'I called my friend yesterday, but _____ phone was off.',
      choices: ['his', 'him', 'he', 'himself'],
      correctAnswer: 'his',
      explanationThai: 'ก่อน noun "phone" ใช้ possessive adjective "his" ส่วน "him" เป็น object, "he" เป็น subject, "himself" เป็น reflexive',
      skillTag: 'pronoun',
    },
  ],

  masteryChecklist: [
    'ฉันแยก subject pronouns (I, he, she) จาก object pronouns (me, him, her) ได้',
    'ฉันแยก possessive adjectives (my, his) จาก possessive pronouns (mine, his) ได้',
    'ฉันใช้ object pronoun หลัง preposition เสมอ (between you and me)',
    'ฉันใช้ reflexive pronouns (myself, herself) เมื่อประธาน = กรรม',
    'ฉันใช้ this/that กับเอกพจน์ และ these/those กับพหูพจน์',
    'ฉันรู้ว่า each/every/anyone เป็นเอกพจน์ → his or her (formal)',
    'ฉันสามารถระบุ pronoun reference ในข้อความอ่านได้โดยใช้เพศ จำนวน และบริบท',
    'ฉันเข้าใจว่า this/these สามารถอ้างถึงทั้งประโยคหรือแนวคิดได้',
  ],
}

export default pronounsReference

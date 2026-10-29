// Mock Exam Set 04 — laid out like the real university entrance exam
// (3 grammar cloze passages + 3 reading passages with numbered lines).
// All passages, questions and choices are original. Explanations are in Thai.
// Converted from the "M-Style" set written in PR #6.

const set04 = {
  "setId": "set04",
  "title": "Mock Exam Set 04 · แนวข้อสอบจริง",
  "description": "ชุดที่จัดรูปแบบตามข้อสอบเข้ามหาวิทยาลัยนานาชาติ: Grammar cloze 3 บทความ และ Reading 3 บทความที่อ้างอิงเลขบรรทัด บทความและโจทย์แต่งขึ้นใหม่ทั้งหมด",
  "timeLimitMinutes": 60,
  "totalQuestions": 60,
  "grammarCount": 30,
  "readingCount": 30,
  "difficulty": "medium",
  "questions": [
    {
      "id": "S04-Q001",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G1",
      "passageTitle": "Fines for Noisy Neighbours",
      "passage": "Residents of a quiet Thai suburb who are too stressed __(1)__ sleep at night may soon be able to take their noisy neighbours to court.\nThe idea sounds extreme, but local leaders say they have few other choices in a town __(2)__ has grown rapidly over the past ten years.\nUnder a draft rule proposed last month, any resident could ask the court to stop one __(3)__ more neighbours from playing loud music after midnight.\nThe city council has not yet voted on the rule, __(4)__ most members are thought to support it. Similar rules already exist in Singapore, Germany and parts of Australia.\n__(5)__ a court warning could mean a fine of up to 5,000 baht or a ban __(6)__ up to six months on holding parties at home.\nThe plan has divided the community. Some people say it is unfriendly and against Thai culture. Others describe cases of elderly residents kept awake __(7)__ karaoke machines every night.\nDr. Somchai Dee, a lawyer who helped to write the rule, said it did not try to punish ordinary families but __(8)__ at the small number of households that refuse to listen to polite requests.\nA local journalist said __(9)__ rule seemed to have strong public support.\n'But many residents might find it __(10)__ that neighbours can no longer solve such problems simply by talking to each other,' she said.",
      "question": "Choose the best answer for blank (1).",
      "choices": [
        "for",
        "about",
        "to",
        "by"
      ],
      "correctAnswer": "to",
      "skillTag": "gerund_infinitive",
      "difficulty": "medium",
      "explanationThai": "ข้างหน้าช่องว่างมีคำว่า too stressed และข้างหลังเป็นกริยาช่อง 1 คือ sleep นี่คือโครงสร้าง too + คำคุณศัพท์ + to + กริยาช่อง 1 แปลว่า \"มากเกินกว่าจะ...\" ดังนั้น too stressed to sleep แปลว่า เครียดเกินกว่าจะนอนหลับได้ ประโยคเต็มคือ Residents who are too stressed to sleep at night may soon be able to take their noisy neighbours to court.",
      "whyWrong": {
        "1": "for ต้องตามด้วยคำนามหรือคำสรรพนาม เช่น too hard for me แต่ข้างหลังช่องว่างคือกริยา sleep จึงใช้ for ไม่ได้",
        "2": "stressed about แปลว่าเครียดเรื่อง... ต้องตามด้วยคำนามหรือ V-ing เช่น stressed about exams ตามด้วย sleep ซึ่งเป็นกริยาช่อง 1 ไม่ได้",
        "3": "",
        "4": "by ต้องตามด้วยคำนามหรือ V-ing เช่น by sleeping ตามด้วยกริยาช่อง 1 ไม่ได้"
      },
      "examTrick": "เห็น too + คำคุณศัพท์ แล้วข้างหลังเป็นกริยาช่อง 1 ให้ตอบ to ทันที เป็นจุดที่ข้อสอบจริงชอบออกเป็นข้อแรก ๆ"
    },
    {
      "id": "S04-Q002",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G1",
      "passageTitle": "Fines for Noisy Neighbours",
      "passage": "",
      "question": "Choose the best answer for blank (2).",
      "choices": [
        "that",
        "what",
        "where",
        "who"
      ],
      "correctAnswer": "that",
      "skillTag": "relative_clause",
      "difficulty": "medium",
      "explanationThai": "ช่องว่างอยู่หลังคำนาม a town และข้างหลังคือกริยา has grown ทันที แปลว่าประโยคย่อยนี้ขาดประธาน เราจึงต้องใช้ relative pronoun ที่ทำหน้าที่เป็นประธานแทนเมือง คือ that หรือ which ช้อยส์ที่มีคือ that ประโยคเต็ม a town that has grown rapidly แปลว่า เมืองที่เติบโตอย่างรวดเร็ว",
      "whyWrong": {
        "1": "",
        "2": "what แปลว่า สิ่งที่ จะไม่มีคำนามมาอยู่ข้างหน้า ถ้ามีคำนามอย่าง a town อยู่แล้วห้ามใช้ what",
        "3": "where เป็นกับดัก เพราะ town เป็นสถานที่ แต่ where ต้องตามด้วยประโยคที่มีประธานครบ เช่น a town where many people live ในข้อนี้ข้างหลังไม่มีประธาน จึงใช้ where ไม่ได้",
        "4": "who ใช้กับคนเท่านั้น town ไม่ใช่คน"
      },
      "examTrick": "หลังช่องว่างเป็นกริยาเลย แปลว่าขาดประธาน ให้เลือก who สำหรับคน หรือ which, that สำหรับสิ่งของและสถานที่ อย่าเลือก where เพียงเพราะคำนามเป็นสถานที่"
    },
    {
      "id": "S04-Q003",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G1",
      "passageTitle": "Fines for Noisy Neighbours",
      "passage": "",
      "question": "Choose the best answer for blank (3).",
      "choices": [
        "and",
        "as",
        "so",
        "or"
      ],
      "correctAnswer": "or",
      "skillTag": "conjunction",
      "difficulty": "medium",
      "explanationThai": "one or more เป็นวลีตายตัว แปลว่า หนึ่งคนขึ้นไป ประโยคนี้หมายถึงผู้อยู่อาศัยสามารถขอให้ศาลห้ามเพื่อนบ้านหนึ่งคนหรือมากกว่านั้นไม่ให้เปิดเพลงดังหลังเที่ยงคืน",
      "whyWrong": {
        "1": "one and more ไม่ใช่สำนวนภาษาอังกฤษ และความหมายผิด เพราะเพื่อนบ้านจะเป็นทั้งหนึ่งคนและหลายคนพร้อมกันไม่ได้",
        "2": "as more ไม่มีความหมายในที่นี้",
        "3": "so ใช้บอกผลลัพธ์ ใช้เชื่อมตัวเลขแบบนี้ไม่ได้",
        "4": ""
      },
      "examTrick": "จำเป็นชุด: one or more (หนึ่งขึ้นไป), two or three (สองสาม), sooner or later (ไม่ช้าก็เร็ว), more or less (ประมาณ)"
    },
    {
      "id": "S04-Q004",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G1",
      "passageTitle": "Fines for Noisy Neighbours",
      "passage": "",
      "question": "Choose the best answer for blank (4).",
      "choices": [
        "therefore",
        "hence",
        "also",
        "but"
      ],
      "correctAnswer": "but",
      "skillTag": "conjunction",
      "difficulty": "medium",
      "explanationThai": "สองส่วนของประโยคมีความหมายขัดกัน ส่วนแรกบอกว่าสภายังไม่ได้ลงมติ ส่วนหลังบอกว่าสมาชิกส่วนใหญ่น่าจะสนับสนุน เมื่อความหมายขัดกันต้องใช้ but ประโยคเต็ม The city council has not yet voted on the rule, but most members are thought to support it.",
      "whyWrong": {
        "1": "therefore แปลว่า ดังนั้น ใช้บอกผลลัพธ์ แต่ความหมายในข้อนี้ขัดกัน และ therefore เป็นคำกริยาวิเศษณ์ เชื่อมสองประโยคด้วยเครื่องหมายจุลภาคอย่างเดียวไม่ได้",
        "2": "hence แปลว่า ดังนั้น เหมือน therefore ผิดทั้งความหมายและไวยากรณ์",
        "3": "also แปลว่า ด้วย ไม่ใช่คำเชื่อม ใช้เชื่อมสองประโยคไม่ได้",
        "4": ""
      },
      "examTrick": "อ่านความหมายของสองฝั่งก่อน ถ้าขัดกันตอบ but หรือ although ถ้าเป็นเหตุผลตอบ because ถ้าเป็นผลตอบ so และจำไว้ว่า therefore, hence, however เชื่อมประโยคด้วยจุลภาคอย่างเดียวไม่ได้"
    },
    {
      "id": "S04-Q005",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G1",
      "passageTitle": "Fines for Noisy Neighbours",
      "passage": "",
      "question": "Choose the best answer for blank (5).",
      "choices": [
        "Ignorance",
        "Ignoring",
        "Ignorant",
        "Ignorantly"
      ],
      "correctAnswer": "Ignoring",
      "skillTag": "word_form",
      "difficulty": "medium",
      "explanationThai": "ช่องว่างอยู่ต้นประโยค และกริยาหลักของประโยคคือ could mean แปลว่าส่วน ช่องว่าง + a court warning ต้องเป็นประธาน และข้างหลังช่องว่างมีกรรม a court warning ตามมาทันที คำที่เป็นประธานได้และมีกรรมตามได้คือ Gerund หรือ V-ing ที่ทำหน้าที่เป็นคำนาม ดังนั้น Ignoring a court warning แปลว่า การเพิกเฉยต่อคำเตือนของศาล อาจหมายถึงการถูกปรับสูงสุด 5,000 บาท",
      "whyWrong": {
        "1": "Ignorance เป็นคำนาม แปลว่า ความไม่รู้ เป็นประธานได้ก็จริง แต่คำนามมีกรรมตามหลังทันทีไม่ได้ ต้องใช้ Ignorance of... และความหมายก็ผิดด้วย เพราะไม่ใช่เรื่องไม่รู้ แต่เป็นการจงใจเพิกเฉย",
        "2": "",
        "3": "Ignorant เป็นคำคุณศัพท์ แปลว่า ไม่รู้ เป็นประธานของประโยคไม่ได้",
        "4": "Ignorantly เป็นคำกริยาวิเศษณ์ ขยายกริยา เป็นประธานไม่ได้"
      },
      "examTrick": "ช่องว่างอยู่ต้นประโยคและมีคำนามตามหลังทันที ให้นึกถึง V-ing ที่ทำหน้าที่เป็นประธาน เช่น Eating vegetables is healthy หรือ Breaking the law can be dangerous"
    },
    {
      "id": "S04-Q006",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G1",
      "passageTitle": "Fines for Noisy Neighbours",
      "passage": "",
      "question": "Choose the best answer for blank (6).",
      "choices": [
        "at",
        "with",
        "of",
        "by"
      ],
      "correctAnswer": "of",
      "skillTag": "preposition",
      "difficulty": "medium",
      "explanationThai": "เวลาบอกขนาดหรือระยะเวลาของบางสิ่ง เราใช้ of ตามด้วยจำนวน เช่น a fine of 5,000 baht หรือ a ban of six months ในข้อนี้ a ban of up to six months แปลว่า การห้ามเป็นเวลาสูงสุดหกเดือน สังเกตว่าในประโยคเดียวกันก็มี a fine of up to 5,000 baht เป็นตัวช่วยอยู่แล้ว",
      "whyWrong": {
        "1": "at ใช้กับจุดเวลา หรือราคาและอัตรา เช่น at 5 o'clock หรือ at 100 km per hour ไม่ใช้บอกความยาวของโทษ",
        "2": "with แปลว่า กับ หรือ มี ไม่ใช้บอกขนาดหรือระยะเวลาของคำนามข้างหน้า",
        "3": "",
        "4": "by ใช้บอกการเปลี่ยนแปลง เช่น increased by 10% หรือบอกผู้กระทำ ไม่ใช้ในที่นี้"
      },
      "examTrick": "คำนาม + of + จำนวน ใช้บอกขนาด ราคา หรือระยะเวลา เช่น a salary of 30,000 baht, a jail term of two years, a distance of 5 km"
    },
    {
      "id": "S04-Q007",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G1",
      "passageTitle": "Fines for Noisy Neighbours",
      "passage": "",
      "question": "Choose the best answer for blank (7).",
      "choices": [
        "by",
        "for",
        "at",
        "on"
      ],
      "correctAnswer": "by",
      "skillTag": "preposition",
      "difficulty": "medium",
      "explanationThai": "kept awake เป็นรูป Passive ที่ย่อมาจาก who were kept awake แปลว่า ถูกทำให้ตื่นอยู่ เมื่อเป็น Passive แล้วอยากบอกว่าใครหรืออะไรเป็นผู้กระทำ ให้ใช้ by ดังนั้น kept awake by karaoke machines แปลว่า ถูกเครื่องคาราโอเกะทำให้นอนไม่หลับ",
      "whyWrong": {
        "1": "",
        "2": "for ใช้บอกจุดประสงค์ หรือว่าเพื่อใคร ไม่ใช้บอกผู้กระทำใน Passive",
        "3": "at ใช้บอกตำแหน่ง หรือสิ่งที่เป็นเป้าหมาย เช่น look at ไม่ใช้บอกผู้กระทำ",
        "4": "on ใช้บอกพื้นผิวหรือวัน ไม่ใช้บอกผู้กระทำ"
      },
      "examTrick": "เห็นกริยาช่อง 3 แบบ Passive เช่น kept, abandoned, written, built แล้วตามด้วยคนหรือสิ่งที่ทำ ให้ตอบ by"
    },
    {
      "id": "S04-Q008",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G1",
      "passageTitle": "Fines for Noisy Neighbours",
      "passage": "",
      "question": "Choose the best answer for blank (8).",
      "choices": [
        "directed",
        "was directed",
        "has directed",
        "will be directed"
      ],
      "correctAnswer": "was directed",
      "skillTag": "parallel_structure",
      "difficulty": "medium",
      "explanationThai": "ข้อนี้มีสองจุดต้องดู จุดแรกคือโครงสร้างคู่ขนาน it did not try to punish... but ช่องว่าง at... ประธานของทั้งสองส่วนคือ it ซึ่งหมายถึงกฎ และเล่าเป็นอดีตเพราะเป็นคำพูดรายงาน (said) จุดที่สอง direct เป็นกริยาที่ต้องมีกรรม คือ direct something at someone กฎไม่ได้เล็งอะไรเอง แต่กฎถูกเล็งไปที่ครัวเรือนกลุ่มเล็ก ๆ จึงต้องใช้ Passive รูปอดีต คือ was directed at แปลว่า กฎนี้มุ่งเป้าไปที่ครัวเรือนจำนวนน้อยที่ไม่ยอมฟังคำขอร้อง",
      "whyWrong": {
        "1": "directed เป็นรูป Active แต่ direct ต้องมีกรรมตามหลัง ในประโยคนี้ไม่มีกรรม มีแต่ at ตามมาเลย ความหมายที่ถูกคือกฎถูกเล็งไป จึงต้องเป็น Passive",
        "2": "",
        "3": "has directed เป็น Present Perfect แบบ Active ผิดทั้งรูปกาล (เรื่องเล่าเป็นอดีต) และผิดเพราะไม่ใช่ Passive",
        "4": "will be directed เป็นอนาคต แต่ประโยคนี้เล่าเป็นอดีต (said, did not try) จึงไม่ขนานกัน"
      },
      "examTrick": "เห็น not ... but ... ให้ทำให้สองฝั่งมีรูปแบบและเวลาเดียวกัน จากนั้นถามตัวเองว่าประธานเป็นคนทำ (Active) หรือถูกกระทำ (Passive)"
    },
    {
      "id": "S04-Q009",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G1",
      "passageTitle": "Fines for Noisy Neighbours",
      "passage": "",
      "question": "Choose the best answer for blank (9).",
      "choices": [
        "a",
        "any",
        "some",
        "the"
      ],
      "correctAnswer": "the",
      "skillTag": "article",
      "difficulty": "medium",
      "explanationThai": "rule ในที่นี้คือกฎที่พูดถึงมาตั้งแต่ต้นบทความ ทั้งคนพูดและคนฟังรู้แล้วว่าหมายถึงกฎเรื่องเพื่อนบ้านเสียงดัง เมื่อเป็นสิ่งที่เจาะจงและพูดถึงมาแล้วต้องใช้ the ดังนั้น the rule seemed to have strong public support",
      "whyWrong": {
        "1": "a ใช้กับสิ่งที่พูดถึงเป็นครั้งแรก หรือไม่เจาะจงว่าอันไหน แต่กฎนี้ถูกพูดถึงหลายครั้งแล้ว",
        "2": "any ใช้ในประโยคปฏิเสธหรือคำถาม หรือแปลว่าอันไหนก็ได้ ความหมายไม่เข้ากับข้อนี้",
        "3": "some ใช้กับคำนามพหูพจน์หรือนามนับไม่ได้ แต่ rule ในประโยคนี้เป็นเอกพจน์และเจาะจงแล้ว",
        "4": ""
      },
      "examTrick": "ถ้าคำนามนั้นถูกพูดถึงมาแล้วในบทความ (เช่น the Bill, the rule, the plan) ให้ตอบ the เกือบทุกครั้ง"
    },
    {
      "id": "S04-Q010",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G1",
      "passageTitle": "Fines for Noisy Neighbours",
      "passage": "",
      "question": "Choose the best answer for blank (10).",
      "choices": [
        "embarrassed",
        "embarrassment",
        "embarrassingly",
        "embarrassing"
      ],
      "correctAnswer": "embarrassing",
      "skillTag": "word_form",
      "difficulty": "medium",
      "explanationThai": "โครงสร้างคือ find it + คำคุณศัพท์ + that... แปลว่า รู้สึกว่าเรื่องนั้น... โดย it แทนเรื่องที่ตามมาหลัง that คือการที่เพื่อนบ้านคุยกันเองไม่ได้แล้ว ช่องว่างจึงต้องเป็นคำคุณศัพท์ และเพราะเป็นการบรรยายเรื่องหรือสถานการณ์ที่ทำให้คนรู้สึกอาย จึงใช้รูป -ing คือ embarrassing แปลว่า น่าอาย",
      "whyWrong": {
        "1": "embarrassed เป็นคำคุณศัพท์ก็จริง แต่รูป -ed ใช้บรรยายความรู้สึกของคน เช่น I feel embarrassed ในข้อนี้ it คือเรื่องราว ไม่ใช่คน เรื่องราวรู้สึกอายเองไม่ได้",
        "2": "embarrassment เป็นคำนาม แปลว่า ความอับอาย ไม่ใช้หลัง find it ในโครงสร้างนี้",
        "3": "embarrassingly เป็นคำกริยาวิเศษณ์ ขยายกริยาหรือคำคุณศัพท์ ใช้หลัง find it ไม่ได้",
        "4": ""
      },
      "examTrick": "find it, consider it, make it ตามด้วยคำคุณศัพท์ และจำว่า -ing ใช้กับสิ่งที่ทำให้รู้สึก (boring, embarrassing) ส่วน -ed ใช้กับคนที่รู้สึก (bored, embarrassed)"
    },
    {
      "id": "S04-Q011",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G2",
      "passageTitle": "My Secret Exam Strategies",
      "passage": "A friend once told me: 'I always smile during exams to look confident, __(11)__ inside I am terrified.' And my English teacher warned us: 'Get enough sleep the night before, __(12)__ you will fall asleep on your answer sheet.'\n__(13)__ I got a low score in a test and my parents asked me why, I always gave __(14)__ the same answer: I was a kind-hearted person. I did not raise my hand to ask for extra paper __(15)__ I did not want to wake the cat sleeping on the windowsill. Somehow, this strange excuse always ended the conversation.\nOne of my favourite subjects __(16)__ physics. I especially enjoyed learning about magnets and batteries. __(17)__ may be small objects, but they gave me big ideas.\n__(18)__ history was concerned, my favourite topics were ancient kings and their battles. I liked drawing maps of old kingdoms: I would first draw a big circle for the capital and then __(19)__ many small triangles around it to show the mountains. The amazing thing about history is that we can learn about the future __(20)__ studying the past.",
      "question": "Choose the best answer for blank (11).",
      "choices": [
        "since",
        "although",
        "whenever",
        "which"
      ],
      "correctAnswer": "although",
      "skillTag": "conjunction",
      "difficulty": "medium",
      "explanationThai": "สองส่วนขัดแย้งกัน ส่วนแรกบอกว่ายิ้มให้ดูมั่นใจ ส่วนหลังบอกว่าข้างในกลัวมาก เมื่อสองส่วนขัดแย้งกันให้ใช้ although แปลว่า ถึงแม้ว่า ประโยคเต็ม I always smile during exams to look confident, although inside I am terrified.",
      "whyWrong": {
        "1": "since แปลว่า เพราะ หรือ ตั้งแต่ ใช้บอกเหตุผล แต่การกลัวไม่ใช่เหตุผลของการยิ้มให้ดูมั่นใจ",
        "2": "",
        "3": "whenever แปลว่า เมื่อไรก็ตาม ทำให้ความหมายแปลก และไม่ได้แสดงความขัดแย้ง",
        "4": "which เป็น relative pronoun ต้องขยายคำนามหรือข้อความข้างหน้า และต้องทำหน้าที่ในประโยคย่อย แต่ inside I am terrified มีประธานและกริยาครบแล้ว"
      },
      "examTrick": "คำแสดงความขัดแย้งที่ออกบ่อย: although, though, even though ตามด้วยประโยค ส่วน despite, in spite of ตามด้วยคำนามหรือ V-ing"
    },
    {
      "id": "S04-Q012",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G2",
      "passageTitle": "My Secret Exam Strategies",
      "passage": "",
      "question": "Choose the best answer for blank (12).",
      "choices": [
        "or",
        "and",
        "so",
        "yet"
      ],
      "correctAnswer": "or",
      "skillTag": "conjunction",
      "difficulty": "medium",
      "explanationThai": "ประโยคแรกเป็นประโยคคำสั่ง Get enough sleep และส่วนหลังเป็นผลเสียที่จะเกิดขึ้นถ้าไม่ทำตาม รูปแบบ ประโยคคำสั่ง + or + ผลเสีย แปลว่า ไม่อย่างนั้น หรือ มิฉะนั้น ดังนั้น Get enough sleep, or you will fall asleep on your answer sheet แปลว่า นอนให้พอนะ ไม่อย่างนั้นจะหลับคากระดาษคำตอบ",
      "whyWrong": {
        "1": "",
        "2": "ประโยคคำสั่ง + and ใช้กับผลดี เช่น Study hard and you will pass ถ้าใช้ and ในข้อนี้จะแปลว่า นอนให้พอแล้วจะหลับคากระดาษคำตอบ ซึ่งไม่สมเหตุสมผล",
        "3": "so แปลว่า ดังนั้น ไม่เข้ากับโครงสร้างคำสั่ง + คำเตือน",
        "4": "yet แปลว่า แต่ ใช้แสดงความขัดแย้ง ไม่เข้ากับความหมายของการเตือน"
      },
      "examTrick": "ประโยคคำสั่ง + or + ผลเสีย แปลว่า ไม่อย่างนั้น เช่น Hurry up, or you'll miss the bus ส่วน ประโยคคำสั่ง + and + ผลดี เช่น Try it, and you'll love it"
    },
    {
      "id": "S04-Q013",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G2",
      "passageTitle": "My Secret Exam Strategies",
      "passage": "",
      "question": "Choose the best answer for blank (13).",
      "choices": [
        "Whatever",
        "Wherever",
        "However",
        "Whenever"
      ],
      "correctAnswer": "Whenever",
      "skillTag": "relative_clause",
      "difficulty": "medium",
      "explanationThai": "ส่วนที่ตามหลังคือ I got a low score... and my parents asked me why เป็นการบอกเหตุการณ์ที่เกิดซ้ำ ๆ และประโยคหลักมีคำว่า always สัญญาณนี้บอกว่าต้องเป็นคำที่แปลว่า ทุกครั้งที่ คือ Whenever ดังนั้น Whenever I got a low score..., I always gave them the same answer แปลว่า ทุกครั้งที่ได้คะแนนน้อยแล้วพ่อแม่ถามว่าทำไม ฉันก็ตอบเหมือนเดิมทุกครั้ง",
      "whyWrong": {
        "1": "Whatever แปลว่า อะไรก็ตาม ต้องทำหน้าที่เป็นคำนามในประโยคย่อย แต่ประโยคข้างหลังมีประธานและกรรมครบแล้ว",
        "2": "Wherever แปลว่า ไม่ว่าที่ไหน ประโยคนี้ไม่ได้พูดถึงสถานที่ แต่พูดถึงเวลาหรือโอกาส",
        "3": "However แปลว่า อย่างไรก็ตาม หรือ ไม่ว่าจะ...แค่ไหน ต้องตามด้วยคำคุณศัพท์หรือคำวิเศษณ์ เช่น However hard I tried ไม่เข้ากับประโยคนี้",
        "4": ""
      },
      "examTrick": "เห็น always หรือ every time ในประโยคหลัก และส่วนหน้าเป็นเหตุการณ์ที่เกิดขึ้นซ้ำ ให้ตอบ Whenever"
    },
    {
      "id": "S04-Q014",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G2",
      "passageTitle": "My Secret Exam Strategies",
      "passage": "",
      "question": "Choose the best answer for blank (14).",
      "choices": [
        "him",
        "us",
        "they",
        "them"
      ],
      "correctAnswer": "them",
      "skillTag": "pronoun",
      "difficulty": "medium",
      "explanationThai": "ช่องว่างหมายถึง my parents ซึ่งเป็นพหูพจน์ และอยู่หลังกริยา gave ในโครงสร้าง give + คน + สิ่งของ จึงต้องเป็นกรรมพหูพจน์ คือ them ดังนั้น I always gave them the same answer",
      "whyWrong": {
        "1": "him เป็นกรรมก็จริง แต่เป็นเอกพจน์เพศชาย ส่วน parents มีสองคน",
        "2": "us แปลว่า พวกเรา ซึ่งรวมตัวผู้เขียนเข้าไปด้วย แต่ผู้เขียนตอบพ่อแม่ ไม่ได้ตอบตัวเอง",
        "3": "they เป็นรูปประธาน วางหลังกริยาในตำแหน่งกรรมไม่ได้",
        "4": ""
      },
      "examTrick": "ดูสองอย่างเสมอ: (1) หมายถึงใคร เอกพจน์หรือพหูพจน์ (2) อยู่ตำแหน่งประธานหรือกรรม หลังกริยาและบุพบทใช้รูปกรรม me, him, her, us, them"
    },
    {
      "id": "S04-Q015",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G2",
      "passageTitle": "My Secret Exam Strategies",
      "passage": "",
      "question": "Choose the best answer for blank (15).",
      "choices": [
        "though",
        "because",
        "until",
        "unless"
      ],
      "correctAnswer": "because",
      "skillTag": "conjunction",
      "difficulty": "medium",
      "explanationThai": "ส่วนหลังเป็นเหตุผลของส่วนแรก คือไม่ยกมือขอกระดาษเพิ่ม เพราะไม่อยากปลุกแมวที่นอนอยู่ตรงขอบหน้าต่าง เมื่อเป็นเหตุผลใช้ because",
      "whyWrong": {
        "1": "though แปลว่า ถึงแม้ว่า ใช้กับความขัดแย้ง แต่สองส่วนนี้เป็นเหตุและผล ไม่ได้ขัดกัน",
        "2": "",
        "3": "until แปลว่า จนกระทั่ง ใช้บอกเวลา ความหมายไม่เข้ากัน",
        "4": "unless แปลว่า เว้นแต่ หรือ ถ้าไม่ ทำให้ความหมายผิด"
      },
      "examTrick": "แปลสองส่วนแล้วถามว่า \"เพราะอะไร\" ถ้าส่วนหลังตอบคำถามนี้ได้ ให้เลือก because"
    },
    {
      "id": "S04-Q016",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G2",
      "passageTitle": "My Secret Exam Strategies",
      "passage": "",
      "question": "Choose the best answer for blank (16).",
      "choices": [
        "was",
        "being",
        "be",
        "been"
      ],
      "correctAnswer": "was",
      "skillTag": "tense",
      "difficulty": "medium",
      "explanationThai": "ประโยคนี้ยังไม่มีกริยาแท้ จึงต้องเติมกริยาแท้ลงไป ประธานคือ One of my favourite subjects ซึ่งตัวประธานจริงคือ One เป็นเอกพจน์ และเรื่องทั้งหมดเล่าถึงสมัยเรียนในอดีต จึงใช้ was",
      "whyWrong": {
        "1": "",
        "2": "being เป็น V-ing ไม่ใช่กริยาแท้ ประโยคจะไม่มีกริยาหลัก",
        "3": "be เป็นกริยารูปเดิม ใช้เป็นกริยาแท้หลังประธานโดยไม่มีกริยาช่วยไม่ได้",
        "4": "been เป็นกริยาช่อง 3 ต้องมี have, has หรือ had นำหน้า"
      },
      "examTrick": "One of + คำนามพหูพจน์ ประธานจริงคือ One ใช้กริยาเอกพจน์เสมอ เช่น One of my friends is a doctor"
    },
    {
      "id": "S04-Q017",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G2",
      "passageTitle": "My Secret Exam Strategies",
      "passage": "",
      "question": "Choose the best answer for blank (17).",
      "choices": [
        "That",
        "This",
        "These",
        "It"
      ],
      "correctAnswer": "These",
      "skillTag": "pronoun",
      "difficulty": "medium",
      "explanationThai": "ช่องว่างหมายถึง magnets and batteries ที่เพิ่งพูดถึงในประโยคก่อนหน้า ซึ่งเป็นพหูพจน์ และกริยาข้างหลังคือ may be small objects ซึ่ง objects ก็เป็นพหูพจน์ จึงต้องใช้คำชี้เฉพาะพหูพจน์คือ These ดังนั้น These may be small objects, but they gave me big ideas",
      "whyWrong": {
        "1": "That เป็นเอกพจน์ ใช้แทนของสองอย่างคือแม่เหล็กและแบตเตอรี่ไม่ได้",
        "2": "This เป็นเอกพจน์ ใช้ไม่ได้ด้วยเหตุผลเดียวกัน",
        "3": "",
        "4": "It เป็นเอกพจน์ และไม่เข้ากับ small objects ที่เป็นพหูพจน์"
      },
      "examTrick": "ย้อนกลับไปหาว่าคำนั้นแทนอะไร ถ้าแทนคำนามพหูพจน์ ใช้ These, Those หรือ They ถ้าเอกพจน์ ใช้ This, That หรือ It"
    },
    {
      "id": "S04-Q018",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G2",
      "passageTitle": "My Secret Exam Strategies",
      "passage": "",
      "question": "Choose the best answer for blank (18).",
      "choices": [
        "Where",
        "When",
        "If",
        "While"
      ],
      "correctAnswer": "Where",
      "skillTag": "relative_clause",
      "difficulty": "medium",
      "explanationThai": "Where + สิ่งนั้น + is/was concerned เป็นสำนวนตายตัว แปลว่า ในเรื่องของ... หรือ ถ้าพูดถึง... มีความหมายเหมือน As far as ... is concerned ดังนั้น Where history was concerned, my favourite topics were ancient kings แปลว่า ในส่วนของวิชาประวัติศาสตร์ หัวข้อที่ชอบที่สุดคือเรื่องกษัตริย์โบราณ",
      "whyWrong": {
        "1": "",
        "2": "When history was concerned ไม่ใช่สำนวน และ when ใช้บอกเวลา ไม่ได้บอกหัวข้อ",
        "3": "If history was concerned ความหมายแปลก เพราะไม่ได้พูดถึงเงื่อนไข",
        "4": "While แปลว่า ขณะที่ ไม่ใช่สำนวนนี้"
      },
      "examTrick": "เห็นคำว่า concerned อยู่ท้ายส่วนแรกของประโยค ให้นึกถึง Where ... is concerned หรือ As far as ... is concerned"
    },
    {
      "id": "S04-Q019",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G2",
      "passageTitle": "My Secret Exam Strategies",
      "passage": "",
      "question": "Choose the best answer for blank (19).",
      "choices": [
        "adding",
        "add",
        "added",
        "will add"
      ],
      "correctAnswer": "add",
      "skillTag": "parallel_structure",
      "difficulty": "medium",
      "explanationThai": "ประโยคคือ I would first draw a big circle ... and then ช่องว่าง many small triangles หลัง would ใช้กริยาช่อง 1 คือ draw และ and เชื่อมสองกริยาที่ใช้ would ร่วมกัน คือ would first draw ... and then (would) add ดังนั้นต้องใช้กริยาช่อง 1 รูปเดียวกัน คือ add",
      "whyWrong": {
        "1": "adding เป็น V-ing ไม่ขนานกับ draw",
        "2": "",
        "3": "added เป็นกริยาช่อง 2 ไม่ขนานกับ draw ซึ่งเป็นกริยาช่อง 1 หลัง would",
        "4": "will add เปลี่ยนเวลาเป็นอนาคต แต่ประโยคเล่านิสัยในอดีตด้วย would"
      },
      "examTrick": "เห็น and, or หรือ and then ให้มองย้อนหาคำแรกของคู่ แล้วใช้รูปเดียวกัน เช่น would draw and add, likes swimming and running"
    },
    {
      "id": "S04-Q020",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G2",
      "passageTitle": "My Secret Exam Strategies",
      "passage": "",
      "question": "Choose the best answer for blank (20).",
      "choices": [
        "with",
        "at",
        "in",
        "by"
      ],
      "correctAnswer": "by",
      "skillTag": "preposition",
      "difficulty": "medium",
      "explanationThai": "by + V-ing แปลว่า โดยการทำ... ใช้บอกวิธีการ ดังนั้น we can learn about the future by studying the past แปลว่า เราเรียนรู้อนาคตได้โดยการศึกษาอดีต",
      "whyWrong": {
        "1": "with ตามด้วยเครื่องมือหรือสิ่งของ เช่น with a pen ไม่ใช้กับ V-ing เพื่อบอกวิธีการ",
        "2": "at studying ไม่ใช่โครงสร้างที่บอกวิธีการ ใช้ในสำนวนอย่าง good at studying เท่านั้น",
        "3": "in studying แปลว่า ในการศึกษา ไม่ได้บอกวิธีการ",
        "4": ""
      },
      "examTrick": "ถามว่า \"ทำอย่างไร\" หรือ \"ด้วยวิธีไหน\" ถ้าคำตอบเป็นการกระทำ ให้ใช้ by + V-ing เช่น He lost weight by running every day"
    },
    {
      "id": "S04-Q021",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G3",
      "passageTitle": "Old Thong",
      "passage": "'Thong!' shouted the little girl in a frightened voice. 'Thong! Come back! Come back quickly! They __(21)__ you away to the city!'\nAll the villagers took up the cry of 'Come back, Thong, come back!' But the truck was already gathering speed and moving away from them. It was unclear __(22)__ the old elephant had heard what the girl had said. But a moment later his trunk appeared over the side of the truck, and there was a loud banging of feet against the metal walls. He was trying to push __(23)__ way out.\nThere had been a time when a single push from Thong would have broken the truck into pieces. But sadly, his strength __(24)__ him years before; and in a few moments the banging grew weaker and stopped. In desperation, the villagers began begging the driver __(25)__ stop. 'Please, please!' they cried. 'Don't take our old friend away!' But the driver, too busy to notice what was happening, simply turned up his radio and __(26)__ his speed.\nToo late, someone thought of running ahead and closing the village gate; __(27)__ in another moment the truck had passed through it and was disappearing down the road. Thong was never seen again.\nA week later it was announced that he __(28)__ in an animal hospital in the city, in spite of receiving the best care an elephant __(29)__. The village headman came to announce the news. He had, he said, been present __(30)__ Thong's last days.",
      "question": "Choose the best answer for blank (21).",
      "choices": [
        "have taken",
        "will be taken",
        "are taking",
        "are being taken"
      ],
      "correctAnswer": "are taking",
      "skillTag": "tense",
      "difficulty": "medium",
      "explanationThai": "เด็กผู้หญิงตะโกนขณะที่รถบรรทุกกำลังพาช้างออกไป เป็นเหตุการณ์ที่กำลังเกิดขึ้นตอนที่พูด จึงใช้ Present Continuous และประธานคือ They เป็นผู้กระทำต่อ you ประโยคจึงเป็น Active คือ They are taking you away to the city! แปลว่า พวกเขากำลังพาแกไปที่เมือง",
      "whyWrong": {
        "1": "have taken เป็น Present Perfect หมายความว่าพาไปเสร็จแล้ว แต่รถยังเพิ่งเริ่มออก และเด็กยังเรียกให้ช้างกลับมา แสดงว่าเหตุการณ์ยังไม่จบ",
        "2": "will be taken เป็น Passive ประธาน They กลายเป็นผู้ถูกกระทำ และจะมีกรรม you ตามหลังไม่ได้",
        "3": "",
        "4": "are being taken เป็น Passive เช่นกัน มีกรรม you ตามหลังไม่ได้"
      },
      "examTrick": "ถ้ามีกรรมตามหลังช่องว่าง (เช่น you, him, the book) ตัดช้อยส์ที่เป็น Passive ทิ้งได้เลย"
    },
    {
      "id": "S04-Q022",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G3",
      "passageTitle": "Old Thong",
      "passage": "",
      "question": "Choose the best answer for blank (22).",
      "choices": [
        "whether",
        "as",
        "because",
        "so"
      ],
      "correctAnswer": "whether",
      "skillTag": "relative_clause",
      "difficulty": "medium",
      "explanationThai": "It was unclear แปลว่า ไม่แน่ใจ หรือ ไม่ชัดเจน ข้างหลังต้องเป็นเรื่องที่ไม่แน่ใจ ซึ่งมีสองทางคือ ได้ยินหรือไม่ได้ยิน จึงใช้ whether แปลว่า ว่า...หรือไม่ ดังนั้น It was unclear whether the old elephant had heard what the girl had said แปลว่า ไม่แน่ใจว่าช้างแก่ได้ยินสิ่งที่เด็กพูดหรือเปล่า",
      "whyWrong": {
        "1": "",
        "2": "as แปลว่า เพราะ หรือ ขณะที่ ไม่ได้บอกเรื่องที่ไม่แน่ใจ",
        "3": "because บอกเหตุผล แต่ unclear ต้องตามด้วยเรื่องที่ไม่รู้ ไม่ใช่เหตุผล",
        "4": "so แปลว่า ดังนั้น ใช้บอกผล ไม่เข้ากับ unclear"
      },
      "examTrick": "หลังคำที่แสดงความไม่แน่ใจ เช่น unclear, not sure, wonder, don't know, ask ให้นึกถึง whether หรือ if"
    },
    {
      "id": "S04-Q023",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G3",
      "passageTitle": "Old Thong",
      "passage": "",
      "question": "Choose the best answer for blank (23).",
      "choices": [
        "him",
        "their",
        "his",
        "your"
      ],
      "correctAnswer": "his",
      "skillTag": "pronoun",
      "difficulty": "medium",
      "explanationThai": "สำนวน push (one's) way out แปลว่า ดันตัวเองออกไป ต้องใช้คำแสดงความเป็นเจ้าของที่ตรงกับประธาน ประธานคือ He หมายถึงช้างทอง จึงใช้ his ดังนั้น He was trying to push his way out",
      "whyWrong": {
        "1": "him เป็นรูปกรรม วางหน้าคำนาม way เพื่อบอกความเป็นเจ้าของไม่ได้",
        "2": "their เป็นของพวกเขา (พหูพจน์) แต่ประธานคือช้างตัวเดียว",
        "3": "",
        "4": "your เป็นของคุณ ไม่ตรงกับประธาน He"
      },
      "examTrick": "สำนวนกลุ่ม make/push/find/fight + one's way ให้เปลี่ยน one's ให้ตรงกับประธาน เช่น She found her way home, They fought their way out"
    },
    {
      "id": "S04-Q024",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G3",
      "passageTitle": "Old Thong",
      "passage": "",
      "question": "Choose the best answer for blank (24).",
      "choices": [
        "leave",
        "would leave",
        "had left",
        "was leaving"
      ],
      "correctAnswer": "had left",
      "skillTag": "tense",
      "difficulty": "medium",
      "explanationThai": "เรื่องเล่าเป็นอดีต และมีคำว่า years before แปลว่า หลายปีก่อนหน้านั้น บอกว่าแรงของช้างหมดไปก่อนเหตุการณ์ในเรื่อง เหตุการณ์ที่เกิดก่อนอีกเหตุการณ์หนึ่งในอดีตต้องใช้ Past Perfect คือ had left ดังนั้น his strength had left him years before แปลว่า เรี่ยวแรงของมันหมดไปตั้งแต่หลายปีก่อนแล้ว",
      "whyWrong": {
        "1": "leave เป็น Present Simple ไม่เข้ากับเรื่องที่เล่าเป็นอดีต และประธาน strength เป็นเอกพจน์ ถ้าเป็นปัจจุบันก็ต้องเป็น leaves",
        "2": "would leave แปลว่า จะทิ้งไป เป็นอนาคตในอดีต แต่ years before บอกว่าเกิดไปแล้ว",
        "3": "",
        "4": "was leaving แปลว่า กำลังจากไป ใช้กับเหตุการณ์ที่กำลังเกิดในขณะนั้น ไม่เข้ากับ years before"
      },
      "examTrick": "เล่าเรื่องในอดีตแล้วมีคำว่า before, already, by then หรือ years before ให้นึกถึง had + V3"
    },
    {
      "id": "S04-Q025",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G3",
      "passageTitle": "Old Thong",
      "passage": "",
      "question": "Choose the best answer for blank (25).",
      "choices": [
        "for",
        "about",
        "to",
        "with"
      ],
      "correctAnswer": "to",
      "skillTag": "preposition",
      "difficulty": "medium",
      "explanationThai": "โครงสร้าง beg + คน + to + กริยาช่อง 1 แปลว่า ขอร้องให้ใครทำอะไร กลุ่มเดียวกับ ask, tell, beg, urge, appeal to + คน + to + V1 ดังนั้น the villagers began begging the driver to stop แปลว่า ชาวบ้านเริ่มอ้อนวอนคนขับให้หยุดรถ",
      "whyWrong": {
        "1": "beg for ใช้กับสิ่งที่ขอ เช่น beg for money ต้องตามด้วยคำนาม ไม่ใช่กริยา stop",
        "2": "about stop ผิดไวยากรณ์ about ต้องตามด้วยคำนามหรือ V-ing",
        "3": "",
        "4": "with stop ผิดไวยากรณ์และไม่มีความหมาย"
      },
      "examTrick": "กลุ่ม ask, tell, beg, want, allow, persuade, encourage + คน + to + V1 ออกสอบบ่อยมาก เห็นคน + ช่องว่าง + V1 ให้ตอบ to"
    },
    {
      "id": "S04-Q026",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G3",
      "passageTitle": "Old Thong",
      "passage": "",
      "question": "Choose the best answer for blank (26).",
      "choices": [
        "increased",
        "had increased",
        "was increasing",
        "would increase"
      ],
      "correctAnswer": "increased",
      "skillTag": "parallel_structure",
      "difficulty": "medium",
      "explanationThai": "ประโยคคือ the driver simply turned up his radio and ช่องว่าง his speed คำว่า and เชื่อมกริยาสองตัวที่ใช้ประธานเดียวกันคือ the driver ตัวแรกคือ turned up เป็น Past Simple ตัวที่สองจึงต้องเป็น Past Simple เหมือนกัน คือ increased เป็นการกระทำที่เกิดต่อเนื่องกัน",
      "whyWrong": {
        "1": "",
        "2": "had increased เป็น Past Perfect แปลว่าเกิดก่อนการเปิดวิทยุ แต่จริง ๆ เกิดตามกันมา และไม่ขนานกับ turned up",
        "3": "was increasing เป็น Past Continuous ไม่ขนานกับ turned up",
        "4": "would increase เป็นอนาคตในอดีต ไม่ขนานกับ turned up"
      },
      "examTrick": "ใน Parallel structure ถ้าตัวแรกเป็นกริยาช่อง 2 ตัวหลัง and ก็ต้องเป็นกริยาช่อง 2"
    },
    {
      "id": "S04-Q027",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G3",
      "passageTitle": "Old Thong",
      "passage": "",
      "question": "Choose the best answer for blank (27).",
      "choices": [
        "but",
        "until",
        "so",
        "since"
      ],
      "correctAnswer": "but",
      "skillTag": "conjunction",
      "difficulty": "medium",
      "explanationThai": "ส่วนแรกบอกว่ามีคนคิดจะวิ่งไปปิดประตูหมู่บ้าน แต่ส่วนหลังบอกว่าไม่ทันแล้ว รถผ่านไปแล้ว เมื่อสิ่งที่ตั้งใจกับผลที่เกิดขัดกัน ใช้ but คำว่า Too late ข้างหน้าก็บอกใบ้ว่าแผนนี้ไม่สำเร็จ",
      "whyWrong": {
        "1": "",
        "2": "until แปลว่า จนกระทั่ง ความหมายไม่เข้ากัน",
        "3": "so แปลว่า ดังนั้น จะแปลว่าเพราะปิดประตูรถจึงผ่านไปได้ ซึ่งขัดกับเหตุผล",
        "4": "since แปลว่า เพราะ ทำให้ความหมายผิด"
      },
      "examTrick": "มีคำว่า Too late, unfortunately หรือ tried to อยู่ข้างหน้า มักตามด้วย but เพื่อบอกว่าไม่สำเร็จ"
    },
    {
      "id": "S04-Q028",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G3",
      "passageTitle": "Old Thong",
      "passage": "",
      "question": "Choose the best answer for blank (28).",
      "choices": [
        "would have died",
        "would die",
        "had died",
        "would be dying"
      ],
      "correctAnswer": "had died",
      "skillTag": "tense",
      "difficulty": "medium",
      "explanationThai": "it was announced that... เป็นการรายงานข่าวในอดีต (Reported speech) การตายเกิดขึ้นก่อนการประกาศ เหตุการณ์ที่เกิดก่อนเหตุการณ์อื่นในอดีตต้องใช้ Past Perfect ดังนั้น it was announced that he had died in an animal hospital แปลว่า มีการประกาศว่ามันได้ตายไปแล้วที่โรงพยาบาลสัตว์",
      "whyWrong": {
        "1": "would have died ใช้กับเงื่อนไขที่ไม่ได้เกิดจริง เช่น If ... had ..., he would have died แต่ในข้อนี้ช้างตายจริง",
        "2": "would die แปลว่า จะตาย เป็นอนาคตในอดีต แต่ความจริงคือตายไปแล้ว",
        "3": "",
        "4": "would be dying แปลว่า จะกำลังตาย ความหมายไม่เข้ากัน"
      },
      "examTrick": "Reported speech ในอดีต: ถ้าเหตุการณ์เกิดก่อนการพูดหรือประกาศ ใช้ had + V3"
    },
    {
      "id": "S04-Q029",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G3",
      "passageTitle": "Old Thong",
      "passage": "",
      "question": "Choose the best answer for blank (29).",
      "choices": [
        "will have",
        "may have",
        "might have",
        "could have"
      ],
      "correctAnswer": "could have",
      "skillTag": "modal",
      "difficulty": "medium",
      "explanationThai": "สำนวน the best + คำนาม + (that) + ประธาน + could have (get) แปลว่า ดีที่สุดเท่าที่จะเป็นไปได้ could แสดงความสามารถหรือความเป็นไปได้ในอดีต ดังนั้น in spite of receiving the best care an elephant could have แปลว่า แม้จะได้รับการดูแลดีที่สุดเท่าที่ช้างตัวหนึ่งจะได้รับได้",
      "whyWrong": {
        "1": "will have เป็นอนาคต ไม่เข้ากับเรื่องที่เล่าเป็นอดีต",
        "2": "may have แปลว่า อาจจะมี เป็นการเดา ไม่ได้บอกว่าดีที่สุดเท่าที่เป็นไปได้",
        "3": "might have แปลว่า อาจจะ เป็นการเดาแบบไม่แน่ใจ ไม่ได้แสดงความสามารถสูงสุด",
        "4": ""
      },
      "examTrick": "the best ... one could have, the best ... money could buy, as fast as he could ใช้ could เพื่อบอกขีดสุดของความสามารถหรือความเป็นไปได้"
    },
    {
      "id": "S04-Q030",
      "setId": "set04",
      "section": "Grammar",
      "passageId": "S04-G3",
      "passageTitle": "Old Thong",
      "passage": "",
      "question": "Choose the best answer for blank (30).",
      "choices": [
        "by",
        "during",
        "with",
        "on"
      ],
      "correctAnswer": "during",
      "skillTag": "preposition",
      "difficulty": "medium",
      "explanationThai": "Thong's last days คือช่วงเวลาหลายวันสุดท้ายของชีวิตช้าง เมื่อพูดถึงอยู่ในระหว่างช่วงเวลาใดช่วงหนึ่ง ใช้ during ดังนั้น He had been present during Thong's last days แปลว่า เขาอยู่ด้วยตลอดช่วงวันสุดท้ายของทอง",
      "whyWrong": {
        "1": "by แปลว่า ภายใน หรือ ไม่เกิน เช่น by Friday ใช้บอกเส้นตาย ไม่ใช่การอยู่ตลอดช่วงเวลา",
        "2": "",
        "3": "present with ใช้กับคน แต่ last days เป็นช่วงเวลา",
        "4": "on ใช้กับวันที่เจาะจงวันเดียว เช่น on Monday ไม่ใช้กับช่วงเวลาหลายวัน"
      },
      "examTrick": "during + ช่วงเวลาหรือเหตุการณ์ (during the war, during the exam) ส่วน for + ระยะเวลาที่เป็นตัวเลข (for three days)"
    },
    {
      "id": "S04-Q031",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R1",
      "passageTitle": "A Small Wonder at Sea",
      "passage": " 1  Small wonders happen around us all the time, and they remind us that real life is\n 2  often more surprising than any film.\n 3  Somchai Rattana was a passenger on a night ferry travelling from Surat Thani to Koh\n 4  Samui. At first, he felt fine, but about an hour after dinner his face turned red and\n 5  he could hardly breathe. Earlier that day, he had been stung by a bee while he was\n 6  waiting at the pier, but he had thought it was nothing serious.\n 7  Fortunately, Dr. Wanida Chai was also on the ferry. She is a well-known allergy\n 8  specialist from Bangkok. She realized that he was having a dangerous allergic reaction\n 9  and might stop breathing at any moment. First, she asked a crew member to bring the\n10  first-aid box, but it had no allergy medicine in it. Then a teenage boy remembered that his\n11  mother, who also suffers from allergies, always carries an emergency injection pen in her\n12  bag. The mother gave the pen to Dr. Wanida, and the doctor injected the medicine into\n13  Somchai's leg while the boy held his shoulders still. Somchai stayed awake the whole\n14  time. Within ten minutes he was breathing normally again, and soon he was asking for a\n15  cup of hot coffee. It was lucky for him that a doctor and a well-prepared mother were on board.\n16  Events like this happen in every corner of the world, so often that nobody could ever\n17  hear about them all. We should never believe that everyday life is boring.",
      "question": "\"she\" in line 9 refers to ____________.",
      "choices": [
        "Dr. Wanida Chai",
        "the boy's mother",
        "a crew member",
        "Somchai Rattana"
      ],
      "correctAnswer": "Dr. Wanida Chai",
      "skillTag": "pronoun_reference",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 9 เขียนว่า First, she asked a crew member to bring the first-aid box ให้ย้อนกลับไปดูว่าก่อนหน้านั้นพูดถึงผู้หญิงคนไหน บรรทัดที่ 7 และ 8 พูดถึง Dr. Wanida Chai และใช้ She แทนเธอมาตลอด ดังนั้น she ในบรรทัดที่ 9 คือ Dr. Wanida Chai",
      "whyWrong": {
        "1": "",
        "2": "แม่ของเด็กยังไม่ปรากฏในเรื่อง จนกระทั่งบรรทัดที่ 10 ถึง 11 คำแทนต้องชี้กลับไปหาสิ่งที่พูดถึงมาแล้ว ไม่ใช่สิ่งที่ยังไม่พูดถึง",
        "3": "crew member เป็นคนที่ she ขอให้ไปเอากล่องปฐมพยาบาล ไม่ใช่คนที่ขอ",
        "4": "Somchai เป็นผู้ชาย จะใช้ she แทนไม่ได้"
      },
      "examTrick": "คำแทนจะชี้กลับไปหาคำนามที่อยู่ก่อนหน้าเสมอ และต้องตรงทั้งเพศและจำนวน ให้แทนคำตอบลงไปในประโยคแล้วอ่านดูว่าสมเหตุสมผลไหม"
    },
    {
      "id": "S04-Q032",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R1",
      "passageTitle": "A Small Wonder at Sea",
      "passage": "",
      "question": "\"his\" in line 10 refers to ____________.",
      "choices": [
        "Somchai Rattana's",
        "the teenage boy's",
        "the crew member's",
        "Dr. Wanida's"
      ],
      "correctAnswer": "the teenage boy's",
      "skillTag": "pronoun_reference",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 10 เขียนว่า Then a teenage boy remembered that his mother, who also suffers from allergies... ประธานของประโยคคือ a teenage boy และสิ่งที่เขานึกได้คือแม่ของเขาเอง ดังนั้น his mother คือแม่ของเด็กวัยรุ่นคนนั้น",
      "whyWrong": {
        "1": "Somchai เป็นผู้ป่วย ถ้าเป็นแม่ของ Somchai เรื่องจะไม่สมเหตุสมผล เพราะคนที่นึกออกคือเด็ก",
        "2": "",
        "3": "crew member ไม่เกี่ยวกับแม่คนนี้",
        "4": "Dr. Wanida เป็นผู้หญิง จะใช้ his แทนไม่ได้"
      },
      "examTrick": "ถ้า his หรือ her อยู่ในประโยคเดียวกับประธาน ส่วนใหญ่จะหมายถึงประธานของประโยคนั้น"
    },
    {
      "id": "S04-Q033",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R1",
      "passageTitle": "A Small Wonder at Sea",
      "passage": "",
      "question": "\"her\" in line 11 refers to ____________.",
      "choices": [
        "Dr. Wanida's",
        "the boy's mother's",
        "the crew member's",
        "Somchai's"
      ],
      "correctAnswer": "the boy's mother's",
      "skillTag": "pronoun_reference",
      "difficulty": "medium",
      "explanationThai": "ประโยคคือ his mother, who also suffers from allergies, always carries an emergency injection pen in her bag ผู้ที่พกปากกาฉีดยาคือแม่ของเด็ก ดังนั้น her bag คือกระเป๋าของแม่เด็ก และบรรทัดที่ 12 ยืนยันว่า The mother gave the pen to Dr. Wanida",
      "whyWrong": {
        "1": "Dr. Wanida ได้รับปากกาจากแม่ของเด็ก ไม่ได้พกอยู่ในกระเป๋าของตัวเอง",
        "2": "",
        "3": "crew member นำกล่องปฐมพยาบาลมา ไม่เกี่ยวกับกระเป๋าใบนี้",
        "4": "Somchai เป็นผู้ชาย ใช้ her แทนไม่ได้"
      },
      "examTrick": "ประโยคที่มี who ... คั่นกลาง ให้ข้ามส่วนที่อยู่ในจุลภาคไปก่อน จะเห็นประโยคหลักชัดขึ้น: his mother always carries a pen in her bag"
    },
    {
      "id": "S04-Q034",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R1",
      "passageTitle": "A Small Wonder at Sea",
      "passage": "",
      "question": "\"them\" in line 17 refers to ____________.",
      "choices": [
        "films",
        "passengers",
        "events",
        "allergies"
      ],
      "correctAnswer": "events",
      "skillTag": "pronoun_reference",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 16 ถึง 17 เขียนว่า Events like this happen in every corner of the world, so often that nobody could ever hear about them all แปลว่า เหตุการณ์แบบนี้เกิดขึ้นทุกมุมโลกบ่อยมากจนไม่มีใครได้ยินเรื่องราวของมันได้ครบทุกเรื่อง สิ่งที่ได้ยินไม่หมดคือเหตุการณ์เหล่านั้น คือ events",
      "whyWrong": {
        "1": "films ถูกพูดถึงในบรรทัดที่ 2 ซึ่งไกลเกินไป และไม่เข้ากับความหมาย",
        "2": "passengers ไม่ได้อยู่ในประโยคนี้",
        "3": "",
        "4": "allergies ไม่เกี่ยวข้องกับประโยคสรุปตอนท้าย"
      },
      "examTrick": "คำตอบของคำถามเรื่องคำแทนมักอยู่ในประโยคเดียวกัน หรือประโยคก่อนหน้า ให้หาคำนามพหูพจน์ที่ใกล้ที่สุดซึ่งมีความหมายเข้ากันก่อน"
    },
    {
      "id": "S04-Q035",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R1",
      "passageTitle": "A Small Wonder at Sea",
      "passage": "",
      "question": "Somchai was stung by a bee while he was ____________.",
      "choices": [
        "on the ferry",
        "having dinner",
        "arriving at Koh Samui",
        "waiting at the pier"
      ],
      "correctAnswer": "waiting at the pier",
      "skillTag": "detail",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 5 ถึง 6 เขียนไว้ชัดว่า he had been stung by a bee while he was waiting at the pier แปลว่า เขาถูกผึ้งต่อยขณะรออยู่ที่ท่าเรือ ซึ่งเกิดขึ้นก่อนขึ้นเรือ",
      "whyWrong": {
        "1": "อาการแพ้เกิดบนเรือ แต่การถูกผึ้งต่อยเกิดก่อนหน้านั้น ข้อนี้เป็นกับดักที่ทำให้สับสนเรื่องลำดับเวลา",
        "2": "ตอนกินมื้อค่ำเขายังรู้สึกปกติ อาการเริ่มหลังจากนั้นราวหนึ่งชั่วโมง",
        "3": "เรือยังเดินทางไปไม่ถึงเกาะสมุย",
        "4": ""
      },
      "examTrick": "คำถามรายละเอียด (Detail) ให้หาคำสำคัญจากโจทย์ เช่น stung by a bee แล้วไปหาในบทความ คำตอบจะอยู่ใกล้คำนั้น"
    },
    {
      "id": "S04-Q036",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R1",
      "passageTitle": "A Small Wonder at Sea",
      "passage": "",
      "question": "Somchai could hardly breathe because he ____________.",
      "choices": [
        "had eaten bad food",
        "had a heart problem",
        "was afraid of the sea",
        "was having a reaction to a bee sting"
      ],
      "correctAnswer": "was having a reaction to a bee sting",
      "skillTag": "cause_effect",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 5 บอกว่าเขาถูกผึ้งต่อย และบรรทัดที่ 8 บอกว่าหมอรู้ว่าเขากำลังมีอาการแพ้รุนแรง (a dangerous allergic reaction) เมื่อนำสองข้อมูลนี้มาเชื่อมกันจะได้ว่าเขาหายใจไม่ออกเพราะแพ้พิษผึ้ง",
      "whyWrong": {
        "1": "อาการเริ่มหลังมื้อค่ำก็จริง แต่บทความไม่ได้บอกว่าอาหารเสีย ข้อนี้เป็นกับดักที่หลอกด้วยลำดับเวลา",
        "2": "บทความไม่ได้พูดถึงโรคหัวใจ",
        "3": "บทความไม่ได้พูดถึงความกลัวทะเลเลย",
        "4": ""
      },
      "examTrick": "คำถามสาเหตุ (Cause) บางครั้งต้องเชื่อมข้อมูลจากสองที่ในบทความเข้าด้วยกัน อย่าเลือกเพียงเพราะสองเหตุการณ์เกิดใกล้กันในเวลา"
    },
    {
      "id": "S04-Q037",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R1",
      "passageTitle": "A Small Wonder at Sea",
      "passage": "",
      "question": "Dr. Wanida was on the ferry ____________.",
      "choices": [
        "as the ferry's doctor",
        "to look after Somchai",
        "by chance",
        "by mistake"
      ],
      "correctAnswer": "by chance",
      "skillTag": "detail",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 7 ใช้คำว่า Fortunately, Dr. Wanida Chai was also on the ferry คำว่า Fortunately (โชคดีที่) และ also (ก็อยู่ด้วย) บอกว่าเธอบังเอิญเป็นผู้โดยสารคนหนึ่งบนเรือ ไม่ได้อยู่บนเรือเพื่อทำงาน จึงตอบ by chance แปลว่า โดยบังเอิญ",
      "whyWrong": {
        "1": "ถ้าเธอเป็นหมอประจำเรือ บทความจะไม่ใช้คำว่า Fortunately และเธอเป็นหมอจากกรุงเทพฯ",
        "2": "เธอไม่รู้มาก่อนว่า Somchai จะป่วย จึงไม่ได้ขึ้นเรือมาเพื่อดูแลเขา",
        "3": "",
        "4": "by mistake แปลว่า โดยความผิดพลาด บทความไม่ได้บอกว่าเธอขึ้นเรือผิดลำ"
      },
      "examTrick": "คำอย่าง Fortunately, Luckily หรือ happened to บอกว่าเป็นความบังเอิญ"
    },
    {
      "id": "S04-Q038",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R1",
      "passageTitle": "A Small Wonder at Sea",
      "passage": "",
      "question": "When Dr. Wanida injected the medicine, ____________.",
      "choices": [
        "Somchai was not unconscious",
        "Somchai was asleep",
        "the boy held the pen",
        "it hurt Somchai badly"
      ],
      "correctAnswer": "Somchai was not unconscious",
      "skillTag": "detail",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 13 ถึง 14 บอกว่า Somchai stayed awake the whole time คือเขายังตื่นอยู่ตลอด ช้อยส์ที่ 1 ใช้ปฏิเสธซ้อน not unconscious ซึ่ง unconscious แปลว่า หมดสติ เมื่อมี not ข้างหน้าจึงแปลว่า ไม่ได้หมดสติ หรือก็คือยังมีสติอยู่ ตรงกับบทความ",
      "whyWrong": {
        "1": "",
        "2": "บทความบอกว่าเขาตื่นอยู่ตลอด ไม่ได้หลับ",
        "3": "เด็กจับไหล่ของ Somchai ไว้ ส่วนหมอเป็นคนถือปากกาฉีดยา",
        "4": "บทความไม่ได้พูดถึงความเจ็บปวดเลย"
      },
      "examTrick": "ระวังปฏิเสธซ้อน: not unconscious = conscious (มีสติ), not unlike = similar (คล้าย), not impossible = possible (เป็นไปได้) ข้อสอบชอบใช้หลอกให้คิดว่าผิด"
    },
    {
      "id": "S04-Q039",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R1",
      "passageTitle": "A Small Wonder at Sea",
      "passage": "",
      "question": "If the teenage boy had not remembered his mother's pen, ____________.",
      "choices": [
        "Somchai would have felt better sooner",
        "the doctor might have had no medicine to give Somchai",
        "the first-aid box would have had medicine",
        "the mother would have used it herself"
      ],
      "correctAnswer": "the doctor might have had no medicine to give Somchai",
      "skillTag": "detail",
      "difficulty": "medium",
      "explanationThai": "โจทย์เป็นเงื่อนไขแบบที่ 3 (If + had + V3, ... would/might have + V3) ใช้สมมุติสิ่งที่ตรงข้ามกับอดีต บรรทัดที่ 10 บอกว่ากล่องปฐมพยาบาลไม่มียาแก้แพ้ ปากกาของแม่เด็กจึงเป็นยาเพียงอย่างเดียวที่มี ถ้าเด็กนึกไม่ออก หมอก็อาจไม่มียาให้ Somchai เลย",
      "whyWrong": {
        "1": "ตรงกันข้ามกับความจริง ถ้าไม่มียา อาการจะไม่ดีขึ้นเร็ว",
        "2": "",
        "3": "สิ่งที่อยู่ในกล่องปฐมพยาบาลไม่เกี่ยวกับการที่เด็กจำได้หรือไม่ได้",
        "4": "แม่ไม่ได้มีอาการแพ้ตอนนั้น ไม่มีเหตุผลที่จะใช้ปากกากับตัวเอง"
      },
      "examTrick": "คำถาม If ... had not ... ให้ถามตัวเองว่า \"สิ่งนี้ช่วยอะไรในเรื่อง\" แล้วเลือกคำตอบที่บอกว่าจะเกิดอะไรขึ้นถ้าไม่มีสิ่งนั้น"
    },
    {
      "id": "S04-Q040",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R1",
      "passageTitle": "A Small Wonder at Sea",
      "passage": "",
      "question": "The fact that Somchai asked for coffee shows that ____________.",
      "choices": [
        "coffee helps people with allergies",
        "he was feeling much better",
        "the medicine made him sleepy",
        "his problem had not been serious"
      ],
      "correctAnswer": "he was feeling much better",
      "skillTag": "detail",
      "difficulty": "medium",
      "explanationThai": "นี่เป็นคำถามอนุมาน (Inference) บรรทัดที่ 14 บอกว่าภายในสิบนาทีเขาหายใจปกติแล้ว และไม่นานก็ขอกาแฟร้อน คนที่เพิ่งหายใจไม่ออกแล้วอยากดื่มกาแฟได้แสดงว่ารู้สึกดีขึ้นมากแล้ว",
      "whyWrong": {
        "1": "บทความไม่ได้บอกว่ากาแฟช่วยรักษาอาการแพ้",
        "2": "",
        "3": "ถ้ายาทำให้ง่วง เขาคงไม่ขอกาแฟ และบทความก็ไม่ได้บอกเรื่องนี้",
        "4": "อาการของเขาร้ายแรงมาก บทความบอกว่าอาจหยุดหายใจได้ทุกเมื่อ (บรรทัด 9)"
      },
      "examTrick": "คำถาม shows that หรือ suggests that ให้หาสิ่งที่สรุปได้อย่างสมเหตุสมผล แต่ห้ามขัดกับข้อมูลในบทความ"
    },
    {
      "id": "S04-Q041",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R2",
      "passageTitle": "Alone in Helsinki",
      "passage": " 1  Feeling lonely is almost inevitable when you move to a foreign country. It was certainly\n 2  a new experience for me. I arrived in Helsinki in the middle of winter, two months after\n 3  the semester had started, when most of my classmates had already formed small groups.\n 4  I felt completely left out. I even thought about going back to Thailand, but I knew my\n 5  parents had spent their savings to send me there, and I could not let them down.\n 6  Making friends was not easy, especially because I came from such a different culture.\n 7  There was a lot about Finnish people that I did not understand. They rarely made small\n 8  talk, and they often sat together in silence for a long time, which at first I took as a\n 9  sign that they did not like me.\n10  For a while I wondered if something was wrong with me. In the end, I joined the\n11  university's international student club and also started volunteering at the campus\n12  library. I made a real effort, too, to talk to the new exchange students who arrived after\n13  me. Slowly, I got used to the quiet style of Finnish people and their customs. In fact,\n14  they are loyal and kind. All the time I felt alone, I probably had more friends than I knew.",
      "question": "\"Feeling lonely is almost inevitable ...\" (line 1). The word \"inevitable\" means ____________.",
      "choices": [
        "very unusual",
        "easy to forget",
        "rarely serious",
        "impossible to avoid"
      ],
      "correctAnswer": "impossible to avoid",
      "skillTag": "vocabulary_context",
      "difficulty": "medium",
      "explanationThai": "inevitable แปลว่า หลีกเลี่ยงไม่ได้ ถ้าไม่รู้ศัพท์ให้ดูบริบท ประโยคต่อมาบอกว่า It was certainly a new experience for me แล้วเล่าว่าผู้เขียนเหงามาก แสดงว่าความเหงาเป็นสิ่งที่เกิดขึ้นแน่นอนเมื่อย้ายไปต่างประเทศ จึงตรงกับ impossible to avoid",
      "whyWrong": {
        "1": "very unusual แปลว่า ผิดปกติมาก ตรงข้ามกับความหมาย เพราะผู้เขียนกำลังบอกว่าใคร ๆ ก็เป็น",
        "2": "easy to forget แปลว่า ลืมง่าย ไม่เกี่ยวกับบริบท",
        "3": "rarely serious แปลว่า ไม่ค่อยร้ายแรง ไม่ตรงกับความหมายของคำ",
        "4": ""
      },
      "examTrick": "แยกคำช่วยเดา: in- แปลว่า ไม่ + evit (หลีกเลี่ยง) + -able (ได้) = หลีกเลี่ยงไม่ได้ และให้อ่านประโยคก่อนกับหลังเพื่อยืนยัน"
    },
    {
      "id": "S04-Q042",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R2",
      "passageTitle": "Alone in Helsinki",
      "passage": "",
      "question": "The writer felt left out at first mainly because ____________.",
      "choices": [
        "Finnish students told the writer to go home",
        "the writer did not want to make friends",
        "nobody at the university spoke English",
        "the writer arrived after most classmates had already formed groups"
      ],
      "correctAnswer": "the writer arrived after most classmates had already formed groups",
      "skillTag": "main_idea",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 2 ถึง 4 บอกว่าผู้เขียนมาถึงหลังเปิดเทอมไปแล้วสองเดือน ตอนที่เพื่อนส่วนใหญ่จับกลุ่มกันไปแล้ว แล้วจึงบอกว่า I felt completely left out ดังนั้นสาเหตุคือมาช้า และกลุ่มเพื่อนก่อตัวกันไปแล้ว",
      "whyWrong": {
        "1": "ไม่มีใครบอกให้ผู้เขียนกลับบ้าน ผู้เขียนคิดกลับเอง",
        "2": "ผู้เขียนอยากมีเพื่อน และพยายามหาเพื่อนในภายหลัง",
        "3": "บทความไม่ได้พูดถึงเรื่องภาษาอังกฤษ",
        "4": ""
      },
      "examTrick": "คำถามเหตุผลให้หาประโยคที่อยู่ก่อนคำที่ตรงกับโจทย์ (left out) ส่วนมากเหตุผลจะอยู่ข้างหน้านั้นทันที"
    },
    {
      "id": "S04-Q043",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R2",
      "passageTitle": "Alone in Helsinki",
      "passage": "",
      "question": "Why did the writer decide not to return to Thailand?",
      "choices": [
        "The weather became warmer.",
        "The writer did not want to disappoint the parents.",
        "The university offered the writer a scholarship.",
        "The writer had already made many friends."
      ],
      "correctAnswer": "The writer did not want to disappoint the parents.",
      "skillTag": "cause_effect",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 4 ถึง 5 บอกว่า I knew my parents had spent their savings to send me there, and I could not let them down สำนวน let someone down แปลว่า ทำให้ใครผิดหวัง ดังนั้นเหตุผลคือไม่อยากทำให้พ่อแม่ผิดหวัง",
      "whyWrong": {
        "1": "บทความพูดถึงฤดูหนาวตอนที่มาถึงเท่านั้น ไม่ได้พูดถึงอากาศที่อุ่นขึ้น",
        "2": "",
        "3": "บทความไม่ได้พูดถึงทุนการศึกษา พ่อแม่เป็นคนจ่ายด้วยเงินเก็บ",
        "4": "ตอนนั้นผู้เขียนยังรู้สึกโดดเดี่ยวอยู่ ยังไม่มีเพื่อน"
      },
      "examTrick": "จำสำนวน let someone down = ทำให้ผิดหวัง (disappoint) ข้อสอบมักเปลี่ยนคำในบทความเป็นคำพ้องความหมายในช้อยส์"
    },
    {
      "id": "S04-Q044",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R2",
      "passageTitle": "Alone in Helsinki",
      "passage": "",
      "question": "\"They\" in line 7 refers to ____________.",
      "choices": [
        "Finnish people",
        "the writer's classmates from Thailand",
        "the writer's parents",
        "exchange students"
      ],
      "correctAnswer": "Finnish people",
      "skillTag": "pronoun_reference",
      "difficulty": "medium",
      "explanationThai": "ประโยคก่อนหน้าในบรรทัดที่ 7 คือ There was a lot about Finnish people that I did not understand. They rarely made small talk... คำนามพหูพจน์ที่อยู่ใกล้ที่สุดและเข้ากับความหมายคือ Finnish people เพราะผู้เขียนกำลังอธิบายนิสัยของคนฟินแลนด์ที่ตนไม่เข้าใจ",
      "whyWrong": {
        "1": "",
        "2": "บทความไม่ได้พูดถึงเพื่อนร่วมชั้นที่เป็นคนไทยเลย",
        "3": "พ่อแม่อยู่ที่เมืองไทย ไม่ได้นั่งเงียบอยู่กับผู้เขียน",
        "4": "exchange students ปรากฏในบรรทัดที่ 12 ซึ่งอยู่หลังคำนี้"
      },
      "examTrick": "They หรือ them มักหมายถึงคำนามพหูพจน์ที่อยู่ในประโยคก่อนหน้าทันที"
    },
    {
      "id": "S04-Q045",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R2",
      "passageTitle": "Alone in Helsinki",
      "passage": "",
      "question": "\"They rarely made small talk\" (lines 7–8). This means ____________.",
      "choices": [
        "They never spoke to foreigners.",
        "They spoke in very quiet voices.",
        "They seldom chatted casually about everyday things.",
        "They only talked about their studies."
      ],
      "correctAnswer": "They seldom chatted casually about everyday things.",
      "skillTag": "vocabulary_context",
      "difficulty": "medium",
      "explanationThai": "small talk แปลว่า การคุยเล่นเรื่องสัพเพเหระ เช่น เรื่องอากาศหรือเรื่องทั่วไป และ rarely แปลว่า แทบจะไม่ หรือ ไม่ค่อย ซึ่งมีความหมายเหมือน seldom ดังนั้นประโยคนี้แปลว่า พวกเขาไม่ค่อยชวนคุยเล่นเรื่องทั่วไป ตรงกับช้อยส์ที่ 3",
      "whyWrong": {
        "1": "never แปลว่า ไม่เคยเลย แรงเกินไป rarely แปลว่า ไม่ค่อย ไม่ใช่ไม่เคย และประโยคไม่ได้พูดถึงชาวต่างชาติ",
        "2": "small ไม่ได้หมายถึงเสียงเบา small talk เป็นสำนวน แปลตรงตัวไม่ได้",
        "3": "",
        "4": "บทความไม่ได้บอกว่าพวกเขาคุยแต่เรื่องเรียน"
      },
      "examTrick": "ระวังช้อยส์ที่ใช้คำแรงเกินจริง เช่น never, always, only, all ถ้าบทความใช้ rarely หรือ often ช้อยส์ที่ถูกจะใช้คำที่ระดับใกล้เคียงกัน"
    },
    {
      "id": "S04-Q046",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R2",
      "passageTitle": "Alone in Helsinki",
      "passage": "",
      "question": "At first, the writer thought the long silences meant that ____________.",
      "choices": [
        "Finnish people were shy",
        "Finnish people disliked the writer",
        "it was a polite custom",
        "people were too tired to talk"
      ],
      "correctAnswer": "Finnish people disliked the writer",
      "skillTag": "detail",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 8 ถึง 9 บอกว่า which at first I took as a sign that they did not like me สำนวน take something as a sign แปลว่า ตีความว่าเป็นสัญญาณว่า... ดังนั้นตอนแรกผู้เขียนคิดว่าความเงียบแปลว่าคนฟินแลนด์ไม่ชอบตน",
      "whyWrong": {
        "1": "ความขี้อายอาจเป็นเหตุผลจริง แต่โจทย์ถามว่าตอนแรกผู้เขียนคิดอย่างไร ซึ่งบทความไม่ได้บอกเรื่องนี้",
        "2": "",
        "3": "เป็นสิ่งที่ผู้เขียนเข้าใจภายหลัง ไม่ใช่ที่คิดตอนแรก",
        "4": "บทความไม่ได้พูดถึงความเหนื่อย"
      },
      "examTrick": "โจทย์ที่มี At first ต้องการความคิดตอนแรก ซึ่งมักต่างจากตอนท้ายเรื่อง อย่าสับสนสองช่วงเวลานี้"
    },
    {
      "id": "S04-Q047",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R2",
      "passageTitle": "Alone in Helsinki",
      "passage": "",
      "question": "The writer tried to solve the loneliness problem by ____________.",
      "choices": [
        "moving to another university",
        "complaining to the student club",
        "joining a club, volunteering, and reaching out to new students",
        "behaving exactly like Finnish people"
      ],
      "correctAnswer": "joining a club, volunteering, and reaching out to new students",
      "skillTag": "detail",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 10 ถึง 12 บอกสามอย่างที่ผู้เขียนทำ คือ เข้าชมรมนักศึกษานานาชาติ เป็นอาสาสมัครที่ห้องสมุด และพยายามคุยกับนักศึกษาแลกเปลี่ยนที่มาใหม่ ช้อยส์ที่ 3 สรุปครบทั้งสามอย่าง",
      "whyWrong": {
        "1": "ผู้เขียนไม่ได้ย้ายมหาวิทยาลัย",
        "2": "ผู้เขียนเข้าร่วมชมรม ไม่ได้ไปร้องเรียน",
        "3": "",
        "4": "ผู้เขียนค่อย ๆ ชินกับนิสัยคนฟินแลนด์ ไม่ได้ทำตัวเหมือนพวกเขาทุกอย่าง"
      },
      "examTrick": "ช้อยส์ที่สรุปทุกอย่างในบทความได้ครบมักจะถูก ส่วนช้อยส์ที่ใช้คำบางคำจากบทความแต่บิดความหมายมักผิด"
    },
    {
      "id": "S04-Q048",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R2",
      "passageTitle": "Alone in Helsinki",
      "passage": "",
      "question": "\"their\" in line 13 refers to ____________.",
      "choices": [
        "of the exchange students",
        "of the writer's parents",
        "of the club members",
        "of Finnish people"
      ],
      "correctAnswer": "of Finnish people",
      "skillTag": "pronoun_reference",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 13 เขียนว่า I got used to the quiet style of Finnish people and their customs ในประโยคเดียวกัน their อยู่หลัง Finnish people ทันที จึงหมายถึงประเพณีของคนฟินแลนด์",
      "whyWrong": {
        "1": "exchange students อยู่ในประโยคก่อนหน้า ไม่ใช่เรื่องที่ผู้เขียนกำลังพูดถึงว่าต้องปรับตัว",
        "2": "พ่อแม่ไม่เกี่ยวกับประโยคนี้",
        "3": "บทความไม่ได้พูดถึงประเพณีของสมาชิกชมรม",
        "4": ""
      },
      "examTrick": "their ที่ตามหลัง A and ... มักหมายถึง A ที่อยู่หน้า and ในประโยคเดียวกัน"
    },
    {
      "id": "S04-Q049",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R3",
      "passageTitle": "The Cash Loyalists",
      "passage": " 1  A recent survey has found that the number of adults in Thailand who choose not to\n 2  use mobile banking has risen. These people, often called 'cash loyalists', make up\n 3  18% of adults, or about 10 million people in total.\n 4  The survey also showed that more than 60 percent of these people said that they did\n 5  not trust online payments. This figure has risen from about 40 percent in 2020, with\n 6  most of them giving fear of online scams as their main reason, though some also said\n 7  that they did not own a smartphone.\n 8  Banking apps are becoming easier to use, and QR-code payments are now accepted almost\n 9  everywhere in the country, but a large number of people still refuse to give up cash.\n10  Smartphones are getting cheaper and banking apps are becoming safer, so many see the\n11  main challenge as showing cash loyalists how digital payments can make their daily lives\n12  easier. This could encourage them to try mobile banking before they fall too far behind.\n13  The gap between people who use digital money and those who do not is growing, and if it\n14  continues to widen, those without access may miss out on government support payments,\n15  online discounts, and many job opportunities.",
      "question": "Which of the following is true regarding mobile banking in Thailand?",
      "choices": [
        "Fewer people are refusing mobile banking than before.",
        "The number of people who choose not to use mobile banking is increasing.",
        "Mobile banking is not available to most people.",
        "Every adult in Thailand now uses mobile banking."
      ],
      "correctAnswer": "The number of people who choose not to use mobile banking is increasing.",
      "skillTag": "true_false",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 1 ถึง 2 บอกว่า the number of adults in Thailand who choose not to use mobile banking has risen แปลว่า จำนวนผู้ใหญ่ที่เลือกไม่ใช้ Mobile Banking เพิ่มขึ้น ช้อยส์ที่ 2 ใช้คำว่า increasing แทน has risen ความหมายเหมือนกัน",
      "whyWrong": {
        "1": "ตรงข้ามกับบทความ บทความบอกว่าเพิ่มขึ้น ไม่ใช่ลดลง",
        "2": "",
        "3": "บทความบอกว่าแอปใช้ง่ายขึ้น และ QR code ใช้ได้เกือบทุกที่ ไม่ได้บอกว่าคนส่วนใหญ่เข้าไม่ถึง",
        "4": "ผิดชัดเจน เพราะมีคนประมาณสิบล้านคนที่ไม่ใช้"
      },
      "examTrick": "คำถาม Which is true ให้ตรวจทีละช้อยส์กับบทความ ระวังช้อยส์ที่สลับทิศทาง เช่น เพิ่มเป็นลด"
    },
    {
      "id": "S04-Q050",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R3",
      "passageTitle": "The Cash Loyalists",
      "passage": "",
      "question": "'Cash loyalists' are people who ____________.",
      "choices": [
        "work for banks and handle cash",
        "cannot afford a smartphone",
        "are unwilling to use mobile banking",
        "want to save more money"
      ],
      "correctAnswer": "are unwilling to use mobile banking",
      "skillTag": "detail",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 2 บอกว่า These people, often called cash loyalists และ These people หมายถึงผู้ใหญ่ที่เลือกไม่ใช้ Mobile Banking (choose not to use) ดังนั้น cash loyalists คือคนที่ไม่เต็มใจใช้ Mobile Banking คำว่า unwilling ในช้อยส์ตรงกับ choose not to",
      "whyWrong": {
        "1": "บทความไม่ได้พูดถึงพนักงานธนาคาร",
        "2": "การไม่มีสมาร์ตโฟนเป็นเหตุผลของคนบางส่วนเท่านั้น (some) ไม่ใช่ความหมายของคำนี้",
        "3": "",
        "4": "บทความไม่ได้พูดถึงการเก็บเงิน"
      },
      "examTrick": "คำศัพท์ใหม่ที่อยู่ในเครื่องหมายคำพูด มักมีคำอธิบายอยู่ในประโยคก่อนหน้าหรือประโยคเดียวกัน"
    },
    {
      "id": "S04-Q051",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R3",
      "passageTitle": "The Cash Loyalists",
      "passage": "",
      "question": "More than 60 percent of ____________ do not trust online payments.",
      "choices": [
        "cash loyalists",
        "all adults in Thailand",
        "mobile banking users",
        "people who own smartphones"
      ],
      "correctAnswer": "cash loyalists",
      "skillTag": "detail",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 4 บอกว่า more than 60 percent of these people said that they did not trust online payments คำว่า these people หมายถึง cash loyalists ที่เพิ่งพูดถึงในย่อหน้าแรก ดังนั้น 60 เปอร์เซ็นต์เป็นตัวเลขของกลุ่ม cash loyalists ไม่ใช่ของคนไทยทั้งประเทศ",
      "whyWrong": {
        "1": "",
        "2": "เป็นกับดัก 60 เปอร์เซ็นต์ไม่ใช่ของผู้ใหญ่ทั้งประเทศ แต่เป็นของกลุ่มที่ไม่ใช้ Mobile Banking เท่านั้น",
        "3": "คนที่ใช้ Mobile Banking อยู่แล้วไม่ใช่กลุ่มที่บทความสำรวจในส่วนนี้",
        "4": "บทความไม่ได้แยกกลุ่มคนที่มีสมาร์ตโฟน"
      },
      "examTrick": "ตัวเลขเปอร์เซ็นต์ต้องดูให้ดีว่าเป็นเปอร์เซ็นต์ของกลุ่มไหน these, those หรือ them ข้างหน้าตัวเลขจะบอกกลุ่มนั้น"
    },
    {
      "id": "S04-Q052",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R3",
      "passageTitle": "The Cash Loyalists",
      "passage": "",
      "question": "Most of the people who do not want to use mobile banking say so because they ____________.",
      "choices": [
        "do not own a smartphone",
        "think it costs too much",
        "are afraid of being cheated online",
        "cannot read the apps"
      ],
      "correctAnswer": "are afraid of being cheated online",
      "skillTag": "cause_effect",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 6 บอกว่า most of them giving fear of online scams as their main reason คำว่า most แปลว่า ส่วนใหญ่ และเหตุผลหลักคือกลัวมิจฉาชีพออนไลน์ (online scams) ช้อยส์ที่ 3 ใช้คำว่า afraid of being cheated online ซึ่งเป็นคำพ้องความหมาย",
      "whyWrong": {
        "1": "กับดักสำคัญ การไม่มีสมาร์ตโฟนเป็นเหตุผลของ some (บางคน) ไม่ใช่ most (ส่วนใหญ่)",
        "2": "บทความไม่ได้พูดถึงค่าใช้จ่ายของ Mobile Banking",
        "3": "",
        "4": "บทความไม่ได้พูดถึงการอ่านไม่ออก"
      },
      "examTrick": "แยก most กับ some ให้ชัด โจทย์ถามว่า Most ก็ต้องหาเหตุผลของคนส่วนใหญ่ ไม่ใช่เหตุผลรอง"
    },
    {
      "id": "S04-Q053",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R3",
      "passageTitle": "The Cash Loyalists",
      "passage": "",
      "question": "According to the passage, QR-code payments are accepted ____________ in Thailand now.",
      "choices": [
        "in only a few shops",
        "everywhere",
        "almost everywhere",
        "only in Bangkok"
      ],
      "correctAnswer": "almost everywhere",
      "skillTag": "detail",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 8 ถึง 9 ใช้คำว่า accepted almost everywhere in the country แปลว่า ใช้ได้เกือบทุกที่ คำว่า almost สำคัญมาก ช้อยส์ที่ถูกจึงเป็น almost everywhere",
      "whyWrong": {
        "1": "ตรงข้ามกับบทความ",
        "2": "กับดัก everywhere แปลว่า ทุกที่ แต่บทความบอกว่าเกือบทุกที่ (almost) ซึ่งไม่เท่ากัน",
        "3": "",
        "4": "บทความบอกว่าใช้ได้ทั่วประเทศ ไม่ได้จำกัดแค่กรุงเทพฯ"
      },
      "examTrick": "ระวังคำที่เปลี่ยนระดับความหมาย เช่น almost, nearly, most, some ถ้าช้อยส์ตัดคำเหล่านี้ทิ้งมักจะผิด"
    },
    {
      "id": "S04-Q054",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R3",
      "passageTitle": "The Cash Loyalists",
      "passage": "",
      "question": "Which of the following is true about smartphones and banking apps?",
      "choices": [
        "Both are becoming more expensive.",
        "Phones are getting cheaper and apps are getting safer.",
        "Apps are becoming harder to use.",
        "Phones are getting more expensive and apps less safe."
      ],
      "correctAnswer": "Phones are getting cheaper and apps are getting safer.",
      "skillTag": "true_false",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 10 บอกว่า Smartphones are getting cheaper and banking apps are becoming safer แปลว่า สมาร์ตโฟนราคาถูกลง และแอปธนาคารปลอดภัยขึ้น ตรงกับช้อยส์ที่ 2",
      "whyWrong": {
        "1": "ตรงข้ามกับบทความ โทรศัพท์ถูกลง ไม่ได้แพงขึ้น",
        "2": "",
        "3": "บรรทัดที่ 8 บอกว่าแอปใช้ง่ายขึ้น (easier) ไม่ใช่ยากขึ้น",
        "4": "ตรงข้ามกับบทความทั้งสองส่วน"
      },
      "examTrick": "ข้อที่ถามสองเรื่องพร้อมกัน ให้ตรวจทั้งสองส่วนของช้อยส์ ถ้าผิดเพียงส่วนเดียวก็ถือว่าผิดทั้งข้อ"
    },
    {
      "id": "S04-Q055",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R3",
      "passageTitle": "The Cash Loyalists",
      "passage": "",
      "question": "Many people think the key is to show cash loyalists that digital payments are ____________.",
      "choices": [
        "completely free",
        "useful in their everyday lives",
        "popular among teenagers",
        "required by law"
      ],
      "correctAnswer": "useful in their everyday lives",
      "skillTag": "detail",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 10 ถึง 12 บอกว่า the main challenge as showing cash loyalists how digital payments can make their daily lives easier แปลว่า สิ่งสำคัญคือการแสดงให้เห็นว่าการจ่ายเงินดิจิทัลช่วยให้ชีวิตประจำวันง่ายขึ้น ซึ่งก็คือมีประโยชน์ในชีวิตประจำวัน (useful in their everyday lives)",
      "whyWrong": {
        "1": "บทความไม่ได้บอกว่าฟรี",
        "2": "",
        "3": "บทความไม่ได้พูดถึงวัยรุ่น",
        "4": "บทความไม่ได้พูดถึงกฎหมาย"
      },
      "examTrick": "ช้อยส์ที่ถูกมักเขียนด้วยคำใหม่ (paraphrase) เช่น daily lives easier เปลี่ยนเป็น useful in everyday lives"
    },
    {
      "id": "S04-Q056",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R3",
      "passageTitle": "The Cash Loyalists",
      "passage": "",
      "question": "According to the passage, the gap between people who use digital money and those who do not is ____________.",
      "choices": [
        "getting smaller",
        "staying the same",
        "getting wider",
        "already closed"
      ],
      "correctAnswer": "getting wider",
      "skillTag": "detail",
      "difficulty": "medium",
      "explanationThai": "บรรทัดที่ 13 บอกว่า The gap ... is growing และตามด้วย if it continues to widen แปลว่า ถ้ามันยังกว้างขึ้นต่อไป แสดงว่าช่องว่างกำลังกว้างขึ้น (getting wider)",
      "whyWrong": {
        "1": "ตรงข้ามกับบทความ",
        "2": "บทความบอกว่ากำลังเพิ่มขึ้น ไม่ได้คงที่",
        "3": "",
        "4": "ถ้าช่องว่างปิดไปแล้ว บทความคงไม่เตือนว่าคนจะพลาดโอกาส"
      },
      "examTrick": "จำคำที่แปลว่าเพิ่มขึ้น: grow, rise, widen, increase และคำที่แปลว่าลดลง: shrink, fall, narrow, decrease"
    },
    {
      "id": "S04-Q057",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R3",
      "passageTitle": "The Cash Loyalists",
      "passage": "",
      "question": "'These people' in line 2 refers to ____________.",
      "choices": [
        "all adults in Thailand",
        "people who use mobile banking",
        "people who answered the survey",
        "adults who choose not to use mobile banking"
      ],
      "correctAnswer": "adults who choose not to use mobile banking",
      "skillTag": "pronoun_reference",
      "difficulty": "medium",
      "explanationThai": "These people อยู่ต่อจากประโยคแรกที่พูดถึง adults in Thailand who choose not to use mobile banking และประโยคต่อมาบอกว่าคนกลุ่มนี้ถูกเรียกว่า cash loyalists และคิดเป็น 18 เปอร์เซ็นต์ของผู้ใหญ่ ดังนั้น These people คือผู้ใหญ่ที่เลือกไม่ใช้ Mobile Banking",
      "whyWrong": {
        "1": "ถ้าเป็นผู้ใหญ่ทั้งหมด จะคิดเป็น 18 เปอร์เซ็นต์ของผู้ใหญ่ไม่ได้",
        "2": "ตรงข้าม คนกลุ่มนี้ไม่ใช้ Mobile Banking",
        "3": "ผู้ตอบแบบสำรวจมีทั้งคนที่ใช้และไม่ใช้",
        "4": ""
      },
      "examTrick": "คำแทนอย่าง These people มักหมายถึงกลุ่มคนที่ถูกอธิบายแบบเจาะจงที่สุดในประโยคก่อนหน้า ในที่นี้คือส่วนที่มี who ขยาย"
    },
    {
      "id": "S04-Q058",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R3",
      "passageTitle": "The Cash Loyalists",
      "passage": "",
      "question": "'some' in line 6 refers to ____________.",
      "choices": [
        "some of the cash loyalists",
        "some adults who use mobile banking",
        "some smartphone sellers",
        "some banks"
      ],
      "correctAnswer": "some of the cash loyalists",
      "skillTag": "pronoun_reference",
      "difficulty": "medium",
      "explanationThai": "ประโยคคือ with most of them giving fear of online scams as their main reason, though some also said that they did not own a smartphone คำว่า most of them และ some พูดถึงกลุ่มเดียวกัน คือคนที่ตอบแบบสำรวจว่าไม่ใช้ Mobile Banking หรือ cash loyalists ดังนั้น some คือ cash loyalists บางคน",
      "whyWrong": {
        "1": "",
        "2": "คนที่ใช้ Mobile Banking อยู่แล้วไม่มีเหตุผลที่ต้องบอกว่าไม่มีสมาร์ตโฟน",
        "3": "บทความไม่ได้พูดถึงคนขายสมาร์ตโฟน",
        "4": "ธนาคารไม่ใช่คน จึงไม่ได้ให้เหตุผลในแบบสำรวจ"
      },
      "examTrick": "most ... some ... ในประโยคเดียวกัน มักหมายถึงคนกลุ่มเดียวกัน แบ่งเป็นส่วนใหญ่กับบางส่วน"
    },
    {
      "id": "S04-Q059",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R3",
      "passageTitle": "The Cash Loyalists",
      "passage": "",
      "question": "'many' in line 10 refers to ____________.",
      "choices": [
        "many people",
        "many cash loyalists",
        "many banking apps",
        "many smartphones"
      ],
      "correctAnswer": "many people",
      "skillTag": "pronoun_reference",
      "difficulty": "medium",
      "explanationThai": "ประโยคคือ so many see the main challenge as showing cash loyalists... คำว่า many ในที่นี้ละคำนามไว้ คือ many people (หลายคน หรือ คนจำนวนมาก) ที่มองว่าความท้าทายคือการโน้มน้าว cash loyalists",
      "whyWrong": {
        "1": "",
        "2": "cash loyalists เป็นคนที่ถูกโน้มน้าว จะเป็นคนที่มองว่าต้องโน้มน้าวตัวเองไม่ได้",
        "3": "แอปมองหรือคิดอะไรไม่ได้ (see the challenge ต้องเป็นคน)",
        "4": "สมาร์ตโฟนมองหรือคิดอะไรไม่ได้"
      },
      "examTrick": "ดูกริยาที่ตามหลังคำแทน see, think, believe ต้องเป็นคน และคนนั้นต้องไม่ใช่คนที่ถูกพูดถึงในฐานะกรรมของประโยคเดียวกัน"
    },
    {
      "id": "S04-Q060",
      "setId": "set04",
      "section": "Reading",
      "passageId": "S04-R3",
      "passageTitle": "The Cash Loyalists",
      "passage": "",
      "question": "'This' in line 12 refers to ____________.",
      "choices": [
        "making smartphones cheaper",
        "making banking apps safer",
        "showing cash loyalists how digital payments can make their lives easier",
        "getting cash loyalists to open bank accounts"
      ],
      "correctAnswer": "showing cash loyalists how digital payments can make their lives easier",
      "skillTag": "pronoun_reference",
      "difficulty": "medium",
      "explanationThai": "This could encourage them to try mobile banking แปลว่า สิ่งนี้อาจกระตุ้นให้พวกเขาลองใช้ Mobile Banking สิ่งที่จะกระตุ้นพวกเขาได้คือสิ่งที่เพิ่งพูดถึงในประโยคก่อนหน้า คือการแสดงให้ cash loyalists เห็นว่าการจ่ายเงินดิจิทัลทำให้ชีวิตง่ายขึ้น",
      "whyWrong": {
        "1": "โทรศัพท์ที่ถูกลงเป็นข้อเท็จจริงที่เกิดขึ้นแล้ว ไม่ใช่สิ่งที่บทความเสนอให้ทำ",
        "2": "แอปที่ปลอดภัยขึ้นเป็นข้อเท็จจริงเช่นกัน ไม่ใช่สิ่งที่ This อ้างถึง",
        "3": "",
        "4": "บทความไม่ได้พูดถึงการเปิดบัญชีธนาคาร"
      },
      "examTrick": "This หรือ That ต้นประโยค มักแทนความคิดทั้งก้อนในประโยคก่อนหน้า ไม่ใช่คำเดียว ให้หาสิ่งที่ \"ถูกเสนอ\" หรือ \"ถูกทำ\" ในประโยคก่อนหน้า"
    }
  ]
}

export default set04

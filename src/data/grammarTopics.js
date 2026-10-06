// หมวดแกรมม่าที่สรุปจากข้อสอบเข้า ABAC จริง (Set M)
// items = เลขข้อในข้อสอบจริง (และในชุด M-Style ของเว็บนี้) ที่ทดสอบหัวข้อนั้น
// examples = [ประโยคภาษาอังกฤษ, คำแปล]
// quiz.answer = index ของช้อยส์ที่ถูก

export const grammarTopics = [
  {
    id: 'verb',
    emoji: '⏱️',
    title: 'Tense, Passive และการใช้กริยาให้ตรงประธาน',
    en: 'Tenses · Passive · Subject–Verb Agreement',
    items: [16, 21, 24, 28],
    summary: 'ข้อสอบชอบให้เลือกรูปกริยาที่ถูกต้องในเรื่องเล่า ต้องดูสามอย่าง: เวลาของเรื่อง ประธานเป็นเอกพจน์หรือพหูพจน์ และประธานเป็นผู้ทำหรือผู้ถูกกระทำ',
    sections: [
      {
        head: 'เรื่องเล่าในอดีต ใช้ Past Simple เป็นหลัก',
        text: 'ถ้าบทความเล่าเรื่องที่จบไปแล้ว กริยาหลักจะเป็นช่อง 2 เกือบทั้งหมด ถ้าในช่องว่างยังไม่มีกริยาแท้ ห้ามเลือก being, be หรือ been ที่ไม่มีกริยาช่วย',
        examples: [
          ['One of my favourite subjects was physics.', 'วิชาที่ชอบที่สุดวิชาหนึ่งคือฟิสิกส์ (ประธานจริงคือ One จึงใช้ was)'],
          ['The driver turned up the radio and drove away.', 'คนขับเปิดวิทยุดังขึ้นแล้วขับออกไป'],
        ],
      },
      {
        head: 'Past Perfect (had + V3) = เกิดก่อนอีกเหตุการณ์ในอดีต',
        text: 'ใช้เมื่อเล่าเรื่องในอดีตแล้วต้องการบอกว่ามีอีกเหตุการณ์หนึ่งเกิดก่อนหน้านั้น คำสัญญาณคือ before, already, by then, years before และประโยครายงานอย่าง it was announced that หรือ he said that',
        examples: [
          ['It was announced that he had died in hospital.', 'มีการประกาศว่าเขาเสียชีวิตแล้วที่โรงพยาบาล (ตายก่อนประกาศ)'],
          ['His strength had left him years before.', 'เรี่ยวแรงของเขาหมดไปตั้งแต่หลายปีก่อน'],
        ],
      },
      {
        head: 'Present Continuous = กำลังเกิดขึ้นตอนที่พูด',
        text: 'ในบทสนทนาที่ตัวละครตะโกนบอกสิ่งที่กำลังเกิดตรงหน้า ใช้ am, is, are + V-ing และถ้ามีกรรมตามหลัง เช่น you หรือ him ต้องเป็น Active เท่านั้น',
        examples: [
          ['They are taking you to the city!', 'พวกเขากำลังพาแกไปที่เมือง'],
          ['Look! The bus is leaving.', 'ดูสิ รถบัสกำลังออกแล้ว'],
        ],
      },
      {
        head: 'Passive = ประธานถูกกระทำ (be + V3)',
        text: 'ถามตัวเองว่าประธานเป็นคนทำหรือถูกทำ ถ้าถูกทำใช้ be + V3 และบอกผู้กระทำด้วย by ถ้าไม่มีกรรมตามหลังกริยาที่ต้องมีกรรม แปลว่าน่าจะเป็น Passive',
        examples: [
          ['The rule was directed at a few noisy households.', 'กฎนี้ถูกเล็งไปที่ครัวเรือนเสียงดังไม่กี่หลัง'],
          ['Many parents were abandoned by their children.', 'พ่อแม่หลายคนถูกลูกทอดทิ้ง'],
        ],
      },
    ],
    traps: [
      'One of + คำนามพหูพจน์ ใช้กริยาเอกพจน์ เพราะประธานจริงคือ One',
      'ถ้ามีกรรมตามหลังช่องว่าง ตัด Passive ทิ้งได้เลย',
      'would have + V3 ใช้กับเรื่องสมมุติที่ไม่ได้เกิดจริง ไม่ใช้เล่าสิ่งที่เกิดจริง',
    ],
    quiz: [
      { q: 'One of the students ___ absent yesterday.', choices: ['were', 'was', 'being', 'been'], answer: 1, why: 'ประธานจริงคือ One (เอกพจน์) และ yesterday เป็นอดีต จึงใช้ was' },
      { q: 'When I arrived, the train ___.', choices: ['already left', 'has already left', 'had already left', 'would leave'], answer: 2, why: 'รถไฟออกก่อนที่ฉันจะมาถึง เป็นเหตุการณ์ก่อนอีกเหตุการณ์ในอดีต จึงใช้ had already left' },
      { q: '"Hurry! They ___ the doors now!"', choices: ['close', 'are closing', 'are being closed', 'have been closed'], answer: 1, why: 'กำลังเกิดขึ้นตอนพูด (now) และมีกรรม the doors จึงต้องเป็น Active: are closing' },
      { q: 'The bridge ___ in 1990.', choices: ['built', 'was built', 'has built', 'was building'], answer: 1, why: 'สะพานสร้างตัวเองไม่ได้ ต้องถูกสร้าง จึงใช้ Passive รูปอดีต was built' },
    ],
  },
  {
    id: 'conjunction',
    emoji: '🔗',
    title: 'คำเชื่อม (Conjunctions)',
    en: 'and · or · but · so · although · because · until · unless',
    items: [3, 4, 11, 12, 15, 27],
    summary: 'เป็นหัวข้อที่ออกเยอะที่สุดในส่วน Grammar วิธีทำคือแปลสองฝั่งของช่องว่าง แล้วถามว่าสองฝั่งสัมพันธ์กันแบบไหน: คล้อยตาม ขัดแย้ง เหตุผล หรือเงื่อนไข',
    sections: [
      {
        head: 'ขัดแย้งกัน: but, yet, although, though',
        text: 'ถ้าฝั่งหนึ่งพูดอย่างหนึ่ง อีกฝั่งพูดตรงข้าม ใช้ but หรือ although โดย but อยู่กลางประโยค ส่วน although อยู่ต้นหรือกลางประโยคก็ได้',
        examples: [
          ['The council has not voted yet, but most members support the plan.', 'สภายังไม่ได้ลงมติ แต่สมาชิกส่วนใหญ่สนับสนุนแผนนี้'],
          ['I smile during exams, although I am terrified inside.', 'ฉันยิ้มตอนสอบ ถึงแม้ข้างในจะกลัวมาก'],
        ],
      },
      {
        head: 'เหตุผลและผล: because, since, so',
        text: 'because และ since ตามด้วยเหตุผล ส่วน so ตามด้วยผลลัพธ์ ลองแปลว่า "เพราะ" หรือ "ดังนั้น" แล้วดูว่าสมเหตุสมผลหรือไม่',
        examples: [
          ['I did not ask for more paper because I did not want to wake the cat.', 'ฉันไม่ขอกระดาษเพิ่มเพราะไม่อยากปลุกแมว'],
          ['It was raining, so we stayed home.', 'ฝนตก เราจึงอยู่บ้าน'],
        ],
      },
      {
        head: 'ประโยคคำสั่ง + or / and',
        text: 'ประโยคคำสั่ง + or + ผลเสีย แปลว่า "ไม่อย่างนั้น" ส่วนประโยคคำสั่ง + and + ผลดี แปลว่า "แล้วจะ..."',
        examples: [
          ['Get enough sleep, or you will fall asleep in the exam.', 'นอนให้พอ ไม่อย่างนั้นจะหลับในห้องสอบ'],
          ['Practise every day, and you will improve.', 'ฝึกทุกวัน แล้วจะเก่งขึ้น'],
        ],
      },
      {
        head: 'คำวิเศษณ์เชื่อมความ: therefore, however, hence',
        text: 'therefore, however และ hence ไม่ใช่คำสันธาน ใช้เชื่อมสองประโยคด้วยจุลภาคอย่างเดียวไม่ได้ ต้องใช้จุดหรืออัฒภาค (;) คั่น ถ้าโจทย์มีจุลภาคแล้วตามด้วยประโยคใหม่ ให้เลือก but, and หรือ so',
        examples: [
          ['He was ill; therefore, he stayed at home.', 'เขาป่วย ดังนั้นจึงอยู่บ้าน'],
          ['one or more neighbours', 'เพื่อนบ้านหนึ่งคนขึ้นไป (วลีตายตัว)'],
        ],
      },
    ],
    traps: [
      'ฝั่งหลังมี Too late หรือ unfortunately มักตอบ but',
      'unless = if ... not ห้ามใช้ not ซ้อนอีก',
      'until ใช้กับเวลา แปลว่า จนกระทั่ง ไม่ใช้บอกเหตุผล',
    ],
    quiz: [
      { q: 'Wear a jacket, ___ you will catch a cold.', choices: ['and', 'or', 'so', 'because'], answer: 1, why: 'คำสั่ง + ผลเสีย ใช้ or แปลว่า ไม่อย่างนั้น' },
      { q: 'She studied hard, ___ she failed the test.', choices: ['so', 'because', 'but', 'and'], answer: 2, why: 'ขยันแต่สอบตก ขัดแย้งกัน ใช้ but' },
      { q: 'We stayed inside ___ it was too hot.', choices: ['because', 'although', 'unless', 'so'], answer: 0, why: 'ร้อนเกินไปเป็นเหตุผลของการอยู่ข้างใน ใช้ because' },
      { q: 'You can join ___ or more clubs.', choices: ['one', 'once', 'single', 'only'], answer: 0, why: 'one or more เป็นวลีตายตัว แปลว่า หนึ่งขึ้นไป' },
    ],
  },
  {
    id: 'preposition',
    emoji: '📍',
    title: 'คำบุพบท (Prepositions)',
    en: 'by · of · during · to · at · on · in · with',
    items: [6, 7, 20, 25, 30],
    summary: 'ข้อสอบไม่ได้ถามบุพบทแบบสุ่ม แต่ถามเป็นโครงสร้างที่ใช้บ่อย ถ้าจำได้เป็นชุดจะตอบได้เร็วมาก',
    sections: [
      {
        head: 'by: ผู้กระทำใน Passive และ by + V-ing = โดยการ',
        text: 'by ใช้สองแบบที่ออกบ่อย แบบแรกบอกผู้กระทำหลังกริยา Passive แบบที่สอง by + V-ing บอกวิธีการ',
        examples: [
          ['Elderly residents were kept awake by karaoke machines.', 'ผู้สูงอายุถูกเครื่องคาราโอเกะทำให้นอนไม่หลับ'],
          ['An amoeba multiplies by dividing.', 'อะมีบาเพิ่มจำนวนโดยการแบ่งตัว'],
          ['We learn about the future by studying the past.', 'เราเรียนรู้อนาคตโดยการศึกษาอดีต'],
        ],
      },
      {
        head: 'คำนาม + of + จำนวน',
        text: 'ใช้บอกขนาด ราคา หรือระยะเวลาของคำนามข้างหน้า',
        examples: [
          ['a fine of up to 5,000 baht', 'ค่าปรับสูงสุด 5,000 บาท'],
          ['a jail term of two years', 'โทษจำคุกสองปี'],
        ],
      },
      {
        head: 'during + ช่วงเวลา หรือเหตุการณ์',
        text: 'during แปลว่า ในระหว่าง ตามด้วยคำนามที่เป็นช่วงเวลาหรือเหตุการณ์ ส่วน for ตามด้วยจำนวนเวลา',
        examples: [
          ['He was present during her last days.', 'เขาอยู่ด้วยตลอดช่วงวันสุดท้ายของเธอ'],
          ['Do not talk during the exam.', 'ห้ามคุยระหว่างสอบ'],
        ],
      },
      {
        head: 'กริยา + คน + to + V1',
        text: 'ask, tell, beg, appeal to, want, allow, persuade, encourage ตามด้วยคนแล้วตามด้วย to + กริยาช่อง 1',
        examples: [
          ['The animals appealed to the horses to stop.', 'สัตว์ทั้งหลายอ้อนวอนให้ม้าหยุด'],
          ['They begged the driver to stop.', 'พวกเขาขอร้องให้คนขับหยุด'],
        ],
      },
    ],
    traps: [
      'on ใช้กับวันเดียว (on Monday) ส่วน during ใช้กับช่วงเวลา',
      'with + เครื่องมือ (with a pen) แต่ by + V-ing ใช้บอกวิธีการ',
      'หลัง to ในโครงสร้าง beg someone to ใช้กริยาช่อง 1 ไม่ใช่ V-ing',
    ],
    quiz: [
      { q: 'The letter was written ___ my grandmother.', choices: ['with', 'by', 'from', 'of'], answer: 1, why: 'Passive บอกผู้กระทำใช้ by' },
      { q: 'She improved her English ___ watching films.', choices: ['with', 'in', 'by', 'at'], answer: 2, why: 'by + V-ing บอกวิธีการ' },
      { q: 'He fell asleep ___ the lecture.', choices: ['during', 'on', 'for', 'by'], answer: 0, why: 'lecture เป็นเหตุการณ์หนึ่งช่วง ใช้ during' },
      { q: 'They received a discount ___ 20 percent.', choices: ['at', 'with', 'by', 'of'], answer: 3, why: 'คำนาม + of + จำนวน บอกขนาดของส่วนลด' },
    ],
  },
  {
    id: 'pronoun',
    emoji: '👤',
    title: 'คำสรรพนามและคำชี้เฉพาะ',
    en: 'him / them / his · this / these / that / those',
    items: [14, 17, 23],
    summary: 'ทุกครั้งที่เห็นช่องว่างเป็นคำสรรพนาม ให้ตอบสองคำถาม: (1) หมายถึงใคร เอกพจน์หรือพหูพจน์ ชายหรือหญิง (2) อยู่ตำแหน่งไหน ประธาน กรรม หรือเจ้าของ',
    sections: [
      {
        head: 'ตารางที่ต้องจำ',
        text: 'ประธาน: I, you, he, she, it, we, they ใช้หน้ากริยา กรรม: me, you, him, her, it, us, them ใช้หลังกริยาและบุพบท เจ้าของ: my, your, his, her, its, our, their ใช้หน้าคำนาม',
        examples: [
          ['My parents asked why, so I told them the truth.', 'พ่อแม่ถามว่าทำไม ฉันจึงบอกความจริงกับพวกท่าน (them เป็นกรรม)'],
          ['He tried to kick his way out.', 'เขาพยายามเตะเพื่อหาทางออก (his หน้าคำนาม way)'],
        ],
      },
      {
        head: 'This / That / These / Those',
        text: 'This และ That ใช้กับเอกพจน์ These และ Those ใช้กับพหูพจน์ ถ้าใช้แทนคำนามพหูพจน์ที่เพิ่งพูดถึง เช่น hydrogen and helium หรือ magnets and batteries ให้ใช้ These',
        examples: [
          ['I studied hydrogen and helium. These are light gases.', 'ฉันเรียนเรื่องไฮโดรเจนและฮีเลียม พวกนี้เป็นก๊าซเบา'],
          ['Look at those mountains over there.', 'ดูภูเขาพวกนั้นตรงโน้นสิ'],
        ],
      },
    ],
    traps: [
      'they เป็นประธาน ห้ามวางหลังกริยา (gave they ผิด ต้องเป็น gave them)',
      'สำนวน one\'s way ให้เปลี่ยน one\'s ตามประธาน: He made his way, She made her way',
      'it เป็นเอกพจน์ ใช้แทนของสองอย่างไม่ได้',
    ],
    quiz: [
      { q: 'The teacher gave ___ a lot of homework. (= us students)', choices: ['we', 'our', 'us', 'ours'], answer: 2, why: 'อยู่หลังกริยา gave ในตำแหน่งกรรม ใช้ us' },
      { q: 'I bought apples and oranges. ___ were very sweet.', choices: ['It', 'This', 'That', 'These'], answer: 3, why: 'แทนผลไม้สองอย่างซึ่งเป็นพหูพจน์ ใช้ These' },
      { q: 'She pushed ___ way through the crowd.', choices: ['she', 'her', 'hers', 'their'], answer: 1, why: 'สำนวน push one\'s way ประธาน She ใช้ her' },
      { q: 'My brothers live in Japan. I visit ___ every year.', choices: ['they', 'their', 'them', 'him'], answer: 2, why: 'brothers เป็นพหูพจน์ อยู่ตำแหน่งกรรม ใช้ them' },
    ],
  },
  {
    id: 'word-form',
    emoji: '🧩',
    title: 'รูปคำ: นาม · คุณศัพท์ · วิเศษณ์ · V-ing',
    en: 'Word forms · Gerund as subject · find/consider it + adj',
    items: [5, 10],
    summary: 'ช้อยส์จะมาจากรากศัพท์เดียวกันสี่แบบ เช่น Ignorance, Ignoring, Ignorant, Ignorantly หน้าที่ของเราคือดูตำแหน่งในประโยคว่าต้องการคำประเภทไหน',
    sections: [
      {
        head: 'V-ing เป็นประธาน (Gerund)',
        text: 'ถ้าช่องว่างอยู่ต้นประโยค และข้างหลังมีกรรมตามมาทันที แล้วจึงมีกริยาหลักของประโยค ให้ใช้ V-ing เพราะ V-ing เป็นประธานได้และมีกรรมได้ ส่วนคำนามธรรมดามีกรรมตามทันทีไม่ได้',
        examples: [
          ['Ignoring a court order could mean a fine.', 'การเพิกเฉยต่อคำสั่งศาลอาจหมายถึงการถูกปรับ'],
          ['Reading English news every day improves your vocabulary.', 'การอ่านข่าวภาษาอังกฤษทุกวันช่วยเพิ่มคำศัพท์'],
        ],
      },
      {
        head: 'find / consider / make + it + คำคุณศัพท์',
        text: 'หลัง find it, consider it หรือ make it ต้องใช้คำคุณศัพท์ ไม่ใช้คำนามหรือคำวิเศษณ์',
        examples: [
          ['They might consider it shameful that the law is needed.', 'พวกเขาอาจมองว่าเป็นเรื่องน่าละอายที่ต้องมีกฎหมายนี้'],
          ['I find it difficult to wake up early.', 'ฉันรู้สึกว่าการตื่นเช้าเป็นเรื่องยาก'],
        ],
      },
      {
        head: '-ing กับ -ed',
        text: 'คำคุณศัพท์ -ing บรรยายสิ่งที่ทำให้รู้สึก เช่น boring, embarrassing ส่วน -ed บรรยายคนที่รู้สึก เช่น bored, embarrassed',
        examples: [
          ['The film was boring, so I was bored.', 'หนังน่าเบื่อ ฉันจึงรู้สึกเบื่อ'],
          ['It was embarrassing. I felt embarrassed.', 'มันน่าอาย ฉันรู้สึกอาย'],
        ],
      },
      {
        head: 'ปัจจัยท้ายคำช่วยบอกประเภทคำ',
        text: 'คำนาม: -tion, -ment, -ness, -ance, -ity คำคุณศัพท์: -ful, -ous, -ive, -able, -ant, -al คำวิเศษณ์: ส่วนใหญ่ลงท้ายด้วย -ly',
        examples: [
          ['shame (n.) · shameful (adj.) · shamefully (adv.)', 'ความอาย · น่าอาย · อย่างน่าอาย'],
          ['ignorance (n.) · ignorant (adj.) · ignorantly (adv.)', 'ความไม่รู้ · ไม่รู้ · อย่างไม่รู้'],
        ],
      },
    ],
    traps: [
      'ashamed แปลว่ารู้สึกอาย ใช้กับคน ส่วน shameful แปลว่าน่าอาย ใช้กับเรื่องราว',
      'คำนามอย่าง Ignorance ต้องมี of ก่อนกรรม เช่น ignorance of the law',
      'หลัง be, seem, look, feel, find it ใช้คำคุณศัพท์ ไม่ใช้ -ly',
    ],
    quiz: [
      { q: '___ too much sugar is bad for your teeth.', choices: ['Eat', 'Eaten', 'Eating', 'Eats'], answer: 2, why: 'ช่องว่างเป็นประธานและมีกรรม too much sugar ตามมา ใช้ Gerund: Eating' },
      { q: 'Many people find it ___ to speak in public.', choices: ['frighten', 'frightening', 'frightened', 'frighteningly'], answer: 1, why: 'find it + คำคุณศัพท์ และบรรยายสิ่งที่ทำให้กลัว ใช้ -ing' },
      { q: 'The students were ___ after the long lecture.', choices: ['tiring', 'tired', 'tiredness', 'tiredly'], answer: 1, why: 'บรรยายความรู้สึกของคน ใช้ -ed: tired' },
      { q: 'It is ___ to cheat in an exam.', choices: ['shame', 'ashamed', 'shameful', 'shamefully'], answer: 2, why: 'บรรยายการกระทำว่าน่าอาย ใช้คำคุณศัพท์ shameful' },
    ],
  },
  {
    id: 'parallel',
    emoji: '🟰',
    title: 'โครงสร้างคู่ขนาน (Parallel Structure)',
    en: 'and · or · but · not ... but ...',
    items: [8, 19, 26],
    summary: 'เมื่อ and, or หรือ but เชื่อมกริยาสองตัวที่มีประธานเดียวกัน กริยาทั้งสองต้องมีรูปแบบเดียวกัน ให้มองย้อนไปหาตัวแรกแล้วทำตัวที่สองให้เหมือนกัน',
    sections: [
      {
        head: 'กริยาช่อง 2 and กริยาช่อง 2',
        text: 'ถ้าตัวแรกเป็น Past Simple ตัวหลัง and ก็ต้องเป็น Past Simple',
        examples: [
          ['They set back their ears and quickened their pace.', 'พวกมันลู่หูไปข้างหลังแล้วเร่งฝีเท้า'],
          ['He turned up the radio and increased his speed.', 'เขาเปิดวิทยุดังขึ้นแล้วเร่งความเร็ว'],
        ],
      },
      {
        head: 'would / will / can + V1 and V1',
        text: 'กริยาช่วยตัวเดียวใช้ร่วมกันได้ทั้งสองกริยา ตัวที่สองจึงเป็นกริยาช่อง 1 เช่นกัน',
        examples: [
          ['I would first darken a spot and then make dots around it.', 'ฉันจะระบายจุดก่อนแล้วจึงทำจุดเล็ก ๆ รอบ ๆ'],
          ['You can sit here and wait.', 'คุณนั่งรอตรงนี้ได้'],
        ],
      },
      {
        head: 'did not ... but was ...',
        text: 'not ... but ... เปรียบเทียบสองอย่าง ทั้งสองฝั่งต้องมีเวลาเดียวกัน และต้องดูว่าฝั่งหลังเป็น Active หรือ Passive',
        examples: [
          ['The Bill did not seek to replace family ties but was aimed at a small group.', 'ร่างกฎหมายนี้ไม่ได้ต้องการแทนที่สายสัมพันธ์ในครอบครัว แต่มุ่งเป้าไปที่คนกลุ่มเล็ก ๆ'],
        ],
      },
    ],
    traps: [
      'อย่าเลือก V-ing หลัง and ถ้าตัวแรกเป็นกริยาแท้',
      'ระวังช้อยส์ had + V3 ที่ดูหรูแต่ไม่ขนานกับตัวแรก',
      'aimed at และ directed at มักต้องเป็น Passive: be aimed at, be directed at',
    ],
    quiz: [
      { q: 'She opened the door and ___ inside.', choices: ['walks', 'walking', 'walked', 'had walked'], answer: 2, why: 'opened เป็นช่อง 2 ตัวหลังจึงต้องเป็น walked' },
      { q: 'Every morning he would wake up and ___ a cup of tea.', choices: ['makes', 'make', 'making', 'made'], answer: 1, why: 'would ใช้ร่วมกัน ตัวที่สองจึงเป็นกริยาช่อง 1: make' },
      { q: 'I like swimming, reading, and ___.', choices: ['to cook', 'cook', 'cooking', 'cooked'], answer: 2, why: 'รายการเป็น V-ing ทั้งหมด ตัวสุดท้ายจึงเป็น cooking' },
      { q: 'The campaign was not designed to scare people but ___ at educating them.', choices: ['aimed', 'was aimed', 'aiming', 'aims'], answer: 1, why: 'ฝั่งแรกเป็น Passive อดีต (was not designed) ฝั่งหลังจึงเป็น was aimed' },
    ],
  },
  {
    id: 'relative',
    emoji: '🪢',
    title: 'Relative Pronouns: who · which · that · where · what',
    en: 'Relative clauses',
    items: [2],
    summary: 'ดูสองอย่าง: คำนามข้างหน้าเป็นคนหรือสิ่งของ และข้างหลังช่องว่างขาดอะไร ถ้าขาดประธานใช้ who, which หรือ that ถ้าประโยคข้างหลังครบแล้วและคำนามข้างหน้าเป็นสถานที่ ใช้ where',
    sections: [
      {
        head: 'ข้างหลังขาดประธาน → who / which / that',
        text: 'ถ้าหลังช่องว่างเป็นกริยาเลย แปลว่าคำที่เราเติมต้องเป็นประธาน ใช้ who กับคน และ which หรือ that กับสิ่งของ สถานที่ และประเทศ',
        examples: [
          ['a country that frowns on welfare', 'ประเทศที่ไม่ชอบระบบสวัสดิการ'],
          ['a doctor who saved my life', 'หมอที่ช่วยชีวิตฉัน'],
        ],
      },
      {
        head: 'ข้างหลังครบแล้ว + สถานที่ → where',
        text: 'where ตามด้วยประโยคที่มีประธานและกริยาครบ เช่น where I live หรือ where people work',
        examples: [
          ['the town where I was born', 'เมืองที่ฉันเกิด'],
          ['the town that has grown quickly', 'เมืองที่เติบโตอย่างรวดเร็ว (ข้างหลังขาดประธาน จึงใช้ that)'],
        ],
      },
      {
        head: 'what = the thing that',
        text: 'what แปลว่า "สิ่งที่" ในตัวเองแล้ว จึงห้ามมีคำนามอยู่ข้างหน้า',
        examples: [
          ['I understand what you mean.', 'ฉันเข้าใจสิ่งที่คุณหมายถึง'],
        ],
      },
    ],
    traps: [
      'คำนามเป็นสถานที่ไม่ได้แปลว่าต้องใช้ where เสมอ ให้ดูว่าข้างหลังขาดประธานหรือไม่',
      'that ใช้หลังจุลภาคไม่ได้ ถ้ามีจุลภาคให้ใช้ which หรือ who',
      'what ห้ามมีคำนามนำหน้า',
    ],
    quiz: [
      { q: 'Bangkok is a city ___ never sleeps.', choices: ['where', 'what', 'that', 'who'], answer: 2, why: 'หลังช่องว่างเป็นกริยา sleeps ขาดประธาน ใช้ that' },
      { q: 'This is the school ___ my mother teaches.', choices: ['which', 'where', 'who', 'what'], answer: 1, why: 'my mother teaches มีประธานและกริยาครบแล้ว และ school เป็นสถานที่ ใช้ where' },
      { q: 'The man ___ lives next door is a pilot.', choices: ['which', 'where', 'who', 'what'], answer: 2, why: 'คำนามเป็นคน และขาดประธาน ใช้ who' },
      { q: 'Tell me ___ happened.', choices: ['what', 'that', 'which', 'where'], answer: 0, why: 'ไม่มีคำนามนำหน้า และหมายถึงสิ่งที่เกิดขึ้น ใช้ what' },
    ],
  },
  {
    id: 'clause',
    emoji: '🧭',
    title: 'คำขึ้นต้นประโยค: Whenever · Where ... concerned · whether',
    en: 'Wh-ever words · as far as ... is concerned · whether',
    items: [13, 18, 22],
    summary: 'กลุ่มนี้เป็นคำที่นำประโยคย่อย แต่ละคำมีความหมายเฉพาะและมีคำสัญญาณให้เห็นชัด ถ้าจำคำสัญญาณได้จะตอบได้ทันที',
    sections: [
      {
        head: 'Whenever / Wherever / Whatever / However',
        text: 'Whenever แปลว่าทุกครั้งที่ (มักมาคู่กับ always) Wherever แปลว่าไม่ว่าที่ไหน Whatever แปลว่าอะไรก็ตาม (ต้องทำหน้าที่เป็นคำนาม) However + คำคุณศัพท์ แปลว่าไม่ว่าจะ...แค่ไหน',
        examples: [
          ['Whenever I did badly, I always gave the same excuse.', 'ทุกครั้งที่ทำได้ไม่ดี ฉันก็มีข้อแก้ตัวเดิมเสมอ'],
          ['However hard I tried, I could not open it.', 'ไม่ว่าจะพยายามแค่ไหน ฉันก็เปิดไม่ได้'],
        ],
      },
      {
        head: 'Where / As far as ... is concerned',
        text: 'เป็นสำนวนแปลว่า "ในเรื่องของ..." หรือ "ถ้าพูดถึง..." คำสัญญาณคือคำว่า concerned ท้ายวลี',
        examples: [
          ['Where biology was concerned, I loved the amoeba.', 'ในเรื่องวิชาชีววิทยา ฉันชอบอะมีบามาก'],
          ['As far as I am concerned, the plan is fine.', 'สำหรับฉันแล้ว แผนนี้ใช้ได้'],
        ],
      },
      {
        head: 'whether = ว่า...หรือไม่',
        text: 'ใช้หลังคำที่แสดงความไม่แน่ใจ เช่น uncertain, unclear, not sure, wonder, ask',
        examples: [
          ['It was uncertain whether he had understood.', 'ไม่แน่ใจว่าเขาเข้าใจหรือเปล่า'],
          ['I wonder whether it will rain.', 'ฉันสงสัยว่าฝนจะตกหรือเปล่า'],
        ],
      },
    ],
    traps: [
      'Whatever ใช้ไม่ได้ถ้าประโยคข้างหลังครบแล้ว',
      'When ... concerned ไม่ใช่สำนวน ต้องเป็น Where หรือ As far as',
      'uncertain that ฟังไม่เป็นธรรมชาติ ให้ใช้ whether หรือ if',
    ],
    quiz: [
      { q: '___ I visit my grandmother, she always cooks for me.', choices: ['Whatever', 'Whenever', 'However', 'Wherever'], answer: 1, why: 'มี always และเป็นเหตุการณ์ที่เกิดซ้ำ ใช้ Whenever' },
      { q: '___ money is concerned, we must be careful.', choices: ['When', 'If', 'Where', 'While'], answer: 2, why: 'สำนวน Where ... is concerned แปลว่า ในเรื่องของ' },
      { q: 'I am not sure ___ she will come.', choices: ['whether', 'what', 'which', 'as'], answer: 0, why: 'not sure + whether แปลว่า ไม่แน่ใจว่าจะ...หรือไม่' },
      { q: '___ difficult it is, I will finish it.', choices: ['Whatever', 'Whenever', 'However', 'Whether'], answer: 2, why: 'However + คำคุณศัพท์ แปลว่า ไม่ว่าจะยากแค่ไหน' },
    ],
  },
  {
    id: 'too-to',
    emoji: '🎯',
    title: 'too ... to / enough to',
    en: 'too + adj + to V · adj + enough + to V',
    items: [1],
    summary: 'too + คำคุณศัพท์ + to + V1 แปลว่า "...เกินกว่าจะ..." ใช้กับผลลบ ส่วน คำคุณศัพท์ + enough + to + V1 แปลว่า "...พอที่จะ..."',
    sections: [
      {
        head: 'too + adj + to + V1',
        text: 'เห็น too ตามด้วยคำคุณศัพท์ แล้วข้างหลังเป็นกริยาช่อง 1 ช่องว่างตรงกลางคือ to เสมอ',
        examples: [
          ['She was too poor to support herself.', 'เธอจนเกินกว่าจะเลี้ยงดูตัวเองได้'],
          ['The box is too heavy to lift.', 'กล่องหนักเกินกว่าจะยกไหว'],
        ],
      },
      {
        head: 'too + adj + for + คน + to + V1',
        text: 'ถ้าต้องการบอกว่าเกินกว่าใครจะทำได้ ใส่ for + คน ไว้ก่อน to',
        examples: [
          ['The question was too hard for me to answer.', 'คำถามยากเกินกว่าที่ฉันจะตอบได้'],
        ],
      },
      {
        head: 'adj + enough + to + V1',
        text: 'enough วางหลังคำคุณศัพท์ แต่วางหน้าคำนาม',
        examples: [
          ['He is old enough to drive.', 'เขาอายุมากพอที่จะขับรถได้'],
          ['We have enough money to buy it.', 'เรามีเงินพอจะซื้อมัน'],
        ],
      },
    ],
    traps: [
      'too ... to มีความหมายเชิงลบอยู่แล้ว ห้ามเติม not ซ้ำ',
      'enough อยู่หลังคำคุณศัพท์: tall enough ไม่ใช่ enough tall',
      'ถ้าหลังช่องว่างเป็นคำนาม ให้ใช้ for (too hot for swimming)',
    ],
    quiz: [
      { q: 'The tea is too hot ___ drink.', choices: ['for', 'to', 'by', 'with'], answer: 1, why: 'too + adj + to + V1' },
      { q: 'He is not tall ___ to reach the shelf.', choices: ['too', 'so', 'enough', 'very'], answer: 2, why: 'adj + enough + to + V1' },
      { q: 'This book is too difficult ___ children to read.', choices: ['to', 'for', 'of', 'by'], answer: 1, why: 'too + adj + for + คน + to + V1' },
      { q: 'I was too tired ___ my homework.', choices: ['finishing', 'finish', 'to finish', 'finished'], answer: 2, why: 'too tired + to + V1 = to finish' },
    ],
  },
  {
    id: 'article',
    emoji: '🅰️',
    title: 'Articles: a · an · the · some · any',
    en: 'Articles and determiners',
    items: [9],
    summary: 'ถ้าคำนามนั้นถูกพูดถึงมาแล้ว หรือทั้งคนพูดและคนฟังรู้ว่าหมายถึงอันไหน ให้ใช้ the ถ้าพูดถึงครั้งแรกและเป็นนามนับได้เอกพจน์ ให้ใช้ a หรือ an',
    sections: [
      {
        head: 'the = เจาะจง หรือพูดถึงมาแล้ว',
        text: 'ในข้อสอบแบบบทความ คำนามสำคัญที่พูดถึงตั้งแต่ย่อหน้าแรก เช่น the Bill, the rule, the plan เมื่อกลับมาพูดอีกครั้งจะใช้ the',
        examples: [
          ['A new Bill was tabled. The Bill aims to help poor parents.', 'มีการเสนอร่างกฎหมายใหม่ ร่างกฎหมายนี้มุ่งช่วยพ่อแม่ที่ยากจน'],
        ],
      },
      {
        head: 'a / an = ครั้งแรก หรือไม่เจาะจง',
        text: 'ใช้กับคำนามนับได้เอกพจน์ an ใช้หน้าเสียงสระ เช่น an hour, an amoeba',
        examples: [
          ['I saw a cat. The cat was sleeping.', 'ฉันเห็นแมวตัวหนึ่ง แมวตัวนั้นกำลังนอนอยู่'],
        ],
      },
      {
        head: 'some / any',
        text: 'some ใช้ในประโยคบอกเล่า any ใช้ในประโยคปฏิเสธและคำถาม และทั้งสองตามด้วยคำนามพหูพจน์หรือนามนับไม่ได้',
        examples: [
          ['I have some questions.', 'ฉันมีคำถามบางข้อ'],
          ['Do you have any questions?', 'มีคำถามไหม'],
        ],
      },
    ],
    traps: [
      'คำนามที่พูดถึงมาแล้วในบทความ ให้คิดถึง the ก่อนเสมอ',
      'some และ any ไม่ใช้กับคำนามนับได้เอกพจน์ในความหมายปกติ',
      'an ขึ้นกับเสียง ไม่ใช่ตัวอักษร: an hour, a university',
    ],
    quiz: [
      { q: 'I bought a phone yesterday. ___ phone is already broken.', choices: ['A', 'Some', 'The', 'Any'], answer: 2, why: 'พูดถึงโทรศัพท์เครื่องนั้นมาแล้ว ใช้ The' },
      { q: 'She is ___ honest person.', choices: ['a', 'an', 'the', 'some'], answer: 1, why: 'honest ออกเสียงสระ (ออน-) ใช้ an' },
      { q: 'We do not have ___ milk left.', choices: ['some', 'a', 'any', 'an'], answer: 2, why: 'ประโยคปฏิเสธ + นามนับไม่ได้ ใช้ any' },
      { q: 'The government supports ___ plan that was announced last week.', choices: ['a', 'the', 'any', 'some'], answer: 1, why: 'มีส่วนขยายเจาะจงว่าแผนไหน (that was announced) ใช้ the' },
    ],
  },
  {
    id: 'modal',
    emoji: '🔮',
    title: 'Modal Verbs และประโยคเงื่อนไข',
    en: 'could · may · might · will · If ... had ..., would have ...',
    items: [29, 39],
    summary: 'could บอกความสามารถหรือความเป็นไปได้ในอดีต may และ might เป็นการเดาว่าอาจจะ ส่วนประโยคเงื่อนไขแบบที่ 3 ใช้สมมุติสิ่งที่ตรงข้ามกับอดีต',
    sections: [
      {
        head: 'the best ... could have',
        text: 'สำนวนนี้แปลว่า "ดีที่สุดเท่าที่จะเป็นไปได้" ใช้ could เพื่อบอกขีดสุดของความเป็นไปได้',
        examples: [
          ['He received every attention a horse could have.', 'มันได้รับการดูแลทุกอย่างเท่าที่ม้าตัวหนึ่งจะได้รับได้'],
          ['She ran as fast as she could.', 'เธอวิ่งเร็วที่สุดเท่าที่จะทำได้'],
        ],
      },
      {
        head: 'If + had + V3, ... would / might have + V3',
        text: 'เงื่อนไขแบบที่ 3 พูดถึงอดีตที่ไม่ได้เกิดจริง เช่น ถ้าไม่ได้ใส่ไม้แขวนเสื้อในบรั่นดี แบคทีเรียก็อาจทำให้ป่วยได้',
        examples: [
          ['If the hanger had not been cleaned, bacteria could have made her ill.', 'ถ้าไม่ได้ทำความสะอาดไม้แขวนเสื้อ แบคทีเรียอาจทำให้เธอป่วยได้'],
          ['If I had studied, I would have passed.', 'ถ้าฉันอ่านหนังสือ ฉันคงสอบผ่านไปแล้ว'],
        ],
      },
    ],
    traps: [
      'will ใช้กับอนาคต ไม่ใช้ในเรื่องเล่าอดีต',
      'คำถามเงื่อนไขในส่วน Reading ให้คิดว่า "ถ้าไม่มีสิ่งนั้น จะเกิดอะไรขึ้น"',
      'would have + V3 ใช้กับเรื่องสมมุติเท่านั้น',
    ],
    quiz: [
      { q: 'It was the best meal anyone ___ ask for.', choices: ['will', 'could', 'shall', 'must'], answer: 1, why: 'the best ... could ... แปลว่า ดีที่สุดเท่าที่จะเป็นไปได้' },
      { q: 'If she had left earlier, she ___ the bus.', choices: ['will catch', 'would catch', 'would have caught', 'had caught'], answer: 2, why: 'เงื่อนไขแบบที่ 3: If + had + V3, would have + V3' },
      { q: 'He climbed as high as he ___.', choices: ['can', 'could', 'may', 'will'], answer: 1, why: 'เล่าอดีต และบอกขีดสุดของความสามารถ ใช้ could' },
      { q: 'If it had not rained, we ___ to the beach.', choices: ['would go', 'will go', 'would have gone', 'went'], answer: 2, why: 'สมมุติตรงข้ามกับอดีต ใช้ would have gone' },
    ],
  },
  {
    id: 'reference',
    emoji: '👉',
    title: 'Reading: คำอ้างอิง (Reference words)',
    en: 'he / her / his / them / these people / some / many / this',
    items: [31, 32, 33, 34, 44, 48, 57, 58, 59, 60],
    summary: 'ข้อสอบจริงถามคำอ้างอิงถึงสิบข้อจากสามสิบข้อ ถ้าทำส่วนนี้ได้ก็ได้คะแนนไปเยอะแล้ว วิธีคือย้อนกลับไปหาคำนามข้างหน้าที่ตรงทั้งจำนวน เพศ และความหมาย แล้วแทนค่าลงไปอ่านดู',
    sections: [
      {
        head: 'ขั้นตอน 3 ขั้น',
        text: 'ขั้นที่ 1 ไปที่บรรทัดที่โจทย์บอก ขั้นที่ 2 ดูว่าคำนั้นเป็นเอกพจน์หรือพหูพจน์ ชายหรือหญิง ขั้นที่ 3 ย้อนไปหาคำนามข้างหน้าที่ตรงเงื่อนไข แล้วแทนคำตอบลงในประโยค ถ้าอ่านแล้วสมเหตุสมผลก็คือคำตอบ',
        examples: [
          ['Luckily, Professor Wallace was on the plane. He is a top doctor.', 'He = Professor Wallace'],
          ['A boy remembered that his mother carried a pen in her bag.', 'his = the boy\'s · her = the mother\'s'],
        ],
      },
      {
        head: 'These people / This / Some / Many',
        text: 'These people หมายถึงกลุ่มคนที่ถูกอธิบายเจาะจงในประโยคก่อนหน้า This ต้นประโยคมักแทนความคิดทั้งก้อน Some และ Many มักละคำนามไว้ ให้ดูว่าหมายถึงคนกลุ่มไหน',
        examples: [
          ['Some people do not want the Internet. These people are called refuseniks.', 'These people = คนที่ไม่ต้องการอินเทอร์เน็ต'],
          ['We must explain why it matters. This would encourage them.', 'This = การอธิบายว่าเรื่องนี้สำคัญอย่างไร'],
        ],
      },
    ],
    traps: [
      'คำแทนชี้กลับไปหาสิ่งที่พูดถึงมาแล้ว ไม่ใช่สิ่งที่ยังไม่ได้พูดถึง',
      'คนที่เป็นกรรมของประโยคมักไม่ใช่คนเดียวกับ many หรือ they ที่เป็นประธาน',
      'ช้อยส์ที่ตรงเพศและจำนวนแต่ทำให้ความหมายแปลก ถือว่าผิด',
    ],
    quiz: [
      { q: '"Mary called her brother. He was busy." — "He" refers to ___', choices: ['Mary', 'her brother', 'her father', 'nobody'], answer: 1, why: 'He เป็นเพศชายเอกพจน์ คำนามข้างหน้าที่ตรงคือ her brother' },
      { q: '"Students who skip breakfast often feel tired. Many of them..." — "them" refers to ___', choices: ['students who skip breakfast', 'teachers', 'breakfasts', 'all people'], answer: 0, why: 'them หมายถึงกลุ่มคนพหูพจน์ที่พูดถึงก่อนหน้า' },
      { q: '"Prices are falling. This means more people can buy phones." — "This" refers to ___', choices: ['phones', 'people', 'the fact that prices are falling', 'buying'], answer: 2, why: 'This แทนความคิดทั้งประโยคก่อนหน้า' },
      { q: '"The doctor thanked the nurse for her help." — "her" refers to ___', choices: ['the doctor\'s', 'the nurse\'s', 'the patient\'s', 'unclear'], answer: 1, why: 'คนที่ช่วยคือพยาบาล จึงเป็นความช่วยเหลือของพยาบาล' },
    ],
  },
  {
    id: 'reading',
    emoji: '📖',
    title: 'Reading: รายละเอียด ศัพท์ และการอนุมาน',
    en: 'Detail · Vocabulary in context · Inference · True / False',
    items: [35, 36, 37, 38, 40, 41, 42, 43, 45, 46, 47, 49, 50, 51, 52, 53, 54, 55, 56],
    summary: 'คำถามส่วนใหญ่ในส่วน Reading มีคำตอบอยู่ในบทความ แต่ช้อยส์ที่ถูกมักถูกเขียนด้วยคำใหม่ (paraphrase) ส่วนช้อยส์ผิดมักใช้คำจากบทความแต่บิดความหมาย',
    sections: [
      {
        head: 'คำถามรายละเอียด (Detail)',
        text: 'หาคำสำคัญในโจทย์ แล้ววิ่งไปหาคำนั้นในบทความ อ่านประโยคนั้นและประโยครอบ ๆ ระวังลำดับเวลา (เกิดก่อนหรือหลัง) และคำที่บอกปริมาณ เช่น most กับ some หรือ almost everywhere กับ everywhere',
        examples: [
          ['High-speed net is available almost everywhere.', 'ช้อยส์ everywhere ผิด เพราะบทความบอกว่าเกือบทุกที่ (almost)'],
          ['Most gave lack of skills as a reason, though some said cost.', 'เหตุผลของคนส่วนใหญ่คือขาดทักษะ ไม่ใช่ค่าใช้จ่าย'],
        ],
      },
      {
        head: 'ศัพท์ในบริบท (Vocabulary in context)',
        text: 'ถ้าไม่รู้ศัพท์ ให้แยกรากศัพท์ เช่น in- (ไม่) + evit (หลีกเลี่ยง) + -able (ได้) แล้วอ่านประโยคก่อนหน้าและหลังเพื่อยืนยันความหมาย',
        examples: [
          ['Loneliness is almost inevitable abroad.', 'inevitable = unavoidable (หลีกเลี่ยงไม่ได้)'],
          ['They are not very expressive.', 'expressive = แสดงความรู้สึกออกมาชัดเจน'],
        ],
      },
      {
        head: 'การอนุมาน (Inference) และปฏิเสธซ้อน',
        text: 'คำถามที่มี shows that, suggests หรือ implies ให้หาข้อสรุปที่สมเหตุสมผลที่สุดและไม่ขัดกับบทความ และระวังปฏิเสธซ้อน เช่น not unconscious แปลว่า มีสติอยู่',
        examples: [
          ['She was eating breakfast soon after the operation.', 'แสดงว่าเธอดีขึ้นมากแล้ว (she was much better)'],
          ['Paula was still awake during the operation.', 'เท่ากับ she was not unconscious'],
        ],
      },
    ],
    traps: [
      'ช้อยส์ที่ใช้คำแรงเกินจริง เช่น always, never, all, only มักผิด',
      'ช้อยส์ที่ "จริงในชีวิต" แต่บทความไม่ได้พูดถึง ถือว่าผิด',
      'ระวังสลับทิศทาง: increasing กับ decreasing, cheaper กับ more expensive',
    ],
    quiz: [
      { q: 'Passage: "Nearly all students passed." Which is true?', choices: ['All students passed.', 'Most students passed.', 'Few students passed.', 'No one failed.'], answer: 1, why: 'Nearly all แปลว่า เกือบทั้งหมด ซึ่งก็คือส่วนใหญ่ ไม่ใช่ทั้งหมด' },
      { q: '"The museum is not uncommon in big cities." This means museums are ___ in big cities.', choices: ['rare', 'common', 'closed', 'expensive'], answer: 1, why: 'not uncommon เป็นปฏิเสธซ้อน แปลว่า common (พบได้ทั่วไป)' },
      { q: '"Ticket prices fell while the number of visitors rose." Which is true?', choices: ['Both fell.', 'Both rose.', 'Prices went down and visitors went up.', 'Prices went up.'], answer: 2, why: 'fell = ลดลง rose = เพิ่มขึ้น ต้องตรวจทั้งสองส่วน' },
      { q: '"After the surgery, he asked for a big lunch." This suggests that he ___.', choices: ['was feeling better', 'was a chef', 'had not had surgery', 'disliked hospital food'], answer: 0, why: 'คนที่อยากกินอาหารมื้อใหญ่หลังผ่าตัด แสดงว่าอาการดีขึ้นแล้ว' },
    ],
  },
]

export function getTopic(id) {
  return grammarTopics.find((topic) => topic.id === id) || null
}

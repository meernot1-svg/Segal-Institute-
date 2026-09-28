/**
 * Senior-tier lessons — extracted from "Senior English Grammar Academy Workbook" PDF (61 pages).
 * 42 grammar lessons. Accessible only to Senior and Elite Senior badge holders.
 * Each lesson: Meaning → Where used → Nishaniyan → Sentence Formation → Key Patterns
 */

import type { Lesson } from "./basic-lessons-data";

export const SENIOR_LESSONS: Lesson[] = [
  { title: "1. Mind If", subtitle: "Polite permission", icon: "Clock", sections: [
    { heading: "Where Used", body: "Polite permission." },
    { heading: "Sentence Formation", body: "Would you mind if + Subject + V2 + Object?" },
    { heading: "Key Patterns", body: "", examples: [
      "Would you mind if I opened the door?",
      "Would you mind if I did not open the door?",
      "Would you mind if I sat here?",
      "Wouldn't you mind if I sat here?",
    ],
    examplesTr: [
      { en: "Would you mind if I opened the door?", ur: "کیا آپ کو اعتراض ہوگا اگر میں دروازہ کھول دوں؟", sd: "ڇا اوھين کي اعتراض ٿيندو هجي جيڪڏهن مان دروازو کوليان؟" },
      { en: "Would you mind if I did not open the door?", ur: "کیا آپ کو اعتراض ہوگا اگر میں دروازہ نہ کھولوں؟", sd: "ڇا اوھين کي اعتراض ٿيندو هجي جيڪڏهن مان دروازو نه کوليان؟" },
      { en: "Would you mind if I sat here?", ur: "کیا آپ کو اعتراض ہوگا اگر میں یہاں بیٹھ جاؤں؟", sd: "ڇا اوھين کي اعتراض ٿيندو هجي جيڪڏهن مان هتي ويهان؟" },
      { en: "Wouldn't you mind if I sat here?", ur: "کیا آپ کو اعتراض نہیں ہوگا اگر میں یہاں بیٹھ جاؤں؟", sd: "ڇا اوھين کي اعتراض نه ٿيندو هجي جيڪڏهن مان هتي ويهان؟" },
    ]},
  ]},
  { title: "2. What If — Supposition", subtitle: "Possible situation/result", icon: "Clock", sections: [
    { heading: "Where Used", body: "Possible situation or result." },
    { heading: "Sentence Formation", body: "What if + Subject + V1/V2…?" },
    { heading: "Key Patterns", body: "", examples: [
      "What if it rains tomorrow?",
      "What if he does not come?",
      "What if we miss the bus?",
      "What if we do not reach on time?",
    ],
    examplesTr: [
      { en: "What if it rains tomorrow?", ur: "اگر کل بارش ہو تو؟", sd: "جيڪڏهن سڀاڻي وسڪارو ٿئي ته؟" },
      { en: "What if he does not come?", ur: "اگر وہ نہ آئے تو؟", sd: "جيڪڏهن هوءَ نه اچي ته؟" },
      { en: "What if we miss the bus?", ur: "اگر ہم بس نہ پکڑ سکیں تو؟", sd: "جيڪڏهن اسان بسن وڃائي ڇڏياري ته؟" },
      { en: "What if we do not reach on time?", ur: "اگر ہم وقت پر نہ پہنچیں تو؟", sd: "جيڪڏهن اسان وقت تي نه پهٽون ته؟" },
    ]},
  ]},
  { title: "3. What If — Showing Fear", subtitle: "Worry and fear", icon: "Clock", sections: [
    { heading: "Where Used", body: "Worry or fear." },
    { heading: "Sentence Formation", body: "What if + feared situation?" },
    { heading: "Key Patterns", body: "", examples: [
      "What if I fail the exam?",
      "What if he does not return?",
      "What if we miss the bus?",
      "What if we do not get a ticket?",
    ],
    examplesTr: [
      { en: "What if I fail the exam?", ur: "اگر میں امتحان میں ناکام ہو جاؤں تو؟", sd: "جيڪڏهن مان امتحان ۾ ناڪام ٿي وڃان ته؟" },
      { en: "What if he does not return?", ur: "اگر وہ واپس نہ آئے تو؟", sd: "جيڪڏهن هوءَ موٽي نه اچي ته؟" },
      { en: "What if we miss the bus?", ur: "اگر ہم بس نہ پکڑ سکیں تو؟", sd: "جيڪڏهن اسان بسن وڃائي ڇڏياري ته؟" },
      { en: "What if we do not get a ticket?", ur: "اگر ہم کو ٹکٹ نہ ملے تو؟", sd: "جيڪڏهن اسان کي ٽڪيٽ نه ملي ته؟" },
    ]},
  ]},
  { title: "4. Unless", subtitle: "Negative condition", icon: "Clock", sections: [
    { heading: "Where Used", body: "Negative condition (if not)." },
    { heading: "Sentence Formation", body: "Main clause + unless + Subject + V1. Normally do not add 'not' after unless." },
    { heading: "Key Patterns", body: "", examples: [
      "You will fail unless you study.",
      "I will not go unless he comes.",
      "Will you go unless he comes?",
      "Won't you go unless he comes?",
    ],
    examplesTr: [
      { en: "You will fail unless you study.", ur: "تم ناکام ہو جاؤ گے جب تک تم نہ پڑھو۔", sd: "اوھين ناڪام ٿي ويندا جيستائين اوھين نه پڙهيو." },
      { en: "I will not go unless he comes.", ur: "میں نہیں جاؤں گا جب تک وہ نہ آئے۔", sd: "مان نه ويندس جيستائين هوءَ نه اچي." },
      { en: "Will you go unless he comes?", ur: "کیا تم جاؤ گے جب تک وہ نہ آئے؟", sd: "ڇا اوھين ويندا جيستائين هوءَ نه اچي؟" },
      { en: "Won't you go unless he comes?", ur: "کیا تم نہیں جاؤ گے جب تک وہ نہ آئے؟", sd: "ڇا اوھين نه ويندا جيستائين هوءَ نه اچي؟" },
    ]},
  ]},
  { title: "5. Either…Or", subtitle: "Two alternatives, one choice", icon: "Clock", sections: [
    { heading: "Where Used", body: "Two alternatives; one choice." },
    { heading: "Sentence Formation", body: "Subject + V + either + A + or + B." },
    { heading: "Key Patterns", body: "", examples: [
      "You can either study or play.",
      "You cannot either study or play.",
      "Can you either study or play?",
      "Can't you either study or play?",
    ],
    examplesTr: [
      { en: "You can either study or play.", ur: "تم یا تو پڑھ سکتے ہو یا کھیل سکتے ہو۔", sd: "اوھين يا ته پڙهي سگهو ٿا يا کائي سگهو ٿا." },
      { en: "You cannot either study or play.", ur: "تم نہ پڑھ سکتے ہو نہ کھیل سکتے ہو۔", sd: "اوھين نه پڙهي سگهو ٿا نه کائي سگهو ٿا." },
      { en: "Can you either study or play?", ur: "کیا تم یا تو پڑھ سکتے ہو یا کھیل سکتے ہو؟", sd: "ڇا اوھين يا ته پڙهي سگهو ٿا يا کائي سگهو ٿا؟" },
      { en: "Can't you either study or play?", ur: "کیا تم نہ پڑھ سکتے ہو نہ کھیل سکتے ہو؟", sd: "ڇا اوھين نه پڙهي سگهو ٿا نه کائي سگهو ٿا؟" },
    ]},
  ]},
  { title: "6. Neither…Nor", subtitle: "Reject both options", icon: "Clock", sections: [
    { heading: "Where Used", body: "Reject both options or persons." },
    { heading: "Sentence Formation", body: "Neither + A + nor + B. Avoid double negatives." },
    { heading: "Key Patterns", body: "", examples: [
      "Neither Ali nor Ahmed is present.",
      "Neither Ali nor Ahmed came.",
      "Did neither Ali nor Ahmed come?",
      "Didn't either Ali or Ahmed come?",
    ],
    examplesTr: [
      { en: "Neither Ali nor Ahmed is present.", ur: "نہ علی حاضر ہے نہ احمد۔", sd: "نه علي حاضر آهي نه احمد." },
      { en: "Neither Ali nor Ahmed came.", ur: "نہ علی آیا نہ احمد۔", sd: "نه علي آيو نه احمد." },
      { en: "Did neither Ali nor Ahmed come?", ur: "کیا نہ علی آیا نہ احمد؟", sd: "ڇا نه علي آيو نه احمد؟" },
      { en: "Didn't either Ali or Ahmed come?", ur: "کیا علی یا احمد میں سے کوئی نہیں آیا؟", sd: "ڇا علي يا احمد مان ڪو به نه آيو؟" },
    ]},
  ]},
  { title: "7. As Well As", subtitle: "Add extra information", icon: "Clock", sections: [
    { heading: "Where Used", body: "Add extra information." },
    { heading: "Sentence Formation", body: "A + as well as + B. Verb follows the main subject." },
    { heading: "Key Patterns", body: "", examples: [
      "He plays cricket as well as football.",
      "He doesn't play cricket as well as football.",
      "Does he play cricket as well as football?",
      "Doesn't he play cricket as well as football?",
    ],
    examplesTr: [
      { en: "He plays cricket as well as football.", ur: "وہ کرکٹ کے ساتھ ساتھ فٹ بال بھی کھیلتا ہے۔", sd: "هوءَ ڪرڪيٽ سان گڏوگڏ فٽ بال به کائيندو آهي." },
      { en: "He doesn't play cricket as well as football.", ur: "وہ کرکٹ کے ساتھ ساتھ فٹ بال بھی نہیں کھیلتا۔", sd: "هوءَ ڪرڪيٽ سان گڏوگڏ فٽ بال به نه کائيندو آهي." },
      { en: "Does he play cricket as well as football?", ur: "کیا وہ کرکٹ کے ساتھ ساتھ فٹ بال بھی کھیلتا ہے؟", sd: "ڇا هوءَ ڪرڪيٽ سان گڏوگڏ فٽ بال به کائيندو آهي؟" },
      { en: "Doesn't he play cricket as well as football?", ur: "کیا وہ کرکٹ کے ساتھ ساتھ فٹ بال بھی نہیں کھیلتا؟", sd: "ڇا هوءَ ڪرڪيٽ سان گڏوگڏ فٽ بال به نه کائيندو آهي؟" },
    ]},
  ]},
  { title: "8. Lest", subtitle: "Formal warning or fear", icon: "Clock", sections: [
    { heading: "Where Used", body: "Formal warning or fear." },
    { heading: "Sentence Formation", body: "Main clause + lest + Subject + should + V1." },
    { heading: "Key Patterns", body: "", examples: [
      "Work hard lest you should fail.",
      "Do not go outside lest you should fall ill.",
      "Should we hurry lest we should miss the train?",
      "Shouldn't we hurry lest we should miss the train?",
    ],
    examplesTr: [
      { en: "Work hard lest you should fail.", ur: "محنت کرو کہیں ایسا نہ ہو کہ تم ناکام ہو جاؤ۔", sd: "محنت ڪريو متان اوھين ناڪام ٿي وڃو." },
      { en: "Do not go outside lest you should fall ill.", ur: "باہر مت جانا کہیں ایسا نہ ہو کہ تم بیمار ہو جاؤ۔", sd: "ٻاهر نه وڃو متان اوھين بيمار ٿي پئو." },
      { en: "Should we hurry lest we should miss the train?", ur: "کیا ہمیں جلدی کرنی چاہیے کہیں ایسا نہ ہو کہ ہم ٹرین نہ پا سکیں؟", sd: "ڇا اسان کي جلدي ڪرڻ گهرجي متان اسان ريٽرهي وڃائجي؟" },
      { en: "Shouldn't we hurry lest we should miss the train?", ur: "کیا ہمیں جلدی نہیں کرنی چاہیے کہیں ایسا نہ ہو کہ ہم ٹرین نہ پا سکیں؟", sd: "ڇا اسان کي جلدي نه ڪرڻ گهرجي متان اسان ريٽرهي وڃائجي؟" },
    ]},
  ]},
  { title: "9. Has To / Have To", subtitle: "Present necessity", icon: "Clock", sections: [
    { heading: "Where Used", body: "Present necessity." },
    { heading: "Sentence Formation", body: "He/She/It + has to + V1; I/You/We/They + have to + V1." },
    { heading: "Key Patterns", body: "", examples: [
      "He has to study.",
      "He doesn't have to study.",
      "Does he have to study?",
      "Doesn't he have to study?",
    ],
    examplesTr: [
      { en: "He has to study.", ur: "اسے پڑھنا ہے۔", sd: "کيس پڙهڻو آهي." },
      { en: "He doesn't have to study.", ur: "اسے نہیں پڑھنا۔", sd: "کيس پڙهڻو ڪانهي." },
      { en: "Does he have to study?", ur: "کیا اسے پڑھنا ہے؟", sd: "ڇا کيس پڙهڻو آهي؟" },
      { en: "Doesn't he have to study?", ur: "کیا اسے نہیں پڑھنا؟", sd: "ڇا کيس پڙهڻو ڪانهي؟" },
    ]},
  ]},
  { title: "10. Had To", subtitle: "Past necessity", icon: "Clock", sections: [
    { heading: "Where Used", body: "Past necessity." },
    { heading: "Sentence Formation", body: "Subject + had to + V1. Negative: did not have to + V1." },
    { heading: "Key Patterns", body: "", examples: [
      "I had to leave early.",
      "I did not have to leave early.",
      "Did you have to leave early?",
      "Didn't you have to leave early?",
    ],
    examplesTr: [
      { en: "I had to leave early.", ur: "مجھے جلدی جانا پڑا۔", sd: "مون کي جلدي وڃڻو پيو." },
      { en: "I did not have to leave early.", ur: "مجھے جلدی نہیں جانا پڑا۔", sd: "مون کي جلدي وڃڻو ڪو نه پيو." },
      { en: "Did you have to leave early?", ur: "کیا آپ کو جلدی جانا پڑا؟", sd: "ڇا اوھين کي جلدي وڃڻو پيو؟" },
      { en: "Didn't you have to leave early?", ur: "کیا آپ کو جلدی نہیں جانا پڑا؟", sd: "ڇا اوھين کي جلدي وڃڻو ڪو نه پيو؟" },
    ]},
  ]},
  { title: "11. Will Have To / Shall Have To", subtitle: "Future necessity", icon: "Clock", sections: [
    { heading: "Where Used", body: "Future necessity." },
    { heading: "Sentence Formation", body: "Subject + will have to + V1." },
    { heading: "Key Patterns", body: "", examples: [
      "I will have to study.",
      "I will not have to study.",
      "Will I have to study?",
      "Won't I have to study?",
    ],
    examplesTr: [
      { en: "I will have to study.", ur: "مجھے پڑھنا پڑے گا۔", sd: "مون کي پڙهڻو پوندو." },
      { en: "I will not have to study.", ur: "مجھے نہیں پڑھنا پڑے گا۔", sd: "مون کي پڙهڻو نه پوندو." },
      { en: "Will I have to study?", ur: "کیا مجھے پڑھنا پڑے گا؟", sd: "ڇا مون کي پڙهڻو پوندو؟" },
      { en: "Won't I have to study?", ur: "کیا مجھے نہیں پڑھنا پڑے گا؟", sd: "ڇا مون کي پڙهڻو نه پوندو؟" },
    ]},
  ]},
  { title: "12. As If / As Though", subtitle: "Appearance or unreal comparison", icon: "Clock", sections: [
    { heading: "Where Used", body: "Appearance or unreal comparison." },
    { heading: "Sentence Formation", body: "S + V + as if/as though + clause." },
    { heading: "Key Patterns", body: "", examples: [
      "He behaves as if he were rich.",
      "He does not behave as if he were rich.",
      "Does he behave as if he were rich?",
      "Use the natural negative-question form; some fixed structures are normally not split.",
    ],
    examplesTr: [
      { en: "He behaves as if he were rich.", ur: "وہ ایسا برتاؤ کرتا ہے جیسے وہ امیر ہو۔", sd: "هوءَ اهڙو اچار رکي ٿو ڄڻ ته هوءَ مالدار هجي." },
      { en: "He does not behave as if he were rich.", ur: "وہ ایسا برتاؤ نہیں کرتا جیسے وہ امیر ہو۔", sd: "هوءَ اهڙو اچار نه رکي ڄڻ ته هوءَ مالدار هجي." },
      { en: "Does he behave as if he were rich?", ur: "کیا وہ ایسا برتاؤ کرتا ہے جیسے وہ امیر ہو؟", sd: "ڇا هوءَ اهڙو اچار رکي ٿو ڄڻ ته هوءَ مالدار هجي؟" },
      { en: "Use the natural negative-question form; some fixed structures are normally not split.", ur: "قدرتی نفی-سوال کی شکل استعمال کریں؛ کچھ مستحکم ساختوں کو عام طور پر نہیں توڑا جاتا۔", sd: "قدرتي منفي-سوال واري شڪل استعمال ڪريو؛ ڪي به مستحڪم بناوتن کي عام طور نه ڀڃيو ويندو آهي." },
    ]},
  ]},
  { title: "13. Remove 'To'", subtitle: "Modals, let, make, had better, would rather", icon: "Clock", sections: [
    { heading: "Where Used", body: "After modals, let, make, had better, would rather — 'to' is removed." },
    { heading: "Sentence Formation", body: "Modal + V1 / Let + O + V1 / had better + V1" },
    { heading: "Key Patterns", body: "", examples: [
      "I can swim. (not: I can to swim)",
      "Let me go. (not: Let me to go)",
      "You had better study. (not: had better to study)",
      "I would rather stay. (not: would rather to stay)",
    ],
    examplesTr: [
      { en: "I can swim. (not: I can to swim)", ur: "میں تیر سکتا ہوں۔ (نہیں: I can to swim)", sd: "مان تري سگهان ٿو. (نه: I can to swim)" },
      { en: "Let me go. (not: Let me to go)", ur: "مجھے جانے دو۔ (نہیں: Let me to go)", sd: "مون کي وڃڻ ڏيو. (نه: Let me to go)" },
      { en: "You had better study. (not: had better to study)", ur: "تمہیں پڑھنا چاہیے۔ (نہیں: had better to study)", sd: "اوھين کي پڙهڻ گهرجي. (نه: had better to study)" },
      { en: "I would rather stay. (not: would rather to stay)", ur: "میں رہنا پسند کروں گا۔ (نہیں: would rather to stay)", sd: "مان رهڻ پسند ڪريان. (نه: would rather to stay)" },
    ]},
  ]},
  { title: "14. Know How To", subtitle: "Skill or method", icon: "Clock", sections: [
    { heading: "Where Used", body: "Skill or method." },
    { heading: "Sentence Formation", body: "know/knows + how to + V1" },
    { heading: "Key Patterns", body: "", examples: [
      "I know how to swim.",
      "I do not know how to swim.",
      "Do you know how to swim?",
      "Does she know how to cook?",
    ],
    examplesTr: [
      { en: "I know how to swim.", ur: "مجھے تیرنا آتا ہے۔", sd: "مون کي ترڻ ايندو آهي." },
      { en: "I do not know how to swim.", ur: "مجھے تیرنا نہیں آتا۔", sd: "مون کي ترڻ نه ايندو آهي." },
      { en: "Do you know how to swim?", ur: "کیا آپ کو تیرنا آتا ہے؟", sd: "ڇا اوھين کي ترڻ ايندو آهي؟" },
      { en: "Does she know how to cook?", ur: "کیا اسے کھانا بنانا آتا ہے؟", sd: "ڇا کيس کاڌو ٺاهڻ ايندو آهي؟" },
    ]},
  ]},
  { title: "15. Not To Talk / Speak / Mention", subtitle: "Negative infinitive or reported command", icon: "Clock", sections: [
    { heading: "Where Used", body: "Negative infinitive or reported command." },
    { heading: "Sentence Formation", body: "verb + object + not to + V1" },
    { heading: "Key Patterns", body: "", examples: [
      "I told him not to talk in class.",
      "She asked me not to mention it.",
      "He warned them not to speak loudly.",
      "Did she tell you not to go?",
    ],
    examplesTr: [
      { en: "I told him not to talk in class.", ur: "میں نے اسے کہا کہ کلاس میں بات نہ کرے۔", sd: "مون کيس چيو ته ڪلاس ۾ ڳالهائي نه." },
      { en: "She asked me not to mention it.", ur: "اس نے مجھ سے کہا کہ اس کا ذکر نہ کروں۔", sd: "هن مون کان چيو ته ان جو ذڪر نه ڪريان." },
      { en: "He warned them not to speak loudly.", ur: "اس نے انہیں تنبیہ کی کہ زور سے بات نہ کریں۔", sd: "هن کين تنبيه ڪئي ته زور سان ڳالهائي نه." },
      { en: "Did she tell you not to go?", ur: "کیا اس نے آپ سے کہا کہ نہ جائیں؟", sd: "ڇا هن اوھين کي چيو ته نه وڃو؟" },
    ]},
  ]},
  { title: "16. Not Only…But Also", subtitle: "Parallel addition or emphasis", icon: "Clock", sections: [
    { heading: "Where Used", body: "Parallel addition or emphasis." },
    { heading: "Sentence Formation", body: "not only A but also B" },
    { heading: "Key Patterns", body: "", examples: [
      "He is not only intelligent but also hardworking.",
      "She not only sings but also dances.",
      "They not only passed the test but also scored highest.",
      "Did he not only write the book but also publish it?",
    ],
    examplesTr: [
      { en: "He is not only intelligent but also hardworking.", ur: "وہ نہ صرف ذہین ہے بلکہ محنتی بھی ہے۔", sd: "هوءَ نه رڳو ذهين آهي پر محنتي به آهي." },
      { en: "She not only sings but also dances.", ur: "وہ نہ صرف گاتی ہے بلکہ ناچتی بھی ہے۔", sd: "هوءَ نه رڳو ڳائي ٿي پر ناچي به ٿي." },
      { en: "They not only passed the test but also scored highest.", ur: "انہوں نے نہ صرف امتحان پاس کیا بلکہ سب سے زیادہ نمبر بھی حاصل کیے۔", sd: "کين نه رڳو امتحان پاس ڪيو پر بهترين نمبر به حاصل ڪيا." },
      { en: "Did he not only write the book but also publish it?", ur: "کیا اس نے نہ صرف کتاب لکھی بلکہ شائع بھی کی؟", sd: "ڇا هن نه رڳو ڪتاب لکيو پر شايع به ڪيو؟" },
    ]},
  ]},
  { title: "17. In Spite Of", subtitle: "Contrast", icon: "Clock", sections: [
    { heading: "Where Used", body: "Contrast — similar to 'despite' but always followed by 'of'." },
    { heading: "Sentence Formation", body: "in spite of + noun/pronoun/V-ing" },
    { heading: "Key Patterns", body: "", examples: [
      "In spite of the rain, we played cricket.",
      "He passed in spite of his illness.",
      "She succeeded in spite of being poor.",
      "Did they come in spite of the storm?",
    ],
    examplesTr: [
      { en: "In spite of the rain, we played cricket.", ur: "بارش کے باوجود، ہم نے کرکٹ کھیلی۔", sd: "وسڪاري جي باوجود، اسان ڪرڪيٽ کايئي." },
      { en: "He passed in spite of his illness.", ur: "اس نے بیماری کے باوجود پاس کیا۔", sd: "هن بيماري جي باوجود پاس ڪئي." },
      { en: "She succeeded in spite of being poor.", ur: "غریب ہونے کے باوجود وہ کامیاب ہو گئی۔", sd: "غريب هجڻ جي باوجود هوءَ ڪامياب ٿي." },
      { en: "Did they come in spite of the storm?", ur: "کیا وہ طوفان کے باوجود آئے؟", sd: "ڇا هو طوفان جي باوجود آيا؟" },
    ]},
  ]},
  { title: "18. Despite", subtitle: "Contrast (no 'of')", icon: "Clock", sections: [
    { heading: "Where Used", body: "Contrast; no 'of' after despite." },
    { heading: "Sentence Formation", body: "despite + noun/pronoun/V-ing" },
    { heading: "Key Patterns", body: "", examples: [
      "Despite the rain, we played cricket.",
      "He passed despite his illness.",
      "She succeeded despite being poor.",
      "Did they come despite the storm?",
    ],
    examplesTr: [
      { en: "Despite the rain, we played cricket.", ur: "بارش کے باوجود، ہم نے کرکٹ کھیلی۔", sd: "وسڪاري جي باوجود، اسان ڪرڪيٽ کايئي." },
      { en: "He passed despite his illness.", ur: "اس نے بیماری کے باوجود پاس کیا۔", sd: "هن بيماري جي باوجود پاس ڪئي." },
      { en: "She succeeded despite being poor.", ur: "غریب ہونے کے باوجود وہ کامیاب ہو گئی۔", sd: "غريب هجڻ جي باوجود هوءَ ڪامياب ٿي." },
      { en: "Did they come despite the storm?", ur: "کیا وہ طوفان کے باوجود آئے؟", sd: "ڇا هو طوفان جي باوجود آيا؟" },
    ]},
  ]},
  { title: "19. As Soon As", subtitle: "Immediate sequence", icon: "Clock", sections: [
    { heading: "Where Used", body: "Immediate sequence." },
    { heading: "Sentence Formation", body: "as soon as + present, will + V1" },
    { heading: "Key Patterns", body: "", examples: [
      "As soon as he arrives, I will tell him.",
      "As soon as the bell rings, the class will start.",
      "I will call you as soon as I reach home.",
      "Will you tell me as soon as you get the result?",
    ],
    examplesTr: [
      { en: "As soon as he arrives, I will tell him.", ur: "جیسے ہی وہ پہنچے گا، میں اسے بتا دوں گا۔", sd: "جيئن ئي هوءَ پهچندو، تيئن مان کيس ٻڌايان." },
      { en: "As soon as the bell rings, the class will start.", ur: "جیسے ہی گھنٹی بجے گی، کلاس شروع ہو جائے گی۔", sd: "جيئن ئي گهنٽي وڄندي، تيئن ڪلاس شروع ٿيندي." },
      { en: "I will call you as soon as I reach home.", ur: "میں گھر پہنچتے ہی آپ کو فون کروں گا۔", sd: "مان گهر پهچندي ئي اوھين کي فون ڪريان." },
      { en: "Will you tell me as soon as you get the result?", ur: "کیا آپ مجھے نتیجہ ملتے ہی بتائیں گے؟", sd: "ڇا اوھين مون کي نتيجو ملندي ئي ٻڌايو؟" },
    ]},
  ]},
  { title: "20. No Sooner…Than", subtitle: "Formal immediate sequence with inversion", icon: "Clock", sections: [
    { heading: "Where Used", body: "Formal immediate sequence; requires inversion." },
    { heading: "Sentence Formation", body: "No sooner had + S + V3 + than + S + V2" },
    { heading: "Key Patterns", body: "", examples: [
      "No sooner had I arrived than the phone rang.",
      "No sooner had she sat down than the bell rang.",
      "No sooner had they left than it started raining.",
      "No sooner had the teacher entered than the students stood up.",
    ],
    examplesTr: [
      { en: "No sooner had I arrived than the phone rang.", ur: "جیسے ہی میں پہنچا، فون بج گیا۔", sd: "جيئن ئي مان پهتس، تيئن فون وڄي پيو." },
      { en: "No sooner had she sat down than the bell rang.", ur: "جیسے ہی وہ بیٹھی، گھنٹی بج گئی۔", sd: "جيئن ئي هوءَ ويهي، تيئن گهنٽي وڄي پئي." },
      { en: "No sooner had they left than it started raining.", ur: "جیسے ہی وہ نکلے، بارش شروع ہو گئی۔", sd: "جيئن ئي هو نڪتا، تيئن وسڪارو شروع ٿيو." },
      { en: "No sooner had the teacher entered than the students stood up.", ur: "جیسے ہی استاد اندر آیا، طلباء کھڑے ہو گئے۔", sd: "جيئن ئي استاد اندر آيو، تيئن شاگرد کڙا ٿيا." },
    ]},
  ]},
  { title: "21. Can't Help", subtitle: "Uncontrollable reaction", icon: "Clock", sections: [
    { heading: "Where Used", body: "Uncontrollable reaction." },
    { heading: "Sentence Formation", body: "can't help + V-ing" },
    { heading: "Key Patterns", body: "", examples: [
      "I can't help laughing at his jokes.",
      "She can't help crying when she watches sad movies.",
      "They can't help wondering about the result.",
      "Can you help feeling sorry for him?",
    ],
    examplesTr: [
      { en: "I can't help laughing at his jokes.", ur: "میں اس کے مذاق پر ہنسے بغیر نہیں رہ سکتا۔", sd: "مان سندس مزاق تي کلڻ کان سواءِ نه رهي سگهان ٿو." },
      { en: "She can't help crying when she watches sad movies.", ur: "وہ اداس فلمیں دیکھ کر روئے بغیر نہیں رہ سکتی۔", sd: "هوءَ اداس فلمون ڏسي روئڻ کان سواءِ نه رهي سگهي ٿي." },
      { en: "They can't help wondering about the result.", ur: "وہ نتیجے کے بارے میں سوچے بغیر نہیں رہ سکتے۔", sd: "هو نتيجي بابت سوچڻ کان سواءِ نه رهي سگهن ٿا." },
      { en: "Can you help feeling sorry for him?", ur: "کیا آپ اس پر افسوس محسوس کیے بغیر نہیں رہ سکتے؟", sd: "ڇا اوھين کيس افسوس محسوس ڪرڻ کان سواءِ نه رهي سگهو ٿا؟" },
    ]},
  ]},
  { title: "22. Supposed To", subtitle: "Duty, expectation, or schedule", icon: "Clock", sections: [
    { heading: "Where Used", body: "Duty, expectation, or schedule." },
    { heading: "Sentence Formation", body: "be supposed to + V1" },
    { heading: "Key Patterns", body: "", examples: [
      "He is supposed to be here by 9 AM.",
      "She is not supposed to use her phone in class.",
      "Are they supposed to submit the report today?",
      "We were supposed to meet at the station.",
    ],
    examplesTr: [
      { en: "He is supposed to be here by 9 AM.", ur: "اس کا صبح 9 بجے تک یہاں ہونا چاہیے۔", sd: "کيس صبح 9 وڳي تائين هتي هجڻ گهرجي." },
      { en: "She is not supposed to use her phone in class.", ur: "اسے کلاس میں اپنا فون استعمال نہیں کرنا چاہیے۔", sd: "کيس ڪلاس ۾ پنهنجو فون استعمال نه ڪرڻ گهرجي." },
      { en: "Are they supposed to submit the report today?", ur: "کیا آج ان سے رپورٹ جمع کرانے کی توقّع ہے؟", sd: "ڇا اڄ کانئن رپورٽ جمع ڪرڻ جي توقع آهي؟" },
      { en: "We were supposed to meet at the station.", ur: "ہمیں اسٹیشن پر ملنا تھا۔", sd: "اسان کي اسٽيشن تي ملڻو هو." },
    ]},
  ]},
  { title: "23. While", subtitle: "Simultaneous or background action", icon: "Clock", sections: [
    { heading: "Where Used", body: "Simultaneous or background action." },
    { heading: "Sentence Formation", body: "while + clause" },
    { heading: "Key Patterns", body: "", examples: [
      "While I was studying, she was cooking.",
      "He fell asleep while watching TV.",
      "While they were playing, it started to rain.",
      "Did she call while I was out?",
    ],
    examplesTr: [
      { en: "While I was studying, she was cooking.", ur: "جب میں پڑھ رہا تھا، وہ کھانا بنا رہی تھی۔", sd: "جڏهن مان پڙهي رهيو هوس، تڏهن هوءَ کاڌو پچائي رهي هئي." },
      { en: "He fell asleep while watching TV.", ur: "ٹی وی دیکھتے ہوئے وہ سو گیا۔", sd: "ٽي وي ڏسندي هوءَ کڀرو ٿي ويو." },
      { en: "While they were playing, it started to rain.", ur: "جب وہ کھیل رہے تھے، بارش شروع ہو گئی۔", sd: "جڏهن هو کائي رهيا هئا، تڏهن وسڪارو شروع ٿيو." },
      { en: "Did she call while I was out?", ur: "کیا اس نے فون کیا جب میں باہر تھا؟", sd: "ڇا هن فون ڪيو جڏهن مان ٻاهر هوس؟" },
    ]},
  ]},
  { title: "24. Hardly / Scarcely / Barely", subtitle: "Immediate past sequence with inversion", icon: "Clock", sections: [
    { heading: "Where Used", body: "Immediate past sequence; requires inversion." },
    { heading: "Sentence Formation", body: "Hardly/Scarcely/Barely + had + S + V3 + when + S + V2" },
    { heading: "Key Patterns", body: "", examples: [
      "Hardly had I reached the station when the train left.",
      "Scarcely had she finished speaking when the bell rang.",
      "Barely had they sat down when the show started.",
      "Hardly had the teacher entered when the students stood up.",
    ],
    examplesTr: [
      { en: "Hardly had I reached the station when the train left.", ur: "میں اسٹیشن پہنچتے ہی ٹرین نکل گئی۔", sd: "مان اسٽيشن پهچندي ئي ريٽرهي نڪري وئي." },
      { en: "Scarcely had she finished speaking when the bell rang.", ur: "وہ بات مکمل کرتے ہی گھنٹی بج گئی۔", sd: "هوءَ ڳالهائڻ مڪمل ڪندي ئي گهنٽي وڄي پئي." },
      { en: "Barely had they sat down when the show started.", ur: "وہ بیٹھتے ہی شو شروع ہو گیا۔", sd: "هو ويهندڙي ئي شو شروع ٿيو." },
      { en: "Hardly had the teacher entered when the students stood up.", ur: "استاد اندر آتے ہی طلباء کھڑے ہو گئے۔", sd: "استاد اندر اچڻ سانئي شاگرد کڙا ٿيا." },
    ]},
  ]},
  { title: "25. May / Might", subtitle: "Possibility; may also permission", icon: "Clock", sections: [
    { heading: "Where Used", body: "Possibility; may also permission." },
    { heading: "Sentence Formation", body: "may/might + V1" },
    { heading: "Key Patterns", body: "", examples: [
      "It may rain today.",
      "She might come tomorrow.",
      "May I borrow your pen?",
      "He might not attend the meeting.",
    ],
    examplesTr: [
      { en: "It may rain today.", ur: "آج بارش ہو سکتی ہے۔", sd: "اڄ وسڪارو ٿي سگهي ٿو." },
      { en: "She might come tomorrow.", ur: "وہ کل آ سکتی ہے۔", sd: "هوءَ سڀاڻي اچي سگهي ٿي." },
      { en: "May I borrow your pen?", ur: "کیا میں آپ کا قلم لے سکتا ہوں؟", sd: "ڇا مان اوھانجي پينڪڙي وٺي سگهان ٿو؟" },
      { en: "He might not attend the meeting.", ur: "وہ اجلاس میں شاید نہ آئے۔", sd: "هوءَ شايد اجلاس ۾ نه اچي." },
    ]},
  ]},
  { title: "26. Though / Although / Even Though", subtitle: "Contrast", icon: "Clock", sections: [
    { heading: "Where Used", body: "Contrast." },
    { heading: "Sentence Formation", body: "Though/Although/Even though + clause, main clause" },
    { heading: "Key Patterns", body: "", examples: [
      "Although it was raining, we played cricket.",
      "Even though she was tired, she finished her homework.",
      "Though he studied hard, he did not pass.",
      "Did they come although it was snowing?",
    ],
    examplesTr: [
      { en: "Although it was raining, we played cricket.", ur: "اگرچہ بارش ہو رہی تھی، ہم نے کرکٹ کھیلی۔", sd: "جيتوڻي وسڪارو پي رهيو هو، اسان ڪرڪيٽ کايئي." },
      { en: "Even though she was tired, she finished her homework.", ur: "اگرچہ وہ تھکی ہوئی تھی، اس نے اپنا ہوم ورک مکمل کیا۔", sd: "جيتوڻي هوءَ ٿڪل هئي، هن پنهنجو گهرڙو ڪم مڪمل ڪيو." },
      { en: "Though he studied hard, he did not pass.", ur: "اگرچہ اس نے محنت سے پڑھا، وہ پاس نہ ہوا۔", sd: "جيتوڻي هن محنت سان پڙهيو، هوءَ پاس نه ٿيو." },
      { en: "Did they come although it was snowing?", ur: "کیا وہ آئے اگرچہ برف باری ہو رہی تھی؟", sd: "ڇا هو آيا جيتوڻي برفباري پي رهي هئي؟" },
    ]},
  ]},
  { title: "27. Provided That", subtitle: "Condition or requirement", icon: "Clock", sections: [
    { heading: "Where Used", body: "Condition or requirement." },
    { heading: "Sentence Formation", body: "provided that + clause" },
    { heading: "Key Patterns", body: "", examples: [
      "You may go provided that you finish your work.",
      "I will help you provided that you help me.",
      "They can join provided that they register first.",
      "Will she come provided that we invite her?",
    ],
    examplesTr: [
      { en: "You may go provided that you finish your work.", ur: "آپ جا سکتے ہیں بشرطیکہ آپ اپنا کام مکمل کریں۔", sd: "اوھين وڃي سگهو ٿا بشرطيڪه اوھين پنهنجو ڪم مڪمل ڪريو." },
      { en: "I will help you provided that you help me.", ur: "میں آپ کی مدد کروں گا بشرطیکہ آپ میری مدد کریں۔", sd: "مان اوھين جي مدد ڪريان بشرطيڪه اوھين مون جي مدد ڪريو." },
      { en: "They can join provided that they register first.", ur: "وہ شامل ہو سکتے ہیں بشرطیکہ وہ پہلے رجسٹر ہوں۔", sd: "هو شامل ٿي سگهن ٿا بشرطيڪه هو پهرين رجسٽر ٿين." },
      { en: "Will she come provided that we invite her?", ur: "کیا وہ آئے گی بشرطیکہ ہم اسے دعوت دیں؟", sd: "ڇا هوءَ اچي بشرطيڪه اسان کيس دعوت ڏيون؟" },
    ]},
  ]},
  { title: "28. Having", subtitle: "Completed action before main clause", icon: "Clock", sections: [
    { heading: "Where Used", body: "Completed action before the main clause." },
    { heading: "Sentence Formation", body: "Having + V3, main clause" },
    { heading: "Key Patterns", body: "", examples: [
      "Having finished his homework, he went to play.",
      "Having eaten dinner, they went for a walk.",
      "Having completed the project, she submitted it.",
      "Having read the book, I can discuss it.",
    ],
    examplesTr: [
      { en: "Having finished his homework, he went to play.", ur: "اپنا ہوم ورک مکمل کر کے، وہ کھیلنے چلا گیا۔", sd: "پنهنجو گهرڙو ڪم مڪمل ڪري، هوءَ کائڻ ويو." },
      { en: "Having eaten dinner, they went for a walk.", ur: "رات کا کھانا کھا کر، وہ سیر کو نکلے۔", sd: "رات جو کاڌو کائي، هو سير تي نڪتا." },
      { en: "Having completed the project, she submitted it.", ur: "پروجیکٹ مکمل کر کے، اس نے اسے جمع کر دیا۔", sd: "پروجيڪٽ مڪمل ڪري، هن کيس جمع ڪيو." },
      { en: "Having read the book, I can discuss it.", ur: "کتاب پڑھ چکے ہوئے، میں اس پر بات کر سکتا ہوں۔", sd: "ڪتاب پڙهي چڪو مان، ان تي ڳالهائي سگهان ٿو." },
    ]},
  ]},
  { title: "29. Able To / In A Position To", subtitle: "Ability or capacity", icon: "Clock", sections: [
    { heading: "Where Used", body: "Ability or capacity." },
    { heading: "Sentence Formation", body: "be + able to + V1 / be + in a position to + V1" },
    { heading: "Key Patterns", body: "", examples: [
      "I am able to solve this problem.",
      "She was able to pass the test.",
      "They are not in a position to help us.",
      "Will you be able to attend the meeting?",
    ],
    examplesTr: [
      { en: "I am able to solve this problem.", ur: "میں اس مسئلے کو حل کرنے کے قابل ہوں۔", sd: "مان هن مشڪلي کي حل ڪرڻ جي لائق آهيان." },
      { en: "She was able to pass the test.", ur: "وہ امتحان پاس کرنے کے قابل تھی۔", sd: "هوءَ امتحان پاس ڪرڻ جي لائق هئي." },
      { en: "They are not in a position to help us.", ur: "وہ ہماری مدد کے قابل نہیں ہیں۔", sd: "هو اسان جي مدد ڪرڻ جي حالت ۾ نه آهن." },
      { en: "Will you be able to attend the meeting?", ur: "کیا آپ اجلاس میں شامل ہونے کے قابل ہوں گے؟", sd: "ڇا اوھين اجلاس ۾ شامل ٿيڻ جي لائق هوندا؟" },
    ]},
  ]},
  { title: "30. Let", subtitle: "Permission or allowing", icon: "Clock", sections: [
    { heading: "Where Used", body: "Permission or allowing." },
    { heading: "Sentence Formation", body: "Let + object + V1 (no 'to')" },
    { heading: "Key Patterns", body: "", examples: [
      "Let me go.",
      "She let him use her phone.",
      "They did not let us enter.",
      "Did the teacher let you leave early?",
    ],
    examplesTr: [
      { en: "Let me go.", ur: "مجھے جانے دو۔", sd: "مون کي وڃڻ ڏيو." },
      { en: "She let him use her phone.", ur: "اس نے اسے اپنا فون استعمال کرنے دیا۔", sd: "هن کيس پنهنجو فون استعمال ڪرڻ ڏنو." },
      { en: "They did not let us enter.", ur: "انہوں نے ہمیں اندر آنے نہیں دیا۔", sd: "کين اسان کي اندر اچڻ نه ڏنو." },
      { en: "Did the teacher let you leave early?", ur: "کیا استاد نے آپ کو جلدی جانے دیا؟", sd: "ڇا استاد اوھين کي جلدي وڃڻ ڏنو؟" },
    ]},
  ]},
  { title: "31. Let's", subtitle: "Suggestion", icon: "Clock", sections: [
    { heading: "Where Used", body: "Suggestion." },
    { heading: "Sentence Formation", body: "let's + V1; let's not + V1" },
    { heading: "Key Patterns", body: "", examples: [
      "Let's go for a walk.",
      "Let's not argue about this.",
      "Let's study together for the exam.",
      "Let's not waste time.",
    ],
    examplesTr: [
      { en: "Let's go for a walk.", ur: "چلیں سیر کو چلتے ہیں۔", sd: "اچو ته سير تي وڃون." },
      { en: "Let's not argue about this.", ur: "آئیے اس پر بحث نہ کریں۔", sd: "اچو ان تي بحث نه ڪريون." },
      { en: "Let's study together for the exam.", ur: "آئیے مل کر امتحان کے لیے پڑھیں۔", sd: "اچو گڏجي امتحان لاءِ پڙهون." },
      { en: "Let's not waste time.", ur: "آئیے وقت ضائع نہ کریں۔", sd: "اچو وقت ضايع نه ڪريون." },
    ]},
  ]},
  { title: "32. Zero Conditional", subtitle: "Facts, rules, and general truths", icon: "GitBranch", sections: [
    { heading: "Where Used", body: "Facts, rules, and general truths." },
    { heading: "Sentence Formation", body: "If + present, present" },
    { heading: "Key Patterns", body: "", examples: [
      "If you heat ice, it melts.",
      "If water reaches 100°C, it boils.",
      "If you mix blue and yellow, you get green.",
      "If people eat too much, they get fat.",
    ],
    examplesTr: [
      { en: "If you heat ice, it melts.", ur: "اگر آپ برف گرم کریں تو وہ پگھل جاتی ہے۔", sd: "جيڪڏهن اوھين برف گرم ڪريو ته اها پگهري وڃي ٿي." },
      { en: "If water reaches 100°C, it boils.", ur: "اگر پانی 100 ڈگری تک پہنچے، تو وہ ابلتا ہے۔", sd: "جيڪڏهن پاڻي 100 ڊگري تي پهچي ته اها اُڀلي ٿو." },
      { en: "If you mix blue and yellow, you get green.", ur: "اگر آپ نیلا اور پیلا ملا دیں، تو آپ کو سبز ملتا ہے۔", sd: "جيڪڏهن اوھين نيرو ۽ پيلو ملائيو ته اوھين سائو ملائي ٿو." },
      { en: "If people eat too much, they get fat.", ur: "اگر لوگ بہت زیادہ کھائیں تو وہ موٹے ہو جاتے ہیں۔", sd: "جيڪڏهن ماڻهو گهڻو کائين ته هو موٽا ٿي وڃن ٿا." },
    ]},
  ]},
  { title: "33. First Conditional", subtitle: "Real or possible future", icon: "GitBranch", sections: [
    { heading: "Where Used", body: "Real or possible future condition." },
    { heading: "Sentence Formation", body: "If + present, will + V1" },
    { heading: "Key Patterns", body: "", examples: [
      "If it rains, I will stay home.",
      "If you study hard, you will pass the exam.",
      "If she calls, I will answer.",
      "If they come early, we will start on time.",
    ],
    examplesTr: [
      { en: "If it rains, I will stay home.", ur: "اگر بارش ہو، تو میں گھر پر رہوں گا۔", sd: "جيڪڏهن وسڪارو ٿئي ته مان گهر رهندس." },
      { en: "If you study hard, you will pass the exam.", ur: "اگر آپ محنت سے پڑھیں، تو آپ امتحان پاس کر لیں گے۔", sd: "جيڪڏهن اوھين محنت سان پڙهيو ته اوھين امتحان پاس ڪندا." },
      { en: "If she calls, I will answer.", ur: "اگر وہ فون کرے، تو میں جواب دوں گا۔", sd: "جيڪڏهن هوءَ فون ڪري ته مان جواب ڏيندس." },
      { en: "If they come early, we will start on time.", ur: "اگر وہ جلدی آئیں، تو ہم وقت پر شروع کریں گے۔", sd: "جيڪڏهن هو جلدي اچن ته اسان وقت تي شروع ڪنداسين." },
    ]},
  ]},
  { title: "34. Second Conditional", subtitle: "Imaginary or unlikely present/future", icon: "GitBranch", sections: [
    { heading: "Where Used", body: "Imaginary or unlikely present or future condition." },
    { heading: "Sentence Formation", body: "If + past, would + V1" },
    { heading: "Key Patterns", body: "", examples: [
      "If I had money, I would travel the world.",
      "If she were here, she would help us.",
      "If I were you, I would apologize.",
      "If they knew the truth, they would be angry.",
    ],
    examplesTr: [
      { en: "If I had money, I would travel the world.", ur: "اگر میرے پاس پیسہ ہوتا، تو میں دنیا گھومتا۔", sd: "جيڪڏهن مون وٽ پيسا هجي ها ته مان دنيا گهمان ها." },
      { en: "If she were here, she would help us.", ur: "اگر وہ یہاں ہوتی، تو ہماری مدد کرتی۔", sd: "جيڪڏهن هوءَ هتي هجي ها ته اسان جي مدد ڪري ها." },
      { en: "If I were you, I would apologize.", ur: "اگر میں آپ کی جگہ ہوتا، تو معذرت چاہتا۔", sd: "جيڪڏهن مان اوھانجي جاءِ تي هجان ها ته معافي گهران ها." },
      { en: "If they knew the truth, they would be angry.", ur: "اگر انہیں سچ پتہ ہوتا، تو وہ ناراض ہوتے۔", sd: "جيڪڏهن کين سچ معلوم هجي ها ته هو ناراض هجن ها." },
    ]},
  ]},
  { title: "35. Third Conditional", subtitle: "Imagined past result (regret)", icon: "GitBranch", sections: [
    { heading: "Where Used", body: "Imagined past result; regret." },
    { heading: "Sentence Formation", body: "If + had + V3, would have + V3" },
    { heading: "Key Patterns", body: "", examples: [
      "If I had studied, I would have passed.",
      "If she had left earlier, she would have caught the train.",
      "If they had known, they would have helped.",
      "If he had asked, I would have given it to him.",
    ],
    examplesTr: [
      { en: "If I had studied, I would have passed.", ur: "اگر میں پڑھا ہوتا، تو کامیاب ہو جاتا۔", sd: "جيڪڏهن مون پڙهيو هجي ها ته ڪامياب ٿي وڃان ها." },
      { en: "If she had left earlier, she would have caught the train.", ur: "اگر وہ جلدی نکلتی، تو ٹرین پا لیت۔", sd: "جيڪڏهن هوءَ جلدي نڪتي هجي ها ته ريٽرهي وڃي ها." },
      { en: "If they had known, they would have helped.", ur: "اگر انہیں معلوم ہوتا، تو وہ مدد کرتے۔", sd: "جيڪڏهن کين معلوم هجي ها ته هو مدد ڪري ها." },
      { en: "If he had asked, I would have given it to him.", ur: "اگر اس نے مانگا ہوتا، تو میں اسے دے دیتا۔", sd: "جيڪڏهن هن گهريو هجي ها ته مان کيس ڏئي ڇڏيان ها." },
    ]},
  ]},
  { title: "36. Mixed Conditional", subtitle: "Past cause + present consequence", icon: "GitBranch", sections: [
    { heading: "Where Used", body: "Past cause with present consequence." },
    { heading: "Sentence Formation", body: "If + had + V3, would + V1 (present result)" },
    { heading: "Key Patterns", body: "", examples: [
      "If I had studied medicine, I would be a doctor now.",
      "If she had married him, she would live in Karachi today.",
      "If they had saved money, they would be rich now.",
      "If he had taken the job, he would be happier today.",
    ],
    examplesTr: [
      { en: "If I had studied medicine, I would be a doctor now.", ur: "اگر میں طب پڑھا ہوتا، تو اب ڈاکٹر ہوتا۔", sd: "جيڪڏهن مون طب پڙهيو هجي ها ته هاڻي ڊاڪٽر هجان." },
      { en: "If she had married him, she would live in Karachi today.", ur: "اگر اس نے اس سے شادی کی ہوتی، تو آج کراچی میں رہتی۔", sd: "جيڪڏهن هن کانئس شادي ڪئي هجي ها ته اڄ ڪراچي ۾ رهي ها." },
      { en: "If they had saved money, they would be rich now.", ur: "اگر انہوں نے پیسہ بچایا ہوتا، تو اب امیر ہوتے۔", sd: "جيڪڏهن کين پيسو بچايو هجي ها ته هاڻي مالدار هجن." },
      { en: "If he had taken the job, he would be happier today.", ur: "اگر اس نے نوکری قبول کی ہوتی، تو آج زیادہ خوش ہوتا۔", sd: "جيڪڏهن هن نوکري قبول ڪئي هجي ها ته اڄ وڌيڪ خوش هجي." },
    ]},
  ]},
  { title: "37. Had Better", subtitle: "Strong advice or warning", icon: "Clock", sections: [
    { heading: "Where Used", body: "Strong advice or warning." },
    { heading: "Sentence Formation", body: "had better + V1; had better not + V1" },
    { heading: "Key Patterns", body: "", examples: [
      "You had better study tonight.",
      "You had better not be late.",
      "She had better finish her homework before going out.",
      "We had better leave now or we'll miss the bus.",
    ],
    examplesTr: [
      { en: "You had better study tonight.", ur: "آپ کو آج رات پڑھنا چاہیے۔", sd: "اوھين کي اڄ رات پڙهڻ گهرجي." },
      { en: "You had better not be late.", ur: "آپ کو دیر نہیں کرنا چاہیے۔", sd: "اوھين کي دير نه ڪرڻ گهرجي." },
      { en: "She had better finish her homework before going out.", ur: "اسے باہر جانے سے پہلے اپنا ہوم ورک مکمل کر لینا چاہیے۔", sd: "کيس ٻاهر وڃڻ کان اڳ پنهنجو گهرڙو ڪم مڪمل ڪرڻ گهرجي." },
      { en: "We had better leave now or we'll miss the bus.", ur: "ہمیں اب جانا چاہیے ورنہ ہم بس نہیں پا سکیں گے۔", sd: "اسان کي هاڻي وڃڻ گهرجي نه ته اسان بسن وڃائي ڇڏينداسين." },
    ]},
  ]},
  { title: "38. Exclamatory Sentences", subtitle: "Joy, surprise, praise, regret", icon: "Clock", sections: [
    { heading: "Where Used", body: "Expressing joy, surprise, praise, or regret." },
    { heading: "Sentence Formation", body: "What + a/an + adjective + noun! / How + adjective!" },
    { heading: "Key Patterns", body: "", examples: [
      "What a beautiful flower!",
      "How wonderful the weather is!",
      "What a pity he missed the party!",
      "How fast she runs!",
    ],
    examplesTr: [
      { en: "What a beautiful flower!", ur: "کیسا خوبصورت پھول ہے!", sd: "ڪهو سهڻو گل آهي!" },
      { en: "How wonderful the weather is!", ur: "موسم کیا خوبصورت ہے!", sd: "موسم ڪهو سهڻو آهي!" },
      { en: "What a pity he missed the party!", ur: "افسوس کہ وہ پارٹی سے محروم رہا!", sd: "ارمان ته هو پارٽي وڃائي ڇڏيائين!" },
      { en: "How fast she runs!", ur: "وہ کتنی تیز دوڑتی ہے!", sd: "هوءَ ڪيتري تيز ڊوڙي ٿي!" },
    ]},
  ]},
  { title: "39. Optative Sentences", subtitle: "Wish, prayer, blessing", icon: "Clock", sections: [
    { heading: "Where Used", body: "Wish, prayer, or blessing." },
    { heading: "Sentence Formation", body: "May + Subject + V1…" },
    { heading: "Key Patterns", body: "", examples: [
      "May you live long!",
      "May God bless you!",
      "May you succeed in life!",
      "May Allah give you health and happiness!",
    ],
    examplesTr: [
      { en: "May you live long!", ur: "اللہ آپ کو لمبی زندگی دے!", sd: "اللہ اوھين کي ڊگهي زندگي ڏي!" },
      { en: "May God bless you!", ur: "اللہ آپ کو برکت دے!", sd: "اللہ اوھين کي برکت ڏي!" },
      { en: "May you succeed in life!", ur: "اللہ آپ کو زندگی میں کامیابی دے!", sd: "اللہ اوھين کي زندگي ۾ ڪاميابي ڏي!" },
      { en: "May Allah give you health and happiness!", ur: "اللہ آپ کو صحت اور خوشی عطا کرے!", sd: "اللہ اوھين کي صحت ۽ خوشي عطا ڪري!" },
    ]},
  ]},
  { title: "40. What If — Quick Review", subtitle: "Supposition or fear", icon: "Clock", sections: [
    { heading: "Where Used", body: "Supposition or fear." },
    { heading: "Sentence Formation", body: "What if + clause?" },
    { heading: "Key Patterns", body: "", examples: [
      "What if we lose the match?",
      "What if she doesn't come?",
      "What if the train is late?",
      "What if they reject our application?",
    ],
    examplesTr: [
      { en: "What if we lose the match?", ur: "اگر ہم میچ ہار جائیں تو؟", sd: "جيڪڏهن اسان ميچ هاري وڃائون ته؟" },
      { en: "What if she doesn't come?", ur: "اگر وہ نہ آئے تو؟", sd: "جيڪڏهن هوءَ نه اچي ته؟" },
      { en: "What if the train is late?", ur: "اگر ٹرین دیر سے آئے تو؟", sd: "جيڪڏهن ريٽرهي دير سان اچي ته؟" },
      { en: "What if they reject our application?", ur: "اگر وہ ہماری درخواست رد کر دیں تو؟", sd: "جيڪڏهن هو اسان جي درخواست رد ڪن ته؟" },
    ]},
  ]},
  { title: "41. Conditional Sentences — Five-Part Revision", subtitle: "All five conditional patterns", icon: "GitBranch", sections: [
    { heading: "Where Used", body: "Revision of all five conditional patterns." },
    {
      heading: "All Five Conditionals",
      body: "",
      table: {
        headers: ["Type", "Structure", "Example"],
        rows: [
          ["Zero", "If + present, present", "If you heat ice, it melts."],
          ["First", "If + present, will + V1", "If it rains, I will stay home."],
          ["Second", "If + past, would + V1", "If I had money, I would travel."],
          ["Third", "If + had V3, would have V3", "If I had studied, I would have passed."],
          ["Mixed", "If + had V3, would + V1", "If I had studied, I would be a doctor."],
        ],
      },
    },
  ]},
  { title: "42. Master Grammar Pattern Review", subtitle: "Quick reference and error prevention", icon: "BookOpen", sections: [
    { heading: "Where Used", body: "Quick reference and error prevention for all 42 lessons." },
    {
      heading: "Key Formulas Summary",
      body: "",
      table: {
        headers: ["Pattern", "Formula"],
        rows: [
          ["Mind if", "Would you mind if + S + V2?"],
          ["Unless", "Main + unless + S + V1 (no 'not')"],
          ["Lest", "Main + lest + S + should + V1"],
          ["No sooner", "No sooner had + S + V3 + than + S + V2"],
          ["Hardly/Scarcely", "Hardly had + S + V3 + when + S + V2"],
          ["Can't help", "can't help + V-ing"],
          ["Not only…but also", "not only A but also B"],
          ["In spite of / Despite", "+ noun/pronoun/V-ing"],
          ["Conditionals", "Zero → First → Second → Third → Mixed"],
        ],
      },
    },
    { heading: "Common Mistakes", body: "Use the exact formula of each lesson; do not add or remove 'to' or auxiliaries randomly. Remember: 'unless' already means 'if not' — don't use 'not' after it. 'Despite' does not take 'of'. After 'lest', always use 'should'." },
  ]},
];

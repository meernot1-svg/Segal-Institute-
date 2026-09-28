/**
 * Basic-tier lessons — structured lesson content for Basic badge students.
 * Each lesson has a title, definition, examples, and related content.
 */

export type Lesson = {
  title: string;
  subtitle: string;
  icon: string; // lucide icon name
  sections: LessonSection[];
  /**
   * Key terms / words introduced in this lesson, each with its Urdu and
   * Sindhi translation. Rendered as a "Words in this lesson" card on the
   * lessons page so students see the trilingual meaning of every new term.
   */
  vocabulary?: { term: string; ur: string; sd: string }[];
};

export type LessonSection = {
  heading: string;
  body: string;
  examples?: string[];
  /**
   * Parallel translations of `examples` — same length, same order.
   * Each entry carries the English (en), Urdu (ur, RTL), and Sindhi (sd, RTL)
   * versions of the same example sentence so students see all three.
   * The `examples` array above is kept for backward compatibility.
   */
  examplesTr?: { en: string; ur: string; sd: string }[];
  table?: { headers: string[]; rows: string[][] };
};

export const BASIC_LESSONS: Lesson[] = [
  {
    title: "What are Verbs?",
    subtitle: "Understanding the three forms of English verbs",
    icon: "BookA",
    sections: [
      {
        heading: "Definition",
        body: "A verb is a word that shows an <strong>action</strong> (run, eat, write), a <strong>state</strong> (be, seem, belong), or an <strong>occurrence</strong> (happen, become, change). Without verbs, no sentence in English is complete — they tell us what the subject is doing or what is happening to it. In English, every verb has three main forms: <strong>V1 (Base Form)</strong>, <strong>V2 (Past Simple)</strong>, and <strong>V3 (Past Participle)</strong>. These three forms are the foundation of all English tenses, so learning them first makes every later lesson easier. For example, the verb <em>go</em> appears as <em>go (V1)</em>, <em>went (V2)</em>, and <em>gone (V3)</em> depending on the tense you need.",
      },
      {
        heading: "The Three Forms",
        body: "Every English verb can be expressed in three forms — V1, V2, and V3 — and together they let you talk about the present, the past, and the perfect (completed) past. <strong>Regular verbs</strong> follow a clear pattern: just add <em>-ed</em> for V2 and V3, so <em>work</em> becomes <em>work / worked / worked</em>. <strong>Irregular verbs</strong> do not follow the pattern and must be memorized one by one, like <em>go / went / gone</em>. Mixing up V2 and V3 is a common mistake, so always learn all three forms together as a set rather than as separate words.",
        table: {
          headers: ["Form", "Name", "Use", "Example (go)"],
          rows: [
            ["V1", "Base Form", "Present tense", "go"],
            ["V2", "Past Simple", "Past tense", "went"],
            ["V3", "Past Participle", "Perfect tenses", "gone"],
          ],
        },
      },
      {
        heading: "Example Sentences",
        body: "See how the three forms are used in real sentences below. Notice that V1 is used for present and habitual actions, V2 for finished past actions, and V3 with <em>have / has / had</em> to show something completed before another time. Reading these three sentences aloud — one for each form — is the fastest way to remember which form fits which tense. If you can say all three fluently, you already understand the heart of this lesson.",
        examples: [
          "V1: I <strong>go</strong> to school every day.",
          "V2: Yesterday I <strong>went</strong> to school.",
          "V3: I have <strong>gone</strong> to school already.",
        ],
        examplesTr: [
          {
            en: "V1: I <strong>go</strong> to school every day.",
            ur: "V1: میں ہر روز اسکول <strong>جاتا</strong> ہوں۔",
            sd: "V1: مان هر روز اسڪول <strong>وڃان</strong> ٿو.",
          },
          {
            en: "V2: Yesterday I <strong>went</strong> to school.",
            ur: "V2: کل میں اسکول <strong>گیا</strong>۔",
            sd: "V2: ڪالهه مان اسڪول <strong>ويو</strong>.",
          },
          {
            en: "V3: I have <strong>gone</strong> to school already.",
            ur: "V3: میں پہلے ہی اسکول <strong>جا چکا</strong> ہوں۔",
            sd: "V3: مان اڳ ۾ ئي اسڪول <strong>ويو آهيان</strong>.",
          },
        ],
      },
    ],
    vocabulary: [
      { term: "Verb", ur: "فعل", sd: "فعل" },
      { term: "Action", ur: "عمل", sd: "عمل" },
      { term: "State", ur: "حالت", sd: "حالت" },
      { term: "Occurrence", ur: "واقعہ", sd: "واقعو" },
      { term: "Base Form (V1)", ur: "بنیادی شکل (V1)", sd: "بنيادي شڪل (V1)" },
      { term: "Past Simple (V2)", ur: "ماضی بسیط (V2)", sd: "ماضي ساده (V2)" },
      { term: "Past Participle (V3)", ur: "ماضی بعید (V3)", sd: "ماضي بعيد (V3)" },
      { term: "Regular Verb", ur: "باقاعدہ فعل", sd: "باقاعده فعل" },
      { term: "Irregular Verb", ur: "نا باقاعدہ فعل", sd: "غير باقاعده فعل" },
      { term: "Tense", ur: "زمان", sd: "زمانو" },
    ],
  },
  {
    title: "Regular Verbs",
    subtitle: "How regular verbs form their V2 and V3",
    icon: "CheckCircle2",
    sections: [
      {
        heading: "What is a Regular Verb?",
        body: "Regular verbs form their V2 (Past Simple) and V3 (Past Participle) by adding <strong>-ed</strong> to the base form. Because the same rule applies to both forms, the V2 and V3 of a regular verb are always <strong>identical</strong> — for example, <em>work / worked / worked</em> and <em>play / played / played</em>. This is great news for students: once you know the base form and the spelling rule, you automatically know two more forms for free. Just be careful with the spelling rules below, because the last letters of the verb can change exactly how <em>-ed</em> is added.",
      },
      {
        heading: "Rules for Adding -ed",
        body: "There are four rules depending on how the verb ends. The reason for these rules is pronunciation — English avoids awkward consonant clusters by adding or changing letters. Read each rule carefully, because applying the wrong one (for example, writing <em>stoped</em> instead of <em>stopped</em>) is one of the most common spelling mistakes in beginner writing. The table below shows each rule with a clear example so you can match a new verb to the right rule at a glance.",
        table: {
          headers: ["Rule", "How", "V1", "V2 / V3"],
          rows: [
            ["Most verbs", "Add -ed", "work → worked", "accept → accepted"],
            ["Ends in -e", "Add -d only", "dance → danced", "arrive → arrived"],
            ["Consonant + y", "Change y → ied", "study → studied", "carry → carried"],
            ["CVC pattern", "Double + -ed", "stop → stopped", "plan → planned"],
          ],
        },
      },
      {
        heading: "Examples",
        body: "Common regular verbs and their forms are listed below. Notice that for every entry the V2 and V3 columns are exactly the same — that identical pair is the signature of a regular verb. Try covering the V2 and V3 columns with your hand and predicting them from V1; if your guess matches, you have understood the rules above. These six verbs cover all four spelling patterns, so they are excellent practice words for any beginner.",
        examples: [
          "accept → accepted → accepted (قبول کرنا)",
          "finish → finished → finished (مکمل کرنا)",
          "walk → walked → walked (چلنا)",
          "climb → climbed → climbed (چڑھنا)",
          "study → studied → studied (مطالعہ کرنا)",
          "stop → stopped → stopped (روکنا)",
        ],
        examplesTr: [
          {
            en: "accept → accepted → accepted",
            ur: "accept → accepted → accepted (قبول کرنا)",
            sd: "accept → accepted → accepted (قبول ڪرڻ)",
          },
          {
            en: "finish → finished → finished",
            ur: "finish → finished → finished (مکمل کرنا)",
            sd: "finish → finished → finished (مڪمل ڪرڻ)",
          },
          {
            en: "walk → walked → walked",
            ur: "walk → walked → walked (چلنا)",
            sd: "walk → walked → walked (هلڻ)",
          },
          {
            en: "climb → climbed → climbed",
            ur: "climb → climbed → climbed (چڑھنا)",
            sd: "climb → climbed → climbed (چڙهڻ)",
          },
          {
            en: "study → studied → studied",
            ur: "study → studied → studied (مطالعہ کرنا)",
            sd: "study → studied → studied (مطالعو ڪرڻ)",
          },
          {
            en: "stop → stopped → stopped",
            ur: "stop → stopped → stopped (روکنا)",
            sd: "stop → stopped → stopped (روڪڻ)",
          },
        ],
      },
    ],
    vocabulary: [
      { term: "Regular Verb", ur: "باقاعدہ فعل", sd: "باقاعده فعل" },
      { term: "Base Form (V1)", ur: "بنیادی شکل (V1)", sd: "بنيادي شڪل (V1)" },
      { term: "Past Simple (V2)", ur: "ماضی بسیط (V2)", sd: "ماضي ساده (V2)" },
      { term: "Past Participle (V3)", ur: "ماضی بعید (V3)", sd: "ماضي بعيد (V3)" },
      { term: "Suffix (-ed)", ur: "لاحقہ (-ed)", sd: "لاحقي (-ed)" },
      { term: "Consonant", ur: "حرفِ ساکن", sd: "ساکن اکر" },
      { term: "Vowel", ur: "حرفِ علت", sd: "سُر" },
      { term: "Doubling", ur: "دگنا کرنا", sd: "دوهري ڪرڻ" },
      { term: "Spelling", ur: "املا", sd: "املاء" },
      { term: "Rule", ur: "قاعدہ", sd: "قاعدو" },
    ],
  },
  {
    title: "Irregular Verbs",
    subtitle: "Verbs that do not follow the -ed pattern",
    icon: "Zap",
    sections: [
      {
        heading: "What is an Irregular Verb?",
        body: "Irregular verbs do <strong>not</strong> follow the -ed pattern. Their V2 (Past Simple) and V3 (Past Participle) forms change in unique ways and must be <strong>memorized</strong> one verb at a time. Some irregular verbs have the same V2 and V3 (like <em>build / built / built</em>); others have three different forms (like <em>go / went / gone</em>); and a few even keep the same form for all three (like <em>cut / cut / cut</em>). There is no shortcut — but these verbs are also the most common in everyday English, so learning them pays off immediately in your reading, writing, and speaking. A daily five-minute review of the table below is enough to master them within a few weeks.",
      },
      {
        heading: "Types of Irregular Verbs",
        body: "Irregular verbs fall into several patterns that you can see in the table below. Grouping them by pattern — instead of memorizing them at random — makes the task much easier, because your brain can remember one rule and then apply it to many verbs. Each row shows the pattern with one clear example, so you can see at a glance what \"all three different\" or \"V2 = V3\" actually looks like. If you can place a new irregular verb into one of these groups, you already know whether its V2 and V3 will be the same or different.",
        table: {
          headers: ["Pattern", "V1", "V2", "V3"],
          rows: [
            ["All three different", "go", "went", "gone"],
            ["V1 = V2 = V3", "cut", "cut", "cut"],
            ["V2 = V3", "build", "built", "built"],
            ["V1 = V3 (≠ V2)", "come", "came", "come"],
            ["With alternates", "burn", "burnt/burned", "burnt/burned"],
          ],
        },
      },
      {
        heading: "Common Irregular Verbs",
        body: "These are the most important irregular verbs to memorize. They appear again and again in everyday speech, story-books, and exams, so learning them well will make almost every English sentence easier to read and write. A good study tip is to learn five at a time, say each one out loud as <em>V1 → V2 → V3</em>, and only move to the next five once the first five feel automatic. The Urdu and Sindhi meanings alongside each verb will help you connect the English form to a word you already know from home.",
        examples: [
          "be → was/were → been (ہونا)",
          "go → went → gone (جانا)",
          "see → saw → seen (دیکھنا)",
          "take → took → taken (لینا)",
          "write → wrote → written (لکھنا)",
          "make → made → made (بنانا)",
          "do → did → done (کرنا)",
          "have → had → had (رکھنا)",
          "come → came → come (آنا)",
          "know → knew → known (جاننا)",
          "give → gave → given (دینا)",
          "find → found → found (تلاش کرنا)",
          "tell → told → told (بتانا)",
          "think → thought → thought (سوچنا)",
          "speak → spoke → spoken (بولنا)",
          "teach → taught → taught (پڑھانا)",
          "win → won → won (جیتنا)",
          "understand → understood → understood (سمجھنا)",
        ],
        examplesTr: [
          {
            en: "be → was/were → been",
            ur: "be → was/were → been (ہونا)",
            sd: "be → was/were → been (هجڻ)",
          },
          {
            en: "go → went → gone",
            ur: "go → went → gone (جانا)",
            sd: "go → went → gone (وڃڻ)",
          },
          {
            en: "see → saw → seen",
            ur: "see → saw → seen (دیکھنا)",
            sd: "see → saw → seen (ڏسڻ)",
          },
          {
            en: "take → took → taken",
            ur: "take → took → taken (لینا)",
            sd: "take → took → taken (وٺڻ)",
          },
          {
            en: "write → wrote → written",
            ur: "write → wrote → written (لکھنا)",
            sd: "write → wrote → written (لکڻ)",
          },
          {
            en: "make → made → made",
            ur: "make → made → made (بنانا)",
            sd: "make → made → made (بڻائڻ)",
          },
          {
            en: "do → did → done",
            ur: "do → did → done (کرنا)",
            sd: "do → did → done (ڪرڻ)",
          },
          {
            en: "have → had → had",
            ur: "have → had → had (رکھنا)",
            sd: "have → had → had (رکڻ)",
          },
          {
            en: "come → came → come",
            ur: "come → came → come (آنا)",
            sd: "come → came → come (اچڻ)",
          },
          {
            en: "know → knew → known",
            ur: "know → knew → known (جاننا)",
            sd: "know → knew → known (ڄاڻڻ)",
          },
          {
            en: "give → gave → given",
            ur: "give → gave → given (دینا)",
            sd: "give → gave → given (ڏيڻ)",
          },
          {
            en: "find → found → found",
            ur: "find → found → found (تلاش کرنا)",
            sd: "find → found → found (ڳولڻ)",
          },
          {
            en: "tell → told → told",
            ur: "tell → told → told (بتانا)",
            sd: "tell → told → told (ٻڌائڻ)",
          },
          {
            en: "think → thought → thought",
            ur: "think → thought → thought (سوچنا)",
            sd: "think → thought → thought (سوچڻ)",
          },
          {
            en: "speak → spoke → spoken",
            ur: "speak → spoke → spoken (بولنا)",
            sd: "speak → spoke → spoken (ڳالهائڻ)",
          },
          {
            en: "teach → taught → taught",
            ur: "teach → taught → taught (پڑھانا)",
            sd: "teach → taught → taught (پڙهائڻ)",
          },
          {
            en: "win → won → won",
            ur: "win → won → won (جیتنا)",
            sd: "win → won → won (جيتڻ)",
          },
          {
            en: "understand → understood → understood",
            ur: "understand → understood → understood (سمجھنا)",
            sd: "understand → understood → understood (سمجھڻ)",
          },
        ],
      },
    ],
    vocabulary: [
      { term: "Irregular Verb", ur: "نا باقاعدہ فعل", sd: "غير باقاعده فعل" },
      { term: "Base Form (V1)", ur: "بنیادی شکل (V1)", sd: "بنيادي شڪل (V1)" },
      { term: "Past Simple (V2)", ur: "ماضی بسیط (V2)", sd: "ماضي ساده (V2)" },
      { term: "Past Participle (V3)", ur: "ماضی بعید (V3)", sd: "ماضي بعيد (V3)" },
      { term: "Memorize", ur: "یاد کرنا", sd: "ياد ڪرڻ" },
      { term: "Pattern", ur: "نمونہ", sd: "نمونو" },
      { term: "Same V2 and V3", ur: "V2 اور V3 ایک جیسے", sd: "V2 ۽ V3 هڪجهڙا" },
      { term: "Three Different Forms", ur: "تین مختلف شکلیں", sd: "ٽي مختلف شڪلون" },
      { term: "Alternate Form", ur: "متبادل شکل", sd: "متبادل شڪل" },
      { term: "Verb Form", ur: "فعل کی شکل", sd: "فعل جي شڪل" },
    ],
  },
  {
    title: "Singular and Plural Nouns",
    subtitle: "How to change singular nouns to plural",
    icon: "Layers",
    sections: [
      {
        heading: "What are Singular and Plural Nouns?",
        body: "A <strong>singular noun</strong> refers to one person, place, or thing (e.g., <em>cat</em>, <em>book</em>, <em>city</em>). A <strong>plural noun</strong> refers to more than one (e.g., <em>cats</em>, <em>books</em>, <em>cities</em>). Knowing how to switch between singular and plural is essential, because English sentences must agree in number — <em>one cat sleeps</em> but <em>two cats sleep</em>. There are several rules for forming plurals in English, and most of them depend on the last letter or letters of the singular noun. The rest of this lesson walks through each rule with examples so you can apply them confidently in your own writing.",
      },
      {
        heading: "Regular Plurals (-s)",
        body: "Most nouns simply add <strong>-s</strong> to form the plural. This is the most common plural rule in English and the one you will use every day. If a noun does not fit one of the special rules below, adding <em>-s</em> is almost always correct. Notice that the spelling of the word does not change in any other way — only the <em>-s</em> is added at the end, so the singular and plural look almost the same.",
        examples: [
          "cat → cats",
          "dog → dogs",
          "book → books",
          "car → cars",
          "tree → trees",
        ],
        examplesTr: [
          {
            en: "cat → cats",
            ur: "cat → cats (بلی)",
            sd: "cat → cats (ٻلي)",
          },
          {
            en: "dog → dogs",
            ur: "dog → dogs (کتا)",
            sd: "dog → dogs (ڪتو)",
          },
          {
            en: "book → books",
            ur: "book → books (کتاب)",
            sd: "book → books (ڪتاب)",
          },
          {
            en: "car → cars",
            ur: "car → cars (گاڑی)",
            sd: "car → cars (گاڏي)",
          },
          {
            en: "tree → trees",
            ur: "tree → trees (درخت)",
            sd: "tree → trees (وڻ)",
          },
        ],
      },
      {
        heading: "Ending in -s, -ss, -sh, -ch, -x, -z (-es)",
        body: "Nouns ending in these hissing or buzzing sounds add <strong>-es</strong> instead of just <em>-s</em>. The reason is pronunciation: adding only <em>-s</em> to words like <em>bus</em> or <em>watch</em> would create an awkward cluster that is hard to say clearly. The <em>-es</em> adds a short vowel sound that makes the plural easy to pronounce. A useful trick is to listen — if the singular ends in a sound like <em>ss</em>, <em>sh</em>, <em>ch</em>, <em>x</em>, or <em>z</em>, you almost always need <em>-es</em>.",
        examples: [
          "bus → buses",
          "glass → glasses",
          "brush → brushes",
          "watch → watches",
          "box → boxes",
          "quiz → quizzes",
        ],
        examplesTr: [
          {
            en: "bus → buses",
            ur: "bus → buses (بس)",
            sd: "bus → buses (بس)",
          },
          {
            en: "glass → glasses",
            ur: "glass → glasses (گلاس)",
            sd: "glass → glasses (گلاس)",
          },
          {
            en: "brush → brushes",
            ur: "brush → brushes (برش)",
            sd: "brush → brushes (برش)",
          },
          {
            en: "watch → watches",
            ur: "watch → watches (گھڑی)",
            sd: "watch → watches (گهڙي)",
          },
          {
            en: "box → boxes",
            ur: "box → boxes (ڈبہ)",
            sd: "box → boxes (ڊٻو)",
          },
          {
            en: "quiz → quizzes",
            ur: "quiz → quizzes (مختصر امتحان)",
            sd: "quiz → quizzes (مختصر امتحان)",
          },
        ],
      },
      {
        heading: "Consonant + y (-ies)",
        body: "If a noun ends in a <strong>consonant + y</strong>, change <strong>y → ies</strong> to form the plural. The <em>y</em> turns into <em>ie</em> because English prefers not to leave a <em>y</em> directly before a plural <em>-s</em> in this position. This rule is the source of many common spelling mistakes, so it is worth practising until it feels automatic. Remember the simple test: if there is a consonant right before the <em>y</em>, the <em>y</em> must change to <em>ies</em>.",
        examples: [
          "baby → babies",
          "city → cities",
          "country → countries",
          "party → parties",
          "family → families",
          "story → stories",
        ],
        examplesTr: [
          {
            en: "baby → babies",
            ur: "baby → babies (بچہ)",
            sd: "baby → babies (ٻار)",
          },
          {
            en: "city → cities",
            ur: "city → cities (شہر)",
            sd: "city → cities (شهر)",
          },
          {
            en: "country → countries",
            ur: "country → countries (ملک)",
            sd: "country → countries (ملڪ)",
          },
          {
            en: "party → parties",
            ur: "party → parties (پارٹی)",
            sd: "party → parties (پارٽي)",
          },
          {
            en: "family → families",
            ur: "family → families (خاندان)",
            sd: "family → families (خاندان)",
          },
          {
            en: "story → stories",
            ur: "story → stories (کہانی)",
            sd: "story → stories (آکاڻي)",
          },
        ],
      },
      {
        heading: "Vowel + y (-s)",
        body: "If a noun ends in a <strong>vowel + y</strong>, just add <strong>-s</strong> — the <em>y</em> does <em>not</em> change. This is the mirror image of the previous rule, and the vowel in front of the <em>y</em> is what tells you which rule to apply. A quick way to remember is: <em>consonant + y</em> becomes <em>ies</em>, but <em>vowel + y</em> simply gets an extra <em>s</em>. Compare <em>city → cities</em> (consonant + y) with <em>boy → boys</em> (vowel + y) to see the difference side by side.",
        examples: [
          "boy → boys",
          "key → keys",
          "toy → toys",
          "day → days",
          "monkey → monkeys",
        ],
        examplesTr: [
          {
            en: "boy → boys",
            ur: "boy → boys (لڑکا)",
            sd: "boy → boys (ڇوڪرو)",
          },
          {
            en: "key → keys",
            ur: "key → keys (چابی)",
            sd: "key → keys (چاٻي)",
          },
          {
            en: "toy → toys",
            ur: "toy → toys (کھلونا)",
            sd: "toy → toys (کھڏاڻو)",
          },
          {
            en: "day → days",
            ur: "day → days (دن)",
            sd: "day → days (ڏينهن)",
          },
          {
            en: "monkey → monkeys",
            ur: "monkey → monkeys (بندر)",
            sd: "monkey → monkeys (ٻنڊڙو)",
          },
        ],
      },
      {
        heading: "Ending in -f / -fe (-ves)",
        body: "Nouns ending in <strong>-f</strong> or <strong>-fe</strong> change to <strong>-ves</strong> in the plural. The <em>f</em> softens into a <em>v</em> sound, which is why the spelling also changes. There are a few exceptions that simply add <em>-s</em> (like <em>roof → roofs</em> and <em>chief → chiefs</em>), so when in doubt it is wise to check a dictionary. For grade-school writing, the eight examples below are the most common ones you will meet in stories and textbooks.",
        examples: [
          "leaf → leaves",
          "wolf → wolves",
          "life → lives",
          "knife → knives",
          "wife → wives",
          "half → halves",
          "thief → thieves",
          "loaf → loaves",
        ],
        examplesTr: [
          {
            en: "leaf → leaves",
            ur: "leaf → leaves (پتہ)",
            sd: "leaf → leaves (پن)",
          },
          {
            en: "wolf → wolves",
            ur: "wolf → wolves (بھیڑیا)",
            sd: "wolf → wolves (ڀوليو)",
          },
          {
            en: "life → lives",
            ur: "life → lives (زندگی)",
            sd: "life → lives (زندگی)",
          },
          {
            en: "knife → knives",
            ur: "knife → knives (چاقو)",
            sd: "knife → knives (ڇري)",
          },
          {
            en: "wife → wives",
            ur: "wife → wives (بیوی)",
            sd: "wife → wives (گهرواري)",
          },
          {
            en: "half → halves",
            ur: "half → halves (آدھا)",
            sd: "half → halves (اڌ)",
          },
          {
            en: "thief → thieves",
            ur: "thief → thieves (چور)",
            sd: "thief → thieves (چور)",
          },
          {
            en: "loaf → loaves",
            ur: "loaf → loaves (ڈبل روٹی)",
            sd: "loaf → loaves (ٻٽي روٽي)",
          },
        ],
      },
      {
        heading: "Ending in -o (-oes)",
        body: "Some nouns ending in <strong>-o</strong> add <strong>-oes</strong> to form the plural. This rule is the least consistent of all the plural rules, because some <em>-o</em> words take only <em>-s</em> (like <em>photo → photos</em> and <em>radio → radios</em>). A helpful guideline is that nouns related to people, animals, or natural objects often take <em>-oes</em>, while newer or borrowed words take <em>-s</em>. When a word is unfamiliar, checking the dictionary is always the safest choice.",
        examples: [
          "potato → potatoes",
          "tomato → tomatoes",
          "hero → heroes",
          "echo → echoes",
          "volcano → volcanoes",
          "mosquito → mosquitoes",
        ],
        examplesTr: [
          {
            en: "potato → potatoes",
            ur: "potato → potatoes (آلو)",
            sd: "potato → potatoes (ٻاٽاٽو)",
          },
          {
            en: "tomato → tomatoes",
            ur: "tomato → tomatoes (ٹماٹر)",
            sd: "tomato → tomatoes (ٽماٽو)",
          },
          {
            en: "hero → heroes",
            ur: "hero → heroes (ہیرو)",
            sd: "hero → heroes (هيرو)",
          },
          {
            en: "echo → echoes",
            ur: "echo → echoes (گونج)",
            sd: "echo → echoes (گونج)",
          },
          {
            en: "volcano → volcanoes",
            ur: "volcano → volcanoes (آتش فشاں)",
            sd: "volcano → volcanoes (آتش فشان)",
          },
          {
            en: "mosquito → mosquitoes",
            ur: "mosquito → mosquitoes (مچھر)",
            sd: "mosquito → mosquitoes (مڇو)",
          },
        ],
      },
      {
        heading: "Irregular Plurals",
        body: "Some nouns change completely in the plural instead of adding an ending. These are inherited from Old English and are very common, so they must be learned as whole words rather than as a rule. Notice that the inside of the word often changes — a vowel shift from <em>a</em> to <em>e</em> (man → men) or from <em>oo</em> to <em>ee</em> (tooth → teeth). Children learn these words very early in school, so they should feel familiar, but their spelling still needs careful practice.",
        table: {
          headers: ["Singular", "Plural"],
          rows: [
            ["child", "children"],
            ["man", "men"],
            ["woman", "women"],
            ["person", "people"],
            ["tooth", "teeth"],
            ["foot", "feet"],
            ["mouse", "mice"],
            ["goose", "geese"],
            ["ox", "oxen"],
          ],
        },
      },
      {
        heading: "Foreign / Irregular Plurals",
        body: "Some words borrowed from Latin, Greek, and other languages keep their foreign plural forms in English. These words usually belong to school subjects like science and maths, so students meet them in textbooks long before they meet them in everyday speech. The plural ending often tells you which language the word came from: <em>-i</em> for some Latin nouns (cactus → cacti) and <em>-a</em> for Greek neuter plurals (phenomenon → phenomena). They look strange at first, but with practice they become easy to recognise and use correctly.",
        table: {
          headers: ["Singular", "Plural"],
          rows: [
            ["cactus", "cacti"],
            ["nucleus", "nuclei"],
            ["syllabus", "syllabi"],
            ["focus", "foci"],
            ["fungus", "fungi"],
            ["datum", "data"],
            ["phenomenon", "phenomena"],
            ["criterion", "criteria"],
            ["analysis", "analyses"],
            ["crisis", "crises"],
            ["thesis", "theses"],
            ["diagnosis", "diagnoses"],
          ],
        },
      },
      {
        heading: "Unchanging Plurals",
        body: "Some nouns have the <strong>same</strong> singular and plural form. The word does not change at all — only the context (and the words around it, like <em>one</em> or <em>many</em>) tells you whether it is singular or plural. This is most common with animals (sheep, deer, fish) and with words that already describe a group (series, species, aircraft). When you write these words, the verb will tell the reader the number: <em>one sheep is</em> but <em>two sheep are</em>.",
        examples: [
          "sheep → sheep",
          "deer → deer",
          "fish → fish",
          "series → series",
          "species → species",
          "aircraft → aircraft",
        ],
        examplesTr: [
          {
            en: "sheep → sheep",
            ur: "sheep → sheep (بھیڑ)",
            sd: "sheep → sheep (رکڙ)",
          },
          {
            en: "deer → deer",
            ur: "deer → deer (ہرن)",
            sd: "deer → deer (هرڻ)",
          },
          {
            en: "fish → fish",
            ur: "fish → fish (مچھلی)",
            sd: "fish → fish (مڇي)",
          },
          {
            en: "series → series",
            ur: "series → series (سیریز)",
            sd: "series → series (سيريز)",
          },
          {
            en: "species → species",
            ur: "species → species (نسل)",
            sd: "species → species (نسل)",
          },
          {
            en: "aircraft → aircraft",
            ur: "aircraft → aircraft (ہوائی جہاز)",
            sd: "aircraft → aircraft (هوائي جهاز)",
          },
        ],
      },
    ],
    vocabulary: [
      { term: "Noun", ur: "اسم", sd: "اسم" },
      { term: "Singular", ur: "واحد", sd: "واحد" },
      { term: "Plural", ur: "جمع", sd: "جمع" },
      { term: "Regular Plural", ur: "باقاعدہ جمع", sd: "باقاعده جمع" },
      { term: "Irregular Plural", ur: "نا باقاعدہ جمع", sd: "غير باقاعده جمع" },
      { term: "Suffix (-s / -es)", ur: "لاحقہ (-s / -es)", sd: "لاحقي (-s / -es)" },
      { term: "Consonant", ur: "حرفِ ساکن", sd: "ساکن اکر" },
      { term: "Vowel", ur: "حرفِ علت", sd: "سُر" },
      { term: "Unchanging Plural", ur: "غیر تبدیل ہونے والی جمع", sd: "غير تبديل ٿيندڙ جمع" },
      { term: "Foreign Plural", ur: "غیر ملکی جمع", sd: "غير ملڪي جمع" },
    ],
  },
];

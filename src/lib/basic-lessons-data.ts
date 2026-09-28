/**
 * Basic-tier lessons — structured lesson content for Basic badge students.
 * Each lesson has a title, definition, examples, and related content.
 */

export type Lesson = {
  title: string;
  subtitle: string;
  icon: string; // lucide icon name
  sections: LessonSection[];
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
        body: "A verb is a word that shows an action, a state, or an occurrence. In English, every verb has three main forms: <strong>V1 (Base Form)</strong>, <strong>V2 (Past Simple)</strong>, and <strong>V3 (Past Participle)</strong>. These three forms are the foundation of all English tenses.",
      },
      {
        heading: "The Three Forms",
        body: "Every English verb can be expressed in three forms. Regular verbs follow a pattern; irregular verbs must be memorized.",
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
        body: "See how the three forms are used in real sentences:",
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
  },
  {
    title: "Regular Verbs",
    subtitle: "How regular verbs form their V2 and V3",
    icon: "CheckCircle2",
    sections: [
      {
        heading: "What is a Regular Verb?",
        body: "Regular verbs form their V2 (Past Simple) and V3 (Past Participle) by adding <strong>-ed</strong> to the base form. The V2 and V3 forms are always the <strong>same</strong> for regular verbs.",
      },
      {
        heading: "Rules for Adding -ed",
        body: "There are four rules depending on how the verb ends:",
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
        body: "Common regular verbs and their forms:",
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
  },
  {
    title: "Irregular Verbs",
    subtitle: "Verbs that do not follow the -ed pattern",
    icon: "Zap",
    sections: [
      {
        heading: "What is an Irregular Verb?",
        body: "Irregular verbs do <strong>not</strong> follow the -ed pattern. Their V2 (Past Simple) and V3 (Past Participle) forms change in unique ways and must be <strong>memorized</strong>. Some irregular verbs have the same V2 and V3; others have three different forms.",
      },
      {
        heading: "Types of Irregular Verbs",
        body: "Irregular verbs fall into several patterns:",
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
        body: "These are the most important irregular verbs to memorize:",
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
  },
  {
    title: "Singular and Plural Nouns",
    subtitle: "How to change singular nouns to plural",
    icon: "Layers",
    sections: [
      {
        heading: "What are Singular and Plural Nouns?",
        body: "A <strong>singular noun</strong> refers to one person, place, or thing (e.g., <em>cat</em>, <em>book</em>, <em>city</em>). A <strong>plural noun</strong> refers to more than one (e.g., <em>cats</em>, <em>books</em>, <em>cities</em>). There are several rules for forming plurals in English.",
      },
      {
        heading: "Regular Plurals (-s)",
        body: "Most nouns simply add <strong>-s</strong> to form the plural:",
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
        body: "Nouns ending in these sounds add <strong>-es</strong>:",
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
        body: "If a noun ends in a <strong>consonant + y</strong>, change <strong>y → ies</strong>:",
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
        body: "If a noun ends in a <strong>vowel + y</strong>, just add <strong>-s</strong>:",
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
        body: "Nouns ending in <strong>-f</strong> or <strong>-fe</strong> change to <strong>-ves</strong>:",
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
        body: "Some nouns ending in <strong>-o</strong> add <strong>-oes</strong>:",
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
        body: "Some nouns change completely in the plural:",
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
        body: "Some words from other languages keep their foreign plural forms:",
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
        body: "Some nouns have the <strong>same</strong> singular and plural form:",
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
  },
];

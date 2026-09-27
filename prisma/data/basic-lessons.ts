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
      },
    ],
  },
];

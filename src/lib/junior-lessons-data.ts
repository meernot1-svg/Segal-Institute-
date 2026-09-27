/**
 * Junior-tier lessons — English grammar workbook for Junior badge students.
 * Covers tenses, articles, prepositions, active/passive voice, modal verbs,
 * conditionals, and more advanced grammar topics.
 */

import type { Lesson, LessonSection } from "./basic-lessons-data";

export const JUNIOR_LESSONS: Lesson[] = [
  {
    title: "English Tenses — Overview",
    subtitle: "The 12 tenses of English and when to use them",
    icon: "Clock",
    sections: [
      {
        heading: "What are Tenses?",
        body: "Tenses show <strong>when</strong> an action happens — in the past, present, or future. Each tense has four forms: simple, continuous (progressive), perfect, and perfect continuous. Together, these make 12 tenses.",
      },
      {
        heading: "The 12 Tenses",
        body: "Here's a complete table of all 12 English tenses using the verb 'go':",
        table: {
          headers: ["Tense", "Form", "Example (go)"],
          rows: [
            ["Present Simple", "V1 / V1+s", "I go / She goes"],
            ["Present Continuous", "am/is/are + V-ing", "I am going"],
            ["Present Perfect", "have/has + V3", "I have gone"],
            ["Present Perfect Cont.", "have/has been + V-ing", "I have been going"],
            ["Past Simple", "V2", "I went"],
            ["Past Continuous", "was/were + V-ing", "I was going"],
            ["Past Perfect", "had + V3", "I had gone"],
            ["Past Perfect Cont.", "had been + V-ing", "I had been going"],
            ["Future Simple", "will + V1", "I will go"],
            ["Future Continuous", "will be + V-ing", "I will be going"],
            ["Future Perfect", "will have + V3", "I will have gone"],
            ["Future Perfect Cont.", "will have been + V-ing", "I will have been going"],
          ],
        },
      },
      {
        heading: "Key Rule",
        body: "The <strong>third person singular</strong> (he/she/it) adds <strong>-s</strong> or <strong>-es</strong> to V1 in the present simple tense. Example: <em>I go</em> but <em>She goes</em>.",
        examples: [
          "I work → He works",
          "I go → She goes",
          "I watch → It watches",
          "I study → He studies",
        ],
      },
    ],
  },
  {
    title: "Present Tenses",
    subtitle: "Simple, Continuous, Perfect, and Perfect Continuous",
    icon: "Clock",
    sections: [
      {
        heading: "Present Simple",
        body: "Used for habits, routines, general truths, and permanent situations.",
        examples: [
          "I <strong>play</strong> cricket every Sunday. (habit)",
          "Water <strong>boils</strong> at 100°C. (general truth)",
          "She <strong>lives</strong> in Jacobabad. (permanent)",
        ],
      },
      {
        heading: "Present Continuous",
        body: "Used for actions happening <strong>now</strong> or around now. Form: <em>am/is/are + verb-ing</em>.",
        examples: [
          "I <strong>am studying</strong> English right now.",
          "She <strong>is reading</strong> a book.",
          "They <strong>are playing</strong> outside.",
        ],
      },
      {
        heading: "Present Perfect",
        body: "Used for past actions with a connection to the present, or experiences. Form: <em>have/has + V3</em>.",
        examples: [
          "I <strong>have finished</strong> my homework. (just completed)",
          "She <strong>has visited</strong> Karachi twice. (experience)",
          "They <strong>have lived</strong> here for 5 years. (duration)",
        ],
      },
      {
        heading: "Present Perfect Continuous",
        body: "Used for actions that started in the past and are still continuing. Form: <em>have/has been + verb-ing</em>.",
        examples: [
          "I <strong>have been learning</strong> English for two years.",
          "She <strong>has been working</strong> all day.",
          "It <strong>has been raining</strong> since morning.",
        ],
      },
    ],
  },
  {
    title: "Past Tenses",
    subtitle: "Simple Past, Past Continuous, Past Perfect, Past Perfect Continuous",
    icon: "Clock",
    sections: [
      {
        heading: "Past Simple",
        body: "Used for completed actions in the past. Form: <em>V2</em>.",
        examples: [
          "I <strong>went</strong> to school yesterday.",
          "She <strong>ate</strong> dinner at 8 PM.",
          "They <strong>played</strong> cricket last Sunday.",
        ],
      },
      {
        heading: "Past Continuous",
        body: "Used for actions that were in progress at a specific time in the past. Form: <em>was/were + verb-ing</em>.",
        examples: [
          "I <strong>was studying</strong> when she called.",
          "They <strong>were playing</strong> cricket at 5 PM.",
          "She <strong>was cooking</strong> when the lights went out.",
        ],
      },
      {
        heading: "Past Perfect",
        body: "Used for an action that happened <strong>before</strong> another action in the past. Form: <em>had + V3</em>.",
        examples: [
          "I <strong>had eaten</strong> dinner before she arrived.",
          "They <strong>had finished</strong> the test when the bell rang.",
          "She <strong>had left</strong> before I reached home.",
        ],
      },
      {
        heading: "Past Perfect Continuous",
        body: "Used for an ongoing action that was happening before another past action. Form: <em>had been + verb-ing</em>.",
        examples: [
          "I <strong>had been waiting</strong> for an hour when the bus came.",
          "She <strong>had been teaching</strong> for 10 years before she retired.",
        ],
      },
    ],
  },
  {
    title: "Future Tenses",
    subtitle: "Simple Future, Future Continuous, Future Perfect, Future Perfect Continuous",
    icon: "Clock",
    sections: [
      {
        heading: "Future Simple",
        body: "Used for predictions, promises, and spontaneous decisions. Form: <em>will + V1</em>.",
        examples: [
          "I <strong>will help</strong> you tomorrow. (promise)",
          "It <strong>will rain</strong> today. (prediction)",
          "OK, I <strong>will get</strong> the door. (spontaneous)",
        ],
      },
      {
        heading: "Future Continuous",
        body: "Used for actions that will be in progress at a specific time in the future. Form: <em>will be + verb-ing</em>.",
        examples: [
          "This time tomorrow, I <strong>will be flying</strong> to Karachi.",
          "At 8 PM, she <strong>will be studying</strong>.",
        ],
      },
      {
        heading: "Future Perfect",
        body: "Used for actions that will be completed before a specific future time. Form: <em>will have + V3</em>.",
        examples: [
          "By next year, I <strong>will have graduated</strong>.",
          "She <strong>will have finished</strong> her homework by 10 PM.",
        ],
      },
      {
        heading: "Future Perfect Continuous",
        body: "Used for ongoing actions that will continue until a future point. Form: <em>will have been + verb-ing</em>.",
        examples: [
          "By 2027, I <strong>will have been teaching</strong> for 20 years.",
          "She <strong>will have been working</strong> for 8 hours by closing time.",
        ],
      },
    ],
  },
  {
    title: "Articles (a, an, the)",
    subtitle: "When to use a, an, the — or no article",
    icon: "Type",
    sections: [
      {
        heading: "Indefinite Articles: a / an",
        body: "Use <strong>'a'</strong> before words starting with a consonant sound, and <strong>'an'</strong> before words starting with a vowel sound (a, e, i, o, u).",
        examples: [
          "a book, a car, a university (consonant sound 'yoo')",
          "an apple, an egg, an hour (silent 'h' = vowel sound)",
          "a pen, an orange, a boy, an umbrella",
        ],
      },
      {
        heading: "Definite Article: the",
        body: "Use <strong>'the'</strong> for specific or known things, unique objects, or when referring to something already mentioned.",
        examples: [
          "The sun rises in the east. (unique)",
          "I saw a dog. The dog was barking. (mentioned before)",
          "The student who scored highest won the prize. (specific)",
        ],
      },
      {
        heading: "No Article",
        body: "Don't use an article with: proper nouns, plural general statements, uncountable nouns (in general sense), meals, languages, and sports.",
        examples: [
          "Karachi is a big city. (not: The Karachi)",
          "Dogs are loyal. (not: The dogs — general)",
          "I love mathematics. (not: the mathematics)",
          "Breakfast is ready. (not: The breakfast)",
        ],
      },
    ],
  },
  {
    title: "Prepositions",
    subtitle: "In, on, at, by, for, of, to, with, from — and their uses",
    icon: "MapPin",
    sections: [
      {
        heading: "Prepositions of Time",
        body: "<strong>at</strong> (specific time), <strong>on</strong> (days/dates), <strong>in</strong> (months/years/seasons).",
        table: {
          headers: ["Preposition", "Use", "Examples"],
          rows: [
            ["at", "exact time", "at 5 PM, at noon, at night"],
            ["on", "days/dates", "on Monday, on July 4th, on my birthday"],
            ["in", "months/years/seasons", "in January, in 2026, in summer"],
            ["by", "deadline", "by Friday, by 5 PM, by next week"],
            ["since", "starting point", "since 2020, since morning"],
            ["for", "duration", "for 2 hours, for 5 years"],
          ],
        },
      },
      {
        heading: "Prepositions of Place",
        body: "<strong>at</strong> (specific point), <strong>on</strong> (surface), <strong>in</strong> (enclosed space).",
        table: {
          headers: ["Preposition", "Use", "Examples"],
          rows: [
            ["at", "specific point", "at the door, at school, at the bus stop"],
            ["on", "surface", "on the table, on the wall, on the second floor"],
            ["in", "enclosed space", "in the room, in the box, in Pakistan"],
            ["between", "two things", "between you and me"],
            ["among", "many things", "among the students"],
            ["above/below", "position", "above the door, below the window"],
          ],
        },
      },
      {
        heading: "Common Preposition Mistakes",
        body: "Watch out for these common errors:",
        examples: [
          "✅ I am <strong>good at</strong> math. (not: good in)",
          "✅ She is <strong>afraid of</strong> dogs. (not: afraid from)",
          "✅ He <strong>depends on</strong> his father. (not: depends of)",
          "✅ I <strong>agree with</strong> you. (not: agree to — usually)",
        ],
      },
    ],
  },
  {
    title: "Active and Passive Voice",
    subtitle: "How to convert active sentences to passive",
    icon: "Repeat",
    sections: [
      {
        heading: "What is Voice?",
        body: "<strong>Active voice</strong>: the subject does the action. <strong>Passive voice</strong>: the subject receives the action.",
        examples: [
          "Active: <strong>She</strong> wrote a letter. (subject does action)",
          "Passive: A letter <strong>was written</strong> by her. (subject receives action)",
        ],
      },
      {
        heading: "How to Convert Active to Passive",
        body: "Steps: (1) Move the object to the subject position. (2) Use the correct form of 'to be' + V3. (3) Add 'by' + the original subject.",
        table: {
          headers: ["Tense", "Active", "Passive"],
          rows: [
            ["Present Simple", "She writes a letter", "A letter is written by her"],
            ["Past Simple", "She wrote a letter", "A letter was written by her"],
            ["Present Perfect", "She has written a letter", "A letter has been written by her"],
            ["Future Simple", "She will write a letter", "A letter will be written by her"],
            ["Present Continuous", "She is writing a letter", "A letter is being written by her"],
          ],
        },
      },
      {
        heading: "When to Use Passive Voice",
        body: "Use passive voice when: the doer is unknown, unimportant, or obvious.",
        examples: [
          "The classroom was cleaned. (who cleaned it is not important)",
          "English is spoken here. (by everyone — obvious)",
          "The thief was caught. (by police — obvious)",
        ],
      },
    ],
  },
  {
    title: "Modal Verbs",
    subtitle: "Can, could, may, might, must, should, would, shall, will",
    icon: "Settings",
    sections: [
      {
        heading: "What are Modal Verbs?",
        body: "Modal verbs express ability, permission, possibility, necessity, advice, or obligation. They are always followed by <strong>V1</strong> (base form).",
      },
      {
        heading: "Common Modals and Their Uses",
        table: {
          headers: ["Modal", "Use", "Example"],
          rows: [
            ["can", "ability / permission", "I can swim. / Can I go?"],
            ["could", "past ability / polite request", "I could run fast. / Could you help?"],
            ["may", "permission / possibility", "May I come in? / It may rain."],
            ["might", "possibility (less sure)", "It might snow today."],
            ["must", "necessity / strong obligation", "You must wear a uniform."],
            ["should", "advice / recommendation", "You should study harder."],
            ["would", "polite request / hypothetical", "Would you like tea? / I would travel."],
            ["shall", "suggestion / future", "Shall we go? / I shall return."],
            ["will", "future / willingness", "I will help you."],
          ],
        },
      },
      {
        heading: "Key Rules",
        body: "Modals never take -s (no 'cans', no 'musts'). After a modal, always use V1 (no 'to', no -ing, no -ed).",
        examples: [
          "✅ She <strong>can swim</strong>. (not: can swims / can to swim)",
          "✅ You <strong>must go</strong>. (not: must goes / must to go)",
          "✅ He <strong>should study</strong>. (not: should studies)",
        ],
      },
    ],
  },
  {
    title: "Conditionals (If clauses)",
    subtitle: "Zero, First, Second, and Third conditionals",
    icon: "GitBranch",
    sections: [
      {
        heading: "What are Conditionals?",
        body: "Conditionals express what happens <strong>if</strong> a certain condition is met. There are four types.",
      },
      {
        heading: "The Four Conditionals",
        table: {
          headers: ["Type", "Structure", "Example", "Use"],
          rows: [
            ["Zero", "If + present, present", "If you heat ice, it melts.", "Scientific facts"],
            ["First", "If + present, will + V1", "If it rains, I will stay home.", "Real future possibility"],
            ["Second", "If + past, would + V1", "If I had money, I would travel.", "Unreal present"],
            ["Third", "If + past perfect, would have + V3", "If I had studied, I would have passed.", "Unreal past regret"],
          ],
        },
      },
      {
        heading: "Examples in Context",
        body: "See how each conditional works in real sentences:",
        examples: [
          "Zero: If water reaches 100°C, it <strong>boils</strong>.",
          "First: If you <strong>study</strong> hard, you <strong>will pass</strong> the exam.",
          "Second: If I <strong>were</strong> you, I <strong>would apologize</strong>.",
          "Third: If she <strong>had left</strong> earlier, she <strong>would have caught</strong> the train.",
        ],
      },
    ],
  },
  {
    title: "Direct and Indirect Speech",
    subtitle: "How to report what someone said",
    icon: "MessageSquare",
    sections: [
      {
        heading: "Direct Speech",
        body: "Quoting the exact words spoken, inside quotation marks.",
        examples: [
          "She said, <strong>'I am tired.'</strong>",
          "He said, <strong>'I will come tomorrow.'</strong>",
        ],
      },
      {
        heading: "Indirect (Reported) Speech",
        body: "Reporting what someone said without exact quotes. Tenses change (backshift).",
        examples: [
          "She said that she <strong>was</strong> tired. (am → was)",
          "He said that he <strong>would</strong> come the next day. (will → would)",
        ],
      },
      {
        heading: "Tense Changes in Reported Speech",
        table: {
          headers: ["Direct Speech", "Indirect Speech", "Change"],
          rows: [
            ["present simple → 'I go'", "past simple → she went", "V1 → V2"],
            ["present cont. → 'I am going'", "past cont. → she was going", "am/is going → was/was going"],
            ["past simple → 'I went'", "past perfect → she had gone", "V2 → had + V3"],
            ["will → 'I will go'", "would → she would go", "will → would"],
            ["can → 'I can go'", "could → she could go", "can → could"],
            ["must → 'I must go'", "had to → she had to go", "must → had to"],
          ],
        },
      },
      {
        heading: "Time and Place Changes",
        body: "Words that refer to time and place also change in reported speech:",
        examples: [
          "now → then",
          "today → that day",
          "tomorrow → the next day",
          "yesterday → the day before / the previous day",
          "here → there",
          "this → that",
        ],
      },
    ],
  },
  {
    title: "Degrees of Comparison",
    subtitle: "Positive, Comparative, and Superlative forms of adjectives",
    icon: "BarChart3",
    sections: [
      {
        heading: "Three Degrees",
        body: "Adjectives have three degrees: <strong>Positive</strong> (base), <strong>Comparative</strong> (comparing two), and <strong>Superlative</strong> (comparing three or more).",
        table: {
          headers: ["Positive", "Comparative", "Superlative", "Rule"],
          rows: [
            ["tall", "taller", "tallest", "Short: +er / +est"],
            ["big", "bigger", "biggest", "Double consonant +er/+est"],
            ["happy", "happier", "happiest", "y → ier / iest"],
            ["beautiful", "more beautiful", "most beautiful", "Long: more/most + adj"],
            ["good", "better", "best", "Irregular"],
            ["bad", "worse", "worst", "Irregular"],
            ["little", "less", "least", "Irregular"],
            ["many/much", "more", "most", "Irregular"],
          ],
        },
      },
      {
        heading: "Examples",
        body: "See how comparisons work in sentences:",
        examples: [
          "Ali is <strong>tall</strong>. (positive)",
          "Ali is <strong>taller than</strong> Bilal. (comparative)",
          "Ali is <strong>the tallest</strong> in the class. (superlative)",
          "This book is <strong>more interesting than</strong> that one. (long adjective)",
          "She is <strong>the most intelligent</strong> student. (long adjective)",
        ],
      },
    ],
  },
  {
    title: "Parts of Speech",
    subtitle: "Noun, pronoun, verb, adjective, adverb, preposition, conjunction, interjection",
    icon: "List",
    sections: [
      {
        heading: "The 8 Parts of Speech",
        body: "Every word in English belongs to one of eight categories:",
        table: {
          headers: ["Part", "Function", "Example"],
          rows: [
            ["Noun", "Names a person, place, thing", "teacher, school, book"],
            ["Pronoun", "Replaces a noun", "he, she, it, they, we"],
            ["Verb", "Shows action or state", "run, is, became, have"],
            ["Adjective", "Describes a noun", "big, red, beautiful, five"],
            ["Adverb", "Describes a verb/adjective", "quickly, very, well, yesterday"],
            ["Preposition", "Shows relationship", "in, on, at, by, with"],
            ["Conjunction", "Joins words/clauses", "and, but, or, because, if"],
            ["Interjection", "Expresses emotion", "Oh! Wow! Alas! Hurrah!"],
          ],
        },
      },
      {
        heading: "Examples in a Sentence",
        body: "Identify the parts of speech in this sentence: <em>'The quickly running boy crossed the busy street.'</em>",
        examples: [
          "<strong>The</strong> → article (type of adjective)",
          "<strong>quickly</strong> → adverb (describes 'running')",
          "<strong>running</strong> → verb (present participle)",
          "<strong>boy</strong> → noun (subject)",
          "<strong>crossed</strong> → verb (past simple)",
          "<strong>the</strong> → article",
          "<strong>busy</strong> → adjective (describes 'street')",
          "<strong>street</strong> → noun (object)",
        ],
      },
    ],
  },
];

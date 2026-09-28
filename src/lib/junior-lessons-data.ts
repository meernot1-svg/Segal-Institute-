/**
 * Junior-tier lessons — extracted from "Junior English Grammar COMPLETE Workbook" PDF.
 * 16 lessons covering: 12 Tenses + To Be Verbs + Have/Has/Had + Have To/Has To/Had To
 * + Demonstrative Adjectives.
 * Each lesson follows the workbook's pattern: Use → Nishaniyan → Formation → Examples
 * → Four Forms → Common Mistakes.
 *
 * Every lesson also carries a `vocabulary` array of the 5-12 key English terms it
 * introduces, each with parallel Urdu (نستعلیق) and Sindhi (Sindhi-Arabic) meanings.
 * The section `body` strings have been expanded to 3-5 sentences with definitions,
 * everyday examples, and common-mistake notes so grade-school students get fuller
 * explanations alongside the examples and tables.
 */

import type { Lesson } from "./basic-lessons-data";

export const JUNIOR_LESSONS: Lesson[] = [
  // === PART A: 12 TENSES ===
  {
    title: "1. Present Simple",
    subtitle: "Habits, routines, facts and general truths",
    icon: "Clock",
    vocabulary: [
      { term: "Present Simple", ur: "موجودہ معروف", sd: "موجوده معروف" },
      { term: "habit", ur: "عادت", sd: "عادت" },
      { term: "routine", ur: "معمول", sd: "معمول" },
      { term: "fact", ur: "حقیقت", sd: "حقيقت" },
      { term: "general truth", ur: "عام حقیقت", sd: "عام سچائي" },
      { term: "subject", ur: "فاعل", sd: "فاعل" },
      { term: "verb", ur: "فعل", sd: "فعل" },
      { term: "third person singular", ur: "تیسری شخص واحد", sd: "ٽين شخص واحد" },
      { term: "base form (V1)", ur: "بنیادی صورت (V1)", sd: "بنيادي صورت (V1)" },
      { term: "frequency adverb", ur: "تکرار کا قید", sd: "تعدد جو قيد" },
      { term: "s/es ending", ur: "s/es کا اضافہ", sd: "s/es جو اضافو" },
    ],
    sections: [
      { heading: "Use", body: "Habits, routines, repeated actions, facts and general truths. We use Present Simple for things that happen regularly or that are always true, such as daily activities, scientific facts, and personal habits. It is one of the first tenses every English learner studies because it appears in almost every sentence of daily conversation. For example, 'I drink tea every morning' and 'Water boils at 100 degrees' are both Present Simple. Notice that the action need not be happening right now — it is a pattern, not a single event." },
      { heading: "Nishaniyan (Identifying Signs)", body: "These time words are the nishaniyan (signs) of Present Simple: every day, usually, always, often, sometimes, generally, daily. They tell us the action happens regularly or repeatedly. If you spot one of them, Present Simple is usually the correct choice. Many students forget to add -s with he/she/it after these words — that is the most common mistake to watch for." },
      { heading: "Formation", body: "<strong>Subject + V1(s/es) + Object</strong><br>Third person singular (he/she/it) adds -s or -es. The base form (V1) is used for I, we, you and they, while he/she/it takes -s or -es at the end. For example: 'I play', 'She plays'; 'They go', 'He goes'." },
      {
        heading: "Solved Examples",
        body: "English sentences with Urdu and Sindhi meanings:",
        examples: [
          "I go to school every day. (میں روزانہ سکول جاتا ہوں / مان روزانو سڪول وڃان ٿو)",
          "She reads a book every night. (وہ ہر رات ایک کتاب پڑھتی ہے / هوءَ هر رات ڪتاب پڙهي ٿي)",
          "They play cricket after school. (وہ سکول کے بعد کرکٹ کھیلتے ہیں / هو سڪول کانپوءِ ڪرڪيٽ کائيندا آهن)",
          "He helps his mother. (وہ اپنی ماں کی مدد کرتا ہے / هوءَ پنهنجي ماءُ جي مدد ڪندو آهي)",
          "The sun rises in the east. (سورج مشرق میں نکلتا ہے / سج اڀرندي پاسي اڀرندو آهي)",
        ],
        examplesTr: [
          {
            en: "I go to school every day.",
            ur: "میں روزانہ سکول جاتا ہوں۔",
            sd: "مان روزانو سڪول وڃان ٿو.",
          },
          {
            en: "She reads a book every night.",
            ur: "وہ ہر رات ایک کتاب پڑھتی ہے۔",
            sd: "هوءَ هر رات ڪتاب پڙهي ٿي.",
          },
          {
            en: "They play cricket after school.",
            ur: "وہ سکول کے بعد کرکٹ کھیلتے ہیں۔",
            sd: "هو سڪول کانپوءِ ڪرڪيٽ کائيندا آهن.",
          },
          {
            en: "He helps his mother.",
            ur: "وہ اپنی ماں کی مدد کرتا ہے۔",
            sd: "هوءَ پنهنجي ماءُ جي مدد ڪندو آهي.",
          },
          {
            en: "The sun rises in the east.",
            ur: "سورج مشرق میں نکلتا ہے۔",
            sd: "سج اڀرندي پاسي اڀرندو آهي.",
          },
        ],
      },
      {
        heading: "Four Forms",
        body: "",
        table: {
          headers: ["Form", "Example"],
          rows: [
            ["Affirmative", "She plays cricket."],
            ["Negative", "She does not play cricket."],
            ["Interrogative", "Does she play cricket?"],
            ["Interrogative Negative", "Does she not play cricket?"],
          ],
        },
      },
      { heading: "Common Mistakes", body: "Do <strong>not</strong> use V2 after does/did; use V1: <em>Does she play?</em> not <em>Does she played?</em> Remember that does and did already carry the past idea, so the main verb must stay in V1. A second common slip is dropping the -s after he/she/it: 'He play cricket' should be 'He plays cricket'." },
    ],
  },
  {
    title: "2. Present Continuous",
    subtitle: "Actions happening now or around the present time",
    icon: "Clock",
    vocabulary: [
      { term: "Present Continuous", ur: "موجودہ استمراری", sd: "موجوده استمراري" },
      { term: "now", ur: "اب", sd: "هاڻي" },
      { term: "at the moment", ur: "اس وقت", sd: "هن مهل" },
      { term: "helping verb", ur: "معاون فعل", sd: "مددگار فعل" },
      { term: "am / is / are", ur: "am / is / are", sd: "am / is / are" },
      { term: "-ing form", ur: "-ing شکل", sd: "-ing شڪل" },
      { term: "action in progress", ur: "جاری عمل", sd: "جاري عمل" },
      { term: "currently", ur: "موجودہ وقت میں", sd: "موجوده وقت ۾" },
      { term: "subject", ur: "فاعل", sd: "فاعل" },
    ],
    sections: [
      { heading: "Use", body: "An action happening now or around the present time. Present Continuous is used for actions that are in progress at this very moment or in these days. It paints a live picture of what someone is doing, so it is the tense you reach for when narrating 'right now'. For example, 'She is cooking dinner' tells us the cooking is happening as we speak. Without this tense we could not describe an ongoing action clearly." },
      { heading: "Nishaniyan (Identifying Signs)", body: "These time words are the nishaniyan (signs) of Present Continuous: now, right now, at the moment, currently, today. They show that the action is in progress at the present time. If you see one of these words, the verb will usually need am/is/are + V-ing. Be careful: 'today' can also be used with Present Simple, so check the verb form too." },
      { heading: "Formation", body: "<strong>Subject + am/is/are + V-ing + Object</strong>. Choose am with I, is with he/she/it, and are with we/you/they. Add -ing to the main verb (read → reading, write → writing). For verbs ending in -e, drop the -e before -ing (come → coming)." },
      {
        heading: "Solved Examples",
        body: "",
        examples: [
          "I am studying English now. (میں اب انگریزی پڑھ رہا ہوں)",
          "She is cooking dinner. (وہ کھانا پکا رہی ہے)",
          "They are playing football. (وہ فٹبال کھیل رہے ہیں)",
          "He is writing a letter. (وہ خط لکھ رہا ہے)",
          "We are learning grammar. (ہم گرامر سیکھ رہے ہیں)",
        ],
        examplesTr: [
          {
            en: "I am studying English now.",
            ur: "میں اب انگریزی پڑھ رہا ہوں۔",
            sd: "مان هاڻي انگريزي پڙهي رهيو آهيان.",
          },
          {
            en: "She is cooking dinner.",
            ur: "وہ کھانا پکا رہی ہے۔",
            sd: "هوءَ کائڻي پچائي رهي آهي.",
          },
          {
            en: "They are playing football.",
            ur: "وہ فٽبال کھیل رہے ہیں۔",
            sd: "هو فٽبال کائي رهيا آهن.",
          },
          {
            en: "He is writing a letter.",
            ur: "وہ خط لکھ رہا ہے۔",
            sd: "هو خط لکي رهيو آهي.",
          },
          {
            en: "We are learning grammar.",
            ur: "ہم گرامر سیکھ رہے ہیں۔",
            sd: "اسين گرامر سکي رهيا آهيون.",
          },
        ],
      },
      {
        heading: "Four Forms",
        body: "",
        table: {
          headers: ["Form", "Example"],
          rows: [
            ["Affirmative", "She is reading a book."],
            ["Negative", "She is not reading a book."],
            ["Interrogative", "Is she reading a book?"],
            ["Interrogative Negative", "Is she not reading a book?"],
          ],
        },
      },
      { heading: "Common Mistakes", body: "Use the correct form of <strong>be</strong> before V-ing. <em>I am going</em> not <em>I going</em>. Another common error is using Present Continuous for permanent facts — say 'The sun rises in the east' (Present Simple), not 'The sun is rising in the east'." },
    ],
  },
  {
    title: "3. Present Perfect",
    subtitle: "Recently completed actions connected to the present",
    icon: "Clock",
    vocabulary: [
      { term: "Present Perfect", ur: "موجودہ مکمل", sd: "موجوده مڪمل" },
      { term: "recently", ur: "حال ہی میں", sd: "هاڻي ئي" },
      { term: "completed action", ur: "مکمل عمل", sd: "مڪمل عمل" },
      { term: "result", ur: "نتیجہ", sd: "نتيجو" },
      { term: "have / has", ur: "have / has", sd: "have / has" },
      { term: "past participle (V3)", ur: "ماضی مطلق (V3)", sd: "ماضي مطلق (V3)" },
      { term: "just", ur: "ابھی", sd: "هاڻي ئي" },
      { term: "already", ur: "پہلے ہی", sd: "پهرين ئي" },
      { term: "yet", ur: "ابھی تک", sd: "اڃا تائين" },
      { term: "ever / never", ur: "کبھی / کبھی نہیں", sd: "ڪڏهن / ڪڏهن نہ" },
    ],
    sections: [
      { heading: "Use", body: "An action completed recently or with a result connected to the present. Present Perfect links a finished past action to the present moment — the action is over, but its effect is still felt now. For example, 'I have lost my pen' means the pen is still missing. This tense is very common in everyday speech, especially when announcing news or sharing experiences. Notice we do not say exactly when the action happened — that is what Past Simple is for." },
      { heading: "Nishaniyan (Identifying Signs)", body: "These words are the nishaniyan (signs) of Present Perfect: already, just, yet, ever, never, so far, recently. They link a past action to a present result or experience. 'Just' shows the action finished moments ago; 'already' shows it finished sooner than expected; 'yet' is used in questions and negatives." },
      { heading: "Formation", body: "<strong>Subject + has/have + V3 + Object</strong>. Use has with he/she/it and have with I/we/you/they. V3 is the past participle — for regular verbs add -ed (play → played); for irregular verbs learn the third form (go → gone, eat → eaten)." },
      {
        heading: "Solved Examples",
        body: "",
        examples: [
          "I have finished my homework. (میں اپنا ہوم ورک مکمل کر چکا ہوں)",
          "She has visited Karachi twice. (اس نے کراچی دو بار دیکھا ہے)",
          "They have eaten dinner. (انہوں نے کھانا کھا لیا ہے)",
          "He has lost his pen. (اس کا قلم گم ہو گیا ہے)",
          "We have lived here for five years. (ہم یہاں پانچ سال سے رہ رہے ہیں)",
        ],
        examplesTr: [
          {
            en: "I have finished my homework.",
            ur: "میں اپنا ہوم ورک مکمل کر چکا ہوں۔",
            sd: "مان پنهنجو گهر ڪم مڪمل ڪري چڪو آهيان.",
          },
          {
            en: "She has visited Karachi twice.",
            ur: "اس نے کراچی دو بار دیکھا ہے۔",
            sd: "هن ڪراچي ٻه ڀيرا ڏٺو آهي.",
          },
          {
            en: "They have eaten dinner.",
            ur: "انہوں نے کھانا کھا لیا ہے۔",
            sd: "هنن کائڻي کائي وٺي آهي.",
          },
          {
            en: "He has lost his pen.",
            ur: "اس کا قلم گم ہو گیا ہے۔",
            sd: "هن جو قلم وڃائي ويو آهي.",
          },
          {
            en: "We have lived here for five years.",
            ur: "ہم یہاں پانچ سال سے رہ رہے ہیں۔",
            sd: "اسين هتي پنجن سالن کان رهي رهيا آهيون.",
          },
        ],
      },
      {
        heading: "Four Forms",
        body: "",
        table: {
          headers: ["Form", "Example"],
          rows: [
            ["Affirmative", "She has written a letter."],
            ["Negative", "She has not written a letter."],
            ["Interrogative", "Has she written a letter?"],
            ["Interrogative Negative", "Has she not written a letter?"],
          ],
        },
      },
      { heading: "Common Mistakes", body: "Use <strong>has</strong> with he/she/it and <strong>have</strong> with I/we/you/they. Do not use Present Perfect with a finished past time: say 'I finished at 5 PM' (Past Simple), not 'I have finished at 5 PM'. 'Yet' goes at the end of negatives and questions: 'Have you finished yet?'" },
    ],
  },
  {
    title: "4. Present Perfect Continuous",
    subtitle: "Actions that started in the past and continue up to now",
    icon: "Clock",
    vocabulary: [
      { term: "Present Perfect Continuous", ur: "موجودہ مکمل استمراری", sd: "موجوده مڪمل استمراري" },
      { term: "since", ur: "سے (وقت کا آغاز)", sd: "کان (وقت جي شروعات)" },
      { term: "for", ur: "سے (مدت کے لیے)", sd: "کان (مدت لاءِ)" },
      { term: "duration", ur: "مدت", sd: "مدت" },
      { term: "continuing action", ur: "جاری عمل", sd: "جاري عمل" },
      { term: "been", ur: "been (ہونا - ماضی بعید)", sd: "been (رهيو آهي)" },
      { term: "-ing form", ur: "-ing شکل", sd: "-ing شڪل" },
      { term: "how long", ur: "کتنی دیر سے", sd: "گهڻي دير کان" },
    ],
    sections: [
      { heading: "Use", body: "An action that started in the past and has continued up to now. Present Perfect Continuous emphasises the duration of an ongoing activity — the action began earlier and is still happening (or has just stopped). For example, 'I have been studying for two hours' tells us both that the studying started two hours ago and that it is still going on. It is the tense we reach for when the question 'How long?' is in our mind." },
      { heading: "Nishaniyan (Identifying Signs)", body: "These words are the nishaniyan (signs) of Present Perfect Continuous: since, for, all day, all morning, how long. 'Since' marks the starting point (since 9 AM); 'for' marks the length of time (for two hours). 'How long' is the question form this tense answers." },
      { heading: "Formation", body: "<strong>Subject + has/have been + V-ing + Object</strong>. Notice the three helping words: has/have + been + V-ing. Forgetting 'been' is the most common mistake in this tense. Use has been with he/she/it and have been with I/we/you/they." },
      {
        heading: "Solved Examples",
        body: "",
        examples: [
          "I have been studying for two hours. (میں دو گھنٹے سے پڑھ رہا ہوں)",
          "She has been cooking since morning. (وہ صبح سے کھانا پکا رہی ہے)",
          "It has been raining all day. (پورا دن بارش ہو رہی ہے)",
          "They have been working since 9 AM. (وہ صبح 9 بجے سے کام کر رہے ہیں)",
          "He has been waiting for an hour. (وہ ایک گھنٹے سے انتظار کر رہا ہے)",
        ],
        examplesTr: [
          {
            en: "I have been studying for two hours.",
            ur: "میں دو گھنٹے سے پڑھ رہا ہوں۔",
            sd: "مان ٻن ڪلاڪن کان پڙهي رهيو آهيان.",
          },
          {
            en: "She has been cooking since morning.",
            ur: "وہ صبح سے کھانا پکا رہی ہے۔",
            sd: "هوءَ صبح کان کائڻي پچائي رهي آهي.",
          },
          {
            en: "It has been raining all day.",
            ur: "پورا دن بارش ہو رہی ہے۔",
            sd: "پورو ڏينهن وساءُ پيو ٿئي.",
          },
          {
            en: "They have been working since 9 AM.",
            ur: "وہ صبح 9 بجے سے کام کر رہے ہیں۔",
            sd: "هو صبح 9 وڄي کان ڪم ڪري رهيا آهن.",
          },
          {
            en: "He has been waiting for an hour.",
            ur: "وہ ایک گھنٹے سے انتظار کر رہا ہے۔",
            sd: "هو هڪ ڪلاڪ کان انتظار ڪري رهيو آهي.",
          },
        ],
      },
      {
        heading: "Four Forms",
        body: "",
        table: {
          headers: ["Form", "Example"],
          rows: [
            ["Affirmative", "She has been reading a book."],
            ["Negative", "She has not been reading a book."],
            ["Interrogative", "Has she been reading a book?"],
            ["Interrogative Negative", "Has she not been reading a book?"],
          ],
        },
      },
      { heading: "Common Mistakes", body: "Don't forget <strong>been</strong>: <em>I have been working</em> not <em>I have working</em>. Also remember that state verbs (know, like, want, believe) are usually not used in the -ing form — say 'I have known him for years', not 'I have been knowing him'." },
    ],
  },
  {
    title: "5. Past Simple",
    subtitle: "Completed actions in the past",
    icon: "Clock",
    vocabulary: [
      { term: "Past Simple", ur: "ماضی بعید (مخصوص)", sd: "ماضي بعيد (خاص)" },
      { term: "completed action", ur: "مکمل عمل", sd: "مڪمل عمل" },
      { term: "yesterday", ur: "کل", sd: "ڪالهه" },
      { term: "ago", ur: "پہلے", sd: "اڳ" },
      { term: "last (night/week)", ur: "گزشتہ (رات/ہفتہ)", sd: "گزريل (رات/هفتو)" },
      { term: "regular verb", ur: "قاعدی فعل", sd: "قاعدي فعل" },
      { term: "irregular verb", ur: "نا قاعدی فعل", sd: "نا قاعدي فعل" },
      { term: "V2 (past form)", ur: "V2 (ماضی کا فعل)", sd: "V2 (ماضي جو فعل)" },
      { term: "did / did not", ur: "did / did not", sd: "did / did not" },
    ],
    sections: [
      { heading: "Use", body: "Completed actions in the past. Past Simple describes an action that finished at a specific time before now — the time is over and the action is done. It is the most common tense for telling stories, narrating what happened yesterday, or reporting past events. For example, 'I went to school yesterday' tells us about a finished event with a clear past time marker. Once the moment is fixed in the past, the action will not return." },
      { heading: "Nishaniyan (Identifying Signs)", body: "These time words are the nishaniyan (signs) of Past Simple: yesterday, last night, last week, ago, in 2020. They anchor the sentence to a definite point in the past. If you see one of them, the verb will usually take the V2 form." },
      { heading: "Formation", body: "<strong>Subject + V2 + Object</strong>. For regular verbs, add -ed to V1 (play → played). For irregular verbs, learn the V2 form by heart (go → went, eat → ate, see → saw). In negatives and questions, use did + V1 — the V2 disappears because did already carries the past." },
      {
        heading: "Solved Examples",
        body: "",
        examples: [
          "I went to school yesterday. (میں کل سکول گیا تھا)",
          "She ate dinner at 8 PM. (اس نے رات 8 بجے کھانا کھایا)",
          "They played cricket last Sunday. (انہوں نے گزشتہ اتوار کرکٹ کھیلی)",
          "He wrote a letter to his father. (اس نے اپنے والد کو خط لکھا)",
          "We saw a movie last night. (ہم نے کل رات فلم دیکھی)",
        ],
        examplesTr: [
          {
            en: "I went to school yesterday.",
            ur: "میں کل سکول گیا تھا۔",
            sd: "مان ڪالهه سڪول ويو هوس.",
          },
          {
            en: "She ate dinner at 8 PM.",
            ur: "اس نے رات 8 بجے کھانا کھایا۔",
            sd: "هن رات 8 وڄي کائڻي کاڌي.",
          },
          {
            en: "They played cricket last Sunday.",
            ur: "انہوں نے گزشتہ اتوار کرکٹ کھیلی۔",
            sd: "هنن گزريل آچر ڪرڪيٽ کاڌي.",
          },
          {
            en: "He wrote a letter to his father.",
            ur: "اس نے اپنے والد کو خط لکھا۔",
            sd: "هن پنهنجي پيءُ کي خط لکيو.",
          },
          {
            en: "We saw a movie last night.",
            ur: "ہم نے کل رات فلم دیکھی۔",
            sd: "اسين ڪالهه رات فلم ڏٺي.",
          },
        ],
      },
      {
        heading: "Four Forms",
        body: "",
        table: {
          headers: ["Form", "Example"],
          rows: [
            ["Affirmative", "She played cricket."],
            ["Negative", "She did not play cricket."],
            ["Interrogative", "Did she play cricket?"],
            ["Interrogative Negative", "Did she not play cricket?"],
          ],
        },
      },
      { heading: "Common Mistakes", body: "After <strong>did/did not</strong>, always use <strong>V1</strong>: <em>Did she go?</em> not <em>Did she went?</em>. The word 'did' already shows the past, so the main verb stays in its base form. A second slip is forgetting the -ed on regular verbs: 'I walk to school yesterday' should be 'I walked to school yesterday'." },
    ],
  },
  {
    title: "6. Past Continuous",
    subtitle: "Actions in progress at a particular time in the past",
    icon: "Clock",
    vocabulary: [
      { term: "Past Continuous", ur: "ماضی استمراری", sd: "ماضي استمراري" },
      { term: "was / were", ur: "was / were", sd: "was / were" },
      { term: "-ing form", ur: "-ing شکل", sd: "-ing شڪل" },
      { term: "in progress", ur: "جاری", sd: "جاري" },
      { term: "while", ur: "جبکہ", sd: "جڏهن ته" },
      { term: "when", ur: "جب", sd: "جڏهن" },
      { term: "particular time", ur: "مخصوص وقت", sd: "خاص وقت" },
      { term: "helping verb", ur: "معاون فعل", sd: "مددگار فعل" },
    ],
    sections: [
      { heading: "Use", body: "An action that was in progress at a particular time in the past. Past Continuous paints a moving picture — it shows what was happening at some moment before now, often as the background to another event. For example, 'I was studying when she called' tells us that the studying was ongoing when the call interrupted it. It is the tense used in story-telling to set the scene." },
      { heading: "Nishaniyan (Identifying Signs)", body: "These words are the nishaniyan (signs) of Past Continuous: while, when, at 5 pm yesterday, at that time. 'While' often begins the longer ongoing action; 'when' introduces the shorter event that interrupted it. Together they create the classic past-background sentence." },
      { heading: "Formation", body: "<strong>Subject + was/were + V-ing + Object</strong>. Use was with I/he/she/it and were with we/you/they. Add -ing to the main verb (read → reading, write → writing). For verbs ending in -e, drop the -e before adding -ing (come → coming)." },
      {
        heading: "Solved Examples",
        body: "",
        examples: [
          "I was studying when she called. (وہ بل کرنے کے وقت میں پڑھ رہا تھا)",
          "They were playing cricket at 5 PM. (وہ شام 5 بجے کرکٹ کھیل رہے تھے)",
          "She was cooking when the lights went out. (بتی بند ہونے کے وقت وہ کھانا پکا رہی تھی)",
          "He was reading a book in the library. (وہ لائبریری میں کتاب پڑھ رہا تھا)",
          "We were watching TV when you came. (جب تم آئے ہم ٹی وی دیکھ رہے تھے)",
        ],
        examplesTr: [
          {
            en: "I was studying when she called.",
            ur: "وہ بل کرنے کے وقت میں پڑھ رہا تھا۔",
            sd: "هن سڏڻ جي مهل مان پڙهي رهيو هوس.",
          },
          {
            en: "They were playing cricket at 5 PM.",
            ur: "وہ شام 5 بجے کرکٹ کھیل رہے تھے۔",
            sd: "هو شام 5 وڄي ڪرڪيٽ کائي رهيا هئا.",
          },
          {
            en: "She was cooking when the lights went out.",
            ur: "بتی بند ہونے کے وقت وہ کھانا پکا رہی تھی۔",
            sd: "بتيون بند ٿيڻ جي مهل هوءَ کائڻي پچائي رهي هئي.",
          },
          {
            en: "He was reading a book in the library.",
            ur: "وہ لائبریری میں کتاب پڑھ رہا تھا۔",
            sd: "هو لائبريري ۾ ڪتاب پڙهي رهيو هو.",
          },
          {
            en: "We were watching TV when you came.",
            ur: "جب تم آئے ہم ٹی وی دیکھ رہے تھے۔",
            sd: "جڏهن توهان آيا تڏهن اسين ٽي وي ڏسي رهيا هئاسين.",
          },
        ],
      },
      {
        heading: "Four Forms",
        body: "",
        table: {
          headers: ["Form", "Example"],
          rows: [
            ["Affirmative", "She was reading a book."],
            ["Negative", "She was not reading a book."],
            ["Interrogative", "Was she reading a book?"],
            ["Interrogative Negative", "Was she not reading a book?"],
          ],
        },
      },
      { heading: "Common Mistakes", body: "Use <strong>was</strong> with I/he/she/it and <strong>were</strong> with we/you/they. Do not mix them up: 'They was playing' should be 'They were playing'. Also remember that two -ing verbs joined by 'while' are fine ('While I was reading, she was cooking'), but joining them with 'when' often sounds wrong." },
    ],
  },
  {
    title: "7. Past Perfect",
    subtitle: "Actions completed before another past action",
    icon: "Clock",
    vocabulary: [
      { term: "Past Perfect", ur: "ماضی بعید مکمل", sd: "ماضي بعيد مڪمل" },
      { term: "had", ur: "had", sd: "had" },
      { term: "past participle (V3)", ur: "ماضی مطلق (V3)", sd: "ماضي مطلق (V3)" },
      { term: "before", ur: "سے پہلے", sd: "کان اڳ" },
      { term: "after", ur: "کے بعد", sd: "کانپوءِ" },
      { term: "already", ur: "پہلے ہی", sd: "پهرين ئي" },
      { term: "by the time", ur: "تب تک", sd: "اڳرو تائين" },
      { term: "earlier past action", ur: "پہلے کا ماضی عمل", sd: "اڳوڪو ماضي عمل" },
    ],
    sections: [
      { heading: "Use", body: "An action completed before another past action. Past Perfect is used when we talk about two past events and want to show which one happened first. The earlier action takes had + V3; the later one stays in Past Simple. For example, 'I had eaten dinner before she arrived' shows the eating finished first, then she arrived. Without Past Perfect, the order of two past events would be unclear." },
      { heading: "Nishaniyan (Identifying Signs)", body: "These words are the nishaniyan (signs) of Past Perfect: before, after, already, by the time. They signal that one past action happened earlier than another. When you see two past actions joined by these words, the first one usually needs had + V3." },
      { heading: "Formation", body: "<strong>Subject + had + V3 + Object</strong>. Had is the same for all subjects (I, he, she, we, they — all use had). V3 is the past participle: add -ed for regular verbs (play → played), and learn the third form for irregular verbs (go → gone, write → written)." },
      {
        heading: "Solved Examples",
        body: "",
        examples: [
          "I had eaten dinner before she arrived. (اس کے آنے سے پہلے میں کھانا کھا چکا تھا)",
          "They had finished the test when the bell rang. (جب گھنٹی بجی انہوں نے ٹیسٹ مکمل کر لیا تھا)",
          "She had left before I reached home. (اس نے میرے گھر پہنچنے سے پہلے نکل دیا تھا)",
          "He had written the letter before I called him. (اس نے میرے بل کرنے سے پہلے خط لکھ لیا تھا)",
          "We had completed the work by 5 PM. (ہم نے شام 5 بجے تک کام مکمل کر لیا تھا)",
        ],
        examplesTr: [
          {
            en: "I had eaten dinner before she arrived.",
            ur: "اس کے آنے سے پہلے میں کھانا کھا چکا تھا۔",
            sd: "هن جي اچڻ کان اڳ مان کائڻي کائي چڪو هوس.",
          },
          {
            en: "They had finished the test when the bell rang.",
            ur: "جب گھنٹی بجی انہوں نے ٹیسٹ مکمل کر لیا تھا۔",
            sd: "جڏهن گهنٽي وڄي تڏهن هنن ٽيسٽ مڪمل ڪري ڇڏيو هو.",
          },
          {
            en: "She had left before I reached home.",
            ur: "اس نے میرے گھر پہنچنے سے پہلے نکل دیا تھا۔",
            sd: "هن منهنجي گهر پهچڻ کان اڳ نڪري ويو هو.",
          },
          {
            en: "He had written the letter before I called him.",
            ur: "اس نے میرے بل کرنے سے پہلے خط لکھ لیا تھا۔",
            sd: "هن منهنجي سڏڻ کان اڳ خط لکي ڇڏيو هو.",
          },
          {
            en: "We had completed the work by 5 PM.",
            ur: "ہم نے شام 5 بجے تک کام مکمل کر لیا تھا۔",
            sd: "اسين شام 5 وڄي تائين ڪم مڪمل ڪري ڇڏيو هو.",
          },
        ],
      },
      {
        heading: "Four Forms",
        body: "",
        table: {
          headers: ["Form", "Example"],
          rows: [
            ["Affirmative", "She had written a letter."],
            ["Negative", "She had not written a letter."],
            ["Interrogative", "Had she written a letter?"],
            ["Interrogative Negative", "Had she not written a letter?"],
          ],
        },
      },
      { heading: "Common Mistakes", body: "<strong>had</strong> is the same for all subjects. Don't use <em>has</em> or <em>have</em> in past perfect. A common slip is using Past Simple for both actions: 'I ate dinner before she arrived' is unclear about which came first — say 'I had eaten dinner before she arrived' to be precise." },
    ],
  },
  {
    title: "8. Past Perfect Continuous",
    subtitle: "Actions that continued for a period before another past event",
    icon: "Clock",
    vocabulary: [
      { term: "Past Perfect Continuous", ur: "ماضی بعید مکمل استمراری", sd: "ماضي بعيد مڪمل استمراري" },
      { term: "had been", ur: "had been", sd: "had been" },
      { term: "-ing form", ur: "-ing شکل", sd: "-ing شڪل" },
      { term: "for / since", ur: "for / since", sd: "for / since" },
      { term: "duration before", ur: "پہلے کی مدت", sd: "اڳوڪي مدت" },
      { term: "until then", ur: "تب تک", sd: "ته تائين" },
      { term: "ongoing past action", ur: "جاری ماضی عمل", sd: "جاري ماضي عمل" },
    ],
    sections: [
      { heading: "Use", body: "An action that continued for a period before another past event. Past Perfect Continuous stresses how long an activity had been going on before something else happened in the past. For example, 'I had been waiting for an hour when the bus came' shows both the duration of the waiting and the moment it ended. It is the tense we use to describe the build-up to a past event." },
      { heading: "Nishaniyan (Identifying Signs)", body: "These words are the nishaniyan (signs) of Past Perfect Continuous: for, since, before, until then. They mark the length of time the action had been running. The second past event is usually introduced by 'when' or 'before'." },
      { heading: "Formation", body: "<strong>Subject + had been + V-ing + Object</strong>. Had been is the same for all subjects. Add -ing to the main verb and always keep 'been' in the middle — many students drop it." },
      {
        heading: "Solved Examples",
        body: "",
        examples: [
          "I had been waiting for an hour when the bus came. (بس آنے کے وقت میں ایک گھنٹے سے انتظار کر رہا تھا)",
          "She had been teaching for 10 years before she retired. (ریٹائر ہونے سے پہلے وہ 10 سال سے پڑھا رہی تھی)",
          "They had been playing since morning when it rained. (جب بارش ہوئی وہ صبح سے کھیل رہے تھے)",
          "He had been working all day before he rested. (اس نے آرام کرنے سے پہلے پورا دن کام کیا تھا)",
          "We had been walking for two hours when we found the shop. (جب ہمیں دکان ملی ہم دو گھنٹے سے چل رہے تھے)",
        ],
        examplesTr: [
          {
            en: "I had been waiting for an hour when the bus came.",
            ur: "بس آنے کے وقت میں ایک گھنٹے سے انتظار کر رہا تھا۔",
            sd: "بس اچڻ جي مهل مان هڪ ڪلاڪ کان انتظار ڪري رهيو هوس.",
          },
          {
            en: "She had been teaching for 10 years before she retired.",
            ur: "ریٹائر ہونے سے پہلے وہ 10 سال سے پڑھا رہی تھی۔",
            sd: "ريٽائر ٿيڻ کان اڳ هوءَ 10 سالن کان پڙهائي رهي هئي.",
          },
          {
            en: "They had been playing since morning when it rained.",
            ur: "جب بارش ہوئی وہ صبح سے کھیل رہے تھے۔",
            sd: "جڏهن وساءُ ٿيو تڏهن هو صبح کان کائي رهيا هئا.",
          },
          {
            en: "He had been working all day before he rested.",
            ur: "اس نے آرام کرنے سے پہلے پورا دن کام کیا تھا۔",
            sd: "هن آرام ڪرڻ کان اڳ پورو ڏينهن ڪم ڪيو هو.",
          },
          {
            en: "We had been walking for two hours when we found the shop.",
            ur: "جب ہمیں دکان ملی ہم دو گھنٹے سے چل رہے تھے۔",
            sd: "جڏهن دکان ملڻ تڏهن اسين ٻن ڪلاڪن کان هلندا پئي هئاسين.",
          },
        ],
      },
      {
        heading: "Four Forms",
        body: "",
        table: {
          headers: ["Form", "Example"],
          rows: [
            ["Affirmative", "She had been reading a book."],
            ["Negative", "She had not been reading a book."],
            ["Interrogative", "Had she been reading a book?"],
            ["Interrogative Negative", "Had she not been reading a book?"],
          ],
        },
      },
      { heading: "Common Mistakes", body: "Don't forget <strong>been</strong>: <em>had been working</em> not <em>had working</em>. As with other continuous tenses, state verbs (know, like, want) usually avoid the -ing form: say 'I had known him for years', not 'I had been knowing him'." },
    ],
  },
  {
    title: "9. Future Simple",
    subtitle: "Predictions, decisions, promises and future actions",
    icon: "Clock",
    vocabulary: [
      { term: "Future Simple", ur: "مستقبل معروف", sd: "مستقبل معروف" },
      { term: "will", ur: "will", sd: "will" },
      { term: "V1 (base form)", ur: "V1 (بنیادی صورت)", sd: "V1 (بنيادي صورت)" },
      { term: "prediction", ur: "پیش گوئی", sd: "پيشگوائي" },
      { term: "promise", ur: "وعدہ", sd: "واعدو" },
      { term: "decision", ur: "فیصلہ", sd: "فيصلو" },
      { term: "tomorrow", ur: "کل", sd: "سڀاڻي" },
      { term: "next week / year", ur: "اگلا ہفتہ / سال", sd: "اڳو هفتو / سال" },
      { term: "soon", ur: "جلد", sd: "جلد" },
    ],
    sections: [
      { heading: "Use", body: "Predictions, decisions, promises and future actions. Future Simple is used to talk about things that have not happened yet but will happen later. It is the tense we use for sudden decisions, promises we make, and guesses about what will happen. For example, 'I will call you tomorrow' can be a promise, a plan, or a prediction. It is the simplest way to step into the future in English." },
      { heading: "Nishaniyan (Identifying Signs)", body: "These words are the nishaniyan (signs) of Future Simple: tomorrow, next week, next year, soon, later. They point to a time ahead of now. When you see them, the verb will usually take will + V1." },
      { heading: "Formation", body: "<strong>Subject + will + V1 + Object</strong>. Will stays the same for all subjects (no -s). After will, always use the base form (V1) of the main verb: 'I will go', 'She will go'. The short form is 'll: I'll, you'll, he'll, she'll, we'll, they'll." },
      {
        heading: "Solved Examples",
        body: "",
        examples: [
          "I will go to school tomorrow. (میں کل سکول جاؤں گا)",
          "She will cook dinner tonight. (وہ آج رات کھانا پکائے گی)",
          "They will play cricket on Sunday. (وہ اتوار کو کرکٹ کھیلیں گے)",
          "He will write a letter to his friend. (وہ اپنے دوست کو خط لکھے گا)",
          "We will visit Karachi next month. (ہم اگلے مہینے کراچی جائیں گے)",
        ],
        examplesTr: [
          {
            en: "I will go to school tomorrow.",
            ur: "میں کل سکول جاؤں گا۔",
            sd: "مان سڀاڻي سڪول ويندس.",
          },
          {
            en: "She will cook dinner tonight.",
            ur: "وہ آج رات کھانا پکائے گی۔",
            sd: "هوءَ اڄ رات کائڻي پچائيندي.",
          },
          {
            en: "They will play cricket on Sunday.",
            ur: "وہ اتوار کو کرکٹ کھیلیں گے۔",
            sd: "هو آچر تي ڪرڪيٽ کائيندا.",
          },
          {
            en: "He will write a letter to his friend.",
            ur: "وہ اپنے دوست کو خط لکھے گا۔",
            sd: "هو پنهنجي دوست کي خط لکندو.",
          },
          {
            en: "We will visit Karachi next month.",
            ur: "ہم اگلے مہینے کراچی جائیں گے۔",
            sd: "اسين اڳي مهيني ڪراچي وينداسين.",
          },
        ],
      },
      {
        heading: "Four Forms",
        body: "",
        table: {
          headers: ["Form", "Example"],
          rows: [
            ["Affirmative", "She will play cricket."],
            ["Negative", "She will not play cricket."],
            ["Interrogative", "Will she play cricket?"],
            ["Interrogative Negative", "Will she not play cricket?"],
          ],
        },
      },
      { heading: "Common Mistakes", body: "After <strong>will</strong>, always use <strong>V1</strong>: <em>I will go</em> not <em>I will goes</em> or <em>I will went</em>. Will never changes for he/she/it — say 'He will go', not 'He wills go'. In negatives, write 'will not' or the short form 'won't': 'I won't go'." },
    ],
  },
  {
    title: "10. Future Continuous",
    subtitle: "Actions that will be in progress at a future time",
    icon: "Clock",
    vocabulary: [
      { term: "Future Continuous", ur: "مستقبل استمراری", sd: "مستقبل استمراري" },
      { term: "will be", ur: "will be", sd: "will be" },
      { term: "-ing form", ur: "-ing شکل", sd: "-ing شڪل" },
      { term: "in progress at a future time", ur: "مستقبل میں جاری", sd: "مستقبل ۾ جاري" },
      { term: "this time tomorrow", ur: "کل اس وقت", sd: "سڀاڻي هن مهل" },
      { term: "at 8 pm tomorrow", ur: "کل رات 8 بجے", sd: "سڀاڻي رات 8 وڄي" },
    ],
    sections: [
      { heading: "Use", body: "An action that will be in progress at a future time. Future Continuous paints a scene that will be unfolding at some moment ahead of now. For example, 'At 8 PM, she will be studying' lets us picture her mid-study at that exact future time. It is the tense for saying 'at that moment in the future, this will be happening'." },
      { heading: "Nishaniyan (Identifying Signs)", body: "These words are the nishaniyan (signs) of Future Continuous: this time tomorrow, at 8 pm tomorrow, next week at this time. They fix a specific future moment at which the action will be ongoing." },
      { heading: "Formation", body: "<strong>Subject + will be + V-ing + Object</strong>. Will stays the same for all subjects. Add -ing to the main verb and always keep 'be' between will and the main verb — many students drop it." },
      {
        heading: "Solved Examples",
        body: "",
        examples: [
          "This time tomorrow, I will be flying to Karachi. (اس وقت کل، میں کراچی اڑ رہا ہوں گا)",
          "At 8 PM, she will be studying. (رات 8 بجے، وہ پڑھ رہی ہوگی)",
          "They will be playing cricket at 5 PM. (وہ شام 5 بجے کرکٹ کھیل رہے ہوں گے)",
          "He will be writing a letter in the evening. (وہ شام کو خط لکھ رہا ہوگا)",
          "We will be traveling next week. (ہم اگلے ہفتے سفر کر رہے ہوں گے)",
        ],
        examplesTr: [
          {
            en: "This time tomorrow, I will be flying to Karachi.",
            ur: "اس وقت کل، میں کراچی اڑ رہا ہوں گا۔",
            sd: "سڀاڻي هن مهل، مان ڪراچي ڏانهن اڏامي رهيو هوندس.",
          },
          {
            en: "At 8 PM, she will be studying.",
            ur: "رات 8 بجے، وہ پڑھ رہی ہوگی۔",
            sd: "رات 8 وڄي، هوءَ پڙهي رهي هوندي.",
          },
          {
            en: "They will be playing cricket at 5 PM.",
            ur: "وہ شام 5 بجے کرکٹ کھیل رہے ہوں گے۔",
            sd: "هو شام 5 وڄي ڪرڪيٽ کائي رهيا هوندا.",
          },
          {
            en: "He will be writing a letter in the evening.",
            ur: "وہ شام کو خط لکھ رہا ہوگا۔",
            sd: "هو شام جو خط لکي رهيو هوندو.",
          },
          {
            en: "We will be traveling next week.",
            ur: "ہم اگلے ہفتے سفر کر رہے ہوں گے۔",
            sd: "اسين اڳي هفتي سفر ڪري رهيا هونداسين.",
          },
        ],
      },
      {
        heading: "Four Forms",
        body: "",
        table: {
          headers: ["Form", "Example"],
          rows: [
            ["Affirmative", "She will be reading a book."],
            ["Negative", "She will not be reading a book."],
            ["Interrogative", "Will she be reading a book?"],
            ["Interrogative Negative", "Will she not be reading a book?"],
          ],
        },
      },
      { heading: "Common Mistakes", body: "Don't forget <strong>be</strong>: <em>will be going</em> not <em>will going</em>. Another slip is using Future Continuous for a planned decision — for that, use Present Continuous ('I am meeting him tomorrow') or Future Simple, not 'I will be meeting him tomorrow'." },
    ],
  },
  {
    title: "11. Future Perfect",
    subtitle: "Actions that will be completed before a future time",
    icon: "Clock",
    vocabulary: [
      { term: "Future Perfect", ur: "مستقبل مکمل", sd: "مستقبل مڪمل" },
      { term: "will have", ur: "will have", sd: "will have" },
      { term: "past participle (V3)", ur: "ماضی مطلق (V3)", sd: "ماضي مطلق (V3)" },
      { term: "by", ur: "تک", sd: "تائين" },
      { term: "by the time", ur: "تب تک", sd: "جڏهن تائين" },
      { term: "before", ur: "سے پہلے", sd: "کان اڳ" },
      { term: "completed before a future time", ur: "مستقبل وقت سے پہلے مکمل", sd: "مستقبل وقت کان اڳ مڪمل" },
    ],
    sections: [
      { heading: "Use", body: "An action that will be completed before a future time. Future Perfect looks forward to a point in the future and says 'by then, this will be finished'. For example, 'She will have finished her homework by 10 PM' promises that the homework will be done before 10 PM arrives. It is the tense for deadlines and finish-lines in the future." },
      { heading: "Nishaniyan (Identifying Signs)", body: "These words are the nishaniyan (signs) of Future Perfect: by, by the time, before, by next week. 'By' is the strongest sign — it sets the future time before which the action will be complete." },
      { heading: "Formation", body: "<strong>Subject + will have + V3 + Object</strong>. Will stays the same for all subjects. V3 is the past participle: add -ed for regular verbs (play → played), and learn the third form for irregular verbs (go → gone, write → written)." },
      {
        heading: "Solved Examples",
        body: "",
        examples: [
          "By next year, I will have graduated. (اگلے سال تک، میں گریجویٹ ہو چکا ہوں گا)",
          "She will have finished her homework by 10 PM. (وہ رات 10 بجے تک اپنا ہوم ورک مکمل کر چکی ہوگی)",
          "They will have built the house by December. (وہ دسمبر تک گھر بنا چکے ہوں گے)",
          "He will have written the book by next month. (وہ اگلے مہینے تک کتاب لکھ چکا ہوگا)",
          "We will have completed the project by Friday. (ہم جمعہ تک پراجیکٹ مکمل کر چکے ہوں گے)",
        ],
        examplesTr: [
          {
            en: "By next year, I will have graduated.",
            ur: "اگلے سال تک، میں گریجویٹ ہو چکا ہوں گا۔",
            sd: "اڳي سال تائين، مان گريجوئيٽ ٿي چڪو هوندس.",
          },
          {
            en: "She will have finished her homework by 10 PM.",
            ur: "وہ رات 10 بجے تک اپنا ہوم ورک مکمل کر چکی ہوگی۔",
            sd: "هوءَ رات 10 وڄي تائين پنهنجو گهر ڪم مڪمل ڪري چڪي هوندي.",
          },
          {
            en: "They will have built the house by December.",
            ur: "وہ دسمبر تک گھر بنا چکے ہوں گے۔",
            sd: "هو ڊسمبر تائين گهر ٺاهي چڪا هوندا.",
          },
          {
            en: "He will have written the book by next month.",
            ur: "وہ اگلے مہینے تک کتاب لکھ چکا ہوگا۔",
            sd: "هو اڳي مهيني تائين ڪتاب لکي چڪو هوندو.",
          },
          {
            en: "We will have completed the project by Friday.",
            ur: "ہم جمعہ تک پراجیکٹ مکمل کر چکے ہوں گے۔",
            sd: "اسين جمعي تائين پراجيڪٽ مڪمل ڪري چڪا هونداسين.",
          },
        ],
      },
      {
        heading: "Four Forms",
        body: "",
        table: {
          headers: ["Form", "Example"],
          rows: [
            ["Affirmative", "She will have written a letter."],
            ["Negative", "She will not have written a letter."],
            ["Interrogative", "Will she have written a letter?"],
            ["Interrogative Negative", "Will she not have written a letter?"],
          ],
        },
      },
      { heading: "Common Mistakes", body: "Don't forget <strong>have</strong>: <em>will have finished</em> not <em>will finished</em>. Another slip is using Future Perfect without a clear future deadline — if there is no 'by' phrase, Present Perfect or Future Simple is usually better." },
    ],
  },
  {
    title: "12. Future Perfect Continuous",
    subtitle: "Actions that will have continued for a period up to a future time",
    icon: "Clock",
    vocabulary: [
      { term: "Future Perfect Continuous", ur: "مستقبل مکمل استمراری", sd: "مستقبل مڪمل استمراري" },
      { term: "will have been", ur: "will have been", sd: "will have been" },
      { term: "-ing form", ur: "-ing شکل", sd: "-ing شڪل" },
      { term: "duration up to a future time", ur: "مستقبل وقت تک مدت", sd: "مستقبل وقت تائين مدت" },
      { term: "by then", ur: "تب تک", sd: "اڳرو تائين" },
      { term: "for (length of time)", ur: "for (مدت)", sd: "for (مدت)" },
    ],
    sections: [
      { heading: "Use", body: "An action that will have continued for a period up to a future time. Future Perfect Continuous looks ahead to a moment in the future and counts how long an activity will have been running by then. For example, 'By 2027, I will have been teaching for 20 years' tells us both the future moment and the total duration. It is the tense for marking length-of-service or length-of-activity at a future point." },
      { heading: "Nishaniyan (Identifying Signs)", body: "These words are the nishaniyan (signs) of Future Perfect Continuous: for, by then, by next month, for two hours. 'For' shows the length of time; 'by then' shows the future moment we are looking ahead to." },
      { heading: "Formation", body: "<strong>Subject + will have been + V-ing + Object</strong>. Will stays the same for all subjects. Add -ing to the main verb and always keep 'been' in place — it is the most often-dropped word in this tense." },
      {
        heading: "Solved Examples",
        body: "",
        examples: [
          "By 2027, I will have been teaching for 20 years. (2027 تک، میں 20 سال سے پڑھا رہا ہوں گا)",
          "She will have been working for 8 hours by closing time. (بند ہونے کے وقت تک وہ 8 گھنٹے سے کام کر رہی ہوگی)",
          "They will have been studying for three hours by noon. (دوپہر تک وہ تین گھنٹے سے پڑھ رہے ہوں گے)",
          "He will have been living here for 10 years by next year. (اگلے سال تک وہ 10 سال سے یہاں رہ رہا ہوگا)",
          "We will have been traveling for a week by Sunday. (اتوار تک ہم ایک ہفتے سے سفر کر رہے ہوں گے)",
        ],
        examplesTr: [
          {
            en: "By 2027, I will have been teaching for 20 years.",
            ur: "2027 تک، میں 20 سال سے پڑھا رہا ہوں گا۔",
            sd: "2027 تائين، مان 20 سالن کان پڙهائي رهيو هوندس.",
          },
          {
            en: "She will have been working for 8 hours by closing time.",
            ur: "بند ہونے کے وقت تک وہ 8 گھنٹے سے کام کر رہی ہوگی۔",
            sd: "بند ٿيڻ جي مهل تائين هوءَ 8 ڪلاڪن کان ڪم ڪري رهي هوندي.",
          },
          {
            en: "They will have been studying for three hours by noon.",
            ur: "دوپہر تک وہ تین گھنٹے سے پڑھ رہے ہوں گے۔",
            sd: "ڏوپهر تائين هو ٽن ڪلاڪن کان پڙهي رهيا هوندا.",
          },
          {
            en: "He will have been living here for 10 years by next year.",
            ur: "اگلے سال تک وہ 10 سال سے یہاں رہ رہا ہوگا۔",
            sd: "اڳي سال تائين هو 10 سالن کان هتي رهي رهيو هوندو.",
          },
          {
            en: "We will have been traveling for a week by Sunday.",
            ur: "اتوار تک ہم ایک ہفتے سے سفر کر رہے ہوں گے۔",
            sd: "آچر تائين اسين هڪ هفتي کان سفر ڪري رهيا هونداسين.",
          },
        ],
      },
      {
        heading: "Four Forms",
        body: "",
        table: {
          headers: ["Form", "Example"],
          rows: [
            ["Affirmative", "She will have been reading a book."],
            ["Negative", "She will not have been reading a book."],
            ["Interrogative", "Will she have been reading a book?"],
            ["Interrogative Negative", "Will she not have been reading a book?"],
          ],
        },
      },
      { heading: "Common Mistakes", body: "Don't forget <strong>been</strong>: <em>will have been working</em> not <em>will have working</em>. As with other continuous tenses, state verbs (know, like, want) usually avoid the -ing form: say 'By 2027, I will have known him for 20 years', not 'I will have been knowing him'." },
    ],
  },
  // === PART B: TO BE VERBS ===
  {
    title: "13. To Be Verbs — am, is, are, was, were",
    subtitle: "Describing identity, condition, location, age, or state",
    icon: "Settings",
    vocabulary: [
      { term: "To Be verbs", ur: "To Be کے افعال", sd: "To Be جا فعل" },
      { term: "am / is / are", ur: "am / is / are", sd: "am / is / are" },
      { term: "was / were", ur: "was / were", sd: "was / were" },
      { term: "identity", ur: "شناخت", sd: "سڃاڻپ" },
      { term: "condition", ur: "حالت", sd: "حالت" },
      { term: "location", ur: "مقام", sd: "مقام" },
      { term: "age", ur: "عمر", sd: "عمر" },
      { term: "state", ur: "حالت", sd: "حالت" },
      { term: "helping verb", ur: "معاون فعل", sd: "مددگار فعل" },
    ],
    sections: [
      { heading: "Use", body: "To describe a person/thing, identity, condition, location, age, or state. These verbs can also act as helping verbs in continuous tenses. The To Be verbs (am, is, are, was, were) link a subject to a description rather than to an action. They are the most frequently used verbs in English, appearing in almost every sentence that describes something. For example, 'I am a student', 'She is happy', 'They were tired' all use To Be. In continuous tenses they work as helping verbs ('She is reading')." },
      {
        heading: "Present Forms (am/is/are)",
        body: "Used for present states, descriptions, and continuous tenses. Choose am with I, is with he/she/it, and are with we/you/they. These forms also appear as helping verbs in Present Continuous ('I am studying').",
        table: {
          headers: ["Subject", "Verb"],
          rows: [
            ["I", "am"],
            ["He / She / It", "is"],
            ["We / You / They", "are"],
          ],
        },
      },
      {
        heading: "Past Forms (was/were)",
        body: "Used for past states, descriptions, and past continuous tenses. Choose was with I/he/she/it and were with we/you/they. These forms also appear as helping verbs in Past Continuous ('She was reading').",
        table: {
          headers: ["Subject", "Verb"],
          rows: [
            ["I / He / She / It", "was"],
            ["We / You / They", "were"],
          ],
        },
      },
      {
        heading: "Examples",
        body: "",
        examples: [
          "I am a student. (میں ایک طالب علم ہوں)",
          "She is a teacher. (وہ ایک استاد ہے)",
          "They are happy. (وہ خوش ہیں)",
          "He was at home yesterday. (وہ کل گھر پر تھا)",
          "We were tired after the match. (ہم میچ کے بعد تھک گئے تھے)",
        ],
        examplesTr: [
          {
            en: "I am a student.",
            ur: "میں ایک طالب علم ہوں۔",
            sd: "مان هڪ شاگرد آهيان.",
          },
          {
            en: "She is a teacher.",
            ur: "وہ ایک استاد ہے۔",
            sd: "هوءَ هڪ استاد آهي.",
          },
          {
            en: "They are happy.",
            ur: "وہ خوش ہیں۔",
            sd: "هو خوش آهن.",
          },
          {
            en: "He was at home yesterday.",
            ur: "وہ کل گھر پر تھا۔",
            sd: "هو ڪالهه گهر ۾ هو.",
          },
          {
            en: "We were tired after the match.",
            ur: "ہم میچ کے بعد تھک گئے تھے۔",
            sd: "اسين ميچ کانپوءِ ٿڪجي پيا هئاسين.",
          },
        ],
      },
      { heading: "Common Mistakes", body: "I is → <strong>I am</strong>. He are → <strong>He is</strong>. They is → <strong>They are</strong>. Use <strong>was</strong> with I/he/she/it and <strong>were</strong> with we/you/they. The slip 'They was happy' should be 'They were happy'." },
    ],
  },
  // === PART C: HAVE / HAS / HAD ===
  {
    title: "14. Have / Has / Had",
    subtitle: "Showing possession, relationships, experiences",
    icon: "Settings",
    vocabulary: [
      { term: "have / has / had", ur: "have / has / had", sd: "have / has / had" },
      { term: "possession", ur: "ملکیت", sd: "ملڪيت" },
      { term: "relationship", ur: "رشتہ", sd: "رشتو" },
      { term: "experience", ur: "تجربہ", sd: "تجربو" },
      { term: "present tense", ur: "موجودہ زمانہ", sd: "موجوده زمانو" },
      { term: "past tense", ur: "ماضی کا زمانہ", sd: "ماضي جو زمانو" },
      { term: "subject", ur: "فاعل", sd: "فاعل" },
      { term: "helping verb", ur: "معاون فعل", sd: "مددگار فعل" },
    ],
    sections: [
      { heading: "Use", body: "To show possession, relationships, experiences, or things someone has. <strong>Have/has</strong> are present; <strong>had</strong> is past for all subjects. These verbs say what someone owns, what they are related to, or what they have experienced. For example, 'I have a book', 'She has two brothers', 'They had a car last year'. They also work as helping verbs in perfect tenses ('I have finished')." },
      {
        heading: "Present Forms",
        body: "Use have with I/we/you/they and has with he/she/it. The table below shows the full pattern for present-tense possession.",
        table: {
          headers: ["Subject", "Verb"],
          rows: [
            ["I / We / You / They", "have"],
            ["He / She / It", "has"],
          ],
        },
      },
      {
        heading: "Past Form",
        body: "<strong>had</strong> — same for all subjects. Use had with any subject (I, he, she, we, they) to talk about past possession, relationships, or experiences.",
      },
      {
        heading: "Examples",
        body: "",
        examples: [
          "I have a book. (میرے پاس ایک کتاب ہے)",
          "She has two brothers. (اس کے دو بھائی ہیں)",
          "They have a car. (ان کے پاس گاڑی ہے)",
          "He had a headache yesterday. (اسے کل سر درد تھا)",
          "We had dinner at 8 PM. (ہم نے رات 8 بجے کھانا کھایا)",
        ],
        examplesTr: [
          {
            en: "I have a book.",
            ur: "میرے پاس ایک کتاب ہے۔",
            sd: "مون وٽ هڪ ڪتاب آهي.",
          },
          {
            en: "She has two brothers.",
            ur: "اس کے دو بھائی ہیں۔",
            sd: "هن جا ٻه ڀاءُ آهن.",
          },
          {
            en: "They have a car.",
            ur: "ان کے پاس گاڑی ہے۔",
            sd: "هنن وٽ ڪار آهي.",
          },
          {
            en: "He had a headache yesterday.",
            ur: "اسے کل سر درد تھا۔",
            sd: "هن کي ڪالهه سر درد هو.",
          },
          {
            en: "We had dinner at 8 PM.",
            ur: "ہم نے رات 8 بجے کھانا کھایا۔",
            sd: "اسين رات 8 وڄي کائڻي کاڌي.",
          },
        ],
      },
      { heading: "Common Mistakes", body: "He have → <strong>He has</strong>. After does/did, use <strong>have</strong>: <em>Does he have...?</em> not <em>Does he has...?</em> <em>Did she have...?</em> not <em>Did she had...?</em> Remember that does and did already carry the tense, so the main verb stays in its base form 'have'." },
    ],
  },
  // === PART D: HAVE TO / HAS TO / HAD TO ===
  {
    title: "15. Have To / Has To / Had To",
    subtitle: "Expressing necessity, duty, obligation",
    icon: "Settings",
    vocabulary: [
      { term: "have to", ur: "have to (کرنا ضروری ہے)", sd: "have to (ڪرڻ ضروري آهي)" },
      { term: "has to", ur: "has to (کرنا ضروری ہے)", sd: "has to (ڪرڻ ضروري آهي)" },
      { term: "had to", ur: "had to (کرنا پڑا)", sd: "had to (ڪرڻو پيو)" },
      { term: "necessity", ur: "ضرورت", sd: "ضرورت" },
      { term: "duty", ur: "فرض", sd: "فرض" },
      { term: "obligation", ur: "پابندی", sd: "پابندي" },
      { term: "must", ur: "must (لازمی)", sd: "must (لازمي)" },
      { term: "need to", ur: "need to (ضرورت ہے)", sd: "need to (ضرورت آهي)" },
    ],
    sections: [
      { heading: "Use", body: "To express necessity, duty, obligation, or something that is required. Have to / has to / had to tell us that something must be done — there is no choice. For example, 'I have to finish my homework' means the homework is required, not optional. The present forms (have to / has to) are used now; had to is the past form for all subjects. These phrases are close in meaning to 'must', but they are more common in everyday speech." },
      { heading: "Nishaniyan", body: "These words are the nishaniyan (signs) of have to / has to / had to: must, need to, have to, has to, had to; words such as every day, tomorrow, yesterday may show the time. They all point to necessity or duty. When one of them appears, the verb that follows is always in V1 — there is no -s ending with has to (say 'She has to go', not 'She has to goes')." },
      {
        heading: "Present Forms",
        body: "Use have to with I/we/you/they and has to with he/she/it. The table below shows the full pattern with an example for each.",
        table: {
          headers: ["Subject", "Form", "Example"],
          rows: [
            ["I / We / You / They", "have to + V1", "I have to go now."],
            ["He / She / It", "has to + V1", "She has to study."],
          ],
        },
      },
      {
        heading: "Past Form",
        body: "<strong>had to + V1</strong> — same for all subjects.",
        examples: [
          "I had to leave early. (مجھے جلدی جانا پڑا)",
          "She had to cook dinner. (اسے کھانا پکانا پڑا)",
          "They had to walk home. (انہیں پیدل گھر جانا پڑا)",
        ],
        examplesTr: [
          {
            en: "I had to leave early.",
            ur: "مجھے جلدی جانا پڑا۔",
            sd: "مون کي جلدي وڃڻو پيو.",
          },
          {
            en: "She had to cook dinner.",
            ur: "اسے کھانا پکانا پڑا۔",
            sd: "هن کي کائڻي پچائڻي پئي.",
          },
          {
            en: "They had to walk home.",
            ur: "انہیں پیدل گھر جانا پڑا۔",
            sd: "هنن کي پيرن تي گهر وڃڻو پيو.",
          },
        ],
      },
      {
        heading: "Examples",
        body: "",
        examples: [
          "I have to finish my homework. (مجھے اپنا ہوم ورک مکمل کرنا ہے)",
          "She has to wear a uniform. (اسے یونیفارم پہننا ہے)",
          "They have to attend the class. (انہیں کلاس میں شامل ہونا ہے)",
          "He had to work late yesterday. (اسے کل دیر تک کام کرنا پڑا)",
          "We have to leave by 5 PM. (ہمیں شام 5 بجے تک جانا ہے)",
        ],
        examplesTr: [
          {
            en: "I have to finish my homework.",
            ur: "مجھے اپنا ہوم ورک مکمل کرنا ہے۔",
            sd: "مون کي پنهنجو گهر ڪم مڪمل ڪرڻو آهي.",
          },
          {
            en: "She has to wear a uniform.",
            ur: "اسے یونیفارم پہننا ہے۔",
            sd: "هن کي يونيفورم پائڻي آهي.",
          },
          {
            en: "They have to attend the class.",
            ur: "انہیں کلاس میں شامل ہونا ہے۔",
            sd: "هنن کي ڪلاس ۾ شامل ٿيڻو آهي.",
          },
          {
            en: "He had to work late yesterday.",
            ur: "اسے کل دیر تک کام کرنا پڑا۔",
            sd: "هن کي ڪالهه دير تائين ڪم ڪرڻو پيو.",
          },
          {
            en: "We have to leave by 5 PM.",
            ur: "ہمیں شام 5 بجے تک جانا ہے۔",
            sd: "اسان کي شام 5 وڄي تائين وڃڻو آهي.",
          },
        ],
      },
      { heading: "Common Mistakes", body: "Does she has to → <strong>Does she have to</strong>. Did he had to → <strong>Did he have to</strong>. After does/did, use <strong>have</strong>, not has/had. Remember: does and did already carry the tense, so the main verb stays in 'have'." },
    ],
  },
  // === PART E: DEMONSTRATIVE ADJECTIVES ===
  {
    title: "16. Demonstrative Adjectives — this, that, these, those",
    subtitle: "Pointing to people or things with distance and number",
    icon: "MapPin",
    vocabulary: [
      { term: "demonstrative adjective", ur: "اشاری صفت", sd: "اشاري صفت" },
      { term: "this", ur: "یہ (قریب، واحد)", sd: "هي (ويجھو، واحد)" },
      { term: "that", ur: "وہ (دور، واحد)", sd: "اهو (پري، واحد)" },
      { term: "these", ur: "یہ (قریب، جمع)", sd: "هي (ويجھا، جمع)" },
      { term: "those", ur: "وہ (دور، جمع)", sd: "اهي (پري، جمع)" },
      { term: "near", ur: "قریب", sd: "ويجھو" },
      { term: "far", ur: "دور", sd: "پري" },
      { term: "singular", ur: "واحد", sd: "واحد" },
      { term: "plural", ur: "جمع", sd: "جمع" },
      { term: "distance", ur: "فاصلہ", sd: "فاصلو" },
      { term: "number", ur: "عدد", sd: "عدد" },
    ],
    sections: [
      { heading: "Use", body: "These words point to people or things and come before a noun. They show distance and number. Demonstrative adjectives tell the listener which person or thing we are talking about by pointing to it — near or far, one or many. For example, 'this book' (here, one book), 'those students' (there, many students). They are called demonstrative because they demonstrate or point out a specific noun." },
      {
        heading: "The Four Demonstratives",
        body: "This table shows all four demonstrative adjectives. The first column is the word, then its distance from the speaker (near or far), its number (singular or plural), and an example sentence.",
        table: {
          headers: ["Word", "Distance", "Number", "Example"],
          rows: [
            ["this", "near", "singular", "This book is mine."],
            ["that", "far", "singular", "That house is big."],
            ["these", "near", "plural", "These pens are blue."],
            ["those", "far", "plural", "Those students are bright."],
          ],
        },
      },
      {
        heading: "Examples",
        body: "",
        examples: [
          "This is my pen. (یہ میرا قلم ہے)",
          "That is your bag. (وہ آپ کا بیگ ہے)",
          "These are our books. (یہ ہماری کتابیں ہیں)",
          "Those are their chairs. (وہ ان کی کرسیاں ہیں)",
          "This student is very intelligent. (یہ طالب علم بہت ذہین ہے)",
        ],
        examplesTr: [
          {
            en: "This is my pen.",
            ur: "یہ میرا قلم ہے۔",
            sd: "هي منهنجو قلم آهي.",
          },
          {
            en: "That is your bag.",
            ur: "وہ آپ کا بیگ ہے۔",
            sd: "اهو توهان جو بيگ آهي.",
          },
          {
            en: "These are our books.",
            ur: "یہ ہماری کتابیں ہیں۔",
            sd: "هي اسان جا ڪتاب آهن.",
          },
          {
            en: "Those are their chairs.",
            ur: "وہ ان کی کرسیاں ہیں۔",
            sd: "اهي هنن جون ڪرسيون آهن.",
          },
          {
            en: "This student is very intelligent.",
            ur: "یہ طالب علم بہت ذہین ہے۔",
            sd: "هي شاگرد تمام هوشيار آهي.",
          },
        ],
      },
      { heading: "Common Mistakes", body: "<strong>This/these</strong> are for things near the speaker. <strong>That/those</strong> are for things farther away. Match number: <em>this book</em> (singular) but <em>these books</em> (plural). A common slip is mixing near/far or singular/plural: 'These book is mine' should be 'This book is mine' or 'These books are mine'." },
    ],
  },
];

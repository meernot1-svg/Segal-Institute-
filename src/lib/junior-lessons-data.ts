/**
 * Junior-tier lessons — extracted from "Junior English Grammar COMPLETE Workbook" PDF.
 * 16 lessons covering: 12 Tenses + To Be Verbs + Have/Has/Had + Have To/Has To/Had To
 * + Demonstrative Adjectives.
 * Each lesson follows the workbook's pattern: Use → Nishaniyan → Formation → Examples
 * → Four Forms → Common Mistakes.
 */

import type { Lesson } from "./basic-lessons-data";

export const JUNIOR_LESSONS: Lesson[] = [
  // === PART A: 12 TENSES ===
  {
    title: "1. Present Simple",
    subtitle: "Habits, routines, facts and general truths",
    icon: "Clock",
    sections: [
      { heading: "Use", body: "Habits, routines, repeated actions, facts and general truths." },
      { heading: "Nishaniyan (Identifying Signs)", body: "every day, usually, always, often, sometimes, generally, daily" },
      { heading: "Formation", body: "<strong>Subject + V1(s/es) + Object</strong><br>Third person singular (he/she/it) adds -s or -es." },
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
      { heading: "Common Mistakes", body: "Do <strong>not</strong> use V2 after does/did; use V1: <em>Does she play?</em> not <em>Does she played?</em>" },
    ],
  },
  {
    title: "2. Present Continuous",
    subtitle: "Actions happening now or around the present time",
    icon: "Clock",
    sections: [
      { heading: "Use", body: "An action happening now or around the present time." },
      { heading: "Nishaniyan (Identifying Signs)", body: "now, right now, at the moment, currently, today" },
      { heading: "Formation", body: "<strong>Subject + am/is/are + V-ing + Object</strong>" },
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
      { heading: "Common Mistakes", body: "Use the correct form of <strong>be</strong> before V-ing. <em>I am going</em> not <em>I going</em>." },
    ],
  },
  {
    title: "3. Present Perfect",
    subtitle: "Recently completed actions connected to the present",
    icon: "Clock",
    sections: [
      { heading: "Use", body: "An action completed recently or with a result connected to the present." },
      { heading: "Nishaniyan (Identifying Signs)", body: "already, just, yet, ever, never, so far, recently" },
      { heading: "Formation", body: "<strong>Subject + has/have + V3 + Object</strong>" },
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
      { heading: "Common Mistakes", body: "Use <strong>has</strong> with he/she/it and <strong>have</strong> with I/we/you/they." },
    ],
  },
  {
    title: "4. Present Perfect Continuous",
    subtitle: "Actions that started in the past and continue up to now",
    icon: "Clock",
    sections: [
      { heading: "Use", body: "An action that started in the past and has continued up to now." },
      { heading: "Nishaniyan (Identifying Signs)", body: "since, for, all day, all morning, how long" },
      { heading: "Formation", body: "<strong>Subject + has/have been + V-ing + Object</strong>" },
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
      { heading: "Common Mistakes", body: "Don't forget <strong>been</strong>: <em>I have been working</em> not <em>I have working</em>." },
    ],
  },
  {
    title: "5. Past Simple",
    subtitle: "Completed actions in the past",
    icon: "Clock",
    sections: [
      { heading: "Use", body: "Completed actions in the past." },
      { heading: "Nishaniyan (Identifying Signs)", body: "yesterday, last night, last week, ago, in 2020" },
      { heading: "Formation", body: "<strong>Subject + V2 + Object</strong>" },
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
      { heading: "Common Mistakes", body: "After <strong>did/did not</strong>, always use <strong>V1</strong>: <em>Did she go?</em> not <em>Did she went?</em>" },
    ],
  },
  {
    title: "6. Past Continuous",
    subtitle: "Actions in progress at a particular time in the past",
    icon: "Clock",
    sections: [
      { heading: "Use", body: "An action that was in progress at a particular time in the past." },
      { heading: "Nishaniyan (Identifying Signs)", body: "while, when, at 5 pm yesterday, at that time" },
      { heading: "Formation", body: "<strong>Subject + was/were + V-ing + Object</strong>" },
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
      { heading: "Common Mistakes", body: "Use <strong>was</strong> with I/he/she/it and <strong>were</strong> with we/you/they." },
    ],
  },
  {
    title: "7. Past Perfect",
    subtitle: "Actions completed before another past action",
    icon: "Clock",
    sections: [
      { heading: "Use", body: "An action completed before another past action." },
      { heading: "Nishaniyan (Identifying Signs)", body: "before, after, already, by the time" },
      { heading: "Formation", body: "<strong>Subject + had + V3 + Object</strong>" },
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
      { heading: "Common Mistakes", body: "<strong>had</strong> is the same for all subjects. Don't use <em>has</em> or <em>have</em> in past perfect." },
    ],
  },
  {
    title: "8. Past Perfect Continuous",
    subtitle: "Actions that continued for a period before another past event",
    icon: "Clock",
    sections: [
      { heading: "Use", body: "An action that continued for a period before another past event." },
      { heading: "Nishaniyan (Identifying Signs)", body: "for, since, before, until then" },
      { heading: "Formation", body: "<strong>Subject + had been + V-ing + Object</strong>" },
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
      { heading: "Common Mistakes", body: "Don't forget <strong>been</strong>: <em>had been working</em> not <em>had working</em>." },
    ],
  },
  {
    title: "9. Future Simple",
    subtitle: "Predictions, decisions, promises and future actions",
    icon: "Clock",
    sections: [
      { heading: "Use", body: "Predictions, decisions, promises and future actions." },
      { heading: "Nishaniyan (Identifying Signs)", body: "tomorrow, next week, next year, soon, later" },
      { heading: "Formation", body: "<strong>Subject + will + V1 + Object</strong>" },
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
      { heading: "Common Mistakes", body: "After <strong>will</strong>, always use <strong>V1</strong>: <em>I will go</em> not <em>I will goes</em> or <em>I will went</em>." },
    ],
  },
  {
    title: "10. Future Continuous",
    subtitle: "Actions that will be in progress at a future time",
    icon: "Clock",
    sections: [
      { heading: "Use", body: "An action that will be in progress at a future time." },
      { heading: "Nishaniyan (Identifying Signs)", body: "this time tomorrow, at 8 pm tomorrow, next week at this time" },
      { heading: "Formation", body: "<strong>Subject + will be + V-ing + Object</strong>" },
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
      { heading: "Common Mistakes", body: "Don't forget <strong>be</strong>: <em>will be going</em> not <em>will going</em>." },
    ],
  },
  {
    title: "11. Future Perfect",
    subtitle: "Actions that will be completed before a future time",
    icon: "Clock",
    sections: [
      { heading: "Use", body: "An action that will be completed before a future time." },
      { heading: "Nishaniyan (Identifying Signs)", body: "by, by the time, before, by next week" },
      { heading: "Formation", body: "<strong>Subject + will have + V3 + Object</strong>" },
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
      { heading: "Common Mistakes", body: "Don't forget <strong>have</strong>: <em>will have finished</em> not <em>will finished</em>." },
    ],
  },
  {
    title: "12. Future Perfect Continuous",
    subtitle: "Actions that will have continued for a period up to a future time",
    icon: "Clock",
    sections: [
      { heading: "Use", body: "An action that will have continued for a period up to a future time." },
      { heading: "Nishaniyan (Identifying Signs)", body: "for, by then, by next month, for two hours" },
      { heading: "Formation", body: "<strong>Subject + will have been + V-ing + Object</strong>" },
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
      { heading: "Common Mistakes", body: "Don't forget <strong>been</strong>: <em>will have been working</em> not <em>will have working</em>." },
    ],
  },
  // === PART B: TO BE VERBS ===
  {
    title: "13. To Be Verbs — am, is, are, was, were",
    subtitle: "Describing identity, condition, location, age, or state",
    icon: "Settings",
    sections: [
      { heading: "Use", body: "To describe a person/thing, identity, condition, location, age, or state. These verbs can also act as helping verbs in continuous tenses." },
      {
        heading: "Present Forms (am/is/are)",
        body: "Used for present states, descriptions, and continuous tenses.",
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
        body: "Used for past states, descriptions, and past continuous tenses.",
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
      },
      { heading: "Common Mistakes", body: "I is → <strong>I am</strong>. He are → <strong>He is</strong>. They is → <strong>They are</strong>. Use <strong>was</strong> with I/he/she/it and <strong>were</strong> with we/you/they." },
    ],
  },
  // === PART C: HAVE / HAS / HAD ===
  {
    title: "14. Have / Has / Had",
    subtitle: "Showing possession, relationships, experiences",
    icon: "Settings",
    sections: [
      { heading: "Use", body: "To show possession, relationships, experiences, or things someone has. <strong>Have/has</strong> are present; <strong>had</strong> is past for all subjects." },
      {
        heading: "Present Forms",
        body: "",
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
        body: "<strong>had</strong> — same for all subjects.",
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
      },
      { heading: "Common Mistakes", body: "He have → <strong>He has</strong>. After does/did, use <strong>have</strong>: <em>Does he have...?</em> not <em>Does he has...?</em> <em>Did she have...?</em> not <em>Did she had...?</em>" },
    ],
  },
  // === PART D: HAVE TO / HAS TO / HAD TO ===
  {
    title: "15. Have To / Has To / Had To",
    subtitle: "Expressing necessity, duty, obligation",
    icon: "Settings",
    sections: [
      { heading: "Use", body: "To express necessity, duty, obligation, or something that is required." },
      { heading: "Nishaniyan", body: "must, need to, have to, has to, had to; words such as every day, tomorrow, yesterday may show the time." },
      {
        heading: "Present Forms",
        body: "",
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
      },
      { heading: "Common Mistakes", body: "Does she has to → <strong>Does she have to</strong>. Did he had to → <strong>Did he have to</strong>. After does/did, use <strong>have</strong>, not has/had." },
    ],
  },
  // === PART E: DEMONSTRATIVE ADJECTIVES ===
  {
    title: "16. Demonstrative Adjectives — this, that, these, those",
    subtitle: "Pointing to people or things with distance and number",
    icon: "MapPin",
    sections: [
      { heading: "Use", body: "These words point to people or things and come before a noun. They show distance and number." },
      {
        heading: "The Four Demonstratives",
        body: "",
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
      },
      { heading: "Common Mistakes", body: "<strong>This/these</strong> are for things near the speaker. <strong>That/those</strong> are for things farther away. Match number: <em>this book</em> (singular) but <em>these books</em> (plural)." },
    ],
  },
];

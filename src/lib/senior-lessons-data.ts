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

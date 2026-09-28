/**
 * Tier content data — irregular verbs, regular verbs, and plural nouns
 * for the Basic tier (accessible to all badge levels).
 *
 * Each irregular verb has V1, V2, V3, and an Urdu meaning.
 * Regular verbs also include present participle (-ing) and 3rd person (-s).
 */

export type TierVerb = {
  v1: string;
  v2: string;
  v3: string;
  v2Alts?: string[];
  v3Alts?: string[];
  meaningUr: string;
  difficulty: 1 | 2 | 3;
  type: "irregular" | "regular";
};

export type TierNoun = {
  singular: string;
  plural: string;
  category: string;
};

// ---------------------------------------------------------------------------
// IRREGULAR VERBS (Basic tier)
// ---------------------------------------------------------------------------

export const IRREGULAR_VERBS: TierVerb[] = [
  { v1: "arise", v2: "arose", v3: "arisen", meaningUr: "اٹھنا، پیدا ہونا", difficulty: 2, type: "irregular" },
  { v1: "awake", v2: "awoke", v3: "awoken", v2Alts: ["awaked"], v3Alts: ["awaked"], meaningUr: "جاگنا", difficulty: 2, type: "irregular" },
  { v1: "bear", v2: "bore", v3: "borne", v3Alts: ["born"], meaningUr: "برداشت کرنا، جنا", difficulty: 2, type: "irregular" },
  { v1: "beat", v2: "beat", v3: "beaten", meaningUr: "مارنا، شکست دینا", difficulty: 2, type: "irregular" },
  { v1: "become", v2: "became", v3: "become", meaningUr: "بننا، ہونا", difficulty: 1, type: "irregular" },
  { v1: "begin", v2: "began", v3: "begun", meaningUr: "شروع کرنا", difficulty: 1, type: "irregular" },
  { v1: "bend", v2: "bent", v3: "bent", meaningUr: "موڑنا، جھکنا", difficulty: 2, type: "irregular" },
  { v1: "bet", v2: "bet", v3: "bet", v2Alts: ["betted"], v3Alts: ["betted"], meaningUr: "شرط لگانا", difficulty: 2, type: "irregular" },
  { v1: "bid", v2: "bid", v3: "bid", meaningUr: "بولی لگانا", difficulty: 3, type: "irregular" },
  { v1: "bind", v2: "bound", v3: "bound", meaningUr: "باندھنا", difficulty: 2, type: "irregular" },
  { v1: "bite", v2: "bit", v3: "bitten", v3Alts: ["bit"], meaningUr: "کاٹنا، ڈسنا", difficulty: 2, type: "irregular" },
  { v1: "bleed", v2: "bled", v3: "bled", meaningUr: "خون بہنا", difficulty: 2, type: "irregular" },
  { v1: "blow", v2: "blew", v3: "blown", meaningUr: "پھونک مارنا", difficulty: 2, type: "irregular" },
  { v1: "break", v2: "broke", v3: "broken", meaningUr: "توڑنا", difficulty: 1, type: "irregular" },
  { v1: "breed", v2: "bred", v3: "bred", meaningUr: "پالنا، نسل بڑھانا", difficulty: 3, type: "irregular" },
  { v1: "bring", v2: "brought", v3: "brought", meaningUr: "لانا", difficulty: 1, type: "irregular" },
  { v1: "broadcast", v2: "broadcast", v3: "broadcast", v2Alts: ["broadcasted"], v3Alts: ["broadcasted"], meaningUr: "نشر کرنا", difficulty: 3, type: "irregular" },
  { v1: "build", v2: "built", v3: "built", meaningUr: "بنانا", difficulty: 1, type: "irregular" },
  { v1: "burn", v2: "burnt", v3: "burnt", v2Alts: ["burned"], v3Alts: ["burned"], meaningUr: "جلنا، جلانا", difficulty: 2, type: "irregular" },
  { v1: "burst", v2: "burst", v3: "burst", meaningUr: "پھٹنا", difficulty: 3, type: "irregular" },
  { v1: "buy", v2: "bought", v3: "bought", meaningUr: "خریدنا", difficulty: 1, type: "irregular" },
  { v1: "catch", v2: "caught", v3: "caught", meaningUr: "پکڑنا", difficulty: 1, type: "irregular" },
  { v1: "choose", v2: "chose", v3: "chosen", meaningUr: "چننا، منتخب کرنا", difficulty: 1, type: "irregular" },
  { v1: "cling", v2: "clung", v3: "clung", meaningUr: "چمٹنا", difficulty: 3, type: "irregular" },
  { v1: "come", v2: "came", v3: "come", meaningUr: "آنا", difficulty: 1, type: "irregular" },
  { v1: "cost", v2: "cost", v3: "cost", meaningUr: "قیمت ہونا", difficulty: 2, type: "irregular" },
  { v1: "creep", v2: "crept", v3: "crept", meaningUr: "رینگنا", difficulty: 3, type: "irregular" },
  { v1: "cut", v2: "cut", v3: "cut", meaningUr: "کاٹنا", difficulty: 1, type: "irregular" },
  { v1: "deal", v2: "dealt", v3: "dealt", meaningUr: "نبٹنا، سلوک کرنا", difficulty: 2, type: "irregular" },
  { v1: "dig", v2: "dug", v3: "dug", meaningUr: "کھودنا", difficulty: 2, type: "irregular" },
  { v1: "do", v2: "did", v3: "done", meaningUr: "کرنا", difficulty: 1, type: "irregular" },
  { v1: "draw", v2: "drew", v3: "drawn", meaningUr: "ڈرائنگ بنانا، کھینچنا", difficulty: 2, type: "irregular" },
  { v1: "dream", v2: "dreamt", v3: "dreamt", v2Alts: ["dreamed"], v3Alts: ["dreamed"], meaningUr: "خواب دیکھنا", difficulty: 2, type: "irregular" },
  { v1: "drink", v2: "drank", v3: "drunk", meaningUr: "پینا", difficulty: 1, type: "irregular" },
  { v1: "drive", v2: "drove", v3: "driven", meaningUr: "گاڑی چلانا", difficulty: 1, type: "irregular" },
  { v1: "eat", v2: "ate", v3: "eaten", meaningUr: "کھانا", difficulty: 1, type: "irregular" },
  { v1: "fall", v2: "fell", v3: "fallen", meaningUr: "گرنا", difficulty: 1, type: "irregular" },
  { v1: "feed", v2: "fed", v3: "fed", meaningUr: "کھانا کھلانا", difficulty: 2, type: "irregular" },
  { v1: "feel", v2: "felt", v3: "felt", meaningUr: "محسوس کرنا", difficulty: 1, type: "irregular" },
  { v1: "fight", v2: "fought", v3: "fought", meaningUr: "لڑنا", difficulty: 2, type: "irregular" },
  { v1: "find", v2: "found", v3: "found", meaningUr: "تلاش کرنا", difficulty: 1, type: "irregular" },
  { v1: "flee", v2: "fled", v3: "fled", meaningUr: "بھاگ جانا", difficulty: 3, type: "irregular" },
  { v1: "fly", v2: "flew", v3: "flown", meaningUr: "اڑنا", difficulty: 2, type: "irregular" },
  { v1: "forbid", v2: "forbade", v3: "forbidden", v2Alts: ["forbad"], meaningUr: "منع کرنا", difficulty: 3, type: "irregular" },
  { v1: "forget", v2: "forgot", v3: "forgotten", v3Alts: ["forgot"], meaningUr: "بھولنا", difficulty: 2, type: "irregular" },
  { v1: "forgive", v2: "forgave", v3: "forgiven", meaningUr: "معاف کرنا", difficulty: 2, type: "irregular" },
  { v1: "freeze", v2: "froze", v3: "frozen", meaningUr: "جم جانا", difficulty: 2, type: "irregular" },
  { v1: "get", v2: "got", v3: "gotten", v3Alts: ["got"], meaningUr: "حاصل کرنا", difficulty: 1, type: "irregular" },
  { v1: "give", v2: "gave", v3: "given", meaningUr: "دینا", difficulty: 1, type: "irregular" },
  { v1: "go", v2: "went", v3: "gone", meaningUr: "جانا", difficulty: 1, type: "irregular" },
  { v1: "grind", v2: "ground", v3: "ground", meaningUr: "پیسنا", difficulty: 3, type: "irregular" },
  { v1: "grow", v2: "grew", v3: "grown", meaningUr: "بڑھنا، اگانا", difficulty: 2, type: "irregular" },
  { v1: "hang", v2: "hung", v3: "hung", v2Alts: ["hanged"], v3Alts: ["hanged"], meaningUr: "لٹکنا، پھانسی دینا", difficulty: 2, type: "irregular" },
  { v1: "have", v2: "had", v3: "had", meaningUr: "رکھنا، پاس ہونا", difficulty: 1, type: "irregular" },
  { v1: "hear", v2: "heard", v3: "heard", meaningUr: "سننا", difficulty: 1, type: "irregular" },
  { v1: "hide", v2: "hid", v3: "hidden", v3Alts: ["hid"], meaningUr: "چھپانا", difficulty: 2, type: "irregular" },
  { v1: "hit", v2: "hit", v3: "hit", meaningUr: "مارنا، ٹکرانا", difficulty: 1, type: "irregular" },
  { v1: "hold", v2: "held", v3: "held", meaningUr: "پکڑنا، رکھنا", difficulty: 1, type: "irregular" },
  { v1: "hurt", v2: "hurt", v3: "hurt", meaningUr: "زخم پہنچانا، تکلیف ہونا", difficulty: 2, type: "irregular" },
  { v1: "keep", v2: "kept", v3: "kept", meaningUr: "رکھنا، محفوظ کرنا", difficulty: 1, type: "irregular" },
  { v1: "kneel", v2: "knelt", v3: "knelt", v2Alts: ["kneeled"], v3Alts: ["kneeled"], meaningUr: "گھٹنوں پر بیٹھنا", difficulty: 3, type: "irregular" },
  { v1: "know", v2: "knew", v3: "known", meaningUr: "جاننا", difficulty: 1, type: "irregular" },
  { v1: "lay", v2: "laid", v3: "laid", meaningUr: "رکھنا، بچھانا", difficulty: 2, type: "irregular" },
  { v1: "lead", v2: "led", v3: "led", meaningUr: "رہنمائی کرنا، آگے ہونا", difficulty: 2, type: "irregular" },
  { v1: "lean", v2: "leant", v3: "leant", v2Alts: ["leaned"], v3Alts: ["leaned"], meaningUr: "جھکنا، ٹیک لگانا", difficulty: 2, type: "irregular" },
  { v1: "leap", v2: "leapt", v3: "leapt", v2Alts: ["leaped"], v3Alts: ["leaped"], meaningUr: "چھلانگ لگانا", difficulty: 3, type: "irregular" },
  { v1: "learn", v2: "learnt", v3: "learnt", v2Alts: ["learned"], v3Alts: ["learned"], meaningUr: "سیکھنا", difficulty: 1, type: "irregular" },
  { v1: "leave", v2: "left", v3: "left", meaningUr: "چھوڑنا، جانا", difficulty: 1, type: "irregular" },
  { v1: "lend", v2: "lent", v3: "lent", meaningUr: "ادھار دینا", difficulty: 2, type: "irregular" },
  { v1: "let", v2: "let", v3: "let", meaningUr: "اجازت دینا", difficulty: 2, type: "irregular" },
  { v1: "lie", v2: "lay", v3: "lain", meaningUr: "لیٹنا، جھوٹ بولنا", difficulty: 3, type: "irregular" },
  { v1: "light", v2: "lit", v3: "lit", v2Alts: ["lighted"], v3Alts: ["lighted"], meaningUr: "جلانا، روشنی کرنا", difficulty: 2, type: "irregular" },
  { v1: "lose", v2: "lost", v3: "lost", meaningUr: "کھونا", difficulty: 1, type: "irregular" },
  { v1: "make", v2: "made", v3: "made", meaningUr: "بنانا", difficulty: 1, type: "irregular" },
  { v1: "mean", v2: "meant", v3: "meant", meaningUr: "مطلب ہونا", difficulty: 2, type: "irregular" },
  { v1: "meet", v2: "met", v3: "met", meaningUr: "ملنا", difficulty: 1, type: "irregular" },
  { v1: "pay", v2: "paid", v3: "paid", meaningUr: "ادا کرنا", difficulty: 1, type: "irregular" },
  { v1: "put", v2: "put", v3: "put", meaningUr: "رکھنا", difficulty: 1, type: "irregular" },
  { v1: "read", v2: "read", v3: "read", meaningUr: "پڑھنا", difficulty: 1, type: "irregular" },
  { v1: "ride", v2: "rode", v3: "ridden", meaningUr: "سواری پر سفر کرنا", difficulty: 2, type: "irregular" },
  { v1: "ring", v2: "rang", v3: "rung", meaningUr: "گھنٹی بجانا", difficulty: 2, type: "irregular" },
  { v1: "rise", v2: "rose", v3: "risen", meaningUr: "اٹھنا، بڑھنا", difficulty: 2, type: "irregular" },
  { v1: "run", v2: "ran", v3: "run", meaningUr: "دوڑنا", difficulty: 1, type: "irregular" },
  { v1: "say", v2: "said", v3: "said", meaningUr: "کہنا", difficulty: 1, type: "irregular" },
  { v1: "see", v2: "saw", v3: "seen", meaningUr: "دیکھنا", difficulty: 1, type: "irregular" },
  { v1: "sell", v2: "sold", v3: "sold", meaningUr: "بیچنا", difficulty: 2, type: "irregular" },
  { v1: "send", v2: "sent", v3: "sent", meaningUr: "بھیجنا", difficulty: 2, type: "irregular" },
  { v1: "set", v2: "set", v3: "set", meaningUr: "رکھنا، مقرر کرنا", difficulty: 2, type: "irregular" },
  { v1: "shake", v2: "shook", v3: "shaken", meaningUr: "ہلانا", difficulty: 2, type: "irregular" },
  { v1: "shine", v2: "shone", v3: "shone", v2Alts: ["shined"], v3Alts: ["shined"], meaningUr: "چمکنا", difficulty: 2, type: "irregular" },
  { v1: "shoot", v2: "shot", v3: "shot", meaningUr: "گولی مارنا", difficulty: 2, type: "irregular" },
  { v1: "show", v2: "showed", v3: "shown", v3Alts: ["showed"], meaningUr: "دکھانا", difficulty: 2, type: "irregular" },
  { v1: "shut", v2: "shut", v3: "shut", meaningUr: "بند کرنا", difficulty: 2, type: "irregular" },
  { v1: "sing", v2: "sang", v3: "sung", meaningUr: "گانا", difficulty: 2, type: "irregular" },
  { v1: "sink", v2: "sank", v3: "sunk", meaningUr: "ڈوبنا", difficulty: 2, type: "irregular" },
  { v1: "sit", v2: "sat", v3: "sat", meaningUr: "بیٹھنا", difficulty: 1, type: "irregular" },
  { v1: "sleep", v2: "slept", v3: "slept", meaningUr: "سونا", difficulty: 1, type: "irregular" },
  { v1: "slide", v2: "slid", v3: "slid", v3Alts: ["slidden"], meaningUr: "پھسلنا", difficulty: 3, type: "irregular" },
  { v1: "speak", v2: "spoke", v3: "spoken", meaningUr: "بولنا", difficulty: 1, type: "irregular" },
  { v1: "spend", v2: "spent", v3: "spent", meaningUr: "خرچ کرنا", difficulty: 2, type: "irregular" },
  { v1: "stand", v2: "stood", v3: "stood", meaningUr: "کھڑا ہونا", difficulty: 1, type: "irregular" },
  { v1: "steal", v2: "stole", v3: "stolen", meaningUr: "چور کرنا", difficulty: 2, type: "irregular" },
  { v1: "stick", v2: "stuck", v3: "stuck", meaningUr: "چپکنا، ٹھہرنا", difficulty: 2, type: "irregular" },
  { v1: "sting", v2: "stung", v3: "stung", meaningUr: "ڈنگ مارنا", difficulty: 3, type: "irregular" },
  { v1: "swear", v2: "swore", v3: "sworn", meaningUr: "قسم کھانا", difficulty: 3, type: "irregular" },
  { v1: "sweep", v2: "swept", v3: "swept", meaningUr: "جھاڑو دینا", difficulty: 2, type: "irregular" },
  { v1: "swim", v2: "swam", v3: "swum", meaningUr: "تیرنا", difficulty: 2, type: "irregular" },
  { v1: "take", v2: "took", v3: "taken", meaningUr: "لینا", difficulty: 1, type: "irregular" },
  { v1: "teach", v2: "taught", v3: "taught", meaningUr: "پڑھانا", difficulty: 1, type: "irregular" },
  { v1: "tear", v2: "tore", v3: "torn", meaningUr: "پھاڑنا", difficulty: 2, type: "irregular" },
  { v1: "tell", v2: "told", v3: "told", meaningUr: "بتانا", difficulty: 1, type: "irregular" },
  { v1: "think", v2: "thought", v3: "thought", meaningUr: "سوچنا", difficulty: 1, type: "irregular" },
  { v1: "throw", v2: "threw", v3: "thrown", meaningUr: "پھینکنا", difficulty: 2, type: "irregular" },
  { v1: "understand", v2: "understood", v3: "understood", meaningUr: "سمجھنا", difficulty: 1, type: "irregular" },
  { v1: "wake", v2: "woke", v3: "woken", v2Alts: ["waked"], v3Alts: ["waked"], meaningUr: "جاگنا", difficulty: 2, type: "irregular" },
  { v1: "wear", v2: "wore", v3: "worn", meaningUr: "پہننا", difficulty: 2, type: "irregular" },
  { v1: "win", v2: "won", v3: "won", meaningUr: "جیتنا", difficulty: 1, type: "irregular" },
  { v1: "write", v2: "wrote", v3: "written", meaningUr: "لکھنا", difficulty: 1, type: "irregular" },
];

// ---------------------------------------------------------------------------
// REGULAR VERBS (Basic tier)
// ---------------------------------------------------------------------------

export const REGULAR_VERBS: TierVerb[] = [
  { v1: "climb", v2: "climbed", v3: "climbed", meaningUr: "چڑھنا", difficulty: 2, type: "regular" },
  { v1: "finish", v2: "finished", v3: "finished", meaningUr: "مکمل کرنا", difficulty: 1, type: "regular" },
  { v1: "preach", v2: "preached", v3: "preached", meaningUr: "وعظ کرنا، تبلیغ کرنا", difficulty: 3, type: "regular" },
  { v1: "walk", v2: "walked", v3: "walked", meaningUr: "چلنا", difficulty: 1, type: "regular" },
];

// ---------------------------------------------------------------------------
// SINGULAR AND PLURAL NOUNS (Basic tier — stored as ContentItem)
// ---------------------------------------------------------------------------

export const PLURAL_NOUNS: TierNoun[] = [
  // Regular (-s)
  { singular: "cat", plural: "cats", category: "Regular (-s)" },
  { singular: "dog", plural: "dogs", category: "Regular (-s)" },
  { singular: "house", plural: "houses", category: "Regular (-s)" },
  { singular: "apple", plural: "apples", category: "Regular (-s)" },
  { singular: "book", plural: "books", category: "Regular (-s)" },
  { singular: "pen", plural: "pens", category: "Regular (-s)" },
  { singular: "car", plural: "cars", category: "Regular (-s)" },
  { singular: "tree", plural: "trees", category: "Regular (-s)" },
  // Ending in -s, -ss, -sh, -ch, -x, -z (-es)
  { singular: "bus", plural: "buses", category: "Ending in -s/-ss/-sh/-ch/-x/-z (-es)" },
  { singular: "glass", plural: "glasses", category: "Ending in -s/-ss/-sh/-ch/-x/-z (-es)" },
  { singular: "brush", plural: "brushes", category: "Ending in -s/-ss/-sh/-ch/-x/-z (-es)" },
  { singular: "watch", plural: "watches", category: "Ending in -s/-ss/-sh/-ch/-x/-z (-es)" },
  { singular: "box", plural: "boxes", category: "Ending in -s/-ss/-sh/-ch/-x/-z (-es)" },
  { singular: "quiz", plural: "quizzes", category: "Ending in -s/-ss/-sh/-ch/-x/-z (-es)" },
  // Consonant + -y (-ies)
  { singular: "baby", plural: "babies", category: "Consonant + -y (-ies)" },
  { singular: "city", plural: "cities", category: "Consonant + -y (-ies)" },
  { singular: "country", plural: "countries", category: "Consonant + -y (-ies)" },
  { singular: "party", plural: "parties", category: "Consonant + -y (-ies)" },
  { singular: "family", plural: "families", category: "Consonant + -y (-ies)" },
  { singular: "story", plural: "stories", category: "Consonant + -y (-ies)" },
  // Vowel + -y (-s)
  { singular: "boy", plural: "boys", category: "Vowel + -y (-s)" },
  { singular: "key", plural: "keys", category: "Vowel + -y (-s)" },
  { singular: "toy", plural: "toys", category: "Vowel + -y (-s)" },
  { singular: "day", plural: "days", category: "Vowel + -y (-s)" },
  { singular: "monkey", plural: "monkeys", category: "Vowel + -y (-s)" },
  // Ending in -f / -fe (-ves)
  { singular: "leaf", plural: "leaves", category: "Ending in -f/-fe (-ves)" },
  { singular: "wolf", plural: "wolves", category: "Ending in -f/-fe (-ves)" },
  { singular: "life", plural: "lives", category: "Ending in -f/-fe (-ves)" },
  { singular: "knife", plural: "knives", category: "Ending in -f/-fe (-ves)" },
  { singular: "wife", plural: "wives", category: "Ending in -f/-fe (-ves)" },
  { singular: "half", plural: "halves", category: "Ending in -f/-fe (-ves)" },
  { singular: "calf", plural: "calves", category: "Ending in -f/-fe (-ves)" },
  { singular: "thief", plural: "thieves", category: "Ending in -f/-fe (-ves)" },
  { singular: "shelf", plural: "shelves", category: "Ending in -f/-fe (-ves)" },
  { singular: "loaf", plural: "loaves", category: "Ending in -f/-fe (-ves)" },
  // Ending in -o (-oes)
  { singular: "potato", plural: "potatoes", category: "Ending in -o (-oes)" },
  { singular: "tomato", plural: "tomatoes", category: "Ending in -o (-oes)" },
  { singular: "hero", plural: "heroes", category: "Ending in -o (-oes)" },
  { singular: "echo", plural: "echoes", category: "Ending in -o (-oes)" },
  { singular: "volcano", plural: "volcanoes", category: "Ending in -o (-oes)" },
  { singular: "mosquito", plural: "mosquitoes", category: "Ending in -o (-oes)" },
  // Irregular Plural
  { singular: "child", plural: "children", category: "Irregular Plural" },
  { singular: "man", plural: "men", category: "Irregular Plural" },
  { singular: "woman", plural: "women", category: "Irregular Plural" },
  { singular: "person", plural: "people", category: "Irregular Plural" },
  { singular: "tooth", plural: "teeth", category: "Irregular Plural" },
  { singular: "foot", plural: "feet", category: "Irregular Plural" },
  { singular: "mouse", plural: "mice", category: "Irregular Plural" },
  { singular: "goose", plural: "geese", category: "Irregular Plural" },
  { singular: "ox", plural: "oxen", category: "Irregular Plural" },
  // Foreign / Irregular Plural
  { singular: "cactus", plural: "cacti", category: "Foreign / Irregular Plural" },
  { singular: "nucleus", plural: "nuclei", category: "Foreign / Irregular Plural" },
  { singular: "syllabus", plural: "syllabi", category: "Foreign / Irregular Plural" },
  { singular: "focus", plural: "foci", category: "Foreign / Irregular Plural" },
  { singular: "fungus", plural: "fungi", category: "Foreign / Irregular Plural" },
  { singular: "datum", plural: "data", category: "Foreign / Irregular Plural" },
  { singular: "phenomenon", plural: "phenomena", category: "Foreign / Irregular Plural" },
  { singular: "criterion", plural: "criteria", category: "Foreign / Irregular Plural" },
  { singular: "analysis", plural: "analyses", category: "Foreign / Irregular Plural" },
  { singular: "basis", plural: "bases", category: "Foreign / Irregular Plural" },
  { singular: "crisis", plural: "crises", category: "Foreign / Irregular Plural" },
  { singular: "diagnosis", plural: "diagnoses", category: "Foreign / Irregular Plural" },
  { singular: "thesis", plural: "theses", category: "Foreign / Irregular Plural" },
  // Unchanging Plural
  { singular: "sheep", plural: "sheep", category: "Unchanging Plural" },
  { singular: "deer", plural: "deer", category: "Unchanging Plural" },
  { singular: "fish", plural: "fish", category: "Unchanging Plural" },
  { singular: "series", plural: "series", category: "Unchanging Plural" },
  { singular: "species", plural: "species", category: "Unchanging Plural" },
  { singular: "aircraft", plural: "aircraft", category: "Unchanging Plural" },
];

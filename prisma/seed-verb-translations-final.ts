/**
 * Seed the 30 verbs that are still missing Urdu + Sindhi meanings.
 *
 * Run with:
 *   DATABASE_URL="..." DIRECT_URL="..." bun run prisma/seed-verb-translations-final.ts
 *
 * This is idempotent — only updates verbs whose meaningUr or meaningSd is empty.
 *
 * Two groups:
 *  1) Verbs whose `meaning` field ALREADY contains Urdu (from the PDF import):
 *     bid, deal, do, dream, preach. For these we move the Urdu to meaningUr,
 *     add an English meaning, and add a Sindhi meaning.
 *  2) Verbs with an English `meaning` that need Urdu + Sindhi translations added.
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Group 1 — Urdu already in `meaning`, need to move it to meaningUr + add English + Sindhi
const URDU_IN_MEANING: Record<string, { en: string; sd: string }> = {
  bid:    { en: "to make an offer at an auction", sd: "ڀاڙو لڳائڻ" },
  deal:   { en: "to handle or distribute",          sd: "نبائڻ، سلو ڪرڻ" },
  do:     { en: "to perform or carry out",          sd: "ڪرڻ" },
  dream:  { en: "to see in sleep",                  sd: "خواب ڏسڻ" },
  preach: { en: "to give a religious talk",         sd: "وعظ ڪرڻ، تبليغ ڪرڻ" },
};

// Group 2 — English meaning present, add Urdu + Sindhi
const ENGLISH_ONLY: Record<string, { ur: string; sd: string }> = {
  analyze:  { ur: "تجزیہ کرنا",                     sd: "تجزيو ڪرڻ" },
  apply:    { ur: "درخواست دینا، لگانا",             sd: "درخواست ڏيڻ، لڳائڻ" },
  approach: { ur: "قریب آنا",                       sd: "ويجهو اچڻ" },
  approve:  { ur: "منظور کرنا",                     sd: "منظور ڪرڻ" },
  attract:  { ur: "کھینچنا، متوجہ کرنا",            sd: "ڪشش ڪرڻ، متوجهه ڪرڻ" },
  balance:  { ur: "متوازن رکھنا",                   sd: "متوازن رکڻ" },
  ban:      { ur: "روکنا، پابندی لگانا",            sd: "روڪڻ، پابندي لڳائڻ" },
  beam:     { ur: "چمکنا",                          sd: "چمڪڻ" },
  behave:   { ur: "رفتار کرنا، پیش آنا",            sd: "هل چل ڪرڻ، پيش اچڻ" },
  belong:   { ur: "تعلق رکھنا",                     sd: "تعلق رکڻ" },
  block:    { ur: "روکنا، بند کرنا",                sd: "روڪڻ، بند ڪرڻ" },
  bomb:     { ur: "بمباری کرنا",                    sd: "بمباري ڪرڻ" },
  book:     { ur: "محفوظ کرنا، بکنگ کرنا",          sd: "محفوظ ڪرڻ، بڪنگ ڪرڻ" },
  bore:     { ur: "اکتانا، بور کرنا",               sd: "اُڪتائڻ، بور ڪرڻ" },
  box:      { ur: "مکے بازی کرنا",                  sd: "مڪي بازي ڪرڻ" },
  branch:   { ur: "شاخیں نکلنا",                    sd: "شاخون نڪرڻ" },
  brave:    { ur: "ہمت سے سامنا کرنا",              sd: "همت سانمنهن ڪرڻ" },
  burnish:  { ur: "چمکانا، صاف کرنا",               sd: "چمڪائڻ، صاف ڪرڻ" },
  bus:      { ur: "بس سے لے جانا",                   sd: "بس سان کڻي وڃڻ" },
  bust:     { ur: "گرفتار کرنا",                    sd: "گرفتار ڪرڻ" },
  camp:     { ur: "ڈیرہ ڈالنا، خیمہ لگانا",         sd: "خيمو لڳائڻ، ڪئمپ هڻڻ" },
  clear:    { ur: "صاف کرنا، ہٹانا",                sd: "صاف ڪرڻ، هٽائڻ" },
  clutch:   { ur: "جپٹنا، پکڑنا",                   sd: "پڪڙڻ، جهٽڪڻ" },
  coil:     { ur: "لپیٹنا، گھومنا",                 sd: "وڙهڻ، گهمڻ" },
  concern:  { ur: "فکر مند ہونا",                   sd: "فڪرمنده ٿيڻ" },
};

async function main() {
  let updatedGroup1 = 0;
  let updatedGroup2 = 0;
  let skipped = 0;

  // Group 1: Urdu in meaning field — move Urdu to meaningUr, set English meaning, set Sindhi
  for (const [v1, info] of Object.entries(URDU_IN_MEANING)) {
    const verb = await db.verb.findFirst({ where: { v1 }, select: { id: true, meaning: true, meaningUr: true, meaningSd: true } });
    if (!verb) {
      console.log(`  ! verb "${v1}" not found in DB — skipping`);
      skipped++;
      continue;
    }
    // Only update if meaningUr or meaningSd is empty
    if (verb.meaningUr && verb.meaningSd) {
      console.log(`  - verb "${v1}" already has both translations — skipping`);
      skipped++;
      continue;
    }
    // The current `meaning` field contains the Urdu text; preserve it as meaningUr
    const urduMeaning = verb.meaning;
    await db.verb.update({
      where: { id: verb.id },
      data: {
        meaning: info.en,         // English meaning
        meaningUr: urduMeaning,   // move Urdu from meaning → meaningUr
        meaningSd: info.sd,       // add Sindhi
      },
    });
    console.log(`  ✓ ${v1}: meaning="${info.en}", meaningUr="${urduMeaning}", meaningSd="${info.sd}"`);
    updatedGroup1++;
  }

  // Group 2: English meaning present — add Urdu + Sindhi
  for (const [v1, info] of Object.entries(ENGLISH_ONLY)) {
    const verb = await db.verb.findFirst({ where: { v1 }, select: { id: true, meaningUr: true, meaningSd: true } });
    if (!verb) {
      console.log(`  ! verb "${v1}" not found in DB — skipping`);
      skipped++;
      continue;
    }
    if (verb.meaningUr && verb.meaningSd) {
      console.log(`  - verb "${v1}" already has both translations — skipping`);
      skipped++;
      continue;
    }
    await db.verb.update({
      where: { id: verb.id },
      data: {
        meaningUr: info.ur,
        meaningSd: info.sd,
      },
    });
    console.log(`  ✓ ${v1}: meaningUr="${info.ur}", meaningSd="${info.sd}"`);
    updatedGroup2++;
  }

  console.log("");
  console.log(`Group 1 (moved Urdu → meaningUr + added English + Sindhi): ${updatedGroup1} verbs`);
  console.log(`Group 2 (added Urdu + Sindhi): ${updatedGroup2} verbs`);
  console.log(`Skipped: ${skipped} verbs`);

  // Final verification — count verbs with both meanings
  const total = await db.verb.count();
  const withUr = await db.verb.count({ where: { NOT: { meaningUr: "" } } });
  const withSd = await db.verb.count({ where: { NOT: { meaningSd: "" } } });
  const missingBoth = await db.verb.count({ where: { OR: [{ meaningUr: "" }, { meaningSd: "" }] } });
  console.log("");
  console.log(`Final state: ${withUr}/${total} verbs with Urdu meaning, ${withSd}/${total} with Sindhi meaning, ${missingBoth} still missing.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

/**
 * Import script — updates existing verbs to basic tier + adds Urdu meanings,
 * imports new verbs (irregular + regular), and imports plural nouns as
 * ContentItem records. All tagged minTier='basic'.
 */
import { PrismaClient } from "@prisma/client";
import { IRREGULAR_VERBS, REGULAR_VERBS, PLURAL_NOUNS } from "./data/tier-content";

const db = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});

async function main() {
  console.log("=== Importing tier content ===");

  // 1. Update existing verbs that match our irregular/regular list to basic tier
  //    and add Urdu meanings
  const allTierVerbs = [...IRREGULAR_VERBS, ...REGULAR_VERBS];
  let updated = 0;
  let created = 0;

  for (const tv of allTierVerbs) {
    const existing = await db.verb.findFirst({
      where: { v1: { equals: tv.v1, mode: "insensitive" } },
    });

    if (existing) {
      // Update: set minTier to basic, update meaning to include Urdu
      await db.verb.update({
        where: { id: existing.id },
        data: {
          minTier: "basic",
          meaning: tv.meaningUr, // Replace with Urdu meaning
          v2Alts: JSON.stringify(tv.v2Alts || []),
          v3Alts: JSON.stringify(tv.v3Alts || []),
        },
      });
      updated++;
    } else {
      // Create new verb
      await db.verb.create({
        data: {
          v1: tv.v1,
          v2: tv.v2,
          v3: tv.v3,
          v2Alts: JSON.stringify(tv.v2Alts || []),
          v3Alts: JSON.stringify(tv.v3Alts || []),
          meaning: tv.meaningUr,
          meaningLanguage: "ur",
          source: "tier-import",
          confidence: "high",
          needsReview: false,
          difficulty: tv.difficulty,
          minTier: "basic",
        },
      });
      created++;
    }
  }
  console.log(`Verbs: ${updated} updated to basic tier, ${created} created`);

  // 2. Import plural nouns as ContentItem records
  let nounsCreated = 0;
  for (const noun of PLURAL_NOUNS) {
    await db.contentItem.create({
      data: {
        type: "plural_noun",
        word: noun.singular,
        meaning: noun.plural,
        meaningUr: `${noun.singular} → ${noun.plural}`,
        example: noun.category,
        minTier: "basic",
        source: "tier-import",
      },
    });
    nounsCreated++;
  }
  console.log(`Plural nouns: ${nounsCreated} created as ContentItem`);

  // 3. Stats
  const tierStats = await db.verb.groupBy({ by: ["minTier"], _count: true, orderBy: { minTier: "asc" } });
  console.log("\nVerb tier distribution after import:");
  tierStats.forEach((t) => console.log(`  ${t.minTier}: ${t._count}`));

  const contentStats = await db.contentItem.groupBy({ by: ["type"], _count: true });
  console.log("\nContentItem distribution:");
  contentStats.forEach((t) => console.log(`  ${t.type}: ${t._count}`));

  console.log("\nDone!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

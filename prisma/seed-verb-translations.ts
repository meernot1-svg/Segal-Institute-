/**
 * Seed Urdu + Sindhi verb meanings from the curated translation map.
 *
 * Run with:
 *   DATABASE_URL="postgresql://…" bun run prisma/seed-verb-translations.ts
 *
 * For each entry in prisma/data/verb-translations.ts, this script:
 *   - Looks up the matching Verb row in the DB by v1 (case-insensitive)
 *   - Updates meaningUr and meaningSd with the curated Urdu + Sindhi meaning
 *
 * The script is IDEMPOTENT — running it again just re-updates the same rows
 * with the same values. Existing translations are overwritten with the
 * curated values (intentional: the curated map is the source of truth).
 *
 * Logs a summary at the end: total entries, matched, updated, not-found.
 */
import { PrismaClient } from "@prisma/client";

import { VERB_TRANSLATIONS } from "./data/verb-translations";

const db = new PrismaClient();

type Stats = {
  total: number;
  matched: number;
  updated: number;
  unchanged: number;
  notFound: number;
  notFoundList: string[];
  sample: { v1: string; ur: string; sd: string }[];
};

async function main() {
  const keys = Object.keys(VERB_TRANSLATIONS);
  const stats: Stats = {
    total: keys.length,
    matched: 0,
    updated: 0,
    unchanged: 0,
    notFound: 0,
    notFoundList: [],
    sample: [],
  };

  console.log(`[seed-verb-translations] Starting for ${keys.length} entries…`);

  // Pre-fetch all verbs by lowercased v1 to avoid 1000s of round-trips.
  // The Verb table has ~966 rows, so this is cheap.
  const allVerbs = await db.verb.findMany({ select: { id: true, v1: true, meaningUr: true, meaningSd: true } });
  const byLowerV1 = new Map<string, { id: string; meaningUr: string; meaningSd: string }[]>();
  for (const v of allVerbs) {
    const k = v.v1.toLowerCase();
    if (!byLowerV1.has(k)) byLowerV1.set(k, []);
    byLowerV1.get(k)!.push({ id: v.id, meaningUr: v.meaningUr, meaningSd: v.meaningSd });
  }

  let i = 0;
  for (const v1 of keys) {
    i += 1;
    if (i % 100 === 0) console.log(`  …processed ${i}/${keys.length}`);
    const translation = VERB_TRANSLATIONS[v1];
    const matches = byLowerV1.get(v1);
    if (!matches || matches.length === 0) {
      stats.notFound += 1;
      stats.notFoundList.push(v1);
      continue;
    }
    stats.matched += 1;
    for (const m of matches) {
      // Skip if already identical (saves a write).
      if (m.meaningUr === translation.ur && m.meaningSd === translation.sd) {
        stats.unchanged += 1;
        continue;
      }
      await db.verb.update({
        where: { id: m.id },
        data: {
          meaningUr: translation.ur,
          meaningSd: translation.sd,
        },
      });
      stats.updated += 1;
      if (stats.sample.length < 5) {
        stats.sample.push({ v1, ur: translation.ur, sd: translation.sd });
      }
    }
  }

  console.log("");
  console.log("─────────────────────────────────────────────────────────────");
  console.log("seed-verb-translations summary:");
  console.log(`  Translation entries (in map) : ${stats.total}`);
  console.log(`  Matched verb rows in DB       : ${stats.matched}`);
  console.log(`  Rows updated                  : ${stats.updated}`);
  console.log(`  Rows unchanged (already set)  : ${stats.unchanged}`);
  console.log(`  Map keys NOT found in DB      : ${stats.notFound}`);
  if (stats.notFoundList.length > 0) {
    console.log(`  Not-found list (${stats.notFoundList.length}):`);
    console.log("    " + stats.notFoundList.sort().join(", "));
  }
  if (stats.sample.length > 0) {
    console.log("");
    console.log("Sample updates (v1 → Urdu / Sindhi):");
    for (const s of stats.sample) {
      console.log(`  ${s.v1.padEnd(12)} → ur: ${s.ur}   |   sd: ${s.sd}`);
    }
  }
  console.log("─────────────────────────────────────────────────────────────");
}

main()
  .catch((e) => {
    console.error("[seed-verb-translations] FATAL:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

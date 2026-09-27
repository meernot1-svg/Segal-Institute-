/**
 * Seed script — populates verbs, achievements, and demo users.
 * Run with: bun run prisma/seed.ts
 *
 * Uses DIRECT_URL (session-mode pooler / direct connection) when available,
 * because pgbouncer transaction mode doesn't support bulk createMany well.
 * Falls back to DATABASE_URL if DIRECT_URL isn't set.
 */
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/crypto";
import { seedVerbs } from "./data/verbs";

const db = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});

const ACHIEVEMENTS = [
  { code: "first_step", title: "First Step", description: "Learn your first verb", icon: "Footprints" },
  { code: "verb_starter", title: "Verb Starter", description: "Learn 10 verbs", icon: "Sprout" },
  { code: "verb_builder", title: "Verb Builder", description: "Learn 50 verbs", icon: "Hammer" },
  { code: "verb_master", title: "Verb Master", description: "Learn 200 verbs", icon: "Crown" },
  { code: "test_starter", title: "Test Starter", description: "Complete your first test", icon: "ClipboardCheck" },
  { code: "perfect_score", title: "Perfect Score", description: "Score 100% on a test", icon: "Award" },
  { code: "streak_7", title: "7-Day Streak", description: "Maintain a 7-day streak", icon: "Flame" },
  { code: "streak_30", title: "30-Day Streak", description: "Maintain a 30-day streak", icon: "Trophy" },
];

async function main() {
  console.log("Seeding English Academy database…");

  // --- Verbs ---
  console.log(`Preparing ${seedVerbs.length} verbs…`);
  // Wipe existing verbs (cascade removes progress/favorites/answers)
  await db.verb.deleteMany({});
  // Insert in chunks to avoid SQLite variable limits
  const chunkSize = 200;
  let inserted = 0;
  for (let i = 0; i < seedVerbs.length; i += chunkSize) {
    const chunk = seedVerbs.slice(i, i + chunkSize);
    await db.verb.createMany({
      data: chunk.map((v) => ({
        v1: v.v1,
        v2: v.v2,
        v3: v.v3,
        v2Alts: JSON.stringify(v.v2Alts ?? []),
        v3Alts: JSON.stringify(v.v3Alts ?? []),
        meaning: v.meaning,
        meaningLanguage: "en",
        source: "seed",
        confidence: "high",
        needsReview: false,
        difficulty: v.difficulty ?? 1,
      })),
    });
    inserted += chunk.length;
    if (inserted % 400 === 0 || inserted === seedVerbs.length) {
      console.log(`  inserted ${inserted}/${seedVerbs.length}`);
    }
  }
  const total = await db.verb.count();
  console.log(`Verbs seeded: ${total}`);

  // --- Achievements ---
  await db.achievement.deleteMany({});
  for (const a of ACHIEVEMENTS) {
    await db.achievement.create({ data: a });
  }
  console.log(`Achievements seeded: ${ACHIEVEMENTS.length}`);

  // --- Demo users ---
  const adminEmail = "admin@englishacademy.example";
  const studentEmail = "student@englishacademy.example";
  await db.profile.deleteMany({ where: { email: { in: [adminEmail, studentEmail] } } });
  await db.profile.create({
    data: {
      email: adminEmail,
      name: "Academy Admin",
      passwordHash: hashPassword("admin123"),
      role: "admin",
    },
  });
  await db.profile.create({
    data: {
      email: studentEmail,
      name: "Demo Student",
      passwordHash: hashPassword("student123"),
      role: "student",
      classGrade: "Grade 9",
    },
  });
  console.log("Demo users seeded:");
  console.log("  admin   -> admin@englishacademy.example / admin123");
  console.log("  student -> student@englishacademy.example / student123");

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

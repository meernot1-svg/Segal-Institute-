import Link from "next/link";
import type { Metadata } from "next";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { VerbsToolbar } from "@/components/verbs-toolbar";
import { VerbActions } from "@/components/verb-actions";
import { SpeakButton } from "@/components/speak-button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/site";
import { canAccessTier, tierRank, tierLabel, TIER_LABELS, TIER_DOT_COLORS, type BadgeTier } from "@/lib/tiers";
import { getVerbType, type VerbType } from "@/lib/verbs";

export const metadata: Metadata = {
  title: "Browse English Verbs — V1, V2, V3 Forms",
  description:
    "Search and browse hundreds of English verbs with their V1, V2, and V3 forms and meanings. Filter by difficulty, mark verbs as learned or difficult, and hear pronunciation. Free at Segal Institute.",
  alternates: { canonical: "/verbs" },
  openGraph: {
    title: "Browse English Verbs — V1, V2, V3 Forms · Segal Institute",
    description:
      "Search and browse English verbs with their V1, V2, V3 forms and meanings. Filter by difficulty and mark verbs as learned or difficult.",
    url: `${SITE_URL}/verbs`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse English Verbs — V1, V2, V3 Forms · Segal Institute",
    description: "Search English verbs and their three forms with meanings and pronunciation.",
  },
};

export const dynamic = "force-dynamic";

const PAGE_SIZE = 24;

type SearchParams = {
  q?: string;
  status?: string;
  difficulty?: string;
  letter?: string;
  page?: string;
};

export default async function VerbsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const user = (await getCurrentUser())!;
  const sp = await searchParams;
  const q = (sp.q || "").trim();
  const status = sp.status || "all";
  const difficulty = sp.difficulty || "all";
  const letter = (sp.letter || "").toLowerCase();
  const page = Math.max(1, parseInt(sp.page || "1", 10) || 1);

  // Only fetch verbs the user can actually access — no locked rows shown
  const accessibleTiers = ["basic", "junior", "senior", "elite_senior"].filter(
    (t) => tierRank(t) <= tierRank(user.badge),
  );

  const where: Prisma.VerbWhereInput = {
    minTier: { in: accessibleTiers },
  };
  if (q) {
    where.OR = [{ v1: { contains: q } }, { meaning: { contains: q } }, { meaningUr: { contains: q } }, { meaningSd: { contains: q } }];
  }
  if (letter && letter.length === 1) {
    where.v1 = { startsWith: letter };
  }
  if (difficulty !== "all") {
    where.difficulty = parseInt(difficulty, 10);
  }
  switch (status) {
    case "learned":
      where.progress = { some: { profileId: user.id, status: "learned" } };
      break;
    case "unlearned":
      where.NOT = { progress: { some: { profileId: user.id, status: "learned" } } };
      break;
    case "difficult":
      where.progress = { some: { profileId: user.id, status: "difficult" } };
      break;
    case "favorites":
      where.favorites = { some: { profileId: user.id } };
      break;
  }

  const [total, verbs] = await Promise.all([
    db.verb.count({ where }),
    db.verb.findMany({
      where,
      orderBy: { v1: "asc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        progress: { where: { profileId: user.id }, select: { status: true } },
        favorites: { where: { profileId: user.id }, select: { id: true } },
      },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // Split verbs into Regular and Irregular
  const regularVerbs = verbs.filter((v) => getVerbType(v.v1, v.v2, v.v3) === "Regular");
  const irregularVerbs = verbs.filter((v) => getVerbType(v.v1, v.v2, v.v3) === "Irregular");

  // Check if the user is searching (in which case we skip the educational sections)
  const isSearching = !!(q || status !== "all" || difficulty !== "all" || letter);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Verbs
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {total.toLocaleString()} verbs at your level · mark each learned or difficult as you go.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
            "bg-accent text-brand-emerald-deep border-brand-emerald/30",
          )}>
            <span className={cn("size-1.5 rounded-full", TIER_DOT_COLORS[user.badge as BadgeTier] || TIER_DOT_COLORS.basic)} />
            {TIER_LABELS[user.badge as BadgeTier] || "Basic"}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <VerbsToolbar q={q} status={status} difficulty={difficulty} letter={letter} />
      </div>

      {verbs.length === 0 ? (
        <div className="mt-10 rounded-xl border border-border bg-card p-12 text-center">
          <p className="font-medium text-foreground">No verbs match your filters.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try clearing the search or switching filters.
          </p>
        </div>
      ) : isSearching ? (
        <>
          {/* Search results — show all matching verbs in a single list */}
          <VerbSection
            title={`Search results (${total.toLocaleString()})`}
            description=""
            verbs={verbs}
            user={user}
          />
          <Pagination page={page} totalPages={totalPages} searchParams={sp} />
        </>
      ) : (
        <>
          {/* Educational layout: Regular verbs definition → Regular verbs → Irregular definition → Irregular verbs */}

          {/* Regular Verbs Section */}
          {regularVerbs.length > 0 && (
            <VerbSection
              title="Regular Verbs"
              definition="Regular verbs form their past simple (V2) and past participle (V3) by adding <strong>-ed</strong>, <strong>-d</strong> (if the verb ends in 'e'), or <strong>-ied</strong> (if the verb ends in a consonant + 'y'). The V2 and V3 forms are always the same for regular verbs."
              examples="accept → accepted → accepted &nbsp;·&nbsp; study → studied → studied &nbsp;·&nbsp; work → worked → worked"
              verbs={regularVerbs}
              user={user}
            />
          )}

          {/* Irregular Verbs Section */}
          {irregularVerbs.length > 0 && (
            <div className={regularVerbs.length > 0 ? "mt-10" : ""}>
              <VerbSection
                title="Irregular Verbs"
                definition="Irregular verbs do <strong>not</strong> follow the -ed pattern. Their V2 (past simple) and V3 (past participle) forms change in unique ways and must be memorized. For example: <em>go → went → gone</em>, <em>see → saw → seen</em>, <em>be → was/were → been</em>."
                examples="go → went → gone &nbsp;·&nbsp; see → saw → seen &nbsp;·&nbsp; take → took → taken"
                verbs={irregularVerbs}
                user={user}
              />
            </div>
          )}

          {/* Tier upsell: show what's available at higher tiers */}
          {tierRank(user.badge) < 4 && (
            <div className="mt-10 rounded-xl border border-border bg-surface-cream p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">
                More verbs at higher badges
              </h3>
              <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                {(["junior", "senior", "elite_senior"] as BadgeTier[]).map((t) => {
                  if (tierRank(t) <= tierRank(user.badge)) return null;
                  return (
                    <div key={t} className="flex items-center gap-2">
                      <span className={cn("size-2 rounded-full", TIER_DOT_COLORS[t])} />
                      <span>
                        <strong>{TIER_LABELS[t]}</strong> badge unlocks more advanced verbs
                        {t === "elite_senior" && " (coming soon)"}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Ask your teacher to promote your badge to unlock more verbs.
              </p>
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} searchParams={sp} />
        </>
      )}
    </div>
  );
}

function VerbSection({
  title,
  definition,
  examples,
  verbs,
  user,
}: {
  title: string;
  definition: string;
  examples?: string;
  verbs: Array<{
    id: string;
    v1: string;
    v2: string;
    v3: string;
    v2Alts: string;
    v3Alts: string;
    meaning: string;
    meaningUr: string;
    meaningSd: string;
    difficulty: number;
    progress: { status: string }[];
    favorites: { id: string }[];
  }>;
  user: { id: string };
}) {
  if (verbs.length === 0 && !definition) return null;

  return (
    <div className="mt-8">
      {/* Section header with definition */}
      {definition && (
        <div className="mb-4 rounded-xl border border-brand-emerald/20 bg-accent/20 p-5">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
          <p
            className="mt-2 text-sm leading-relaxed text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: definition }}
          />
          {examples && (
            <p
              className="mt-2 font-mono text-xs text-muted-foreground/70"
              dangerouslySetInnerHTML={{ __html: examples }}
            />
          )}
        </div>
      )}

      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-xl border border-border md:block">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left">
            <tr className="text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">V1</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">V2</th>
              <th className="px-4 py-3 font-medium">V3</th>
              <th className="px-4 py-3 font-medium">Meaning (EN)</th>
              <th className="px-4 py-3 font-medium" dir="rtl">اردو</th>
              <th className="px-4 py-3 font-medium" dir="rtl">سنڌي</th>
              <th className="px-4 py-3 font-medium">Level</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {verbs.map((v) => {
              const st = (v.progress[0]?.status || "new") as "new" | "learning" | "learned" | "difficult";
              const fav = v.favorites.length > 0;
              const verbType: VerbType = getVerbType(v.v1, v.v2, v.v3);
              return (
                <tr key={v.id} className="group align-middle">
                  <td className="px-4 py-3">
                    <Link href={`/verbs/${v.id}`} className="inline-flex items-center gap-2">
                      <span className="font-medium text-foreground group-hover:text-brand-emerald-deep">{v.v1}</span>
                      <SpeakButton text={v.v1} className="opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </td>
                  <td className="px-4 py-3"><VerbTypeBadge type={verbType} /></td>
                  <td className="px-4 py-3 text-muted-foreground">{v.v2}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.v3}</td>
                  <td className="px-4 py-3 max-w-[260px] truncate text-muted-foreground" title={v.meaning}>{v.meaning}</td>
                  <td className="px-4 py-3 max-w-[160px] truncate text-muted-foreground" dir="auto" title={v.meaningUr}>
                    {v.meaningUr ? v.meaningUr : <span className="text-muted-foreground/40">—</span>}
                  </td>
                  <td className="px-4 py-3 max-w-[160px] truncate text-muted-foreground" dir="auto" title={v.meaningSd}>
                    {v.meaningSd ? v.meaningSd : <span className="text-muted-foreground/40">—</span>}
                  </td>
                  <td className="px-4 py-3"><DiffBadge level={v.difficulty} /></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <VerbActions verbId={v.id} initialStatus={st} initialFavorited={fav} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-3 md:hidden">
        {verbs.map((v) => {
          const st = (v.progress[0]?.status || "new") as "new" | "learning" | "learned" | "difficult";
          const fav = v.favorites.length > 0;
          const verbType: VerbType = getVerbType(v.v1, v.v2, v.v3);
          return (
            <div key={v.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-2">
                <Link href={`/verbs/${v.id}`} className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-display text-lg font-semibold text-foreground">{v.v1}</p>
                    <SpeakButton text={v.v1} />
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <VerbTypeBadge type={verbType} />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{v.v2}</span>
                      <span className="mx-1.5 text-border">/</span>
                      <span className="font-medium text-foreground">{v.v3}</span>
                    </p>
                  </div>
                </Link>
                <DiffBadge level={v.difficulty} />
              </div>

              {/* Trilingual meanings */}
              <div className="mt-3 grid gap-1.5 rounded-lg bg-muted/40 p-3 text-sm">
                <p className="truncate text-muted-foreground" title={v.meaning}>
                  <span className="mr-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">EN</span>
                  {v.meaning}
                </p>
                {v.meaningUr && (
                  <p className="truncate text-foreground" dir="auto" title={v.meaningUr}>
                    <span className="mr-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">UR</span>
                    {v.meaningUr}
                  </p>
                )}
                {v.meaningSd && (
                  <p className="truncate text-foreground" dir="auto" title={v.meaningSd}>
                    <span className="mr-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">SD</span>
                    {v.meaningSd}
                  </p>
                )}
              </div>

              <div className="mt-3 border-t border-border pt-3">
                <VerbActions verbId={v.id} initialStatus={st} initialFavorited={fav} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DiffBadge({ level }: { level: number }) {
  const map = {
    1: { label: "Easy", className: "bg-accent text-brand-emerald-deep" },
    2: { label: "Medium", className: "bg-amber-50 text-amber-700" },
    3: { label: "Hard", className: "bg-red-50 text-red-700" },
  } as const;
  const m = map[(level as 1 | 2 | 3) ?? 1] || map[1];
  return <Badge variant="outline" className={cn("border-transparent", m.className)}>{m.label}</Badge>;
}

function VerbTypeBadge({ type }: { type: VerbType }) {
  const styles = {
    Regular: "bg-blue-50 text-blue-700 border-blue-200",
    Irregular: "bg-purple-50 text-purple-700 border-purple-200",
  } as const;
  return (
    <Badge variant="outline" className={cn("border", styles[type])}>
      {type}
    </Badge>
  );
}

function Pagination({
  page,
  totalPages,
  searchParams,
}: {
  page: number;
  totalPages: number;
  searchParams: SearchParams;
}) {
  if (totalPages <= 1) return null;
  const build = (p: number) => {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(searchParams)) {
      if (v) params.set(k, v);
    }
    params.set("page", String(p));
    return `/verbs?${params.toString()}`;
  };
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <nav className="mt-6 flex items-center justify-between gap-2" aria-label="Pagination">
      <div className="text-sm text-muted-foreground">
        Page <span className="font-medium text-foreground">{page}</span> of {totalPages}
      </div>
      <div className="flex items-center gap-1">
        {page > 1 ? (
          <Link href={build(page - 1)} className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Previous page">
            <ChevronLeft className="size-4" />
          </Link>
        ) : (
          <span className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground/40">
            <ChevronLeft className="size-4" />
          </span>
        )}
        {pages.map((p) => (
          <Link
            key={p}
            href={build(p)}
            className={cn(
              "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors",
              p === page
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {p}
          </Link>
        ))}
        {page < totalPages ? (
          <Link href={build(page + 1)} className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Next page">
            <ChevronRight className="size-4" />
          </Link>
        ) : (
          <span className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground/40">
            <ChevronRight className="size-4" />
          </span>
        )}
      </div>
    </nav>
  );
}

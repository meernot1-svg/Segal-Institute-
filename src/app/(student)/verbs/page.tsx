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
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { SITE_URL } from "@/lib/site";
import { canAccessTier, tierLabel } from "@/lib/tiers";
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

  const where: Prisma.VerbWhereInput = {};
  if (q) {
    where.OR = [{ v1: { contains: q } }, { meaning: { contains: q } }];
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
  const hasAccess = canAccessTier(user.badge, "senior");

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Verbs
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {total.toLocaleString()} verbs · mark each learned or difficult as you go.
          </p>
        </div>
      </div>

      {/* Tier access notice for users who can't access everything */}
      {!canAccessTier(user.badge, "senior") && (
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          <Lock className="mt-0.5 size-4 shrink-0" />
          <div>
            <p>
              Your badge is <strong>{tierLabel(user.badge)}</strong>. You have access to{" "}
              <strong>{tierLabel(user.badge)}</strong>-level verbs and below.
            </p>
            <p className="mt-1">
              Verbs at <strong>Senior</strong> tier and above are visible but locked —
              you can see the verb name but V2/V3 forms and meanings are hidden until
              your teacher promotes you.
            </p>
          </div>
        </div>
      )}

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
      ) : (
        <>
          {/* Desktop table */}
          <div className="mt-6 hidden overflow-hidden rounded-xl border border-border md:block">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-left">
                <tr className="text-xs text-muted-foreground">
                  <th className="px-4 py-3 font-medium">V1</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">V2</th>
                  <th className="px-4 py-3 font-medium">V3</th>
                  <th className="px-4 py-3 font-medium">Meaning</th>
                  <th className="px-4 py-3 font-medium">Level</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {verbs.map((v) => {
                  const locked = !canAccessTier(user.badge, v.minTier);
                  const verbType: VerbType = getVerbType(v.v1, v.v2, v.v3);
                  if (locked) {
                    return (
                      <tr key={v.id} className="align-middle opacity-50">
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-2">
                            <Lock className="size-3.5 text-muted-foreground" />
                            <span className="font-medium text-foreground">{v.v1}</span>
                          </span>
                        </td>
                        <td className="px-4 py-3"><VerbTypeBadge type={verbType} /></td>
                        <td className="px-4 py-3 text-muted-foreground">—</td>
                        <td className="px-4 py-3 text-muted-foreground">—</td>
                        <td className="px-4 py-3 text-muted-foreground">Available at {tierLabel(v.minTier)} tier</td>
                        <td className="px-4 py-3"><DiffBadge level={v.difficulty} /></td>
                        <td className="px-4 py-3 text-right text-xs text-muted-foreground">Locked</td>
                      </tr>
                    );
                  }
                  const st = (v.progress[0]?.status || "new") as "new" | "learning" | "learned" | "difficult";
                  const fav = v.favorites.length > 0;
                  return (
                    <tr key={v.id} className="group align-middle">
                      <td className="px-4 py-3">
                        <Link href={`/verbs/${v.id}`} className="inline-flex items-center gap-2">
                          <span className="font-medium text-foreground group-hover:text-brand-emerald-deep">
                            {v.v1}
                          </span>
                          <SpeakButton text={v.v1} className="opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                      </td>
                      <td className="px-4 py-3"><VerbTypeBadge type={verbType} /></td>
                      <td className="px-4 py-3 text-muted-foreground">{v.v2}</td>
                      <td className="px-4 py-3 text-muted-foreground">{v.v3}</td>
                      <td className="px-4 py-3 max-w-[280px] truncate text-muted-foreground" title={v.meaning}>
                        {v.meaning}
                      </td>
                      <td className="px-4 py-3">
                        <DiffBadge level={v.difficulty} />
                      </td>
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
          <div className="mt-6 grid gap-3 md:hidden">
            {verbs.map((v) => {
              const locked = !canAccessTier(user.badge, v.minTier);
              const verbType: VerbType = getVerbType(v.v1, v.v2, v.v3);
              if (locked) {
                return (
                  <div key={v.id} className="rounded-xl border border-border bg-card p-4 opacity-50">
                    <div className="flex items-center gap-2">
                      <Lock className="size-4 text-muted-foreground" />
                      <p className="font-display text-lg font-semibold text-foreground">{v.v1}</p>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <VerbTypeBadge type={verbType} />
                      <p className="text-sm text-muted-foreground">Available at {tierLabel(v.minTier)} tier</p>
                    </div>
                  </div>
                );
              }
              const st = (v.progress[0]?.status || "new") as "new" | "learning" | "learned" | "difficult";
              const fav = v.favorites.length > 0;
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
                      <p className="mt-1.5 truncate text-sm text-muted-foreground">{v.meaning}</p>
                    </Link>
                    <DiffBadge level={v.difficulty} />
                  </div>
                  <div className="mt-3 border-t border-border pt-3">
                    <VerbActions verbId={v.id} initialStatus={st} initialFavorited={fav} />
                  </div>
                </div>
              );
            })}
          </div>

          <Pagination page={page} totalPages={totalPages} searchParams={sp} />
        </>
      )}
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

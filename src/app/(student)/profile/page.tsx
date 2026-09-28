import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, CalendarDays, GraduationCap, BookA, Star, Receipt, Flame } from "lucide-react";
import { AvatarUploader, ProfileEditor } from "@/components/avatar-uploader";
import { formatCurrency } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = (await getCurrentUser())!;

  // MCQ tests + Flashcards have been removed from the product. The profile
  // page no longer shows "Tests completed" or "Average score" — there's
  // nothing to count. We show verbs learned, difficult verbs, favorites,
  // and fees instead.
  const [learned, difficult, favorites, fees, profile] = await Promise.all([
    db.studentVerbProgress.count({ where: { profileId: user.id, status: "learned" } }),
    db.studentVerbProgress.count({ where: { profileId: user.id, status: "difficult" } }),
    db.favorite.count({ where: { profileId: user.id } }),
    db.fee.findMany({
      where: { studentId: user.id },
      orderBy: { dueDate: "desc" },
      take: 20,
    }),
    db.profile.findUnique({
      where: { id: user.id },
      select: { name: true, email: true, classGrade: true, avatarUrl: true, createdAt: true, role: true },
    }),
  ]);

  const unpaidFees = fees.filter((f) => !f.paid);
  const totalDue = unpaidFees.reduce((s, f) => s + f.amount, 0);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Profile
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Your account, photo, and learning summary.
      </p>

      {/* Identity + edit card */}
      <Card className="mt-6">
        <CardContent className="pt-6">
          <AvatarUploader initialAvatar={profile?.avatarUrl ?? null} initialName={profile?.name || user.name} />
          <div className="mt-6 grid gap-2 text-sm text-muted-foreground">
            <p className="inline-flex items-center gap-2"><Mail className="size-4" /> {user.email}</p>
            {profile?.classGrade && (
              <p className="inline-flex items-center gap-2"><GraduationCap className="size-4" /> {profile.classGrade}</p>
            )}
            {profile && (
              <p className="inline-flex items-center gap-2"><CalendarDays className="size-4" /> Joined {new Date(profile.createdAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</p>
            )}
            <p><Badge variant="outline" className="capitalize">{user.role}</Badge></p>
          </div>
          <div className="mt-6 border-t border-border pt-6">
            <p className="font-medium text-foreground">Edit your details</p>
            <div className="mt-4">
              <ProfileEditor initialName={profile?.name || user.name} initialClassGrade={profile?.classGrade ?? null} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={BookA} label="Verbs learned" value={learned.toLocaleString()} />
        <Stat icon={Flame} label="Difficult verbs" value={difficult.toLocaleString()} />
        <Stat icon={Star} label="Favorites" value={favorites.toLocaleString()} />
        <Stat icon={Receipt} label="Outstanding fees" value={unpaidFees.length > 0 ? formatCurrency(totalDue) : "—"} />
      </div>

      {/* Fees */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="size-4" /> Your fees
          </CardTitle>
        </CardHeader>
        <CardContent>
          {fees.length === 0 ? (
            <p className="text-sm text-muted-foreground">No fees assigned yet.</p>
          ) : (
            <>
              {unpaidFees.length > 0 && (
                <p className="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                  Outstanding balance: <span className="font-medium">{formatCurrency(totalDue)}</span> across {unpaidFees.length} unpaid fee{unpaidFees.length === 1 ? "" : "s"}.
                </p>
              )}
              {/* Desktop table */}
              <div className="hidden overflow-x-auto rounded-lg border border-border md:block">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
                    <tr>
                      <th className="px-4 py-2.5 font-medium">Period</th>
                      <th className="px-4 py-2.5 font-medium">Type</th>
                      <th className="px-4 py-2.5 font-medium">Due</th>
                      <th className="px-4 py-2.5 font-medium text-right">Amount</th>
                      <th className="px-4 py-2.5 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {fees.map((f) => (
                      <tr key={f.id} className="align-middle">
                        <td className="px-4 py-2.5 text-muted-foreground">{f.periodKey}</td>
                        <td className="px-4 py-2.5 capitalize text-muted-foreground">{f.kind}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          {new Date(f.dueDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                        <td className="px-4 py-2.5 text-right font-medium text-foreground">{formatCurrency(f.amount)}</td>
                        <td className="px-4 py-2.5">
                          {f.paid ? (
                            <Badge variant="outline" className="border-transparent bg-accent text-brand-emerald-deep">Paid</Badge>
                          ) : (
                            <Badge variant="outline" className="border-transparent bg-amber-50 text-amber-700">Unpaid</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile cards */}
              <div className="space-y-3 md:hidden">
                {fees.map((f) => (
                  <div key={f.id} className="rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">{f.periodKey}</span>
                      {f.paid ? (
                        <Badge variant="outline" className="border-transparent bg-accent text-brand-emerald-deep">Paid</Badge>
                      ) : (
                        <Badge variant="outline" className="border-transparent bg-amber-50 text-amber-700">Unpaid</Badge>
                      )}
                    </div>
                    <div className="mt-2 flex items-end justify-between gap-2">
                      <div>
                        <p className="capitalize text-sm text-muted-foreground">{f.kind}</p>
                        <p className="text-xs text-muted-foreground">due {new Date(f.dueDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</p>
                      </div>
                      <p className="font-display text-xl font-semibold text-foreground">{formatCurrency(f.amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {difficult > 0 && (
        <Card className="mt-6">
          <CardHeader><CardTitle>Difficult verbs</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You've marked <span className="font-medium text-foreground">{difficult}</span> verb{difficult === 1 ? "" : "s"} as difficult. Review them with the Sentence Generator or ask the AI Tutor for example sentences to strengthen your recall.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-lg bg-accent text-brand-emerald-deep">
            <Icon className="size-5" />
          </span>
          <div>
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <p className="font-display text-2xl font-semibold text-foreground">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

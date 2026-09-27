import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, monthKey } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminFeesPage() {
  const [allFees, students] = await Promise.all([
    db.fee.findMany({
      orderBy: { dueDate: "desc" },
      take: 200,
      select: { id: true, amount: true, paid: true, periodKey: true, kind: true, dueDate: true, paidAt: true, studentId: true },
    }),
    db.profile.findMany({
      where: { role: "student" },
      select: { id: true, name: true, email: true },
    }),
  ]);

  const studentMap = new Map(students.map((s) => [s.id, s]));
  const thisMonth = monthKey();
  const collected = allFees.filter((f) => f.paid).reduce((s, f) => s + f.amount, 0);
  const outstanding = allFees.filter((f) => !f.paid).reduce((s, f) => s + f.amount, 0);
  const monthlyFees = allFees.filter((f) => f.periodKey === thisMonth);
  const monthlyCollected = monthlyFees.filter((f) => f.paid).reduce((s, f) => s + f.amount, 0);
  const monthlyOutstanding = monthlyFees.filter((f) => !f.paid).reduce((s, f) => s + f.amount, 0);

  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Fees
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          All fees across students. Assign fees and mark paid from the Students page.
        </p>
      </div>

      {/* Summary */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="This month collected" value={formatCurrency(monthlyCollected)} tone="emerald" sub={thisMonth} />
        <SummaryCard label="This month outstanding" value={formatCurrency(monthlyOutstanding)} tone="amber" sub={thisMonth} />
        <SummaryCard label="Total collected (all)" value={formatCurrency(collected)} tone="emerald" />
        <SummaryCard label="Total outstanding (all)" value={formatCurrency(outstanding)} tone="amber" />
      </div>

      {/* Table */}
      <Card className="mt-6">
        <CardHeader><CardTitle>All fee records</CardTitle></CardHeader>
        <CardContent>
          {allFees.length === 0 ? (
            <p className="text-sm text-muted-foreground">No fees assigned yet. Go to the Students page to assign one.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 font-medium">Student</th>
                    <th className="px-3 py-2 font-medium">Period</th>
                    <th className="px-3 py-2 font-medium">Type</th>
                    <th className="px-3 py-2 font-medium">Due</th>
                    <th className="px-3 py-2 font-medium text-right">Amount</th>
                    <th className="px-3 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {allFees.map((f) => {
                    const student = studentMap.get(f.studentId);
                    return (
                      <tr key={f.id} className="align-middle">
                        <td className="px-3 py-2.5">
                          <p className="font-medium text-foreground">{student?.name || "Unknown"}</p>
                          <p className="text-xs text-muted-foreground">{student?.email}</p>
                        </td>
                        <td className="px-3 py-2.5 text-muted-foreground">{f.periodKey}</td>
                        <td className="px-3 py-2.5 capitalize text-muted-foreground">{f.kind}</td>
                        <td className="px-3 py-2.5 text-muted-foreground">
                          {new Date(f.dueDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                        <td className="px-3 py-2.5 text-right font-medium text-foreground">{formatCurrency(f.amount)}</td>
                        <td className="px-3 py-2.5">
                          {f.paid ? (
                            <Badge variant="outline" className="border-transparent bg-accent text-brand-emerald-deep">Paid</Badge>
                          ) : (
                            <Badge variant="outline" className="border-transparent bg-amber-50 text-amber-700">Unpaid</Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryCard({ label, value, tone, sub }: { label: string; value: string; tone: "emerald" | "amber"; sub?: string }) {
  const tones = {
    emerald: "bg-accent text-brand-emerald-deep",
    amber: "bg-amber-50 text-amber-700",
  };
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-xs font-medium text-muted-foreground">{label}{sub && ` · ${sub}`}</p>
        <p className={`mt-2 font-display text-2xl font-semibold ${tones[tone]}`}>{value}</p>
      </CardContent>
    </Card>
  );
}

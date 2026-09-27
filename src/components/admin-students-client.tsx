"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Receipt, Loader2, Check, KeyRound } from "lucide-react";
import { formatCurrency, monthKey } from "@/lib/format";
import { BadgeManager, BadgePill } from "@/components/admin-badges-client";

type Fee = { id: string; amount: number; periodKey: string; paid: boolean; kind: string; dueDate: string };
type Student = {
  id: string;
  name: string;
  email: string;
  classGrade: string | null;
  avatarUrl: string | null;
  createdAt: string;
  _count: { testAttempts: number; verbProgress: number };
  fees: Fee[];
  feesDue: number;
  status: string;
  badge: string;
};

export function AdminStudentsClient() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/admin/students");
      const data = await res.json();
      if (cancelled) return;
      if (data.students) setStudents(data.students);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function refresh() {
    setLoading(true);
    const res = await fetch("/api/admin/students");
    const data = await res.json();
    if (data.students) setStudents(data.students);
    setLoading(false);
  }

  async function remove(id: string, name: string) {
    if (!confirm(`Delete ${name}? This permanently removes their account, progress, and tests. This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/students?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.error || "Could not delete");
      return;
    }
    toast.success(`${name} deleted.`);
    setStudents((s) => s.filter((x) => x.id !== id));
  }

  async function assignFee(student: Student, amount: number, kind: string, periodKey: string) {
    const res = await fetch("/api/admin/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: student.id, amount, kind, periodKey }),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.error || "Could not assign fee");
      return;
    }
    toast.success(`Fee of ${formatCurrency(amount)} assigned to ${student.name}.`);
    await refresh();
  }

  async function togglePaid(feeId: string, paid: boolean) {
    const res = await fetch(`/api/admin/students?feeId=${feeId}&paid=${!paid}`, { method: "PATCH" });
    if (!res.ok) {
      toast.error("Could not update fee");
      return;
    }
    await refresh();
  }

  if (loading) {
    return <div className="flex justify-center py-16"><Loader2 className="size-8 animate-spin text-brand-emerald" /></div>;
  }

  if (students.length === 0) {
    return (
      <div className="mt-10 rounded-xl border border-border bg-card p-12 text-center">
        <p className="font-medium text-foreground">No students yet.</p>
        <p className="mt-1 text-sm text-muted-foreground">When a student registers, they'll appear here.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {students.map((s) => (
        <Card key={s.id}>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              {/* Identity */}
              <div className="flex items-start gap-3">
                {s.avatarUrl ? (
                  <img src={s.avatarUrl} alt={`${s.name}'s profile photo`} className="size-12 rounded-full border border-border object-cover" />
                ) : (
                  <div className="flex size-12 items-center justify-center rounded-full bg-brand-navy font-display text-lg font-semibold uppercase text-white">
                    {s.name.charAt(0) || "S"}
                  </div>
                )}
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-foreground">{s.name}</p>
                    {s.status === "pending" && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">Pending</span>
                    )}
                    {s.status === "rejected" && (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">Rejected</span>
                    )}
                    <BadgePill badge={s.badge} />
                  </div>
                  <p className="text-sm text-muted-foreground">{s.email}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {s.classGrade || "No class set"} · joined {new Date(s.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                    {" · "}{s._count.testAttempts} tests · {s._count.verbProgress} verbs
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2">
                {s.status === "active" && (
                  <BadgeManager userId={s.id} userName={s.name} currentBadge={s.badge} />
                )}
                <FeeDialog student={s} onAssign={assignFee} />
                <PasswordDialog student={s} />
                <Button onClick={() => remove(s.id, s.name)} variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                  <Trash2 className="size-3.5" /> Delete
                </Button>
              </div>
            </div>

            {/* Existing fees */}
            {s.fees.length > 0 && (
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-xs font-medium text-muted-foreground">Fees</p>
                <div className="mt-2 space-y-1.5">
                  {s.fees.map((f) => (
                    <div key={f.id} className="flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2 text-sm">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded bg-muted px-2 py-0.5 text-xs">{f.periodKey}</span>
                        <span className="capitalize text-muted-foreground">{f.kind}</span>
                        <span className="text-muted-foreground">due {new Date(f.dueDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{formatCurrency(f.amount)}</span>
                        <button
                          onClick={() => togglePaid(f.id, f.paid)}
                          className={
                            f.paid
                              ? "inline-flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-xs font-medium text-brand-emerald-deep hover:bg-accent/80"
                              : "inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 hover:bg-amber-100"
                          }
                        >
                          {f.paid ? <><Check className="size-3" /> Paid</> : "Mark paid"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {s.feesDue > 0 && (
                  <p className="mt-2 text-xs text-amber-700">Outstanding: {formatCurrency(s.feesDue)}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function FeeDialog({
  student,
  onAssign,
}: {
  student: Student;
  onAssign: (s: Student, amount: number, kind: string, periodKey: string) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("50");
  const [kind, setKind] = useState("monthly");
  const [periodKey, setPeriodKey] = useState(monthKey());
  const [saving, setSaving] = useState(false);

  async function submit() {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt < 0) {
      toast.error("Enter a valid amount");
      return;
    }
    setSaving(true);
    await onAssign(student, amt, kind, periodKey);
    setSaving(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Receipt className="size-3.5" /> Assign fee
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign fee to {student.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="amount">Amount (PKR)</Label>
            <Input id="amount" type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Fee type</Label>
            <Select value={kind} onValueChange={setKind}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="one-time">One-time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="period">Billing period (YYYY-MM)</Label>
            <Input id="period" value={periodKey} onChange={(e) => setPeriodKey(e.target.value)} placeholder="2026-09" />
            <p className="text-xs text-muted-foreground">For monthly fees, this is the YYYY-MM of the bill. One fee per student+period.</p>
          </div>
          <Button onClick={submit} disabled={saving} className="w-full">
            {saving ? <><Loader2 className="size-4 animate-spin" /> Assigning…</> : "Assign fee"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PasswordDialog({ student }: { student: Student }) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/students/${student.id}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not reset password");
      toast.success(`Password updated for ${student.name}.`);
      setPassword("");
      setOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not reset password");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <KeyRound className="size-3.5" /> Reset password
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset password for {student.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="newpw">New password</Label>
            <Input
              id="newpw"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              minLength={6}
            />
            <p className="text-xs text-muted-foreground">
              Set a new password for this student. Tell them to log in with their email and this new password.
            </p>
          </div>
          <Button onClick={submit} disabled={saving || password.length < 6} className="w-full">
            {saving ? <><Loader2 className="size-4 animate-spin" /> Resetting…</> : "Reset password"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

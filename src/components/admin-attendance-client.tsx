"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Check,
  X,
  Loader2,
  Save,
  CalendarDays,
  Users,
  CheckCircle2,
  XCircle,
  Circle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { todayISO } from "@/lib/format";

type StudentAtt = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  attendanceId: string | null;
  present: boolean | null;
};

type Stats = {
  total: number;
  present: number;
  absent: number;
  unmarked: number;
};

export function AdminAttendanceClient() {
  const [date, setDate] = useState(todayISO());
  const [students, setStudents] = useState<StudentAtt[]>([]);
  const [original, setOriginal] = useState<StudentAtt[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, present: 0, absent: 0, unmarked: 0 });
  const [recentDates, setRecentDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async (d: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/attendance?date=${d}`);
      const data = await res.json();
      if (data.students) {
        setStudents(data.students);
        setOriginal(data.students);
        setStats(data.stats);
        setRecentDates(data.recentDates || []);
      }
    } catch {
      toast.error("Could not load attendance");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(date);
  }, [date, load]);

  function toggle(studentId: string, present: boolean) {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, present } : s)),
    );
  }

  function markAllPresent() {
    setStudents((prev) => prev.map((s) => ({ ...s, present: true })));
  }

  function markAllAbsent() {
    setStudents((prev) => prev.map((s) => ({ ...s, present: false })));
  }

  function hasChanges() {
    return students.some((s, i) => s.present !== original[i]?.present);
  }

  async function save() {
    const records = students
      .filter((s) => s.present !== null)
      .map((s) => ({ studentId: s.id, present: s.present as boolean }));

    if (records.length === 0) {
      toast.error("Mark at least one student before saving");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, records }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      toast.success(`Attendance saved for ${date} — ${data.saved} students marked`);
      setOriginal(students);
      // Reload to get updated stats + recent dates
      await load(date);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function shiftDate(days: number) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    setDate(d.toISOString().slice(0, 10));
  }

  const presentPct = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="size-8 animate-spin text-brand-emerald" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Date selector + actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <CalendarDays className="size-5 text-brand-emerald-deep" />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => shiftDate(-1)} aria-label="Previous day">
                  <ChevronLeft className="size-4" />
                </Button>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-[180px]"
                />
                <Button variant="outline" size="icon" onClick={() => shiftDate(1)} aria-label="Next day">
                  <ChevronRight className="size-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setDate(todayISO())}>
                  Today
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={markAllPresent}>
                <CheckCircle2 className="size-4 text-brand-emerald-deep" /> Mark all present
              </Button>
              <Button variant="outline" size="sm" onClick={markAllAbsent}>
                <XCircle className="size-4 text-red-500" /> Mark all absent
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatPill icon={Users} label="Total" value={stats.total} color="navy" />
        <StatPill icon={CheckCircle2} label="Present" value={stats.present} color="emerald" />
        <StatPill icon={XCircle} label="Absent" value={stats.absent} color="red" />
        <StatPill icon={Circle} label="Unmarked" value={stats.unmarked} color="slate" />
      </div>

      {/* Attendance bar */}
      {stats.total > 0 && (
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Attendance rate for {date}</p>
              <p className="font-display text-2xl font-semibold text-brand-emerald-deep">{presentPct}%</p>
            </div>
            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-emerald to-brand-emerald-deep transition-all duration-500"
                style={{ width: `${presentPct}%` }}
              />
            </div>
            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="size-2.5 rounded-full bg-brand-emerald" /> {stats.present} present
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2.5 rounded-full bg-red-400" /> {stats.absent} absent
              </span>
              {stats.unmarked > 0 && (
                <span className="flex items-center gap-1">
                  <span className="size-2.5 rounded-full bg-muted-foreground/30" /> {stats.unmarked} not yet marked
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Student list */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-4" /> Students — {date}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No students registered yet.</p>
          ) : (
            <div className="space-y-2">
              {students.map((s) => (
                <div
                  key={s.id}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-lg border p-3 transition-colors",
                    s.present === true && "border-brand-emerald/40 bg-accent/30",
                    s.present === false && "border-red-300/50 bg-red-50/30",
                    s.present === null && "border-border",
                  )}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {s.avatarUrl ? (
                      <img src={s.avatarUrl} alt={`${s.name}'s profile photo`} className="size-9 shrink-0 rounded-full border border-border object-cover" />
                    ) : (
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold uppercase text-white">
                        {s.name.charAt(0) || "S"}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{s.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{s.email}</p>
                    </div>
                  </div>

                  {/* Toggle buttons */}
                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      onClick={() => toggle(s.id, true)}
                      className={cn(
                        "inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm font-medium transition-colors",
                        s.present === true
                          ? "border-brand-emerald bg-accent text-brand-emerald-deep"
                          : "border-border text-muted-foreground hover:border-brand-emerald/40 hover:text-foreground",
                      )}
                      aria-label={`Mark ${s.name} present`}
                    >
                      <Check className="size-4" />
                      <span className="hidden sm:inline">Present</span>
                    </button>
                    <button
                      onClick={() => toggle(s.id, false)}
                      className={cn(
                        "inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm font-medium transition-colors",
                        s.present === false
                          ? "border-red-300 bg-red-50 text-red-600"
                          : "border-border text-muted-foreground hover:border-red-300/50 hover:text-foreground",
                      )}
                      aria-label={`Mark ${s.name} absent`}
                    >
                      <X className="size-4" />
                      <span className="hidden sm:inline">Absent</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Save bar */}
          {students.length > 0 && (
            <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
              <p className="text-sm text-muted-foreground">
                {hasChanges() ? "You have unsaved changes" : "All changes saved"}
              </p>
              <Button onClick={save} disabled={saving || !hasChanges()} size="lg">
                {saving ? <><Loader2 className="size-4 animate-spin" /> Saving…</> : <><Save className="size-4" /> Save attendance</>}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent dates */}
      {recentDates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarDays className="size-4" /> Recent attendance days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {recentDates.map((d) => (
                <button
                  key={d}
                  onClick={() => setDate(d)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
                    d === date
                      ? "border-brand-emerald bg-accent text-brand-emerald-deep"
                      : "border-border text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StatPill({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: "navy" | "emerald" | "red" | "slate";
}) {
  const colors = {
    navy: "bg-brand-navy text-white",
    emerald: "bg-accent text-brand-emerald-deep",
    red: "bg-red-50 text-red-600",
    slate: "bg-muted text-muted-foreground",
  };
  return (
    <div className={cn("flex items-center gap-3 rounded-xl border border-border p-4", colors[color])}>
      <Icon className="size-5 shrink-0 opacity-80" />
      <div>
        <p className="font-display text-2xl font-semibold">{value}</p>
        <p className="text-xs opacity-70">{label}</p>
      </div>
    </div>
  );
}

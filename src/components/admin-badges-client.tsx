"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Loader2,
  Clock,
  Check,
  X,
  ArrowUp,
  ArrowDown,
  History,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TIER_LABELS, TIER_ORDER, TIER_COLORS, TIER_DOT_COLORS, type BadgeTier } from "@/lib/tiers";

type PendingUser = {
  id: string;
  name: string;
  email: string;
  classGrade: string | null;
  createdAt: string;
};

type HistoryEntry = {
  id: string;
  oldBadge: string | null;
  newBadge: string;
  changedAt: string;
  admin: { name: string } | null;
};

export function AdminApprovalsClient() {
  const [pending, setPending] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/admin/pending");
      const data = await res.json();
      if (cancelled) return;
      if (data.pending) setPending(data.pending);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  async function approve(userId: string, badge: BadgeTier) {
    setProcessing(userId);
    try {
      const res = await fetch("/api/admin/pending", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, badge, action: "approve" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast.success(data.message || `Approved with ${TIER_LABELS[badge]} badge`);
      setPending((p) => p.filter((u) => u.id !== userId));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to approve");
    } finally {
      setProcessing(null);
    }
  }

  async function reject(userId: string) {
    if (!confirm("Reject this account? The user will not be able to log in.")) return;
    setProcessing(userId);
    try {
      const res = await fetch("/api/admin/pending", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action: "reject" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast.success("Account rejected");
      setPending((p) => p.filter((u) => u.id !== userId));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to reject");
    } finally {
      setProcessing(null);
    }
  }

  if (loading) {
    return <div className="flex justify-center py-8"><Loader2 className="size-6 animate-spin text-brand-emerald" /></div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="size-4" /> Pending approvals {pending.length > 0 && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">{pending.length}</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {pending.length === 0 ? (
          <p className="py-4 text-center text-sm text-muted-foreground">No pending accounts. All caught up! ✅</p>
        ) : (
          <div className="space-y-3">
            {pending.map((u) => (
              <PendingCard key={u.id} user={u} processing={processing === u.id} onApprove={approve} onReject={reject} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PendingCard({
  user,
  processing,
  onApprove,
  onReject,
}: {
  user: PendingUser;
  processing: boolean;
  onApprove: (id: string, badge: BadgeTier) => void;
  onReject: (id: string) => void;
}) {
  const [badge, setBadge] = useState<BadgeTier>("basic");
  return (
    <div className="rounded-xl border border-amber-200/60 bg-amber-50/30 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-foreground">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {user.classGrade || "No class set"} · registered {new Date(user.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">Pending</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Select value={badge} onValueChange={(v) => setBadge(v as BadgeTier)}>
          <SelectTrigger className="h-8 w-[140px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TIER_ORDER.map((t) => (
              <SelectItem key={t} value={t}>{TIER_LABELS[t]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button size="sm" onClick={() => onApprove(user.id, badge)} disabled={processing}>
          {processing ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" />}
          Approve as {TIER_LABELS[badge]}
        </Button>
        <Button size="sm" variant="outline" onClick={() => onReject(user.id)} disabled={processing} className="border-red-200 text-red-600 hover:bg-red-50">
          <X className="size-3.5" /> Reject
        </Button>
      </div>
    </div>
  );
}

/* --- Badge management for active students --- */

export function BadgeManager({ userId, userName, currentBadge }: { userId: string; userName: string; currentBadge: string }) {
  const [newBadge, setNewBadge] = useState<BadgeTier>(currentBadge as BadgeTier);
  const [saving, setSaving] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  async function saveBadge() {
    if (newBadge === currentBadge) {
      toast.info("Badge is already " + TIER_LABELS[newBadge]);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/badges/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newBadge }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast.success(`Badge changed from ${TIER_LABELS[data.oldBadge]} → ${TIER_LABELS[newBadge]} for ${userName}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={newBadge} onValueChange={(v) => setNewBadge(v as BadgeTier)}>
        <SelectTrigger className="h-8 w-[130px] text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {TIER_ORDER.map((t) => (
            <SelectItem key={t} value={t}>
              <span className="flex items-center gap-1.5">
                <span className={cn("size-2 rounded-full", TIER_DOT_COLORS[t])} />
                {TIER_LABELS[t]}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button size="sm" variant="outline" onClick={saveBadge} disabled={saving || newBadge === currentBadge}>
        {saving ? <Loader2 className="size-3.5 animate-spin" /> : newBadge > currentBadge ? <ArrowUp className="size-3.5 text-brand-emerald-deep" /> : <ArrowDown className="size-3.5 text-amber-600" />}
        Set badge
      </Button>
      <button onClick={() => setHistoryOpen(true)} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="View promotion history">
        <History className="size-4" />
      </button>
      <HistoryDialog userId={userId} userName={userName} open={historyOpen} onOpenChange={setHistoryOpen} />
    </div>
  );
}

function HistoryDialog({ userId, userName, open, onOpenChange }: { userId: string; userName: string; open: boolean; onOpenChange: (v: boolean) => void }) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    (async () => {
      const res = await fetch(`/api/admin/badges/${userId}`);
      const data = await res.json();
      if (cancelled) return;
      if (data.history) setHistory(data.history);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [open, userId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="size-4" /> Badge history — {userName}
          </DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="py-6 text-center"><Loader2 className="mx-auto size-6 animate-spin text-brand-emerald" /></div>
        ) : history.length === 0 ? (
          <p className="py-4 text-center text-sm text-muted-foreground">No badge changes recorded yet.</p>
        ) : (
          <div className="space-y-3 py-2">
            {history.map((h) => (
              <div key={h.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="flex items-center gap-2">
                  {h.oldBadge ? (
                    <>
                      <BadgePill badge={h.oldBadge} />
                      <ChevronRight className="size-3 text-muted-foreground" />
                      <BadgePill badge={h.newBadge} />
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="size-4 text-brand-emerald-deep" />
                      <BadgePill badge={h.newBadge} />
                      <span className="text-xs text-muted-foreground">initial assignment</span>
                    </>
                  )}
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs text-muted-foreground">{h.admin?.name || "Admin"}</p>
                  <p className="text-xs text-muted-foreground">{new Date(h.changedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function BadgePill({ badge }: { badge: string }) {
  const tier = badge as BadgeTier;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium", TIER_COLORS[tier] || TIER_COLORS.basic)}>
      <span className={cn("size-1.5 rounded-full", TIER_DOT_COLORS[tier] || TIER_DOT_COLORS.basic)} />
      {TIER_LABELS[tier] || "Basic"}
    </span>
  );
}

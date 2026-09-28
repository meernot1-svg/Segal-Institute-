"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight, MapPin, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type EventItem = {
  id: string;
  title: string;
  description?: string;
  date: string; // yyyy-mm-dd
  time?: string | null;
  location?: string | null;
  color: "emerald" | "navy" | "gold" | "rose" | "violet";
};

const COLORS: Record<EventItem["color"], { dot: string; ring: string; bg: string; text: string; border: string }> = {
  emerald: { dot: "bg-brand-emerald", ring: "ring-brand-emerald/40", bg: "bg-accent", text: "text-brand-emerald-deep", border: "border-brand-emerald/30" },
  navy: { dot: "bg-brand-navy", ring: "ring-brand-navy/40", bg: "bg-brand-navy/10", text: "text-brand-navy", border: "border-brand-navy/30" },
  gold: { dot: "bg-amber-500", ring: "ring-amber-500/40", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  rose: { dot: "bg-rose-500", ring: "ring-rose-500/40", bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  violet: { dot: "bg-violet-500", ring: "ring-violet-500/40", bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
};

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function ymd(d: Date) {
  return d.toISOString().slice(0, 10);
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function DashboardCalendar() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<Date>(() => new Date());
  const [selectedDay, setSelectedDay] = useState<Date>(() => new Date());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (cancelled) return;
        if (data.events) setEvents(data.events);
      } catch {
        // ignore — calendar still renders empty
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Group events by yyyy-mm-dd
  const eventsByDay = useMemo(() => {
    const m: Record<string, EventItem[]> = {};
    for (const e of events) {
      if (!m[e.date]) m[e.date] = [];
      m[e.date].push(e);
    }
    return m;
  }, [events]);

  // Upcoming list (today + future), sorted, top 6
  const upcoming = useMemo(() => {
    const todayISOStr = ymd(new Date());
    return events
      .filter((e) => e.date >= todayISOStr)
      .sort((a, b) => (a.date + (a.time || "")).localeCompare(b.date + (b.time || "")))
      .slice(0, 6);
  }, [events]);

  // Build the calendar grid for the cursor month
  const grid = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const start = new Date(first);
    start.setDate(1 - first.getDay()); // back up to Sunday
    const days: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }
    return days;
  }, [cursor]);

  const today = new Date();
  const inMonth = (d: Date) => d.getMonth() === cursor.getMonth();
  const selectedDayEvents = eventsByDay[ymd(selectedDay)] || [];

  function prevMonth() {
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1));
  }
  function nextMonth() {
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1));
  }
  function goToday() {
    const t = new Date();
    setCursor(new Date(t.getFullYear(), t.getMonth(), 1));
    setSelectedDay(t);
  }

  return (
    <div className="grid gap-4">
      {/* Calendar card */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Calendar</p>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={prevMonth}
              className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent"
              aria-label="Previous month"
            >
              <ChevronLeft className="size-4" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={nextMonth}
              className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent"
              aria-label="Next month"
            >
              <ChevronRight className="size-4" />
            </motion.button>
          </div>
        </div>

        {/* Weekday header */}
        <div className="mt-3 grid grid-cols-7 gap-1">
          {WEEKDAYS.map((d, i) => (
            <div key={i} className="text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {d}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="mt-1 grid grid-cols-7 gap-1">
          {grid.map((d, idx) => {
            const iso = ymd(d);
            const dayEvents = eventsByDay[iso] || [];
            const isToday = sameDay(d, today);
            const isSelected = sameDay(d, selectedDay);
            const dim = !inMonth(d);
            return (
              <motion.button
                key={iso + idx}
                whileTap={{ scale: 0.92 }}
                onClick={() => setSelectedDay(new Date(d))}
                className={cn(
                  "relative flex min-h-11 flex-col items-center justify-start gap-0.5 rounded-lg border pt-1.5 pb-1 text-xs transition-colors",
                  dim && "opacity-35",
                  isSelected
                    ? "border-brand-emerald bg-accent"
                    : "border-border bg-background hover:border-brand-emerald/40 hover:bg-accent/50",
                  isToday && "ring-2 ring-brand-emerald/40",
                )}
              >
                <span className={cn(
                  "text-[11px] font-medium",
                  isToday ? "text-brand-emerald-deep" : "text-foreground",
                )}>
                  {d.getDate()}
                </span>
                {/* Dots for events on this day */}
                <div className="flex flex-wrap items-center justify-center gap-0.5">
                  {dayEvents.slice(0, 3).map((e) => (
                    <span
                      key={e.id}
                      className={cn("size-1.5 rounded-full", COLORS[e.color].dot)}
                      title={e.title}
                    />
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="text-[9px] font-medium text-muted-foreground">+{dayEvents.length - 3}</span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* "Today" pill */}
        <div className="mt-3 flex justify-center">
          <button
            onClick={goToday}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent"
          >
            <CalendarDays className="size-3.5 text-brand-emerald" />
            Jump to today
          </button>
        </div>
      </div>

      {/* Selected day events */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-base font-semibold text-foreground">
            {selectedDay.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
          </h3>
          <span className="text-xs text-muted-foreground">{selectedDayEvents.length} event{selectedDayEvents.length === 1 ? "" : "s"}</span>
        </div>
        <AnimatePresence mode="wait">
          {selectedDayEvents.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-sm text-muted-foreground"
            >
              No events on this day. Pick another day, or check the upcoming list below.
            </motion.p>
          ) : (
            <motion.ul
              key={selectedDay.toISOString()}
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05 } },
              }}
              className="mt-3 space-y-2"
            >
              {selectedDayEvents.map((e) => (
                <motion.li
                  key={e.id}
                  variants={{
                    hidden: { opacity: 0, y: 6 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className={cn(
                    "rounded-lg border bg-background p-3",
                    COLORS[e.color].border,
                    COLORS[e.color].bg,
                  )}
                >
                  <div className="flex items-start gap-2">
                    <span className={cn("mt-1.5 inline-flex size-2.5 shrink-0 rounded-full", COLORS[e.color].dot)} />
                    <div className="min-w-0 flex-1">
                      <p className={cn("text-sm font-semibold", COLORS[e.color].text)}>{e.title}</p>
                      {e.description && (
                        <p className="mt-0.5 text-xs text-muted-foreground">{e.description}</p>
                      )}
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                        {e.time && (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="size-3" /> {e.time}
                          </span>
                        )}
                        {e.location && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="size-3" /> {e.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Upcoming events list (animated slide-in) */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-brand-emerald" />
          <h3 className="font-display text-base font-semibold text-foreground">Upcoming events</h3>
        </div>
        {loading ? (
          <div className="mt-3 space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-12 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : upcoming.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            No upcoming events scheduled. Check back soon — your teacher can add events from the admin panel.
          </p>
        ) : (
          <motion.ul
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
            }}
            className="mt-3 space-y-2"
          >
            {upcoming.map((e) => {
              const d = new Date(e.date + "T00:00:00");
              const day = d.getDate();
              const mon = d.toLocaleString(undefined, { month: "short" });
              return (
                <motion.li
                  key={e.id}
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="flex items-start gap-3 rounded-lg border border-border bg-background p-3"
                >
                  <div className={cn(
                    "flex size-11 shrink-0 flex-col items-center justify-center rounded-lg border text-center",
                    COLORS[e.color].border,
                    COLORS[e.color].bg,
                  )}>
                    <span className={cn("text-base font-bold leading-none", COLORS[e.color].text)}>{day}</span>
                    <span className="text-[10px] font-medium uppercase text-muted-foreground">{mon}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{e.title}</p>
                    {e.description && (
                      <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{e.description}</p>
                    )}
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                      {e.time && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3" /> {e.time}
                        </span>
                      )}
                      {e.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3" /> {e.location}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </div>
    </div>
  );
}

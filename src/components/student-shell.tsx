"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookA,
  User,
  LogOut,
  Menu,
  X,
  Bot,
  Mic,
  PenTool,
  Mic2,
  Trophy,
  BookOpen,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/lib/auth";

type NavItem = { href: string; label: string; icon: React.ElementType };

// MCQ Tests and Flashcards have been removed from the product per user
// request — they're no longer in the nav, the dashboard, or any of the
// student-facing pages. The whole student site is mobile-first (only the
// admin panel keeps its desktop sidebar layout).
const PRIMARY_NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/lessons", label: "Lessons", icon: BookOpen },
  { href: "/verbs", label: "Learn Verbs", icon: BookA },
];

const SECONDARY_NAV: NavItem[] = [
  { href: "/chat", label: "AI Tutor", icon: Bot },
  { href: "/speech-generator", label: "Speech Generator", icon: Mic },
  { href: "/poetry-generator", label: "Poetry Generator", icon: PenTool },
  { href: "/speeches", label: "Student Speeches", icon: Mic2 },
  { href: "/monthly-results", label: "My Monthly Results", icon: Trophy },
  { href: "/profile", label: "Profile", icon: User },
];

// Mobile bottom nav — only 5 slots, used on every student page.
// The Sentence Generator now lives INSIDE the Lessons page (as a "Practice
// sentences" section), so the old standalone Sentences slot is replaced
// with the Sentence Generator link that points at the lessons page anchor.
const MOBILE_NAV: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/lessons", label: "Lessons", icon: BookOpen },
  { href: "/verbs", label: "Verbs", icon: BookA },
  { href: "/speeches", label: "Speeches", icon: Mic2 },
  { href: "/chat", label: "AI Tutor", icon: Bot },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(href + "/");
}

export function StudentShell({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Mobile-first top bar — visible on every breakpoint.
          The student site is mobile-first, so the top bar is the primary
          navigation on phones AND on larger screens. (The admin panel keeps
          its own desktop sidebar layout.) */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur-md">
        <Logo href="/dashboard" />
        <button
          className="inline-flex size-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <X className="size-5" />
              </motion.span>
            ) : (
              <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <Menu className="size-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </header>

      {/* Animated slide-down menu (mobile + tablet + desktop student) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-b border-border bg-background"
          >
            <nav className="mx-auto grid max-w-md gap-1 px-4 py-3">
              {[...PRIMARY_NAV, ...SECONDARY_NAV].map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * idx, duration: 0.18 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex min-h-12 items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                      isActive(pathname, item.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent"
                    )}
                  >
                    <item.icon className="size-5" />
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <button
                onClick={logout}
                className="mt-1 flex min-h-12 items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <LogOut className="size-5" /> Log out
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content — capped at a comfortable mobile reading width on every
          breakpoint. The student experience is mobile-first by design. */}
      <div className="flex flex-1 flex-col">
        <main className="flex-1 px-4 py-6 sm:px-6">
          <div className="mx-auto w-full max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Mobile bottom nav — sticky, 5 slots, large touch targets */}
        <nav className="sticky bottom-0 z-40 grid grid-cols-5 border-t border-border bg-background/95 backdrop-blur-md">
          {MOBILE_NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                  active
                    ? "text-brand-emerald-deep"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <motion.span
                  whileTap={{ scale: 0.88 }}
                  transition={{ duration: 0.12 }}
                  className="flex items-center justify-center"
                >
                  <item.icon className={cn("size-5", active && "text-brand-emerald")} />
                </motion.span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

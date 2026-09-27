"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  BookA,
  GraduationCap,
  ListChecks,
  BarChart3,
  User,
  LogOut,
  Menu,
  X,
  Bot,
  Mic,
  PenTool,
  Mic2,
  Trophy,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/lib/auth";

type NavItem = { href: string; label: string; icon: React.ElementType };

const PRIMARY_NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/verbs", label: "Learn Verbs", icon: BookA },
  { href: "/learn", label: "Flashcards", icon: GraduationCap },
  { href: "/tests/mcq", label: "MCQ Tests", icon: ListChecks },
  { href: "/results", label: "Test Results", icon: BarChart3 },
];

const SECONDARY_NAV: NavItem[] = [
  { href: "/chat", label: "AI Tutor", icon: Bot },
  { href: "/speech-generator", label: "Speech Generator", icon: Mic },
  { href: "/poetry-generator", label: "Poetry Generator", icon: PenTool },
  { href: "/speeches", label: "Student Speeches", icon: Mic2 },
  { href: "/monthly-results", label: "My Monthly Results", icon: Trophy },
  { href: "/profile", label: "Profile", icon: User },
];

const MOBILE_NAV: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/verbs", label: "Verbs", icon: BookA },
  { href: "/learn", label: "Learn", icon: GraduationCap },
  { href: "/tests/mcq", label: "Tests", icon: ListChecks },
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
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-sidebar text-sidebar-foreground lg:fixed lg:inset-y-0 lg:flex lg:flex-col">
        <div className="flex h-16 items-center px-5">
          <Logo variant="light" href="/dashboard" />
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 scroll-fine">
          <SidebarSection items={PRIMARY_NAV} pathname={pathname} />
          <div className="my-4 h-px bg-sidebar-border" />
          <SidebarSection items={SECONDARY_NAV} pathname={pathname} />
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold uppercase text-white">
              {user.name.charAt(0) || "S"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{user.name}</p>
              <p className="truncate text-xs text-white/50">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="inline-flex size-8 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-sidebar-accent hover:text-white"
              aria-label="Log out"
              title="Log out"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur-md lg:hidden">
        <Logo href="/dashboard" />
        <button
          className="inline-flex size-10 items-center justify-center rounded-md text-foreground"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <div className="border-b border-border bg-background lg:hidden">
          <nav className="mx-auto grid max-w-6xl gap-1 px-4 py-3">
            {[...PRIMARY_NAV, ...SECONDARY_NAV].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium",
                  isActive(pathname, item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
            <button
              onClick={logout}
              className="mt-1 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <LogOut className="size-4" /> Log out
            </button>
          </nav>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
        {/* Mobile bottom nav */}
        <nav className="sticky bottom-0 z-40 grid grid-cols-5 border-t border-border bg-background/95 backdrop-blur-md lg:hidden">
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
                <item.icon className={cn("size-5", active && "text-brand-emerald")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function SidebarSection({
  items,
  pathname,
}: {
  items: NavItem[];
  pathname: string;
}) {
  return (
    <ul className="space-y-1">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-white/70 hover:bg-sidebar-accent hover:text-white"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

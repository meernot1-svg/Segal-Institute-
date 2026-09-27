"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  BookA,
  CalendarDays,
  Receipt,
  LogOut,
  Menu,
  X,
  BookOpen,
  Mic2,
  FileText,
  Trophy,
  ClipboardCheck,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/lib/auth";

type NavItem = { href: string; label: string; icon: React.ElementType };

const PRIMARY_NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/attendance", label: "Attendance", icon: ClipboardCheck },
  { href: "/admin/topics", label: "Daily Topics", icon: CalendarDays },
  { href: "/admin/speeches", label: "Student Speeches", icon: Mic2 },
  { href: "/admin/results", label: "Monthly Results", icon: FileText },
  { href: "/admin/best-student", label: "Best Student", icon: Trophy },
  { href: "/admin/fees", label: "Fees", icon: Receipt },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(href + "/");
}

export function AdminShell({
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
      <aside className="hidden w-64 shrink-0 border-r border-border bg-sidebar text-sidebar-foreground lg:fixed lg:inset-y-0 lg:flex lg:flex-col">
        <div className="flex h-16 items-center px-5">
          <Logo variant="light" href="/admin" />
        </div>
        <div className="px-5 pb-2 pt-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sidebar-accent px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white/80">
            <BookOpen className="size-3" /> Admin
          </span>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 scroll-fine">
          <SidebarSection items={PRIMARY_NAV} pathname={pathname} />
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold uppercase text-white">
              {user.name.charAt(0) || "A"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{user.name}</p>
              <p className="truncate text-xs text-white/50">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="inline-flex size-8 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-sidebar-accent hover:text-white"
              aria-label="Log out"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur-md lg:hidden">
        <Logo href="/admin" />
        <button
          className="inline-flex size-10 items-center justify-center rounded-md text-foreground"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>

      {mobileOpen && (
        <div className="border-b border-border bg-background lg:hidden">
          <nav className="mx-auto grid max-w-6xl gap-1 px-4 py-3">
            {PRIMARY_NAV.map((item) => (
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

      <div className="flex flex-1 flex-col lg:pl-64">
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarSection({ items, pathname }: { items: NavItem[]; pathname: string }) {
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

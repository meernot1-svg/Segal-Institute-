"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { branding } from "@/lib/branding";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/#how-it-works", label: "How it works" },
];

export function PublicHeader({ isLoggedIn }: { isLoggedIn?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-background"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <Button asChild size="sm" className="ml-2">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="ml-1">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild size="sm" className="ml-1">
                <Link href="/register">Start learning</Link>
              </Button>
            </>
          )}
        </nav>

        <button
          className="inline-flex size-10 items-center justify-center rounded-md text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <Button asChild className="mt-2" onClick={() => setOpen(false)}>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline" className="mt-2" onClick={() => setOpen(false)}>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild className="mt-2" onClick={() => setOpen(false)}>
                  <Link href="/register">Start learning</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="mt-auto bg-brand-ink text-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo variant="light" href="/" />
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            A focused way to learn the three forms of English verbs — with
            practice, tests, AI help, and streaks to keep you going.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/40">
            {branding.address}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <FooterCol
            title="Learn"
            links={[
              { href: "/register", label: "Get started" },
              { href: "/#how-it-works", label: "How it works" },
              { href: "/about", label: "About" },
            ]}
          />
          <FooterCol
            title="Account"
            links={[
              { href: "/login", label: "Log in" },
              { href: "/register", label: "Create account" },
              { href: "/forgot-password", label: "Forgot password" },
            ]}
          />
          <FooterCol
            title="Practice"
            links={[
              { href: "/verbs", label: "Browse verbs" },
              { href: "/learn", label: "Flashcards" },
              { href: "/tests/mcq", label: "MCQ tests" },
              { href: "/blog", label: "Blog" },
            ]}
          />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Segal Institute. Built for learners.</p>
          <p className="inline-flex items-center gap-1.5">
            <BookOpen className="size-3.5" /> V1 · V2 · V3
          </p>
        </div>
        <div className="border-t border-white/10">
          <p className="mx-auto max-w-6xl px-4 py-3 text-center text-xs text-white/40 sm:px-6">
            Under the supervision of <span className="font-medium text-white/60">Sir Sajid Murad</span>
          </p>
        </div>
      </div>
      <div className="bg-white">
        <p className="mx-auto max-w-6xl px-4 py-2.5 text-right text-xs italic text-brand-slate sm:px-6">
          Created by Safiullah
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-white/50">
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { Logo } from "@/components/logo";
import { branding } from "@/lib/branding";
import { Sparkles } from "lucide-react";

export function AuthShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Branding panel */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-brand-navy p-12 text-white lg:flex">
        <Logo variant="light" href="/" />
        <div className="relative">
          <p className="font-display text-3xl leading-tight tracking-tight text-white sm:text-4xl">
            “Repetition is the mother of learning — and verbs reward it more than
            anything else.”
          </p>
          <p className="mt-5 text-sm text-white/60">
            Build a daily habit around the three forms. Small, calm, consistent.
          </p>
        </div>
        <ul className="space-y-3 text-sm text-white/70">
          <li className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald" />
            {branding.tagline}
          </li>
          <li className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald" />
            Flashcards, tests & progress tracking
          </li>
          <li className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald" />
            Works on phone and desktop
          </li>
        </ul>
        <Sparkles className="pointer-events-none absolute -bottom-10 -right-10 size-64 text-white/5" />
      </aside>

      {/* Form panel */}
      <main className="surface-cream flex items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo href="/" />
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}

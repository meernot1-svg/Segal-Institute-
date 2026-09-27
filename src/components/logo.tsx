import Link from "next/link";
import { branding } from "@/lib/branding";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "dark",
  href = "/",
}: {
  className?: string;
  variant?: "dark" | "light";
  href?: string | null;
}) {
  const wrap = (children: React.ReactNode) =>
    href ? (
      <Link href={href} className={cn("inline-flex items-center gap-2.5 group", className)}>
        {children}
      </Link>
    ) : (
      <span className={cn("inline-flex items-center gap-2.5", className)}>{children}</span>
    );

  return wrap(
    <>
      {/* Mark: three stacked verb-form ticks suggesting V1/V2/V3 */}
      <span
        aria-hidden
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-lg font-display text-base font-semibold leading-none tracking-tight",
          variant === "dark"
            ? "bg-brand-navy text-white"
            : "bg-white/10 text-white ring-1 ring-white/15"
        )}
      >
        <span className="flex flex-col gap-[2px]">
          <span className="h-[3px] w-4 rounded-full bg-brand-emerald" />
          <span className="h-[3px] w-5 rounded-full bg-white/90" />
          <span className="h-[3px] w-3 rounded-full bg-white/60" />
        </span>
      </span>
      <span
        className={cn(
          "font-display text-lg font-semibold tracking-tight",
          variant === "dark" ? "text-foreground" : "text-white"
        )}
      >
        {branding.name}
      </span>
    </>
  );
}

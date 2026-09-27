import Link from "next/link";
import { PublicHeader, PublicFooter } from "@/components/public-header";
import { ArrowLeft } from "lucide-react";

export function ArticleLayout({
  children,
  title,
  description,
  publishedAt,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  publishedAt: string;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6 lg:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to blog
        </Link>
        <p className="mt-6 text-sm font-medium text-brand-emerald-deep">Segal Institute · Blog</p>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          Published {new Date(publishedAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
        </p>
        <article className="prose-reading mt-10 space-y-6 text-base leading-relaxed text-foreground/90">
          {children}
        </article>
      </main>
      <PublicFooter />
    </div>
  );
}

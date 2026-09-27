import { AdminHomeContentClient } from "@/components/admin-home-content-client";

export const dynamic = "force-dynamic";

export default function AdminHomeContentPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Edit Homepage
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit the text and images of the public homepage. Changes appear instantly for every visitor after they reload the page.
        </p>
      </div>
      <div className="mt-6">
        <AdminHomeContentClient />
      </div>
    </div>
  );
}

import { AdminTopicsClient } from "@/components/admin-topics-client";

export const dynamic = "force-dynamic";

export default function AdminTopicsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Daily Topics
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Set what students see on their dashboard each day. Today's topic appears automatically.
        </p>
      </div>
      <div className="mt-6">
        <AdminTopicsClient />
      </div>
    </div>
  );
}

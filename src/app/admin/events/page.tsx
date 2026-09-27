import { AdminEventsClient } from "@/components/admin-events-client";

export const dynamic = "force-dynamic";

export default function AdminEventsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Calendar Events
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create events that appear on every student&apos;s dashboard calendar. Tag them with a color so students can spot them at a glance.
        </p>
      </div>
      <div className="mt-6">
        <AdminEventsClient />
      </div>
    </div>
  );
}

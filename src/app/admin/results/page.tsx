import { getCurrentUser } from "@/lib/auth";
import { AdminResultsClient } from "@/components/admin-results-client";

export const dynamic = "force-dynamic";

export default async function AdminResultsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return null;
  }
  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Monthly Results
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload a result image for the month. Every student sees the same image on their My Monthly Results page.
        </p>
      </div>
      <div className="mt-6">
        <AdminResultsClient />
      </div>
    </div>
  );
}

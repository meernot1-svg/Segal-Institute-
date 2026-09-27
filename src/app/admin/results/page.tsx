import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { AdminResultsClient } from "@/components/admin-results-client";

export const dynamic = "force-dynamic";

export default async function AdminResultsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return null;
  }
  const students = await db.profile.findMany({
    where: { role: "student" },
    orderBy: { name: "asc" },
    select: { id: true, name: true, email: true },
  });

  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Monthly Results
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Write your raw notes about a student. The AI turns them into a polished monthly result card the student can read.
        </p>
      </div>
      <div className="mt-6">
        <AdminResultsClient students={students} />
      </div>
    </div>
  );
}

import { getCurrentUser } from "@/lib/auth";
import { AdminAttendanceClient } from "@/components/admin-attendance-client";

export const dynamic = "force-dynamic";

export default async function AdminAttendancePage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return null;

  return (
    <div className="mx-auto max-w-4xl">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Attendance
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Mark students present or absent for each day. Students see their
          attendance percentage on their dashboard.
        </p>
      </div>
      <div className="mt-6">
        <AdminAttendanceClient />
      </div>
    </div>
  );
}

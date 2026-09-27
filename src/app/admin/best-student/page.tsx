import { AdminBestStudentClient } from "@/components/admin-best-student-client";

export const dynamic = "force-dynamic";

export default function AdminBestStudentPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Best Student of the Month
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload a name, photo, and short blurb. The most recent active entry appears on every student's dashboard.
        </p>
      </div>
      <div className="mt-6">
        <AdminBestStudentClient />
      </div>
    </div>
  );
}

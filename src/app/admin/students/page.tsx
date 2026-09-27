import { AdminStudentsClient } from "@/components/admin-students-client";
import { AdminApprovalsClient } from "@/components/admin-badges-client";

export const dynamic = "force-dynamic";

export default function AdminStudentsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Students
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Approve pending accounts, manage badges, assign monthly fees, mark fees paid, or remove an account.
        </p>
      </div>
      {/* Pending approvals queue */}
      <div className="mt-6">
        <AdminApprovalsClient />
      </div>
      {/* All students with badge management */}
      <div className="mt-6">
        <AdminStudentsClient />
      </div>
    </div>
  );
}

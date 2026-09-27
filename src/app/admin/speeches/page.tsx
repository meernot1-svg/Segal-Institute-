import { AdminSpeechesClient } from "@/components/admin-speeches-client";

export const dynamic = "force-dynamic";

export default function AdminSpeechesPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Student Speeches
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Write or paste a student's speech, poem, or essay. It appears in the Speeches section for all students to read.
        </p>
      </div>
      <div className="mt-6">
        <AdminSpeechesClient />
      </div>
    </div>
  );
}

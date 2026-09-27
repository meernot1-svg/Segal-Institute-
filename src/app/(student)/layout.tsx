import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { StudentShell } from "@/components/student-shell";

export const dynamic = "force-dynamic";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return <StudentShell user={user}>{children}</StudentShell>;
}

import { redirect } from "next/navigation";

// MCQ tests have been removed from the product. Redirect any old link to the
// student dashboard so nothing 404s.
export default function McqTestPage() {
  redirect("/dashboard");
}

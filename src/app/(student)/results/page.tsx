import { redirect } from "next/navigation";

// MCQ tests (and therefore test results) have been removed from the product.
// Redirect any old link to the student dashboard so nothing 404s.
export default function ResultsPage() {
  redirect("/dashboard");
}

import { redirect } from "next/navigation";

// Flashcards have been removed from the product. Redirect any old link to the
// student dashboard so nothing 404s.
export default function LearnPage() {
  redirect("/dashboard");
}

import { redirect } from "next/navigation";

// The Sentence Generator now lives INSIDE the Lessons page (as a "Practice
// sentences" section at /lessons#practice). This standalone route redirects
// there so any old bookmark or link still works.
export default function SentenceGeneratorPage() {
  redirect("/lessons#practice");
}

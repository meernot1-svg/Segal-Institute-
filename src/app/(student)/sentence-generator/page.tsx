import { GeneratorShell } from "@/components/generator-shell";
import { LESSON_DROPDOWN_OPTIONS } from "@/lib/lesson-options";

export const dynamic = "force-dynamic";

export default function SentenceGeneratorPage() {
  return (
    <GeneratorShell
      title="Sentence Generator"
      subtitle="Pick a lesson below and get practice sentences on it — in Urdu, Sindhi, English, or any other language. You can also type your own topic instead."
      endpoint="/api/sentence-generator"
      fields={[
        {
          key: "lesson",
          label: "Lesson (optional — pick a lesson to get practice sentences on it)",
          type: "select",
          options: ["(no lesson — use my own topic)", ...LESSON_DROPDOWN_OPTIONS],
        },
        {
          key: "topic",
          label: "Topic (or leave blank if you picked a lesson above)",
          placeholder: "e.g. The importance of trees, کرنسی کی کمی, Friendship, Climate change…",
        },
        {
          key: "language",
          label: "Language",
          type: "select",
          options: [
            "Urdu",
            "Sindhi",
            "English",
            "Hindi",
            "Arabic",
            "Persian",
            "Pashto",
            "Punjabi",
            "Bengali",
            "Spanish",
            "French",
            "German",
            "Italian",
            "Portuguese",
            "Russian",
            "Turkish",
            "Chinese",
            "Japanese",
            "Korean",
            "Indonesian",
            "Malay",
            "Dutch",
            "Swedish",
          ],
        },
        {
          key: "count",
          label: "How many sentences",
          type: "select",
          options: ["3", "5", "8", "10", "15", "20"],
        },
        {
          key: "sentenceType",
          label: "Sentence type",
          type: "select",
          options: [
            "Mixed",
            "Simple",
            "Compound",
            "Complex",
            "Question",
            "Affirmative",
            "Negative",
            "Imperative",
          ],
        },
        {
          key: "level",
          label: "Level",
          type: "select",
          options: ["Beginner", "Intermediate", "Advanced"],
        },
        {
          key: "tone",
          label: "Tone / style hint (optional)",
          placeholder: "e.g. formal, conversational, poetic, funny…",
        },
      ]}
      showLibrary
    />
  );
}

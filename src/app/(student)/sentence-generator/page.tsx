import { GeneratorShell } from "@/components/generator-shell";

export const dynamic = "force-dynamic";

export default function SentenceGeneratorPage() {
  return (
    <GeneratorShell
      title="Sentence Generator"
      subtitle="Generate original sentences on any topic, in any language, at any level. Pick the topic, choose the language, set the count — the AI does the rest."
      endpoint="/api/sentence-generator"
      fields={[
        {
          key: "topic",
          label: "Topic",
          placeholder: "e.g. The importance of trees, کرنسی کی کمی, Friendship, Climate change…",
          required: true,
        },
        {
          key: "language",
          label: "Language",
          type: "select",
          options: [
            "English",
            "Urdu",
            "Sindhi",
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
      mockNotice
      showLibrary
    />
  );
}

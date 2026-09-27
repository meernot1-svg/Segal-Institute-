import { GeneratorShell } from "@/components/generator-shell";

export const dynamic = "force-dynamic";

export default function SpeechGeneratorPage() {
  return (
    <GeneratorShell
      title="Speech Generator"
      subtitle="Generate an original speech from a topic — with opening, intro, main points, examples, and conclusion."
      endpoint="/api/speech-generator"
      fields={[
        { key: "topic", label: "Topic", placeholder: "e.g. The importance of daily reading", required: true },
        { key: "duration", label: "Duration", type: "select", options: ["1 minute", "3 minutes", "5 minutes", "10 minutes"] },
        { key: "language", label: "Language", type: "select", options: ["English", "Urdu", "Sindhi", "Hindi", "Arabic"] },
        { key: "level", label: "Speaker level", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
        { key: "audience", label: "Audience", placeholder: "e.g. Grade 9 students" },
        { key: "style", label: "Style", type: "select", options: ["Formal", "Informal", "Inspirational", "Persuasive", "Storytelling"] },
        { key: "tone", label: "Tone", type: "select", options: ["Warm", "Confident", "Serious", "Playful", "Motivational"] },
      ]}
      mockNotice
    />
  );
}

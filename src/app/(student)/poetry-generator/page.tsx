import { GeneratorShell } from "@/components/generator-shell";

export const dynamic = "force-dynamic";

export default function PoetryGeneratorPage() {
  return (
    <GeneratorShell
      title="Poetry Generator"
      subtitle="Generate an original poem from a topic, language, style, length, and mood."
      endpoint="/api/poetry-generator"
      fields={[
        { key: "topic", label: "Topic", placeholder: "e.g. The first rain of the season", required: true },
        { key: "language", label: "Language", type: "select", options: ["English", "Urdu", "Sindhi", "Hindi", "Arabic"] },
        { key: "style", label: "Style", type: "select", options: ["Free verse", "Rhymed", "Haiku", "Sonnet", "Ghazal"] },
        { key: "length", label: "Length", type: "select", options: ["Short (1 stanza)", "Medium (2 stanzas)", "Long (3 stanzas)"] },
        { key: "mood", label: "Mood", type: "select", options: ["Joyful", "Melancholic", "Hopeful", "Reflective", "Bold", "Calm"] },
      ]}
      mockNotice
    />
  );
}

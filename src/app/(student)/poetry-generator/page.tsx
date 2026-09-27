import { GeneratorShell } from "@/components/generator-shell";

export const dynamic = "force-dynamic";

export default function PoetryGeneratorPage() {
  return (
    <GeneratorShell
      title="Poetry Generator"
      subtitle="Generate an original, crafted poem from a topic, language, style, length, and mood. Urdu shayari supported."
      endpoint="/api/poetry-generator"
      fields={[
        { key: "topic", label: "Topic", placeholder: "e.g. صبح کی روشنی (the morning light)", required: true },
        { key: "language", label: "Language", type: "select", options: ["Urdu", "English", "Sindhi", "Hindi", "Arabic"] },
        { key: "style", label: "Style", type: "select", options: ["Ghazal", "Free verse", "Nazm", "Rhymed", "Haiku", "Sonnet"] },
        { key: "length", label: "Length", type: "select", options: ["Short (1 stanza)", "Medium (2 stanzas)", "Long (3 stanzas)"] },
        { key: "mood", label: "Mood", type: "select", options: ["Joyful", "Melancholic", "Hopeful", "Reflective", "Romantic", "Bold", "Calm", "Spiritual"] },
      ]}
      mockNotice
    />
  );
}


import { GeneratorShell, type Field } from "@/components/generator-shell";

export const dynamic = "force-dynamic";

const fields: Field[] = [
  { key: "topic", label: "Topic (موضوع)", placeholder: "e.g. امن (peace), تنہائی (loneliness), امید (hope)", required: true },
  {
    key: "language",
    label: "Language",
    type: "select",
    options: ["Urdu", "English", "Sindhi", "Hindi", "Arabic"],
  },
  {
    key: "form",
    label: "Form (شکل)",
    type: "select",
    options: ["Ghazal", "Nazm", "Free verse", "Haiku", "Sonnet"],
  },
  { key: "emotion", label: "Emotion (جذبات)", placeholder: "e.g. longing, grief, joy, love, nostalgia" },
  {
    key: "mood",
    label: "Mood (مزاج)",
    type: "select",
    options: ["Joyful", "Melancholic", "Hopeful", "Reflective", "Romantic", "Bold", "Calm", "Spiritual"],
  },
  { key: "qaafiya", label: "Qaafiya (قافیہ — optional)", placeholder: "e.g. جلا, ملا, ڈھلا" },
  { key: "radif", label: "Radif (ردیف — optional)", placeholder: "e.g. کیوں نہیں" },
  { key: "meter", label: "Meter / بحر (optional)", placeholder: "e.g. بحرِ متدارک" },
  {
    key: "numAshaar",
    label: "Number of Ashaar (اشعار)",
    type: "select",
    options: ["3", "5", "7", "9"],
  },
  {
    key: "vocabLevel",
    label: "Vocabulary level",
    type: "select",
    options: ["Simple", "Moderate", "Classical"],
  },
  {
    key: "classicalModern",
    label: "Classical / Modern",
    type: "select",
    options: ["Classical", "Modern", "Contemporary"],
  },
  {
    key: "endingStyle",
    label: "Ending style",
    type: "select",
    options: ["Open", "Hopeful", "Dark", "Philosophical", "Surprising"],
  },
];

export default function PoetryGeneratorPage() {
  return (
    <GeneratorShell
      title="Poetry Generator — Urdu Ghazal"
      subtitle="Generate original, technically structured Urdu ghazals and poems. The AI follows authentic ghazal principles — matla, sher, qaafiya, radif, maqta — with strong imagery and originality."
      endpoint="/api/poetry-generator"
      fields={fields}
      showLibrary
    />
  );
}

/** Small formatting helpers. */

export function formatCurrency(amount: number): string {
  // Pakistani Rupee (PKR) — Segal Institute bills students in PKR.
  // Use "Rs" with thousands separators and no decimals. Intl.NumberFormat
  // with "en-PK" / "PKR" is used when available; we fall back to a manual
  // "Rs N" format to guarantee a consistent result across environments.
  try {
    const formatted = new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    // Some Node runtimes fall back to "$" when en-PK locale data is missing.
    // If the output doesn't contain "Rs" or "PKR", force the prefix.
    if (/Rs|PKR/i.test(formatted)) return formatted;
  } catch {
    // fall through to manual format
  }
  return `Rs ${Math.round(amount).toLocaleString("en-US")}`;
}

export function todayISO(d: Date = new Date()): string {
  const tz = "America/Los_Angeles";
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
  } catch {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
}

export function monthKey(d: Date = new Date()): string {
  // "2026-09" — the billing period key for monthly fees
  const iso = todayISO(d);
  return iso.slice(0, 7);
}

/** Small formatting helpers. */

export function formatCurrency(amount: number): string {
  // Default to USD; admin can set a different currency in the future.
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `$${amount.toFixed(2)}`;
  }
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

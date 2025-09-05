export function formatTomans(amount: number): string {
  try {
    const localized = amount.toLocaleString("fa-IR");
    return `${localized} تومان`;
  } catch {
    // Fallback in case toLocaleString fails for any reason
    return `${amount} تومان`;
  }
}
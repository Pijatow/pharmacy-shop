export function formatTomans(amount: number): string {
  try {
    const localized = amount.toLocaleString("fa-IR");
    return `${localized} تومان`;
  } catch {
    return `${amount} تومان`;
  }
}



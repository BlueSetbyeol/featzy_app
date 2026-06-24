/** Formate un montant en centimes en euros : 890 → "8,90 €" */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

/** Niveau de prix 1..3 → "€" | "€€" | "€€€" */
export function priceLevelLabel(priceLevel: 1 | 2 | 3 | null): string {
  return priceLevel ? "€".repeat(priceLevel) : "";
}

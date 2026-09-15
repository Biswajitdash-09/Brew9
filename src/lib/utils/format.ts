/**
 * Formats an integer amount into Indian Rupee (INR) currency string.
 * Strict whole-integer representation as per BREW 9 MVP guidelines.
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

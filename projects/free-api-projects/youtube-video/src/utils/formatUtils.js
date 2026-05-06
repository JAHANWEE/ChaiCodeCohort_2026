/**
 * Formats a number into a compact string: 1200 → "1.2K", 1500000 → "1.5M"
 */
export function formatCount(count) {
  const num = parseInt(count, 10)
  if (isNaN(num)) return count
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toString()
}

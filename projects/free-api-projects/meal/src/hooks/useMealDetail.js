/**
 * Parses a flat meal object into structured ingredients list.
 * The API stores up to 20 ingredient/measure pairs as flat keys.
 */
export function parseIngredients(meal) {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const name    = meal[`strIngredient${i}`]?.trim()
    const measure = meal[`strMeasure${i}`]?.trim()
    if (name) ingredients.push({ name, measure: measure || '' })
  }
  return ingredients
}

export function parseTags(meal) {
  if (!meal.strTags) return []
  return meal.strTags.split(',').map(t => t.trim()).filter(Boolean)
}

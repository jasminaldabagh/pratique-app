// Weighted random selection for verbs and words
// Shaky items have 3x weight

interface WeightedItem {
  id: number | string
}

export function weightedRandomSelect<T extends WeightedItem>(
  items: T[],
  shakyIds: (number | string)[],
  excludeId?: number | string
): T | null {
  const available = excludeId 
    ? items.filter(item => item.id !== excludeId)
    : items
  
  if (available.length === 0) return null
  
  // Build weighted array
  const weighted: T[] = []
  for (const item of available) {
    const weight = shakyIds.includes(item.id) ? 3 : 1
    for (let i = 0; i < weight; i++) {
      weighted.push(item)
    }
  }
  
  return weighted[Math.floor(Math.random() * weighted.length)]
}

// French pronouns
export const pronouns = [
  "je",
  "tu", 
  "il/elle",
  "nous",
  "vous",
  "ils/elles"
] as const

export type Pronoun = typeof pronouns[number]

export function getRandomPronoun(exclude?: Pronoun): Pronoun {
  const available = exclude 
    ? pronouns.filter(p => p !== exclude)
    : pronouns
  return available[Math.floor(Math.random() * available.length)]
}

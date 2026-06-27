const knownLabels: Record<string, string> = {
  android: 'Android',
  ios: 'iOS',
  web: 'Web',
  'ai-tool': 'AI Tool',
  workflow: 'Workflow',
  extension: 'Extension',
  other: 'Other',
}

const knownPluralLabels: Record<string, string> = {
  'ai-tool': 'AI Tools',
  workflow: 'Workflows',
  extension: 'Extensions',
}

const knownColors: Record<string, string> = {
  android: '#38A169',
  ios: '#77717E',
  web: '#4A76C9',
  'ai-tool': '#9B6DFF',
  workflow: '#D946EF',
  extension: '#D27A3C',
  other: '#8D8797',
}

const fallbackColors = [
  '#0F9F8F',
  '#E06C75',
  '#5B7CFA',
  '#A855F7',
  '#D97706',
  '#DB4B8F',
]

const preferredTypeOrder = [
  'android',
  'ios',
  'web',
  'ai-tool',
  'workflow',
  'extension',
  'other',
]

export function formatProductType(type: string, plural = false) {
  const normalizedType = type.trim().toLocaleLowerCase()
  const knownLabel = plural
    ? knownPluralLabels[normalizedType] ?? knownLabels[normalizedType]
    : knownLabels[normalizedType]

  if (knownLabel) return knownLabel

  return normalizedType
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => {
      if (word === 'ai') return 'AI'
      if (word === 'api') return 'API'
      return word.charAt(0).toLocaleUpperCase() + word.slice(1)
    })
    .join(' ')
}

export function getProductTypeColor(type: string) {
  const normalizedType = type.trim().toLocaleLowerCase()
  if (knownColors[normalizedType]) return knownColors[normalizedType]

  const hash = [...normalizedType].reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  )

  return fallbackColors[hash % fallbackColors.length]
}

export function compareProductTypes(firstType: string, secondType: string) {
  const firstIndex = preferredTypeOrder.indexOf(firstType.toLocaleLowerCase())
  const secondIndex = preferredTypeOrder.indexOf(secondType.toLocaleLowerCase())
  const firstRank = firstIndex === -1 ? preferredTypeOrder.length : firstIndex
  const secondRank = secondIndex === -1 ? preferredTypeOrder.length : secondIndex

  return firstRank - secondRank || firstType.localeCompare(secondType)
}

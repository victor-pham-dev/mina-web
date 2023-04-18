import removeDiacritics from 'remove-diacritics'

export function removeSpecialChars(inputStr: string) {
  return inputStr.replace(/[^a-zA-Z0-9]/g, '')
}

export const maskString = (string: string) => {
  let firstPart = string.substring(0, 3)
  let lastPart = string.substring(string.length - 3)
  let middlePart = ''.padEnd(string.length - 6, '*')
  let masked = firstPart + middlePart + lastPart
  return masked
}

export const toSlug = (string: string) => {
  const converted = removeDiacritics(string)
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
  return converted
}

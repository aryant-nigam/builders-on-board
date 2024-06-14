export function toTitleCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
}

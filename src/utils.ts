export function toTitleCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
}

export const serviceTypesList = [
  "carpentry",
  "electronics",
  "pest control",
  "painting",
  "flooring",
  "automobile washing",
  "gardening",
];

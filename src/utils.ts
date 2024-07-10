export function toTitleCase(str: string) {
  if (str) return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
  else return str;
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

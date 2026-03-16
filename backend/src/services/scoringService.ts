function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function calculateAccuracy(output: string, reference?: string): number {
  if (!reference) return 0;
  const outNorm = normalize(output);
  const refNorm = normalize(reference);
  if (!refNorm) return 0;

  if (outNorm === refNorm) return 1;
  if (outNorm.includes(refNorm) || refNorm.includes(outNorm)) return 0.8;

  const outTokens = new Set(outNorm.split(' '));
  const refTokens = refNorm.split(' ');
  const overlap = refTokens.filter((w) => outTokens.has(w)).length;
  return Number((overlap / refTokens.length).toFixed(2));
}

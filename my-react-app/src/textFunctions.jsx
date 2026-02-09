export function hideRewardAmount(text) {
  if (!text) return "";

  // Regex explanation:
  // \$          -> match literal $
  // [\d,\.]+    -> match digits, commas, or decimal points
  // \s*         -> optional whitespace
  // (million|billion|thousand)? -> optional unit
  return text.replace(/\$\s*[\d,\.]+\s*(million|billion|thousand)?/gi, " ***** ");
}

export function cleanText(text) {
  if (!text) return "";

  return text
    .replace(/<p>/gi, "")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}





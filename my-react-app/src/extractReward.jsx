export function extractRewardAmount(rewardText) {
  if (!rewardText) return null;

  const text = rewardText.toLowerCase();

  // Match scaled amounts first
  const scaledMatch = text.match(/\$([\d.]+)\s*(thousand|million|billion)/);
  if (scaledMatch) {
    const value = Number(scaledMatch[1]);
    const unit = scaledMatch[2];

    const multiplier = {
      thousand: 1_000,
      million: 1_000_000,
      billion: 1_000_000_000,
    };

    return Math.round(value * multiplier[unit]);
  }

  // Match standard numbers
  const numericMatch = text.match(/\$([\d,]+)/);
  if (numericMatch) {
    return Number(numericMatch[1].replace(/,/g, ""));
  }

  return null;
}

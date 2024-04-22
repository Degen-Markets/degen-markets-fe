export const betDurationInDays = (duration: string): string => {
  const days = Number(duration) / 86400;
  return days > 1 ? `${days} days` : `${days} day`;
};

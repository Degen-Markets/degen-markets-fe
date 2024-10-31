const isWithinTwoWeeks = (dateStr: string): boolean => {
  const createdDate = new Date(dateStr);
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  return createdDate >= twoWeeksAgo;
};

export default isWithinTwoWeeks;

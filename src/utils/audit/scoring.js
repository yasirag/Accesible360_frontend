export const calculateIndicatorScore = (violations) => {
  if (violations === 0) return 100;
  return Math.max(0, 100 - (violations * 10));
};

export const getScoreColor = (score) => {
  if (score >= 80) return '#4caf50';
  if (score >= 60) return '#ff9800';
  return '#f44336';
};
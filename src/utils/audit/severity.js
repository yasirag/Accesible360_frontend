export const getSeverityBadge = (severity) => {
  const badges = {
    critical: { emoji: '🔴', text: 'Crítico' },
    serious: { emoji: '🟠', text: 'Serio' },
    medium: { emoji: '🟡', text: 'Medio' },
  };
  return badges[severity] || { emoji: '⚪', text: 'Bajo' };
};
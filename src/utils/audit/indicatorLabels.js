export const INDICATOR_LABELS = {
  forms: { 
    name: 'Formularios', 
    icon: '📝', 
    severity: 'success', 
    color: '#16A34A'           /* Revertir a hex */
  },
  headings: { 
    name: 'Encabezados', 
    icon: '📋', 
    severity: 'warning', 
    color: '#CA8A04'           /* Revertir a hex */
  },
  links: { 
    name: 'Enlaces', 
    icon: '🔗', 
    severity: 'warning', 
    color: '#CA8A04'           /* Revertir a hex */
  },
};

export const getLabel = (key) => INDICATOR_LABELS[key] || { name: key, icon: '❓' };
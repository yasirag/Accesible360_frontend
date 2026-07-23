export const PROBLEM_METADATA = {
  links: {
    time: 'Est. 30-45 min',
    difficulty: 'Baja dificultad',
    technicalGuide: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose.html',
    documentation: 'https://www.w3.org/WAI/tutorials/links/'
  },
  forms: {
    time: 'Est. 1-2 horas',
    difficulty: 'Media dificultad',
    technicalGuide: 'https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html',
    documentation: 'https://www.w3.org/WAI/tutorials/forms/'
  },
  headings: {
    time: 'Est. 45 min',
    difficulty: 'Baja dificultad',
    technicalGuide: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html',
    documentation: 'https://www.w3.org/WAI/tutorials/page-structure/headings/'
  }
};

export const getMetadata = (indicatorKey) => PROBLEM_METADATA[indicatorKey] || {};
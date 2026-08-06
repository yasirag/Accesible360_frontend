

/**
 * @param {string} value - URL o dominio a validar
 * @returns {object} { isValid: boolean, error: string }
 */
export const validateDomain = (value) => {
  if (!value) {
    return {
      isValid: false,
      error: 'Ingresa una URL',
    };
  }

  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  if (!urlPattern.test(value)) {
    return {
      isValid: false,
      error: 'La URL no es válida. Usa https://ejemplo.com',
    };
  }

  return {
    isValid: true,
    error: '',
  };
};

/**
 * @param {string} email - Email a validar
 * @returns {object} { isValid: boolean, error: string }
 */
export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return {
      isValid: false,
      error: 'El email es requerido',
    };
  }

  if (!emailPattern.test(email)) {
    return {
      isValid: false,
      error: 'El email no es válido',
    };
  }

  return {
    isValid: true,
    error: '',
  };
};

/**

 * @param {string} domain - Dominio a normalizar
 * @returns {string} URL completa
 */
export const normalizeDomain = (domain) => {
  if (!domain.startsWith('http')) {
    return `https://${domain}`;
  }
  return domain;
};
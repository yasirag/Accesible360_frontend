import { useState } from 'react';
import './Landing.css';

function Landing({ onAudit, error }) {
  const [domain, setDomain] = useState('');
  const [inputError, setInputError] = useState('');

  const validateDomain = (value) => {
    if (!value) {
      setInputError('Ingresa una URL');
      return false;
    }

    // Aceptar https://ejemplo.com o ejemplo.com
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(value)) {
      setInputError('La URL no es válida. Usa https://ejemplo.com');
      return false;
    }

    setInputError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateDomain(domain)) {
      return;
    }

   
    let fullDomain = domain;
    if (!domain.startsWith('http')) {
      fullDomain = `https://${domain}`;
    }

    onAudit(fullDomain);
  };

  return (
    <div className="landing">
      <div className="landing-container">
        <h1 className="landing-title">Accesible360</h1>
        <p className="landing-subtitle">
          Audita la accesibilidad de tu sitio web en menos de 30 segundos
        </p>

        <form onSubmit={handleSubmit} className="landing-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="ejemplo.com o https://ejemplo.com"
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                setInputError('');
              }}
              className={`form-input ${inputError ? 'error' : ''}`}
            />
            {inputError && <p className="error-message">{inputError}</p>}
          </div>

          <button type="submit" className="btn-audit">
            Auditar
          </button>
        </form>

        {error && (
          <div className="error-box">
            <p>❌ {error}</p>
          </div>
        )}

        <div className="landing-info">
          <h3>¿Qué audita?</h3>
          <ul>
            <li>✅ Enlaces descriptivos</li>
            <li>✅ Etiquetas de formularios</li>
            <li>✅ Jerarquía de encabezados</li>
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Landing;
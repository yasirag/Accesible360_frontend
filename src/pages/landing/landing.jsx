import { useState } from 'react';
import { validateDomain, normalizeDomain } from '../../utils/validators';
import './landing.css';

function Landing({ onAudit, error }) {
  const [domain, setDomain] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validateDomain(domain);
    
    if (!validation.isValid) {
      setInputError(validation.error);
      return;
    }

    const fullDomain = normalizeDomain(domain);

    setInputError('');
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
import { useState } from 'react';
import './email-form.css';

function EmailForm({ onSubmit, isLoading }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('El email es requerido');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email inválido');
      return;
    }

    onSubmit(email);
  };

  return (
    <form className="email-form" onSubmit={handleSubmit}>
      <div className="email-form__group">
        <label htmlFor="email" className="email-form__label">
          Tu correo electrónico
        </label>
        <input
          id="email"
          type="email"
          className="email-form__input"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        {error && <span className="email-form__error">{error}</span>}
      </div>

      <button
        type="submit"
        className="email-form__button"
        disabled={isLoading}
      >
        {isLoading ? 'Enviando...' : 'Enviar por Email'}
      </button>
    </form>
  );
}

export default EmailForm;
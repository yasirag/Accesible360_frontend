import { useState } from 'react';
import './results.css';

const INDICATOR_LABELS = {
  forms: { name: 'Formularios', icon: '📝', severity: 'critical' },
  headings: { name: 'Encabezados', icon: '📋', severity: 'serious' },
  links: { name: 'Enlaces', icon: '🔗', severity: 'serious' },
  contrast: { name: 'Contraste', icon: '🎨', severity: 'critical' },
  images: { name: 'Imágenes (Alt)', icon: '🖼️', severity: 'critical' },
  keyboard: { name: 'Teclado', icon: '⌨️', severity: 'serious' },
  focus: { name: 'Focus Visual', icon: '👁️', severity: 'medium' },
  aria: { name: 'ARIA', icon: '♿', severity: 'medium' },
  targets: { name: 'Tamaño de botones', icon: '🎯', severity: 'medium' },
  tables: { name: 'Tablas', icon: '📊', severity: 'medium' },
};

function Results({ data, onNewAudit }) {
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  const getScoreColor = (score) => {
    if (score >= 80) return '#4caf50'; // Verde
    if (score >= 60) return '#ff9800'; // Naranja
    return '#f44336'; // Rojo
  };

  const getSeverityBadge = (severity) => {
    const badges = {
      critical: { emoji: '🔴', text: 'Crítico' },
      serious: { emoji: '🟠', text: 'Serio' },
      medium: { emoji: '🟡', text: 'Medio' },
    };
    return badges[severity] || { emoji: '⚪', text: 'Bajo' };
  };

  const renderElement = (element, idx) => {
    // Si es string
    if (typeof element === 'string') {
      return (
        <li key={idx}>
          <code>{element}</code>
        </li>
      );
    }

    // Si es objeto
    if (typeof element === 'object' && element !== null) {
      return (
        <li key={idx}>
          <div className="element-item">
            {element.type && (
              <strong className="element-type">{element.type}</strong>
            )}
            {element.issue && (
              <p className="element-issue">{element.issue}</p>
            )}
            {element.severity && (
              <span className={`element-severity severity-${element.severity}`}>
                {element.severity}
              </span>
            )}
          </div>
        </li>
      );
    }

    // Fallback
    return (
      <li key={idx}>
        <code>{String(element)}</code>
      </li>
    );
  };

  return (
    <div className="results">
      <div className="results-container">
        {/* Header */}
        <div className="results-header">
          <h1 className="results-domain">{data.domain}</h1>
          <button className="btn-new-audit" onClick={onNewAudit}>
            ← Nueva Auditoría
          </button>
        </div>

        {/* Score Card */}
        <div className="score-card">
          <div className="score-circle" style={{ borderColor: getScoreColor(data.score_overall) }}>
            <span className="score-number" style={{ color: getScoreColor(data.score_overall) }}>
              {data.score_overall}
            </span>
            <span className="score-label">/100</span>
          </div>

          <div className="score-info">
            <h2>Resultado de Accesibilidad</h2>
            <div className="progress-bar-result">
              <div
                className="progress-fill-result"
                style={{
                  width: `${data.score_overall}%`,
                  backgroundColor: getScoreColor(data.score_overall),
                }}
              ></div>
            </div>
            <p className="score-description">
              {data.score_overall >= 80
                ? '✅ Muy accesible'
                : data.score_overall >= 60
                ? '⚠️ Mejorable'
                : '❌ Necesita trabajo'}
            </p>
          </div>
        </div>

        {/* Indicadores Grid */}
        <div className="indicators-section">
          <h2>3 Indicadores WCAG 2.1 AA</h2>
          <div className="indicators-grid">
            {Object.entries(data.indicators).map(([key, indicator]) => {
              const label = INDICATOR_LABELS[key] || { name: key, icon: '❓' };
              const badge = getSeverityBadge(label.severity);
              const violations = indicator.violations || 0;

              return (
                <div
                  key={key}
                  className="indicator-card"
                  onClick={() => setSelectedIndicator(key)}
                >
                  <div className="indicator-header">
                    <span className="indicator-icon">{label.icon}</span>
                    <span className="indicator-severity">{badge.emoji}</span>
                  </div>
                  <h3>{label.name}</h3>
                  <p className="indicator-violations">
                    {violations === 0 ? '✅ Sin problemas' : `${violations} problemas`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal de Detalles */}
        {selectedIndicator && (
          <div className="modal-overlay" onClick={() => setSelectedIndicator(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setSelectedIndicator(null)}
              >
                ✕
              </button>

              {(() => {
                const key = selectedIndicator;
                const indicator = data.indicators[key];
                const label = INDICATOR_LABELS[key] || { name: key, icon: '❓' };
                const badge = getSeverityBadge(label.severity);

                if (!indicator) {
                  return (
                    <>
                      <h2>⚠️ Error</h2>
                      <p>No se pudo cargar la información del indicador.</p>
                    </>
                  );
                }

                const violations = indicator.violations || 0;
                const hasElements = indicator.elements && Array.isArray(indicator.elements) && indicator.elements.length > 0;

                return (
                  <>
                    <h2>{label.icon} {label.name}</h2>
                    <p className="modal-severity">
                      {badge.emoji} {badge.text}
                    </p>

                    <div className="modal-section">
                      <h3>Resumen</h3>
                      <p>
                        Se encontraron <strong>{violations}</strong> {violations === 1 ? 'problema' : 'problemas'}
                        en este criterio WCAG.
                      </p>
                      <p className="wcag-code">
                        Criterio WCAG: <code>{indicator.wcag_criterion}</code>
                      </p>
                    </div>

                    {/* Mostrar elementos si existen */}
                    {hasElements ? (
                      <div className="modal-section">
                        <h3>Elementos Afectados ({indicator.elements.length})</h3>
                        <ul className="elements-list">
                          {indicator.elements.slice(0, 5).map((element, idx) => renderElement(element, idx))}
                          {indicator.elements.length > 5 && (
                            <li className="more-items">
                              +{indicator.elements.length - 5} más...
                            </li>
                          )}
                        </ul>
                      </div>
                    ) : violations > 0 ? (
                      <div className="modal-section empty-state">
                        <p>ℹ️ Se detectaron problemas, pero los detalles no están disponibles.</p>
                        <p className="hint">Verifica manualmente los elementos en tu sitio web.</p>
                      </div>
                    ) : (
                      <div className="modal-section empty-state success">
                        <p>✅ No hay problemas en este criterio.</p>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="results-footer">
          <p>📅 Auditoría completada: {new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    </div>
  );
}

export default Results;
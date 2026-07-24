import './indicator-modal.css';
import { getLabel } from '../../utils/audit/indicatorLabels';
import { getSeverityBadge } from '../../utils/audit/severity';

function IndicatorModal({ indicatorKey, indicator, onClose }) {
  if (!indicator) return null;

  const label = getLabel(indicatorKey);
  const badge = getSeverityBadge(label.severity);
  const violations = indicator.violations || 0;
  const hasElements = indicator.elements && Array.isArray(indicator.elements) && indicator.elements.length > 0;

  const renderElement = (element, idx) => {
    if (typeof element === 'string') {
      return (
        <li key={idx}>
          <code>{element}</code>
        </li>
      );
    }

    if (typeof element === 'object' && element !== null) {
      return (
        <li key={idx} className="element-item-detailed">
          <div className="element-header">
            {element.type && <strong className="element-type">{element.type}</strong>}
            {element.issue && <p className="element-issue">{element.issue}</p>}
          </div>

          <div className="element-location">
            {element.id && element.id !== 'sin-id' && (
              <div className="location-item">
                <strong>ID:</strong>
                <code>{element.id}</code>
              </div>
            )}

            {element.name && (
              <div className="location-item">
                <strong>Name:</strong>
                <code>{element.name}</code>
              </div>
            )}

            {element.href && (
              <div className="location-item">
                <strong>URL:</strong>
                <code>{element.href}</code>
              </div>
            )}

            {element.text && (
              <div className="location-item">
                <strong>Texto:</strong>
                <code>{element.text}</code>
              </div>
            )}

            {element.html && (
              <div className="location-item html-item">
                <strong>HTML:</strong>
                <code className="html-code">{element.html}</code>
              </div>
            )}
          </div>

          {element.severity && (
            <span className={`element-severity severity-${element.severity}`}>
              {element.severity}
            </span>
          )}
        </li>
      );
    }

    return (
      <li key={idx}>
        <code>{String(element)}</code>
      </li>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

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

        {hasElements ? (
          <div className="modal-section">
            <h3>Elementos Afectados ({indicator.elements.length})</h3>
            <p className="elements-info">Haz clic en cada elemento para ver su ubicación exacta en la página:</p>
            <ul className="elements-list">
              {indicator.elements.slice(0, 5).map((element, idx) => renderElement(element, idx))}
              {indicator.elements.length > 5 && (
                <li className="more-items">+{indicator.elements.length - 5} más...</li>
              )}
            </ul>
          </div>
        ) : violations > 0 ? (
          <div className="modal-section empty-state">
            <p>ℹ️ Se detectaron problemas, pero los detalles no están disponibles.</p>
          </div>
        ) : (
          <div className="modal-section empty-state success">
            <p>✅ No hay problemas en este criterio.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default IndicatorModal;
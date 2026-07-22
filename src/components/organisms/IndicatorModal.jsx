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
        <li key={idx}>
          <div className="element-item">
            {element.type && <strong className="element-type">{element.type}</strong>}
            {element.issue && <p className="element-issue">{element.issue}</p>}
            {element.severity && (
              <span className={`element-severity severity-${element.severity}`}>
                {element.severity}
              </span>
            )}
          </div>
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

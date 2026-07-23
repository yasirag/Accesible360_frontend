import Badge from '../atoms/Badge';
import './problem-item.css';

function ProblemItem({ 
  title, 
  description, 
  severity, 
  priority, 
  time,
  difficulty,
  technicalGuide,
  documentation,
  expanded = false, 
  onClick 
}) {
  return (
    <div className={`problem-item ${expanded ? 'problem-item--expanded' : ''}`}>
      <div className="problem-item__header" onClick={onClick}>
        <div className="problem-item__left">
          <Badge variant="critical">{severity}</Badge>
          <h4>{title}</h4>
        </div>
        <div className="problem-item__right">
          <Badge variant="critical">{priority}</Badge>
          <span className="problem-item__toggle">›</span>
        </div>
      </div>

      {expanded && (
        <div className="problem-item__content">
          <p>{description}</p>
          
          {/* Metadata */}
          <div className="problem-item__metadata">
            {time && <span>⏱️ {time}</span>}
            {difficulty && <span>📊 {difficulty}</span>}
          </div>

          {/* Links */}
          <div className="problem-item__links">
            {technicalGuide && (
              <a href={technicalGuide} target="_blank" rel="noopener noreferrer">
                Guía técnica ↗
              </a>
            )}
            {documentation && (
              <a href={documentation} target="_blank" rel="noopener noreferrer">
                Documentación ↗
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProblemItem;
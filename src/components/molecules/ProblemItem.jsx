import Badge from '../atoms/Badge';
import './problem-item.css';

function ProblemItem({ title, description, severity, priority, expanded = false, onClick }) {
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
        </div>
      )}
    </div>
  );
}

export default ProblemItem;
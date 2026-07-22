import Badge from '../atoms/Badge';
import ProgressBar from '../atoms/ProgressBar';
import './indicator-card.css';

function IndicatorCard({ icon, title, score, violations, color, onClick }) {
  return (
    <div className="indicator-card" onClick={onClick}>
      <div className="indicator-card__header">
        <span className="indicator-card__icon">{icon}</span>
        <span className="indicator-card__score" style={{ color }}>
          {score}
        </span>
      </div>

      <h3 className="indicator-card__title">{title}</h3>

      <p className="indicator-card__violations">
        {violations === 0 ? '✅ Sin problemas' : `${violations} problemas`}
      </p>

      <ProgressBar value={score} color={color} />
    </div>
  );
}

export default IndicatorCard;
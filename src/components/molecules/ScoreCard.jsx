import ScoreCircle from '../atoms/ScoreCircle';
import Badge from '../atoms/Badge';
import './score-card.css';

function ScoreCard({ score }) {
  const getStatusText = () => {
    if (score >= 80) return 'Excelente';
    if (score >= 60) return 'Mejorable';
    return 'Crítico';
  };

  const getStatusVariant = () => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'critical';
  };

  return (
    <div className="score-card">
      <ScoreCircle score={score} variant={getStatusVariant()} />
      <div className="score-card__info">
        <h2>Puntuación General</h2>
        <Badge variant={getStatusVariant()}>{getStatusText()}</Badge>
        <p className="score-card__description">
          Tu web tiene un rendimiento sólido pero hay aspectos críticos que requieren atención inmediata.
        </p>
      </div>
    </div>
  );
}

export default ScoreCard;
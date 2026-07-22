
import ScoreCircle from '../atoms/ScoreCircle';
import Badge from '../atoms/Badge';
import './score-card.css';

function ScoreCard({score}) {
  const getStatusColor = () => {
    if (score >= 80) return '#4caf50';
    if (score >= 60) return '#ff9800';
    return '#f44336';
  };

  const getStatusText = () => {
    if (score >= 80) return 'Excelente';
    if (score >= 60) return 'Mejorable';
    return 'Crítico';
  };

  return (
    <div className="score-card">
      <ScoreCircle score={score} color={getStatusColor()} />
      <div className="score-card__info">
        <h2>Puntuación General</h2>
        <Badge variant="warning">{getStatusText()}</Badge>
        <p className="score-card__description">
          Tu web tiene un rendimiento sólido pero hay aspectos críticos que requieren atención inmediata.
        </p>
      </div>
    </div>
  );
}

export default ScoreCard;
import './score-circle.css';

function ScoreCircle({ score, size = 'large', variant = 'default' }) {
  return (
    <div className={`score-circle score-circle--${size} score-circle--${variant}`}>
      <span className="score-circle__number">{score}</span>
      <span className="score-circle__label">/ 100</span>
    </div>
  );
}

export default ScoreCircle;
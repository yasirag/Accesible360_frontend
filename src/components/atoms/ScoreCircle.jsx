import './score-circle.css';

function ScoreCircle({ score, color, size = 'large' }) {
  return (
    <div className={`score-circle score-circle--${size}`} style={{ borderColor: color }}>
      <span className="score-circle__number" style={{ color }}>
        {score}
      </span>
      <span className="score-circle__label">/ 100</span>
    </div>
  );
}

export default ScoreCircle;
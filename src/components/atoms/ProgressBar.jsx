import './progress-bar.css';

function ProgressBar({ value, color, max = 100 }) {
  const percentage = (value / max) * 100;

  return (
    <div className="progress-bar">
      <div
        className="progress-bar__fill"
        style={{
          width: `${percentage}%`,
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
}

export default ProgressBar;
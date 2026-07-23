import './progress-bar.css';

function ProgressBar({ value, max = 100 }) {
  const percentage = (value / max) * 100;

  const getColor = () => {
    if (value >= 75) return 'var(--color-forms)';     
    if (value >= 50) return 'var(--color-links)';      
    return 'var(--color-critical)';                   
  };

  return (
    <div className="progress-bar">
      <div
        className="progress-bar__fill"
        style={{
          width: `${percentage}%`,
          backgroundColor: getColor(),
        }}
      ></div>
    </div>
  );
}

export default ProgressBar;
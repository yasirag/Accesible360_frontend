import './badge.css';

function Badge({ label, variant = 'default', children }) {
  return (
    <span className={`badge badge--${variant}`}>
      {children || label}
    </span>
  );
}

export default Badge;
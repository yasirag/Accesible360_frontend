import "./header.css";
import shareIcon from "../../assets/icons/share_icon.svg";
import "./header.css";

function Header({ domain }) {
  return (
    <header className="header">
      <div className="header-wrapper">
        {/* Logo + Dominio */}
        <div className="header-brand">
          <div className="header-logo">
            <h1 className="logo-text">Accesible360</h1>
          </div>
          {domain && (
            <div className="header-domain">
              <span className="domain-text">/ {domain}</span>
            </div>
          )}
        </div>

  
        <nav className="header-nav">
          <button className="nav-link active">Dashboard</button>
        </nav>

        <div className="header-actions">
          <button
            className="action-icon"
            title="Compartir auditoría"
            aria-label="Compartir auditoría"
          >
            <img src={shareIcon} alt="Compartir" className="icon-image" />
          </button>
          <button
            className="action-profile"
            title="Perfil"
            aria-label="Perfil de usuario"
          >
            👤
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

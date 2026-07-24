import { useState } from 'react';
import EmailModal from './EmailModal';
import './download-panel.css';

function DownloadPanel({ auditId, domain, score }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/audits/${auditId}/pdf`
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Auditoria_${domain.replace(/\./g, '_')}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error descargando PDF:', err);
      alert('Error al descargar el PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div className="download-panel">
        {/* PDF Info */}
        <div className="download-panel__header">
          <div className="download-panel__icon">📄</div>
          <div className="download-panel__info">
            <h3>Auditoria_{domain.replace(/\./g, '_')}.pdf</h3>
            <p>Documento PDF • 2.4 MB</p>
          </div>
        </div>

        {/* Included Info */}
        <div className="download-panel__included">
          <h4>Incluido en este informe:</h4>
          <ul>
            <li>✓ Puntuación de rendimiento real (Score {score}/100)</li>
            <li>✓ Desglose de problemas técnicos críticos</li>
            <li>✓ Plan de acción para optimización</li>
          </ul>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="download-panel__button"
        >
          ⬇️ {isDownloading ? 'Descargando...' : 'Descargar PDF'}
        </button>

        {/* Email Checkbox */}
        <div className="download-panel__email">
          <input
            type="checkbox"
            id="email-check"
            checked={showEmailModal}
            onChange={(e) => setShowEmailModal(e.target.checked)}
          />
          <label htmlFor="email-check">
            Enviar una copia a mi correo electrónico
          </label>
        </div>

        <p className="download-panel__note">
          Tu informe estará disponible para descarga durante 24 horas.
        </p>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <EmailModal
          auditId={auditId}
          onClose={() => setShowEmailModal(false)}
          onSuccess={() => setShowEmailModal(false)}
        />
      )}
    </>
  );
}

export default DownloadPanel;
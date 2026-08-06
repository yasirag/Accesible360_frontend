import { useState } from 'react';
import EmailModal from './EmailModal';
import { downloadPDF } from './services/apiClient';
import './download-panel.css';

function DownloadPanel({ auditId, domain, score }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      const blob = await downloadPDF(auditId);
      
      // Crear descarga
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Auditoria_${domain.replace(/\./g, '_')}.pdf`;
      link.click();
      
      // Limpiar
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error descargando PDF:', err);
      setDownloadError('Error al descargar el PDF. Intenta de nuevo.');
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

        <div className="download-panel__included">
          <h4>Incluido en este informe:</h4>
          <ul>
            <li>✓ Puntuación de rendimiento real (Score {score}/100)</li>
            <li>✓ Desglose de problemas técnicos críticos</li>
            <li>✓ Plan de acción para optimización</li>
          </ul>
        </div>

        {/* Error Message */}
        {downloadError && (
          <div className="download-panel__error">
            ⚠️ {downloadError}
          </div>
        )}

        {/* Download Button */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="download-panel__button"
        >
          ⬇️ {isDownloading ? 'Descargando...' : 'Descargar PDF'}
        </button>

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
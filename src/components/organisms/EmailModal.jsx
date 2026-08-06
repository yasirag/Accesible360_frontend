import { useState } from "react";
import EmailForm from "../molecules/EmailForm";
import { sendEmail } from "../services/apiClient";
import { validateEmail } from "../../utils/validators";
import "./email-modal.css";

function EmailModal({ auditId, onClose, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' | 'error'

  const handleSubmit = async (email) => {

    const validation = validateEmail(email);
    if (!validation.isValid) {
      setMessageType("error");
      setMessage(`${validation.error}`);
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Usar servicio centralizado
      await sendEmail(auditId, email);

      setMessageType("success");
      setMessage("✅ Email enviado correctamente");

      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Error enviando email:", err);
      setMessageType("error");
      setMessage("❌ Error al enviar email. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="email-modal">
      <div className="email-modal__overlay" onClick={onClose} />
      <div className="email-modal__content">
        <div className="email-modal__header">
          <h2>📧 Enviar Auditoría por Email</h2>
          <button className="email-modal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="email-modal__body">
          <p>
            Recibirás una copia de la auditoría y el plan de acción en tu correo
            electrónico.
          </p>

          <EmailForm onSubmit={handleSubmit} isLoading={isLoading} />

          {message && (
            <div
              className={`email-modal__message email-modal__message--${messageType}`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmailModal;
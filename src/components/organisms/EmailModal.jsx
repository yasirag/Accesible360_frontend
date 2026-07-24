import { useState } from "react";
import EmailForm from "../molecules/EmailForm";
import "./email-modal.css";

function EmailModal({ auditId, onClose, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' | 'error'

  const handleSubmit = async (email) => {
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/audits/${auditId}/send-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      if (!response.ok) {
        throw new Error("Error al enviar email");
      }

      setMessageType("success");
      setMessage("✅ Email enviado correctamente");

      // Cerrar modal después de 2 segundos
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Error:", err);
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

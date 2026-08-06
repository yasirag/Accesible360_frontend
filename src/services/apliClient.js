
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";


const defaultConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};


const handleError = (error) => {
  console.error("API Error:", error);
  throw new Error(error.message || "Error en la API");
};


export const createAudit = async (domain) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/audits`, {
      method: "POST",
      ...defaultConfig,
      body: JSON.stringify({ domain }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    handleError(error);
  }
};


export const getAudit = async (auditId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/audits/${auditId}`, {
      method: "GET",
      ...defaultConfig,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    handleError(error);
  }
};


export const sendEmail = async (auditId, email) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/audits/${auditId}/send-email`,
      {
        method: "POST",
        ...defaultConfig,
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    handleError(error);
  }
};


export const downloadPDF = async (auditId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/audits/${auditId}/pdf`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.blob(); // Para descarga de archivo
  } catch (error) {
    handleError(error);
  }
};
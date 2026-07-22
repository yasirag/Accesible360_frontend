import { useState } from "react";
import Landing from "./pages/landing/landing";
import Loading from "./components/loading/loading";
import AuditReport from "./pages/auditReport/AuditReport";
import Header from "./components/header/header";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("landing");
  const [auditData, setAuditData] = useState(null);
  const [error, setError] = useState(null);

  const handleAudit = async (domain) => {
    setScreen("loading");
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/v1/audits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain }),
      });

      if (!response.ok) {
        throw new Error("Error en la auditoría");
      }

      const data = await response.json();
      setAuditData(data);
      setScreen("results");
    } catch (err) {
      setError(err.message || "Fallo al auditar el sitio");
      setScreen("landing");
    }
  };

  return (
    <div className="app">
      <Header domain={auditData?.domain} />

      {screen === "landing" && <Landing onAudit={handleAudit} error={error} />}
      {screen === "loading" && <Loading />}
      {screen === "results" && auditData && (
        <AuditReport
          data={auditData}
          onNewAudit={() => {
            setScreen("landing");
            setAuditData(null); // ← Limpiar datos
            setError(null);
          }}
        />
      )}
    </div>
  );
}

export default App;

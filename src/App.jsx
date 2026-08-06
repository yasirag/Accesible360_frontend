import { useState } from "react";
import Landing from "./pages/landing/landing";
import Loading from "./components/loading/Loading";
import AuditReport from "./pages/auditReport/AuditReport";
import Header from "./components/header/Header";
import { createAudit } from "./services/apiClient";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("landing");
  const [auditData, setAuditData] = useState(null);
  const [error, setError] = useState(null);

  const handleAudit = async (domain) => {
    setScreen("loading");
    setError(null);

    try {
      // createAudit ya retorna data JSON (no response object)
      const data = await createAudit(domain);
      
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
            setAuditData(null);
            setError(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
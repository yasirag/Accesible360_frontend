import { useState } from "react";
import ScoreCard from "../../components/molecules/ScoreCard";
import IndicatorGrid from "../../components/organisms/IndicatorGrid";
import TopProblems from "../../components/organisms/TopProblems";
import DownloadPanel from "../../components/organisms/DownloadPanel";
import IndicatorModal from "../../components/organisms/IndicatorModal";
import "./audit-report.css";

function AuditReport({ data, onNewAudit }) {
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  return (
    <div className="audit-report">
      <div className="audit-report-container">
        {/* Header */}
        <div className="audit-report-header">
          <h1 className="audit-report-domain">{data.domain}</h1>
          <button className="btn-new-audit" onClick={onNewAudit}>
            ← Nueva Auditoría
          </button>
        </div>

     
        <div className="audit-report-top">
          <div className="audit-report-score-wrapper">
            <ScoreCard score={data.score_overall} />
          </div>
          <IndicatorGrid
            indicators={data.indicators}
            onSelectIndicator={setSelectedIndicator}
          />
        </div>

      
        <div className="audit-report-bottom">
          <TopProblems actionPlan={data.action_plan} />
          <DownloadPanel
            auditId={data.audit_id}
            domain={data.domain}
            score={data.score_overall}
          />
        </div>

     
        {selectedIndicator && (
          <IndicatorModal
            indicatorKey={selectedIndicator}
            indicator={data.indicators[selectedIndicator]}
            onClose={() => setSelectedIndicator(null)}
          />
        )}

       
        <div className="audit-report-footer">
          <p>
            📅 Auditoría completada: {new Date().toLocaleDateString("es-ES")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuditReport;

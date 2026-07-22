import { useState } from 'react';
import ScoreCard from '../../components/molecules/ScoreCard';
import IndicatorGrid from '../../components/organisms/IndicatorGrid';
import IndicatorModal from '../../components/organisms/IndicatorModal';
import './audit-report.css';

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

        {/* Score Card */}
        <ScoreCard score={data.score_overall} />

        {/* Indicator Grid */}
        <IndicatorGrid
          indicators={data.indicators}
          onSelectIndicator={setSelectedIndicator}
        />

        {/* Modal */}
        {selectedIndicator && (
          <IndicatorModal
            indicatorKey={selectedIndicator}
            indicator={data.indicators[selectedIndicator]}
            onClose={() => setSelectedIndicator(null)}
          />
        )}

        {/* Footer */}
        <div className="audit-report-footer">
          <p>📅 Auditoría completada: {new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    </div>
  );
}

export default AuditReport;
import IndicatorCard from '../molecules/IndicatorCard';
import { getLabel } from '../../utils/audit/indicatorLabels';
import { calculateIndicatorScore } from '../../utils/audit/scoring';
import './indicator-grid.css';

function IndicatorGrid({ indicators, onSelectIndicator }) {
  return (
    <div className="indicator-grid-section">
      <h2 className="indicator-grid-section__title">3 Indicadores WCAG 2.1 AA</h2>

      <div className="indicator-grid">
        {Object.entries(indicators).map(([key, indicator]) => {
          const label = getLabel(key);
          const violations = indicator.violations || 0;
          const score = calculateIndicatorScore(violations);

          return (
            <IndicatorCard
              key={key}
              icon={label.icon}
              title={label.name}
              score={score}
              violations={violations}
              color={label.color}
              onClick={() => onSelectIndicator(key)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default IndicatorGrid;
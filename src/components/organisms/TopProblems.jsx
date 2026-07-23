import { useState } from 'react';
import ProblemItem from '../molecules/ProblemItem';
import { getMetadata } from '../../utils/audit/problemMetadata';
import './top-problems.css';

function TopProblems({ actionPlan }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!actionPlan || actionPlan.length === 0) {
    return null;
  }

  return (
    <section className="top-problems">
      <h2 className="top-problems__title">Top de problemas encontrados</h2>

      <div className="top-problems__list">
        {actionPlan.map((problem, idx) => {
          const metadata = getMetadata(problem.indicator);

          return (
            <ProblemItem
              key={idx}
              title={`${problem.violations} problemas de ${problem.indicator}`}
              description={problem.elements[0]?.what || ''}
              severity={problem.severity}
              priority={idx === 0 ? 'Prioridad Alta' : 'Media'}
              time={metadata.time}
              difficulty={metadata.difficulty}
              technicalGuide={metadata.technicalGuide}
              documentation={metadata.documentation}
              expanded={expandedIndex === idx}
              onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
            />
          );
        })}
      </div>
    </section>
  );
}

export default TopProblems;
import { MISSIONS, QUIZ_QUESTIONS, SCALE_MODES } from "../data/solarSystemData";

export default function ExportSummary({
  isOpen,
  onClose,
  selectedObject,
  scaleMode,
  missionResults,
  quizAnswers
}) {
  if (!isOpen) return null;

  const completedMissions = MISSIONS.filter((mission) => missionResults[mission.id]?.correct).length;
  const quizScore = QUIZ_QUESTIONS.filter((question, index) => quizAnswers[index] === question.answer).length;
  const summary = `Solar System Scale Explorer summary

Selected object: ${selectedObject.name}
Current scale mode: ${SCALE_MODES[scaleMode].label}
Mission challenges completed: ${completedMissions}/${MISSIONS.length}
Assessment score: ${quizScore}/${QUIZ_QUESTIONS.length}

One thing I noticed:
Earth is one planet in a much larger Solar System. Scale mode changes help compare planet size and distance because the real distances are enormous.

Planet fact:
${selectedObject.name}: ${selectedObject.fact}`;

  async function copySummary() {
    await navigator.clipboard.writeText(summary);
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal-panel" role="dialog" aria-modal="true" aria-label="Export Student Summary">
        <div className="modal-header">
          <div>
            <div className="panel-kicker">Student export</div>
            <h2>Copy Summary</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close Export Summary">
            Close
          </button>
        </div>
        <textarea readOnly value={summary} className="summary-box" rows="12" />
        <button type="button" className="primary-control" onClick={copySummary}>
          Copy summary
        </button>
      </section>
    </div>
  );
}

import { TEACHER_QUESTIONS } from "../data/solarSystemData";

export default function TeacherPanel({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal-panel" role="dialog" aria-modal="true" aria-label="Teacher Mode">
        <div className="modal-header">
          <div>
            <div className="panel-kicker">Teacher Mode</div>
            <h2>Discussion Questions</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close Teacher Mode">
            Close
          </button>
        </div>
        <ol className="teacher-list">
          {TEACHER_QUESTIONS.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}

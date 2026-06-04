import { QUIZ_QUESTIONS } from "../data/solarSystemData";

export default function AssessmentPanel({ isOpen, onClose, quizAnswers, onQuizAnswer }) {
  if (!isOpen) return null;

  const score = QUIZ_QUESTIONS.filter((question, index) => quizAnswers[index] === question.answer).length;
  const answered = Object.keys(quizAnswers).length;

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal-panel large" role="dialog" aria-modal="true" aria-label="Assessment Mode">
        <div className="modal-header">
          <div>
            <div className="panel-kicker">Assessment Mode</div>
            <h2>Solar System Check</h2>
            <p>
              Score: {score}/{QUIZ_QUESTIONS.length} answered: {answered}/{QUIZ_QUESTIONS.length}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close Assessment Mode">
            Close
          </button>
        </div>

        <div className="quiz-list">
          {QUIZ_QUESTIONS.map((question, index) => (
            <article className="quiz-card" key={question.question}>
              <h3>
                {index + 1}. {question.question}
              </h3>
              <div className="quiz-options">
                {question.options.map((option) => {
                  const selected = quizAnswers[index] === option;
                  const answeredQuestion = quizAnswers[index];
                  const correct = option === question.answer;
                  return (
                    <button
                      key={option}
                      type="button"
                      className={`${selected ? "selected" : ""} ${
                        answeredQuestion && correct ? "correct" : ""
                      } ${answeredQuestion && selected && !correct ? "incorrect" : ""}`}
                      onClick={() => onQuizAnswer(index, option)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

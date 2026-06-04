import { MISSIONS } from "../data/solarSystemData";

export default function MissionPanel({ selectedId, scaleMode, missionResults, onMissionResult }) {
  const completedCount = Object.values(missionResults).filter((result) => result?.correct).length;

  function toggleHint(missionId) {
    const current = missionResults[missionId] || {};
    onMissionResult(missionId, { ...current, showHint: !current.showHint });
  }

  function checkMission(mission) {
    const correct = mission.check({ selectedId, scaleMode });
    onMissionResult(mission.id, {
      ...missionResults[mission.id],
      checked: true,
      correct,
      message: correct ? mission.correct : mission.incorrect
    });
  }

  return (
    <aside className="panel mission-panel" aria-label="Mission Challenges">
      <div className="panel-kicker">Activity panel</div>
      <div className="mission-heading">
        <h2>Mission Challenges</h2>
        <span>{completedCount}/5</span>
      </div>

      <div className="mission-list">
        {MISSIONS.map((mission, index) => {
          const result = missionResults[mission.id] || {};
          return (
            <article className={`mission-card ${result.correct ? "complete" : ""}`} key={mission.id}>
              <div className="mission-number">{index + 1}</div>
              <div className="mission-copy">
                <h3>{mission.title}</h3>
                <p>{mission.instruction}</p>
                {result.showHint && <div className="hint-box">{mission.hint}</div>}
                {result.checked && (
                  <div className={`mission-response ${result.correct ? "correct" : "incorrect"}`}>
                    {result.message}
                  </div>
                )}
                <div className="mission-actions">
                  <button type="button" onClick={() => toggleHint(mission.id)}>
                    {result.showHint ? "Hide Hint" : "Hint"}
                  </button>
                  <button type="button" onClick={() => checkMission(mission)}>
                    Check Answer
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
}

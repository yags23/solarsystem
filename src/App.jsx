import { useMemo, useState } from "react";
import AssessmentPanel from "./components/AssessmentPanel";
import ComparePanel from "./components/ComparePanel";
import ControlsPanel from "./components/ControlsPanel";
import ExportSummary from "./components/ExportSummary";
import InfoPanel from "./components/InfoPanel";
import MiniMap from "./components/MiniMap";
import MissionPanel from "./components/MissionPanel";
import SolarSystemScene from "./components/SolarSystemScene";
import TeacherPanel from "./components/TeacherPanel";
import { SCALE_MODES, SOLAR_SYSTEM_OBJECTS } from "./data/solarSystemData";
import { getObjectById } from "./utils/sceneScale";

export default function App() {
  const [selectedId, setSelectedId] = useState("earth");
  const [scaleMode, setScaleMode] = useState(SCALE_MODES.classroom.id);
  const [labelsVisible, setLabelsVisible] = useState(true);
  const [orbitSpeed, setOrbitSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [focusRequest, setFocusRequest] = useState({ targetId: "earth", nonce: 0 });
  const [missionResults, setMissionResults] = useState({});
  const [quizAnswers, setQuizAnswers] = useState({});
  const [compareOpen, setCompareOpen] = useState(false);
  const [teacherOpen, setTeacherOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const selectedObject = useMemo(() => getObjectById(SOLAR_SYSTEM_OBJECTS, selectedId), [selectedId]);
  const scaleNote = SCALE_MODES[scaleMode].note;

  function requestFocus(targetId) {
    setFocusRequest({ targetId, nonce: Date.now() });
    if (targetId !== "full") setSelectedId(targetId);
  }

  function updateMissionResult(missionId, result) {
    setMissionResults((previous) => ({ ...previous, [missionId]: result }));
  }

  function updateQuizAnswer(index, answer) {
    setQuizAnswers((previous) => ({ ...previous, [index]: answer }));
  }

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div>
          <p className="eyebrow">Year 7-8 Science interactive</p>
          <h1>Solar System Scale Explorer</h1>
          <p>Rotate, zoom and explore Earth's place in space</p>
        </div>
        <div className="scale-note" role="note">
          <strong>Accuracy note</strong>
          <span>
            Classroom Scale adjusts distances so the Solar System is easier to explore. Relative Size and Relative
            Distance modes help compare objects more scientifically.
          </span>
        </div>
      </header>

      <main className="workspace">
        <MissionPanel
          selectedId={selectedId}
          scaleMode={scaleMode}
          missionResults={missionResults}
          onMissionResult={updateMissionResult}
        />

        <section className="scene-panel" aria-label="3D Solar System explorer">
          <SolarSystemScene
            selectedId={selectedId}
            scaleMode={scaleMode}
            labelsVisible={labelsVisible}
            orbitSpeed={orbitSpeed}
            isPlaying={isPlaying}
            focusRequest={focusRequest}
            onObjectSelect={setSelectedId}
          />
          <MiniMap selectedId={selectedId} />
          <div className="scene-help">
            <strong>{SCALE_MODES[scaleMode].label}</strong>
            <span>{scaleNote}</span>
          </div>
        </section>

        <InfoPanel
          object={selectedObject}
          onFocus={requestFocus}
          onBackToEarth={() => requestFocus("earth")}
          onFullView={() => requestFocus("full")}
        />
      </main>

      <ControlsPanel
        isPlaying={isPlaying}
        onPlayingChange={setIsPlaying}
        orbitSpeed={orbitSpeed}
        onOrbitSpeedChange={setOrbitSpeed}
        labelsVisible={labelsVisible}
        onLabelsVisibleChange={setLabelsVisible}
        scaleMode={scaleMode}
        onScaleModeChange={setScaleMode}
        onBackToEarth={() => requestFocus("earth")}
        onFullView={() => requestFocus("full")}
        onOpenCompare={() => setCompareOpen(true)}
        onOpenTeacher={() => setTeacherOpen(true)}
        onOpenAssessment={() => setAssessmentOpen(true)}
        onOpenSummary={() => setSummaryOpen(true)}
      />

      <ComparePanel isOpen={compareOpen} onClose={() => setCompareOpen(false)} />
      <TeacherPanel isOpen={teacherOpen} onClose={() => setTeacherOpen(false)} />
      <AssessmentPanel
        isOpen={assessmentOpen}
        onClose={() => setAssessmentOpen(false)}
        quizAnswers={quizAnswers}
        onQuizAnswer={updateQuizAnswer}
      />
      <ExportSummary
        isOpen={summaryOpen}
        onClose={() => setSummaryOpen(false)}
        selectedObject={selectedObject}
        scaleMode={scaleMode}
        missionResults={missionResults}
        quizAnswers={quizAnswers}
      />
    </div>
  );
}

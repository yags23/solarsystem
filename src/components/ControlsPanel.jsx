import { SCALE_MODES } from "../data/solarSystemData";

export default function ControlsPanel({
  isPlaying,
  onPlayingChange,
  orbitSpeed,
  onOrbitSpeedChange,
  labelsVisible,
  onLabelsVisibleChange,
  scaleMode,
  onScaleModeChange,
  onBackToEarth,
  onFullView,
  onOpenCompare,
  onOpenTeacher,
  onOpenAssessment,
  onOpenSummary
}) {
  return (
    <section className="controls-panel" aria-label="Solar System controls">
      <div className="control-group">
        <button type="button" className="primary-control" onClick={() => onPlayingChange(!isPlaying)}>
          {isPlaying ? "Pause orbit" : "Play orbit"}
        </button>
        <label className="slider-control">
          <span>Orbit speed</span>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={orbitSpeed}
            onChange={(event) => onOrbitSpeedChange(Number(event.target.value))}
          />
          <strong>{orbitSpeed.toFixed(1)}x</strong>
        </label>
        <label className="toggle-control">
          <input
            type="checkbox"
            checked={labelsVisible}
            onChange={(event) => onLabelsVisibleChange(event.target.checked)}
          />
          <span>Labels</span>
        </label>
      </div>

      <div className="scale-selector" role="radiogroup" aria-label="Scale mode">
        {Object.values(SCALE_MODES).map((mode) => (
          <button
            type="button"
            role="radio"
            aria-checked={scaleMode === mode.id}
            key={mode.id}
            className={scaleMode === mode.id ? "active" : ""}
            onClick={() => onScaleModeChange(mode.id)}
            title={mode.note}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <div className="control-group">
        <button type="button" onClick={onBackToEarth}>
          Back to Earth
        </button>
        <button type="button" onClick={onFullView}>
          Full Solar System View
        </button>
        <button type="button" onClick={onOpenCompare}>
          Compare Planets
        </button>
        <button type="button" onClick={onOpenTeacher}>
          Teacher Mode
        </button>
        <button type="button" onClick={onOpenAssessment}>
          Assessment Mode
        </button>
        <button type="button" onClick={onOpenSummary}>
          Export Summary
        </button>
      </div>
    </section>
  );
}

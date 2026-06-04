import { useMemo, useState } from "react";
import { PLANETS } from "../data/solarSystemData";
import { formatKm } from "../utils/sceneScale";

function CompareMetric({ label, left, right }) {
  return (
    <div className="compare-metric">
      <span>{label}</span>
      <strong>{left}</strong>
      <strong>{right}</strong>
    </div>
  );
}

export default function ComparePanel({ isOpen, onClose }) {
  const [leftId, setLeftId] = useState("earth");
  const [rightId, setRightId] = useState("jupiter");

  const left = useMemo(() => PLANETS.find((planet) => planet.id === leftId), [leftId]);
  const right = useMemo(() => PLANETS.find((planet) => planet.id === rightId), [rightId]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal-panel" role="dialog" aria-modal="true" aria-label="Compare Planets">
        <div className="modal-header">
          <div>
            <div className="panel-kicker">Stretch feature</div>
            <h2>Compare Planets</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close Compare Planets">
            Close
          </button>
        </div>

        <div className="compare-selectors">
          <label>
            <span>First planet</span>
            <select value={leftId} onChange={(event) => setLeftId(event.target.value)}>
              {PLANETS.map((planet) => (
                <option key={planet.id} value={planet.id}>
                  {planet.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Second planet</span>
            <select value={rightId} onChange={(event) => setRightId(event.target.value)}>
              {PLANETS.map((planet) => (
                <option key={planet.id} value={planet.id}>
                  {planet.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="compare-table" aria-label="Planet comparison table">
          <div className="compare-head">
            <span>Feature</span>
            <strong>{left.name}</strong>
            <strong>{right.name}</strong>
          </div>
          <CompareMetric label="Diameter" left={formatKm(left.diameterKm)} right={formatKm(right.diameterKm)} />
          <CompareMetric label="Gravity" left={`${left.gravityMs2} m/s2`} right={`${right.gravityMs2} m/s2`} />
          <CompareMetric label="Day length" left={left.dayLength} right={right.dayLength} />
          <CompareMetric label="Year length" left={left.yearLength} right={right.yearLength} />
          <CompareMetric label="Distance from Sun" left={left.distanceFromSun} right={right.distanceFromSun} />
        </div>
      </section>
    </div>
  );
}

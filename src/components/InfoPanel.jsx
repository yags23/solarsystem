import { formatKm } from "../utils/sceneScale";

function DetailRow({ label, value }) {
  return (
    <div className="detail-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function InfoPanel({ object, onFocus, onBackToEarth, onFullView }) {
  if (!object) return null;

  const orderText =
    object.type === "star" ? "Centre" : object.type === "moon" ? "Earth's moon" : `${object.order} from the Sun`;

  return (
    <aside className="panel info-panel" aria-label="Selected object information">
      <div className="panel-kicker">Selected object</div>
      <h2>{object.name}</h2>
      <div className="type-badge">{object.type}</div>
      <p className="description">{object.description}</p>

      <div className="detail-grid">
        <DetailRow label="Order" value={orderText} />
        <DetailRow label="Diameter" value={formatKm(object.diameterKm)} />
        <DetailRow label="Distance from Sun" value={object.distanceFromSun} />
        <DetailRow label="Length of day" value={object.dayLength} />
        <DetailRow label="Length of year" value={object.yearLength} />
        <DetailRow label="Surface gravity" value={`${object.gravityMs2} m/s2`} />
      </div>

      <div className="fact-box">
        <span>Interesting fact</span>
        <p>{object.fact}</p>
      </div>

      <div className="panel-actions">
        <button type="button" onClick={() => onFocus(object.id)}>
          Focus on {object.shortName}
        </button>
        <button type="button" onClick={onBackToEarth}>
          Back to Earth
        </button>
        <button type="button" onClick={onFullView}>
          View Full Solar System
        </button>
      </div>
    </aside>
  );
}

import { PLANETS } from "../data/solarSystemData";

export default function MiniMap({ selectedId }) {
  return (
    <div className="mini-map" aria-label="Mini-map showing planet order">
      <div className="mini-sun" />
      {PLANETS.map((planet, index) => (
        <div
          key={planet.id}
          className={`mini-orbit ${selectedId === planet.id ? "selected" : ""}`}
          style={{ "--size": `${34 + index * 17}px` }}
          title={planet.name}
        />
      ))}
      <span>Mini-map</span>
    </div>
  );
}

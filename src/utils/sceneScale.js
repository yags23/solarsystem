import { SCALE_MODES } from "../data/solarSystemData";

export function getDisplayDistance(object, scaleMode) {
  if (object.id === "moon") return object.moonDistance;
  if (scaleMode === SCALE_MODES.relativeDistance.id) return object.relativeDistance;
  return object.classroomDistance;
}

export function getDisplayRadius(object, scaleMode) {
  if (scaleMode === SCALE_MODES.relativeSize.id) return object.relativeSizeRadius;
  if (scaleMode === SCALE_MODES.relativeDistance.id) return Math.max(0.28, object.classroomRadius * 0.8);
  return object.classroomRadius;
}

export function getOrbitSpeed(object) {
  if (!object.order || object.type === "moon" || object.type === "star") return 0;
  return 0.035 / Math.sqrt(Number(object.order));
}

export function formatKm(value) {
  return `${Number(value).toLocaleString("en-AU")} km`;
}

export function getObjectById(objects, id) {
  return objects.find((object) => object.id === id);
}

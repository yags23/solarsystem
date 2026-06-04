import * as THREE from "three";

function makeCanvas(size = 512) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  return { canvas, context: canvas.getContext("2d") };
}

function addNoise(context, size, opacity = 0.18) {
  for (let index = 0; index < 7000; index += 1) {
    const value = Math.floor(120 + Math.random() * 135);
    context.fillStyle = `rgba(${value}, ${value}, ${value}, ${opacity})`;
    context.fillRect(Math.random() * size, Math.random() * size, 1.4, 1.4);
  }
}

function addSoftBands(context, size, colorA, colorB) {
  for (let y = 0; y < size; y += 1) {
    const wave = Math.sin(y / 22) * 0.5 + Math.sin(y / 57) * 0.5;
    context.fillStyle = wave > 0 ? colorA : colorB;
    context.globalAlpha = 0.18 + Math.abs(wave) * 0.1;
    context.fillRect(0, y, size, 1);
  }
  context.globalAlpha = 1;
}

function addEarthContinents(context, size) {
  const continents = [
    { x: 145, y: 175, sx: 92, sy: 54, angle: -0.25 },
    { x: 310, y: 165, sx: 112, sy: 66, angle: 0.18 },
    { x: 240, y: 292, sx: 100, sy: 75, angle: 0.42 },
    { x: 395, y: 330, sx: 78, sy: 45, angle: -0.18 },
    { x: 105, y: 338, sx: 55, sy: 95, angle: 0.08 }
  ];

  continents.forEach((land) => {
    context.save();
    context.translate(land.x, land.y);
    context.rotate(land.angle);
    const gradient = context.createRadialGradient(0, 0, 10, 0, 0, land.sx);
    gradient.addColorStop(0, "#74b86a");
    gradient.addColorStop(0.62, "#3f8f55");
    gradient.addColorStop(1, "#c2a36f");
    context.fillStyle = gradient;
    context.beginPath();
    context.ellipse(0, 0, land.sx, land.sy, 0, 0, Math.PI * 2);
    context.fill();
    context.restore();
  });
}

function addCraterMarks(context, size) {
  for (let index = 0; index < 90; index += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 2 + Math.random() * 12;
    context.strokeStyle = "rgba(50, 48, 45, 0.23)";
    context.lineWidth = 1 + Math.random() * 1.2;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.stroke();
  }
}

export function createPlanetTexture(object) {
  const size = 512;
  const { canvas, context } = makeCanvas(size);
  const gradient = context.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, object.colorA);
  gradient.addColorStop(1, object.colorB);
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  if (object.id === "earth") {
    addEarthContinents(context, size);
    addSoftBands(context, size, "#ffffff", "#87ceeb");
  } else if (object.id === "moon" || object.id === "mercury") {
    addCraterMarks(context, size);
  } else if (object.banded) {
    addSoftBands(context, size, object.colorA, object.colorB);
  } else {
    addSoftBands(context, size, object.colorA, object.colorB);
  }

  context.globalCompositeOperation = "overlay";
  addNoise(context, size, 0.12);
  context.globalCompositeOperation = "source-over";

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export function createCloudTexture() {
  const size = 512;
  const { canvas, context } = makeCanvas(size);
  context.clearRect(0, 0, size, size);
  for (let index = 0; index < 140; index += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 14 + Math.random() * 42;
    const gradient = context.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, "rgba(255,255,255,0.45)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createLabelTexture(text) {
  const { canvas, context } = makeCanvas(256);
  context.clearRect(0, 0, 256, 256);
  context.font = "700 42px Inter, Arial, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "rgba(9, 18, 36, 0.7)";
  context.fillRect(28, 94, 200, 68);
  context.strokeStyle = "rgba(122, 214, 255, 0.78)";
  context.lineWidth = 2;
  context.strokeRect(28, 94, 200, 68);
  context.fillStyle = "#ffffff";
  context.fillText(text, 128, 129);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

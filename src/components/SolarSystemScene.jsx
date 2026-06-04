import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { PLANETS, SOLAR_SYSTEM_OBJECTS } from "../data/solarSystemData";
import { createCloudTexture, createLabelTexture, createPlanetTexture } from "../utils/createPlanetTexture";
import { getDisplayDistance, getDisplayRadius, getOrbitSpeed } from "../utils/sceneScale";

function makeOrbitLine(distance, color = "#78d6ff", opacity = 0.35) {
  const points = [];
  const segments = 192;
  for (let index = 0; index <= segments; index += 1) {
    const angle = (index / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * distance, 0, Math.sin(angle) * distance));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity,
    depthWrite: false
  });
  return new THREE.Line(geometry, material);
}

function makeStarField() {
  const geometry = new THREE.BufferGeometry();
  const count = 1800;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const radius = 170 + Math.random() * 260;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[index * 3 + 1] = radius * Math.cos(phi);
    positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

    const brightness = 0.62 + Math.random() * 0.38;
    colors[index * 3] = brightness;
    colors[index * 3 + 1] = brightness;
    colors[index * 3 + 2] = 1;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({
    size: 0.7,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true
  });
  return new THREE.Points(geometry, material);
}

function createPlanetMesh(object) {
  const geometry = new THREE.SphereGeometry(1, object.id === "sun" ? 64 : 48, object.id === "sun" ? 64 : 32);
  const texture = createPlanetTexture(object);
  const material = object.emissive
    ? new THREE.MeshBasicMaterial({ map: texture })
    : new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.78,
        metalness: 0.02
      });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = object.name;
  mesh.userData.objectId = object.id;

  if (object.hasClouds) {
    const cloudGeometry = new THREE.SphereGeometry(1.018, 48, 32);
    const cloudMaterial = new THREE.MeshStandardMaterial({
      map: createCloudTexture(),
      transparent: true,
      opacity: 0.38,
      depthWrite: false
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    clouds.userData.cloudLayer = true;
    mesh.add(clouds);
  }

  if (object.hasRings) {
    const ringGeometry = new THREE.RingGeometry(1.38, 2.18, 128);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: "#efdca4",
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.72,
      roughness: 0.8
    });
    const rings = new THREE.Mesh(ringGeometry, ringMaterial);
    rings.rotation.x = Math.PI / 2.35;
    rings.userData.rings = true;
    mesh.add(rings);
  }

  return mesh;
}

function createLabelSprite(text) {
  const material = new THREE.SpriteMaterial({
    map: createLabelTexture(text),
    transparent: true,
    depthTest: false,
    depthWrite: false
  });
  const sprite = new THREE.Sprite(material);
  sprite.renderOrder = 10;
  sprite.userData.label = true;
  return sprite;
}

function easeInOutCubic(value) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

export default function SolarSystemScene({
  selectedId,
  scaleMode,
  labelsVisible,
  orbitSpeed,
  isPlaying,
  focusRequest,
  onObjectSelect
}) {
  const mountRef = useRef(null);
  const sceneStateRef = useRef(null);
  const propsRef = useRef({ orbitSpeed, isPlaying, onObjectSelect });

  useEffect(() => {
    propsRef.current = { orbitSpeed, isPlaying, onObjectSelect };
  }, [orbitSpeed, isPlaying, onObjectSelect]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#020712");
    scene.fog = new THREE.FogExp2("#020712", 0.0045);

    const camera = new THREE.PerspectiveCamera(52, mount.clientWidth / mount.clientHeight, 0.1, 600);
    camera.position.set(25, 10, 28);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 2.2;
    controls.maxDistance = 180;
    controls.target.set(20, 0, 0);

    const interactingRef = { current: false };
    controls.addEventListener("start", () => {
      interactingRef.current = true;
    });
    controls.addEventListener("end", () => {
      window.setTimeout(() => {
        interactingRef.current = false;
      }, 750);
    });

    scene.add(makeStarField());
    scene.add(new THREE.AmbientLight("#8aa4ff", 0.44));

    const sunlight = new THREE.PointLight("#fff2c7", 4.8, 520, 1.25);
    sunlight.position.set(0, 0, 0);
    scene.add(sunlight);

    const rimLight = new THREE.DirectionalLight("#9fd6ff", 0.7);
    rimLight.position.set(-30, 22, -40);
    scene.add(rimLight);

    const root = new THREE.Group();
    root.name = "Solar System Root";
    scene.add(root);

    const objectRefs = new Map();
    const pivotRefs = new Map();
    const orbitRefs = new Map();
    const clickableObjects = [];

    const sun = SOLAR_SYSTEM_OBJECTS.find((object) => object.id === "sun");
    const sunMesh = createPlanetMesh(sun);
    root.add(sunMesh);
    objectRefs.set("sun", { mesh: sunMesh, data: sun, label: createLabelSprite("Sun") });
    clickableObjects.push(sunMesh);
    sunMesh.add(objectRefs.get("sun").label);

    PLANETS.forEach((planet) => {
      const pivot = new THREE.Group();
      pivot.name = `${planet.name} orbit pivot`;
      root.add(pivot);
      pivotRefs.set(planet.id, pivot);

      const mesh = createPlanetMesh(planet);
      pivot.add(mesh);
      clickableObjects.push(mesh);

      const label = createLabelSprite(planet.shortName);
      mesh.add(label);

      objectRefs.set(planet.id, { mesh, pivot, label, data: planet });

      const orbit = makeOrbitLine(planet.classroomDistance);
      orbit.name = `${planet.name} orbit`;
      root.add(orbit);
      orbitRefs.set(planet.id, orbit);
    });

    const earthRef = objectRefs.get("earth");
    const moon = SOLAR_SYSTEM_OBJECTS.find((object) => object.id === "moon");
    const moonPivot = new THREE.Group();
    moonPivot.name = "Moon orbit pivot";
    earthRef.pivot.add(moonPivot);
    const moonMesh = createPlanetMesh(moon);
    moonPivot.add(moonMesh);
    clickableObjects.push(moonMesh);
    const moonLabel = createLabelSprite("Moon");
    moonMesh.add(moonLabel);
    objectRefs.set("moon", { mesh: moonMesh, pivot: moonPivot, label: moonLabel, data: moon });
    const moonOrbit = makeOrbitLine(moon.moonDistance, "#ffffff", 0.5);
    moonPivot.add(moonOrbit);
    orbitRefs.set("moon", moonOrbit);

    const cameraTweenRef = { current: null };
    const currentScaleModeRef = { current: scaleMode };
    const clock = new THREE.Clock();

    function updateLayout(mode) {
      currentScaleModeRef.current = mode;
      const sunRadius = getDisplayRadius(sun, mode);
      sunMesh.scale.setScalar(sunRadius);
      objectRefs.get("sun").label.position.set(0, sunRadius + 2, 0);
      objectRefs.get("sun").label.scale.set(7, 3, 1);

      PLANETS.forEach((planet) => {
        const ref = objectRefs.get(planet.id);
        const distance = getDisplayDistance(planet, mode);
        const radius = getDisplayRadius(planet, mode);
        ref.mesh.position.set(distance, 0, 0);
        ref.mesh.scale.setScalar(radius);
        ref.label.position.set(0, radius + 0.8, 0);
        ref.label.scale.set(4.7, 2, 1);

        const oldOrbit = orbitRefs.get(planet.id);
        if (oldOrbit) {
          oldOrbit.geometry.dispose();
          oldOrbit.material.dispose();
          root.remove(oldOrbit);
        }
        const newOrbit = makeOrbitLine(distance);
        newOrbit.name = `${planet.name} orbit`;
        root.add(newOrbit);
        orbitRefs.set(planet.id, newOrbit);
      });

      const moonRadius = getDisplayRadius(moon, mode);
      moonMesh.position.set(getDisplayDistance(moon, mode), 0, 0);
      moonMesh.scale.setScalar(moonRadius);
      moonLabel.position.set(0, moonRadius + 0.55, 0);
      moonLabel.scale.set(3.8, 1.5, 1);

      const oldMoonOrbit = orbitRefs.get("moon");
      if (oldMoonOrbit) {
        oldMoonOrbit.geometry.dispose();
        oldMoonOrbit.material.dispose();
        moonPivot.remove(oldMoonOrbit);
      }
      const newMoonOrbit = makeOrbitLine(getDisplayDistance(moon, mode), "#ffffff", 0.5);
      moonPivot.add(newMoonOrbit);
      orbitRefs.set("moon", newMoonOrbit);
    }

    function setLabelsVisible(visible) {
      objectRefs.forEach((ref) => {
        if (ref.label) ref.label.visible = visible;
      });
    }

    function getWorldPosition(id) {
      const ref = objectRefs.get(id);
      const worldPosition = new THREE.Vector3();
      if (ref) ref.mesh.getWorldPosition(worldPosition);
      return worldPosition;
    }

    function moveCameraTo(id, duration = 1200) {
      const startPosition = camera.position.clone();
      const startTarget = controls.target.clone();
      let endTarget = new THREE.Vector3(20, 0, 0);
      let endPosition = new THREE.Vector3(15, 48, 118);

      if (id && id !== "full") {
        endTarget = getWorldPosition(id);
        const ref = objectRefs.get(id);
        const radius = ref ? Math.max(1, getDisplayRadius(ref.data, currentScaleModeRef.current)) : 1;
        const distance = id === "sun" ? radius * 3.4 : radius * 5.2 + 3.5;
        endPosition = endTarget.clone().add(new THREE.Vector3(distance, radius * 2.2 + 2, distance));
      }

      if (duration <= 0) {
        camera.position.copy(endPosition);
        controls.target.copy(endTarget);
        controls.update();
        return;
      }

      cameraTweenRef.current = {
        startPosition,
        startTarget,
        endPosition,
        endTarget,
        startedAt: performance.now(),
        duration
      };
    }

    updateLayout(scaleMode);
    setLabelsVisible(labelsVisible);
    moveCameraTo("earth", 0);

    const pointerStart = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    function handlePointerDown(event) {
      pointerStart.x = event.clientX;
      pointerStart.y = event.clientY;
    }

    function handlePointerUp(event) {
      const moved = Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y);
      if (moved > 8) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const intersections = raycaster.intersectObjects(clickableObjects, true);
      const hit = intersections.find((item) => item.object.userData.objectId);
      if (hit) propsRef.current.onObjectSelect(hit.object.userData.objectId);
    }

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointerup", handlePointerUp);

    const resizeObserver = new ResizeObserver(() => {
      if (!mount.clientWidth || !mount.clientHeight) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    });
    resizeObserver.observe(mount);

    let frameId = 0;
    function animate() {
      const delta = clock.getDelta();
      const currentProps = propsRef.current;
      const speed = currentProps.orbitSpeed;

      if (currentProps.isPlaying) {
        PLANETS.forEach((planet) => {
          const pivot = pivotRefs.get(planet.id);
          if (pivot) pivot.rotation.y += delta * getOrbitSpeed(planet) * speed;
        });
        moonPivot.rotation.y += delta * 0.32 * speed;
      }

      objectRefs.forEach((ref) => {
        if (ref.mesh && !ref.mesh.userData.cloudLayer) {
          ref.mesh.rotation.y += delta * (interactingRef.current ? 0.035 : 0.18);
        }
        const clouds = ref.mesh?.children.find((child) => child.userData.cloudLayer);
        if (clouds) clouds.rotation.y += delta * 0.09;
      });

      const earth = objectRefs.get("earth");
      if (earth) moonPivot.position.copy(earth.mesh.position);

      if (cameraTweenRef.current) {
        const tween = cameraTweenRef.current;
        const progress = Math.min(1, (performance.now() - tween.startedAt) / tween.duration);
        const eased = easeInOutCubic(progress);
        camera.position.lerpVectors(tween.startPosition, tween.endPosition, eased);
        controls.target.lerpVectors(tween.startTarget, tween.endTarget, eased);
        if (progress >= 1) cameraTweenRef.current = null;
      }

      controls.update();
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    }
    animate();

    sceneStateRef.current = {
      updateLayout,
      setLabelsVisible,
      moveCameraTo,
      objectRefs,
      renderer,
      scene,
      camera,
      controls
    };

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointerup", handlePointerUp);
      controls.dispose();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            if (material.map) material.map.dispose();
            material.dispose();
          });
        }
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    sceneStateRef.current?.updateLayout(scaleMode);
  }, [scaleMode]);

  useEffect(() => {
    sceneStateRef.current?.setLabelsVisible(labelsVisible);
  }, [labelsVisible]);

  useEffect(() => {
    if (!focusRequest || !sceneStateRef.current) return;
    sceneStateRef.current.moveCameraTo(focusRequest.targetId);
  }, [focusRequest]);

  useEffect(() => {
    if (!sceneStateRef.current) return;
    sceneStateRef.current.objectRefs.forEach((ref, id) => {
      ref.mesh.traverse((child) => {
        if (child.material?.emissive && id !== "sun") {
          child.material.emissive.set(id === selectedId ? "#284bff" : "#000000");
          child.material.emissiveIntensity = id === selectedId ? 0.15 : 0;
        }
      });
    });
  }, [selectedId]);

  return <div ref={mountRef} className="scene-canvas" aria-label="Interactive 3D Solar System scene" />;
}

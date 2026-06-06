/*
  Solar System Scale Explorer data

  Teacher update note:
  - Edit this file to change planet facts, mission wording, quiz questions or classroom scale values.
  - Diameters and distances are approximate classroom-friendly values.
  - "classroomDistance" and "classroomRadius" are visual values used by the 3D scene.
  - "relativeDistance" is still simplified; true Solar System distances are too large for a normal classroom navigation model.
  - Texture files live in public/textures. To update a planet image, replace that file or change the texture filename below.
*/

export const SCALE_MODES = {
  classroom: {
    id: "classroom",
    label: "Classroom Scale",
    note: "Distances and sizes are adjusted so students can see the whole system."
  },
  relativeSize: {
    id: "relativeSize",
    label: "Relative Planet Size",
    note: "Planet sizes are compared more carefully while distances stay easy to navigate."
  },
  relativeDistance: {
    id: "relativeDistance",
    label: "Relative Distance",
    note: "Planet distances are spread out with a simplified scale."
  }
};

export const SOLAR_SYSTEM_OBJECTS = [
  {
    id: "sun",
    name: "Sun",
    shortName: "Sun",
    order: 0,
    type: "star",
    description: "The Sun is the star at the centre of our Solar System. Its gravity keeps the planets in orbit.",
    diameterKm: 1392700,
    gravityMs2: 274,
    distanceFromSun: "0 km",
    distanceAu: 0,
    dayLength: "About 25-35 Earth days, depending on latitude",
    yearLength: "Not applicable",
    fact: "The Sun contains more than 99 percent of the mass in the Solar System.",
    classroomDistance: 0,
    relativeDistance: 0,
    classroomRadius: 4.5,
    relativeSizeRadius: 7.5,
    colorA: "#ffd15f",
    colorB: "#ff7b1a",
    texture: "sun.jpg",
    emissive: true
  },
  {
    id: "mercury",
    name: "Mercury",
    shortName: "Mercury",
    order: 1,
    type: "terrestrial planet",
    description: "Mercury is a small rocky planet with a cratered surface and almost no atmosphere.",
    diameterKm: 4879,
    gravityMs2: 3.7,
    distanceFromSun: "57.9 million km",
    distanceAu: 0.39,
    dayLength: "59 Earth days",
    yearLength: "88 Earth days",
    fact: "A year on Mercury is shorter than one Mercury day-night cycle.",
    classroomDistance: 10,
    relativeDistance: 9,
    classroomRadius: 0.42,
    relativeSizeRadius: 0.38,
    colorA: "#9d9185",
    colorB: "#4c4744",
    texture: "mercury.jpg"
  },
  {
    id: "venus",
    name: "Venus",
    shortName: "Venus",
    order: 2,
    type: "terrestrial planet",
    description: "Venus is a rocky planet with a thick atmosphere that traps heat.",
    diameterKm: 12104,
    gravityMs2: 8.87,
    distanceFromSun: "108.2 million km",
    distanceAu: 0.72,
    dayLength: "243 Earth days",
    yearLength: "225 Earth days",
    fact: "Venus rotates in the opposite direction to most planets.",
    classroomDistance: 14,
    relativeDistance: 15,
    classroomRadius: 0.72,
    relativeSizeRadius: 0.95,
    colorA: "#e8bd67",
    colorB: "#a9672f",
    texture: "venus.jpg"
  },
  {
    id: "earth",
    name: "Earth",
    shortName: "Earth",
    order: 3,
    type: "terrestrial planet",
    description: "Earth is our home planet, with liquid water, a protective atmosphere and living things.",
    diameterKm: 12742,
    gravityMs2: 9.81,
    distanceFromSun: "149.6 million km",
    distanceAu: 1,
    dayLength: "24 hours",
    yearLength: "365.25 days",
    fact: "Earth is the only known planet with life.",
    classroomDistance: 20,
    relativeDistance: 22,
    classroomRadius: 1,
    relativeSizeRadius: 1,
    colorA: "#2a7bd8",
    colorB: "#52b56d",
    texture: "earth_day.jpg",
    cloudTexture: "earth_clouds.jpg",
    hasClouds: true
  },
  {
    id: "moon",
    name: "Moon",
    shortName: "Moon",
    order: "Earth's moon",
    type: "moon",
    description: "The Moon is Earth's natural satellite. It reflects sunlight and orbits Earth about once a month.",
    diameterKm: 3474,
    gravityMs2: 1.62,
    distanceFromSun: "Orbits Earth",
    distanceAu: 1,
    dayLength: "27.3 Earth days",
    yearLength: "27.3 Earth days around Earth",
    fact: "The same side of the Moon always faces Earth.",
    classroomDistance: 22.4,
    relativeDistance: 24.5,
    classroomRadius: 0.28,
    relativeSizeRadius: 0.27,
    colorA: "#d7d3c9",
    colorB: "#79766e",
    texture: "moon.jpg",
    parentId: "earth",
    moonDistance: 2.6
  },
  {
    id: "mars",
    name: "Mars",
    shortName: "Mars",
    order: 4,
    type: "terrestrial planet",
    description: "Mars is a cold rocky planet with iron-rich dust that makes it look red.",
    diameterKm: 6779,
    gravityMs2: 3.71,
    distanceFromSun: "227.9 million km",
    distanceAu: 1.52,
    dayLength: "24.6 hours",
    yearLength: "687 Earth days",
    fact: "Mars has the largest volcano in the Solar System, Olympus Mons.",
    classroomDistance: 28,
    relativeDistance: 32,
    classroomRadius: 0.62,
    relativeSizeRadius: 0.53,
    colorA: "#ca5a35",
    colorB: "#6e2d21",
    texture: "mars.jpg"
  },
  {
    id: "jupiter",
    name: "Jupiter",
    shortName: "Jupiter",
    order: 5,
    type: "gas giant",
    description: "Jupiter is the largest planet, made mostly of hydrogen and helium.",
    diameterKm: 139820,
    gravityMs2: 24.79,
    distanceFromSun: "778.5 million km",
    distanceAu: 5.2,
    dayLength: "9.9 hours",
    yearLength: "11.9 Earth years",
    fact: "Jupiter's Great Red Spot is a giant storm larger than Earth.",
    classroomDistance: 39,
    relativeDistance: 54,
    classroomRadius: 2.25,
    relativeSizeRadius: 4.1,
    colorA: "#d7a56b",
    colorB: "#7c4e35",
    texture: "jupiter.jpg",
    banded: true
  },
  {
    id: "saturn",
    name: "Saturn",
    shortName: "Saturn",
    order: 6,
    type: "gas giant",
    description: "Saturn is a gas giant famous for its wide bright ring system.",
    diameterKm: 116460,
    gravityMs2: 10.44,
    distanceFromSun: "1.43 billion km",
    distanceAu: 9.58,
    dayLength: "10.7 hours",
    yearLength: "29.4 Earth years",
    fact: "Saturn's rings are made mostly of ice and rock particles.",
    classroomDistance: 51,
    relativeDistance: 72,
    classroomRadius: 1.95,
    relativeSizeRadius: 3.75,
    colorA: "#e9cf8b",
    colorB: "#9d7745",
    texture: "saturn.jpg",
    ringTexture: "saturn_ring_alpha.png",
    hasRings: true,
    banded: true
  },
  {
    id: "uranus",
    name: "Uranus",
    shortName: "Uranus",
    order: 7,
    type: "ice giant",
    description: "Uranus is an ice giant with a blue-green colour and a tilted rotation axis.",
    diameterKm: 50724,
    gravityMs2: 8.69,
    distanceFromSun: "2.87 billion km",
    distanceAu: 19.2,
    dayLength: "17.2 hours",
    yearLength: "84 Earth years",
    fact: "Uranus rotates almost on its side.",
    classroomDistance: 63,
    relativeDistance: 92,
    classroomRadius: 1.25,
    relativeSizeRadius: 2.1,
    colorA: "#9de3e4",
    colorB: "#3b9fa5",
    texture: "uranus.jpg"
  },
  {
    id: "neptune",
    name: "Neptune",
    shortName: "Neptune",
    order: 8,
    type: "ice giant",
    description: "Neptune is a distant ice giant with very strong winds and a deep blue colour.",
    diameterKm: 49244,
    gravityMs2: 11.15,
    distanceFromSun: "4.50 billion km",
    distanceAu: 30.1,
    dayLength: "16.1 hours",
    yearLength: "164.8 Earth years",
    fact: "Neptune was found using mathematics before it was directly observed.",
    classroomDistance: 75,
    relativeDistance: 112,
    classroomRadius: 1.2,
    relativeSizeRadius: 2,
    colorA: "#366bde",
    colorB: "#142b8f",
    texture: "neptune.jpg"
  }
];

export const PLANETS = SOLAR_SYSTEM_OBJECTS.filter((object) => object.order > 0 && object.type !== "moon");
export const SELECTABLE_OBJECTS = SOLAR_SYSTEM_OBJECTS;

export const MISSIONS = [
  {
    id: "closest",
    title: "Find the closest planet",
    instruction: "Click the planet closest to the Sun.",
    hint: "Look for the smallest orbit path nearest the Sun.",
    check: ({ selectedId }) => selectedId === "mercury",
    correct: "Correct! Mercury is closest to the Sun.",
    incorrect: "Try again. The closest planet is the one on the smallest orbit."
  },
  {
    id: "largest",
    title: "Find the largest planet",
    instruction: "Click the largest planet in the Solar System.",
    hint: "It is a striped gas giant beyond Mars.",
    check: ({ selectedId }) => selectedId === "jupiter",
    correct: "Correct! Jupiter is the largest planet.",
    incorrect: "Try again. Compare the gas giants outside the asteroid belt."
  },
  {
    id: "earthMars",
    title: "Earth and Mars",
    instruction: "Zoom or view the system, then click Mars. Which planet is further from the Sun: Earth or Mars?",
    hint: "Mars travels on the orbit just outside Earth's orbit.",
    check: ({ selectedId }) => selectedId === "mars",
    correct: "Correct! Mars is further from the Sun than Earth.",
    incorrect: "Try again. Click Mars when you have found it."
  },
  {
    id: "saturn",
    title: "Saturn's special feature",
    instruction: "Click Saturn and identify what makes it visually different from most other planets.",
    hint: "Look for the planet with a wide ring system.",
    check: ({ selectedId }) => selectedId === "saturn",
    correct: "Correct! Saturn is famous for its rings.",
    incorrect: "Try again. Search for the planet with large rings."
  },
  {
    id: "jupiterEarth",
    title: "Compare Jupiter and Earth",
    instruction: "Switch to Relative Planet Size mode and click Jupiter. What do you notice compared with Earth?",
    hint: "Use the scale mode selector at the bottom.",
    check: ({ selectedId, scaleMode }) => selectedId === "jupiter" && scaleMode === "relativeSize",
    correct: "Correct! In relative size mode, Jupiter is much larger than Earth.",
    incorrect: "Try again. Select Relative Planet Size mode, then click Jupiter."
  }
];

export const QUIZ_QUESTIONS = [
  {
    question: "Which planet is closest to the Sun?",
    options: ["Mercury", "Venus", "Earth", "Mars"],
    answer: "Mercury"
  },
  {
    question: "Which planet is the largest?",
    options: ["Earth", "Jupiter", "Saturn", "Neptune"],
    answer: "Jupiter"
  },
  {
    question: "What type of object is the Sun?",
    options: ["Moon", "Terrestrial planet", "Star", "Ice giant"],
    answer: "Star"
  },
  {
    question: "Which planet is known for its large rings?",
    options: ["Mars", "Saturn", "Venus", "Mercury"],
    answer: "Saturn"
  },
  {
    question: "Why does the app use Classroom Scale?",
    options: [
      "True distances are too large to explore easily",
      "Planets are all the same size",
      "The Moon is larger than Earth",
      "The Sun is not part of the Solar System"
    ],
    answer: "True distances are too large to explore easily"
  }
];

export const TEACHER_QUESTIONS = [
  "How does changing the scale mode change what students notice first?",
  "Why are orbit paths useful even when the model is simplified?",
  "What evidence shows that Jupiter and Saturn are different from Earth and Mars?",
  "Why would a fully accurate Solar System model be difficult to use in a classroom?",
  "How does zooming out change a student's sense of Earth's place in space?"
];

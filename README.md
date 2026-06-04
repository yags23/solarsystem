# Solar System Scale Explorer

An interactive 3D science classroom app for Year 7-8 students. Students rotate and zoom around Earth, then explore the Moon, the Sun and all eight planets while comparing scale, order, size and distance.

## Run Locally

```sh
npm install
npm run dev
```

Then open the local URL Vite prints, usually:

```text
http://localhost:5173/
```

## Teacher Editing Notes

Planet and mission data live in:

```text
src/data/solarSystemData.js
```

To update facts, edit the objects in `SOLAR_SYSTEM_OBJECTS`. The 3D scene reads from those objects, so names, descriptions, diameters, distances, day lengths, year lengths and interesting facts update in the interface automatically.

## Texture Notes

This project uses procedural canvas textures so it works without paid APIs or downloaded image assets. To add NASA/public-domain textures later, replace the material creation logic in:

```text
src/utils/createPlanetTexture.js
```

NASA public-domain texture sources can be added as local image files in `src/assets/` and loaded with `THREE.TextureLoader`.

## Scale Modes

- Classroom Scale: compressed distances and readable planet sizes for classroom navigation.
- Relative Planet Size: planet sizes are compared more scientifically while distances remain navigable.
- Relative Distance: distances are spread further apart with a simplified scale so students can still explore.

True Solar System distances are enormous, so this app prioritises an explorable classroom model with notes about what has been adjusted.

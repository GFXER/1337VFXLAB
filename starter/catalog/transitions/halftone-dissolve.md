---
id: t_halftone
kind: transition
name: Halftone dissolve
group: Wipes & reveals
preview: ../docs/previews/t_halftone.gif
tags: [demo]
---
A breaks into halftone dots that shrink away from the face outward and reveal B.

## How
Color Halftone (or CC Ball Action) on A, cell 22 px, dot size = luminance × (1 − progress). Progress map: Radial Gradient centred on the face, used as a Gradient Wipe map, 15 f ease-out. B sits underneath.

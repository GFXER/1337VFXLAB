---
id: t_glitch
kind: transition
name: Glitch tear
group: Glitch & distortion
preview: ../docs/previews/t_glitch.gif
tags: [demo]
---
Horizontal slices of A and B tear sideways with an RGB split and one inverted frame.

## How
10 f window centred on the cut. Slices 8–70 px tall shifted ±70 px (random per frame, decaying to 0 at the edges of the window), about a third of the slices taken from the other clip. Channel offset R −14 px / B +14 px. Invert on 1 frame. Sapphire: S_DigitalDamage 4–6 f does most of this in one effect.

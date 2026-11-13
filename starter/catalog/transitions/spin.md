---
id: t_spin
kind: transition
name: Spin
group: Motion through the cut
preview: ../docs/previews/t_spin.gif
tags: [demo]
---
Half a turn out of A, half a turn into B; the cut hides inside the blur.

## How
ADJ Transform rotation 0→180° + scale 100→125 % (5 f, ease-in), then 180→360° + 125→100 % (10 f, ease-out). Motion Tile mirror 300 %, shutter 300, CC Force Motion Blur 16 samples.

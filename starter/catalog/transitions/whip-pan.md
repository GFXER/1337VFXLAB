---
id: t_whip
kind: transition
name: Whip pan
group: Motion through the cut
preview: ../docs/previews/t_whip.gif
tags: [demo]
---
A whips off to the left with real motion blur and B lands from the right, one continuous move.

## How
ADJ layer over the cut: Transform position X 0→−1100 px (5 f, ease-in) then +1100→0 px on B (10 f, ease-out, influence 90 %), shutter angle 300. Motion Tile mirror 300 % on both clips so the edges never show. Cut on the fastest frame.

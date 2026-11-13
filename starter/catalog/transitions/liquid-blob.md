---
id: t_blob
kind: transition
name: Liquid blob
group: Wipes & reveals
preview: ../docs/previews/t_blob.gif
tags: [demo]
---
B pours in through soft, organic blobs that bend the picture along their edges.

## How
Gradient Wipe on A with a Fractal Noise precomp as the map (complexity 3, scale 400, soft), completion 0→100 over 15 f expo-out, softness 0.04. Displacement Map from the same noise, 0→110→0 px, only near the moving edge.

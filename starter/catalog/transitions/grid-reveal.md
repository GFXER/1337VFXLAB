---
id: t_grid
kind: transition
name: Grid reveal
group: Wipes & reveals
preview: ../docs/previews/t_grid.gif
tags: [demo]
---
B arrives as nine tiles, centre first, then the cross, then the corners, each landing with a flash.

## How
B cropped into a 3×3 grid. Tile order 5, 2-4-6-8, 1-3-7-9 with a 1.6 f stagger. Each tile: scale 55→100 % over 9 f expo-out, opacity 0→100 in 3 f, Exposure +1→0 over 2 f. A underneath: Gaussian Blur 12, brightness 45 %. Once a tile lands, its slot behind fades to B so no gaps show.

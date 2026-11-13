window.CATALOG = [
 {
  "id": "e_duo",
  "kind": "effect",
  "name": "Duotone",
  "group": "Grade",
  "preview": "../docs/previews/e_duo.gif",
  "tags": [
   "demo"
  ],
  "desc": "Two-colour map from shadows to highlights.",
  "how": "Tritone or Colorama gradient map: shadow #1A0540 → highlight #FAD9C2."
 },
 {
  "id": "e_grain",
  "kind": "effect",
  "name": "Film grain",
  "group": "Finish",
  "preview": "../docs/previews/e_grain.gif",
  "tags": [
   "demo"
  ],
  "desc": "Mono grain that moves every frame.",
  "how": "Noise 22 %, colour off, clipping on; or a grain plate in Overlay at 40 %."
 },
 {
  "id": "e_mono",
  "kind": "effect",
  "name": "Mono punch",
  "group": "Grade",
  "preview": "../docs/previews/e_mono.gif",
  "tags": [
   "demo"
  ],
  "desc": "High-contrast black & white for the punchline.",
  "how": "Hue/Sat master saturation −100, Curves S-curve, Levels gamma 0.95."
 },
 {
  "id": "e_rgb",
  "kind": "effect",
  "name": "RGB split",
  "group": "Light & glitch",
  "preview": "../docs/previews/e_rgb.gif",
  "tags": [
   "demo"
  ],
  "desc": "Chromatic channel offset for hits and drops.",
  "how": "Channel offset R −8 px / B +8 px, keyed 0→8→0 over 5 f on the beat."
 },
 {
  "id": "e_bloom",
  "kind": "effect",
  "name": "Soft bloom",
  "group": "Light & glow",
  "preview": "../docs/previews/e_bloom.gif",
  "tags": [
   "demo"
  ],
  "desc": "Highlights breathe into a soft glow.",
  "how": "Duplicate, Gaussian 18, Screen at 55 %. Keep the threshold high on skin."
 },
 {
  "id": "e_step",
  "kind": "effect",
  "name": "Stepped motion",
  "group": "Motion",
  "preview": "../docs/previews/e_step.gif",
  "tags": [
   "demo"
  ],
  "desc": "Footage plays at half the frame rate for a stop-motion feel.",
  "how": "Posterize Time 8 fps on a precomp of the clip."
 },
 {
  "id": "g_dusk",
  "kind": "gradient",
  "name": "DUSK",
  "group": "Gradients",
  "stops": [
   [
    0,
    "#0B0614"
   ],
   [
    0.35,
    "#3A1950"
   ],
   [
    0.7,
    "#C2557A"
   ],
   [
    1,
    "#FFD3A8"
   ]
  ],
  "tags": [
   "demo"
  ],
  "desc": "Night footage, skin stays warm.",
  "how": ""
 },
 {
  "id": "g_ember",
  "kind": "gradient",
  "name": "EMBER",
  "group": "Gradients",
  "stops": [
   [
    0,
    "#080302"
   ],
   [
    0.3,
    "#4A0F06"
   ],
   [
    0.65,
    "#D2481A"
   ],
   [
    1,
    "#FFE7B3"
   ]
  ],
  "tags": [
   "demo"
  ],
  "desc": "Sport, fire, hype.",
  "how": ""
 },
 {
  "id": "g_ice",
  "kind": "gradient",
  "name": "ICE",
  "group": "Gradients",
  "stops": [
   [
    0,
    "#02060D"
   ],
   [
    0.4,
    "#18355E"
   ],
   [
    0.8,
    "#8FC2F2"
   ],
   [
    1,
    "#FFFFFF"
   ]
  ],
  "tags": [
   "demo"
  ],
  "desc": "Cold drops, winter, luxury.",
  "how": ""
 },
 {
  "id": "g_mint",
  "kind": "gradient",
  "name": "MINT",
  "group": "Gradients",
  "stops": [
   [
    0,
    "#04120F"
   ],
   [
    0.4,
    "#1E5E52"
   ],
   [
    0.75,
    "#7FD1B0"
   ],
   [
    1,
    "#EFFFF6"
   ]
  ],
  "tags": [
   "demo"
  ],
  "desc": "Clean product shots, tech.",
  "how": ""
 },
 {
  "id": "p_hook",
  "kind": "prompt",
  "name": "Hook-first brief",
  "group": "Prompts",
  "tags": [],
  "desc": "Write the first 1.5 s before anything else: one big word, one move, one sound.",
  "how": ""
 },
 {
  "id": "r_12",
  "kind": "rule",
  "name": "1:2 transitions",
  "group": "House rules",
  "tags": [],
  "desc": "N frames accelerating out, 2N settling in. Values never flip sign through the cut.",
  "how": ""
 },
 {
  "id": "r_sfx",
  "kind": "rule",
  "name": "Every event gets a sound",
  "group": "House rules",
  "tags": [],
  "desc": "Layer 3–5 short SFX per visual event; the whoosh peak sits on the transition midpoint.",
  "how": ""
 },
 {
  "id": "r_hold",
  "kind": "rule",
  "name": "No dead holds",
  "group": "House rules",
  "tags": [],
  "desc": "Nothing holds longer than ~1.8 s; something moves, cuts or lands at least every 2 s.",
  "how": ""
 },
 {
  "id": "to_ff",
  "kind": "tool",
  "name": "ffmpeg contact sheet",
  "group": "Tools",
  "tags": [],
  "desc": "Tile a render at 3 fps with timestamps to QC the whole video in one image.",
  "how": ""
 },
 {
  "id": "t_flip",
  "kind": "transition",
  "name": "Card flip",
  "group": "Motion through the cut",
  "preview": "../docs/previews/t_flip.gif",
  "tags": [
   "demo"
  ],
  "desc": "The frame turns into a card, flips edge-on on the cut and comes back around as B.",
  "how": "A and B precomped at 86 % on a dark background, 3D layers, camera 1100 px. Y rotation 0→−90° on A (5 f, ease-in), +90→0° on B (10 f, ease-out). Darken with the angle (Exposure −1 when edge-on). Motion blur on."
 },
 {
  "id": "t_card",
  "kind": "transition",
  "name": "Card toss",
  "group": "Motion through the cut",
  "preview": "../docs/previews/t_card.gif",
  "tags": [
   "demo"
  ],
  "desc": "A shrinks into a rounded card with a soft shadow and gets tossed off the top; B is already underneath.",
  "how": "A: scale 100→62 %, rounded-corner mask 0→70 px, rotation 0→−6° (8 f expo-out), then Y −1050 px and rotation −10° in 5 f ease-in. Drop Shadow 55 %, softness 60. B underneath settles 108→100 % over 22 f. Motion blur on."
 },
 {
  "id": "t_glitch",
  "kind": "transition",
  "name": "Glitch tear",
  "group": "Glitch & distortion",
  "preview": "../docs/previews/t_glitch.gif",
  "tags": [
   "demo"
  ],
  "desc": "Horizontal slices of A and B tear sideways with an RGB split and one inverted frame.",
  "how": "10 f window centred on the cut. Slices 8–70 px tall shifted ±70 px (random per frame, decaying to 0 at the edges of the window), about a third of the slices taken from the other clip. Channel offset R −14 px / B +14 px. Invert on 1 frame. Sapphire: S_DigitalDamage 4–6 f does most of this in one effect."
 },
 {
  "id": "t_grid",
  "kind": "transition",
  "name": "Grid reveal",
  "group": "Wipes & reveals",
  "preview": "../docs/previews/t_grid.gif",
  "tags": [
   "demo"
  ],
  "desc": "B arrives as nine tiles, centre first, then the cross, then the corners, each landing with a flash.",
  "how": "B cropped into a 3×3 grid. Tile order 5, 2-4-6-8, 1-3-7-9 with a 1.6 f stagger. Each tile: scale 55→100 % over 9 f expo-out, opacity 0→100 in 3 f, Exposure +1→0 over 2 f. A underneath: Gaussian Blur 12, brightness 45 %. Once a tile lands, its slot behind fades to B so no gaps show."
 },
 {
  "id": "t_halftone",
  "kind": "transition",
  "name": "Halftone dissolve",
  "group": "Wipes & reveals",
  "preview": "../docs/previews/t_halftone.gif",
  "tags": [
   "demo"
  ],
  "desc": "A breaks into halftone dots that shrink away from the face outward and reveal B.",
  "how": "Color Halftone (or CC Ball Action) on A, cell 22 px, dot size = luminance × (1 − progress). Progress map: Radial Gradient centred on the face, used as a Gradient Wipe map, 15 f ease-out. B sits underneath."
 },
 {
  "id": "t_jaws",
  "kind": "transition",
  "name": "Jaws",
  "group": "Wipes & reveals",
  "preview": "../docs/previews/t_jaws.gif",
  "tags": [
   "demo"
  ],
  "desc": "A splits open along a zig-zag bite and the halves slide off the top and bottom to show B.",
  "how": "CC Jaws on A: shape Spike, height 50, width 60, completion 0→1 over 25 f expo-out. Or two masked copies of A moving Y ∓600 px. 3 px dark stroke on the bite edge."
 },
 {
  "id": "t_burn",
  "kind": "transition",
  "name": "Light burn",
  "group": "Light & flashes",
  "preview": "../docs/previews/t_burn.gif",
  "tags": [
   "demo"
  ],
  "desc": "A over-exposes into a warm white burn and B cools back out of it.",
  "how": "ADJ over the cut: Exposure 0→+2.5 (5 f, ease-in) and back to 0 over 10 f (ease-out). Glow radius 120, intensity 0→1.6→0 on the same curve. Photo Filter warm 0→40→0 %. Cut on the brightest frame."
 },
 {
  "id": "t_leak",
  "kind": "transition",
  "name": "Light leak",
  "group": "Light & flashes",
  "preview": "../docs/previews/t_leak.gif",
  "tags": [
   "demo"
  ],
  "desc": "A warm orange leak sweeps across the frame and the cut hides under its brightest frame.",
  "how": "Light-leak plate (or a soft orange Radial Gradient) in Screen, sweeping left→right over 18 f; opacity on a sine curve peaking at 100 % on the cut, plus +0.25 lift at the peak."
 },
 {
  "id": "t_blob",
  "kind": "transition",
  "name": "Liquid blob",
  "group": "Wipes & reveals",
  "preview": "../docs/previews/t_blob.gif",
  "tags": [
   "demo"
  ],
  "desc": "B pours in through soft, organic blobs that bend the picture along their edges.",
  "how": "Gradient Wipe on A with a Fractal Noise precomp as the map (complexity 3, scale 400, soft), completion 0→100 over 15 f expo-out, softness 0.04. Displacement Map from the same noise, 0→110→0 px, only near the moving edge."
 },
 {
  "id": "t_stretch",
  "kind": "transition",
  "name": "Pixel stretch",
  "group": "Wipes & reveals",
  "preview": "../docs/previews/t_stretch.gif",
  "tags": [
   "demo"
  ],
  "desc": "B's leading edge smears down over A like a scanner line, then snaps clean.",
  "how": "CC Scale Wipe on B: stretch 100, direction 180°, completion 0→100 over 15 f expo-out. Smear length 260→20 px as it lands."
 },
 {
  "id": "t_ripple",
  "kind": "transition",
  "name": "Shock ripple",
  "group": "Glitch & distortion",
  "preview": "../docs/previews/t_ripple.gif",
  "tags": [
   "demo"
  ],
  "desc": "A shockwave rings out from the face and the cut lands on its peak.",
  "how": "Wave Warp / CC Ripple Pulse centred on the face: amplitude 0→28→0 px on a bell curve (±9 f around the cut), wavelength 26 px. 3 f crossfade at the peak, Gaussian Blur 0→3→0 with it."
 },
 {
  "id": "t_spin",
  "kind": "transition",
  "name": "Spin",
  "group": "Motion through the cut",
  "preview": "../docs/previews/t_spin.gif",
  "tags": [
   "demo"
  ],
  "desc": "Half a turn out of A, half a turn into B; the cut hides inside the blur.",
  "how": "ADJ Transform rotation 0→180° + scale 100→125 % (5 f, ease-in), then 180→360° + 125→100 % (10 f, ease-out). Motion Tile mirror 300 %, shutter 300, CC Force Motion Blur 16 samples."
 },
 {
  "id": "t_whip",
  "kind": "transition",
  "name": "Whip pan",
  "group": "Motion through the cut",
  "preview": "../docs/previews/t_whip.gif",
  "tags": [
   "demo"
  ],
  "desc": "A whips off to the left with real motion blur and B lands from the right, one continuous move.",
  "how": "ADJ layer over the cut: Transform position X 0→−1100 px (5 f, ease-in) then +1100→0 px on B (10 f, ease-out, influence 90 %), shutter angle 300. Motion Tile mirror 300 % on both clips so the edges never show. Cut on the fastest frame."
 },
 {
  "id": "t_zoom",
  "kind": "transition",
  "name": "Zoom punch",
  "group": "Motion through the cut",
  "preview": "../docs/previews/t_zoom.gif",
  "tags": [
   "demo"
  ],
  "desc": "Punch into the face on A, land wide on B, with a 2-frame white kiss on the cut.",
  "how": "ADJ Transform with the anchor on the face: scale 100→320 % (5 f, ease-in), then B 35→100 % (10 f, ease-out, influence 90 %). Shutter 300, Motion Tile mirror 300 %. White solid 55→0 % over 3 f on the cut."
 }
];

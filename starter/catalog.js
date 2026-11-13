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
  "id": "t_radial",
  "kind": "transition",
  "name": "Clock wipe",
  "group": "Wipes & reveals",
  "preview": "../docs/previews/t_radial.gif",
  "tags": [
   "demo"
  ],
  "desc": "Radial sweep around the frame centre.",
  "how": "Radial Wipe on A, start angle 0°, completion 0→100 over 12 f."
 },
 {
  "id": "t_cover",
  "kind": "transition",
  "name": "Cover up",
  "group": "Wipes & reveals",
  "preview": "../docs/previews/t_cover.gif",
  "tags": [
   "demo"
  ],
  "desc": "B slides over A from below, A stays put.",
  "how": "B position Y +1920→0, expo-out over 12 f, drop shadow 40 %."
 },
 {
  "id": "t_fade",
  "kind": "transition",
  "name": "Crossfade",
  "group": "Cuts & flashes",
  "preview": "../docs/previews/t_fade.gif",
  "tags": [
   "demo"
  ],
  "desc": "The plain one, for calm moments.",
  "how": "Opacity A 100→0 / B 0→100 over 12 f."
 },
 {
  "id": "t_diag",
  "kind": "transition",
  "name": "Diagonal wipe",
  "group": "Wipes & reveals",
  "preview": "../docs/previews/t_diag.gif",
  "tags": [
   "demo"
  ],
  "desc": "Hard-edged wipe from the top-left corner.",
  "how": "Linear Wipe 135°, feather 0, completion 0→100 over 10 f."
 },
 {
  "id": "t_dip",
  "kind": "transition",
  "name": "Dip to black",
  "group": "Cuts & flashes",
  "preview": "../docs/previews/t_dip.gif",
  "tags": [
   "demo"
  ],
  "desc": "Classic dip, short and eased.",
  "how": "Black solid opacity 0→100→0, 6 f / 9 f, ease 80 %."
 },
 {
  "id": "t_dissolve",
  "kind": "transition",
  "name": "Grain dissolve",
  "group": "Cuts & flashes",
  "preview": "../docs/previews/t_dissolve.gif",
  "tags": [
   "demo"
  ],
  "desc": "Noise-pattern dissolve instead of a flat crossfade.",
  "how": "Gradient Wipe on A with a Fractal Noise layer as the map, softness 0.1."
 },
 {
  "id": "t_circle",
  "kind": "transition",
  "name": "Iris open",
  "group": "Wipes & reveals",
  "preview": "../docs/previews/t_circle.gif",
  "tags": [
   "demo"
  ],
  "desc": "B opens from the centre in a growing circle.",
  "how": "Ellipse mask on B, expansion keyed with expo-out, feather 40."
 },
 {
  "id": "t_pixel",
  "kind": "transition",
  "name": "Pixel dissolve",
  "group": "Glitch & distortion",
  "preview": "../docs/previews/t_pixel.gif",
  "tags": [
   "demo"
  ],
  "desc": "A breaks into blocks that resolve into B.",
  "how": "Mosaic 1→60→1 blocks around the cut + hard cut on the coarsest frame."
 },
 {
  "id": "t_push",
  "kind": "transition",
  "name": "Push up",
  "group": "Motion through the cut",
  "preview": "../docs/previews/t_push.gif",
  "tags": [
   "demo"
  ],
  "desc": "A pushes out the top while B rides in from below, one continuous move.",
  "how": "Both clips in a precomp on one null: Y −1920 over 8 f out / 16 f in (1:2 rule), CC Force Motion Blur."
 },
 {
  "id": "t_reveal",
  "kind": "transition",
  "name": "Reveal down",
  "group": "Wipes & reveals",
  "preview": "../docs/previews/t_reveal.gif",
  "tags": [
   "demo"
  ],
  "desc": "A slides off the bottom and reveals B underneath.",
  "how": "A position Y 0→+1920, ease-in 6 f."
 },
 {
  "id": "t_smooth",
  "kind": "transition",
  "name": "Smooth slide",
  "group": "Motion through the cut",
  "preview": "../docs/previews/t_smooth.gif",
  "tags": [
   "demo"
  ],
  "desc": "Soft-edged slide with a long ease tail.",
  "how": "Linear Wipe 90°, feather 300, completion 0→100 with influence 85 %."
 },
 {
  "id": "t_squeeze",
  "kind": "transition",
  "name": "Squeeze",
  "group": "Motion through the cut",
  "preview": "../docs/previews/t_squeeze.gif",
  "tags": [
   "demo"
  ],
  "desc": "A squeezes horizontally, B unfolds.",
  "how": "Transform scale-X 100→0 / 0→100 % with anchor centre, 6 f out / 12 f in."
 },
 {
  "id": "t_whip",
  "kind": "transition",
  "name": "Whip blur",
  "group": "Motion through the cut",
  "preview": "../docs/previews/t_whip.gif",
  "tags": [
   "demo"
  ],
  "desc": "A smears sideways into B on a directional blur peak.",
  "how": "ADJ layer over the cut: Directional Blur 0→150→0 (6 f out / 12 f in), Transform position ±1300 px, Motion Tile mirror 300 %."
 },
 {
  "id": "t_flash",
  "kind": "transition",
  "name": "White flash",
  "group": "Cuts & flashes",
  "preview": "../docs/previews/t_flash.gif",
  "tags": [
   "demo"
  ],
  "desc": "Camera-flash style: instant on, eased decay into B.",
  "how": "White solid on the cut, opacity 100→0 over 7 f with an ease-out, Exposure +0.4 on B for 4 f."
 },
 {
  "id": "t_wind",
  "kind": "transition",
  "name": "Wind smear",
  "group": "Glitch & distortion",
  "preview": "../docs/previews/t_wind.gif",
  "tags": [
   "demo"
  ],
  "desc": "Horizontal streaks carry A away.",
  "how": "Turbulent Displace horizontal, size 17, amount 0→400→0 + Directional Blur 90°."
 },
 {
  "id": "t_zoom",
  "kind": "transition",
  "name": "Zoom through",
  "group": "Motion through the cut",
  "preview": "../docs/previews/t_zoom.gif",
  "tags": [
   "demo"
  ],
  "desc": "Punch into A and land on B, same direction.",
  "how": "ADJ Transform scale 100→160 % (A) / 60→100 % (B), shutter 300, cut on the fastest frame."
 }
];

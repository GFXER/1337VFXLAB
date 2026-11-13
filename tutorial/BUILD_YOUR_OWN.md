# Build your own VFX library

Most editors keep their best tricks in their head, in old project files, or in 400 saved Instagram reels. You can't search any of those and you can't hand them to anyone. A library fixes that: **one card per technique, each with a preview and an exact recipe.**

This walkthrough gets you from zero to a working library with the starter in this repo, then shows how to grow it into something like mine.

You need Python 3, ffmpeg and a browser. After Effects is optional (the starter doesn't care what you edit in).

---

## 1. Decide what a "card" is

Pick your **kinds**: the sidebar sections. Start small:

| kind | one card = |
|---|---|
| `transition` | one way to get from shot A to shot B |
| `effect` | one look or treatment on a single shot |
| `gradient` | one colour map (stops from dark to light) |
| `rule` | one house rule you keep repeating to yourself or to clients |

Add `lut`, `template`, `music`, `sfx` and so on later. The viewer shows whatever kinds it finds.

## 2. Write one Markdown file per technique

`starter/catalog/transitions/whip-blur.md`:

```markdown
---
id: t_whip
kind: transition
name: Whip blur
group: Motion through the cut
preview: ../docs/previews/t_whip.gif
tags: [fast, music-edit]
---
A smears sideways into B on a directional blur peak.

## How
ADJ layer over the cut: Directional Blur 0→150→0 (6 f out / 12 f in),
Transform position ±1300 px, Motion Tile mirror 300 %.
```

The rules that make a library actually useful:

- **The first line is what it looks like**, in plain words. "A smears sideways into B" beats "Directional whip v2".
- **`## How` has numbers.** Effect names, values, frame counts, eases. If you can't rebuild it from the card in two minutes, the card isn't done.
- **`group` is how you browse.** For transitions I use groups like *Cuts & flashes*, *Wipes & reveals*, *Motion through the cut* and *Glitch & distortion*. Keep it to 4–8 groups per kind.
- **Stable `id`s.** Number your transitions (`t_01`, `t_02`…) so you can say "use 12 and 31" in a brief.
- **Write the card the day you build the effect.** It takes 2 minutes then; later it takes 20, or never happens.

## 3. Make previews (this is what makes it worth opening)

A card without a preview is just a note. Rules I follow:

1. **Same plates for every transition.** Shoot two 3-second clips: A wide, B close-up, plain background, you or a product. Every transition demo runs A→B on those plates, so you compare the *move* and not the footage.
2. **Short and small.** 2–3 s, 180×320, 12 fps. A grid of 60 GIFs must still scroll smoothly.
3. **Use your own footage.** Never client footage or downloaded reels in a library you might show someone.

With the script in `starter/`:

```bash
# two 9:16 plates (2.2 s each) from any footage: clip, start second
./make_previews.sh plates my_wide.mov 3 my_close.mov 8          # -> plate_a.mp4, plate_b.mp4

# quick demo of an ffmpeg transition on those plates
./make_previews.sh demo plate_a.mp4 plate_b.mp4 hblur previews/t_whip.gif

# or cut the real thing out of a finished render (start 12.4 s, 2 s long)
./make_previews.sh clip final_render.mp4 12.4 2 previews/t_whip.gif
```

The `demo` mode uses ffmpeg's built-in `xfade` transitions (`fade`, `fadewhite`, `slideup`, `smoothleft`, `circleopen`, `radial`, `pixelize`, `hblur`, `zoomin`, `squeezeh`, `diagtl`, `dissolve`, `hlwind`, `fadeblack`, `coverup`, `revealdown`, and more). They're good placeholders. The best previews are cut from your real edits, because those show the version with your motion blur, grade and timing.

## 4. Build and open

```bash
python3 make_catalog.py      # reads catalog/**/*.md, writes catalog.js
open index.html              # Windows: start index.html · Linux: xdg-open index.html
```

`catalog.js` is a script (`window.CATALOG = [...]`) rather than JSON on purpose: browsers block `fetch()` from local files, but a `<script src>` works, so the viewer runs straight from disk with no server.

What you get:
- a sidebar of kinds with counts
- search across every field, including recipes
- a group filter
- preview cards (gif, mp4, png or jpg; gradients draw themselves from their stops)
- a detail sheet with *Copy recipe*
- a brief builder: tick ○ on cards, type the idea, *Copy brief*

## 5. Use the brief builder

This is where the library pays off. Instead of "make it look cool", a brief looks like this:

```
NEW VIDEO
Idea: 15 s product teaser, hook on the first word, hard cut to black at the end.

Whip blur (transition)
A smears sideways into B on a directional blur peak.
How: ADJ layer over the cut: Directional Blur 0→150→0 (6 f out / 12 f in) …

Film grain (effect)
How: Noise 22 %, colour off, clipping on …
```

Paste it to a teammate, a client ("these are the 4 moves I'll use"), or an AI assistant that writes the AE script. Everyone works from the same exact recipe.

## 6. Growing it: what the real one adds

The starter is about 250 lines. My private version grew the same idea in these directions, roughly in this order. Copy whichever you need:

1. **Mine your references.** Every tutorial or reel I study gets broken down into new cards: what the effect is, the recipe, and where I'd use it. That took the library from ~60 to 1,000+ entries. Mark untested ones with `status: recipe` and tested ones with `status: built`, so you know which you can trust.
2. **Dedupe.** After a few hundred cards you'll have "whip pan", "swish pan" and "whip transition" as three entries. Merge them: keep one, list the others as *also known as*.
3. **LUT sprite sheets.** For LUTs, render the same 3 frames (stage, face, product) through every LUT into one sprite image. The card then shows before/after without 150 separate files.
4. **Shared data.** Once more than one person (or an assistant) uses it, move the catalog from a file to a small database so picks, favourites and the brief queue are shared. Mine is a single-page app with a tiny document store behind it. Any JSON store works: Supabase, Firebase, or a JSON file in a repo.
5. **A queue instead of copy-paste.** *Send* writes the brief into a `requests` list. My assistant reads the newest one when I say "check the queue", builds it, and marks it done.
6. **An assistant that only knows your library.** Give the chat a tool that searches the catalog and tell it to recommend only existing cards. You get "use #12 + the Ember gradient" instead of generic advice.
7. **Docs from the same data.** A script turns the catalog into `CATALOG.md` (every entry, grouped), so the library also exists as a readable document.
8. **Two languages.** I keep a translation map per entry (EN/TR). Clients and collaborators read the brief in their language.

## 7. Habits that keep it alive

- **New technique → new card, same day.** Put it on your "done" checklist after a render.
- **Previews from finals.** After delivering a video, cut 2 s of each new move into its card.
- **QC with a contact sheet.** `./contact_sheet.sh final.mp4` tiles the whole render at 3 fps. One look tells you if a transition pops or a word shows up early.
- **Prune.** If you never pick a card in 6 months, it's either badly described (fix the first line) or not your style (delete it).

---

Questions or a library you built with this? Open an issue. I'd like to see it.

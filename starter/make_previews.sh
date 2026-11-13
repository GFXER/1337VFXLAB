#!/bin/bash
# Card previews with ffmpeg only.
#
#   ./make_previews.sh clip  <render.mp4> <start_s> <dur_s> <out.gif>   # cut a preview GIF out of a real render
#   ./make_previews.sh demo  <a.mp4> <b.mp4> <xfade_name> <out.gif>     # A->B demo of an ffmpeg xfade (fade, slideup, circleopen, hblur, pixelize, ...)
#   ./make_previews.sh plates <clipA> <tA> <clipB> <tB>                 # make 2.2 s 9:16 A/B plates (plate_a.mp4, plate_b.mp4) from any footage
#
# Previews are 180x320, 12 fps, 96-colour palette: ~0.4-0.8 MB per 2 s GIF. Use mp4 instead if you need more.
set -e
FF=${FFMPEG:-ffmpeg}
PAL="fps=12,scale=180:320:flags=lanczos:force_original_aspect_ratio=increase,crop=180:320,split[a][b];[a]palettegen=max_colors=96:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=5"
case "$1" in
  clip)   "$FF" -v error -y -ss "$3" -t "$4" -i "$2" -filter_complex "[0:v]$PAL" "$5" ;;
  demo)   "$FF" -v error -y -i "$2" -i "$3" -filter_complex "[0][1]xfade=transition=$4:duration=0.5:offset=0.9,trim=0:2.2,$PAL" "$5" ;;
  plates) mk(){ "$FF" -v error -y -ss "$3" -t 2.2 -i "$2" -vf "scale=360:640:force_original_aspect_ratio=increase,crop=360:640,fps=25,format=yuv420p" -an -c:v libx264 -crf 16 "$1.mp4"; }
          mk plate_a "$2" "$3"; mk plate_b "$4" "$5"; set -- x x x x "plate_a.mp4 plate_b.mp4" ;;
  *) sed -n 2,8p "$0"; exit 1 ;;
esac
echo "wrote $5"

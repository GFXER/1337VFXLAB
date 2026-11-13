#!/bin/bash
# QC a whole render in one image: 3 frames per second, timestamped, tiled.
#   ./contact_sheet.sh <render.mp4> [cols=10] [out.jpg]
FF=${FFMPEG:-ffmpeg}; IN="$1"; C=${2:-10}; OUT=${3:-${IN%.*}_sheet.jpg}
DUR=$("$FF" -i "$IN" 2>&1 | sed -n 's/.*Duration: \([0-9:.]*\).*/\1/p' | awk -F: '{print $1*3600+$2*60+$3}')
ROWS=$(awk -v d="$DUR" -v c="$C" 'BEGIN{n=int(d*3)+1; print int((n+c-1)/c)}')
LBL="drawtext=text='%{pts\:hms}':x=4:y=4:fontsize=14:fontcolor=white:box=1:boxcolor=black@0.6,"
# timestamps need an ffmpeg with fonts (drawtext); fall back to an unlabelled sheet if it has none
"$FF" -v error -y -i "$IN" -vf "fps=3,scale=192:-2,${LBL}tile=${C}x${ROWS}" -frames:v 1 -q:v 3 "$OUT" 2>/dev/null ||
  { echo "(no drawtext fonts: sheet without timestamps; read time as row*${C}/3 + col/3 s)"; "$FF" -v error -y -i "$IN" -vf "fps=3,scale=192:-2,tile=${C}x${ROWS}" -frames:v 1 -q:v 3 "$OUT"; } && echo "wrote $OUT"

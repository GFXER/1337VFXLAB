#!/usr/bin/env python3
"""txengine: render A->B transition demos with real motion blur, mirror edges and the 1:2 timing rule.

This is the renderer behind the transition previews in docs/previews/ (14 moves: whip, zoom, spin, glitch,
burn, grid, flip, blob, jaws, halftone, ripple, card, stretch, leak). It is not After Effects; it fakes the
same moves in numpy/OpenCV so you can make matching previews for your own library on your own plates.

    pip install numpy opencv-python          # plus ffmpeg on your PATH (or set FFMPEG=/path/to/ffmpeg)
    python3 txengine.py plate_a.mp4 plate_b.mp4 out/               # all 14 -> out/<name>.mp4
    python3 txengine.py plate_a.mp4 plate_b.mp4 out/ whip glitch   # just some
    FACE_A=115,435 FACE_B=240,320 python3 txengine.py ...          # face centre (px) in each plate,
                                                                   # used by zoom / halftone / ripple

Plates: 9:16, about 2.4 s, any size (resized to 540x960, 25 fps). Make them with ./make_previews.sh plates.
Then turn each mp4 into a card GIF:  ./make_previews.sh clip out/whip.mp4 0 2.2 previews/t_whip.gif

Timing: the cut sits at T0 = 0.92 s; moves accelerate out for N = 0.2 s (5 f) and settle in over 2N (10 f).
Motion blur = each frame is the average of 10-18 sub-frame renders across a 0.5-0.9 frame shutter.
"""
import sys, os, math, subprocess
import numpy as np, cv2

FPS = 25
DUR = 2.2
T0 = 0.92            # the cut
N = 0.2              # out time; in time = 2N (1:2 rule)
H, W = 960, 540


def load(p):
    cap = cv2.VideoCapture(p); fr = []
    while True:
        ok, f = cap.read()
        if not ok: break
        fr.append(cv2.resize(f, (W, H)).astype(np.float32) / 255)
    return fr


def at(frames, t):
    return frames[min(len(frames) - 1, max(0, int(round(t * FPS))))]


def ein(p, k=3.0): p = min(1, max(0, p)); return p ** k                 # accelerate out
def eout(p, k=4.0): p = min(1, max(0, p)); return 1 - (1 - p) ** k      # long settle in
def pout(t): return (t - (T0 - N)) / N
def pin(t): return (t - T0) / (2 * N)


def affine(img, scale=1.0, rot=0.0, dx=0.0, dy=0.0, cx=W / 2, cy=H / 2, sx=None, sy=None):
    sx = scale if sx is None else sx; sy = scale if sy is None else sy
    a = math.radians(rot); c, s = math.cos(a), math.sin(a)
    M = np.array([[sx * c, -sy * s, 0], [sx * s, sy * c, 0]], np.float32)
    M[:, 2] = [cx + dx - (M[0, 0] * cx + M[0, 1] * cy), cy + dy - (M[1, 0] * cx + M[1, 1] * cy)]
    return cv2.warpAffine(img, M, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)


def mblur(fn, t, samples=10, shutter=0.5):
    """average fn over the shutter interval -> real motion blur for any move"""
    acc = None
    for i in range(samples):
        x = fn(t + (i + 0.5) / samples * shutter / FPS - shutter / FPS / 2)
        acc = x if acc is None else acc + x
    return acc / samples


FACE_A = (W * 0.21, H * 0.45)   # face in plate A (override: FACE_A=x,y env, in px)
FACE_B = (W * 0.44, H * 0.33)   # face in plate B
for _k in ('FACE_A', 'FACE_B'):
    if os.environ.get(_k): globals()[_k] = tuple(float(v) for v in os.environ[_k].split(','))

# ---------------------------------------------------------------- transitions
def whip(A, B, t):
    def f(u):
        if u < T0: return affine(at(A, u), dx=-W * 1.1 * ein(pout(u)))
        return affine(at(B, u), dx=W * 1.1 * (1 - eout(pin(u))))
    return mblur(f, t, 16, 0.9)


def zoom(A, B, t):
    def f(u):
        if u < T0: return affine(at(A, u), scale=1 + 2.2 * ein(pout(u)), cx=FACE_A[0], cy=FACE_A[1])
        return affine(at(B, u), scale=0.35 + 0.65 * eout(pin(u)), cx=FACE_B[0], cy=FACE_B[1])
    img = mblur(f, t, 16, 0.9)
    k = max(0, 1 - abs(t - T0) * FPS / 2.5)               # 2-3 f white kiss on the cut
    return img + (1 - img) * 0.55 * k


def spin(A, B, t):
    def f(u):
        if u < T0: return affine(at(A, u), rot=180 * ein(pout(u)), scale=1 + 0.25 * ein(pout(u)))
        return affine(at(B, u), rot=180 + 180 * eout(pin(u)), scale=1.25 - 0.25 * eout(pin(u)))
    return mblur(f, t, 18, 0.9)


def glitch(A, B, t):
    rng = np.random.default_rng(int(t * FPS) * 7 + 3)
    base = at(A, t) if t < T0 else at(B, t)
    d = abs(t - T0) * FPS
    if d > 5: return base
    amt = 1 - d / 6
    out = base.copy(); other = at(B, t) if t < T0 else at(A, t)
    y = 0
    while y < H:
        h = int(rng.integers(8, 70)); src = other if rng.random() < 0.35 * amt else base
        sh = int(rng.normal(0, 70 * amt))
        out[y:y + h] = np.roll(src[y:y + h], sh, axis=1); y += h
    o = int(14 * amt)                                                   # RGB split
    out[..., 2] = np.roll(out[..., 2], o, axis=1); out[..., 0] = np.roll(out[..., 0], -o, axis=1)
    if rng.random() < 0.3 * amt: out = 1 - out                          # 1-frame invert hit
    return out


def burn(A, B, t):
    if t < T0: img, g = at(A, t), ein(pout(t), 2.2)
    else: img, g = at(B, t), 1 - eout(pin(t), 3)
    gain = 1 + 4.5 * g
    glow = cv2.GaussianBlur(img, (0, 0), 25) * g * 1.6
    warm = np.array([0.75, 0.92, 1.12], np.float32)                     # BGR warm tint
    out = img * gain + glow
    out = out * (1 + (warm - 1) * g)
    return np.clip(out, 0, 1)


def grid(A, B, t):
    bg = at(A, t)
    p = (t - (T0 - 0.08)) * FPS
    if p < 0: return bg
    dim = cv2.GaussianBlur(bg, (0, 0), 6) * 0.45
    out = dim.copy(); b = at(B, t)
    order = [4, 1, 3, 5, 7, 0, 2, 6, 8]                                 # centre first, then cross, then corners
    th, tw = H // 3, W // 3
    for k, idx in enumerate(order):
        q = (p - k * 1.6) / 9
        if q <= 0: continue
        e = eout(q, 5); r, c = divmod(idx, 3)
        tile = b[r * th:(r + 1) * th, c * tw:(c + 1) * tw]
        cell = out[r * th:(r + 1) * th, c * tw:(c + 1) * tw]            # the slot behind fades to B, so no dark gaps
        out[r * th:(r + 1) * th, c * tw:(c + 1) * tw] = cell * (1 - e) + tile * e
        s = 1.0 if e > 0.97 else 0.55 + 0.45 * e                       # snap: no seams once landed
        tl = cv2.resize(tile, (max(1, int(tw * s)), max(1, int(th * s))))
        flash = max(0, 1 - q * 4)
        tl = tl + (1 - tl) * flash * 0.8
        y0 = r * th + (th - tl.shape[0]) // 2; x0 = c * tw + (tw - tl.shape[1]) // 2
        a = min(1, q * 3)
        out[y0:y0 + tl.shape[0], x0:x0 + tl.shape[1]] = out[y0:y0 + tl.shape[0], x0:x0 + tl.shape[1]] * (1 - a) + tl * a
    return out


def flip(A, B, t):
    def card(img, ang):
        a = math.radians(ang); f = 1100
        pts = []
        for x, y in [(-W / 2, -H / 2), (W / 2, -H / 2), (W / 2, H / 2), (-W / 2, H / 2)]:
            X, Z = x * math.cos(a), x * math.sin(a) + 0; sc = f / (f + Z + 300)
            pts.append([W / 2 + X * sc * 0.86, H / 2 + y * sc * 0.86])
        M = cv2.getPerspectiveTransform(np.float32([[0, 0], [W, 0], [W, H], [0, H]]), np.float32(pts))
        bg = np.full((H, W, 3), 0.08, np.float32)
        warped = cv2.warpPerspective(img * (1 - 0.6 * abs(math.sin(a))), M, (W, H), borderValue=(0, 0, 0))
        mask = cv2.warpPerspective(np.ones((H, W), np.float32), M, (W, H))[..., None]
        return bg * (1 - mask) + warped * mask
    def f(u):
        if u < T0: return card(at(A, u), -90 * ein(pout(u), 2))
        return card(at(B, u), 90 * (1 - eout(pin(u), 3)))
    return mblur(f, t, 10, 0.7)


_NOISE = {}
def noise(seed, scale):
    if (seed, scale) not in _NOISE:
        r = np.random.default_rng(seed).random((H // scale + 2, W // scale + 2)).astype(np.float32)
        _NOISE[(seed, scale)] = cv2.GaussianBlur(cv2.resize(r, (W, H), interpolation=cv2.INTER_CUBIC), (0, 0), scale / 2)
    return _NOISE[(seed, scale)]


def blob(A, B, t):
    n = noise(5, 120) * 0.8 + noise(9, 60) * 0.2
    n = cv2.GaussianBlur(n, (0, 0), 6)
    n = (n - n.min()) / (n.max() - n.min())
    p = eout(min(1, max(0, (t - (T0 - N)) / (3 * N))), 3)
    edge = p * 1.15 - 0.075
    m = np.clip((edge - n) / 0.035 + 0.5, 0, 1)
    m = m * m * (3 - 2 * m)
    band = np.exp(-((n - edge) / 0.07) ** 2)                             # liquid edge: displace + highlight
    gx = cv2.Sobel(n, cv2.CV_32F, 1, 0, ksize=5); gy = cv2.Sobel(n, cv2.CV_32F, 0, 1, ksize=5)
    xs, ys = np.meshgrid(np.arange(W, dtype=np.float32), np.arange(H, dtype=np.float32))
    k = 110 * band
    a = cv2.remap(at(A, t), xs + gx * k, ys + gy * k, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
    b = cv2.remap(at(B, t), xs - gx * k, ys - gy * k, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
    out = a * (1 - m[..., None]) + b * m[..., None]
    return np.clip(out, 0, 1)


def jaws(A, B, t):
    p = eout(min(1, max(0, (t - (T0 - N)) / (5 * N))), 3)
    if p <= 0: return at(A, t)
    a, b = at(A, t), at(B, t)
    xs = np.arange(W, dtype=np.float32)
    tooth = 60; zig = np.abs(((xs / tooth) % 1) - 0.5) * 2 * 50 - 25   # zig-zag edge
    open_ = p * (H * 0.62)
    ys = np.arange(H, dtype=np.float32)[:, None]
    mid = H * 0.48 + zig[None, :]
    top = ys < mid - open_; bot = ys > mid + open_
    topA = affine(a, dy=-open_); botA = affine(a, dy=open_)
    out = b.copy()
    out = np.where(top[..., None], topA, out); out = np.where(bot[..., None], botA, out)
    edge = (np.abs(ys - (mid - open_)) < 3) | (np.abs(ys - (mid + open_)) < 3)
    return np.where(edge[..., None], 0.02, out)


def halftone(A, B, t):
    p = eout(min(1, max(0, (t - (T0 - N)) / (3 * N))), 2.5)
    a, b = at(A, t), at(B, t)
    if p <= 0: return a
    cell = 22
    ys, xs = np.mgrid[0:H, 0:W].astype(np.float32)
    cx = (xs // cell + 0.5) * cell; cy = (ys // cell + 0.5) * cell
    dist = np.hypot(cx - FACE_A[0], cy - FACE_A[1]) / math.hypot(W, H)     # opens from the face outward
    local = np.clip(p * 1.8 - dist * 1.2, 0, 1)
    lum = cv2.cvtColor(a, cv2.COLOR_BGR2GRAY)
    r = cell * 0.72 * (1 - local) * (0.55 + 0.45 * lum)
    inside = np.hypot(xs - cx, ys - cy) < r
    dots = np.where(inside[..., None], a, b)
    return np.where((local >= 1)[..., None], b, np.where((local <= 0)[..., None] & (p < 0.02), a, dots))


def ripple(A, B, t):
    k = math.exp(-((t - T0) / 0.18) ** 2)
    xs, ys = np.meshgrid(np.arange(W, dtype=np.float32), np.arange(H, dtype=np.float32))
    def warp(img, c):
        dx, dy = xs - c[0], ys - c[1]; r = np.hypot(dx, dy) + 1e-3
        w = np.sin(r / 26 - t * 40) * 28 * k * np.exp(-r / 700)
        return cv2.remap(img, xs + dx / r * w, ys + dy / r * w, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
    mix = min(1, max(0, (t - (T0 - 0.06)) / 0.12))
    a = warp(at(A, t), FACE_A); b = warp(at(B, t), FACE_B)
    out = a * (1 - mix) + b * mix
    return cv2.GaussianBlur(out, (0, 0), 0.1 + 3 * k)


def card(A, B, t):
    """A shrinks into a rounded card with a shadow, then whips out the top; B is already underneath"""
    def f(u):
        b = affine(at(B, u), scale=1.08 - 0.08 * eout((u - (T0 - 0.3)) / 0.9))
        q1 = eout(min(1, max(0, (u - (T0 - 0.45)) / 0.3)), 4)           # shrink
        q2 = ein(min(1, max(0, (u - (T0 - 0.12)) / 0.2)), 3)            # whip out
        if q2 >= 1: return b
        s = 1 - 0.38 * q1; dy = -H * 1.05 * q2; rot = -6 * q1 - 10 * q2
        a = at(A, u)
        rr = np.zeros((H, W), np.float32); cv2.rectangle(rr, (30, 30), (W - 30, H - 30), 1, -1)
        rr = cv2.GaussianBlur(rr, (0, 0), 1.2) if q1 > 0 else np.ones((H, W), np.float32)
        mask = np.ones((H, W), np.float32)
        if q1 > 0:
            mask = np.zeros((H, W), np.float32); rad = int(70 * q1) + 1
            cv2.rectangle(mask, (rad, 0), (W - rad, H), 1, -1); cv2.rectangle(mask, (0, rad), (W, H - rad), 1, -1)
            for x, y in [(rad, rad), (W - rad, rad), (rad, H - rad), (W - rad, H - rad)]: cv2.circle(mask, (x, y), rad, 1, -1)
        M = cv2.getRotationMatrix2D((W / 2, H / 2), -rot, s); M[1, 2] += dy
        aw = cv2.warpAffine(a, M, (W, H)); mw = cv2.warpAffine(mask, M, (W, H))[..., None]
        sh = cv2.GaussianBlur(cv2.warpAffine(mask, M, (W, H)), (0, 0), 30)[..., None] * 0.55 * q1
        under = b * (1 - sh)
        return under * (1 - mw) + aw * mw
    return mblur(f, t, 12, 0.8)


def stretch(A, B, t):
    """CC Scale Wipe style: B's edge row smears down over A, then the line releases"""
    p = eout(min(1, max(0, (t - (T0 - N)) / (3 * N))), 3)
    a, b = at(A, t), at(B, t)
    if p <= 0: return a
    line = int(p * (H + 40)) - 20
    out = a.copy()
    if line > 0: out[:min(line, H)] = b[:min(line, H)]
    smear_len = int(260 * (1 - p) + 20)
    if 0 <= line < H:
        row = b[line:line + 1]
        hi = min(H, line + smear_len)
        fade = np.linspace(1, 0, hi - line, dtype=np.float32)[:, None, None]
        out[line:hi] = row * fade + out[line:hi] * (1 - fade)
    return out


def leak(A, B, t):
    """warm light leak sweeps across; the cut hides under its brightest frame"""
    base = at(A, t) if t < T0 else at(B, t)
    p = (t - (T0 - 0.35)) / 0.7
    if not 0 <= p <= 1: return base
    xs, ys = np.meshgrid(np.linspace(-1, 1, W, dtype=np.float32), np.linspace(-1, 1, H, dtype=np.float32))
    cx = -1.6 + 3.2 * p
    g = np.exp(-(((xs - cx) * 1.3 + ys * 0.5) ** 2) / 0.18) * math.sin(math.pi * p) ** 0.7
    col = np.array([0.25, 0.55, 1.0], np.float32)                       # BGR orange
    lit = 1 - (1 - base) * (1 - g[..., None] * col * 1.4)              # screen
    return np.clip(lit + g[..., None] * 0.25 * math.sin(math.pi * p), 0, 1)


ALL = dict(whip=whip, zoom=zoom, spin=spin, glitch=glitch, burn=burn, grid=grid, flip=flip, blob=blob,
           jaws=jaws, halftone=halftone, ripple=ripple, card=card, stretch=stretch, leak=leak)

if __name__ == '__main__':
    A, B, out = load(sys.argv[1]), load(sys.argv[2]), sys.argv[3]
    names = sys.argv[4:] or list(ALL)
    os.makedirs(out, exist_ok=True)
    ff = os.environ.get('FFMPEG', 'ffmpeg')
    for nm in names:
        fn = ALL[nm]; nfr = int(DUR * FPS)
        p = subprocess.Popen([ff, '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                              '-c:v', 'libx264', '-crf', '14', '-pix_fmt', 'yuv420p', os.path.join(out, nm + '.mp4')], stdin=subprocess.PIPE)
        for i in range(nfr):
            img = fn(A, B, i / FPS)
            p.stdin.write((np.clip(img, 0, 1) * 255 + 0.5).astype(np.uint8).tobytes())
        p.stdin.close(); p.wait(); print(nm, 'ok')

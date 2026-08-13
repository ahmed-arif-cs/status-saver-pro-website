#!/usr/bin/env python3
"""
Generate favicon + apple-touch-icon + OG image for Status Saver Pro.

Outputs (all under /home/z/my-project/public/):
  - apple-touch-icon.png  (180x180, for iOS home screen)
  - icon-192.png          (192x192, for PWA manifest)
  - icon-512.png          (512x512, for PWA manifest)
  - opengraph-image.png   (1200x630, social share preview)

Uses the master SVG at /home/z/my-project/public/app-icon.svg
as the source for the launcher mark.

Run: python3 scripts/generate-icons.py
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path
import subprocess
import sys

PUBLIC = Path("/home/z/my-project/public")
PUBLIC.mkdir(parents=True, exist_ok=True)
SVG = PUBLIC / "app-icon.svg"

# ============================================================
#  1. Render the master SVG at various sizes
# ============================================================
def render_svg(size: int, out_path: Path) -> None:
    """Use rsvg-convert if available, otherwise Pillow SVG fallback."""
    try:
        subprocess.run(
            ["rsvg-convert", "-w", str(size), "-h", str(size),
             "-o", str(out_path), str(SVG)],
            check=True, capture_output=True,
        )
        return
    except (FileNotFoundError, subprocess.CalledProcessError):
        pass

    # Fallback: use cairosvg if installed
    try:
        import cairosvg
        cairosvg.svg2png(url=str(SVG), write_to=str(out_path),
                          output_width=size, output_height=size)
        return
    except ImportError:
        pass

    # Last resort: draw a simplified PNG icon by hand
    draw_icon_png(out_path, size)

def draw_icon_png(out_path: Path, size: int) -> None:
    """Fallback: draw a simplified indigo/coral save icon as a PNG."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # Background gradient (indigo -> coral)
    for y in range(size):
        t = y / size
        # Diagonal: blend based on (x+y)/max
        for x in [0]:  # we'll do a vertical gradient for simplicity
            r = int(99 + (244 - 99) * t)    # 99 -> 244
            g = int(102 + (63 - 102) * t)   # 102 -> 63
            b = int(241 + (94 - 241) * t)   # 241 -> 94
        d.line([(0, y), (size, y)], fill=(r, g, b, 255))

    # Mask to rounded rect
    mask = Image.new("L", (size, size), 0)
    md = ImageDraw.Draw(mask)
    radius = int(size * 0.22)
    md.rounded_rectangle([0, 0, size, size], radius=radius, fill=255)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(img, (0, 0), mask)
    out.save(out_path, "PNG", optimize=True)

# Render the launcher icon at multiple sizes
sizes = {
    "apple-touch-icon.png": 180,
    "icon-192.png": 192,
    "icon-512.png": 512,
}
for name, size in sizes.items():
    out = PUBLIC / name
    render_svg(size, out)
    print(f"Wrote {out} ({out.stat().st_size // 1024} KB)")

# ============================================================
#  2. OG image (1200x630) — rebranded
# ============================================================
def make_font(size: int, bold: bool = True) -> ImageFont.FreeTypeFont:
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            continue
    return ImageFont.load_default()

W, H = 1200, 630

# Background — deep indigo with a hint of coral
BG_TOP = (15, 14, 30)
BG_MID = (32, 18, 56)
BG_BOTTOM = (45, 14, 38)
INDIGO = (99, 102, 241)
VIOLET = (139, 92, 246)
CORAL = (244, 63, 94)
WHITE = (255, 255, 255)
MUTED = (190, 185, 210)

img = Image.new("RGB", (W, H), BG_TOP)
draw = ImageDraw.Draw(img, "RGBA")

# Vertical gradient
for y in range(H):
    if y < H // 2:
        t = y / max(H // 2, 1)
        r = int(BG_TOP[0] + (BG_MID[0] - BG_TOP[0]) * t)
        g = int(BG_TOP[1] + (BG_MID[1] - BG_TOP[1]) * t)
        b = int(BG_TOP[2] + (BG_MID[2] - BG_TOP[2]) * t)
    else:
        t = (y - H // 2) / max(H // 2, 1)
        r = int(BG_MID[0] + (BG_BOTTOM[0] - BG_MID[0]) * t)
        g = int(BG_MID[1] + (BG_BOTTOM[1] - BG_MID[1]) * t)
        b = int(BG_MID[2] + (BG_BOTTOM[2] - BG_MID[2]) * t)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Soft glow blobs (indigo top-left, coral bottom-right)
glow1 = Image.new("RGB", (W, H), BG_TOP)
gd = ImageDraw.Draw(glow1)
gd.ellipse([-200, -200, 700, 700], fill=INDIGO + (40,))
glow1 = glow1.filter(ImageFilter.GaussianBlur(180))
img = Image.blend(img, glow1, 0.35)

glow2 = Image.new("RGB", (W, H), BG_BOTTOM)
gd2 = ImageDraw.Draw(glow2)
gd2.ellipse([500, 250, 1400, 1100], fill=CORAL + (40,))
glow2 = glow2.filter(ImageFilter.GaussianBlur(200))
img = Image.blend(img, glow2, 0.35)
draw = ImageDraw.Draw(img, "RGBA")

# Subtle grid overlay (only top-right)
overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
od = ImageDraw.Draw(overlay)
grid_color = (255, 255, 255, 14)
step = 48
for x in range(0, W, step):
    od.line([(x, 0), (x, H)], fill=grid_color, width=1)
for y in range(0, H, step):
    od.line([(0, y), (W, y)], fill=grid_color, width=1)
mask = Image.new("L", img.size, 0)
md = ImageDraw.Draw(mask)
md.ellipse([-400, -400, W + 200, H + 200], fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(120))
img.paste(overlay, (0, 0), mask)
draw = ImageDraw.Draw(img, "RGBA")

# App icon badge (top-left)
badge_size = 96
bx, by = 80, 80
# Background rounded rect with gradient (we approximate gradient with two layers)
draw.rounded_rectangle([bx, by, bx + badge_size, by + badge_size],
                       radius=22, fill=INDIGO)
draw.rounded_rectangle([bx, by, bx + badge_size, by + badge_size],
                       radius=22, outline=None, fill=None)
# Overlay a coral tint (diagonal via paste)
overlay2 = Image.new("RGBA", (badge_size, badge_size), (0, 0, 0, 0))
od2 = ImageDraw.Draw(overlay2)
for y in range(badge_size):
    t = y / badge_size
    r = int(INDIGO[0] + (CORAL[0] - INDIGO[0]) * t)
    g = int(INDIGO[1] + (CORAL[1] - INDIGO[1]) * t)
    b = int(INDIGO[2] + (CORAL[2] - INDIGO[2]) * t)
    od2.line([(0, y), (badge_size, y)], fill=(r, g, b, 255))
mask2 = Image.new("L", (badge_size, badge_size), 0)
md2 = ImageDraw.Draw(mask2)
md2.rounded_rectangle([0, 0, badge_size, badge_size], radius=22, fill=255)
img.paste(overlay2, (bx, by), mask2)
draw = ImageDraw.Draw(img, "RGBA")

# Download tray + arrow inside the badge
tray_pts = [
    (bx + 24, by + 56),
    (bx + 24, by + 66),
    (bx + 30, by + 76),
    (bx + 66, by + 76),
    (bx + 72, by + 66),
    (bx + 72, by + 56),
]
draw.line(tray_pts, fill=WHITE, width=6, joint="curve")
arrow_pts = [
    (bx + 48, by + 22),
    (bx + 48, by + 50),
    (bx + 38, by + 40),
    (bx + 48, by + 50),
    (bx + 58, by + 40),
]
draw.line(arrow_pts[:3], fill=WHITE, width=7, joint="curve")
draw.line(arrow_pts[2:], fill=WHITE, width=7, joint="curve")

# Brand wordmark
brand_font = make_font(30, bold=True)
draw.text((bx + badge_size + 20, by + 30), "Status Saver Pro",
          font=brand_font, fill=WHITE)

# Headline
h1_font = make_font(80, bold=True)
draw.text((80, 260), "Save WhatsApp statuses.", font=h1_font, fill=WHITE)
draw.text((80, 350), "Keep what you love.", font=h1_font, fill=CORAL)

# Subhead
sub_font = make_font(30, bold=False)
draw.text((80, 460),
          "Photos, videos, and text — saved directly to your phone.",
          font=sub_font, fill=MUTED)
draw.text((80, 500),
          "Independent. Local-only. By AGC.",
          font=sub_font, fill=MUTED)

# Footer row
foot_font = make_font(22, bold=False)
draw.text((80, H - 60), "Available on Android", font=foot_font, fill=(160, 155, 180))
url_text = "statussaverpro.app"
url_bbox = draw.textbbox((0, 0), url_text, font=foot_font)
url_w = url_bbox[2] - url_bbox[0]
draw.text((W - 80 - url_w, H - 60), url_text, font=foot_font, fill=(160, 155, 180))

# Save OG image
og_path = PUBLIC / "opengraph-image.png"
img.save(og_path, "PNG", optimize=True)
print(f"Wrote {og_path} ({og_path.stat().st_size // 1024} KB)")

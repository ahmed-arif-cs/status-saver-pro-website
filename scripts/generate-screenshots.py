#!/usr/bin/env python3
"""
Generate clearly-marked placeholder screenshots for the Status Saver Pro
home page carousel. These are STAND-INS — replace with real device captures
before going live.

Output: /home/z/my-project/public/screenshots/0{1-5}-*.png  (1080x2340)
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import sys

OUT_DIR = Path("/home/z/my-project/public/screenshots")
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Phone screenshot size — 9:19.5 aspect (1080x2340)
W, H = 1080, 2340

# Brand colors
INDIGO = (99, 102, 241)
VIOLET = (139, 92, 246)
CORAL = (244, 63, 94)
BG_DARK = (15, 14, 30)
BG_LIGHT = (250, 250, 252)
TEXT_DARK = (20, 20, 30)
TEXT_MUTED = (110, 110, 130)
WHITE = (255, 255, 255)

SHOTS = [
    ("01-home.png", "Home", "Status tabs and recent activity", False),
    ("02-statuses.png", "Statuses", "Photo & video grid of recent statuses", True),
    ("03-trim.png", "Trim", "In-app video trimmer with no watermark", False),
    ("04-saved.png", "Saved", "Files you've kept, organized by date", True),
    ("05-settings.png", "Settings", "Theme, language, auto-save toggle", False),
]

def font(size: int, bold: bool = True) -> ImageFont.FreeTypeFont:
    paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for p in paths:
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            pass
    return ImageFont.load_default()

for filename, screen_name, subtitle, use_grid in SHOTS:
    img = Image.new("RGB", (W, H), BG_LIGHT if use_grid else BG_DARK)
    d = ImageDraw.Draw(img, "RGBA")

    # Top accent bar
    bar_color = INDIGO if use_grid else VIOLET
    d.rectangle([0, 0, W, 8], fill=bar_color)

    # Status bar (fake)
    bar_font = font(36, bold=True)
    d.text((60, 50), "9:41", font=bar_font, fill=WHITE if not use_grid else TEXT_DARK)
    # Battery / wifi glyphs (just rectangles)
    for i, (w, h) in enumerate([(28, 36), (44, 36), (60, 36)]):
        d.rectangle([W - 200 + i * 60, 60, W - 200 + i * 60 + w - 6, 60 + h],
                    fill=WHITE if not use_grid else TEXT_DARK)

    # App header
    h_font = font(72, bold=True)
    d.text((60, 180), "Status Saver Pro", font=h_font,
           fill=WHITE if not use_grid else TEXT_DARK)
    s_font = font(34, bold=False)
    d.text((60, 270), subtitle, font=s_font,
           fill=(160, 160, 180) if not use_grid else TEXT_MUTED)

    # Mini brand chip top-right (indigo/coral badge)
    bx, by = W - 200, 180
    d.rounded_rectangle([bx, by, bx + 140, by + 140], radius=32, fill=INDIGO)
    overlay = Image.new("RGBA", (140, 140), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for y in range(140):
        t = y / 140
        r = int(INDIGO[0] + (CORAL[0] - INDIGO[0]) * t)
        g = int(INDIGO[1] + (CORAL[1] - INDIGO[1]) * t)
        b = int(INDIGO[2] + (CORAL[2] - INDIGO[2]) * t)
        od.line([(0, y), (140, y)], fill=(r, g, b, 255))
    mask = Image.new("L", (140, 140), 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle([0, 0, 140, 140], radius=32, fill=255)
    img.paste(overlay, (bx, by), mask)
    d = ImageDraw.Draw(img, "RGBA")
    # Download glyph
    arrow_y = by + 30
    d.line([(bx + 70, arrow_y), (bx + 70, arrow_y + 50)], fill=WHITE, width=12)
    d.line([(bx + 50, arrow_y + 35), (bx + 70, arrow_y + 55), (bx + 90, arrow_y + 35)],
           fill=WHITE, width=12, joint="curve")
    d.line([(bx + 35, by + 95), (bx + 35, by + 110), (bx + 105, by + 110), (bx + 105, by + 95)],
           fill=WHITE, width=10, joint="curve")

    # Content area
    if use_grid:
        # 2x3 grid of placeholder thumbnails
        gx, gy, gw, gh = 60, 450, 470, 470
        gap = 30
        for i in range(6):
            row, col = divmod(i, 2)
            x = gx + col * (gw + gap)
            y = gy + row * (gh + gap)
            color = INDIGO if i % 3 == 0 else VIOLET if i % 3 == 1 else CORAL
            d.rounded_rectangle([x, y, x + gw, y + gh], radius=24, fill=color)
            # Small label inside
            label_font = font(28, bold=True)
            d.text((x + 20, y + 20), f"Status {i+1}", font=label_font, fill=WHITE)
    else:
        # Single big content card
        cx, cy, cw, ch = 60, 450, W - 120, 700
        d.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=36,
                            fill=(30, 28, 60) if not use_grid else BG_LIGHT,
                            outline=VIOLET if not use_grid else INDIGO, width=4)
        # "Mock screenshot" label centered
        mock_font = font(48, bold=True)
        text = screen_name
        bbox = d.textbbox((0, 0), text, font=mock_font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        d.text((cx + (cw - tw) // 2, cy + (ch - th) // 2 - 30), text,
               font=mock_font, fill=WHITE if not use_grid else TEXT_DARK)
        sub_font = font(32, bold=False)
        sub = "Placeholder — replace with real screenshot"
        bbox2 = d.textbbox((0, 0), sub, font=sub_font)
        sw = bbox2[2] - bbox2[0]
        d.text((cx + (cw - sw) // 2, cy + (ch - th) // 2 + 30), sub,
               font=sub_font, fill=TEXT_MUTED)

    # Bottom nav bar (mock)
    ny = H - 200
    d.rectangle([0, ny, W, H], fill=(30, 28, 60) if not use_grid else (240, 240, 250))
    nav_font = font(28, bold=True)
    for i, label in enumerate(["Photos", "Videos", "Saved", "Settings"]):
        x = 60 + i * 250
        color = VIOLET if i == 0 else (130, 130, 160) if not use_grid else TEXT_MUTED
        if i == 0:
            color = INDIGO if use_grid else VIOLET
        d.text((x, ny + 70), label, font=nav_font, fill=color)

    # Watermark — "PLACEHOLDER"
    wm_font = font(28, bold=True)
    wm_text = "PLACEHOLDER — replace before launch"
    bbox = d.textbbox((0, 0), wm_text, font=wm_font)
    wmw = bbox[2] - bbox[0]
    d.text(((W - wmw) // 2, H - 50), wm_text, font=wm_font, fill=CORAL)

    out_path = OUT_DIR / filename
    img.save(out_path, "PNG", optimize=True)
    print(f"Wrote {out_path} ({out_path.stat().st_size // 1024} KB)")

return_code = 0
sys.exit(return_code)

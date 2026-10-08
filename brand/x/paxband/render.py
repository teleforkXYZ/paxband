"""Paxband X kit. Yellow field, three rings. Not the Paxos mark."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent
YELLOW = (255, 208, 0, 255)
INK = (17, 17, 17, 255)
SERIF = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
SANS = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def field(w: int, h: int, cx: int, cy: int) -> Image.Image:
    im = Image.new("RGBA", (w, h), YELLOW)
    grid = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(grid)
    step = max(w, h) // 18
    for i in range(1, 28):
        r = i * step
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline=(255, 255, 255, 70), width=2)
    return Image.alpha_composite(im, grid)


def rings(size: int) -> Image.Image:
    layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    specs = (
        (0, (17, 17, 17, 230), 0.78),
        (32, (55, 55, 55, 150), 0.74),
        (-28, (17, 17, 17, 110), 0.70),
    )
    for angle, color, scale in specs:
        plate = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(plate)
        pad = int(size * (1 - scale) / 2)
        box = (pad + size * 0.08, pad + size * 0.02, size - pad - size * 0.06, size - pad - size * 0.04)
        draw.ellipse(box, outline=color, width=max(8, size // 14))
        plate = plate.rotate(angle, resample=Image.Resampling.BICUBIC, center=(size / 2, size / 2))
        layer = Image.alpha_composite(layer, plate)
    return layer


def paste_rings(base: Image.Image, cx: int, cy: int, size: int) -> None:
    mark = rings(size)
    base.alpha_composite(mark, (cx - size // 2, cy - size // 2))


def text(draw: ImageDraw.ImageDraw, xy: tuple[int, int], s: str, fnt, fill=INK) -> None:
    draw.text(xy, s, font=fnt, fill=fill)


def avatar() -> None:
    im = field(800, 800, 400, 400)
    paste_rings(im, 400, 400, 560)
    im.convert("RGB").save(OUT / "avatar.png", quality=95)


def banner() -> None:
    im = field(1500, 500, 1080, 230)
    paste_rings(im, 1180, 250, 420)
    draw = ImageDraw.Draw(im)
    text(draw, (420, 150), "Paxband", font(SERIF, 84))
    text(draw, (424, 260), "The band is not the bar.", font(SANS, 36))
    im.convert("RGB").save(OUT / "banner.png", quality=95)


def cover(name: str, kicker: str, lines: list[str], sub: str) -> None:
    im = field(1600, 900, 1180, 420)
    paste_rings(im, 1240, 450, 640)
    draw = ImageDraw.Draw(im)
    text(draw, (90, 220), kicker, font(SANS, 32))
    y = 280
    for line in lines:
        text(draw, (90, y), line, font(SERIF, 92))
        y += 108
    text(draw, (90, y + 16), sub, font(SANS, 36))
    im.convert("RGB").save(OUT / name, quality=95)


def main() -> None:
    avatar()
    banner()
    cover("cover-tape.png", "Tape", ["The band is not", "the bar."], "Three rings. Kept apart.")
    cover("cover-not.png", "Paxband", ["Not Paxos.", "Not a sale."], "The ounce is theirs.")
    cover("cover-three.png", "Kept apart", ["Bar.", "Perp. Band."], "Nothing here mints a fourth.")
    bio = (
        "The band is not the bar. Paxband keeps the ounce, the perp, and the band apart. "
        "Not Paxos. Not a sale."
    )
    (OUT / "bio.txt").write_text(bio + "\n", encoding="utf-8")
    print(len(bio))


if __name__ == "__main__":
    main()

from __future__ import annotations

import argparse
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
    from pillow_heif import register_heif_opener
except ImportError as error:
    print(
        "This script needs Pillow and pillow-heif.\n"
        "Install them with: pip install pillow pillow-heif",
        file=sys.stderr,
    )
    raise SystemExit(1) from error


SUPPORTED_EXTENSIONS = {".heic", ".heif"}
DEFAULT_INPUT_DIR = Path("image")

register_heif_opener()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convert all HEIC/HEIF images in a folder to JPG in place using ffmpeg."
    )
    parser.add_argument(
        "--input-dir",
        type=Path,
        default=DEFAULT_INPUT_DIR,
        help=f"Folder to scan for HEIC files. Default: {DEFAULT_INPUT_DIR}",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Rebuild JPG files even if they already exist, replacing existing JPGs.",
    )
    return parser.parse_args()

def iter_heic_files(input_dir: Path) -> list[Path]:
    if not input_dir.exists():
        raise FileNotFoundError(f"Input folder does not exist: {input_dir}")

    return sorted(
        path for path in input_dir.iterdir()
        if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
    )


def convert_file(source: Path, destination: Path, force: bool) -> str:
    if destination.exists() and not force:
        return "skipped"

    try:
        with Image.open(source) as image:
            image = ImageOps.exif_transpose(image)

            if image.mode in {"RGBA", "LA"}:
                background = Image.new("RGB", image.size, (255, 255, 255))
                alpha = image.getchannel("A")
                background.paste(image.convert("RGBA"), mask=alpha)
                image = background
            elif image.mode != "RGB":
                image = image.convert("RGB")

            image.save(destination, format="JPEG", quality=95, optimize=True)
    except Exception as error:  # Pillow raises multiple image-specific exception types.
        raise RuntimeError(f"{source.name}: {error}") from error

    source.unlink()
    return "converted"


def main() -> int:
    args = parse_args()
    input_dir = args.input_dir.resolve()

    try:
        heic_files = iter_heic_files(input_dir)
    except FileNotFoundError as error:
        print(error, file=sys.stderr)
        return 1

    if not heic_files:
        print(f"No HEIC/HEIF files found in {input_dir}")
        return 0

    converted_count = 0
    skipped_count = 0

    for source in heic_files:
        destination = source.with_suffix(".jpg")
        try:
            status = convert_file(source, destination, args.force)
        except RuntimeError as error:
            print(f"Failed: {error}", file=sys.stderr)
            continue

        if status == "converted":
            converted_count += 1
            print(f"Converted: {source.name} -> {destination.name}")
        else:
            skipped_count += 1
            print(f"Skipped:   {source.name} ({destination.name} already exists)")

    print(
        f"Done. Converted {converted_count} file(s) and removed the original HEIC files. "
        f"Skipped {skipped_count} file(s)."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

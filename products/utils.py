from PIL import Image
import os


def generate_picture_versions(image_path):
    """
    Generate low, medium, high quality versions of the image with ``_quality`` suffix.
    """
    try:
        img = Image.open(image_path)
    except FileNotFoundError:
        return

    sizes = {
        "low": (150, 150),
        "medium": (600, 600),
        "high": (1200, 1200),
    }

    directory, filename = os.path.split(image_path)
    filename, extension = os.path.splitext(filename)

    for name, size in sizes.items():
        img_copy = img.copy()
        img_copy.thumbnail(size)

        new_filename = f"{filename}_{name}{extension}"
        new_filepath = os.path.join(directory, new_filename)

        img_copy.save(new_filepath, format=img.format)

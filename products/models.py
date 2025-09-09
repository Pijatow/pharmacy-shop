import os
import uuid

from django.db import models

from accounts.models import CustomUser

from taggit.managers import TaggableManager

from .utils import generate_picture_versions
from .validators import validate_file_size


def get_brand_image_upload_path(instance, filename):
    extension = os.path.splitext(filename)[1]
    unique_filename = f"{uuid.uuid4()}{extension}"
    return os.path.join("brands/pictures/", unique_filename)


class Brand(models.Model):
    creator = models.ForeignKey(
        CustomUser, on_delete=models.PROTECT, related_name="brands"
    )
    name = models.CharField(max_length=200, unique=True, blank=False)
    picture = models.ImageField(
        upload_to=get_brand_image_upload_path, validators=[validate_file_size]
    )
    description = models.TextField(max_length=1000, blank=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        if self.picture:
            generate_picture_versions(self.picture.path)

    def __str__(self):
        return self.name


def get_unknown_brand():
    brand, created = Brand.objects.get_or_create(
        name="Unknown", description="Unavailable"
    )
    return brand


def get_product_image_upload_path(instance, filename):
    extension = os.path.splitext(filename)[1]
    unique_filename = f"{uuid.uuid4()}{extension}"
    return os.path.join("products/pictures/", unique_filename)


class Product(models.Model):
    creator = models.ForeignKey(
        CustomUser, on_delete=models.PROTECT, related_name="products"
    )
    name = models.CharField(max_length=200, unique=True, blank=False)
    brand = models.ForeignKey(
        Brand,
        on_delete=models.SET(get_unknown_brand),
        related_name="products",
    )
    picture = models.ImageField(
        upload_to=get_product_image_upload_path, validators=[validate_file_size]
    )
    description = models.TextField(max_length=1000, blank=True)
    # Toman, NOT Rial
    price = models.IntegerField(help_text="Price stored in Tomans")
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now=True)
    tags = TaggableManager(blank=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        if self.picture:
            generate_picture_versions(self.picture.path)

    def __str__(self):
        return self.brand.name.upper() + " - " + self.name


class Collection(models.Model):
    creator = models.ForeignKey(
        CustomUser, on_delete=models.PROTECT, related_name="collections"
    )
    name = models.CharField(max_length=200)
    description = models.TextField(max_length=500)
    products = models.ManyToManyField(Product, related_name="collections")

    def __str__(self):
        return self.name


class Comment(models.Model):
    author = models.ForeignKey(
        CustomUser, on_delete=models.PROTECT, related_name="comments"
    )
    text = models.TextField(max_length=1000)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="comments"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product.name.upper() + " | " + self.author.username

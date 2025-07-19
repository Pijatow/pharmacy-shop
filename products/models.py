from django.db import models

from accounts.models import CustomUser

from taggit.managers import TaggableManager


class Brand(models.Model):
    creator = models.ForeignKey(
        CustomUser, on_delete=models.PROTECT, related_name="brands"
    )
    name = models.CharField(max_length=200, unique=True, blank=False)
    # pictures = models.ImageField()
    description = models.TextField(max_length=1000, blank=True)


def get_unknown_brand():
    brand, created = Brand.objects.get_or_create(name="Unknown", description="Unavailable")
    return brand


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
    # pictures = models.ImageField()
    description = models.TextField(max_length=1000, blank=True)
    # Toman, NOT Rial
    price = models.IntegerField(help_text="Price stored in Tomans")
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now=True)
    tags = TaggableManager(blank=True)


class Collection(models.Model):
    creator = models.ForeignKey(
        CustomUser, on_delete=models.PROTECT, related_name="collections"
    )
    name = models.CharField(max_length=200)
    description = models.TextField(max_length=500)
    products = models.ManyToManyField(Product, related_name="products")


class Comment(models.Model):
    author = models.ForeignKey(
        CustomUser, on_delete=models.PROTECT, related_name="comments"
    )
    content = models.TextField(max_length=1000)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

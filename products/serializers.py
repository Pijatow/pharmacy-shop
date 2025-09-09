import os
from rest_framework import serializers

from .models import Brand, Product, Collection, Comment

from taggit.serializers import TagListSerializerField, TaggitSerializer


class ProductSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    brand_id = serializers.IntegerField(source="brand.id")
    brand_name = serializers.CharField(source="brand.name")
    pictures = serializers.SerializerMethodField()

    def get_pictures(self, obj):
        if not obj.picture:
            return None

        request = self.context.get("request")
        original_url = obj.picture.url
        base_url, extension = os.path.splitext(original_url)
        urls = {
            "low": request.build_absolute_uri(f"{base_url}_low{extension}"),
            "medium": request.build_absolute_uri(f"{base_url}_medium{extension}"),
            "high": request.build_absolute_uri(f"{base_url}_high{extension}"),
        }
        return urls

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "brand_id",
            "brand_name",
            "collections",
            "comments",
            "description",
            "price",
            "created_at",
            "last_updated_at",
            "tags",
            "pictures",
        ]


class BrandSerializer(serializers.ModelSerializer):
    pictures = serializers.SerializerMethodField()

    class Meta:
        model = Brand
        # fields = "__all__"
        fields = ["id", "creator", "name", "description", "pictures"]

    def get_pictures(self, obj):
        if not obj.picture:
            return None

        request = self.context.get("request")
        original_url = obj.picture.url
        base_url, extension = os.path.splitext(original_url)
        urls = {
            "low": request.build_absolute_uri(f"{base_url}_low{extension}"),
            "medium": request.build_absolute_uri(f"{base_url}_medium{extension}"),
            "high": request.build_absolute_uri(f"{base_url}_high{extension}"),
        }
        return urls


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source="author.email")

    class Meta:
        model = Comment
        fields = ["id", "text", "product", "author", "created_at"]

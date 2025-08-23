from rest_framework.serializers import ModelSerializer, CharField, IntegerField

from .models import Brand, Product, Collection, Comment

from taggit.serializers import TagListSerializerField, TaggitSerializer


class ProductSerializer(TaggitSerializer, ModelSerializer):
    tags = TagListSerializerField()
    brand_id = IntegerField(source='brand.id')
    brand_name = CharField(source='brand.name')

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
        ]


class BrandSerializer(ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"


class CollectionSerializer(ModelSerializer):
    class Meta:
        model = Collection
        fields = "__all__"


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

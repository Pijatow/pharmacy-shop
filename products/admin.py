from django.contrib import admin
from products.models import Product, Brand, Comment, Collection


from django.contrib import admin
from .models import Brand, Product, Collection, Comment


class CommentInline(admin.TabularInline):
    model = Comment
    raw_id_fields = ["author"]
    extra = 1


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ("name", "creator")
    search_fields = ("name",)
    raw_id_fields = ("creator",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "brand", "price", "creator", "created_at")
    list_filter = ("brand", "tags", "created_at")
    search_fields = ("name", "brand__name", "description")
    # Use raw_id_fields for better performance with many users or brands.
    raw_id_fields = ("creator", "brand")
    readonly_fields = ("created_at", "last_updated_at")
    # Embed the Comment editor into the Product page.
    inlines = [CommentInline]

    fieldsets = (
        ("Core Information", {"fields": ("name", "brand", "description", "tags")}),
        ("Pricing and Creator", {"fields": ("price", "creator")}),
        ("Timestamps", {"fields": ("created_at", "last_updated_at")}),
    )


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ("name", "creator")
    search_fields = ("name",)
    raw_id_fields = ("creator",)
    # Use filter_horizontal for a better ManyToMany selection widget.
    filter_horizontal = ("products",)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("product", "author", "text")
    list_filter = ("author",)
    search_fields = ("text", "product__name", "author__username")
    raw_id_fields = ("author", "product")

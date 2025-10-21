from django.contrib import admin
from django.urls import reverse
from django.utils.safestring import mark_safe

from rangefilter.filters import NumericRangeFilter, DateRangeQuickSelectListFilter

from products.models import Product, Brand, Comment, Collection
from accounts.models import CustomUser


class CommentInline(admin.TabularInline):
    model = Comment
    raw_id_fields = ["author"]
    extra = 1


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "creator"]
    list_display_links = ["id", "name"]
    readonly_fields = ["id", "creator"]
    search_fields = ("name", "description", "id")
    # fields = ["id", "creator", "name", "description", "picture"]
    fieldsets = [
        (
            None,
            {
                "fields": [
                    "id",
                    "creator",
                ],
            },
        ),
        (
            None,
            {"fields": ["name", "description", "picture"]},
        ),
    ]

    def save_model(self, request, obj, form, change):
        if not change:
            user = CustomUser.objects.get(id=request.user.id)
            obj.creator = user
        obj.save()


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    list_display = ("id", "name", "brand", "price")
    list_editable = ["price"]
    list_display_links = ["id", "name"]
    list_filter = ("brand", ("price", NumericRangeFilter), "tags")
    search_fields = ("name", "brand__name", "description")
    # Use raw_id_fields for better performance with many users or brands.
    raw_id_fields = ("brand",)
    readonly_fields = ("id", "creator", "created_at", "last_updated_at")
    # Embed the Comment editor into the Product page.
    inlines = [CommentInline]

    fieldsets = (
        (
            "Information",
            {"fields": ("brand", "name", "description", "price", "tags", "picture")},
        ),
        ("Timestamps", {"fields": ("created_at", "last_updated_at")}),
    )

    def save_model(self, request, obj, form, change):
        if not change:
            user = CustomUser.objects.get(id=request.user.id)
            obj.creator = user
        obj.save()


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ("name", "related_products_display")
    search_fields = ("name",)
    # Use filter_horizontal for a better ManyToMany selection widget.
    filter_horizontal = ("products",)
    readonly_fields = ["related_products_display"]
    fieldsets = (
        (None, {"fields": ["name", "description"]}),
        (None, {"fields": ["products", "tags", "related_products_display"]}),
    )

    def save_model(self, request, obj, form, change):
        if not change:
            user = CustomUser.objects.get(id=request.user.id)
            obj.creator = user
        obj.save()

    def related_products_display(self, obj):
        related_products = obj.related_products
        if not related_products.exists():
            return "No RelatedProduct"
        links = []
        for product in related_products:
            url = reverse("admin:products_product_change", args=[product.id])
            links.append(f'<a href="{url}">{product.name}</a>')
        return mark_safe(", ".join(links))


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    readonly_fields = ["author", "text", "created_at", "product"]
    list_display = ("product", "author", "text", "created_at")
    list_filter = ("author",)
    search_fields = ("text", "product__name", "author__username", "author__email")
    raw_id_fields = ("author", "product")

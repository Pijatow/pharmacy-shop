# orders/admin.py
from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    """
    Allows for the editing of OrderItems directly within the Order admin page.
    TabularInline provides a more compact, table-based layout.
    """

    model = OrderItem
    # Using raw_id_fields for the product foreign key is more efficient
    # than a dropdown, especially with thousands of products.
    raw_id_fields = ["product"]
    # The price snapshot should not be editable.
    # Prevents showing extra, empty forms for new items.
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    """
    Customizes the admin interface for the Order model.
    """

    # Columns to display in the main list view of orders.
    list_display = [
        "id",
        "first_name",
        "last_name",
        "email",
        "status",
        "created_at",
        "total_paid",
    ]
    # Adds a sidebar for filtering the list of orders.
    list_filter = ["status", "created_at"]
    # Adds a search bar for finding orders.
    search_fields = ["id", "first_name", "last_name", "email"]
    # Embeds the OrderItem editor into the Order page.
    inlines = [OrderItemInline]

    # These fields are part of the historical record and should not be changed.
    readonly_fields = ["id", "user", "total_paid", "created_at", "updated_at"]

    # Organizes the fields on the order detail page into logical sections.
    fieldsets = (
        ("Order Information", {"fields": ("id", "status", "user")}),
        (
            "Customer Details",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "email",
                    "phone_number",
                    "address",
                    "post_code",
                )
            },
        ),
        ("Financials", {"fields": ("total_paid",)}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )

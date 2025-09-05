import uuid
import re
from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from products.models import Product


class Order(models.Model):
    class OrderStatus(models.TextChoices):
        PENDING = "PENDING", _("Pending Payment")
        PAID = "PAID", _("Paid")
        PROCESSING = "PROCESSING", _("Processing")
        SHIPPED = "SHIPPED", _("Shipped")
        DELIVERED = "DELIVERED", _("Delivered")
        CANCELED = "CANCELED", _("Canceled")

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="orders",
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    address = models.CharField(max_length=250)
    post_code = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    total_paid = models.BigIntegerField(default=1)
    status = models.CharField(
        max_length=20, choices=OrderStatus.choices, default=OrderStatus.PENDING
    )

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return f"Order {self.id} - {self.status}"

    def clean(self):
        super().clean()
        if self.phone_number:
            # Remove all non-digit characters from the phone number.
            cleaned_number = re.sub(r"\D", "", self.phone_number)

            if len(cleaned_number) != 11 or not cleaned_number.startswith("09"):
                raise ValidationError(
                    _("Phone number must be a valid 11-digit Iranian mobile number.")
                )

            self.phone_number = cleaned_number

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product, related_name="order_items", on_delete=models.SET_NULL, null=True
    )
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.product.name}"

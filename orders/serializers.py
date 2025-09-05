from rest_framework import serializers
from .models import Order, OrderItem
from products.models import Product
from django.db import transaction


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["product", "quantity"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "address",
            "post_code",
            "total_paid",
            "created_at",
            "status",
            "items",
        ]

    @transaction.atomic  # Ensures all database operations are done together or not at all
    def create(self, validated_data: dict):
        order_items = validated_data.pop("items")
        grand_total = 0

        order = Order.objects.create(**validated_data)

        for item in order_items:
            product = item["product"]
            quantity = item["quantity"]

            price_at_purchase = product.price

            subtotal = price_at_purchase * quantity
            grand_total += subtotal

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
            )

        order.total_paid = grand_total
        order.save()

        return order

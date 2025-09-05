from django.urls import path
from .views import OrderListAPIView, OrderDetailAPIView

urlpatterns = [
    path("orders/", OrderListAPIView.as_view(), name="orders-list"),
    path("orders/<uuid:id>/", OrderDetailAPIView.as_view(), name="orders-detail"),
]

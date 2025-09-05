from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.mixins import (
    CreateModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import OrderSerializer
from .models import Order


class OrderListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.is_staff:
            orders = Order.objects.all()
        else:
            orders = Order.objects.filter(user=user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "id"

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all()
        else:
            return Order.objects.filter(user=user)

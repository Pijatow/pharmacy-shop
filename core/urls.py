from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from products.views import (
    ProductViewSet,
    BrandViewSet,
    CollectionViewSet,
    CommentViewSet,
)

from rest_framework_simplejwt.views import (
    token_blacklist,
    token_obtain_pair,
    token_refresh,
    token_verify,
)
from accounts.views import RegisterView, UserProfileView


SIMPLE_JWT_URLS = [
    path("", token_obtain_pair, name="jwt-obtain"),
    path("refresh/", token_refresh, name="jwt-refresh"),
    path("revoke/", token_blacklist, name="jwt-revoke"),
    path("verify/", token_verify, name="jwt-verify"),
    path("register/", RegisterView.as_view(), name="jwt-register"),
]

router = DefaultRouter()
router.register(r"products", ProductViewSet, basename="product")
router.register(r"brands", BrandViewSet, basename="brand")
router.register(r"collections", CollectionViewSet, basename="collection")
router.register(r"comments", CommentViewSet, basename="comment")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("jwt/", include(SIMPLE_JWT_URLS)),
    path("api/profile/", UserProfileView.as_view(), name="profile"),
    path("api/", include(router.urls)),
]

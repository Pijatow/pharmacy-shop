from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    token_blacklist,
    token_obtain_pair,
    token_refresh,
    token_verify,
)

SIMPLE_JWT_URLS = [
    path("", token_obtain_pair, name='jwt-obtain'),
    path("refresh/", token_refresh, name='jwt-refresh'),
    path("revoke/", token_blacklist, name='jwt-revoke'),
    path("verify/", token_verify, name='jwt-verify'),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("jwt/", include(SIMPLE_JWT_URLS))

]

from .base import *
import os

DEBUG = False

ALLOWED_HOSTS = [os.getenv("DOMAIN_NAME")]
CORS_ALLOWED_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"]
CORS_ALLOW_CREDENTIALS = True

# ==================================================================
# Database Configurations
# ==================================================================
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("POSTGRES_DBNAME"),
        "USER": os.getenv("POSTGRES_USER"),
        "PASSWORD": os.getenv("POSTGRES_PASSWORD"),
        "HOST": os.getenv("POSTGRES_HOST"),
        "PORT": os.getenv("POSTGRES_PORT"),
    }
}

# ==================================================================
# Static Settings
# ==================================================================
STATIC_URL = "static/"
STATIC_ROOT = "/var/www/pharmacy-shop/static"
MEDIA_URL = "media/"
MEDIA_ROOT = "/var/www/pharmacy-shop/uploaded_media/"

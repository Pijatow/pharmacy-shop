from django.contrib import admin
from products.models import Product, Brand, Comment, Collection


admin.site.register([Brand, Collection, Product, Comment])

from django.contrib import admin
from accounts.models import CustomUser
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.admin import UserAdmin


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ["username", "email", "password"]


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ["username", "email", "password"]


class CustomUserAdmin(UserAdmin):
    form = CustomUserChangeForm
    add_form = CustomUserChangeForm
    model = CustomUser
    fieldsets = (
        ("cridentials", {"fields": ("username", "email", "password")}),
        (
            "acess",
            {"fields": ("is_active", "is_staff", "is_superuser", "user_permissions")},
        ),
    )
    list_display = ["username", "email", "is_active", "is_staff", "is_superuser"]


admin.site.register(CustomUser, CustomUserAdmin)

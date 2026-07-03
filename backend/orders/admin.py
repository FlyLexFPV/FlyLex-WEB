# backend/orders/admin.py
from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    # Делаем цену на момент покупки только для чтения (чтобы случайно не изменить чек)
    readonly_fields = ['price_at_purchase']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    # Поля в общем списке заказов
    list_display = ['id', 'full_name', 'phone', 'total_amount', 'status', 'created_at']

    # Боковая панель фильтрации (по статусу, доставке и дате)
    list_filter = ['status', 'delivery_method', 'created_at']

    # Позволяет менеджеру быстро менять статус прямо в таблице
    list_editable = ['status']

    # Поиск по имени, телефону и нику в TG
    search_fields = ['full_name', 'phone', 'telegram_username']

    inlines = [OrderItemInline]
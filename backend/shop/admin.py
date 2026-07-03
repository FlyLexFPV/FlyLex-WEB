# backend/shop/admin.py
from django.contrib import admin
from .models import Product, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1  # Показываем одну пустую форму для загрузки нового фото
    fields = ['image', 'order']
    ordering = ['order']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    # Что отображается в общем списке товаров
    list_display = ['name', 'price', 'is_in_stock']

    # Поля, которые можно менять прямо из списка (без захода в карточку)
    list_editable = ['price', 'is_in_stock']

    # Автоматическое создание URL на основе названия
    prepopulated_fields = {'slug': ('name',)}

    # Удобный интерфейс (две колонки со стрелочками) для связи "С этим товаром смотрят"
    filter_horizontal = ('cross_sell',)

    # Подключаем загрузку картинок прямо внутрь карточки товара
    inlines = [ProductImageInline]

    # Списки "Характеристики" и "Комплектация" (JSONField) в стандартной
    # админке Django редактируются как удобные текстовые блоки формата JSON.
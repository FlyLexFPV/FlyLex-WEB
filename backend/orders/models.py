from django.db import models
from shop.models import Product


class Order(models.Model):
    DELIVERY_CHOICES = [
        ('ozon', 'Ozon'),
        ('yandex', 'Яндекс Доставка'),
        ('cdek', 'СДЭК'),
    ]
    STATUS_CHOICES = [
        ('pending', 'Ожидает подтверждения'),
        ('active', 'Активный заказ'),
        ('completed', 'Завершен'),
    ]

    full_name = models.CharField(max_length=255, verbose_name="ФИО")
    phone = models.CharField(max_length=20, verbose_name="Телефон")
    telegram_username = models.CharField(max_length=100, verbose_name="Telegram (@nick)")

    delivery_method = models.CharField(max_length=20, choices=DELIVERY_CHOICES)
    delivery_address = models.TextField(verbose_name="Адрес ПВЗ")

    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField(default=1)
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)
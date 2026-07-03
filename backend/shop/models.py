from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название")
    slug = models.SlugField(unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")
    is_in_stock = models.BooleanField(default=True, verbose_name="В наличии")

    characteristics = models.JSONField(default=list, verbose_name="Характеристики (список)")
    package_contents = models.JSONField(default=list, verbose_name="Комплектация (список)")

    cross_sell = models.ManyToManyField('self', blank=True, verbose_name="С этим товаром смотрят")

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/')
    order = models.PositiveIntegerField(default=0, verbose_name="Порядок сортировки")

    class Meta:
        ordering = ['order']
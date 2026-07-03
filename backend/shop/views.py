from django.shortcuts import render, get_object_or_404
from .models import Product

def index(request):
    products = Product.objects.filter(is_in_stock=True)
    return render(request, 'index.html', {'products': products})

def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug)
    return render(request, 'product_detail.html', {'product': product})

def catalog_view(request):
    # В каталоге выводим все товары
    products = Product.objects.all()
    return render(request, 'catalog.html', {'products': products})

def cart_view(request):
    return render(request, 'checkout.html')

def about_view(request):
    return render(request, 'about.html')

def profile_view(request):
    return render(request, 'profile.html')
// frontend/static/js/cart.js

document.addEventListener('DOMContentLoaded', renderCart);

function renderCart() {
    let cart = JSON.parse(localStorage.getItem('flylex_cart')) || [];
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('total-price');
    let total = 0;

    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-cart-msg">Ваша корзина пуста.</div>';
        totalEl.innerText = '0';
        return;
    }

    cart.forEach((item) => {
        let itemTotal = item.price * item.qty;
        total += itemTotal;

        container.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <img src="${item.image}" class="cart-item-img" alt="${item.name}">
                    <div>
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">${item.price} ₽</div>
                    </div>
                </div>
                <div class="cart-actions">
                    <div class="cart-qty-controls">
                        <button type="button" class="cart-qty-btn" onclick="updateCartQty('${item.slug}', -1)">-</button>
                        <span class="cart-qty-val">${item.qty}</span>
                        <button type="button" class="cart-qty-btn" onclick="updateCartQty('${item.slug}', 1)">+</button>
                    </div>
                    <span style="font-weight: 600; min-width: 80px; text-align: right;">${itemTotal} ₽</span>
                    <button type="button" class="btn-remove" onclick="removeItem('${item.slug}')">Удалить</button>
                </div>
            </div>
        `;
    });

    totalEl.innerText = total;
}

function updateCartQty(slug, change) {
    let cart = JSON.parse(localStorage.getItem('flylex_cart')) || [];
    let item = cart.find(i => i.slug === slug);

    if (item) {
        item.qty += change;
        if (item.qty < 1) {
            removeItem(slug);
        } else {
            localStorage.setItem('flylex_cart', JSON.stringify(cart));
            renderCart();
        }
    }
}

function removeItem(slug) {
    let cart = JSON.parse(localStorage.getItem('flylex_cart')) || [];
    cart = cart.filter(item => item.slug !== slug);
    localStorage.setItem('flylex_cart', JSON.stringify(cart));
    renderCart();
}

function handleCheckout(event) {
    event.preventDefault();

    let cart = JSON.parse(localStorage.getItem('flylex_cart')) || [];
    if (cart.length === 0) {
        alert('Корзина пуста. Добавьте товары перед оформлением!');
        return;
    }

    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const tgUsername = document.getElementById('tgUsername').value.trim();
    const address = document.getElementById('address').value.trim();
    const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
    const totalAmount = document.getElementById('total-price').innerText;

    let cartListText = '';
    cart.forEach(item => {
        cartListText += `▫️ ${item.name} (${item.qty} шт.) - ${item.price * item.qty} ₽%0A`;
    });

    const messageText =
        `🔥 Новый заказ с сайта FlyLex 🔥%0A%0A` +
        `👤 Покупатель: ${fullName}%0A` +
        `📱 Телефон: ${phone}%0A` +
        `💬 Telegram: ${tgUsername}%0A%0A` +
        `🛒 Корзина:%0A${cartListText}%0A` +
        `📦 Доставка: ${deliveryMethod}%0A` +
        `📍 Адрес ПВЗ: ${address}%0A%0A` +
        `💰 Итого к оплате: ${totalAmount} ₽%0A%0A` +
        `Жду реквизиты для оплаты!`;

    const tgAdmin = "FlyLex_Admin";
    const tgUrl = `https://t.me/${tgAdmin}?text=${messageText}`;

    window.open(tgUrl, '_blank');

    localStorage.removeItem('flylex_cart');
    window.location.href = '/';
}
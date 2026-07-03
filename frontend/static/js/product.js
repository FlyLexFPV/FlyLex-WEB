// frontend/static/js/product.js

// Переменные галереи
let currentSlide = 0;
const wrapper = document.getElementById('cart-actions-wrapper');
const images = wrapper ? JSON.parse(wrapper.dataset.images || '[]') : [];

document.addEventListener('DOMContentLoaded', () => {
    if (wrapper && document.getElementById('add-to-cart-btn')) {
        updateProductUI(wrapper.dataset.slug);
    }
});

// Функции галереи
function setSlide(index) {
    currentSlide = index;
    updateGallery();
}

function moveSlide(direction) {
    if (images.length === 0) return;
    currentSlide = (currentSlide + direction + images.length) % images.length;
    updateGallery();
}

function updateGallery() {
    const mainImage = document.getElementById('mainImage');
    if (mainImage && images[currentSlide]) {
        mainImage.src = images[currentSlide];
    }
    document.querySelectorAll('.thumbnail').forEach((t, i) => {
        t.classList.toggle('active', i === currentSlide);
    });
}

function changeImage(element, index) {
    setSlide(index);
}

// Функции корзины
function initCartItem() {
    const slug = wrapper.dataset.slug;
    const name = wrapper.dataset.name;
    const price = parseFloat(wrapper.dataset.price.toString().replace(',', '.'));
    const image = images[0] || '';

    let cart = JSON.parse(localStorage.getItem('flylex_cart')) || [];
    cart.push({ slug, name, price, image, qty: 1 });
    localStorage.setItem('flylex_cart', JSON.stringify(cart));

    updateProductUI(slug);
}

function changeProductQty(change) {
    const slug = wrapper.dataset.slug;
    let cart = JSON.parse(localStorage.getItem('flylex_cart')) || [];
    let item = cart.find(i => i.slug === slug);

    if (item) {
        item.qty += change;
        if (item.qty < 1) {
            cart = cart.filter(i => i.slug !== slug);
        }
        localStorage.setItem('flylex_cart', JSON.stringify(cart));
        updateProductUI(slug);
    }
}

function updateProductUI(slug) {
    const btn = document.getElementById('add-to-cart-btn');
    const selector = document.getElementById('qty-selector-ui');
    const qtyVal = document.getElementById('product-qty-val');

    if (!btn) return;

    let cart = JSON.parse(localStorage.getItem('flylex_cart')) || [];
    let item = cart.find(i => i.slug === slug);

    if (item) {
        btn.style.display = 'none';
        selector.style.display = 'flex';
        qtyVal.innerText = item.qty;
    } else {
        btn.style.display = 'block';
        selector.style.display = 'none';
    }
}

function openTab(event, tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}
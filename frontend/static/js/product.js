// frontend/static/js/product.js

// 1. Смена основного изображения по клику на миниатюру
function changeImage(element) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = element.src;

    // Переключение визуального состояния (рамки)
    document.querySelectorAll('.thumbnail').forEach(img => img.classList.remove('active'));
    element.classList.add('active');
}

// 2. Управление счетчиком товаров
let currentQty = 1;
function updateQty(change) {
    currentQty += change;
    if (currentQty < 1) currentQty = 1; // Защита от отрицательных значений
    document.getElementById('qtyCounter').innerText = currentQty;
}

// 3. Логика переключения вкладок (Табы)
function openTab(event, tabId) {
    // Скрываем весь контент
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    // Сбрасываем активные кнопки
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    // Показываем нужный контент и делаем кнопку активной
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}
// Показать/скрыть детали карточки
function toggleCard(cardId) {
    const details = document.getElementById(cardId);
    if (details.style.display === 'block') {
        details.style.animation = 'slideDown reverse 0.4s ease-out';
        setTimeout(() => { details.style.display = 'none'; }, 400);
    } else {
        details.style.display = 'block';
    }
}

// Показать модальное окно с анимацией
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10); // Небольшая задержка для плавности
}

// Закрыть модальное окно с анимацией
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
}

// Закрытие модалки по клику вне неё
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
}

// Анимации при скролле (Intersection Observer)
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Наблюдаем за карточками
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });

    // Наблюдаем за элементами галереи
    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });

    // Наблюдаем за document-placeholder (для pulse, но они уже анимированы)
    document.querySelectorAll('.document-placeholder').forEach(item => {
        observer.observe(item);
    });
});
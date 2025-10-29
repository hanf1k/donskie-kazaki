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
    modal.style.display = 'flex';
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

    // Функция для шаринга элемента (фото/документ)
async function shareItem(title, url, isImage = false) {
    const shareData = {
        title: title,
        url: url,
        text: isImage ? `Фото: ${title} из проекта "Казачья слава Дона"` : `Документ: ${title} из архива "Казачья слава Дона"`
    };

    try {
        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            await navigator.share(shareData);
        } else {
            // Fallback: копируем URL в буфер
            await navigator.clipboard.writeText(`${shareData.text}\n${url}`);
            alert('URL скопирован в буфер обмена! Поделитесь им в любом приложении.');
        }
    } catch (err) {
        console.error('Ошибка шаринга:', err);
        // Fallback для старых браузеров
        const fallbackUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(url)}`;
        window.open(fallbackUrl, '_blank');
    }
}

// Пример вызова: shareItem('Название', 'https://example.com/url', true); // true для изображений
});
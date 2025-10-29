// === Модальные окна ===
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Закрытие по клику вне модала
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// === УЛУЧШЕННАЯ ФУНКЦИЯ ПОДЕЛИТЬСЯ ===
async function shareItem(title, url, isImage = false) {
    const shareData = {
        title: title,
        text: isImage 
            ? `Фото: ${title} из проекта "Казачья слава Дона"`
            : `Документ: ${title} из архива "Казачья слава Дона"`,
        url: url
    };

    // 1. Пробуем нативный Web Share API
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        try {
            await navigator.share(shareData);
            console.log('Поделились через Web Share API');
            return;
        } catch (err) {
            console.warn('Web Share API ошибка:', err);
        }
    }

    // 2. Fallback: копируем в буфер обмена
    const textToCopy = `${shareData.text}\n${shareData.url}`;
    try {
        await navigator.clipboard.writeText(textToCopy);
        showToast('Ссылка скопирована в буфер обмена! Поделитесь в любом приложении.');
    } catch (err) {
        // 3. Резервный fallback: открываем Twitter/X
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
        window.open(twitterUrl, '_blank');
    }
}

// === Уведомление (Toast) ===
function showToast(message) {
    // Удаляем старое уведомление
    const oldToast = document.getElementById('toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #2c5a2c;
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: fadeInOut 3s forwards;
    `;

    document.body.appendChild(toast);

    // Анимация исчезновения
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: translateX(-50%) translateY(20px); }
            15%, 85% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // Удаляем через 3 секунды
    setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
        if (style.parentNode) style.parentNode.removeChild(style);
    }, 3000);
}
// Показать/скрыть детали карточки (для history.html)
function toggleCard(cardId) {
    const details = document.getElementById(cardId);
    if (details.style.display === 'block') {
        details.style.animation = 'slideDown reverse 0.4s ease-out';
        setTimeout(() => { details.style.display = 'none'; }, 400);
    } else {
        details.style.display = 'block';
    }
}

// Показать модальное окно с анимацией (для documents и photos)
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';  // ИСПРАВЛЕНО: 'flex' вместо 'flex' (была опечатка?)
    setTimeout(() => modal.classList.add('show'), 10);
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

    // Наблюдаем за карточками (history.html)
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });

    // Наблюдаем за элементами галереи (photos.html)
    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });

    // Наблюдаем за document-placeholder (documents.html)
    document.querySelectorAll('.document-placeholder').forEach(item => {
        observer.observe(item);
    });
});

// === ТЁМНАЯ ТЕМА + ПЛЕЕР — РАБОТАЕТ НА ВСЕХ СТРАНИЦАХ ===
document.addEventListener('DOMContentLoaded', () => {

    // ——— ТЁМНАЯ ТЕМА ———
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        // Восстанавливаем сохранённую тему
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.checked = true;
        }

        // Переключение
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // ——— ПЛЕЕР "ЛЮБО!" ———
    const soundBtn = document.getElementById('sound-btn');
    const audio = document.getElementById('cossack-song');

    if (soundBtn && audio) {
        let playing = false;

        soundBtn.addEventListener('click', () => {
            if (playing) {
                audio.pause();
                soundBtn.textContent = '🔊 Любо, братцы, любо!';
                playing = false;
            } else {
                audio.play().catch(() => {
                    alert('Нажмите ещё раз — браузер требует подтверждение для звука');
                });
                soundBtn.textContent = '🔇 Выключить';
                playing = true;
            }
        });
    }
});
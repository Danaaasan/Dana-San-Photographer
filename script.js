      // Плавная прокрутка для навигации
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Изменение прозрачности шапки при скролле
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            } else {
                header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            }
        });

        
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });


document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".booking-form");
    const phoneInput = document.getElementById("phone");

    // Всплывающее сообщение
    const popup = document.createElement("div");
    popup.className = "success-popup";
    popup.textContent = "Заявка отправлена!";
    document.body.appendChild(popup);

    // Простая проверка белорусского номера
    function isBelarusPhone(phone) {
        const digits = phone.replace(/\D/g, ""); // только цифры

        // допустим такие варианты:
        // +375 XX XXX XX XX → "375XXXXXXXXX" (12 цифр)
        // 375XXXXXXXXX      → 12 цифр
        // 80XXXXXXXXX       → 11 цифр
        if (digits.startsWith("375") && digits.length === 12) return true;
        if (digits.startsWith("80") && digits.length === 11) return true;
        return false;
    }

    form.addEventListener("submit", function (e) {
        const phoneValue = phoneInput.value.trim();

        // если номер не белорусский — не даём отправить
        if (!isBelarusPhone(phoneValue)) {
            e.preventDefault();
            phoneInput.classList.add("input-error");
            alert("Введите корректный белорусский номер телефона");
            return;
        } else {
            phoneInput.classList.remove("input-error");
        }

        // даём форме отправиться на getform (страница может перезагрузиться)
        // и покажем всплывающее сообщение
        popup.classList.add("show");
        setTimeout(() => popup.classList.remove("show"), 3000);
    });
});










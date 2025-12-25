// Валидация формы с IMask
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".booking-form");
    const phoneInput = document.getElementById("phone");

    // Всплывающее сообщение
    const popup = document.createElement("div");
    popup.className = "success-popup";
    popup.textContent = "Заявка отправлена!";
    document.body.appendChild(popup);

    // Маска для белорусского номера
    const phoneMask = IMask(phoneInput, {
        mask: '+375 (00) 000-00-00',
        lazy: false,
        placeholderChar: '_'
    });

    // Проверка телефона
    function validatePhone() {
        return phoneMask.masked.isComplete;
    }

    // Плавная прокрутка для навигации
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const targetId = $(this).attr('href');
        if (targetId === '#') return;

        const targetElement = $(targetId);
        if (targetElement.length) {
            $('html, body').animate({
                scrollTop: targetElement.offset().top - 80
            }, 600);
        }
    });

    // Изменение прозрачности шапки при скролле
    $(window).on('scroll', function() {
        const header = $('header');
        if ($(this).scrollTop() > 100) {
            header.css('background-color', 'rgba(0,0,0,0.9)');
        } else {
            header.css('background-color', 'rgba(0,0,0,0.8)');
        }
    });

    // Меню‑бургер
    $('.hamburger').on('click', function() {
        $('.nav-menu').toggleClass('active');
        $(this).toggleClass('active');
    });

    // ОДИН обработчик submit для формы
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let isValid = true;

        // Сбрасываем ошибки
        document.querySelectorAll(".booking-form input, .booking-form textarea")
            .forEach(input => {
                input.classList.remove("input-error");
                input.style.border = "";
                input.style.boxShadow = "";
            });

        // Проверяем обязательные поля
        ["name", "email", "social-link", "phone"].forEach(id => {
            const field = document.getElementById(id);
            if (!field.value.trim()) {
                field.classList.add("input-error");
                field.style.border = "2px solid #560519;";
                field.style.boxShadow = "0 0 8px #560519;";
                isValid = false;
            }
        });

        // Проверка телефона по маске
        if (!validatePhone()) {
            phoneInput.classList.add("input-error");
            phoneInput.style.border = "2px solid #560519;";
            phoneInput.style.boxShadow = "0 0 8px #560519;";
            isValid = false;
        }

        // Если всё ок — отправляем через AJAX
        if (isValid) {
            // Показываем сообщение
            popup.classList.add("show");
            setTimeout(() => popup.classList.remove("show"), 3000);

            // Отправляем данные на сервер
            const formData = new FormData(form);
            
            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Сбрасываем форму
                    form.reset();
                    phoneMask.updateValue();
                    
                    // Показываем всплывающее сообщение
                    popup.classList.add("show");
                    setTimeout(() => popup.classList.remove("show"), 3000);
                } else {
                    alert("Произошла ошибка при отправке формы");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Произошла ошибка при отправке формы");
            });
        }
    });

    // Убираем подсветку при вводе
    $(".booking-form input, .booking-form textarea").on("input", function() {
        $(this).css({
            "border": "",
            "box-shadow": ""
        });
        $(this).removeClass("input-error");
    });
});
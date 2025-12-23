
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
        lazy: false,          // маска всегда видна
        placeholderChar: '_'  // символ для пустых позиций
    });

    // Проверка телефона — просто смотрим, что маска заполнена
    function validatePhone() {
        return phoneMask.masked.isComplete;
    }

    // Проверка всей формы
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let isValid = true;

        // Сбрасываем ошибки
        document.querySelectorAll(".booking-form input, .booking-form textarea")
            .forEach(input => input.classList.remove("input-error"));

        // Проверяем обязательные поля
        ["name", "email", "social-link", "phone"].forEach(id => {
            const field = document.getElementById(id);
            if (!field.value.trim()) {
                field.classList.add("input-error");
                isValid = false;
            }
        });

        // Проверка телефона по маске
        if (!validatePhone()) {
            phoneInput.classList.add("input-error");
            isValid = false;
        }

        // Если всё ок — показываем сообщение
        if (isValid) {
            popup.classList.add("show");
            setTimeout(() => popup.classList.remove("show"), 3000);
            form.reset();
            phoneMask.updateValue(); // сброс маски
        }
    });
});

$(document).ready(function() {

    // 🔽 ПРОСТАЯ МАСКА ТЕЛЕФОНА (оставляем как у тебя)
    $('#phone').val('+375 (__)-___-__-__');

    $('#phone').on('focus click', function() {
        if ($(this).val() === '+375 (__)-___-__-__') {
            $(this).val('+375 (');
            setTimeout(() => {
                $(this).get(0).setSelectionRange(7, 7);
            }, 0);
        }
    });

    $('#phone').on('blur', function() {
        if ($(this).val() === '+375 (' || $(this).val() === '') {
            $(this).val('+375 (__)-___-__-__');
        }
    });

    // 🔽 Плавная прокрутка для навигации
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

    // 🔽 Изменение прозрачности шапки при скролле
    $(window).on('scroll', function() {
        const header = $('header');
        if ($(this).scrollTop() > 100) {
            header.css('background-color', 'rgba(0,0,0,0.9)');
        } else {
            header.css('background-color', 'rgba(0,0,0,0.8)');
        }
    });

    // 🔽 Меню‑бургер
    $('.hamburger').on('click', function() {
        $('.nav-menu').toggleClass('active');
        $(this).toggleClass('active');
    });

    // 🔽 Проверка обязательных полей (без проверки формата телефона)
    $(".booking-form").on("submit", function(e) {
        e.preventDefault();

        let isValid = true;

        // Сбрасываем все рамки
        $(".booking-form input, .booking-form textarea").css("border", "");

        // Проверяем обязательные поля
        let requiredFields = ["#name", "#email", "#social-link", "#phone"];

        requiredFields.forEach(function(selector) {
            let field = $(selector);
            let value = $.trim(field.val());

            if (value === "" || value === "+375 (__)-___-__-__") {
                field.css({
                    "border": "2px solid #a30808ff",
                    "box-shadow": "0 0 8px rgba(255, 68, 68, 0.5)",
                    "outline": "none"
                });
                isValid = false;
            }
        });

        // Если всё ок — отправляем
        if (isValid) {
            if ($(".success-popup").length === 0) {
                $("body").append('<div class="success-popup">Заявка отправлена!</div>');
            }
            $(".success-popup").fadeIn(300).delay(3000).fadeOut(300);

            $.ajax({
                url: $(this).attr('action'),
                type: $(this).attr('method'),
                data: $(this).serialize(),
                success: function() {
                    $(".booking-form")[0].reset();
                    $('#phone').val('+375 (__)-___-__-__');
                },
                error: function() {
                    alert("Произошла ошибка при отправке формы");
                }
            });
        }
    });

    // 🔽 Убираем подсветку при вводе
    $(".booking-form input, .booking-form textarea").on("input", function() {
        $(this).css("border", "");
        $(this).css("box-shadow", "");
    });
});

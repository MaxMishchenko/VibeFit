/*
$(document).ready(function () {
    const $burger = $('#burger');
    const $menu = $('#mobileMenu');
    const $header = $('#header');
    const $headerWrapper = $('#headerWrapper');
    const $body = $('body');
    const $window = $(window);

    const MAX_HEADER_TOP = 16;
    const HEADER_TRANSITION = 'top .4s ease-in-out';

    // ===== ФУНКЦІЯ: Оновлення положення header ===== //
    function updateHeaderTop(applyTransition = true) {
        const scrollTop = $window.scrollTop();
        const newTop = Math.max(0, MAX_HEADER_TOP - scrollTop);

        if (!applyTransition) {
            $header.css('transition', 'none');
        }

        $header.css('top', `${newTop}px`);

        if (!applyTransition) {
            requestAnimationFrame(() => {
                $header.css('transition', HEADER_TRANSITION);
            });
        }
    }

    // ===== ФУНКЦІЯ: Перемикання меню ===== //
    function toggleMenu() {
        const isExpanded = $burger.attr('aria-expanded') === 'true';

        $burger.attr('aria-expanded', !isExpanded);
        $menu.toggleClass('active');
        $burger.toggleClass('active');
        $headerWrapper.toggleClass('active');
        $body.toggleClass('lock');
    }

    $('#mobileMenu a').click(function () {
        toggleMenu();
    });

    // ===== ІНІЦІАЛІЗАЦІЯ ===== //
    updateHeaderTop(false);

    $window.on('scroll', function () {
        updateHeaderTop(true);
    });

    $burger.on('click', toggleMenu);
});
*/


$(document).ready(function () {
    const $burger = $('#burger');
    const $menu = $('#mobileMenu');
    const $header = $('#header');
    const $headerWrapper = $('#headerWrapper');
    const $body = $('body');
    const $window = $(window);

    const MAX_HEADER_TOP = 16;
    const HEADER_TRANSITION = 'top .4s ease-in-out';

    // ===== ФУНКЦІЯ: Оновлення положення header ===== //
    function updateHeaderTop(applyTransition = true) {
        const scrollTop = $window.scrollTop();
        const newTop = Math.max(0, MAX_HEADER_TOP - scrollTop);

        // Додати або видалити клас 'float' залежно від значення newTop
        if (newTop === 0) {
            $header.addClass('float');
        } else {
            $header.removeClass('float');
        }

        if (!applyTransition) {
            $header.css('transition', 'none');
        }

        $header.css('top', `${newTop}px`);

        if (!applyTransition) {
            requestAnimationFrame(() => {
                $header.css('transition', HEADER_TRANSITION);
            });
        }
    }

    // ===== ФУНКЦІЯ: Перемикання меню ===== //
    function toggleMenu() {
        const isExpanded = $burger.attr('aria-expanded') === 'true';

        $burger.attr('aria-expanded', !isExpanded);
        $menu.toggleClass('active');
        $burger.toggleClass('active');
        $headerWrapper.toggleClass('active');
        $body.toggleClass('lock');
    }

    $('#mobileMenu a').click(function () {
        toggleMenu();
    });

    // ===== ІНІЦІАЛІЗАЦІЯ ===== //
    updateHeaderTop(false); // одразу перевіряємо позицію при завантаженні

    $window.on('scroll', function () {
        updateHeaderTop(true); // під час скролу оновлюємо позицію й клас
    });

    $burger.on('click', toggleMenu);
});

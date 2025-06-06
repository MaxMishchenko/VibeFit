$(document).ready(function () {
    const $burger = $('#burger');
    const $menu = $('#mobileMenu');
    const $header = $('#header');
    const $headerWrapper = $('#headerWrapper');
    const $body = $('body');
    const $window = $(window);

    const MAX_HEADER_TOP = 16;
    const HEADER_TRANSITION = 'top .2s ease-in-out';

    // ===== ФУНКЦІЯ: Оновлення положення header ===== //
    function updateHeaderTop(applyTransition = true) {
        const scrollTop = $window.scrollTop();
        const newTop = Math.max(0, MAX_HEADER_TOP - scrollTop);

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
    function unlockBodyWithDelay() {
        $body.addClass('lock-removing');

        setTimeout(() => {
            $body.removeClass('lock lock-removing');
        }, 400);
    }

    function toggleMenu() {
        const isExpanded = $burger.attr('aria-expanded') === 'true';

        $burger.attr('aria-expanded', !isExpanded);
        $menu.toggleClass('active');
        $burger.toggleClass('active');
        $headerWrapper.toggleClass('active');

        if ($body.hasClass('lock')) {
            unlockBodyWithDelay();
        } else {
            $body.removeClass('lock-removing');
            $body.addClass('lock');
        }
    }

    $('#mobileMenu a').click(function () {
        toggleMenu();
    });

    let menuToggled = false;

    $(window).on('resize', function () {
        if (window.innerWidth >= 768 && $body.hasClass('lock') && !menuToggled) {
            toggleMenu();
            menuToggled = true;
        }
    });

    // ===== ІНІЦІАЛІЗАЦІЯ ===== //
    updateHeaderTop(false);

    $window.on('scroll', function () {
        updateHeaderTop(true);
    });

    $burger.on('click', toggleMenu);
});
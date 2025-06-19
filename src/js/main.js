$(document).ready(function () {
    const $window = $(window);
    const $body = $('body');
    const $burger = $('#burger');
    const $menu = $('#mobileMenu');
    const $header = $('#header');
    const $headerWrapper = $('#headerWrapper');
    const $menuLinks = $menu.find('a');
    const $accordionItems = $('.faq__list-item');
    const $allIcons = $('.faq__list-icon-wrapper .faq__list-icon');
    const $allTexts = $('[data-text]');

    const MAX_HEADER_TOP = 16;
    const HEADER_TRANSITION = 'top .2s ease-in-out';

    // --- Оновлення положення header --- //
    function updateHeaderTop(applyTransition = true) {
        const scrollTop = $window.scrollTop();
        const newTop = Math.max(0, MAX_HEADER_TOP - scrollTop);

        $header.toggleClass('float', newTop === 0);

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

    // --- Розблокування body з затримкою --- //
    function unlockBodyWithDelay() {
        $body.addClass('lock-removing');

        setTimeout(() => {
            $body.removeClass('lock lock-removing');
        }, 400);
    }

    // --- Перемикання меню --- //
    function toggleMenu() {
        const isExpanded = $burger.attr('aria-expanded') === 'true';

        $burger.attr('aria-expanded', !isExpanded);
        $menu.toggleClass('active');
        $burger.toggleClass('active');
        $headerWrapper.toggleClass('active');

        if ($body.hasClass('lock')) {
            unlockBodyWithDelay();
        } else {
            $body.removeClass('lock-removing').addClass('lock');
        }
    }

    // --- Клік по бургеру --- //
    $burger.on('click', toggleMenu);

    // --- Клік по посиланнях меню --- //
    $menuLinks.on('click', toggleMenu);

    // --- Зміна розміру вікна --- //
    let menuToggled = false;
    $window.on('resize', function () {
        if (window.innerWidth >= 768 && $body.hasClass('lock') && !menuToggled) {
            toggleMenu();
            menuToggled = true;
        }
    });

    // --- Скрол для оновлення header --- //
    $window.on('scroll', function () {
        updateHeaderTop(true);
    });

    // --- Клік по акордіону --- //
    $accordionItems.on('click', function () {
        const $currentItem = $(this);
        const $currentIcon = $currentItem.find('.faq__list-icon-wrapper .faq__list-icon');
        const $currentText = $currentItem.find('[data-text]');
        const isOpen = $currentIcon.hasClass('open');

        if (isOpen) {
            $currentIcon.removeClass('open');
            $currentText.stop(true, true).animate({ opacity: 0 }, 150, function () {
                $(this).slideUp(200);
            });
        } else {
            $allIcons.removeClass('open');
            $allTexts.stop(true, true).animate({ opacity: 0 }, 150, function () {
                $(this).slideUp(200);
            });

            $currentIcon.addClass('open');
            $currentText
                .stop(true, true)
                .css({ display: 'none', opacity: 0 })
                .slideDown(200)
                .animate({ opacity: 1 }, 400);
        }
    });

    // --- Плавний скрол до якорів --- //
    $('a[href^="#"]').on('click', function (event) {
        event.preventDefault();

        const targetId = $(this).attr('href');
        const targetElement = $(targetId);

        if (targetElement.length) {
            const targetOffset = targetElement.offset().top - 70;

            $('html, body').animate({
                scrollTop: targetOffset
            }, 600);
        }
    });

    // ===== ІНІЦІАЛІЗАЦІЯ ===== //
    $(window).on('load', function () {
        const hash = window.location.hash;

        if (hash && $(hash).length) {
            const targetElement = $(hash);
            const targetOffset = targetElement.offset().top - 70;

            $('html, body').animate({
                scrollTop: targetOffset
            }, 600);
        }
    });

    updateHeaderTop(false);
});
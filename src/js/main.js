$(document).ready(function () {
    const $burger = $('#burger-ctr');

    $burger.on('click', function () {
        $(this).toggleClass('active');
    });





    const $header = $('#header');
    const maxTop = 16;

    function updateHeaderTop(applyTransition = true) {
        const scrollTop = $(window).scrollTop();
        const newTop = Math.max(0, maxTop - scrollTop);

        if (!applyTransition) {
            $header.css('transition', 'none');
        }

        $header.css('top', newTop + 'px');

        if (!applyTransition) {
            // Повернути transition після 1 кадру (наступний цикл рендеру)
            requestAnimationFrame(() => {
                $header.css('transition', 'top 0.1s ease');
            });
        }
    }

    // Встановити початкове значення без transition
    updateHeaderTop(false);

    // Відстежувати скрол
    $(window).on('scroll', function () {
        updateHeaderTop(true);
    });
});
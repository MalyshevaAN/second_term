$(function () {
    $('body').fadeIn('1000');
    $('.another').click(function () {
        $('body').fadeOut('1000');
    })
    $('.point').hover(
        function () {
            classList = $(this).attr('class').split(' ');

            ($('.place' + '.' + classList[1])).addClass('active');
        },
        function () {
            $('.place').removeClass('active');
        }
    )
    $('.point').click(
        function () {
            element = '.description' + '.' + $(this).attr('class').split(' ')[1]
            if ($(element).hasClass('active')) {
                $(element).removeClass('active')
                $(element).fadeOut(1000)
            } else {
                $(element).addClass('active')
                $(element).html($(this).attr('description-data'));
                $(element).fadeIn(1000)
            }    
        }       
    )
    $('.description').click(
        function () {
            $(this).removeClass('active');
            $(this).fadeOut(1000)
        }
    )

    const mouse_wheel = function (event) {
        if (false == !!event) event = window.event;
        let direction = ((event.wheelDelta) ? event.wheelDelta / 120 : event.detail / -3) || false;
        if (direction == -1) {
            $('footer').addClass('active')
        } else {
            $('footer').removeClass('active')
        }
    }
    window.addEventListener('wheel', mouse_wheel, false);

})
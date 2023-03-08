$(function () {
    console.log('hey')
    $('body').fadeIn('1000')
    $('.another').click(function () {
        $('body').fadeOut('1000')
    })
    $('.small-image img').mousedown(function () {
        if ($(this).attr('src') !== $('.first img').attr('src') && $(this).attr('src') !== $('.second img').attr('src')) {
            $('.second').css({
                'opacity':'0',
                'transform': 'translateX(-100%)',
                'transition': 'transform 0.4s ease'
            })
            $('.first').css({
                //'opacity': '0',
                //'transform': 'translateX(-10%)'
            })
            const newOne = this
            
            $(this).addClass('activeslide')
            setTimeout(function () {
                $('.second img').attr('src', $('.first img').attr('src'))
                $('.first img').hide().attr('src', $(newOne).attr('src')).slideDown()
                $('.second').css({
                    'transform': 'translateX(0%)',
                    'opacity': '1',
                    'transition': 'transform 0.5s ease-in-out'
                })
                //$('.first').css({
                    //'opacity': '1',
                    //'transform': 'translateX(0%)',
                    //'transition': 'transform 1s ease '
                //})
                //$('.second img').attr('src', $('.first img').attr('src'))
                //$('.first img').attr('src', $(newOne).attr('src'))
            }, 300)
           
        }
    })
    $('.small-image img').click(function () {
        $('.small-image img').fadeTo(0,1)
        
        $(this).fadeTo(500, 0.5)
        
    })
   
   
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